import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ComunidadeScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
}

const ComunidadeScreen = ({ onNavigate, textSize, voiceSpeed }: ComunidadeScreenProps) => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const comunidadeOptions = [
    { text: "Fórum de pais", icon: "👨‍👩‍👧", speech: "Fórum da comunidade de pais", description: "Conecte-se com outros pais" },
    { text: "Grupos de apoio", icon: "💙", speech: "Grupos de apoio", description: "Encontre suporte emocional" },
    { text: "Eventos locais", icon: "📅", speech: "Eventos e encontros", description: "Participe de eventos próximos" },
    { text: "Compartilhar experiências", icon: "✍️", speech: "Compartilhar sua história", description: "Conte sua jornada" },
    { text: "Dúvidas frequentes", icon: "❓", speech: "Perguntas e respostas", description: "Tire suas dúvidas" },
    { text: "Chat ao vivo", icon: "💬", speech: "Chat com outros pais", description: "Converse em tempo real" }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 text-gray-800">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 border-b-2 border-blue-300/50 flex items-center">
        <Button
          onClick={() => onNavigate('home')}
          onMouseEnter={() => speak("Voltar")}
          className="bg-blue-500/70 hover:bg-blue-500 text-white p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 border border-blue-400/50"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
        <h1 className={`${getTitleClass()} font-bold text-blue-700 flex items-center`}>
          👥 Comunidade
        </h1>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {comunidadeOptions.map((option, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 border-2 bg-white/80 border-blue-300 hover:border-indigo-400 hover:scale-105"
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

export default ComunidadeScreen;
