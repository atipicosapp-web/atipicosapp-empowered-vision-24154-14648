import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Home, Trophy, Gamepad2, Award, Volume2, Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface MundoAtipicosScreenProps {
  onBack: () => void;
}

interface UserProgress {
  name: string;
  level: number;
  coins: number;
  pieces: number;
  completedPhases: string[];
  avatarConfig: AvatarConfig;
  environment: string;
  isDarkMode: boolean;
}

interface AvatarConfig {
  skin: string;
  hair: string;
  clothes: string;
  accessory: string;
  expression: string;
}

const MundoAtipicosScreen: React.FC<MundoAtipicosScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<'main' | 'avatar' | 'space' | 'phases' | 'games' | 'rewards'>('main');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('mundoAtipicos');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: 'Visitante',
      level: 1,
      coins: 0,
      pieces: 0,
      completedPhases: [],
      avatarConfig: {
        skin: '👤',
        hair: '🎩',
        clothes: '👕',
        accessory: '🎒',
        expression: '😊'
      },
      environment: 'casa',
      isDarkMode: false
    };
  });

  // Welcome message on first load
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('mundoAtipicosVisited');
    if (!hasVisited) {
      setTimeout(() => {
        toast.success('Bem-vindo ao Mundo Atípicos! 🧩');
        speak('Bem-vindo ao Mundo Atípicos!');
        sessionStorage.setItem('mundoAtipicosVisited', 'true');
      }, 500);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mundoAtipicos', JSON.stringify(progress));
  }, [progress]);

  const speak = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        // Cancelar qualquer fala anterior
        window.speechSynthesis.cancel();
        
        // Pequeno delay para garantir que o cancelamento foi processado
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'pt-BR';
          utterance.rate = 0.9;
          utterance.volume = 1.0;
          utterance.pitch = 1.0;
          
          utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
          };
          
          utterance.onend = () => {
            console.log('Speech finished');
          };
          
          window.speechSynthesis.speak(utterance);
          console.log('Speaking:', text);
        }, 100);
      } else {
        console.warn('Speech synthesis not supported');
        toast.info(text);
      }
    } catch (error) {
      console.error('Error in speak function:', error);
      toast.info(text);
    }
  };

  const addCoins = (amount: number) => {
    setProgress(prev => ({ ...prev, coins: prev.coins + amount }));
    toast.success(`Você ganhou ${amount} moedas! 🪙`);
    setTimeout(() => speak(`Você ganhou ${amount} moedas!`), 200);
  };

  const addPieces = (amount: number) => {
    setProgress(prev => ({ ...prev, pieces: prev.pieces + amount }));
    toast.success(`Você ganhou ${amount} peças! 🧩`);
    setTimeout(() => speak(`Você ganhou ${amount} peças!`), 200);
  };

  const completePhase = (phaseId: string) => {
    if (!progress.completedPhases.includes(phaseId)) {
      setProgress(prev => ({
        ...prev,
        completedPhases: [...prev.completedPhases, phaseId],
        level: prev.level + 1
      }));
      setTimeout(() => {
        addCoins(10);
        addPieces(3);
        speak('Parabéns! Você completou uma fase!');
      }, 300);
    } else {
      toast.info('Você já completou esta fase!');
      speak('Você já completou esta fase!');
    }
  };

  const renderMainView = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300 animate-fade-in flex items-center justify-center gap-2">
              <span className="animate-bounce">🧩</span>
              Mundo Atípicos
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🧩</span>
            </h1>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
              Olá, {progress.name}! Nível {progress.level} ⭐
            </p>
          </div>
          <Button
            onClick={() => setProgress(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))}
            variant="ghost"
            size="icon"
            className="hover:bg-white/20"
          >
            {progress.isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>

        {/* Stats Bar */}
        <Card className="p-4 mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-600">🪙 {progress.coins}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Moedas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">🧩 {progress.pieces}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Peças</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">⭐ {progress.level}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Nível</div>
            </div>
          </div>
          <Progress value={(progress.level % 10) * 10} className="mt-3" />
          
          {/* Test Sound Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3"
            onClick={() => {
              console.log('Testing sound...');
              toast.success('Testando som! 🔊');
              speak('O som está funcionando perfeitamente!');
            }}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Testar Som
          </Button>
        </Card>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          <MenuCard
            icon={<User className="w-12 h-12" />}
            title="Meu Avatar"
            description="Personalize seu personagem"
            onClick={() => {
              console.log('Navigating to avatar');
              setCurrentView('avatar');
              setTimeout(() => speak('Meu Avatar'), 100);
            }}
            gradient="from-pink-400 to-purple-500"
          />
          <MenuCard
            icon={<Home className="w-12 h-12" />}
            title="Meu Espaço 3D"
            description="Explore seu ambiente"
            onClick={() => {
              console.log('Navigating to space');
              setCurrentView('space');
              setTimeout(() => speak('Meu Espaço 3D'), 100);
            }}
            gradient="from-blue-400 to-cyan-500"
          />
          <MenuCard
            icon={<Sparkles className="w-12 h-12" />}
            title="Fases de Aprendizado"
            description="Aprenda e evolua"
            onClick={() => {
              console.log('Navigating to phases');
              setCurrentView('phases');
              setTimeout(() => speak('Fases de Aprendizado'), 100);
            }}
            gradient="from-green-400 to-emerald-500"
          />
          <MenuCard
            icon={<Gamepad2 className="w-12 h-12" />}
            title="Jogos e Desafios"
            description="Divirta-se aprendendo"
            onClick={() => {
              console.log('Navigating to games');
              setCurrentView('games');
              setTimeout(() => speak('Jogos e Desafios'), 100);
            }}
            gradient="from-orange-400 to-red-500"
          />
          <MenuCard
            icon={<Trophy className="w-12 h-12" />}
            title="Recompensas"
            description="Suas conquistas"
            onClick={() => {
              console.log('Navigating to rewards');
              setCurrentView('rewards');
              setTimeout(() => speak('Recompensas e Conquistas'), 100);
            }}
            gradient="from-yellow-400 to-orange-500"
            className="col-span-2"
          />
        </div>

        {/* Daily Challenge */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                Desafio do Dia
              </h3>
              <p className="text-sm opacity-90">Aprenda 3 novas palavras com som!</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                console.log('Daily challenge clicked');
                toast.success('Desafio aceito! 🎯');
                setTimeout(() => {
                  addCoins(5);
                  addPieces(1);
                  speak('Desafio aceito! Vamos aprender!');
                }, 100);
              }}
            >
              Começar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAvatarView = () => (
    <AvatarCustomization
      progress={progress}
      setProgress={setProgress}
      onBack={() => setCurrentView('main')}
      speak={speak}
    />
  );

  const renderSpaceView = () => (
    <SpaceEnvironment
      progress={progress}
      setProgress={setProgress}
      onBack={() => setCurrentView('main')}
      speak={speak}
    />
  );

  const renderPhasesView = () => (
    <LearningPhases
      progress={progress}
      onBack={() => setCurrentView('main')}
      speak={speak}
      completePhase={completePhase}
    />
  );

  const renderGamesView = () => (
    <GamesAndChallenges
      progress={progress}
      onBack={() => setCurrentView('main')}
      speak={speak}
      addCoins={addCoins}
      addPieces={addPieces}
    />
  );

  const renderRewardsView = () => (
    <RewardsAndAchievements
      progress={progress}
      setProgress={setProgress}
      onBack={() => setCurrentView('main')}
      speak={speak}
    />
  );

  switch (currentView) {
    case 'avatar':
      return renderAvatarView();
    case 'space':
      return renderSpaceView();
    case 'phases':
      return renderPhasesView();
    case 'games':
      return renderGamesView();
    case 'rewards':
      return renderRewardsView();
    default:
      return renderMainView();
  }
};

