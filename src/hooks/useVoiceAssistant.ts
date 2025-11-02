import { useState, useCallback, useRef } from 'react';

// Declare global interfaces for Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface VoiceResponse {
  nome_do_app?: string;
  resposta_voz: string;
  comando_abrir?: string;
}

interface AppMapping {
  [key: string]: {
    package: string;
    displayName: string;
  };
}

const APP_MAPPINGS: AppMapping = {
  'netflix': { package: 'com.netflix.mediaclient', displayName: 'Netflix' },
  'youtube': { package: 'com.google.android.youtube', displayName: 'YouTube' },
  'whatsapp': { package: 'com.whatsapp', displayName: 'WhatsApp' },
  'instagram': { package: 'com.instagram.android', displayName: 'Instagram' },
  'facebook': { package: 'com.facebook.katana', displayName: 'Facebook' },
  'spotify': { package: 'com.spotify.music', displayName: 'Spotify' },
  'gmail': { package: 'com.google.android.gm', displayName: 'Gmail' },
  'chrome': { package: 'com.android.chrome', displayName: 'Chrome' },
  'maps': { package: 'com.google.android.apps.maps', displayName: 'Google Maps' },
  'uber': { package: 'com.ubercab', displayName: 'Uber' },
  'telegram': { package: 'org.telegram.messenger', displayName: 'Telegram' },
  'tiktok': { package: 'com.zhiliaoapp.musically', displayName: 'TikTok' },
  'twitter': { package: 'com.twitter.android', displayName: 'Twitter' },
  'x': { package: 'com.twitter.android', displayName: 'X' },
  'amazon': { package: 'com.amazon.mshop.android.shopping', displayName: 'Amazon' },
  'mercado livre': { package: 'com.mercadolibre', displayName: 'Mercado Livre' },
  'ifood': { package: 'br.com.brainweb.ifood', displayName: 'iFood' },
  'nubank': { package: 'com.nu.production', displayName: 'Nubank' },
  'banco do brasil': { package: 'br.com.bb.android', displayName: 'Banco do Brasil' },
  'caixa': { package: 'br.gov.caixa.tem', displayName: 'Caixa' },
  'globoplay': { package: 'com.globo.globoplay', displayName: 'Globoplay' },
  'camera': { package: 'com.android.camera2', displayName: 'Câmera' },
  'galeria': { package: 'com.google.android.apps.photos', displayName: 'Galeria' },
  'telefone': { package: 'com.google.android.dialer', displayName: 'Telefone' },
  'contatos': { package: 'com.android.contacts', displayName: 'Contatos' },
  'calendario': { package: 'com.google.android.calendar', displayName: 'Calendário' },
  'calculadora': { package: 'com.google.android.calculator', displayName: 'Calculadora' },
  'configurações': { package: 'com.android.settings', displayName: 'Configurações' },
};

export const useVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastResponse, setLastResponse] = useState<VoiceResponse | null>(null);
  const recognitionRef = useRef<any>(null);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const extractAppFromCommand = useCallback((command: string): VoiceResponse => {
    const lowerCommand = command.toLowerCase();
    
    // Padrões de comando para abrir apps
    const openPatterns = [
      /(?:abrir|abra|abre)\s+(.+)/,
      /(?:quero abrir|quero acessar)\s+(.+)/,
      /(?:assistir|assista)\s+(.+)/,
      /(?:jogar|joga|jogue)\s+(.+)/,
      /(?:mostrar|mostra|mostre)\s+(.+)/,
      /(?:acessar|acessa|acesse)\s+(.+)/,
      /(?:entrar|entra|entre)\s+(?:no|na)?\s*(.+)/,
    ];

    for (const pattern of openPatterns) {
      const match = lowerCommand.match(pattern);
      if (match && match[1]) {
        const appName = match[1].trim();
        const appKey = Object.keys(APP_MAPPINGS).find(key => 
          appName.includes(key) || key.includes(appName)
        );

        if (appKey && APP_MAPPINGS[appKey]) {
          const app = APP_MAPPINGS[appKey];
          return {
            nome_do_app: app.displayName,
            resposta_voz: `Abrindo ${app.displayName} agora.`,
            comando_abrir: `intent://${appKey}/#Intent;package=${app.package};end;`
          };
        } else {
          return {
            nome_do_app: appName,
            resposta_voz: `Tentando abrir ${appName} agora.`,
            comando_abrir: ""
          };
        }
      }
    }

    return {
      resposta_voz: "Desculpe, não entendi qual aplicativo você quer abrir. Tente dizer 'Abrir' seguido do nome do aplicativo."
    };
  }, []);

  const openApp = useCallback((comando_abrir: string) => {
    if (comando_abrir && typeof window !== 'undefined') {
      try {
        // Tentar abrir usando intent URL
        window.location.href = comando_abrir;
        
        // Fallback: tentar abrir em nova aba após 2 segundos se não funcionou
        setTimeout(() => {
          window.open(comando_abrir, '_blank');
        }, 2000);
      } catch (error) {
        console.error('Erro ao tentar abrir aplicativo:', error);
        speak('Não foi possível abrir o aplicativo solicitado.');
      }
    }
  }, [speak]);

  const processVoiceCommand = useCallback((command: string) => {
    const response = extractAppFromCommand(command);
    setLastResponse(response);
    
    speak(response.resposta_voz);
    
    if (response.comando_abrir) {
      // Aguardar um pouco para a resposta de voz antes de tentar abrir o app
      setTimeout(() => {
        openApp(response.comando_abrir!);
      }, 1500);
    }

    return response;
  }, [extractAppFromCommand, speak, openApp]);

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const command = event.results[0][0].transcript;
        console.log('Comando recebido:', command);
        processVoiceCommand(command);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Erro no reconhecimento de voz:', event.error);
        setIsListening(false);
        speak('Houve um erro no reconhecimento de voz. Tente novamente.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      speak('Reconhecimento de voz não é suportado neste navegador.');
    }
  }, [processVoiceCommand, speak]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    lastResponse,
    startListening,
    stopListening,
    processVoiceCommand,
    speak
  };
};