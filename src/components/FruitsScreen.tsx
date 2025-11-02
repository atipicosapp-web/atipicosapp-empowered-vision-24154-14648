import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FruitsScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FruitsScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FruitsScreenProps) => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'fast' ? 1.2 : voiceSpeed === 'ultra-fast' ? 1.5 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const fruits = [
    { name: "Maçã", emoji: "🍎" },
    { name: "Banana", emoji: "🍌" },
    { name: "Uva", emoji: "🍇" },
    { name: "Abacaxi", emoji: "🍍" },
    { name: "Melancia", emoji: "🍉" },
    { name: "Morango", emoji: "🍓" },
    { name: "Caqui", emoji: "🟠" },
    { name: "Laranja", emoji: "🍊" },
    { name: "Pera", emoji: "🍐" },
    { name: "Limão", emoji: "🍋" },
    { name: "Pêssego", emoji: "🍑" },
    { name: "Cereja", emoji: "🍒" },
    { name: "Kiwi", emoji: "🥝" },
    { name: "Manga", emoji: "🥭" },
    { name: "Coco", emoji: "🥥" },
    { name: "Mamão", emoji: "🧡" },
    { name: "Amora", emoji: "🫐" },
    { name: "Framboesa", emoji: "🍇" },
    { name: "Goiaba", emoji: "🟢" },
    { name: "Maracujá", emoji: "🟡" }
  ];

  const handleFruitClick = (fruit: any) => {
    speak(`Eu quero ${fruit.name}`);
  };

  const getTextClass = () => {
    const baseSize = 'text-sm sm:text-base md:text-lg';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-lg`;
      case 'medium': return `${baseSize} lg:text-xl`;
      case 'large': return `${baseSize} lg:text-2xl`;
      case 'gigante': return `${baseSize} lg:text-3xl xl:text-4xl`;
      default: return `${baseSize} lg:text-xl`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-lg sm:text-xl md:text-2xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-2xl`;
      case 'medium': return `${baseSize} lg:text-3xl`;
      case 'large': return `${baseSize} lg:text-4xl`;
      case 'gigante': return `${baseSize} lg:text-5xl xl:text-6xl`;
      default: return `${baseSize} lg:text-3xl`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200 text-gray-800">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 text-center border-b border-blue-300/50">
        <div className="flex justify-between items-center mb-3">
          <Button
            onClick={() => {
              speak("Voltar");
              onNavigate('home');
            }}
            className="bg-purple-600/70 hover:bg-purple-600 text-white p-2 sm:p-3 rounded-lg border border-purple-400/50"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h1 className={`${getTitleClass()} font-bold text-blue-800`}>
            🍎 Frutas
          </h1>
          <div className="w-12"></div>
        </div>
        <p className={`${getTextClass()} text-purple-700`}>
          Toque na fruta que você quer
        </p>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Grid de Frutas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {fruits.map((fruit, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 border-2 bg-white/90 border-blue-300/50 hover:border-purple-400 hover:scale-105 hover:shadow-lg group"
              onClick={() => handleFruitClick(fruit)}
            >
              <div className="p-6 flex flex-col items-center text-center space-y-3">
                {/* Emoji da fruta */}
                <div className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
                  {fruit.emoji}
                </div>
                
                {/* Nome da fruta */}
                <h3 className={`${getTextClass()} font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300`}>
                  {fruit.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Instruções */}
        <div className="mt-8 text-center">
          <div className="inline-block p-4 bg-blue-100/80 rounded-lg border border-blue-300">
            <p className={`${getTextClass()} text-blue-700`}>
              🔊 Toque em uma fruta para falar "Eu quero [nome da fruta]"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitsScreen;