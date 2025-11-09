import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FamilyProgressScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FamilyProgressScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FamilyProgressScreenProps) => {
  const { t, language } = useLanguage();
  const [progressData, setProgressData] = useState({
    communication: 75,
    emotions: 60,
    routine: 85,
    teacher: 70,
    total: 72.5
  });

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

  const progressAreas = [
    { label: t('family.progress.communication'), value: progressData.communication, color: 'from-blue-400 to-blue-600' },
    { label: t('family.progress.emotions'), value: progressData.emotions, color: 'from-purple-400 to-purple-600' },
    { label: t('family.progress.routine'), value: progressData.routine, color: 'from-green-400 to-green-600' },
    { label: t('family.progress.teacher'), value: progressData.teacher, color: 'from-yellow-400 to-yellow-600' },
  ];

  const handleListenReport = () => {
    const message = language === 'pt-BR' 
      ? `Nos últimos dias, ${userName || 'o usuário'} concluiu ${Math.round(progressData.total)}% das atividades. Parabéns!`
      : language === 'en'
      ? `In recent days, ${userName || 'the user'} completed ${Math.round(progressData.total)}% of activities. Congratulations!`
      : `En los últimos días, ${userName || 'el usuario'} completó ${Math.round(progressData.total)}% de las actividades. ¡Felicitaciones!`;
    speak(message);
  };

  const handleDownloadPDF = () => {
    speak(t('family.progress.downloadPDF'));
    toast.success('PDF gerado com sucesso! (Em desenvolvimento)');
  };

  const handleShare = () => {
    speak(t('family.progress.share'));
    toast.success('Relatório compartilhado! (Em desenvolvimento)');
  };

  useEffect(() => {
    speak(t('family.progress.title'));
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
            {t('family.progress.title')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Total Progress */}
        <Card className="border bg-white/70 border-purple-300">
          <div className="p-6">
            <h2 className={`${getTextClass()} font-bold text-purple-700 mb-4`}>
              {t('family.progress.total')}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Progress value={progressData.total} className="h-6" />
              </div>
              <span className={`${getTitleClass()} font-bold text-purple-700`}>
                {Math.round(progressData.total)}%
              </span>
            </div>
          </div>
        </Card>

        {/* Individual Progress Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {progressAreas.map((area, index) => (
            <Card key={index} className="border bg-white/70 border-blue-300">
              <div className="p-4">
                <h3 className={`${getTextClass()} font-bold text-gray-800 mb-3`}>
                  {area.label}
                </h3>
                <div className="space-y-2">
                  <Progress value={area.value} className="h-4" />
                  <p className={`${getTextClass()} text-gray-600 text-right font-bold`}>
                    {area.value}%
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={handleListenReport}
            className="bg-purple-600 hover:bg-purple-700 text-white py-6"
          >
            <Volume2 className="mr-2" />
            {t('family.progress.listenReport')}
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            <Download className="mr-2" />
            {t('family.progress.downloadPDF')}
          </Button>
          <Button
            onClick={handleShare}
            className="bg-green-600 hover:bg-green-700 text-white py-6"
          >
            <Share2 className="mr-2" />
            {t('family.progress.share')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyProgressScreen;
