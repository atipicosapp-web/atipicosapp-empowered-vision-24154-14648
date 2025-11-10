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
  const skins = ['👤', '👨', '👩', '🧒', '👧', '👦', '👶', '🧑', '👴', '👵', '🧔', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱'];
  const hairs = ['🎩', '👒', '🧢', '👑', '🎓', '💇', '🎀', '👸', '🤴', '🧕', '👳', '💆', '💅', '🦸', '🧙'];
  const clothes = ['👕', '👔', '👗', '🦺', '👘', '🥼', '🥻', '👚', '🩱', '🩳', '👖', '🧥', '🧤', '🧣', '🎽'];
  const accessories = ['🎒', '🎸', '🎮', '📚', '⚽', '🎨', '🎪', '🎭', '🎬', '🎤', '🎧', '🎹', '🎺', '🎻', '🥁'];
  const expressions = ['😊', '😄', '🤗', '😎', '🤔', '😴', '🥳', '😇', '🤩', '😋', '😌', '🤓', '🥰', '😍', '🤪'];

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
    { id: 'casa', name: 'Casa', emoji: '🏠', sound: 'Som de casa', items: ['🛋️', '🪑', '🚪', '🪟', '🛏️', '💡', '🖼️', '🧺', '🍽️'] },
    { id: 'escola', name: 'Escola', emoji: '🏫', sound: 'Sino da escola', items: ['📚', '✏️', '📐', '🎒', '🖊️', '📝', '🖍️', '📖', '🧮'] },
    { id: 'parque', name: 'Parque', emoji: '🌳', sound: 'Pássaros cantando', items: ['🌳', '🌸', '🦋', '🐦', '☀️', '🌈', '🎈', '🛝', '⚽'] },
    { id: 'praia', name: 'Praia', emoji: '🏖️', sound: 'Ondas do mar', items: ['🌊', '🏄', '🐚', '⛱️', '🦀', '🐠', '🏖️', '⛵', '🥽'] },
    { id: 'clinica', name: 'Clínica', emoji: '🏥', sound: 'Ambiente calmo', items: ['🩺', '💊', '🧸', '🎨', '📖', '🧩', '🪀', '🎯', '🎲'] },
    { id: 'mercado', name: 'Mercado', emoji: '🛒', sound: 'Ambiente movimentado', items: ['🍎', '🍌', '🥕', '🍞', '🥛', '🧃', '🍪', '🧀', '🥚'] },
    { id: 'zoologico', name: 'Zoológico', emoji: '🦁', sound: 'Animais', items: ['🦁', '🐘', '🦒', '🐵', '🦓', '🐻', '🦘', '🦜', '🐧'] },
    { id: 'fazenda', name: 'Fazenda', emoji: '🚜', sound: 'Sons rurais', items: ['🐄', '🐷', '🐔', '🐴', '🐑', '🌾', '🚜', '🌻', '🥕'] }
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
        <div className="grid grid-cols-4 gap-3">
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
      missions: ['Ache o som certo', 'Monte a frase', 'Identifique objetos'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'fase2',
      title: 'Fase 2: Emoções e Sentimentos',
      icon: '😊',
      description: 'Aprenda sobre expressões e emoções',
      missions: ['Reconheça emoções', 'Combine expressões', 'Como você se sente?'],
      color: 'from-yellow-400 to-orange-600'
    },
    {
      id: 'fase3',
      title: 'Fase 3: Sons e Fala',
      icon: '🎤',
      description: 'Treinos de pronúncia e sílabas',
      missions: ['Repita as sílabas', 'Forme palavras', 'Cante junto'],
      color: 'from-purple-400 to-pink-600'
    },
    {
      id: 'fase4',
      title: 'Fase 4: Rotina e Organização',
      icon: '⏰',
      description: 'Aprenda sobre tempo e sequências',
      missions: ['Monte sua rotina', 'Organize o dia', 'Aprenda as horas'],
      color: 'from-green-400 to-teal-600'
    },
    {
      id: 'fase5',
      title: 'Fase 5: Convivência',
      icon: '🤝',
      description: 'Amizade, respeito e empatia',
      missions: ['Ajude o amigo', 'Compartilhe', 'Seja gentil'],
      color: 'from-red-400 to-pink-600'
    },
    {
      id: 'fase6',
      title: 'Fase 6: Números e Contagem',
      icon: '🔢',
      description: 'Aprenda matemática básica',
      missions: ['Conte os objetos', 'Some e subtraia', 'Formas geométricas'],
      color: 'from-indigo-400 to-purple-600'
    },
    {
      id: 'fase7',
      title: 'Fase 7: Natureza e Animais',
      icon: '🦁',
      description: 'Conheça o mundo natural',
      missions: ['Aprenda sobre animais', 'Plantas e flores', 'O clima'],
      color: 'from-green-400 to-lime-600'
    },
    {
      id: 'fase8',
      title: 'Fase 8: Alimentos e Nutrição',
      icon: '🍎',
      description: 'Alimentação saudável',
      missions: ['Escolha frutas', 'Aprenda sobre comida', 'Monte seu prato'],
      color: 'from-orange-400 to-amber-600'
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

            return (
              <Card
                key={phase.id}
                className={`p-5 bg-gradient-to-r ${phase.color} text-white hover:scale-102 active:scale-98 transition-all cursor-pointer`}
                onClick={() => {
                  console.log('Phase clicked:', phase.id, 'Completed:', isCompleted);
                  setTimeout(() => speak(phase.title), 100);
                  if (!isCompleted) {
                    completePhase(phase.id);
                  } else {
                    toast.info('Você pode jogar novamente! 🎮');
                    setTimeout(() => speak('Você pode jogar novamente!'), 100);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{phase.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      {phase.title}
                      {isCompleted && <span className="text-2xl">✅</span>}
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
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>({});

  const games = [
    { id: 'memory', title: 'Jogo da Memória', icon: '🧠', description: 'Encontre os pares de emojis', color: 'from-blue-400 to-cyan-500' },
    { id: 'colors', title: 'Cores e Formas', icon: '🎨', description: 'Encontre a cor certa', color: 'from-pink-400 to-rose-500' },
    { id: 'sounds', title: 'Som Misterioso', icon: '🔊', description: 'Adivinhe o som', color: 'from-purple-400 to-indigo-500' },
    { id: 'numbers', title: 'Contando Juntos', icon: '🔢', description: 'Aprenda números', color: 'from-green-400 to-emerald-500' },
    { id: 'emotions', title: 'Quiz de Emoções', icon: '😊', description: 'Reconheça sentimentos', color: 'from-yellow-400 to-amber-500' },
    { id: 'puzzle', title: 'Quebra-Cabeça', icon: '🧩', description: 'Monte a imagem', color: 'from-red-400 to-orange-500' },
    { id: 'sequence', title: 'Sequência Lógica', icon: '🎯', description: 'Complete o padrão', color: 'from-teal-400 to-cyan-500' },
    { id: 'find', title: 'Encontre o Diferente', icon: '🔍', description: 'Qual não combina?', color: 'from-indigo-400 to-blue-500' }
  ];

  if (currentGame) {
    return (
      <GamePlayer
        gameId={currentGame}
        onBack={() => setCurrentGame(null)}
        speak={speak}
        addCoins={addCoins}
        addPieces={addPieces}
        gameState={gameState}
        setGameState={setGameState}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-orange-700">Jogos e Desafios 🎮</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map(game => (
            <Card
              key={game.id}
              className={`p-5 bg-gradient-to-br ${game.color} text-white hover:scale-105 active:scale-95 transition-all cursor-pointer`}
              onClick={() => {
                console.log('Starting game:', game.id);
                setCurrentGame(game.id);
                setTimeout(() => speak(`Iniciando ${game.title}`), 100);
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-6xl animate-bounce">{game.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-1">{game.title}</h3>
                  <p className="text-sm opacity-90">{game.description}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full">+5 🪙</span>
                    <span className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full">+1 🧩</span>
                  </div>
                </div>
                <Button variant="secondary" size="lg" className="font-bold">
                  Jogar!
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Game Player Component
const GamePlayer: React.FC<{
  gameId: string;
  onBack: () => void;
  speak: (text: string) => void;
  addCoins: (amount: number) => void;
  addPieces: (amount: number) => void;
  gameState: any;
  setGameState: (state: any) => void;
}> = ({ gameId, onBack, speak, addCoins, addPieces, gameState, setGameState }) => {
  
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const finishGame = () => {
    const coins = Math.max(5, score);
    const pieces = Math.floor(score / 10) + 1;
    addCoins(coins);
    addPieces(pieces);
    toast.success(`Parabéns! Você ganhou ${coins} moedas e ${pieces} peças! 🎉`);
    setTimeout(() => speak(`Parabéns! Você completou o jogo!`), 100);
    setTimeout(() => onBack(), 2000);
  };

  switch (gameId) {
    case 'memory':
      return <MemoryGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    case 'colors':
      return <ColorsGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    case 'sounds':
      return <SoundsGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    case 'numbers':
      return <NumbersGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    case 'emotions':
      return <EmotionsGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    case 'puzzle':
      return <PuzzleGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    case 'sequence':
      return <SequenceGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    case 'find':
      return <FindDifferentGame onBack={onBack} speak={speak} finishGame={finishGame} score={score} setScore={setScore} />;
    default:
      return null;
  }
};

// Memory Game
const MemoryGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  const emojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍊', '🥝', '🍒'];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setTimeout(() => speak('Encontre os pares iguais!'), 300);
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    speak(cards[index]);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setScore(score + 10);
        toast.success('Par encontrado! +10 pontos 🎉');
        setTimeout(() => speak('Par encontrado!'), 100);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setTimeout(() => finishGame(), 1000);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          speak('Tente novamente');
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-purple-700">Jogo da Memória 🧠</h1>
          <div className="text-lg font-bold text-purple-700">Pontos: {score}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {cards.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`aspect-square text-5xl rounded-xl transition-all duration-300 ${
                flipped.includes(index) || matched.includes(index)
                  ? 'bg-white shadow-lg scale-100'
                  : 'bg-purple-400 hover:bg-purple-500 scale-95 hover:scale-100'
              }`}
            >
              {flipped.includes(index) || matched.includes(index) ? emoji : '❓'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Colors Game
const ColorsGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  const colors = [
    { name: 'Vermelho', emoji: '🔴', color: 'bg-red-500' },
    { name: 'Azul', emoji: '🔵', color: 'bg-blue-500' },
    { name: 'Verde', emoji: '🟢', color: 'bg-green-500' },
    { name: 'Amarelo', emoji: '🟡', color: 'bg-yellow-500' },
    { name: 'Rosa', emoji: '🔴', color: 'bg-pink-500' },
    { name: 'Roxo', emoji: '🟣', color: 'bg-purple-500' }
  ];

  const [targetColor, setTargetColor] = useState(colors[0]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(newColor);
    setTimeout(() => speak(`Encontre o ${newColor.name}`), 300);
  };

  const handleColorClick = (color: typeof colors[0]) => {
    if (color.name === targetColor.name) {
      setScore(score + 10);
      toast.success(`Correto! +10 pontos 🎨`);
      speak('Muito bem!');
      const newRound = round + 1;
      setRound(newRound);
      
      if (newRound >= 10) {
        setTimeout(() => finishGame(), 1000);
      } else {
        setTimeout(() => startNewRound(), 1500);
      }
    } else {
      speak('Tente novamente');
      toast.error('Ops! Tente de novo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-pink-700">Cores e Formas 🎨</h1>
          <div className="text-lg font-bold text-pink-700">Pontos: {score}</div>
        </div>

        <Card className="p-8 mb-6 bg-white text-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Encontre:</h2>
          <div className="text-8xl mb-2">{targetColor.emoji}</div>
          <p className="text-2xl font-bold text-gray-700">{targetColor.name}</p>
          <p className="text-sm text-gray-500 mt-2">Rodada {round + 1} de 10</p>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(color)}
              className={`${color.color} h-24 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Sounds Game
const SoundsGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  const sounds = [
    { name: 'Cachorro', emoji: '🐶', sound: 'Au au' },
    { name: 'Gato', emoji: '🐱', sound: 'Miau' },
    { name: 'Vaca', emoji: '🐄', sound: 'Muuu' },
    { name: 'Pato', emoji: '🦆', sound: 'Quack' },
    { name: 'Leão', emoji: '🦁', sound: 'Roar' },
    { name: 'Passarinho', emoji: '🐦', sound: 'Piu piu' }
  ];

  const [targetSound, setTargetSound] = useState(sounds[0]);
  const [options, setOptions] = useState<typeof sounds>([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const target = sounds[Math.floor(Math.random() * sounds.length)];
    const wrongOptions = sounds.filter(s => s.name !== target.name);
    const shuffled = [target, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    
    setTargetSound(target);
    setOptions(shuffled);
    setTimeout(() => speak(`Que animal faz ${target.sound}?`), 300);
  };

  const handleSoundClick = (sound: typeof sounds[0]) => {
    if (sound.name === targetSound.name) {
      setScore(score + 10);
      toast.success(`Correto! +10 pontos 🔊`);
      speak(`Muito bem! É o ${sound.name}!`);
      const newRound = round + 1;
      setRound(newRound);
      
      if (newRound >= 10) {
        setTimeout(() => finishGame(), 1000);
      } else {
        setTimeout(() => startNewRound(), 2000);
      }
    } else {
      speak('Tente novamente');
      toast.error('Ops! Tente de novo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-purple-700">Som Misterioso 🔊</h1>
          <div className="text-lg font-bold text-purple-700">Pontos: {score}</div>
        </div>

        <Card className="p-8 mb-6 bg-white text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Que animal faz:</h2>
          <div className="text-6xl font-bold text-purple-600 mb-4">{targetSound.sound}?</div>
          <Button
            variant="outline"
            onClick={() => speak(`Que animal faz ${targetSound.sound}?`)}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Ouvir novamente
          </Button>
          <p className="text-sm text-gray-500 mt-4">Rodada {round + 1} de 10</p>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {options.map((sound, index) => (
            <button
              key={index}
              onClick={() => handleSoundClick(sound)}
              className="bg-white p-6 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
              <div className="text-6xl mb-2">{sound.emoji}</div>
              <p className="text-sm font-semibold text-gray-700">{sound.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Numbers Game
const NumbersGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  const [targetNumber, setTargetNumber] = useState(1);
  const [options, setOptions] = useState<number[]>([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const target = Math.floor(Math.random() * 10) + 1;
    const wrong1 = (target + Math.floor(Math.random() * 3) + 1) % 10 + 1;
    const wrong2 = (target + Math.floor(Math.random() * 5) + 5) % 10 + 1;
    const shuffled = [target, wrong1, wrong2].sort(() => Math.random() - 0.5);
    
    setTargetNumber(target);
    setOptions(shuffled);
    setTimeout(() => speak(`Encontre o número ${target}`), 300);
  };

  const handleNumberClick = (num: number) => {
    if (num === targetNumber) {
      setScore(score + 10);
      toast.success(`Correto! +10 pontos 🔢`);
      speak('Muito bem!');
      const newRound = round + 1;
      setRound(newRound);
      
      if (newRound >= 10) {
        setTimeout(() => finishGame(), 1000);
      } else {
        setTimeout(() => startNewRound(), 1500);
      }
    } else {
      speak('Tente novamente');
      toast.error('Ops! Tente de novo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-green-700">Contando Juntos 🔢</h1>
          <div className="text-lg font-bold text-green-700">Pontos: {score}</div>
        </div>

        <Card className="p-8 mb-6 bg-white text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Encontre o número:</h2>
          <div className="text-9xl font-bold text-green-600 mb-4">{targetNumber}</div>
          <p className="text-sm text-gray-500">Rodada {round + 1} de 10</p>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {options.map((num, index) => (
            <button
              key={index}
              onClick={() => handleNumberClick(num)}
              className="bg-white p-8 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
              <div className="text-7xl font-bold text-green-600">{num}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Emotions Game
const EmotionsGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  const emotions = [
    { name: 'Feliz', emoji: '😊', description: 'Sorrindo' },
    { name: 'Triste', emoji: '😢', description: 'Chorando' },
    { name: 'Bravo', emoji: '😠', description: 'Com raiva' },
    { name: 'Surpreso', emoji: '😮', description: 'Admirado' },
    { name: 'Com medo', emoji: '😨', description: 'Assustado' },
    { name: 'Pensativo', emoji: '🤔', description: 'Pensando' }
  ];

  const [targetEmotion, setTargetEmotion] = useState(emotions[0]);
  const [options, setOptions] = useState<typeof emotions>([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const target = emotions[Math.floor(Math.random() * emotions.length)];
    const wrongOptions = emotions.filter(e => e.name !== target.name);
    const shuffled = [target, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    
    setTargetEmotion(target);
    setOptions(shuffled);
    setTimeout(() => speak(`Como está ${target.description}?`), 300);
  };

  const handleEmotionClick = (emotion: typeof emotions[0]) => {
    if (emotion.name === targetEmotion.name) {
      setScore(score + 10);
      toast.success(`Correto! +10 pontos 😊`);
      speak(`Muito bem! Está ${emotion.name}!`);
      const newRound = round + 1;
      setRound(newRound);
      
      if (newRound >= 10) {
        setTimeout(() => finishGame(), 1000);
      } else {
        setTimeout(() => startNewRound(), 2000);
      }
    } else {
      speak('Tente novamente');
      toast.error('Ops! Tente de novo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-amber-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-yellow-700">Quiz de Emoções 😊</h1>
          <div className="text-lg font-bold text-yellow-700">Pontos: {score}</div>
        </div>

        <Card className="p-8 mb-6 bg-white text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Como está {targetEmotion.description}?</h2>
          <p className="text-sm text-gray-500">Rodada {round + 1} de 10</p>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {options.map((emotion, index) => (
            <button
              key={index}
              onClick={() => handleEmotionClick(emotion)}
              className="bg-white p-6 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
              <div className="text-7xl mb-2">{emotion.emoji}</div>
              <p className="text-sm font-semibold text-gray-700">{emotion.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Placeholder games (to be expanded)
const PuzzleGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  const pieces = ['🧩', '🎨', '🎭', '🎪', '🎡', '🎢', '🎠', '🎪', '🎨'];
  
  useEffect(() => {
    speak('Monte o quebra-cabeça!');
    setTimeout(() => {
      setScore(50);
      finishGame();
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-red-700">Quebra-Cabeça 🧩</h1>
          <div className="text-lg font-bold text-red-700">Pontos: {score}</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {pieces.map((piece, i) => (
            <div key={i} className="bg-white p-8 rounded-xl text-6xl text-center hover:scale-110 transition-all cursor-pointer">
              {piece}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SequenceGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  useEffect(() => {
    speak('Complete a sequência!');
    setTimeout(() => {
      setScore(50);
      finishGame();
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-cyan-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-teal-700">Sequência Lógica 🎯</h1>
          <div className="text-lg font-bold text-teal-700">Pontos: {score}</div>
        </div>
        <Card className="p-8 text-center">
          <div className="text-8xl space-x-4">
            🔴 🔵 🔴 🔵 <span className="text-gray-300">?</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

const FindDifferentGame: React.FC<any> = ({ onBack, speak, finishGame, score, setScore }) => {
  useEffect(() => {
    speak('Encontre o diferente!');
    setTimeout(() => {
      setScore(50);
      finishGame();
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-indigo-700">Encontre o Diferente 🔍</h1>
          <div className="text-lg font-bold text-indigo-700">Pontos: {score}</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['🍎', '🍎', '🍌', '🍎', '🍎', '🍎'].map((fruit, i) => (
            <button key={i} className="bg-white p-8 rounded-xl text-8xl hover:scale-110 transition-all">
              {fruit}
            </button>
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
    { id: 'sound', name: 'Som de Risada', icon: '😄', price: 5, type: 'sound' },
    { id: 'crown', name: 'Coroa Real', icon: '👑', price: 25, type: 'avatar' },
    { id: 'rainbow', name: 'Arco-íris', icon: '🌈', price: 30, type: 'decor' },
    { id: 'star', name: 'Estrela Brilhante', icon: '⭐', price: 15, type: 'decor' },
    { id: 'unicorn', name: 'Unicórnio', icon: '🦄', price: 35, type: 'pet' },
    { id: 'guitar', name: 'Guitarra', icon: '🎸', price: 20, type: 'avatar' },
    { id: 'paint', name: 'Kit de Pintura', icon: '🎨', price: 18, type: 'avatar' }
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
