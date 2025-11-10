import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CrisesScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
}

const CrisesScreen = ({ onNavigate, textSize, voiceSpeed }: CrisesScreenProps) => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const crisesOptions = [
    { text: "Identificar sinais", icon: "🔍", speech: "Identificar sinais de crise", description: "Aprenda a reconhecer os primeiros sinais" },
    { text: "Técnicas de calma", icon: "🧘", speech: "Técnicas de acalmia", description: "Métodos para acalmar durante crises" },
    { text: "Respiração guiada", icon: "💨", speech: "Exercício de respiração", description: "Exercícios de respiração passo a passo" },
    { text: "Ambiente seguro", icon: "🏠", speech: "Como criar ambiente seguro", description: "Dicas para ambiente acolhedor" },
    { text: "Contato emergência", icon: "📞", speech: "Contatos de emergência", description: "Lista de contatos importantes" },
    { text: "Histórico de crises", icon: "📊", speech: "Ver histórico de crises", description: "Registre e monitore crises" }
  ];

  const getTextClass = () => {
    const baseSize = 'text-sm sm:text-base';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-lg`;
      case 'medium': return `${baseSize} lg:text-xl`;
      case 'large': return `${baseSize} lg:text-2xl`;
      case 'gigante': return `${baseSize} lg:text-3xl`;
      default: return `${baseSize} lg:text-xl`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-lg sm:text-xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-2xl`;
      case 'medium': return `${baseSize} lg:text-3xl`;
      case 'large': return `${baseSize} lg:text-4xl`;
      case 'gigante': return `${baseSize} lg:text-5xl`;
      default: return `${baseSize} lg:text-3xl`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100 text-gray-800">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 border-b-2 border-red-300/50 flex items-center">
        <Button
          onClick={() => onNavigate('home')}
          onMouseEnter={() => speak("Voltar")}
          className="bg-red-500/70 hover:bg-red-500 text-white p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 border border-red-400/50"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
        <h1 className={`${getTitleClass()} font-bold text-red-700 flex items-center`}>
          ⚠️ Previsões de Crises
        </h1>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {crisesOptions.map((option, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 border-2 bg-white/80 border-red-300 hover:border-orange-400 hover:scale-105"
              onClick={() => speak(option.speech)}
            >
              <div className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="text-4xl sm:text-5xl">
                  {option.icon}
                </div>
                <h3 className={`${getTextClass()} font-bold text-gray-800`}>
                  {option.text}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {option.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrisesScreen;
