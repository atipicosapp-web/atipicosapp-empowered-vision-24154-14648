import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Volume2, 
  Phone, 
  Calendar, 
  Heart, 
  Brain,
  Tv,
  Music,
  Settings,
  MessageCircle,
  Camera,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MotorScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const MotorScreen = ({ onNavigate, textSize, voiceSpeed, userName }: MotorScreenProps) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
    setVoiceResponse(text);
  };

  useEffect(() => {
    setTimeout(() => {
      const greeting = getGreeting();
      const message = userName 
        ? `${greeting}, ${userName}! FALAPCD carregado com controle total por voz. Diga FALAPCD seguido do seu comando.`
        : "FALAPCD carregado com controle total por voz. Sem necessidade de tocar na tela.";
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
      speak("Escutando seu comando. Diga FALAPCD seguido do que você precisa.");
      setTimeout(() => {
        // Simulação de comando captado
        const commands = [
          "FALAPCD abrir YouTube",
          "FALAPCD ligar para Maria",
          "FALAPCD que horas são",
          "FALAPCD chamar cuidador"
        ];
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        setLastCommand(randomCommand);
        speak(`Comando captado: ${randomCommand}. Executando agora.`);
        setIsListening(false);
      }, 3000);
    } else {
      speak("Comando cancelado");
    }
  };

  const voiceCommands = [
    { 
      command: "FALAPCD ligar para emergência", 
      icon: Phone, 
      action: () => speak("Ligando para emergência 192. Aguarde."),
      color: "bg-red-600 border-red-400"
    },
    { 
      command: "FALAPCD chamar cuidador", 
      icon: Heart, 
      action: () => speak("Chamando seu cuidador principal. Ele estará aqui em breve."),
      color: "bg-green-600 border-green-400"
    },
    { 
      command: "FALAPCD abrir TV", 
      icon: Tv, 
      action: () => speak("Abrindo televisão. Canal preferido selecionado."),
      color: "bg-blue-600 border-blue-400"
    },
    { 
      command: "FALAPCD ver agenda", 
      icon: Calendar, 
      action: () => speak("Verificando agenda. Hoje você tem consulta médica às 15 horas."),
      color: "bg-purple-600 border-purple-400"
    },
    { 
      command: "FALAPCD tocar música", 
      icon: Music, 
      action: () => speak("Reproduzindo suas músicas favoritas."),
      color: "bg-orange-600 border-orange-400"
    },
    { 
      command: "FALAPCD assistente inteligente", 
      icon: Brain, 
      action: () => speak("Assistente ativo. Como posso ajudar você hoje?"),
      color: "bg-cyan-600 border-cyan-400"
    }
  ];

  const quickActions = [
    { 
      text: "SIM", 
      action: () => speak("Sim confirmado"),
      color: "bg-green-600"
    },
    { 
      text: "NÃO", 
      action: () => speak("Não confirmado"),
      color: "bg-red-600"
    },
    { 
      text: "AJUDA", 
      action: () => speak("Chamando ajuda"),
      color: "bg-yellow-600"
    },
    { 
      text: "REPETIR", 
      action: () => speak("Repetindo última ação"),
      color: "bg-blue-600"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 text-white">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 text-center border-b-2 border-slate-600">
        <div className="flex justify-between items-center mb-3">
          <div className="w-12"></div>
          <h1 className={`${getTitleClass()} font-bold text-slate-200`}>
            FALAPCD
          </h1>
          <Button
            onClick={() => onNavigate('settings')}
            onMouseEnter={() => speak("Configurações")}
            className="bg-slate-600 hover:bg-slate-500 p-3 sm:p-4 rounded-lg"
          >
            <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
        </div>
        <p className={`${getTextClass()} text-slate-300`}>
          {userName ? `${getGreeting()}, ${userName}! 🎙️` : 'Controle total por voz ativo 🎤'}
        </p>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8">
        
        {/* Microfone Principal - Extra Grande */}
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleVoiceCommand}
            className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-8 ${
              isListening 
                ? 'bg-red-600 border-red-400 animate-pulse shadow-2xl shadow-red-500/50' 
                : 'bg-blue-600 border-blue-400 hover:bg-blue-500 shadow-2xl shadow-blue-500/30'
            } flex items-center justify-center hover:scale-105 transition-all duration-300`}
          >
            <Mic className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white" />
          </button>
          
          <div className="text-center max-w-md">
            <p className={`${getTitleClass()} font-bold mb-2 ${
              isListening ? 'text-red-300' : 'text-blue-300'
            }`}>
              {isListening ? 'ESCUTANDO...' : 'TOQUE PARA FALAR'}
            </p>
            <p className={`${getTextClass()} text-slate-300`}>
              Diga "FALAPCD" seguido do seu comando
            </p>
          </div>
        </div>

        {/* Último Comando */}
        {lastCommand && (
          <div className="text-center">
            <div className="inline-block p-4 bg-green-800/50 rounded-xl border-2 border-green-600/50">
              <p className="text-sm text-green-300 mb-1">Último comando:</p>
              <p className={`${getTextClass()} text-green-200 font-bold`}>
                🎤 {lastCommand}
              </p>
            </div>
          </div>
        )}

        {/* Resposta por Voz */}
        {voiceResponse && (
          <div className="text-center">
            <div className="inline-block p-4 bg-blue-800/50 rounded-xl border-2 border-blue-600/50 max-w-md">
              <Volume2 className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className={`${getTextClass()} text-blue-200`}>
                {voiceResponse}
              </p>
            </div>
          </div>
        )}

        {/* Respostas Rápidas */}
        <div>
          <h2 className={`${getTextClass()} text-center text-yellow-300 font-bold mb-4`}>
            ⚡ Respostas Rápidas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                className={`${action.color} hover:scale-105 text-white p-6 rounded-xl border-2 border-white/20 transition-all duration-300`}
              >
                <span className={`${getTextClass()} font-bold`}>
                  {action.text}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Comandos por Categoria */}
        <div>
          <h2 className={`${getTextClass()} text-center text-slate-300 font-bold mb-6`}>
            🎯 Comandos Disponíveis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {voiceCommands.map((cmd, index) => (
              <Card
                key={index}
                className={`${cmd.color} hover:scale-105 transition-all duration-300 cursor-pointer border-2`}
                onClick={cmd.action}
              >
                <div className="p-6 flex flex-col items-center text-center space-y-3">
                  <cmd.icon className="w-10 h-10 text-white" />
                  <p className="text-sm sm:text-base font-bold text-white text-center leading-tight">
                    {cmd.command}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Instruções */}
        <div className="text-center">
          <div className="inline-block p-6 bg-slate-800/50 rounded-xl border-2 border-slate-600/50 max-w-lg">
            <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <h3 className={`${getTextClass()} text-slate-300 font-bold mb-3`}>
              Como usar:
            </h3>
            <ul className="text-sm sm:text-base text-slate-400 space-y-1 text-left">
              <li>• Toque no microfone grande</li>
              <li>• Diga "FALAPCD" primeiro</li>
              <li>• Depois fale seu comando</li>
              <li>• Aguarde a confirmação</li>
            </ul>
          </div>
        </div>

        {/* Botão para Planos */}
        <div className="text-center">
          <Button
            onClick={() => onNavigate('plans')}
            onMouseEnter={() => speak("Ver planos disponíveis")}
            className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-500 hover:to-gray-500 text-white px-12 py-6 rounded-xl border-2 border-white shadow-lg"
          >
            <span className={`${getTextClass()} font-bold`}>Ver Planos</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MotorScreen;