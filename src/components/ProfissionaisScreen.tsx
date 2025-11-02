import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProfissionaisScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
}

const ProfissionaisScreen = ({ onNavigate, textSize, voiceSpeed }: ProfissionaisScreenProps) => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const profissionaisOptions = [
    { text: "Psicólogos TEA", icon: "🧠", speech: "Psicólogos especializados em autismo", description: "Psicólogos com expertise em TEA" },
    { text: "Fonoaudiólogos", icon: "🗣️", speech: "Fonoaudiólogos especializados", description: "Profissionais de fala e linguagem" },
    { text: "Terapeutas ocupacionais", icon: "🎨", speech: "Terapeutas ocupacionais", description: "Desenvolvimento de habilidades" },
    { text: "Pedagogos especiais", icon: "📚", speech: "Pedagogos de educação especial", description: "Educadores especializados" },
    { text: "Nutricionistas", icon: "🥗", speech: "Nutricionistas especializados", description: "Alimentação e nutrição adaptada" },
    { text: "Cadastrar profissional", icon: "➕", speech: "Cadastrar novo profissional", description: "Adicione um novo profissional" }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 text-gray-800">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 border-b-2 border-purple-300/50 flex items-center">
        <Button
          onClick={() => onNavigate('autism')}
          onMouseEnter={() => speak("Voltar")}
          className="bg-purple-500/70 hover:bg-purple-500 text-white p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 border border-purple-400/50"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
        <h1 className={`${getTitleClass()} font-bold text-purple-700 flex items-center`}>
          👨‍⚕️ Profissionais
        </h1>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {profissionaisOptions.map((option, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 border-2 bg-white/80 border-purple-300 hover:border-pink-400 hover:scale-105"
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

export default ProfissionaisScreen;
