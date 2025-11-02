import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Heart, 
  Clock, 
  Camera, 
  Volume2,
  Home,
  User,
  Settings,
  AlertTriangle,
  Calendar,
  Pill
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AlzheimerScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const AlzheimerScreen = ({ onNavigate, textSize, voiceSpeed, userName }: AlzheimerScreenProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [lastReminder, setLastReminder] = useState('');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.6; // Velocidade bem lenta
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
        day: 'numeric', 
        month: 'long'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    setTimeout(() => {
      const greeting = getGreeting();
      const message = userName 
        ? `${greeting}, ${userName}! Hoje é ${currentDate}. São ${currentTime}. Eu sou seu assistente FALAPCD e estou aqui para ajudar você.`
        : "Olá! Eu sou seu assistente FALAPCD. Estou aqui para ajudar você a lembrar das coisas importantes.";
      speak(message);
    }, 1000);

    return () => clearInterval(interval);
  }, [userName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const emergencyActions = [
    { 
      text: "Onde estou?", 
      icon: MapPin, 
      action: () => {
        speak("Você está em casa, no endereço Rua das Flores 123. Você está seguro. Se precisar de ajuda, toque em chamar cuidador.");
        setLastReminder("Localização confirmada");
      },
      color: "bg-blue-600 border-blue-400"
    },
    { 
      text: "Chamar Cuidador", 
      icon: Phone, 
      action: () => {
        speak("Chamando seu cuidador Maria. Ela estará aqui em alguns minutos.");
        setLastReminder("Cuidador chamado");
      },
      color: "bg-green-600 border-green-400"
    },
    { 
      text: "Socorro", 
      icon: AlertTriangle, 
      action: () => {
        speak("Chamando ajuda de emergência. Fique calmo, a ajuda está chegando.");
        setLastReminder("Emergência acionada");
      },
      color: "bg-red-600 border-red-400"
    }
  ];

  const dailyReminders = [
    { 
      text: "Tomar Remédio", 
      icon: Pill, 
      action: () => {
        speak("Hora do seu remédio. O comprimido azul está na mesa da cozinha. Tome com um copo de água.");
        setLastReminder("Lembrete de medicamento");
      }
    },
    { 
      text: "Ver Fotos da Família", 
      icon: Camera, 
      action: () => {
        speak("Vamos ver fotos da sua família. Esta é sua filha Maria, e este é seu neto João.");
        setLastReminder("Vendo fotos da família");
      }
    },
    { 
      text: "Minha Agenda", 
      icon: Calendar, 
      action: () => {
        speak("Hoje você tem consulta médica às 3 da tarde. Seu cuidador irá com você.");
        setLastReminder("Agenda verificada");
      }
    },
    { 
      text: "Quem sou eu?", 
      icon: User, 
      action: () => {
        speak(`Você é ${userName || 'uma pessoa especial'}. Você tem uma família que te ama muito. Você mora nesta casa há muitos anos e está seguro aqui.`);
        setLastReminder("Informações pessoais");
      }
    }
  ];

  const getTextClass = () => {
    // Textos extra grandes para pessoas com Alzheimer
    const baseSize = 'text-lg sm:text-xl md:text-2xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-2xl`;
      case 'medium': return `${baseSize} lg:text-3xl`;
      case 'large': return `${baseSize} lg:text-4xl`;
      case 'gigante': return `${baseSize} lg:text-5xl xl:text-6xl`;
      default: return `${baseSize} lg:text-3xl`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-2xl sm:text-3xl md:text-4xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-4xl`;
      case 'medium': return `${baseSize} lg:text-5xl`;
      case 'large': return `${baseSize} lg:text-6xl`;
      case 'gigante': return `${baseSize} lg:text-7xl xl:text-8xl`;
      default: return `${baseSize} lg:text-5xl`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white">
      {/* Header Reconfortante */}
      <header className="p-6 sm:p-8 lg:p-12 text-center border-b-2 border-emerald-400">
        <div className="flex justify-between items-center mb-4">
          <div className="w-12"></div>
          <h1 className={`${getTitleClass()} font-bold text-emerald-200`}>
            FALAPCD
          </h1>
          <Button
            onClick={() => onNavigate('settings')}
            onMouseEnter={() => speak("Configurações")}
            className="bg-emerald-600 hover:bg-emerald-500 p-3 sm:p-4 rounded-lg"
          >
            <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
        </div>
        
        {/* Informações reconfortantes */}
        <div className="bg-teal-800/50 rounded-xl p-6 border-2 border-teal-400/50 mb-4">
          <p className={`${getTextClass()} text-emerald-200 font-bold mb-2`}>
            {userName ? `Olá, ${userName}! 💚` : 'Olá! 💚'}
          </p>
          <div className="flex items-center justify-center space-x-6 text-center">
            <div>
              <Clock className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
              <p className={`${getTextClass()} text-emerald-300 font-bold`}>
                {currentTime}
              </p>
            </div>
            <div>
              <Calendar className="w-8 h-8 text-teal-300 mx-auto mb-2" />
              <p className="text-base sm:text-lg text-teal-300">
                {currentDate}
              </p>
            </div>
          </div>
        </div>

        {/* Último lembrete */}
        {lastReminder && (
          <div className="bg-green-700/30 rounded-lg p-4 border border-green-400/50">
            <p className={`${getTextClass()} text-green-200`}>
              ✅ {lastReminder}
            </p>
          </div>
        )}
      </header>

      <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-10">
        
        {/* Botões de Emergência/Orientação */}
        <div>
          <h2 className={`${getTextClass()} text-center text-yellow-200 font-bold mb-6`}>
            🛡️ Se você está confuso
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {emergencyActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                onMouseEnter={() => speak(action.text)}
                className={`${action.color} hover:scale-105 text-white p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-4`}
              >
                <action.icon className="w-12 h-12" />
                <span className={`${getTextClass()} font-bold text-center`}>
                  {action.text}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Lembretes Diários */}
        <div>
          <h2 className={`${getTextClass()} text-center text-cyan-200 font-bold mb-6`}>
            📝 Coisas Importantes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {dailyReminders.map((reminder, index) => (
              <Card
                key={index}
                className="bg-cyan-800/30 hover:bg-cyan-700/40 border-2 border-cyan-400/50 hover:border-cyan-300/70 transition-all duration-300 cursor-pointer"
                onClick={reminder.action}
                onMouseEnter={() => speak(reminder.text)}
              >
                <div className="p-8 flex flex-col items-center text-center space-y-4">
                  <reminder.icon 
                    size={48} 
                    className="text-cyan-300 w-12 h-12 lg:w-16 lg:h-16" 
                  />
                  <h3 className={`${getTextClass()} font-bold text-white leading-tight`}>
                    {reminder.text}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Mensagem de Segurança */}
        <div className="text-center">
          <div className="inline-block p-6 bg-emerald-700/30 rounded-xl border-2 border-emerald-400/50">
            <Heart className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
            <p className={`${getTextClass()} text-emerald-200 font-bold mb-2`}>
              Você está seguro
            </p>
            <p className="text-base sm:text-lg text-emerald-300">
              Sua família te ama e está cuidando de você
            </p>
          </div>
        </div>

        {/* Botão para Planos */}
        <div className="text-center">
          <Button
            onClick={() => onNavigate('plans')}
            onMouseEnter={() => speak("Ver planos disponíveis")}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-12 py-6 rounded-xl border-2 border-white shadow-lg"
          >
            <span className={`${getTextClass()} font-bold`}>Ver Planos</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlzheimerScreen;