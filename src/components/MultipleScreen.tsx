import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Volume2, 
  Type, 
  Camera, 
  Brain, 
  Calendar, 
  Phone,
  Settings,
  MessageCircle,
  Send,
  Heart,
  Accessibility
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LibrasAvatar from './LibrasAvatar';

interface MultipleScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const MultipleScreen = ({ onNavigate, textSize, voiceSpeed, userName }: MultipleScreenProps) => {
  const [isListening, setIsListening] = useState(false);
  const [textQuery, setTextQuery] = useState('');
  const [currentLibrasText, setCurrentLibrasText] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const [lastAction, setLastAction] = useState('');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
    // Sempre atualizar Libras também
    setCurrentLibrasText(text);
    setLastAction(text);
  };

  useEffect(() => {
    setTimeout(() => {
      const greeting = getGreeting();
      const message = userName 
        ? `${greeting}, ${userName}! FALAPCD carregado com todas as funcionalidades de acessibilidade ativas. Libras, voz, texto e comandos adaptados.`
        : "FALAPCD carregado com acessibilidade total. Libras, voz, comandos por toque e texto disponíveis.";
      speak(message);
    }, 1000);
  }, [userName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speak("Comando de voz ativado. Pode falar.");
      setTimeout(() => {
        setSpokenText("Comando processado com sucesso");
        speak("Comando recebido e processado");
        setIsListening(false);
      }, 3000);
    }
  };

  const handleTextQuery = () => {
    if (textQuery.trim()) {
      speak(`Processando sua pergunta: ${textQuery}`);
      setTextQuery('');
    }
  };

  const quickResponses = [
    "Sim",
    "Não", 
    "Obrigado",
    "Preciso de ajuda",
    "Não entendi",
    "Repetir",
    "Emergência",
    "Estou bem"
  ];

  const accessibilityFeatures = [
    { 
      icon: Volume2, 
      text: "Leitura de Tela", 
      action: () => speak("Leitura de tela ativada. Descrição completa da interface atual."),
      color: "bg-blue-600 border-blue-400"
    },
    { 
      icon: Camera, 
      text: "Descrever Imagem", 
      action: () => speak("Câmera ativa para descrição. Aponte para qualquer imagem ou texto."),
      color: "bg-green-600 border-green-400"
    },
    { 
      icon: Type, 
      text: "Texto para Voz", 
      action: () => speak("Conversor de texto para voz ativo. Digite ou fale o que quiser comunicar."),
      color: "bg-purple-600 border-purple-400"
    },
    { 
      icon: MessageCircle, 
      text: "Libras Ativo", 
      action: () => speak("Avatar em Libras sempre visível. Todas as informações são traduzidas automaticamente."),
      color: "bg-orange-600 border-orange-400"
    },
    { 
      icon: Brain, 
      text: "Assistente IA", 
      action: () => speak("Assistente inteligente com todas as adaptações. Posso responder perguntas e ajudar com tarefas."),
      color: "bg-cyan-600 border-cyan-400"
    },
    { 
      icon: Heart, 
      text: "Cuidador Remoto", 
      action: () => speak("Conexão com cuidador ativa. Monitoramento e suporte 24 horas disponível."),
      color: "bg-red-600 border-red-400"
    }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 text-center border-b-2 border-indigo-400">
        <div className="flex justify-between items-center mb-3">
          <div className="w-12"></div>
          <h1 className={`${getTitleClass()} font-bold text-indigo-200`}>
            FALAPCD
          </h1>
          <Button
            onClick={() => onNavigate('settings')}
            onMouseEnter={() => speak("Configurações")}
            className="bg-purple-600 hover:bg-purple-500 p-3 sm:p-4 rounded-lg"
          >
            <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
        </div>
        <p className={`${getTextClass()} text-purple-200 mb-2`}>
          {userName ? `${getGreeting()}, ${userName}! ♿` : 'Acessibilidade Total Ativa 🌈'}
        </p>
        
        {/* Status das funcionalidades */}
        <div className="bg-indigo-800/50 rounded-lg p-3 border border-indigo-400/50">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Libras</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Voz</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Texto</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Toque</span>
            </span>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8">
        
        {/* Área de Interação Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Comando de Voz */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleVoiceCommand}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 ${
                isListening 
                  ? 'bg-red-600 border-red-400 animate-pulse' 
                  : 'bg-blue-600 border-blue-400'
              } flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg`}
            >
              <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </button>
            <p className={`${getTextClass()} text-center text-blue-300 font-medium`}>
              {isListening ? 'Escutando...' : 'Comando de Voz'}
            </p>
          </div>

          {/* Campo de Texto */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextQuery()}
                className="bg-gray-800 border-2 border-purple-500 text-white text-base sm:text-lg p-3 sm:p-4 rounded-xl flex-1"
                placeholder="Digite ou fale sua pergunta..."
              />
              <Button
                onClick={handleTextQuery}
                disabled={!textQuery.trim()}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 sm:py-4 rounded-xl border-2 border-purple-400"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Última Ação */}
        {lastAction && (
          <div className="text-center">
            <div className="inline-block p-4 bg-green-800/30 rounded-xl border-2 border-green-600/50 max-w-md">
              <p className="text-sm text-green-300 mb-1">Última ação:</p>
              <p className={`${getTextClass()} text-green-200`}>
                ✅ {lastAction}
              </p>
            </div>
          </div>
        )}

        {/* Respostas Rápidas */}
        <div>
          <h2 className={`${getTextClass()} text-center text-pink-300 font-bold mb-4`}>
            ⚡ Respostas Rápidas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                onClick={() => speak(response)}
                className="bg-pink-600 hover:bg-pink-500 text-white p-3 rounded-lg border border-pink-400/50"
              >
                <span className="text-sm font-medium">{response}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Funcionalidades de Acessibilidade */}
        <div>
          <h2 className={`${getTextClass()} text-center text-indigo-300 font-bold mb-6`}>
            ♿ Acessibilidade Completa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {accessibilityFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`${feature.color} hover:scale-105 transition-all duration-300 cursor-pointer border-2`}
                onClick={feature.action}
                onMouseEnter={() => speak(feature.text)}
              >
                <div className="p-6 flex flex-col items-center text-center space-y-3">
                  <feature.icon className="w-10 h-10 text-white" />
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {feature.text}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Ações Principais */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <Button
            onClick={() => speak("Chamando emergência")}
            className="bg-red-600 hover:bg-red-500 text-white p-6 rounded-xl border-2 border-red-400 flex flex-col items-center space-y-2"
          >
            <Phone className="w-8 h-8" />
            <span className="text-sm font-bold">Emergência</span>
          </Button>
          
          <Button
            onClick={() => speak("Abrindo agenda")}
            className="bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-xl border-2 border-blue-400 flex flex-col items-center space-y-2"
          >
            <Calendar className="w-8 h-8" />
            <span className="text-sm font-bold">Agenda</span>
          </Button>
          
          <Button
            onClick={() => speak("Chamando cuidador")}
            className="bg-green-600 hover:bg-green-500 text-white p-6 rounded-xl border-2 border-green-400 flex flex-col items-center space-y-2"
          >
            <Heart className="w-8 h-8" />
            <span className="text-sm font-bold">Cuidador</span>
          </Button>
        </div>

        {/* Botão para Planos */}
        <div className="text-center">
          <Button
            onClick={() => onNavigate('plans')}
            onMouseEnter={() => speak("Ver planos disponíveis")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-12 py-6 rounded-xl border-2 border-white shadow-lg"
          >
            <span className={`${getTextClass()} font-bold`}>Ver Planos</span>
          </Button>
        </div>
      </div>

      {/* Avatar de Libras sempre visível */}
      <LibrasAvatar 
        isVisible={true}
        currentText={currentLibrasText}
      />
    </div>
  );
};

export default MultipleScreen;