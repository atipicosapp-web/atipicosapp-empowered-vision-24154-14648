import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Heart, 
  Coffee, 
  Moon, 
  Sun, 
  Utensils,
  Gamepad2,
  Music,
  Settings,
  CheckCircle,
  Home,
  Car,
  GraduationCap,
  MessageCircle,
  Camera,
  BookOpen,
  Sparkles,
  Map,
  Mic,
  SettingsIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AIChatField from '@/components/AIChatField';

interface AutismScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const AutismScreen = ({ onNavigate, textSize, voiceSpeed, userName }: AutismScreenProps) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [currentMood, setCurrentMood] = useState('');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8; // Velocidade calma
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const greeting = getGreeting();
      const message = userName 
        ? `${greeting}, ${userName}! Atípicos carregado. Ambiente calmo e organizado pronto.`
        : "Atípicos carregado. Seu espaço seguro e organizado está pronto.";
      speak(message);
    }, 1000);
  }, [userName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const communicationCards = [
    { text: "Previsões de Crises", icon: "⚠️", action: () => { speak("Previsões de Crises"); onNavigate('crises'); } },
    { text: "Cursos", icon: "📚", action: () => { speak("Cursos"); onNavigate('cursos'); } },
    { text: "Comunidade", icon: "👥", action: () => { speak("Comunidade"); onNavigate('comunidade'); } },
    { text: "Profissionais", icon: "👨‍⚕️", action: () => { speak("Profissionais"); onNavigate('profissionais'); } },
    { text: "Preciso de ajuda", icon: "🆘", action: () => { speak("Preciso de ajuda"); setCurrentMood("Preciso de ajuda"); } },
    { text: "Mundo Atípicos", icon: "🧩", action: () => { speak("Mundo Atípicos"); onNavigate('mundoatipicos'); } },
    { text: "Letrar", icon: "✏️", action: () => { speak("Letrar - Alfabetização"); onNavigate('letrar'); } },
    { text: "Fonoaudióloga", icon: "🎤", action: () => { speak("Fonoaudióloga"); onNavigate('fonoaudiologa'); } }
  ];


  const mainTools = [
    { text: "Professora IA", icon: GraduationCap, description: "Ensina e responde perguntas", action: () => speak("Professora IA") },
    { text: "Terapeuta Virtual", icon: Heart, description: "Suporte emocional e orientação", action: () => speak("Terapeuta Virtual") },
    { text: "Comunicação PECS", icon: MessageCircle, description: "Fale usando imagens", action: () => { speak("Comunicação PECS"); onNavigate('pecs'); } },
    { text: "Rotina Visual", icon: Calendar, description: "Organize seu dia com pictogramas", action: () => speak("Rotina Visual") },
    { text: "Leitura de Imagem", icon: Camera, description: "IA descreve fotos por voz", action: () => speak("Leitura de Imagem") },
    { text: "Tela de Emoções", icon: Heart, description: "Como você está se sentindo?", action: () => speak("Tela de Emoções") }
  ];

  const moreResources = [
    { text: "Som e Música", icon: Music, description: "Playlist relaxante" },
    { text: "Atividades Educativas", icon: BookOpen, description: "Jogos e aprendizado" },
    { text: "Espaço Sensorial", icon: Sparkles, description: "Relaxamento e calma" },
    { text: "Mapa Seguro", icon: Map, description: "Lugares tranquilos" },
    { text: "Comando de Voz", icon: Mic, description: "Controle por voz" },
    { text: "Configuração", icon: SettingsIcon, description: "Personalize seu app" }
  ];

  const dailyRoutine = [
    { id: 1, task: "Acordar", icon: Sun, time: "07:00", completed: false },
    { id: 2, task: "Café da manhã", icon: Coffee, time: "08:00", completed: false },
    { id: 3, task: "Atividade matinal", icon: Gamepad2, time: "09:00", completed: false },
    { id: 4, task: "Almoço", icon: Utensils, time: "12:00", completed: false },
    { id: 5, task: "Descanso", icon: Moon, time: "14:00", completed: false },
    { id: 6, task: "Lanche", icon: Coffee, time: "16:00", completed: false },
    { id: 7, task: "Jantar", icon: Utensils, time: "19:00", completed: false },
    { id: 8, task: "Dormir", icon: Moon, time: "21:00", completed: false }
  ];


  const handleTaskComplete = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      const task = dailyRoutine.find(t => t.id === taskId);
      speak(`${task?.task} concluída! Muito bem!`);
    } else {
      const task = dailyRoutine.find(t => t.id === taskId);
      speak(task?.task || '');
    }
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
      {/* Header Suave */}
      <header className="p-4 sm:p-6 lg:p-8 text-center border-b border-blue-300/50">
        <div className="flex justify-between items-center mb-3">
          <div className="w-12"></div>
          <h1 className={`${getTitleClass()} font-bold text-blue-800 scale-110`}>
            Atípicos 💙
          </h1>
          <Button
            onClick={() => {
              speak("Configurações");
              onNavigate('settings');
            }}
            className="bg-purple-600/70 hover:bg-purple-600 text-white p-2 sm:p-3 rounded-lg border border-purple-400/50"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>
        <p className={`${getTextClass()} text-purple-700`}>
          {userName ? `${getGreeting()}, ${userName}! 🌟` : 'Seu espaço calmo e organizado 🌈'}
        </p>
        
        {/* Humor atual */}
        {currentMood && (
          <div className="mt-3 p-3 bg-green-100 rounded-lg border border-green-300">
            <p className={`${getTextClass()} text-green-700`}>
              ✨ {currentMood}
            </p>
          </div>
        )}
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8">
        
        {/* Campo de IA */}
        <div className="mb-8">
          <AIChatField userName={userName} textSize={textSize} />
        </div>

        {/* Cartões de Comunicação (CAA) */}
        <div>
          <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-6`}>
            💬 Comunicação
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {communicationCards.map((card, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
                onClick={() => card.action()}
              >
                <div className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="text-2xl">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {card.text}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Suas Ferramentas Principais */}
        <div>
          <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-6`}>
            🌟 Suas Ferramentas Principais
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {mainTools.map((tool, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
                onClick={() => tool.action()}
              >
                <div className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    <tool.icon 
                      size={32} 
                      className="w-8 h-8 text-blue-600" 
                    />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {tool.text}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {tool.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Rotina Diária Visual */}
        <div>
          <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
            📅 Minha Rotina de Hoje
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {dailyRoutine.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <Card
                  key={task.id}
                  className={`cursor-pointer transition-all duration-300 border ${
                    isCompleted 
                      ? 'bg-green-100 border-green-400 scale-95' 
                      : 'bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105'
                  }`}
                  onClick={() => handleTaskComplete(task.id)}
                >
                  <div className="p-4 flex flex-col items-center text-center space-y-2">
                    <div className="relative">
                      <task.icon 
                        size={32} 
                        className={`w-8 h-8 ${isCompleted ? 'text-green-600' : 'text-blue-600'}`} 
                      />
                      {isCompleted && (
                        <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-600 bg-white rounded-full" />
                      )}
                    </div>
                    <h3 className={`text-sm font-bold ${isCompleted ? 'text-green-700' : 'text-gray-800'}`}>
                      {task.task}
                    </h3>
                    <p className={`text-xs ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                      {task.time}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Progresso do Dia */}
        <div className="text-center">
          <div className="inline-block p-4 bg-purple-100 rounded-lg border border-purple-300">
            <h3 className={`${getTextClass()} text-purple-700 font-bold mb-2`}>
              🏆 Progresso de Hoje
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-32 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500"
                  style={{ width: `${(completedTasks.length / dailyRoutine.length) * 100}%` }}
                ></div>
              </div>
              <span className={`${getTextClass()} text-blue-700 font-bold`}>
                {completedTasks.length}/{dailyRoutine.length}
              </span>
            </div>
          </div>
        </div>

        {/* Mais Recursos */}
        <div>
          <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-6`}>
            🎯 Mais Recursos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {moreResources.map((resource, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
                onClick={() => speak(resource.text)}
              >
                <div className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    <resource.icon 
                      size={32} 
                      className="w-8 h-8 text-blue-600" 
                    />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {resource.text}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {resource.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Área da Família */}
        <div>
          <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-6`}>
            👨‍👩‍👧‍👦 Área da Família
          </h2>
          <div className="max-w-md mx-auto">
            <Card className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105">
              <div className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="text-3xl">🛡️</div>
                <h3 className="text-lg font-bold text-gray-800">
                  Configure rotinas e acompanhe o progresso
                </h3>
                <p className="text-sm text-gray-600">
                  Acesse ferramentas para familiares
                </p>
                <Button
                  onClick={() => speak("Área da família")}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
                >
                  Acessar
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Botão para Loja */}
        <div>
          <div className="max-w-md mx-auto">
            <Card className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105">
              <div className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="text-3xl">🛒</div>
                <h3 className="text-lg font-bold text-gray-800">
                  Conheça nossa Loja com produtos para autistas e atípicos
                </h3>
                <p className="text-sm text-gray-600">
                  Produtos especiais selecionados para você
                </p>
                <Button
                  onClick={() => {
                    speak("Loja Atípicos");
                    onNavigate('shop');
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
                >
                  Venha conhecer!
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Botão para Planos */}
        <div className="text-center">
          <Button
            onClick={() => {
              speak("Ver planos disponíveis");
              onNavigate('plans');
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl border border-purple-300 shadow-lg"
          >
            <span className={`${getTextClass()} font-bold`}>Ver Planos</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutismScreen;