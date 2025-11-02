import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, Volume2, Pencil, Calendar, Gamepad2, 
  Book, Settings as SettingsIcon, Award, Sparkles, RefreshCw,
  Play, Trophy, Star, ChevronRight, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface LetrarScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
}

// Dados completos do alfabeto
const alfabeto = [
  { letra: 'A', exemplos: [
    { palavra: 'Abelha', emoji: '🐝' },
    { palavra: 'Arco', emoji: '🏹' },
    { palavra: 'Árvore', emoji: '🌳' }
  ]},
  { letra: 'B', exemplos: [
    { palavra: 'Bola', emoji: '⚽' },
    { palavra: 'Borboleta', emoji: '🦋' },
    { palavra: 'Banana', emoji: '🍌' }
  ]},
  { letra: 'C', exemplos: [
    { palavra: 'Casa', emoji: '🏠' },
    { palavra: 'Cachorro', emoji: '🐕' },
    { palavra: 'Coração', emoji: '❤️' }
  ]},
  { letra: 'D', exemplos: [
    { palavra: 'Dado', emoji: '🎲' },
    { palavra: 'Dinossauro', emoji: '🦕' },
    { palavra: 'Dedo', emoji: '👆' }
  ]},
  { letra: 'E', exemplos: [
    { palavra: 'Elefante', emoji: '🐘' },
    { palavra: 'Estrela', emoji: '⭐' },
    { palavra: 'Escada', emoji: '🪜' }
  ]},
  { letra: 'F', exemplos: [
    { palavra: 'Foca', emoji: '🦭' },
    { palavra: 'Flor', emoji: '🌸' },
    { palavra: 'Foguete', emoji: '🚀' }
  ]},
  { letra: 'G', exemplos: [
    { palavra: 'Gato', emoji: '🐱' },
    { palavra: 'Girafa', emoji: '🦒' },
    { palavra: 'Gaveta', emoji: '📦' }
  ]},
  { letra: 'H', exemplos: [
    { palavra: 'Hipopótamo', emoji: '🦛' },
    { palavra: 'Helicóptero', emoji: '🚁' },
    { palavra: 'Homem', emoji: '👨' }
  ]},
  { letra: 'I', exemplos: [
    { palavra: 'Igreja', emoji: '⛪' },
    { palavra: 'Ilha', emoji: '🏝️' },
    { palavra: 'Ímã', emoji: '🧲' }
  ]},
  { letra: 'J', exemplos: [
    { palavra: 'Jacaré', emoji: '🐊' },
    { palavra: 'Janela', emoji: '🪟' },
    { palavra: 'Joaninha', emoji: '🐞' }
  ]},
  { letra: 'K', exemplos: [
    { palavra: 'Kiwi', emoji: '🥝' },
    { palavra: 'Karatê', emoji: '🥋' },
    { palavra: 'Koala', emoji: '🐨' }
  ]},
  { letra: 'L', exemplos: [
    { palavra: 'Leão', emoji: '🦁' },
    { palavra: 'Livro', emoji: '📚' },
    { palavra: 'Lua', emoji: '🌙' }
  ]},
  { letra: 'M', exemplos: [
    { palavra: 'Macaco', emoji: '🐵' },
    { palavra: 'Melancia', emoji: '🍉' },
    { palavra: 'Mãe', emoji: '👩' }
  ]},
  { letra: 'N', exemplos: [
    { palavra: 'Navio', emoji: '🚢' },
    { palavra: 'Nuvem', emoji: '☁️' },
    { palavra: 'Nota', emoji: '🎵' }
  ]},
  { letra: 'O', exemplos: [
    { palavra: 'Olho', emoji: '👁️' },
    { palavra: 'Ovo', emoji: '🥚' },
    { palavra: 'Óculos', emoji: '👓' }
  ]},
  { letra: 'P', exemplos: [
    { palavra: 'Pato', emoji: '🦆' },
    { palavra: 'Pipoca', emoji: '🍿' },
    { palavra: 'Peixe', emoji: '🐟' }
  ]},
  { letra: 'Q', exemplos: [
    { palavra: 'Queijo', emoji: '🧀' },
    { palavra: 'Quiabo', emoji: '🌿' },
    { palavra: 'Quadro', emoji: '🖼️' }
  ]},
  { letra: 'R', exemplos: [
    { palavra: 'Rato', emoji: '🐭' },
    { palavra: 'Rosa', emoji: '🌹' },
    { palavra: 'Relógio', emoji: '⏰' }
  ]},
  { letra: 'S', exemplos: [
    { palavra: 'Sapo', emoji: '🐸' },
    { palavra: 'Sol', emoji: '☀️' },
    { palavra: 'Sapato', emoji: '👞' }
  ]},
  { letra: 'T', exemplos: [
    { palavra: 'Tartaruga', emoji: '🐢' },
    { palavra: 'Telefone', emoji: '📱' },
    { palavra: 'Tigre', emoji: '🐯' }
  ]},
  { letra: 'U', exemplos: [
    { palavra: 'Uva', emoji: '🍇' },
    { palavra: 'Urso', emoji: '🐻' },
    { palavra: 'Unicórnio', emoji: '🦄' }
  ]},
  { letra: 'V', exemplos: [
    { palavra: 'Vaca', emoji: '🐄' },
    { palavra: 'Violão', emoji: '🎸' },
    { palavra: 'Vela', emoji: '🕯️' }
  ]},
  { letra: 'W', exemplos: [
    { palavra: 'Wifi', emoji: '📶' },
    { palavra: 'Web', emoji: '🌐' },
    { palavra: 'Waffle', emoji: '🧇' }
  ]},
  { letra: 'X', exemplos: [
    { palavra: 'Xícara', emoji: '☕' },
    { palavra: 'Xadrez', emoji: '♟️' },
    { palavra: 'Xale', emoji: '🧣' }
  ]},
  { letra: 'Y', exemplos: [
    { palavra: 'Yoga', emoji: '🧘' },
    { palavra: 'Yakult', emoji: '🥛' },
    { palavra: 'Yeti', emoji: '🦍' }
  ]},
  { letra: 'Z', exemplos: [
    { palavra: 'Zebra', emoji: '🦓' },
    { palavra: 'Zíper', emoji: '🤐' },
    { palavra: 'Zoológico', emoji: '🦁' }
  ]}
];

