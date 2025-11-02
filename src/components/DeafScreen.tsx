import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Type, 
  Camera, 
  Brain, 
  Calendar, 
  Phone,
  Settings,
  Send,
  Mic,
  MicOff,
  Pill,
  Music,
  Tv,
  AlertTriangle,
  UserCog
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LibrasAvatar from './LibrasAvatar';

interface DeafScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  userName?: string;
}

const DeafScreen = ({ onNavigate, textSize, userName }: DeafScreenProps) => {
  const [textQuery, setTextQuery] = useState('');
  const [currentLibrasText, setCurrentLibrasText] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    const greeting = getGreeting();
    const message = userName 
      ? `${greeting}, ${userName}! FALAPCD carregado com suporte completo em Libras.`
      : "FALAPCD carregado com suporte completo em Libras.";
    setCurrentLibrasText(message);
  }, [userName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleTextQuery = () => {
    if (textQuery.trim()) {
      setCurrentLibrasText(`Processando: ${textQuery}`);
      // Aqui será integrada a API do ChatGPT
      setTextQuery('');
    }
  };

  const startTranscription = () => {
    setIsTranscribing(!isTranscribing);
    if (!isTranscribing) {
      setCurrentLibrasText("Transcrição ativada");
      // Aqui seria implementada a transcrição de áudio para texto
      setTimeout(() => {
        setTranscribedText("Exemplo de texto transcrito em tempo real");
        setCurrentLibrasText("Texto transcrito com sucesso");
        setIsTranscribing(false);
      }, 3000);
    }
  };

  const quickPhrases = [
    "Preciso de ajuda",
    "Obrigado",
    "Não entendi",
    "Pode repetir?",
    "Estou bem",
    "Chamar emergência"
  ];

  const features = [
    { icon: Calendar, text: "AGENDA", action: () => setCurrentLibrasText("Agenda aberta") },
    { icon: Pill, text: "REMÉDIOS", action: () => setCurrentLibrasText("Lembrete de remédios ativo") },
    { icon: Phone, text: "TELEFONE", action: () => setCurrentLibrasText("Telefone aberto") },
    { icon: Music, text: "MÚSICA", action: () => setCurrentLibrasText("Música iniciada") },
    { icon: Tv, text: "TV", action: () => setCurrentLibrasText("TV aberta") },
    { icon: AlertTriangle, text: "EMERGÊNCIA (192)", action: () => setCurrentLibrasText("Chamando emergência 192") },
    { icon: UserCog, text: "CHAMAR CUIDADOR", action: () => setCurrentLibrasText("Chamando cuidador") },
    { icon: Camera, text: "VER POR MIM", action: () => setCurrentLibrasText("Câmera ativa para descrição") }
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-3 sm:p-4 lg:p-6 text-center border-b-2 border-primary">
        <div className="flex justify-between items-center mb-2">
          <div className="w-12"></div>
          <h1 className={`${getTitleClass()} font-bold text-primary`}>
            FALAPCD
          </h1>
          <Button
            onClick={() => onNavigate('settings')}
            className="bg-secondary hover:bg-secondary/80 p-2 sm:p-3 rounded-lg"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>
        <p className={`${getTextClass()} text-accent`}>
          {userName ? `${getGreeting()}, ${userName}! 👋` : 'Comunicação em Libras ativa 🤟'}
        </p>
      </header>

      <div className="flex flex-col items-center px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        
        {/* Transcrição de Áudio */}
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <button
            onClick={startTranscription}
            className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-4 ${
              isTranscribing ? 'bg-red-600 border-red-400 animate-pulse' : 'bg-primary border-accent'
            } flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg`}
          >
            {isTranscribing ? <MicOff size={32} className="text-primary-foreground" /> : <Mic size={32} className="text-primary-foreground" />}
          </button>
          
          <p className={`${getTextClass()} text-center text-primary font-medium max-w-xs`}>
            {isTranscribing ? 'Transcrevendo áudio...' : 'Toque para transcrever áudio'}
          </p>
          
          {transcribedText && (
            <div className="p-3 bg-card rounded-lg border-2 border-accent max-w-sm">
              <p className={`${getTextClass()} text-center text-card-foreground`}>
                📝 {transcribedText}
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
              onKeyPress={(e) => e.key === 'Enter' && handleTextQuery()}
              className="bg-card border-2 border-primary text-card-foreground text-base sm:text-lg p-3 sm:p-4 rounded-xl flex-1"
              placeholder="Digite aqui sua dúvida"
            />
            <Button
              onClick={handleTextQuery}
              disabled={!textQuery.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 sm:py-4 rounded-xl border-2 border-accent"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Frases Rápidas */}
        <div className="w-full max-w-md">
          <h3 className={`${getTextClass()} text-center text-primary font-bold mb-3`}>
            Frases Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickPhrases.map((phrase, index) => (
              <Button
                key={index}
                onClick={() => {
                  setTextQuery(phrase);
                  setCurrentLibrasText(phrase);
                }}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground p-2 rounded-lg text-sm"
              >
                {phrase}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de Funcionalidades */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full max-w-2xl">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-2 border-primary hover:border-accent transition-all duration-200 cursor-pointer"
              onClick={feature.action}
            >
              <div className="p-3 sm:p-4 flex flex-col items-center text-center space-y-2 sm:space-y-3 min-h-[120px] justify-center">
                <feature.icon 
                  size={32} 
                  className="text-primary w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" 
                />
                <h3 className={`text-xs sm:text-sm lg:text-base font-bold text-card-foreground leading-tight uppercase`}>
                  {feature.text}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Botão para Planos */}
        <Button
          onClick={() => onNavigate('plans')}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-xl border-2 border-primary-foreground shadow-lg mt-4 sm:mt-6"
        >
          <span className={`${getTextClass()} font-bold`}>VER PLANOS</span>
        </Button>
      </div>

      {/* Avatar de Libras sempre visível */}
      <LibrasAvatar 
        isVisible={true}
        currentText={currentLibrasText}
      />
    </div>
  );
};

export default DeafScreen;