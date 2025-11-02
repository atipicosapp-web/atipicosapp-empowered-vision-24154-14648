import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatFieldProps {
  userName?: string;
  textSize: string;
}

const AIChatField = ({ userName, textSize }: AIChatFieldProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [aiMode, setAiMode] = useState<'terapeutico' | 'educativo' | 'assistente'>('terapeutico');
  const [isThinking, setIsThinking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const playSound = (type: 'start' | 'response') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'start') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    } else {
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + (type === 'start' ? 0.1 : 0.2));
  };

  useEffect(() => {
    // Mensagem de boas-vindas removida
  }, [userName]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pt-BR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string, mode: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (mode === 'terapeutico') {
      if (lowerMessage.includes('triste') || lowerMessage.includes('mal') || lowerMessage.includes('ansioso')) {
        return 'Entendo que você está se sentindo assim. É importante expressar seus sentimentos. Estou aqui para ouvir você. Que tal fazermos uma respiração calma juntos?';
      }
      if (lowerMessage.includes('feliz') || lowerMessage.includes('bem') || lowerMessage.includes('alegre')) {
        return 'Que maravilha saber que você está se sentindo bem! É muito importante celebrar esses momentos. O que está fazendo você se sentir assim?';
      }
      return 'Estou aqui para apoiar você. Me conte mais sobre como você está se sentindo hoje. Seus sentimentos são importantes.';
    }
    
    if (mode === 'educativo') {
      if (lowerMessage.includes('aprender') || lowerMessage.includes('ensinar') || lowerMessage.includes('estudar')) {
        return 'Excelente! Aprender coisas novas é sempre uma aventura incrível. Posso ajudar você com cores, números, letras e muito mais. O que você gostaria de aprender hoje?';
      }
      if (lowerMessage.includes('cor') || lowerMessage.includes('cores')) {
        return 'As cores são fascinantes! Temos o azul do céu, o verde das árvores, o amarelo do sol... Qual é a sua cor favorita?';
      }
      return 'Estou aqui para ensinar de forma calma e divertida. Podemos aprender sobre números, letras, cores, formas e muito mais. O que te interessa?';
    }
    
    if (mode === 'assistente') {
      if (lowerMessage.includes('rotina') || lowerMessage.includes('horário')) {
        return 'Vou ajudar você a organizar sua rotina! Uma rotina estruturada ajuda a deixar o dia mais tranquilo. Quer que eu te mostre suas atividades de hoje?';
      }
      if (lowerMessage.includes('ajuda') || lowerMessage.includes('ajudar')) {
        return 'Claro! Estou aqui para facilitar seu dia. Posso ajudar com lembretes, atividades, comunicação e muito mais. O que você precisa?';
      }
      return 'Estou aqui para ajudar no seu dia a dia. Posso te auxiliar com rotinas, lembretes e qualquer coisa que você precisar. Como posso ajudar agora?';
    }
    
    return 'Entendi! Como posso ajudar você com isso?';
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText.trim();
    if (!textToSend) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(textToSend, aiMode);
      const assistantMessage: Message = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
      playSound('response');
      speak(aiResponse);
    }, 800);
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      playSound('start');
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const getTextClass = () => {
    switch (textSize) {
      case 'small': return 'text-sm';
      case 'medium': return 'text-base';
      case 'large': return 'text-lg';
      case 'gigante': return 'text-xl';
      default: return 'text-base';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="w-full px-2">
      <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg rounded-3xl overflow-hidden">
        <div className="space-y-0">

          {/* Área de Mensagens */}
          {messages.length > 0 && (
            <div className="max-h-[150px] overflow-y-auto space-y-2 p-3 bg-gray-50/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-white border-2 border-purple-200 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p className={getTextClass()}>{message.content}</p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border-2 border-purple-200 text-gray-800 p-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Campo de Entrada compacto - horizontal */}
          <div className="p-2">
            <div className="flex items-center gap-2 bg-gray-100/80 rounded-full px-4 py-2.5">
              {/* Botão Plus */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/50 flex-shrink-0 p-0"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </Button>

              {/* Input */}
              <div className="flex-1 px-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Chat ou Fale"
                  className="w-full bg-transparent text-base focus:outline-none text-gray-700 placeholder:text-gray-500"
                />
              </div>

              {/* Botão Microfone */}
              <Button
                onClick={startRecording}
                disabled={isRecording}
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full flex-shrink-0 p-0 ${
                  isRecording 
                    ? 'bg-red-100 hover:bg-red-200 text-red-600 animate-pulse' 
                    : 'hover:bg-white/50 text-gray-600'
                }`}
              >
                <Mic className="h-4 w-4" />
              </Button>

              {/* Botão Enviar */}
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex-shrink-0 disabled:opacity-30 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChatField;