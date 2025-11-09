import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface FamilyReportsScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FamilyReportsScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FamilyReportsScreenProps) => {
  const { t, language } = useLanguage();
  const [observations, setObservations] = useState<string[]>([
    'Hoje completou todas as atividades matinais com sucesso',
    'Demonstrou boa comunicação durante as refeições'
  ]);
  const [newObservation, setNewObservation] = useState('');

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

  const handleListenSummary = () => {
    const summary = language === 'pt-BR'
      ? `Hoje, ${userName || 'o usuário'} completou 75% das rotinas e expressou emoções positivas.`
      : language === 'en'
      ? `Today, ${userName || 'the user'} completed 75% of routines and expressed positive emotions.`
      : `Hoy, ${userName || 'el usuario'} completó 75% de las rutinas y expresó emociones positivas.`;
    speak(summary);
  };

  const handleGeneratePDF = () => {
    speak(t('family.reports.generatePDF'));
    toast.success('PDF gerado com sucesso! (Em desenvolvimento)');
  };

  const handleSendToTherapist = () => {
    speak(t('family.reports.sendToTherapist'));
    toast.success('Relatório enviado! (Em desenvolvimento)');
  };

  const handleAddObservation = () => {
    if (newObservation.trim()) {
      setObservations([...observations, newObservation]);
      setNewObservation('');
      speak('Observação adicionada');
      toast.success('Observação adicionada com sucesso!');
    }
  };

  useEffect(() => {
    speak(t('family.reports.title'));
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
            {t('family.reports.title')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={handleListenSummary}
            className="bg-purple-600 hover:bg-purple-700 text-white py-6"
          >
            <Volume2 className="mr-2" />
            {t('family.reports.listenSummary')}
          </Button>
          <Button
            onClick={handleGeneratePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            <FileText className="mr-2" />
            {t('family.reports.generatePDF')}
          </Button>
          <Button
            onClick={handleSendToTherapist}
            className="bg-green-600 hover:bg-green-700 text-white py-6"
          >
            <Send className="mr-2" />
            {t('family.reports.sendToTherapist')}
          </Button>
        </div>

        {/* Observations */}
        <Card className="border bg-white/70 border-blue-300">
          <div className="p-6 space-y-4">
            <h2 className={`${getTextClass()} font-bold text-purple-700`}>
              {t('family.reports.observations')}
            </h2>
            
            {observations.length > 0 ? (
              <div className="space-y-3">
                {observations.map((obs, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className={`${getTextClass()} text-gray-700`}>{obs}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`${getTextClass()} text-gray-500 text-center py-4`}>
                {t('family.reports.noObservations')}
              </p>
            )}

            <div className="space-y-3">
              <Label>{t('family.reports.addObservation')}</Label>
              <Textarea
                value={newObservation}
                onChange={(e) => setNewObservation(e.target.value)}
                placeholder={t('family.reports.observations')}
                rows={3}
              />
              <Button
                onClick={handleAddObservation}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!newObservation.trim()}
              >
                {t('family.reports.addObservation')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FamilyReportsScreen;
