import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  date: string;
  icon: string;
  unlocked: boolean;
}

interface FamilyAchievementsScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FamilyAchievementsScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FamilyAchievementsScreenProps) => {
  const { t, language } = useLanguage();
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: t('family.achievements.oneWeek'), date: '2025-11-01', icon: '🏆', unlocked: true },
    { id: '2', title: t('family.achievements.twoWeeks'), date: '2025-11-08', icon: '⭐', unlocked: true },
    { id: '3', title: t('family.achievements.oneMonth'), date: '', icon: '🎖️', unlocked: false },
    { id: '4', title: t('family.achievements.perfectDay'), date: '', icon: '💫', unlocked: false },
  ]);

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

  const handleShareAchievement = (achievement: Achievement) => {
    speak(`${t('family.achievements.share')}: ${achievement.title}`);
    toast.success('Conquista compartilhada! (Em desenvolvimento)');
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  useEffect(() => {
    speak(t('family.achievements.title'));
    if (unlockedCount > 0) {
      setTimeout(() => speak(`Incrível! Continue assim!`), 1000);
    }
  }, []);

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
        {/* Progress Summary */}
        <Card className="border bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300">
          <div className="p-6 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h2 className={`${getTitleClass()} font-bold text-purple-700 mb-2`}>
              {unlockedCount} / {achievements.length}
            </h2>
            <p className={`${getTextClass()} text-purple-600`}>
              Conquistas desbloqueadas
            </p>
          </div>
        </Card>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`border transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-white/70 border-purple-300 hover:scale-105'
                  : 'bg-gray-100/50 border-gray-300 opacity-60'
              }`}
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{achievement.icon}</span>
                  {achievement.unlocked && (
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <h3 className={`${getTextClass()} font-bold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                  {achievement.title}
                </h3>
                {achievement.unlocked && achievement.date && (
                  <p className="text-sm text-gray-600">
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
                {achievement.unlocked && (
                  <Button
                    onClick={() => handleShareAchievement(achievement)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Share2 className="mr-2 w-4 h-4" />
                    {t('family.achievements.share')}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Encouragement Message */}
        {unlockedCount === 0 && (
          <Card className="border bg-white/70 border-blue-300">
            <div className="p-6 text-center">
              <p className={`${getTextClass()} text-gray-600`}>
                {t('family.achievements.noAchievements')}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FamilyAchievementsScreen;
