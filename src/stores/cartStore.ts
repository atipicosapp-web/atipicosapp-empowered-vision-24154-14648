import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
}

// Checkout via Stripe for product purchases
async function createStripeCheckout(items: CartItem[]): Promise<string> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Você precisa estar logado para finalizar a compra');
    }

    const { data, error } = await supabase.functions.invoke('create-product-checkout', {
      body: { items }
    });

    if (error) throw error;
    if (!data?.url) throw new Error('Nenhuma URL de checkout retornada');

    return data.url;
  } catch (error) {
    console.error('Erro ao criar checkout Stripe:', error);
    throw error;
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
        
        toast.success("Adicionado ao carrinho! 🛒");
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
        toast.info("Item removido do carrinho");
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          const checkoutUrl = await createStripeCheckout(items);
          setCheckoutUrl(checkoutUrl);
          toast.success('Redirecionando para pagamento Stripe...');
        } catch (error) {
          console.error('Falha ao criar checkout:', error);
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          toast.error(errorMessage);
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
