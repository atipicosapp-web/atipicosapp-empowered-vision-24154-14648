import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  Mic, 
  Wind,
  Music,
  Smile,
  BookOpen,
  Trophy,
  Settings as SettingsIcon,
  Play,
  RotateCcw,
  Star,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface FonoaudiologaScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FonoaudiologaScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FonoaudiologaScreenProps) => {
  const [currentSection, setCurrentSection] = useState<string>('menu');
  const [selectedSound, setSelectedSound] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceType, setVoiceType] = useState<'male' | 'female' | 'child'>('female');
  const [darkMode, setDarkMode] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(0.9);
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [syllableGame, setSyllableGame] = useState<string[]>([]);

  const sons = [
    { nome: 'Cachorro', emoji: '🐕', som: 'au au' },
    { nome: 'Chuva', emoji: '🌧️', som: 'plic plic' },
    { nome: 'Buzina', emoji: '🚗', som: 'bi bi' },
    { nome: 'Risada', emoji: '😄', som: 'ha ha ha' },
    { nome: 'Porta', emoji: '🚪', som: 'toc toc' },
    { nome: 'Água', emoji: '💧', som: 'splash' },
    { nome: 'Telefone', emoji: '📱', som: 'trim trim' },
    { nome: 'Vento', emoji: '💨', som: 'fuuuu' }
  ];

  const fonemas = [
    { letra: 'P', par: 'B', exemplo1: 'Pato', exemplo2: 'Bato' },
    { letra: 'T', par: 'D', exemplo1: 'Tia', exemplo2: 'Dia' },
    { letra: 'F', par: 'V', exemplo1: 'Faca', exemplo2: 'Vaca' },
    { letra: 'S', par: 'Z', exemplo1: 'Cozer', exemplo2: 'Coser' },
    { letra: 'CH', par: 'J', exemplo1: 'Chá', exemplo2: 'Já' }
  ];

  const palavrasTreino = [
    { palavra: 'Ma', som: 'ma', imagem: '🍎' },
    { palavra: 'Pa', som: 'pa', imagem: '👨' },
    { palavra: 'Ba', som: 'ba', imagem: '👶' },
    { palavra: 'Gato', som: 'gato', imagem: '🐱' },
    { palavra: 'Sol', som: 'sol', imagem: '☀️' },
    { palavra: 'Lua', som: 'lua', imagem: '🌙' },
    { palavra: 'Casa', som: 'casa', imagem: '🏠' },
    { palavra: 'Bola', som: 'bola', imagem: '⚽' }
  ];

  const musicas = [
    { 
      titulo: 'Bom Dia', 
      letra: ['Bom', 'dia', 'como', 'vai', 'você'],
      silabas: ['Bom', 'di-a', 'co-mo', 'vai', 'vo-cê']
    },
    { 
      titulo: 'Sorria', 
      letra: ['Sorria', 'sempre', 'seja', 'feliz'],
      silabas: ['Sor-ri-a', 'sem-pre', 'se-ja', 'fe-liz']
    },
    { 
      titulo: 'Parabéns', 
      letra: ['Parabéns', 'pra', 'você'],
      silabas: ['Pa-ra-béns', 'pra', 'vo-cê']
    }
  ];

  const exerciciosOrofaciais = [
    { nome: 'Faça Bico', emoji: '😗', descricao: 'Junte os lábios como se fosse dar um beijo' },
    { nome: 'Sorria', emoji: '😁', descricao: 'Abra a boca em um grande sorriso' },
    { nome: 'Língua Para Fora', emoji: '😛', descricao: 'Estique a língua para fora' },
    { nome: 'Sopre Forte', emoji: '💨', descricao: 'Respire fundo e sopre forte' },
    { nome: 'Encha as Bochechas', emoji: '😶', descricao: 'Encha as bochechas de ar' },
    { nome: 'Língua no Céu da Boca', emoji: '😮', descricao: 'Coloque a língua no céu da boca' }
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = speechSpeed;
      utterance.pitch = voiceType === 'child' ? 1.3 : voiceType === 'male' ? 0.9 : 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (currentSection === 'menu') {
      speak('Fonoaudióloga ativada! Vamos treinar fala, escuta e comunicação!');
    }
  }, [currentSection]);

  const handleSoundRecognition = (index: number) => {
    setAttempts(attempts + 1);
    if (index === selectedSound) {
      setScore(score + 1);
      speak('Muito bem! Acertou!');
      setTimeout(() => {
        setSelectedSound((selectedSound + 1) % sons.length);
      }, 1500);
    } else {
      speak('Tente novamente!');
    }
  };

  const startBreathingExercise = () => {
    setBreathingProgress(0);
    const interval = setInterval(() => {
      setBreathingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          speak('Ótimo! Continue respirando devagar.');
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  const shuffleSyllables = (palavra: string) => {
    const silabas = palavra.split('-');
    return silabas.sort(() => Math.random() - 0.5);
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

  const mainMenu = [
    { id: 'sons', nome: 'Reconhecer Sons', icon: Volume2, emoji: '🔊' },
    { id: 'imitar', nome: 'Imite o Som', icon: Mic, emoji: '🗣️' },
    { id: 'fonemas', nome: 'Treino de Fonemas', icon: BookOpen, emoji: '🔠' },
    { id: 'respiracao', nome: 'Respiração e Ritmo', icon: Wind, emoji: '💨' },
    { id: 'musica', nome: 'Música e Fala', icon: Music, emoji: '🎶' },
    { id: 'articulacao', nome: 'Articulação Visual', icon: Smile, emoji: '👄' },
    { id: 'silabas', nome: 'Jogo das Sílabas', icon: BookOpen, emoji: '🧩' },
    { id: 'progresso', nome: 'Progresso', icon: Trophy, emoji: '📊' },
    { id: 'config', nome: 'Configurações', icon: SettingsIcon, emoji: '⚙️' }
  ];

  const renderMenu = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-6`}>
        🎤 Fonoaudióloga - Escolha uma Atividade
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {mainMenu.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
            onClick={() => {
              speak(item.nome);
              setCurrentSection(item.id);
            }}
          >
            <div className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="text-3xl">{item.emoji}</div>
              <h3 className="text-sm font-bold text-gray-800">{item.nome}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSoundRecognition = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        🔊 Qual som você ouviu?
      </h2>
      <div className="text-center mb-6">
        <Button
          onClick={() => speak(sons[selectedSound].som)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          <Volume2 className="w-6 h-6 mr-2" />
          Ouvir Som
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[selectedSound, (selectedSound + 1) % sons.length, (selectedSound + 2) % sons.length]
          .sort(() => Math.random() - 0.5)
          .map((idx) => (
            <Card
              key={idx}
              className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
              onClick={() => handleSoundRecognition(idx)}
            >
              <div className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="text-5xl">{sons[idx].emoji}</div>
                <h3 className="text-sm font-bold text-gray-800">{sons[idx].nome}</h3>
              </div>
            </Card>
          ))}
      </div>
      <div className="text-center mt-4">
        <p className={`${getTextClass()} text-purple-700`}>
          Acertos: {score} / {attempts}
        </p>
      </div>
    </div>
  );

  const renderImitation = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        🗣️ Repita o Som
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
        {palavrasTreino.map((item, idx) => (
          <Card
            key={idx}
            className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
            onClick={() => speak(item.som)}
          >
            <div className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="text-4xl">{item.imagem}</div>
              <h3 className="text-sm font-bold text-gray-800">{item.palavra}</h3>
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRecording(!isRecording);
                  speak(isRecording ? 'Gravação pausada' : 'Grave sua voz agora');
                }}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPhonemes = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        🔠 Treino de Fonemas - Pares Mínimos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {fonemas.map((item, idx) => (
          <Card key={idx} className="border bg-white/70 border-blue-300">
            <div className="p-6 space-y-4">
              <div className="flex justify-around items-center">
                <Button
                  onClick={() => speak(item.letra)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-2xl font-bold rounded-lg"
                >
                  {item.letra}
                </Button>
                <span className="text-2xl">vs</span>
                <Button
                  onClick={() => speak(item.par)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-2xl font-bold rounded-lg"
                >
                  {item.par}
                </Button>
              </div>
              <div className="flex justify-around">
                <Button
                  size="sm"
                  onClick={() => speak(item.exemplo1)}
                  className="bg-blue-400 hover:bg-blue-500 text-white"
                >
                  {item.exemplo1}
                </Button>
                <Button
                  size="sm"
                  onClick={() => speak(item.exemplo2)}
                  className="bg-purple-400 hover:bg-purple-500 text-white"
                >
                  {item.exemplo2}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBreathing = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        💨 Respiração e Ritmo
      </h2>
      <div className="max-w-md mx-auto space-y-6">
        <Card className="border bg-white/70 border-blue-300">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-center text-gray-800">Sopre o Balão 🎈</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-400 h-full transition-all duration-100"
                style={{ width: `${breathingProgress}%` }}
              ></div>
            </div>
            <Button
              onClick={startBreathingExercise}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
            >
              <Wind className="w-5 h-5 mr-2" />
              Começar Exercício
            </Button>
          </div>
        </Card>

        <Card className="border bg-white/70 border-blue-300">
          <div className="p-6 text-center space-y-3">
            <div className="text-6xl animate-pulse">🫁</div>
            <h3 className="text-lg font-bold text-gray-800">Respire Profundamente</h3>
            <p className="text-sm text-gray-600">Inspire pelo nariz, expire pela boca</p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderMusic = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        🎶 Música e Fala
      </h2>
      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {musicas.map((musica, idx) => (
          <Card key={idx} className="border bg-white/70 border-blue-300">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-center text-gray-800">{musica.titulo}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {musica.silabas.map((silaba, sidx) => (
                  <span
                    key={sidx}
                    className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold"
                  >
                    {silaba}
                  </span>
                ))}
              </div>
              <Button
                onClick={() => speak(musica.letra.join(' '))}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Play className="w-5 h-5 mr-2" />
                Cantar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderArticulation = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        👄 Exercícios Orofaciais
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {exerciciosOrofaciais.map((exercicio, idx) => (
          <Card
            key={idx}
            className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105"
            onClick={() => speak(exercicio.nome + '. ' + exercicio.descricao)}
          >
            <div className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="text-5xl">{exercicio.emoji}</div>
              <h3 className="text-sm font-bold text-gray-800">{exercicio.nome}</h3>
              <p className="text-xs text-gray-600">{exercicio.descricao}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSyllables = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        🧩 Jogo das Sílabas
      </h2>
      <div className="max-w-2xl mx-auto">
        <Card className="border bg-white/70 border-blue-300">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-center text-gray-800">Monte a palavra: CA-SA</h3>
            <div className="flex justify-center gap-3">
              <div className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-bold text-lg cursor-move">
                SA
              </div>
              <div className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-bold text-lg cursor-move">
                CA
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <div className="px-6 py-3 border-2 border-dashed border-gray-400 rounded-lg w-20 h-16"></div>
              <div className="px-6 py-3 border-2 border-dashed border-gray-400 rounded-lg w-20 h-16"></div>
            </div>
            <Button
              onClick={() => speak('Casa! Muito bem!')}
              className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
            >
              <Check className="w-5 h-5 mr-2" />
              Verificar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        📊 Seu Progresso
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        <Card className="border bg-white/70 border-blue-300">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Sons Reconhecidos</span>
              <span className="text-blue-700 font-bold text-xl">{score}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Palavras Praticadas</span>
              <span className="text-purple-700 font-bold text-xl">{attempts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Fonemas Treinados</span>
              <span className="text-green-700 font-bold text-xl">{fonemas.length}</span>
            </div>
          </div>
        </Card>

        <Card className="border bg-white/70 border-blue-300">
          <div className="p-6 text-center space-y-3">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 ${star <= Math.min(5, Math.floor(score / 2)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-gray-700 font-semibold">Continue praticando!</p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderConfig = () => (
    <div className="space-y-6">
      <h2 className={`${getTextClass()} text-center text-blue-700 font-bold mb-4`}>
        ⚙️ Configurações
      </h2>
      <div className="max-w-md mx-auto space-y-4">
        <Card className="border bg-white/70 border-blue-300">
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Tipo de Voz</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setVoiceType('male')}
                  className={voiceType === 'male' ? 'bg-blue-600' : 'bg-gray-400'}
                >
                  Masculina
                </Button>
                <Button
                  size="sm"
                  onClick={() => setVoiceType('female')}
                  className={voiceType === 'female' ? 'bg-blue-600' : 'bg-gray-400'}
                >
                  Feminina
                </Button>
                <Button
                  size="sm"
                  onClick={() => setVoiceType('child')}
                  className={voiceType === 'child' ? 'bg-blue-600' : 'bg-gray-400'}
                >
                  Infantil
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Velocidade de Fala</label>
              <Slider
                value={[speechSpeed]}
                onValueChange={(value) => setSpeechSpeed(value[0])}
                min={0.5}
                max={1.5}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-gray-600 text-center">
                {speechSpeed < 0.8 ? 'Lenta' : speechSpeed > 1.2 ? 'Rápida' : 'Normal'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Modo Escuro</label>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200 text-gray-800'}`}>
      <header className="p-4 sm:p-6 lg:p-8 text-center border-b border-blue-300/50">
        <div className="flex justify-between items-center mb-3">
          <Button
            onClick={() => currentSection === 'menu' ? onNavigate('autism') : setCurrentSection('menu')}
            className="bg-purple-600/70 hover:bg-purple-600 text-white p-2 sm:p-3 rounded-lg border border-purple-400/50"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h1 className={`${getTitleClass()} font-bold text-blue-800`}>
            🎤 Fonoaudióloga
          </h1>
          <div className="w-12"></div>
        </div>
        <p className={`${getTextClass()} text-purple-700`}>
          Treine sua fala, escuta e comunicação
        </p>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {currentSection === 'menu' && renderMenu()}
        {currentSection === 'sons' && renderSoundRecognition()}
        {currentSection === 'imitar' && renderImitation()}
        {currentSection === 'fonemas' && renderPhonemes()}
        {currentSection === 'respiracao' && renderBreathing()}
        {currentSection === 'musica' && renderMusic()}
        {currentSection === 'articulacao' && renderArticulation()}
        {currentSection === 'silabas' && renderSyllables()}
        {currentSection === 'progresso' && renderProgress()}
        {currentSection === 'config' && renderConfig()}
      </div>
    </div>
  );
};

export default FonoaudiologaScreen;