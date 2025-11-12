import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

// Rate limiting: 10 requests per hour per user
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

async function checkRateLimit(supabaseAdmin: any, userId: string, endpoint: string): Promise<{ allowed: boolean; error?: string }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_WINDOW_MS);

  // Get or create rate limit record
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('rate_limits')
    .select('*')
    .eq('user_id', userId)
    .eq('endpoint', endpoint)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    logStep("Rate limit check failed", { error: fetchError });
    return { allowed: false, error: 'Rate limit check failed' };
  }

  if (!existing) {
    // Create new record
    await supabaseAdmin
      .from('rate_limits')
      .insert({ user_id: userId, endpoint, request_count: 1, window_start: now });
    logStep("Rate limit record created", { userId, endpoint });
    return { allowed: true };
  }

  const windowAge = now.getTime() - new Date(existing.window_start).getTime();

  if (windowAge > RATE_WINDOW_MS) {
    // Reset window
    await supabaseAdmin
      .from('rate_limits')
      .update({ request_count: 1, window_start: now })
      .eq('user_id', userId)
      .eq('endpoint', endpoint);
    logStep("Rate limit window reset", { userId, endpoint });
    return { allowed: true };
  }

  if (existing.request_count >= RATE_LIMIT) {
    logStep("Rate limit exceeded", { userId, endpoint, count: existing.request_count });
    return { allowed: false, error: 'Rate limit exceeded. Please try again later.' };
  }

  // Increment count
  await supabaseAdmin
    .from('rate_limits')
    .update({ request_count: existing.request_count + 1 })
    .eq('user_id', userId)
    .eq('endpoint', endpoint);
  logStep("Rate limit incremented", { userId, endpoint, newCount: existing.request_count + 1 });

  return { allowed: true };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check rate limit
    const rateLimitCheck = await checkRateLimit(supabaseAdmin, user.id, 'customer-portal');
    if (!rateLimitCheck.allowed) {
      return new Response(JSON.stringify({ error: rateLimitCheck.error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length === 0) {
      throw new Error("No Stripe customer found for this user");
    }
    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/`,
    });
    logStep("Customer portal session created", { sessionId: portalSession.id, url: portalSession.url });

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer-portal", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
