
import React, { useState } from 'react';
import PlansScreen from '@/components/PlansScreen';
import SettingsScreen from '@/components/SettingsScreen';
import WelcomeScreen from '@/components/WelcomeScreen';
import AutismScreen from '@/components/AutismScreen';
import FruitsScreen from '@/components/FruitsScreen';
import PECSCommunicationScreen from '@/components/PECSCommunicationScreen';
import CrisesScreen from '@/components/CrisesScreen';
import CursosScreen from '@/components/CursosScreen';
import ComunidadeScreen from '@/components/ComunidadeScreen';
import ProfissionaisScreen from '@/components/ProfissionaisScreen';
import LetrarScreen from '@/components/LetrarScreen';
import FonoaudiologaScreen from '@/components/FonoaudiologaScreen';
import MundoAtipicosScreen from '@/components/MundoAtipicosScreen';

interface UserData {
  name: string;
  email: string;
  disability: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [textSize, setTextSize] = useState('large');
  const [voiceSpeed, setVoiceSpeed] = useState('normal'); // normal, fast, ultra-fast
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleNavigation = (page: string, newUserData?: UserData) => {
    if (newUserData) {
      setUserData(newUserData);
    }
    setCurrentPage(page);
  };

  const handleTextSizeChange = (size: string) => {
    setTextSize(size);
  };

  const handleVoiceSpeedChange = (speed: string) => {
    setVoiceSpeed(speed);
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'welcome' && (
        <WelcomeScreen 
          onNavigate={handleNavigation}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'home' && (
        <AutismScreen 
          onNavigate={handleNavigation} 
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}
      
      {currentPage === 'plans' && (
        <PlansScreen 
          onNavigate={handleNavigation}
          voiceSpeed={voiceSpeed}
        />
      )}
      
      {currentPage === 'settings' && (
        <SettingsScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          onTextSizeChange={handleTextSizeChange}
          voiceSpeed={voiceSpeed}
          onVoiceSpeedChange={handleVoiceSpeedChange}
        />
      )}

      {currentPage === 'fruits' && (
        <FruitsScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}

      {currentPage === 'pecs' && (
        <PECSCommunicationScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'crises' && (
        <CrisesScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'cursos' && (
        <CursosScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'comunidade' && (
        <ComunidadeScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'profissionais' && (
        <ProfissionaisScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'letrar' && (
        <LetrarScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'fonoaudiologa' && (
        <FonoaudiologaScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}

      {currentPage === 'mundoatipicos' && (
        <MundoAtipicosScreen 
          onBack={() => handleNavigation('home')}
        />
      )}
    </div>
  );
};

export default Index;
