import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft,
  Type,
  Volume2,
  Vibrate,
  Mic,
  Settings as SettingsIcon,
  Zap,
  MicIcon,
  Shield,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SettingsScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  onTextSizeChange: (size: string) => void;
  voiceSpeed: string;
  onVoiceSpeedChange: (speed: string) => void;
}

const SettingsScreen = ({ 
  onNavigate, 
  textSize, 
  onTextSizeChange, 
  voiceSpeed, 
  onVoiceSpeedChange 
}: SettingsScreenProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [microphoneMode, setMicrophoneMode] = useState('app-aberto');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: 'pt-BR' as const, name: t('lang.portuguese') },
    { code: 'en' as const, name: t('lang.english') },
    { code: 'es' as const, name: t('lang.spanish') }
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speak(t('settings.speechOpened'));
  }, []);

  const handleTextSizeChange = (size: string) => {
    onTextSizeChange(size);
    const sizeNames: Record<string, string> = {
      'small': t('settings.sizeSmall'),
      'medium': t('settings.sizeMedium'),
      'large': t('settings.sizeLarge'),
      'gigante': t('settings.sizeGiant')
    };
    speak(sizeNames[size] || size);
  };

  const handleVoiceSpeedChange = (speed: string) => {
    onVoiceSpeedChange(speed);
    const speedNames: Record<string, string> = {
      'normal': t('settings.speedNormal'),
      'fast': t('settings.speedFast'),
      'ultra-fast': t('settings.speedUltraFast')
    };
    speak(speedNames[speed] || speed);
  };

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
    if (voiceEnabled) {
      speak(t('settings.inactive'));
    }
  };

  const handleVibrationToggle = () => {
    setVibrationEnabled(!vibrationEnabled);
    speak(`${t('settings.vibration')} ${!vibrationEnabled ? t('settings.active') : t('settings.inactive')}`);
  };

  const handleMicrophoneModeChange = (mode: string) => {
    setMicrophoneMode(mode);
    const modeNames: Record<string, string> = {
      'sempre': t('settings.micAlways'),
      'tela-ligada': t('settings.micScreenOn'),
      'app-aberto': t('settings.micAppOpen')
    };
    speak(modeNames[mode] || mode);
  };

  const handleLanguageChange = (langCode: 'pt-BR' | 'en' | 'es') => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
    const langName = languages.find(l => l.code === langCode)?.name || '';
    speak(`${t('settings.speechLanguageChanged')} ${langName}`);
  };

  const textSizes = [
    { key: 'small', label: t('settings.sizeSmall'), class: 'text-sm' },
    { key: 'medium', label: t('settings.sizeMedium'), class: 'text-base' },
    { key: 'large', label: t('settings.sizeLarge'), class: 'text-lg' },
    { key: 'gigante', label: t('settings.sizeGiant'), class: 'text-xl' }
  ];

  const voiceSpeeds = [
    { key: 'normal', label: t('settings.speedNormal'), icon: Volume2 },
    { key: 'fast', label: t('settings.speedFast'), icon: Zap },
    { key: 'ultra-fast', label: t('settings.speedUltraFast'), icon: Zap }
  ];

  const microphoneModes = [
    { key: 'sempre', label: t('settings.micAlways'), description: t('settings.micAlwaysDesc') },
    { key: 'tela-ligada', label: t('settings.micScreenOn'), description: t('settings.micScreenOnDesc') },
    { key: 'app-aberto', label: t('settings.micAppOpen'), description: t('settings.micAppOpenDesc') }
  ];

  const voiceCommands = [
    "ATIPICOS, abrir o YouTube",
    "ATIPICOS, ligar para a Ana",
    "ATIPICOS, abrir a câmera",
    "ATIPICOS, mudar de canal",
    "ATIPICOS, entrar no Instagram e ler notificações"
  ];

  const getTextClass = () => {
    const baseSize = 'text-sm sm:text-base';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-lg`;
      case 'medium': return `${baseSize} lg:text-xl`;
      case 'large': return `${baseSize} lg:text-2xl`;
      case 'gigante': return `${baseSize} lg:text-3xl`;
      default: return `${baseSize} lg:text-xl`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-lg sm:text-xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-2xl`;
      case 'medium': return `${baseSize} lg:text-3xl`;
      case 'large': return `${baseSize} lg:text-4xl`;
      case 'gigante': return `${baseSize} lg:text-5xl`;
      default: return `${baseSize} lg:text-3xl`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 text-gray-800">
      {/* Header */}
      <header className="p-3 sm:p-4 lg:p-6 border-b-2 border-blue-300/50 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            onClick={() => onNavigate('home')}
            onMouseEnter={() => speak(t('settings.back'))}
            className="bg-blue-500/70 hover:bg-blue-500 text-white p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 border border-blue-400/50"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h1 className={`${getTitleClass()} font-bold text-blue-700 flex items-center`}>
            <SettingsIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            {t('settings.title')}
          </h1>
        </div>
        
        {/* Botão de idioma no header das configurações */}
        <div className="relative">
          <Button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="bg-blue-500/70 hover:bg-blue-500 text-white p-2 sm:p-3 rounded-lg border border-blue-400/50"
          >
            <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          {showLanguageMenu && (
            <div className="absolute right-0 top-12 bg-white backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-100 first:rounded-t-lg last:rounded-b-lg ${
                    language === lang.code ? 'bg-blue-200 text-gray-900 font-bold' : 'text-gray-800'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Seção de Idioma */}
        <Card className="bg-white/70 border-2 border-purple-300">
          <div className="p-4 sm:p-6">
            <h2 className={`${getTitleClass()} font-bold text-gray-800 mb-4 sm:mb-6 flex items-center`}>
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-600" />
              {t('settings.language')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  onMouseEnter={() => speak(lang.name)}
                  className={`${
                    language === lang.code 
                      ? 'bg-purple-400 border-purple-300 text-white' 
                      : 'bg-white/50 border-gray-300 text-gray-800'
                  } border-2 hover:bg-purple-300 py-3 sm:py-4 rounded-xl transition-all duration-200`}
                >
                  <span className={getTextClass()}>{lang.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
        
        {/* SEÇÃO: Microfone Ativo Sempre */}
        <Card className="bg-white/70 border-2 border-red-300">
          <div className="p-4 sm:p-6">
            <h2 className={`${getTitleClass()} font-bold text-gray-800 mb-4 sm:mb-6 flex items-center`}>
              <MicIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-red-500" />
              🎙️ {t('settings.microphoneTitle')}
            </h2>
            
            <div className="mb-4 sm:mb-6 bg-red-100/70 p-3 sm:p-4 rounded-lg border border-red-200">
              <p className={`${getTextClass()} text-red-800 mb-3 sm:mb-4`}>
                {t('settings.microphoneDescription')}
              </p>
              <ul className="space-y-1 sm:space-y-2">
                {voiceCommands.map((command, index) => (
                  <li key={index} className={`${getTextClass()} text-red-700`}>
                    • "{command}"
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <h3 className={`${getTextClass()} font-semibold text-gray-800 mb-2`}>
                {t('settings.activationOptions')}
              </h3>
              {microphoneModes.map((mode) => (
                <Button
                  key={mode.key}
                  onClick={() => handleMicrophoneModeChange(mode.key)}
                  onMouseEnter={() => speak(mode.label)}
                  className={`w-full ${
                    microphoneMode === mode.key 
                      ? 'bg-red-400 border-red-300 text-white' 
                      : 'bg-white/50 border-gray-300 text-gray-800'
                  } border-2 hover:bg-red-300 py-3 sm:py-4 rounded-xl transition-all duration-200 text-left`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className={`${getTextClass()} font-medium`}>
                        {microphoneMode === mode.key ? '✓ ' : ''}{mode.label}
                      </div>
                      <div className={`text-xs sm:text-sm ${microphoneMode === mode.key ? 'text-white/90' : 'text-gray-600'}`}>
                        {mode.description}
                      </div>
                    </div>
                    <MicIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Button>
              ))}
            </div>

            {/* Aviso de Segurança */}
            <div className="bg-yellow-100/70 border border-yellow-300 p-3 sm:p-4 rounded-lg flex items-start">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-yellow-800 mb-1">
                  {t('settings.securityWarning')}
                </h4>
                <p className="text-xs sm:text-sm text-yellow-700">
                  {t('settings.securityText')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Velocidade da Voz */}
        <Card className="bg-white/70 border-2 border-green-300">
          <div className="p-4 sm:p-6">
            <h2 className={`${getTitleClass()} font-bold text-gray-800 mb-4 sm:mb-6 flex items-center`}>
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-green-600" />
              {t('settings.voiceSpeed')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {voiceSpeeds.map((speed) => (
                <Button
                  key={speed.key}
                  onClick={() => handleVoiceSpeedChange(speed.key)}
                  onMouseEnter={() => speak(speed.label)}
                  className={`${
                    voiceSpeed === speed.key 
                      ? 'bg-green-400 border-green-300 text-white' 
                      : 'bg-white/50 border-gray-300 text-gray-800'
                  } border-2 hover:bg-green-300 py-3 sm:py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2`}
                >
                  <speed.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className={getTextClass()}>{speed.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tamanho do Texto */}
        <Card className="bg-white/70 border-2 border-blue-300">
          <div className="p-4 sm:p-6">
            <h2 className={`${getTitleClass()} font-bold text-gray-800 mb-4 sm:mb-6 flex items-center`}>
              <Type className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
              {t('settings.textSize')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {textSizes.map((size) => (
                <Button
                  key={size.key}
                  onClick={() => handleTextSizeChange(size.key)}
                  onMouseEnter={() => speak(size.label)}
                  className={`${
                    textSize === size.key 
                      ? 'bg-blue-400 border-blue-300 text-white' 
                      : 'bg-white/50 border-gray-300 text-gray-800'
                  } border-2 hover:bg-blue-300 py-3 sm:py-4 rounded-xl transition-all duration-200`}
                >
                  <span className={size.class}>{size.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Configurações de Voz */}
        <Card className="bg-white/70 border-2 border-purple-300">
          <div className="p-4 sm:p-6">
            <h2 className={`${getTitleClass()} font-bold text-gray-800 mb-4 sm:mb-6 flex items-center`}>
              <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-600" />
              {t('settings.voiceReading')}
            </h2>
            
            <div className="flex items-center justify-between">
              <span className={`${getTextClass()} text-gray-800`}>
                {t('settings.autoReading')}
              </span>
              <Button
                onClick={handleVoiceToggle}
                onMouseEnter={() => speak(`${t('settings.voiceReading')} ${voiceEnabled ? t('settings.active') : t('settings.inactive')}`)}
                className={`${
                  voiceEnabled ? 'bg-green-400 border-green-300' : 'bg-red-400 border-red-300'
                } hover:opacity-80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2`}
              >
                {voiceEnabled ? t('settings.active') : t('settings.inactive')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Vibração */}
        <Card className="bg-white/70 border-2 border-yellow-300">
          <div className="p-4 sm:p-6">
            <h2 className={`${getTitleClass()} font-bold text-gray-800 mb-4 sm:mb-6 flex items-center`}>
              <Vibrate className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-yellow-600" />
              {t('settings.vibration')}
            </h2>
            
            <div className="flex items-center justify-between">
              <span className={`${getTextClass()} text-gray-800`}>
                {t('settings.vibrationButtons')}
              </span>
              <Button
                onClick={handleVibrationToggle}
                onMouseEnter={() => speak(`${t('settings.vibration')} ${vibrationEnabled ? t('settings.active') : t('settings.inactive')}`)}
                className={`${
                  vibrationEnabled ? 'bg-green-400 border-green-300' : 'bg-red-400 border-red-300'
                } hover:opacity-80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2`}
              >
                {vibrationEnabled ? t('settings.active') : t('settings.inactive')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Teste de Configurações */}
        <Card className="bg-white/70 border-2 border-blue-300">
          <div className="p-4 sm:p-6 text-center">
            <h2 className={`${getTitleClass()} font-bold text-gray-800 mb-3 sm:mb-4`}>
              {t('settings.testSettings')}
            </h2>
            <Button
              onClick={() => speak(t('settings.testMessage'))}
              onMouseEnter={() => speak(t('settings.test'))}
              className="bg-blue-500 hover:bg-blue-400 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-xl border-2 border-blue-300"
            >
              <span className={`${getTextClass()} font-bold`}>{t('settings.test')}</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen;
