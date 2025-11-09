import React from 'react';
import { ArrowLeft, BarChart3, Calendar, FileText, School, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface FamilyAreaScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FamilyAreaScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FamilyAreaScreenProps) => {
  const { t, language } = useLanguage();

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

  const menuItems = [
    { icon: BarChart3, text: t('family.menu.progress'), page: 'family-progress' },
    { icon: Calendar, text: t('family.menu.routines'), page: 'family-routines' },
    { icon: FileText, text: t('family.menu.reports'), page: 'family-reports' },
    { icon: School, text: t('family.menu.school'), page: 'family-school' },
    { icon: Trophy, text: t('family.menu.achievements'), page: 'family-achievements' },
  ];

  React.useEffect(() => {
    speak(t('family.title'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Header */}
      <header className="p-4 sm:p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            onClick={() => {
              speak(t('family.back'));
              onNavigate('home');
            }}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2" />
            {t('family.back')}
          </Button>
        </div>
        <div className="text-center mt-4">
          <h1 className={`${getTitleClass()} font-bold mb-2`}>
            {t('family.title')}
          </h1>
          <p className={`${getTextClass()} text-purple-100`}>
            {t('family.subtitle')}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
              onClick={() => {
                speak(item.text);
                onNavigate(item.page);
              }}
            >
              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <item.icon size={32} className="text-purple-600" />
                </div>
                <h3 className={`${getTextClass()} font-bold text-gray-800`}>
                  {item.text}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyAreaScreen;