// Histórias curtas
const historias = [
  {
    titulo: 'A Abelha',
    texto: 'A abelha voa. Ela faz mel. O mel é doce.',
    emoji: '🐝'
  },
  {
    titulo: 'O Gato',
    texto: 'O gato corre. Ele brinca com a bola. O gato é feliz.',
    emoji: '🐱'
  },
  {
    titulo: 'A Lua',
    texto: 'A lua brilha. Ela está no céu. A lua é linda.',
    emoji: '🌙'
  }
];

const LetrarScreen = ({ onNavigate, textSize, voiceSpeed }: LetrarScreenProps) => {
  const [secaoAtual, setSecaoAtual] = useState('menu');
  const [letraSelecionada, setLetraSelecionada] = useState<any>(null);
  const [exemploAtual, setExemploAtual] = useState(0);
  const [jogoAtual, setJogoAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [progresso, setProgresso] = useState<string[]>([]);
  const [palavrasDoDia, setPalavrasDoDia] = useState<any[]>([]);
  const [historiaAtual, setHistoriaAtual] = useState(0);
  const [tipoVoz, setTipoVoz] = useState('feminina');
  const [fundoEscuro, setFundoEscuro] = useState(false);
  const [nivelDificuldade, setNivelDificuldade] = useState('facil');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [desenhando, setDesenhando] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      utterance.pitch = tipoVoz === 'infantil' ? 1.2 : 1;
      
      const voices = speechSynthesis.getVoices();
      if (tipoVoz === 'masculina') {
        const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('Masculino'));
        if (maleVoice) utterance.voice = maleVoice;
      } else if (tipoVoz === 'feminina') {
        const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Feminino'));
        if (femaleVoice) utterance.voice = femaleVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Gerar palavras do dia aleatórias
    const palavrasAleatorias: any[] = [];
    for (let i = 0; i < 3; i++) {
      const letraAleatoria = alfabeto[Math.floor(Math.random() * alfabeto.length)];
      const exemploAleatorio = letraAleatoria.exemplos[Math.floor(Math.random() * letraAleatoria.exemplos.length)];
      palavrasAleatorias.push({
        letra: letraAleatoria.letra,
        palavra: exemploAleatorio.palavra,
        emoji: exemploAleatorio.emoji,
        frase: `O ${exemploAleatorio.palavra} é muito legal!`
      });
    }
    setPalavrasDoDia(palavrasAleatorias);
  }, []);

  const iniciarDesenho = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setDesenhando(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const desenhar = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!desenhando) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  };

  const pararDesenho = () => {
    setDesenhando(false);
  };

  const limparCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const verificarResposta = (respostaCorreta: boolean) => {
    if (respostaCorreta) {
      speak('Muito bem! Correto!');
      setPontuacao(pontuacao + 1);
      setTimeout(() => setJogoAtual(jogoAtual + 1), 1500);
    } else {
      speak('Ops! Tente novamente.');
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

  const renderMenu = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {[
        { id: 'aprender', titulo: 'Aprender Letras', icon: BookOpen, cor: 'bg-blue-500' },
        { id: 'associar', titulo: 'Associe Som e Imagem', icon: Volume2, cor: 'bg-purple-500' },
        { id: 'tracar', titulo: 'Traçar Letras', icon: Pencil, cor: 'bg-green-500' },
        { id: 'palavras-dia', titulo: 'Palavras do Dia', icon: Calendar, cor: 'bg-orange-500' },
        { id: 'jogos', titulo: 'Jogos de Letras', icon: Gamepad2, cor: 'bg-pink-500' },
        { id: 'historias', titulo: 'Histórias Curtas', icon: Book, cor: 'bg-indigo-500' },
        { id: 'educador', titulo: 'Modo Educador', icon: Award, cor: 'bg-yellow-500' },
        { id: 'config', titulo: 'Configurações', icon: SettingsIcon, cor: 'bg-gray-500' }
      ].map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer transition-all duration-300 hover:scale-105 border-2 border-blue-300"
          onClick={() => {
            speak(item.titulo);
            setSecaoAtual(item.id);
          }}
        >
          <div className="p-6 flex flex-col items-center text-center space-y-3">
            <div className={`${item.cor} p-4 rounded-2xl shadow-lg`}>
              <item.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className={`${getTextClass()} font-bold text-gray-800`}>
              {item.titulo}
            </h3>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderAprenderLetras = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {letraSelecionada ? (
        <div className="space-y-6">
          <Button
            onClick={() => {
              setLetraSelecionada(null);
              setExemploAtual(0);
            }}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às letras
          </Button>

          <Card className="p-8 bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300">
            <div className="text-center space-y-6">
              <div className="text-9xl font-bold text-blue-600 animate-bounce">
                {letraSelecionada.letra}
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => setExemploAtual(Math.max(0, exemploAtual - 1))}
                  disabled={exemploAtual === 0}
                  variant="outline"
                  size="lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <div className="flex-1 space-y-4">
                  <div className="text-8xl">
                    {letraSelecionada.exemplos[exemploAtual].emoji}
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800">
                    {letraSelecionada.exemplos[exemploAtual].palavra}
                  </h3>
                  <Button
                    onClick={() => speak(`${letraSelecionada.letra} de ${letraSelecionada.exemplos[exemploAtual].palavra}`)}
                    size="lg"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Volume2 className="w-6 h-6 mr-2" />
                    Ouvir Novamente
                  </Button>
                </div>

                <Button
                  onClick={() => setExemploAtual(Math.min(letraSelecionada.exemplos.length - 1, exemploAtual + 1))}
                  disabled={exemploAtual === letraSelecionada.exemplos.length - 1}
                  variant="outline"
                  size="lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-3">
          {alfabeto.map((item) => (
            <Card
              key={item.letra}
              className="cursor-pointer transition-all duration-300 hover:scale-110 border-2 border-blue-300 bg-gradient-to-br from-white to-blue-50"
              onClick={() => {
                setLetraSelecionada(item);
                setExemploAtual(0);
                speak(`Letra ${item.letra}`);
                
                if (!progresso.includes(item.letra)) {
                  setProgresso([...progresso, item.letra]);
                }
              }}
            >
              <div className="p-4 flex flex-col items-center">
                <div className="text-4xl font-bold text-blue-600">
                  {item.letra}
                </div>
                {progresso.includes(item.letra) && (
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mt-1" />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderAssociar = () => {
    const letraAleatoria = alfabeto[jogoAtual % alfabeto.length];
    const exemploCorreto = letraAleatoria.exemplos[0];
    const opcoes = [
      exemploCorreto,
      alfabeto[(jogoAtual + 1) % alfabeto.length].exemplos[0],
      alfabeto[(jogoAtual + 2) % alfabeto.length].exemplos[0]
    ].sort(() => Math.random() - 0.5);

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="p-8 bg-gradient-to-br from-purple-100 to-pink-100">
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold text-purple-700">
              Ouça o som e toque na imagem correta
            </h3>
            <Button
              onClick={() => speak(exemploCorreto.palavra)}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Play className="w-6 h-6 mr-2" />
              Ouvir Som
            </Button>
            
            <div className="grid grid-cols-3 gap-6 mt-8">
              {opcoes.map((opcao, index) => (
                <Card
                  key={index}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 border-4 border-purple-300"
                  onClick={() => verificarResposta(opcao.palavra === exemploCorreto.palavra)}
                >
                  <div className="p-8 flex flex-col items-center space-y-3">
                    <div className="text-6xl">{opcao.emoji}</div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-purple-700">
                Pontuação: {pontuacao}
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderTracar = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-8 bg-gradient-to-br from-green-100 to-teal-100">
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-bold text-green-700">
            Trace a letra com o dedo
          </h3>
          
          <div className="text-6xl font-bold text-green-600 mb-4">
            {letraSelecionada?.letra || 'A'}
          </div>

          <div className="bg-white border-4 border-green-300 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="w-full touch-none"
              onMouseDown={iniciarDesenho}
              onMouseMove={desenhar}
              onMouseUp={pararDesenho}
              onMouseLeave={pararDesenho}
              onTouchStart={iniciarDesenho}
              onTouchMove={desenhar}
              onTouchEnd={pararDesenho}
              style={{ border: '2px dashed #10B981', borderRadius: '8px' }}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={limparCanvas}
              size="lg"
              variant="outline"
              className="border-2 border-green-500"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Limpar
            </Button>
            <Button
              onClick={() => {
                const proximaLetra = alfabeto[(alfabeto.findIndex(l => l.letra === (letraSelecionada?.letra || 'A')) + 1) % alfabeto.length];
                setLetraSelecionada(proximaLetra);
                limparCanvas();
                speak(`Agora trace a letra ${proximaLetra.letra}`);
              }}
              size="lg"
              className="bg-green-500 hover:bg-green-600"
            >
              Próxima Letra
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPalavrasDia = () => (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {palavrasDoDia.map((palavra, index) => (
          <Card
            key={index}
            className="p-6 bg-gradient-to-br from-orange-100 to-yellow-100 border-4 border-orange-300 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => speak(palavra.palavra)}
          >
            <div className="text-center space-y-4">
              <div className="text-7xl">{palavra.emoji}</div>
              <h3 className="text-3xl font-bold text-orange-700">
                {palavra.palavra}
              </h3>
              <p className="text-lg text-gray-700 italic">
                {palavra.frase}
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(palavra.frase);
                }}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                Ouvir Frase
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderJogos = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-8 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-bold text-pink-700">
            Monte a Palavra
          </h3>
          <div className="text-6xl mb-4">🏠</div>
          <h4 className="text-2xl font-bold text-gray-700">CASA</h4>
          
          <div className="flex gap-4 justify-center flex-wrap">
            {['C', 'A', 'S', 'A'].map((letra, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-white border-4 border-pink-300 rounded-xl flex items-center justify-center text-4xl font-bold text-pink-600 cursor-pointer hover:scale-110 transition-all shadow-lg"
              >
                {letra}
              </div>
            ))}
          </div>

          <Button
            onClick={() => {
              speak('Muito bem! Palavra formada corretamente!');
              setPontuacao(pontuacao + 5);
            }}
            size="lg"
            className="bg-pink-500 hover:bg-pink-600"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Verificar
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderHistorias = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-indigo-100 to-blue-100 border-4 border-indigo-300">
        <div className="text-center space-y-6">
          <div className="text-8xl mb-4">
            {historias[historiaAtual].emoji}
          </div>
          <h3 className="text-4xl font-bold text-indigo-700">
            {historias[historiaAtual].titulo}
          </h3>
          <p className="text-2xl text-gray-700 leading-relaxed">
            {historias[historiaAtual].texto.split(' ').map((palavra, index) => (
              <span key={index} className="inline-block mx-1 px-2 py-1 bg-white/50 rounded">
                {palavra}
              </span>
            ))}
          </p>
          
          <div className="flex gap-4 justify-center pt-6">
            <Button
              onClick={() => speak(historias[historiaAtual].texto)}
              size="lg"
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Ouvir História
            </Button>
            <Button
              onClick={() => setHistoriaAtual((historiaAtual + 1) % historias.length)}
              size="lg"
              variant="outline"
              className="border-2 border-indigo-500"
            >
              Próxima História
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderEducador = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-300">
        <div className="space-y-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-yellow-700">
              Progresso do Aprendizado
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl border-2 border-yellow-300 text-center">
              <div className="text-4xl font-bold text-blue-600">
                {progresso.length}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Letras Aprendidas
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-yellow-300 text-center">
              <div className="text-4xl font-bold text-green-600">
                {pontuacao}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Pontos Totais
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-yellow-300 text-center">
              <div className="text-4xl font-bold text-purple-600">
                {Math.round((progresso.length / 26) * 100)}%
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Alfabeto Completo
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-yellow-300 text-center">
              <Star className="w-10 h-10 text-yellow-500 fill-yellow-500 mx-auto" />
              <div className="text-sm text-gray-600 mt-2">
                Nível: {progresso.length < 10 ? 'Iniciante' : progresso.length < 20 ? 'Médio' : 'Avançado'}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-yellow-300">
            <h4 className="text-xl font-bold text-gray-700 mb-4">
              Letras Dominadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {progresso.length > 0 ? (
                progresso.map((letra) => (
                  <div
                    key={letra}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg"
                  >
                    {letra}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  Comece a aprender letras para ver seu progresso aqui!
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderConfig = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-gray-100 to-slate-100 border-4 border-gray-300">
        <div className="space-y-8">
          <div className="text-center">
            <SettingsIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-700">
              Configurações Acessíveis
            </h3>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-xl border-2 border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-700">Tipo de Voz</h4>
                <p className="text-sm text-gray-500">Escolha a voz para narração</p>
              </div>
              <select
                value={tipoVoz}
                onChange={(e) => {
                  setTipoVoz(e.target.value);
                  speak('Voz alterada com sucesso');
                }}
                className="border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="feminina">Feminina</option>
                <option value="masculina">Masculina</option>
                <option value="infantil">Infantil</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-700">Fundo Escuro</h4>
                <p className="text-sm text-gray-500">Modo claro ou escuro</p>
              </div>
              <Switch
                checked={fundoEscuro}
                onCheckedChange={setFundoEscuro}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-700">Nível de Dificuldade</h4>
                <p className="text-sm text-gray-500">Ajuste conforme a evolução</p>
              </div>
              <select
                value={nivelDificuldade}
                onChange={(e) => setNivelDificuldade(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="facil">Fácil (Figuras)</option>
                <option value="medio">Médio (Sílabas)</option>
                <option value="dificil">Difícil (Palavras)</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen ${fundoEscuro ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200'} transition-colors duration-300`}>
      <header className="p-6 border-b border-blue-300/50 bg-white/30 backdrop-blur-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Button
            onClick={() => {
              if (secaoAtual === 'menu') {
                speak('Voltando');
                onNavigate('home');
              } else {
                setSecaoAtual('menu');
                speak('Menu principal');
              }
            }}
            variant="outline"
            className="border-2 border-blue-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>

          <h1 className={`text-3xl font-bold text-blue-800 ${getTextClass()}`}>
            ✏️ Letrar - Alfabetização
          </h1>

          <div className="w-24"></div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {secaoAtual === 'menu' && renderMenu()}
        {secaoAtual === 'aprender' && renderAprenderLetras()}
        {secaoAtual === 'associar' && renderAssociar()}
        {secaoAtual === 'tracar' && renderTracar()}
        {secaoAtual === 'palavras-dia' && renderPalavrasDia()}
        {secaoAtual === 'jogos' && renderJogos()}
        {secaoAtual === 'historias' && renderHistorias()}
        {secaoAtual === 'educador' && renderEducador()}
        {secaoAtual === 'config' && renderConfig()}
      </div>
    </div>
  );
};

export default LetrarScreen;