// Menu Card Component
interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  gradient: string;
  className?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ icon, title, description, onClick, gradient, className = '' }) => (
  <Card
    className={`p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-br ${gradient} text-white ${className}`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center gap-3">
      <div className="animate-bounce">{icon}</div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  </Card>
);

// Avatar Customization Component
const AvatarCustomization: React.FC<{
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onBack: () => void;
  speak: (text: string) => void;
}> = ({ progress, setProgress, onBack, speak }) => {
  const skins = ['👤', '👨', '👩', '🧒', '👧', '👦'];
  const hairs = ['🎩', '👒', '🧢', '👑', '🎓', '💇'];
  const clothes = ['👕', '👔', '👗', '🦺', '👘', '🥼'];
  const accessories = ['🎒', '🎸', '🎮', '📚', '⚽', '🎨'];
  const expressions = ['😊', '😄', '🤗', '😎', '🤔', '😴'];

  const updateAvatar = (key: keyof AvatarConfig, value: string) => {
    console.log('Updating avatar:', key, value);
    setProgress(prev => ({
      ...prev,
      avatarConfig: { ...prev.avatarConfig, [key]: value }
    }));
    toast.success('Avatar atualizado! ✨');
    setTimeout(() => speak('Avatar atualizado!'), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-purple-700">Meu Avatar</h1>
        </div>

        {/* Avatar Preview */}
        <Card className="p-8 mb-6 bg-white/90 backdrop-blur">
          <div className="text-center">
            <div className="text-8xl mb-4">
              {progress.avatarConfig.skin}
              {progress.avatarConfig.hair}
              {progress.avatarConfig.clothes}
              {progress.avatarConfig.accessory}
            </div>
            <div className="text-6xl mb-4">{progress.avatarConfig.expression}</div>
            <p className="text-xl font-bold text-purple-700">Olá, {progress.name}!</p>
          </div>
        </Card>

        {/* Customization Options */}
        <div className="space-y-4">
          <CustomizationRow
            label="Tom de Pele"
            options={skins}
            selected={progress.avatarConfig.skin}
            onSelect={(val) => updateAvatar('skin', val)}
          />
          <CustomizationRow
            label="Cabelo/Chapéu"
            options={hairs}
            selected={progress.avatarConfig.hair}
            onSelect={(val) => updateAvatar('hair', val)}
          />
          <CustomizationRow
            label="Roupa"
            options={clothes}
            selected={progress.avatarConfig.clothes}
            onSelect={(val) => updateAvatar('clothes', val)}
          />
          <CustomizationRow
            label="Acessório"
            options={accessories}
            selected={progress.avatarConfig.accessory}
            onSelect={(val) => updateAvatar('accessory', val)}
          />
          <CustomizationRow
            label="Expressão"
            options={expressions}
            selected={progress.avatarConfig.expression}
            onSelect={(val) => updateAvatar('expression', val)}
          />
        </div>

        {/* Avatar Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {[
            { label: 'Acenar', emoji: '👋', text: 'Olá!' },
            { label: 'Sorrir', emoji: '😄', text: 'Estou feliz!' },
            { label: 'Pular', emoji: '🦘', text: 'Vamos brincar!' },
            { label: 'Pensar', emoji: '🤔', text: 'Hmm...' }
          ].map(action => (
            <Button
              key={action.label}
              variant="outline"
              className="p-4 hover:bg-purple-100 active:scale-95 transition-all"
              onClick={() => {
                console.log('Avatar action:', action.label);
                toast.success(`${action.emoji} ${action.text}`);
                setTimeout(() => speak(action.text), 100);
              }}
            >
              <span className="text-2xl mr-2">{action.emoji}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomizationRow: React.FC<{
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}> = ({ label, options, selected, onSelect }) => (
  <Card className="p-4 bg-white/90">
    <h3 className="font-semibold text-purple-700 mb-3">{label}</h3>
    <div className="flex gap-2 flex-wrap">
      {options.map(option => (
        <button
          key={option}
          onClick={(e) => {
            e.preventDefault();
            console.log('Selected option:', option);
            onSelect(option);
          }}
          className={`text-3xl p-3 rounded-lg border-2 transition-all hover:scale-110 active:scale-95 ${
            selected === option
              ? 'border-purple-500 bg-purple-100 shadow-lg'
              : 'border-gray-200 hover:border-purple-300 bg-white'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </Card>
);

// Space Environment Component
const SpaceEnvironment: React.FC<{
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onBack: () => void;
  speak: (text: string) => void;
}> = ({ progress, setProgress, onBack, speak }) => {
  const environments = [
    { id: 'casa', name: 'Casa', emoji: '🏠', sound: 'Som de casa', items: ['🛋️', '🪑', '🚪', '🪟', '🛏️', '💡'] },
    { id: 'escola', name: 'Escola', emoji: '🏫', sound: 'Sino da escola', items: ['📚', '✏️', '📐', '🎒', '🖊️', '📝'] },
    { id: 'parque', name: 'Parque', emoji: '🌳', sound: 'Pássaros cantando', items: ['🌳', '🌸', '🦋', '🐦', '☀️', '🌈'] },
    { id: 'praia', name: 'Praia', emoji: '🏖️', sound: 'Ondas do mar', items: ['🌊', '🏄', '🐚', '⛱️', '🦀', '🐠'] },
    { id: 'clinica', name: 'Clínica', emoji: '🏥', sound: 'Ambiente calmo', items: ['🩺', '💊', '🧸', '🎨', '📖', '🧩'] }
  ];

  const currentEnv = environments.find(e => e.id === progress.environment) || environments[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-700">Meu Espaço 3D</h1>
        </div>

        {/* Current Environment */}
        <Card className="p-6 mb-6 bg-white/90">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">{currentEnv.emoji}</div>
            <h2 className="text-2xl font-bold text-blue-700">{currentEnv.name}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => speak(currentEnv.sound)}
              className="mt-2"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Ouvir ambiente
            </Button>
          </div>

          {/* Interactive Items */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {currentEnv.items.map((item, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  const itemNames: Record<string, string> = {
                    '🛋️': 'Sofá', '🪑': 'Cadeira', '🚪': 'Porta', '🪟': 'Janela', '🛏️': 'Cama', '💡': 'Luz',
                    '📚': 'Livro', '✏️': 'Lápis', '📐': 'Régua', '🎒': 'Mochila', '🖊️': 'Caneta', '📝': 'Caderno',
                    '🌳': 'Árvore', '🌸': 'Flor', '🦋': 'Borboleta', '🐦': 'Pássaro', '☀️': 'Sol', '🌈': 'Arco-íris',
                    '🌊': 'Onda', '🏄': 'Prancha', '🐚': 'Concha', '⛱️': 'Guarda-sol', '🦀': 'Caranguejo', '🐠': 'Peixe',
                    '🩺': 'Estetoscópio', '💊': 'Remédio', '🧸': 'Ursinho', '🎨': 'Pintura', '📖': 'Livro', '🧩': 'Quebra-cabeça'
                  };
                  const name = itemNames[item] || item;
                  console.log('Item clicked:', name);
                  toast.success(name);
                  setTimeout(() => speak(name), 100);
                }}
                className="text-5xl p-4 bg-white/50 rounded-lg hover:bg-white/80 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </Card>

        {/* Environment Selection */}
        <h3 className="font-bold text-blue-700 mb-3">Escolher Ambiente:</h3>
        <div className="grid grid-cols-3 gap-3">
          {environments.map(env => (
            <Button
              key={env.id}
              variant={progress.environment === env.id ? 'default' : 'outline'}
              className="h-20 flex flex-col gap-1 active:scale-95 transition-all"
              onClick={() => {
                console.log('Changing environment to:', env.name);
                setProgress(prev => ({ ...prev, environment: env.id }));
                toast.success(`Ambiente: ${env.name}`);
                setTimeout(() => speak(env.name), 100);
              }}
            >
              <span className="text-3xl">{env.emoji}</span>
              <span className="text-xs">{env.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Learning Phases Component
const LearningPhases: React.FC<{
  progress: UserProgress;
  onBack: () => void;
  speak: (text: string) => void;
  completePhase: (phaseId: string) => void;
}> = ({ progress, onBack, speak, completePhase }) => {
  const phases = [
    {
      id: 'fase1',
      title: 'Fase 1: Comunicação Básica',
      icon: '💬',
      description: 'Aprenda PECs de objetos e ações',
      missions: ['Ache o som certo', 'Monte a frase'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'fase2',
      title: 'Fase 2: Emoções e Sentimentos',
      icon: '😊',
      description: 'Aprenda sobre expressões e emoções',
      missions: ['Reconheça emoções', 'Combine expressões'],
      color: 'from-yellow-400 to-orange-600'
    },
    {
      id: 'fase3',
      title: 'Fase 3: Sons e Fala',
      icon: '🎤',
      description: 'Treinos de pronúncia e sílabas',
      missions: ['Repita as sílabas', 'Forme palavras'],
      color: 'from-purple-400 to-pink-600'
    },
    {
      id: 'fase4',
      title: 'Fase 4: Rotina e Organização',
      icon: '⏰',
      description: 'Aprenda sobre tempo e sequências',
      missions: ['Monte sua rotina', 'Organize o dia'],
      color: 'from-green-400 to-teal-600'
    },
    {
      id: 'fase5',
      title: 'Fase 5: Convivência',
      icon: '🤝',
      description: 'Amizade, respeito e empatia',
      missions: ['Ajude o amigo', 'Compartilhe'],
      color: 'from-red-400 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-green-700">Fases de Aprendizado</h1>
        </div>

        <div className="space-y-4">
          {phases.map((phase, index) => {
            const isCompleted = progress.completedPhases.includes(phase.id);
            const isLocked = index > 0 && !progress.completedPhases.includes(phases[index - 1].id);

            return (
              <Card
                key={phase.id}
                className={`p-5 bg-gradient-to-r ${phase.color} text-white ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102 active:scale-98 transition-all cursor-pointer'
                }`}
                onClick={() => {
                  if (!isLocked) {
                    console.log('Phase clicked:', phase.id, 'Completed:', isCompleted);
                    setTimeout(() => speak(phase.title), 100);
                    if (!isCompleted) {
                      completePhase(phase.id);
                    } else {
                      toast.info('Fase já completada! ✨');
                    }
                  } else {
                    toast.warning('Complete a fase anterior primeiro! 🔒');
                    setTimeout(() => speak('Complete a fase anterior primeiro!'), 100);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{phase.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      {phase.title}
                      {isCompleted && <span className="text-2xl">✅</span>}
                      {isLocked && <span className="text-2xl">🔒</span>}
                    </h3>
                    <p className="text-sm opacity-90 mb-2">{phase.description}</p>
                    <div className="space-y-1">
                      {phase.missions.map((mission, idx) => (
                        <div key={idx} className="text-xs opacity-80 flex items-center gap-1">
                          <span>⭐</span> {mission}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Games and Challenges Component
const GamesAndChallenges: React.FC<{
  progress: UserProgress;
  onBack: () => void;
  speak: (text: string) => void;
  addCoins: (amount: number) => void;
  addPieces: (amount: number) => void;
}> = ({ progress, onBack, speak, addCoins, addPieces }) => {
  const games = [
    { id: 'memory', title: 'PEC Memory', icon: '🧠', description: 'Jogo da memória com pictogramas' },
    { id: 'words', title: 'Monte a Palavra', icon: '🔤', description: 'Arraste letras para formar palavras' },
    { id: 'explorer', title: 'Explorador 3D', icon: '🔍', description: 'Descubra palavras e sons' },
    { id: 'sounds', title: 'Som Misterioso', icon: '🔊', description: 'Ouça e escolha o objeto certo' },
    { id: 'colors', title: 'Cores e Formas', icon: '🎨', description: 'Toque no item da cor pedida' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-red-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-orange-700">Jogos e Desafios</h1>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {games.map(game => (
            <Card
              key={game.id}
              className="p-5 bg-white/90 hover:bg-white hover:scale-102 active:scale-98 transition-all cursor-pointer"
              onClick={() => {
                console.log('Game clicked:', game.id);
                toast.success(`Iniciando ${game.title}! 🎮`);
                setTimeout(() => speak(game.title), 100);
                setTimeout(() => {
                  addCoins(5);
                  addPieces(1);
                }, 500);
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{game.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-orange-700">{game.title}</h3>
                  <p className="text-sm text-gray-600">{game.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">+5 🪙</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">+1 🧩</span>
                  </div>
                </div>
                <Button variant="default" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  console.log('Jogar button clicked');
                }}>
                  Jogar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Rewards and Achievements Component
const RewardsAndAchievements: React.FC<{
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onBack: () => void;
  speak: (text: string) => void;
}> = ({ progress, setProgress, onBack, speak }) => {
  const rewards = [
    { id: 'hat', name: 'Chapéu Legal', icon: '🎩', price: 10, type: 'avatar' },
    { id: 'glasses', name: 'Óculos Estilosos', icon: '😎', price: 15, type: 'avatar' },
    { id: 'plant', name: 'Planta Decorativa', icon: '🌱', price: 8, type: 'decor' },
    { id: 'toy', name: 'Brinquedo Divertido', icon: '🧸', price: 12, type: 'decor' },
    { id: 'pet', name: 'Pet Virtual', icon: '🐶', price: 20, type: 'pet' },
    { id: 'sound', name: 'Som de Risada', icon: '😄', price: 5, type: 'sound' }
  ];

  const buyReward = (reward: typeof rewards[0]) => {
    console.log('Attempting to buy:', reward.name, 'Price:', reward.price, 'Current coins:', progress.coins);
    if (progress.coins >= reward.price) {
      setProgress(prev => ({
        ...prev,
        coins: prev.coins - reward.price
      }));
      toast.success(`Comprado: ${reward.name} ${reward.icon}`);
      setTimeout(() => speak(`Você comprou ${reward.name}!`), 100);
    } else {
      toast.error(`Você precisa de ${reward.price - progress.coins} moedas a mais! 🪙`);
      setTimeout(() => speak('Você não tem moedas suficientes'), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-yellow-700">Recompensas</h1>
        </div>

        {/* User Balance */}
        <Card className="p-4 mb-6 bg-white/90">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">🪙 {progress.coins}</div>
              <div className="text-sm text-gray-600">Suas Moedas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">🧩 {progress.pieces}</div>
              <div className="text-sm text-gray-600">Suas Peças</div>
            </div>
          </div>
        </Card>

        {/* Shop */}
        <h3 className="font-bold text-yellow-700 mb-3">Loja de Recompensas:</h3>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map(reward => (
            <Card
              key={reward.id}
              className={`p-4 bg-white/90 hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                progress.coins < reward.price ? 'opacity-60' : ''
              }`}
              onClick={() => buyReward(reward)}
            >
              <div className="text-center">
                <div className="text-5xl mb-2">{reward.icon}</div>
                <h4 className="font-semibold text-sm text-gray-700">{reward.name}</h4>
                <div className={`mt-2 font-bold ${progress.coins >= reward.price ? 'text-yellow-600' : 'text-gray-400'}`}>
                  🪙 {reward.price}
                </div>
                {progress.coins < reward.price && (
                  <div className="text-xs text-red-500 mt-1">Faltam {reward.price - progress.coins}</div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <h3 className="font-bold text-yellow-700 mt-6 mb-3">Conquistas:</h3>
        <div className="space-y-2">
          {[
            { title: 'Primeiro Passo', desc: 'Complete sua primeira fase', icon: '🏆' },
            { title: 'Explorador', desc: 'Visite todos os ambientes', icon: '🗺️' },
            { title: 'Comunicador', desc: 'Use 50 pictogramas', icon: '💬' },
            { title: 'Mestre dos Jogos', desc: 'Complete todos os jogos', icon: '🎮' }
          ].map((achievement, idx) => (
            <Card key={idx} className="p-3 bg-white/90 flex items-center gap-3">
              <div className="text-3xl">{achievement.icon}</div>
              <div>
                <h4 className="font-semibold text-sm">{achievement.title}</h4>
                <p className="text-xs text-gray-600">{achievement.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MundoAtipicosScreen;
