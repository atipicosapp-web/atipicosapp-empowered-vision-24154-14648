
import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Camera, 
  Brain, 
  RotateCcw, 
  Search, 
  GraduationCap, 
  Volume2, 
  Calendar, 
  Phone,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import LibrasAvatar from './LibrasAvatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

interface HomeScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
  userDisability?: string;
}

const HomeScreen = ({ onNavigate, textSize, voiceSpeed, userName, userDisability }: HomeScreenProps) => {
  const [spokenText, setSpokenText] = useState('');
  const [textQuery, setTextQuery] = useState('');
  const [currentLibrasText, setCurrentLibrasText] = useState('');
  
  const { 
    isListening, 
    startListening, 
    stopListening, 
    processVoiceCommand, 
    speak: voiceAssistantSpeak,
    lastResponse 
  } = useVoiceAssistant();

  const speak = (text: string) => {
    // Para usuários surdos, apenas atualiza o texto do Libras
    if (userDisability === 'surdo-mudo') {
      setCurrentLibrasText(text);
      return;
    }
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
    
    // Também atualiza o Libras se disponível
    setCurrentLibrasText(text);
  };

  const handleVoiceCommand = () => {
    if (!isListening) {
      speak("Assistente ativo. Diga 'Abrir' seguido do nome do aplicativo.");
      startListening();
    } else {
      stopListening();
    }
  };

  const handleHelp = () => {
    speak("FALAPCD ativo. Use o microfone central para comandos que começam com FALAPCD ou toque nos botões.");
  };

  const features = [
    { icon: Camera, text: "Ver por mim", action: () => speak("Câmera ativa") },
    { icon: Brain, text: "Assistente", action: () => speak("Assistente ativo") },
    { icon: RotateCcw, text: "Memória", action: () => speak("Memória aberta") },
    { icon: Search, text: "Ambiente", action: () => speak("Analisando ambiente") },
    { icon: GraduationCap, text: "Aprender app", action: () => speak("Modo ensino") },
    { icon: Volume2, text: "Ler texto", action: () => speak("Leitor ativo") },
    { icon: Calendar, text: "Agenda", action: () => speak("Agenda aberta") },
    { icon: Phone, text: "Emergência", action: () => speak("Emergência") }
  ];

  useEffect(() => {
    setTimeout(() => {
      const greeting = getGreeting();
      const message = userName 
        ? `${greeting}, ${userName}! FALAPCD carregado e pronto para ajudar.`
        : "FALAPCD carregado e pronto para ajudar.";
      speak(message);
    }, 1000);
  }, [userName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleTextQuery = () => {
    if (textQuery.trim()) {
      // Verificar se é um comando para abrir app
      const response = processVoiceCommand(textQuery);
      if (response.nome_do_app) {
        setSpokenText(`Abrindo ${response.nome_do_app}`);
      } else {
        speak(`Processando: ${textQuery}`);
        setSpokenText("Processando sua pergunta...");
      }
      setTextQuery('');
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
    <div className="min-h-screen bg-black text-white">
      {/* Header com botão de configurações */}
      <header className="p-3 sm:p-4 lg:p-6 text-center border-b-2 border-blue-600">
        <div className="flex justify-between items-center mb-2">
          <div className="w-12"></div>
        <h1 className={`${getTitleClass()} font-bold text-blue-300`}>
            FALAPCD
          </h1>
          <Button
            onClick={() => onNavigate('settings')}
            className="bg-purple-700 hover:bg-purple-600 p-2 sm:p-3 rounded-lg"
            onMouseEnter={() => speak("Configurações")}
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>
        <p className={`${getTextClass()} text-purple-300`}>
          {userName ? `${getGreeting()}, ${userName}!` : 'Sua acessibilidade inteligente'}
        </p>
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-col items-center px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        
        {/* Microfone Central Compacto */}
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <button
            onClick={handleVoiceCommand}
            onMouseEnter={() => speak("Microfone")}
            className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-4 ${
              isListening ? 'bg-red-600 border-red-400 animate-pulse' : 'bg-blue-600 border-blue-400'
            } flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg`}
          >
            <Mic size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
          </button>
          
          <p className={`${getTextClass()} text-center text-blue-300 font-medium max-w-xs`}>
            {isListening ? 'Escutando...' : 'Toque para falar'}
          </p>
          
          {(spokenText || lastResponse?.resposta_voz) && (
            <div className="p-2 sm:p-3 bg-purple-800 rounded-lg border-2 border-purple-600 max-w-xs">
              <p className={`${getTextClass()} text-center text-white`}>
                {lastResponse?.resposta_voz || spokenText}
              </p>
            </div>
          )}
        </div>

        {/* Campo de Digitação */}
        <div className="w-full max-w-md">
          <div className="flex space-x-2">
            <Input
              value={textQuery}
              onChange={(e) => setTextQuery(e.target.value)}
              onFocus={() => speak("Digite aqui sua dúvida")}
              onKeyPress={(e) => e.key === 'Enter' && handleTextQuery()}
              className="bg-gray-800 border-2 border-blue-500 text-white text-base sm:text-lg p-3 sm:p-4 rounded-xl flex-1"
              placeholder="Digite aqui sua dúvida..."
            />
            <Button
              onClick={handleTextQuery}
              onMouseEnter={() => speak("Enviar pergunta")}
              disabled={!textQuery.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 sm:py-4 rounded-xl border-2 border-blue-400"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Botão de Ajuda Compacto */}
        <Button
          onClick={handleHelp}
          onMouseEnter={() => speak("Ajuda")}
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-purple-500"
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className={getTextClass()}>Ajuda</span>
        </Button>

        {/* Grid de Funcionalidades - 2 colunas, botões compactos */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900 border-2 border-blue-600 hover:border-purple-500 transition-all duration-200 cursor-pointer"
              onClick={feature.action}
              onMouseEnter={() => speak(feature.text)}
            >
              <div className="p-3 sm:p-4 flex flex-col items-center text-center space-y-2 sm:space-y-3 min-h-[140px] sm:min-h-[160px] justify-center">
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
          onMouseEnter={() => speak("Ver planos")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-xl border-2 border-white shadow-lg mt-4 sm:mt-6"
        >
          <span className={`${getTextClass()} font-bold`}>Ver Planos</span>
        </Button>

        {/* Links de Políticas e Termos */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-border/50 text-xs sm:text-sm">
          <a 
            href="/politica-privacidade" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Política de Privacidade
          </a>
          <span className="text-muted-foreground">•</span>
          <a 
            href="/termos-uso" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Termos de Uso
          </a>
          <span className="text-muted-foreground">•</span>
          <a 
            href="/lgpd" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            LGPD
          </a>
          <span className="text-muted-foreground">•</span>
          <a 
            href="/acessibilidade" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Acessibilidade
          </a>
          <span className="text-muted-foreground">•</span>
          <a 
            href="/ouvidoria" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Ouvidoria
          </a>
        </div>
      </div>

      {/* Avatar de Libras para usuários surdos */}
      <LibrasAvatar 
        isVisible={userDisability === 'surdo-mudo'}
        currentText={currentLibrasText}
      />
    </div>
  );
};

export default HomeScreen;
