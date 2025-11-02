import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Pill, 
  Calendar, 
  Volume2, 
  Search, 
  MessageCircle,
  Clock,
  Heart,
  Settings,
  PhoneCall,
  AlertTriangle,
  Mic,
  Brain,
  Music,
  Bot,
  CreditCard,
  Cross,
  Camera,
  GraduationCap,
  CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ElderlyScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const ElderlyScreen = ({ onNavigate, textSize, voiceSpeed, userName }: ElderlyScreenProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isListening, setIsListening] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.7; // Velocidade mais lenta para idosos
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
      setCurrentDate(now.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    setTimeout(() => {
      const greeting = getGreeting();
      const message = userName 
        ? `${greeting}, ${userName}! FALAPCD carregado. Hoje é ${currentDate}. São ${currentTime}.`
        : `FALAPCD carregado. Sua assistente de acessibilidade está pronta para ajudar.`;
      speak(message);
    }, 1000);

    return () => clearInterval(interval);
  }, [userName, currentDate, currentTime]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speak("Estou ouvindo. Diga FALAPCD seguido do seu comando.");
    } else {
      speak("Parei de ouvir.");
    }
  };

  const mainFeatures = [
    { 
      icon: Brain, 
      text: "FALAR COM TERAPEUTA IA", 
      action: () => speak("Abrindo terapeuta inteligente. Como você está se sentindo hoje?"),
      color: "bg-purple-500 border-purple-300"
    },
    { 
      icon: Music, 
      text: "OUVIR MÚSICA FAVORITA", 
      action: () => speak("Tocando suas músicas favoritas."),
      color: "bg-blue-400 border-blue-200"
    },
    { 
      icon: Bot, 
      text: "ASSISTENTE VIRTUAL", 
      action: () => speak("Assistente virtual ativado. O que posso fazer por você?"),
      color: "bg-blue-700 border-blue-500"
    },
    { 
      icon: CalendarDays, 
      text: "AGENDA SUS / CONSULTAS", 
      action: () => speak("Abrindo agenda do SUS. Sua próxima consulta é amanhã às 14 horas."),
      color: "bg-blue-600 border-blue-400"
    },
    { 
      icon: CreditCard, 
      text: "PLANO DE SAÚDE / CONVÊNIO", 
      action: () => speak("Abrindo informações do seu plano de saúde."),
      color: "bg-green-500 border-green-300"
    },
    { 
      icon: Cross, 
      text: "REZAR / BÍBLIA / ORAÇÃO", 
      action: () => speak("Abrindo orações e textos bíblicos."),
      color: "bg-purple-400 border-purple-200"
    },
    { 
      icon: Camera, 
      text: "VER POR MIM", 
      action: () => speak("Câmera ativada para descrever o que você está vendo."),
      color: "bg-slate-500 border-slate-300"
    },
    { 
      icon: GraduationCap, 
      text: "APRENDER O APP", 
      action: () => speak("Abrindo tutorial do aplicativo. Vamos aprender juntos."),
      color: "bg-purple-600 border-purple-400"
    },
    { 
      icon: Pill, 
      text: "LEMBRETE DE REMÉDIOS", 
      action: () => speak("Abrindo lembretes de medicamentos. Próximo remédio às 14 horas."),
      color: "bg-green-600 border-green-400"
    },
    { 
      icon: Calendar, 
      text: "MINHA AGENDA", 
      action: () => speak("Abrindo agenda. Hoje você tem consulta médica às 15 horas."),
      color: "bg-blue-600 border-blue-400"
    },
    { 
      icon: PhoneCall, 
      text: "LIGAR PARA FAMÍLIA", 
      action: () => speak("Qual familiar você gostaria de ligar? Diga o nome ou toque em contatos."),
      color: "bg-purple-600 border-purple-400"
    },
    { 
      icon: Volume2, 
      text: "LER MENSAGENS", 
      action: () => speak("Você tem 2 mensagens do WhatsApp. Primeira mensagem da Maria: Oi mãe, tudo bem?"),
      color: "bg-orange-600 border-orange-400"
    },
    { 
      icon: Search, 
      text: "LUPA PARA LER", 
      action: () => speak("Lupa ativada. Aponte a câmera para o texto que deseja ler."),
      color: "bg-yellow-600 border-yellow-400"
    },
    { 
      icon: MessageCircle, 
      text: "CHAMAR CUIDADOR", 
      action: () => speak("Chamando seu cuidador principal. Aguarde."),
      color: "bg-red-600 border-red-400"
    }
  ];

  const emergencyContacts = [
    { name: "SAMU", number: "192", icon: Heart },
    { name: "Bombeiros", number: "193", icon: AlertTriangle },
    { name: "Polícia", number: "190", icon: Phone },
  ];

  const getTextClass = () => {
    // Para idosos, usar tamanhos ainda maiores
    const baseSize = 'text-base sm:text-lg md:text-xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-xl`;
      case 'medium': return `${baseSize} lg:text-2xl`;
      case 'large': return `${baseSize} lg:text-3xl`;
      case 'gigante': return `${baseSize} lg:text-4xl xl:text-5xl`;
      default: return `${baseSize} lg:text-2xl`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-xl sm:text-2xl md:text-3xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-3xl`;
      case 'medium': return `${baseSize} lg:text-4xl`;
      case 'large': return `${baseSize} lg:text-5xl`;
      case 'gigante': return `${baseSize} lg:text-6xl xl:text-7xl`;
      default: return `${baseSize} lg:text-4xl`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 text-center border-b-2 border-blue-400">
        <div className="flex justify-between items-center mb-3">
          <div className="w-12"></div>
          <h1 className={`${getTitleClass()} font-bold text-blue-200`}>
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
          {userName ? `${getGreeting()}, ${userName}! 💙` : 'Sua assistente pessoal'}
        </p>
        
        {/* Data e Hora grandes */}
        <div className="bg-blue-900/50 rounded-lg p-4 border-2 border-blue-400">
          <div className="flex items-center justify-center space-x-4">
            <Clock className="w-8 h-8 text-blue-300" />
            <div>
              <p className={`${getTextClass()} text-blue-200 font-bold`}>
                {currentTime}
              </p>
              <p className="text-sm sm:text-base text-blue-300">
                {currentDate}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Microfone Central */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <button
            onClick={handleVoiceCommand}
            className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-4 ${
              isListening ? 'bg-red-600 border-red-400 animate-pulse' : 'bg-blue-600 border-blue-400'
            } flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg`}
          >
            <Mic size={40} className="text-white" />
          </button>
          
          <p className={`${getTextClass()} text-center text-blue-200 font-medium max-w-xs`}>
            {isListening ? 'Estou ouvindo...' : 'TOQUE PARA FALAR'}
          </p>
          
          <p className="text-sm text-blue-300 text-center max-w-md">
            Diga: "FALAPCD" seguido do seu comando
          </p>
        </div>

        {/* Funcionalidades Principais */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8">
          {mainFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`${feature.color} hover:scale-105 transition-all duration-200 cursor-pointer`}
              onClick={feature.action}
              onMouseEnter={() => speak(feature.text)}
            >
              <div className="p-4 sm:p-6 flex flex-col items-center text-center space-y-3 min-h-[120px] justify-center">
                <feature.icon 
                  size={32} 
                  className="text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" 
                />
                <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight uppercase">
                  {feature.text}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Botões de Emergência - Movidos para o final */}
        <div className="mb-8">
          <h2 className={`${getTextClass()} text-center text-red-300 font-bold mb-4`}>
            🚨 EMERGÊNCIA
          </h2>
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            {emergencyContacts.map((contact, index) => (
              <Button
                key={index}
                onClick={() => speak(`Ligando para ${contact.name}, número ${contact.number}`)}
                onMouseEnter={() => speak(`${contact.name} ${contact.number}`)}
                className="bg-red-600 hover:bg-red-500 text-white p-4 rounded-xl border-2 border-red-400 flex flex-col items-center space-y-2"
              >
                <contact.icon className="w-6 h-6" />
                <span className="text-sm font-bold">{contact.name}</span>
                <span className="text-xs">{contact.number}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Botão para Planos */}
        <div className="text-center">
          <Button
            onClick={() => onNavigate('plans')}
            onMouseEnter={() => speak("Ver planos disponíveis")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 rounded-xl border-2 border-white shadow-lg"
          >
            <span className={`${getTextClass()} font-bold`}>VER PLANOS</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElderlyScreen;