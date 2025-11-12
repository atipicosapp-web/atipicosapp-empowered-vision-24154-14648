import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Share2, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface FamilyAchievementsScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FamilyAchievementsScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FamilyAchievementsScreenProps) => {
  const { t, language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'pt-BR' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getTextClass = () => {
    const baseSize = 'text-sm sm:text-base';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-base`;
      case 'medium': return `${baseSize} lg:text-lg`;
      case 'large': return `${baseSize} lg:text-xl`;
      case 'gigante': return `${baseSize} lg:text-2xl`;
      default: return `${baseSize} lg:text-lg`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-xl sm:text-2xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-2xl`;
      case 'medium': return `${baseSize} lg:text-3xl`;
      case 'large': return `${baseSize} lg:text-4xl`;
      case 'gigante': return `${baseSize} lg:text-5xl`;
      default: return `${baseSize} lg:text-3xl`;
    }
  };

  // Fetch achievements from database
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('family_achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setAchievements(
            data.map((achievement) => ({
              id: achievement.id,
              title: achievement.title,
              description: achievement.description,
              date: achievement.date || achievement.created_at,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
        toast.error('Erro ao carregar conquistas');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  const handleShareAchievement = (achievement: Achievement) => {
    speak(`${t('family.achievements.share')}: ${achievement.title}`);
    toast.success('Conquista compartilhada! (Em desenvolvimento)');
  };

  const unlockedCount = achievements.length;

  useEffect(() => {
    if (!authLoading) {
      speak(t('family.achievements.title'));
      if (unlockedCount > 0) {
        setTimeout(() => speak(`Incrível! Continue assim!`), 1000);
      }
    }
  }, [authLoading, unlockedCount]);

  // Authentication check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-md text-center border bg-white/70 border-purple-300">
          <p className="text-lg mb-4">Você precisa estar autenticado para acessar esta área</p>
          <Button onClick={() => onNavigate('auth')} className="bg-purple-600 hover:bg-purple-700">
            Fazer Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Header */}
      <header className="p-4 sm:p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            onClick={() => {
              speak(t('family.back'));
              onNavigate('family-area');
            }}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2" />
            {t('family.back')}
          </Button>
        </div>
        <div className="text-center mt-4">
          <h1 className={`${getTitleClass()} font-bold`}>
            {t('family.achievements.title')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Loading State */}
        {loading ? (
          <Card className="border bg-white/70 border-purple-300">
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mr-3" />
              <span className={getTextClass()}>Carregando conquistas...</span>
            </div>
          </Card>
        ) : (
          <>
            {/* Progress Summary */}
            <Card className="border bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300">
              <div className="p-6 text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h2 className={`${getTitleClass()} font-bold text-purple-700 mb-2`}>
                  {unlockedCount}
                </h2>
                <p className={`${getTextClass()} text-purple-600`}>
                  Conquistas desbloqueadas
                </p>
              </div>
            </Card>

            {/* Achievements List */}
            {achievements.length === 0 ? (
              <Card className="border bg-white/70 border-blue-300">
                <div className="p-6 text-center">
                  <p className={`${getTextClass()} text-gray-600`}>
                    {t('family.achievements.noAchievements')}
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="border bg-white/70 border-purple-300 hover:scale-105 transition-all duration-300"
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <Trophy className="w-8 h-8 text-purple-600" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      </div>
                      <h3 className={`${getTextClass()} font-bold text-gray-800`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm text-gray-600`}>
                        {achievement.description}
                      </p>
                      {achievement.date && (
                        <p className="text-sm text-gray-500">
                          {new Date(achievement.date).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      <Button
                        onClick={() => handleShareAchievement(achievement)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Share2 className="mr-2 w-4 h-4" />
                        {t('family.achievements.share')}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyAchievementsScreen;
