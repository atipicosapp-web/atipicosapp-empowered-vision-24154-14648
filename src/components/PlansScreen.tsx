
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Crown,
  Heart,
  CheckCircle,
  Shield,
  Trophy,
  Users,
  Lock,
  Star,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PlansScreenProps {
  onNavigate: (page: string) => void;
  voiceSpeed: string;
}

const PlansScreen = ({ onNavigate, voiceSpeed }: PlansScreenProps) => {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  
  const PLANS = {
    bpc: {
      priceId: 'price_1ST5wZKikeBfCW6cpQjrRruO',
      productId: 'prod_TPvol7F0TrkMOV',
      name: 'BPC LOAS',
      price: 'R$ 49,00'
    },
    premium: {
      priceId: 'price_1ST5wvKikeBfCW6cIumUmPjX',
      productId: 'prod_TPvoZCPw1RIITz',
      name: 'Premium',
      price: 'R$ 67,00'
    },
    annual: {
      priceId: 'price_1ST5xCKikeBfCW6cQhi4ZM4k',
      productId: 'prod_TPvo2JQxxzZ4be',
      name: 'Anual',
      price: 'R$ 599,00'
    }
  };
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      setCheckingStatus(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setCheckingStatus(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      setSubscriptionStatus(data);
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
    setTimeout(() => {
      speak("ATIPICOS, o aplicativo desenvolvido especialmente para pessoas com autismo e TDAH. Planos disponíveis: BPC LOAS 49 reais. Premium 67 reais. Anual 599 reais. Teste grátis 3 dias.");
    }, 1000);
  }, []);

  const handleCheckout = async (priceId: string) => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Você precisa fazer login primeiro!");
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        speak("Abrindo página de pagamento");
      }
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Erro ao abrir portal:', error);
      toast.error("Erro ao abrir gerenciador de assinatura.");
    } finally {
      setLoading(false);
    }
  };

  const isTrialActive = subscriptionStatus?.isInTrial && !subscriptionStatus?.subscribed;
  const hasActiveSubscription = subscriptionStatus?.subscribed;

  const bbcFeatures = [
    "Rotinas visuais personalizadas com lembretes por voz",
    "Comunicação alternativa com PECS e pictogramas",
    "Agenda visual com avisos sonoros e visuais",
    "Cronômetro visual para gestão de tempo",
    "Assistente com linguagem clara e objetiva",
    "Redução de sobrecarga sensorial com interface minimalista",
    "Suporte para crises com técnicas de regulação",
    "Lista de tarefas com check-lists visuais"
  ];

  const premiumFeatures = [
    "Sistema de recompensas gamificado para motivação",
    "Detecção de sobrecarga sensorial com alertas preventivos",
    "Modo foco: bloqueia distrações automaticamente",
    "Biblioteca de scripts sociais personalizáveis",
    "Histórico de humor e gatilhos para autoconhecimento",
    "Integração com cuidadores e terapeutas",
    "Planos de contingência para situações de crise",
    "Relatórios de progresso e análise comportamental"
  ];

  const voiceExamples = [
    "ATIPICOS, mostrar minha rotina de hoje",
    "ATIPICOS, iniciar cronômetro de 5 minutos",
    "ATIPICOS, preciso de ajuda para me acalmar"
  ];

  const premiumExamples = [
    "ATIPICOS, ativar modo foco para estudar",
    "ATIPICOS, me ajudar a organizar minhas tarefas",
    "ATIPICOS, registrar como estou me sentindo agora",
    "ATIPICOS, mostrar meu script social para festa"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-3 sm:p-4 lg:p-6 border-b-2 border-blue-600 flex items-center">
        <Button
          onClick={() => onNavigate('home')}
          onMouseEnter={() => speak(t('plans.back'))}
          className="bg-blue-600 hover:bg-blue-500 text-white p-2 sm:p-3 rounded-lg mr-3 sm:mr-4"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-blue-300">
          {t('plans.title')}
        </h1>
      </header>

      <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Introdução Impactante */}
        <Card className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 border-2 border-blue-400">
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 mr-2" />
              <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400" />
              <Star className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 ml-2" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              🌟 {t('plans.mainTitle')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-4 sm:mb-6">
              {t('plans.description')}
            </p>
            
            {/* Badges de Credibilidade */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
              <Badge className="bg-yellow-600 text-black px-3 py-1 text-xs sm:text-sm">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {t('plans.expertCreated')}
              </Badge>
              <Badge className="bg-green-600 text-white px-3 py-1 text-xs sm:text-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {t('plans.familyApproved')}
              </Badge>
              <Badge className="bg-purple-600 text-white px-3 py-1 text-xs sm:text-sm">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {t('plans.evidenceBased')}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Status da Assinatura */}
        {checkingStatus ? (
          <Card className="bg-gray-800 border-2 border-gray-600">
            <div className="p-6 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-400 mb-2" />
              <p className="text-gray-300">Verificando status...</p>
            </div>
          </Card>
        ) : hasActiveSubscription ? (
          <Card className="bg-gradient-to-r from-green-800 to-green-600 border-2 border-green-400">
            <div className="p-4 sm:p-6 lg:p-8 text-center">
              <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                ✅ Assinatura Ativa
              </h2>
              <p className="text-green-100 mb-4">
                Você tem acesso completo ao app!
              </p>
              <Button
                onClick={handleManageSubscription}
                disabled={loading}
                className="bg-white text-green-800 hover:bg-green-50 px-6 py-3 rounded-xl font-bold"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                Gerenciar Assinatura
              </Button>
            </div>
          </Card>
        ) : isTrialActive ? (
          <Card className="bg-gradient-to-r from-blue-800 to-purple-800 border-2 border-blue-400">
            <div className="p-4 sm:p-6 lg:p-8 text-center">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                🎁 Trial Gratuito Ativo
              </h2>
              <p className="text-blue-100 mb-2">
                Você está no período de teste gratuito!
              </p>
              <p className="text-sm text-blue-200">
                Termina em: {new Date(subscriptionStatus?.trialEndsAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </Card>
        ) : (
          <Card className="bg-gradient-to-r from-red-800 to-orange-800 border-2 border-red-400">
            <div className="p-4 sm:p-6 lg:p-8 text-center">
              <Lock className="w-12 h-12 text-red-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                ⚠️ Trial Expirado
              </h2>
              <p className="text-red-100 mb-4">
                Seu período de teste terminou. Assine um plano para continuar usando!
              </p>
            </div>
          </Card>
        )}

        {/* Grid de Planos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Plano BBC/LOAS */}
          <Card className="bg-gray-900 border-2 border-blue-600 hover:border-blue-400 transition-all duration-200">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <Heart size={48} className="text-blue-400 mx-auto mb-2 sm:mb-4 w-8 h-8 sm:w-12 sm:h-12" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-300 mb-1 sm:mb-2">
                  💠 {t('plans.bbcTitle')}
                </h2>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {t('plans.bbcPrice')}
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300">{t('plans.perMonth')}</p>
                <p className="text-xs sm:text-sm text-blue-200 mt-1 sm:mt-2">
                  {t('plans.bbcDesc')}
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4">
                  {t('plans.featuresIncluded')}
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  {bbcFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={16} className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm lg:text-base text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 sm:mb-6 bg-blue-900/30 p-3 sm:p-4 rounded-lg">
                <h4 className="text-sm sm:text-base font-semibold text-blue-300 mb-2">
                  {t('plans.voiceExamples')}
                </h4>
                <ul className="space-y-1">
                  {voiceExamples.map((example, index) => (
                    <li key={index} className="text-xs sm:text-sm text-blue-100">
                      "• {example}"
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleCheckout(PLANS.bpc.priceId)}
                disabled={loading || hasActiveSubscription}
                onMouseEnter={() => speak(t('plans.wantThisPlan'))}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 sm:py-4 lg:py-6 rounded-xl text-base sm:text-lg lg:text-xl font-bold border-2 border-blue-400 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {hasActiveSubscription ? 'Plano Ativo' : t('plans.wantThisPlan')}
              </Button>
            </div>
          </Card>

          {/* Plano Premium */}
          <Card className="bg-gradient-to-br from-purple-900 to-blue-900 border-2 border-purple-500 hover:border-purple-400 transition-all duration-200 relative overflow-hidden">
            {/* Badge de Destaque */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-orange-500 text-black px-3 sm:px-4 lg:px-6 py-1 sm:py-2 text-xs sm:text-sm font-bold">
              {t('plans.totalAutonomy')}
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <Crown size={48} className="text-purple-300 mx-auto mb-2 sm:mb-4 w-8 h-8 sm:w-12 sm:h-12" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-300 mb-1 sm:mb-2">
                  🌟 {t('plans.premiumTitle')}
                </h2>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {t('plans.premiumPrice')}
                </div>
                <p className="text-sm text-purple-200">{t('plans.premiumAnnual')}</p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300">{t('plans.perMonth')}</p>
                <p className="text-xs sm:text-sm text-purple-200 mt-1 sm:mt-2">
                  {t('plans.premiumDesc')}
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4">
                  {t('plans.premiumFeatures')}
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={16} className="text-purple-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm lg:text-base text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 sm:mb-6 bg-purple-900/40 p-3 sm:p-4 rounded-lg">
                <h4 className="text-sm sm:text-base font-semibold text-purple-300 mb-2">
                  {t('plans.advancedControl')}
                </h4>
                <ul className="space-y-1">
                  {premiumExamples.map((example, index) => (
                    <li key={index} className="text-xs sm:text-sm text-purple-100">
                      "• {example}"
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleCheckout(PLANS.premium.priceId)}
                  disabled={loading || hasActiveSubscription}
                  onMouseEnter={() => speak('Plano Premium Mensal')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold border-2 border-purple-400 shadow-lg disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  {hasActiveSubscription ? 'Plano Ativo' : 'Assinar Mensal - R$ 67,00'}
                </Button>
                
                <Button
                  onClick={() => handleCheckout(PLANS.annual.priceId)}
                  disabled={loading || hasActiveSubscription}
                  onMouseEnter={() => speak('Plano Anual com Desconto')}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold border-2 border-yellow-400 shadow-lg disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  {hasActiveSubscription ? 'Plano Ativo' : 'Assinar Anual - R$ 599,00'}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Informações de Acessibilidade */}
        <Card className="bg-gray-800 border-2 border-gray-600">
          <div className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-400" />
              {t('plans.developedFor')}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300 text-center">
              {t('plans.privacyText')}
            </p>
          </div>
        </Card>

        {/* Informações sobre o Trial */}
        <Card className="bg-gradient-to-r from-blue-700 to-purple-700 border-2 border-blue-500">
          <div className="p-4 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
              🎁 3 Dias Grátis para Testar
            </h3>
            <p className="text-sm sm:text-base text-blue-100 mb-2">
              Cadastre-se e ganhe 3 dias grátis de acesso total ao app!
            </p>
            <p className="text-xs sm:text-sm text-blue-200">
              Depois escolha o plano ideal para você. Sem compromisso!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlansScreen;
