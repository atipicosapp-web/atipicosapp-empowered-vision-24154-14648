
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
import ShopScreen from '@/components/ShopScreen';
import ProductDetailScreen from '@/components/ProductDetailScreen';
import FamilyAreaScreen from '@/components/FamilyAreaScreen';
import FamilyProgressScreen from '@/components/FamilyProgressScreen';
import FamilyRoutinesScreen from '@/components/FamilyRoutinesScreen';
import FamilyReportsScreen from '@/components/FamilyReportsScreen';
import FamilySchoolScreen from '@/components/FamilySchoolScreen';
import FamilyAchievementsScreen from '@/components/FamilyAchievementsScreen';
import { ShopifyProduct } from '@/lib/shopify';

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
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);

  const handleNavigation = (page: string, data?: any) => {
    if (data?.name && data?.email) {
      setUserData(data);
    }
    if (data?.product) {
      setSelectedProduct(data.product);
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

      {currentPage === 'shop' && (
        <ShopScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'product-detail' && selectedProduct && (
        <ProductDetailScreen 
          product={selectedProduct}
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
        />
      )}

      {currentPage === 'family-area' && (
        <FamilyAreaScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}

      {currentPage === 'family-progress' && (
        <FamilyProgressScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}

      {currentPage === 'family-routines' && (
        <FamilyRoutinesScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}

      {currentPage === 'family-reports' && (
        <FamilyReportsScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}

      {currentPage === 'family-school' && (
        <FamilySchoolScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}

      {currentPage === 'family-achievements' && (
        <FamilyAchievementsScreen 
          onNavigate={handleNavigation}
          textSize={textSize}
          voiceSpeed={voiceSpeed}
          userName={userData?.name}
        />
      )}
    </div>
  );
};

export default Index;
