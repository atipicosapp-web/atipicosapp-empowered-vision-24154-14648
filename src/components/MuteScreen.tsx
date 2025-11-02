import React, { useState, useEffect } from 'react';
import { 
  Type, 
  Volume2, 
  MessageCircle, 
  Camera, 
  Brain, 
  Calendar, 
  Phone,
  Settings,
  Send,
  Lightbulb
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface MuteScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const MuteScreen = ({ onNavigate, textSize, voiceSpeed, userName }: MuteScreenProps) => {
  const [textToSpeak, setTextToSpeak] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const greeting = getGreeting();
    const message = userName 
      ? `${greeting}, ${userName}! FALAPCD carregado com conversão de texto em voz.`
      : "FALAPCD carregado com conversão de texto em voz.";
    speak(message);
  }, [userName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleSpeak = () => {
    if (textToSpeak.trim()) {
      speak(textToSpeak);
      setCurrentMessage(textToSpeak);
      setTextToSpeak('');
    }
  };

  const quickPhrases = [
    "Olá, tudo bem?",
    "Obrigado(a)",
    "Com licença",
    "Preciso de ajuda",
    "Não entendi",
    "Pode repetir?",
    "Desculpe",
    "Tchau!",
    "Estou bem",
    "Chamar emergência",
    "Onde fica...?",
    "Quanto custa?"
  ];

  const handleQuickPhrase = (phrase: string) => {
    setTextToSpeak(phrase);
    speak(phrase);
    setCurrentMessage(phrase);
  };

  const handleTextChange = (text: string) => {
    setTextToSpeak(text);
    
    // Sugestões inteligentes baseadas no que está sendo digitado
    if (text.length > 2) {
      const filtered = quickPhrases.filter(phrase => 
        phrase.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  const features = [
    { icon: Volume2, text: "Falar texto", action: handleSpeak },
    { icon: Camera, text: "Ver por mim", action: () => speak("Câmera ativa para descrição") },
    { icon: Brain, text: "Assistente", action: () => speak("Assistente inteligente ativo") },
    { icon: Calendar, text: "Agenda", action: () => speak("Agenda aberta") },
    { icon: Phone, text: "Emergência", action: () => speak("Chamando emergência") }
  ];

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-3 sm:p-4 lg:p-6 text-center border-b-2 border-blue-600">
        <div className="flex justify-between items-center mb-2">
          <div className="w-12"></div>
          <h1 className={`${getTitleClass()} font-bold text-blue-300`}>
            FALAPCD
          </h1>
          <Button
            onClick={() => onNavigate('settings')}
            className="bg-purple-700 hover:bg-purple-600 p-2 sm:p-3 rounded-lg"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>
        <p className={`${getTextClass()} text-purple-300`}>
          {userName ? `${getGreeting()}, ${userName}! 🗣️` : 'Conversão de texto em voz ativa 🔊'}
        </p>
      </header>

      <div className="flex flex-col items-center px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        
        {/* Área de Digitação Principal */}
        <div className="w-full max-w-md">
          <div className="space-y-3">
            <Textarea
              value={textToSpeak}
              onChange={(e) => handleTextChange(e.target.value)}
              className="bg-gray-800 border-2 border-blue-500 text-white text-base sm:text-lg p-3 sm:p-4 rounded-xl min-h-[100px] resize-none"
              placeholder="Digite aqui o que você quer falar..."
            />
            
            <Button
              onClick={handleSpeak}
              disabled={!textToSpeak.trim()}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 sm:py-4 rounded-xl border-2 border-green-400 text-lg font-bold"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Falar Agora
            </Button>
          </div>

          {/* Sugestões */}
          {suggestions.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm text-yellow-400">Sugestões:</span>
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickPhrase(suggestion)}
                    className="w-full bg-yellow-700 hover:bg-yellow-600 text-white p-2 rounded-lg text-sm justify-start"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Última mensagem falada */}
        {currentMessage && (
          <div className="w-full max-w-md p-3 bg-green-800 rounded-lg border-2 border-green-600">
            <p className="text-sm text-green-200 mb-1">Última mensagem:</p>
            <p className={`${getTextClass()} text-white font-medium`}>
              💬 {currentMessage}
            </p>
          </div>
        )}

        {/* Frases Rápidas */}
        <div className="w-full max-w-md">
          <h3 className={`${getTextClass()} text-center text-blue-300 font-bold mb-3`}>
            Frases Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickPhrases.map((phrase, index) => (
              <Button
                key={index}
                onClick={() => handleQuickPhrase(phrase)}
                className="bg-purple-700 hover:bg-purple-600 text-white p-2 rounded-lg text-xs sm:text-sm"
              >
                {phrase}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de Funcionalidades */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900 border-2 border-blue-600 hover:border-purple-500 transition-all duration-200 cursor-pointer"
              onClick={feature.action}
            >
              <div className="p-3 sm:p-4 flex flex-col items-center text-center space-y-2 sm:space-y-3 min-h-[120px] justify-center">
                <feature.icon 
                  size={32} 
                  className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" 
                />
                <h3 className={`${getTextClass()} font-bold text-white leading-tight`}>
                  {feature.text}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Botão para Planos */}
        <Button
          onClick={() => onNavigate('plans')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-xl border-2 border-white shadow-lg mt-4 sm:mt-6"
        >
          <span className={`${getTextClass()} font-bold`}>Ver Planos</span>
        </Button>
      </div>
    </div>
  );
};

export default MuteScreen;