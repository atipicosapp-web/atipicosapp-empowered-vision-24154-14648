import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Globe, Mail } from 'lucide-react';
import { FaGoogle, FaYoutube, FaLinkedin, FaInstagram, FaFacebook, FaTiktok, FaPinterest, FaTwitter } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface WelcomeScreenProps {
  onNavigate: (page: string, userData?: UserData) => void;
  voiceSpeed: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  disability: string;
}

const WelcomeScreen = ({ onNavigate, voiceSpeed }: WelcomeScreenProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: 'pt-BR' as const, name: t('lang.portuguese') },
    { code: 'en' as const, name: t('lang.english') },
    { code: 'es' as const, name: t('lang.spanish') }
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      speak(t('welcome.speechWelcome'));
    }, 1000);
  }, [language]);

  const handleFinish = () => {
    if (name && email && phone) {
      const userData: UserData = {
        name,
        email,
        phone,
        disability: 'autismo'
      };
      speak(`${t('welcome.speechFinish')}, ${name}!`);
      onNavigate('home', userData);
    }
  };

  const handleLanguageChange = (langCode: 'pt-BR' | 'en' | 'es') => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
    const langName = languages.find(l => l.code === langCode)?.name || '';
    speak(`${t('welcome.speechLanguageChanged')} ${langName}`);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'var(--welcome-gradient)' }}>
      {/* Header com botão de idioma */}
      <header className="relative p-4 sm:p-6 lg:p-8 text-center border-b-2 border-white/20">
        {/* Botão de idioma no canto superior direito */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <Button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white p-2"
            >
              <Globe className="w-5 h-5" />
            </Button>
            {showLanguageMenu && (
              <div className="absolute right-0 top-12 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 min-w-[150px] z-50">
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
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
          {t('welcome.title')}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/90 drop-shadow">
          {t('welcome.subtitle')}
        </p>
        <p className="text-base sm:text-lg lg:text-xl text-white/90 drop-shadow mt-4">
          No amor não há medo<br />
          1 João 4:18
        </p>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {t('welcome.greeting')}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {t('welcome.description')}
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm sm:text-base font-medium mb-2 block">
                      {t('welcome.name')}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => speak(t('welcome.speechTypeName'))}
                      className="bg-card border-2 border-primary text-card-foreground text-base sm:text-lg p-3 sm:p-4 rounded-xl"
                      placeholder={t('welcome.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground text-sm sm:text-base font-medium mb-2 block">
                      {t('welcome.email')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => speak(t('welcome.speechTypeEmail'))}
                      className="bg-card border-2 border-primary text-card-foreground text-base sm:text-lg p-3 sm:p-4 rounded-xl"
                      placeholder={t('welcome.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground text-sm sm:text-base font-medium mb-2 block">
                      Telefone / WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-card border-2 border-primary text-card-foreground text-base sm:text-lg p-3 sm:p-4 rounded-xl"
                      placeholder="Seu telefone / WhatsApp"
                    />
                  </div>

                  {/* Botões de cadastro com ícones */}
                  <div className="space-y-3 mb-4">
                    <p className="text-center text-sm text-muted-foreground mb-3">
                      {t('welcome.signupWith')}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        onClick={() => speak(t('welcome.continueGoogle'))}
                        className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                      >
                        <FaGoogle className="w-4 h-4 text-red-500" />
                        {t('welcome.continueGoogle')}
                      </Button>
                      
                      <Button
                        onClick={() => speak(t('welcome.continueFacebook'))}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                      >
                        <FaFacebook className="w-4 h-4" />
                        {t('welcome.continueFacebook')}
                      </Button>
                      
                      <Button
                        onClick={handleFinish}
                        onMouseEnter={() => speak(t('welcome.registerContinue'))}
                        disabled={!name || !email || !phone}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Mail className="w-4 h-4" />
                        {t('welcome.registerContinue')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
      </div>

      {/* Rodapé com links */}
      <footer className="mt-auto border-t border-white/20 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lado esquerdo - Redes sociais em 3 colunas */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t('footer.socialMedia')}</h3>
              <div className="grid grid-cols-3 gap-3">
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <FaYoutube className="w-4 h-4" />
                  YouTube
                </a>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <FaInstagram className="w-4 h-4" />
                  Instagram
                </a>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <FaFacebook className="w-4 h-4" />
                  Facebook
                </a>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <FaTiktok className="w-4 h-4" />
                  TikTok
                </a>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <Heart className="w-4 h-4" />
                  Kawai
                </a>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <FaPinterest className="w-4 h-4" />
                  Pinterest
                </a>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-1">
                  <FaTwitter className="w-4 h-4" />
                  Twitter (X)
                </a>
              </div>
            </div>

            {/* Lado direito - Links legais */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t('footer.legalInfo')}</h3>
              <div className="space-y-2">
                <a href="#" className="block text-white/80 hover:text-white text-sm py-1">
                  {t('footer.privacy')}
                </a>
                <a href="#" className="block text-white/80 hover:text-white text-sm py-1">
                  {t('footer.terms')}
                </a>
                <a href="#" className="block text-white/80 hover:text-white text-sm py-1">
                  {t('footer.lgpd')}
                </a>
                <a href="#" className="block text-white/80 hover:text-white text-sm py-1">
                  {t('footer.ombudsman')}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-6 pt-4 border-t border-white/20">
            <p className="text-white/60 text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
