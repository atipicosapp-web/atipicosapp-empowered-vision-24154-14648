import React, { useState } from 'react';
import { 
  ArrowLeft,
  User,
  Users,
  Heart,
  Baby,
  Utensils,
  Droplet,
  Home,
  Bed,
  HelpCircle,
  Smile,
  Frown,
  Angry,
  Wind,
  AlertCircle,
  Target,
  Activity,
  Move,
  Clock,
  GraduationCap,
  Stethoscope,
  TreePine,
  MapPin,
  Tablet,
  Music,
  Check,
  X,
  Apple,
  IceCream,
  Pizza,
  Candy,
  Beef,
  Carrot,
  Cookie,
  Soup,
  Sandwich,
  Salad,
  Fish,
  Cherry,
  Banana,
  Grape,
  Citrus,
  Palmtree,
  Dog,
  Cat,
  Bird,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PECSCommunicationScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
}

interface NavigationItem {
  id: string;
  name: string;
}

const PECSCommunicationScreen = ({ onNavigate, textSize, voiceSpeed }: PECSCommunicationScreenProps) => {
  const [navigationStack, setNavigationStack] = useState<NavigationItem[]>([{ id: 'main', name: 'Início' }]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
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

  // Estrutura completa de dados
  const vocabulary = {
    main: {
      categories: [
        { id: 'fome', name: 'Fome', icon: Utensils, color: 'bg-orange-500', speech: 'Fome' },
        { id: 'sede', name: 'Sede', icon: Droplet, color: 'bg-blue-500', speech: 'Sede' },
        { id: 'sentimentos', name: 'Sentimentos', icon: Smile, color: 'bg-yellow-500', speech: 'Sentimentos' },
        { id: 'acoes', name: 'Ações', icon: Activity, color: 'bg-green-500', speech: 'Ações' },
        { id: 'pessoas', name: 'Pessoas', icon: Users, color: 'bg-purple-500', speech: 'Pessoas' },
        { id: 'lugares', name: 'Lugares', icon: MapPin, color: 'bg-pink-500', speech: 'Lugares' },
        { id: 'necessidades', name: 'Necessidades', icon: HelpCircle, color: 'bg-red-500', speech: 'Necessidades' },
        { id: 'respostas', name: 'Respostas', icon: Check, color: 'bg-teal-500', speech: 'Respostas' },
        { id: 'brincadeira', name: 'Brincadeira', icon: Activity, color: 'bg-pink-600', speech: 'Brincadeira' },
        { id: 'vegetais', name: 'Vegetais', icon: Carrot, color: 'bg-green-600', speech: 'Vegetais' },
        { id: 'numeros', name: 'Números', icon: Target, color: 'bg-blue-600', speech: 'Números' },
        { id: 'escola', name: 'Escola', icon: GraduationCap, color: 'bg-indigo-500', speech: 'Escola' },
        { id: 'alfabeto', name: 'Alfabeto', icon: GraduationCap, color: 'bg-purple-600', speech: 'Alfabeto' },
        { id: 'bebidas', name: 'Bebidas', icon: Droplet, color: 'bg-cyan-500', speech: 'Bebidas' },
        { id: 'fazenda', name: 'Fazenda', icon: TreePine, color: 'bg-green-700', speech: 'Fazenda' },
        { id: 'vogais', name: 'Vogais', icon: GraduationCap, color: 'bg-violet-500', speech: 'Vogais' },
        { id: 'objetos_casa', name: 'Objetos de Casa', icon: Home, color: 'bg-amber-600', speech: 'Objetos de Casa' },
        { id: 'bichos', name: 'Bichos', icon: Dog, color: 'bg-orange-600', speech: 'Bichos' },
        { id: 'emojis', name: 'Emojis', icon: Smile, color: 'bg-yellow-600', speech: 'Emojis' },
        { id: 'cores', name: 'Cores', icon: Palmtree, color: 'bg-pink-700', speech: 'Cores' },
        { id: 'dinossauros', name: 'Dinossauros', icon: Bird, color: 'bg-lime-600', speech: 'Dinossauros' },
        { id: 'formas', name: 'Formas', icon: Target, color: 'bg-teal-600', speech: 'Formas' },
        { id: 'conceitos', name: 'Conceitos', icon: HelpCircle, color: 'bg-slate-600', speech: 'Conceitos' },
        { id: 'esportes', name: 'Esportes', icon: Activity, color: 'bg-emerald-600', speech: 'Esportes' },
        { id: 'cozinha', name: 'Cozinha', icon: Utensils, color: 'bg-red-600', speech: 'Cozinha' },
        { id: 'vestuario', name: 'Vestuário', icon: User, color: 'bg-fuchsia-600', speech: 'Vestuário' },
        { id: 'instrumentos', name: 'Instrumentos', icon: Music, color: 'bg-rose-600', speech: 'Instrumentos' },
        { id: 'atividades', name: 'Atividades', icon: Move, color: 'bg-sky-600', speech: 'Atividades' },
        { id: 'cidades', name: 'Cidades', icon: Globe, color: 'bg-gray-600', speech: 'Cidades' },
        { id: 'natal', name: 'Natal', icon: TreePine, color: 'bg-red-700', speech: 'Natal' }
      ]
    },
    fome: {
      categories: [
        { id: 'frutas', name: 'Frutas', icon: Apple, color: 'bg-red-400', speech: 'Frutas' },
        { id: 'carnes', name: 'Carnes', icon: Beef, color: 'bg-red-600', speech: 'Carnes' },
        { id: 'massas', name: 'Massas', icon: Pizza, color: 'bg-yellow-600', speech: 'Massas' },
        { id: 'doces', name: 'Doces', icon: IceCream, color: 'bg-pink-400', speech: 'Doces' },
        { id: 'lanches', name: 'Lanches', icon: Sandwich, color: 'bg-orange-400', speech: 'Lanches' },
        { id: 'vegetais', name: 'Vegetais', icon: Carrot, color: 'bg-green-500', speech: 'Vegetais' },
        { id: 'sopas', name: 'Sopas', icon: Soup, color: 'bg-orange-600', speech: 'Sopas' },
        { id: 'saladas', name: 'Saladas', icon: Salad, color: 'bg-green-400', speech: 'Saladas' }
      ]
    },
    frutas: {
      items: [
        { text: 'Maçã', icon: Apple, speech: 'Quero maçã', color: 'bg-red-400' },
        { text: 'Banana', icon: Banana, speech: 'Quero banana', color: 'bg-yellow-400' },
        { text: 'Laranja', icon: Citrus, speech: 'Quero laranja', color: 'bg-orange-400' },
        { text: 'Uva', icon: Grape, speech: 'Quero uva', color: 'bg-purple-400' },
        { text: 'Morango', icon: Cherry, speech: 'Quero morango', color: 'bg-red-500' },
        { text: 'Melancia', icon: Apple, speech: 'Quero melancia', color: 'bg-green-500' },
        { text: 'Manga', icon: Apple, speech: 'Quero manga', color: 'bg-yellow-500' },
        { text: 'Abacaxi', icon: Palmtree, speech: 'Quero abacaxi', color: 'bg-yellow-600' },
        { text: 'Pera', icon: Apple, speech: 'Quero pera', color: 'bg-green-400' },
        { text: 'Kiwi', icon: Apple, speech: 'Quero kiwi', color: 'bg-green-600' },
        { text: 'Mamão', icon: Apple, speech: 'Quero mamão', color: 'bg-orange-500' },
        { text: 'Limão', icon: Citrus, speech: 'Quero limão', color: 'bg-green-300' }
      ]
    },
    carnes: {
      items: [
        { text: 'Frango', icon: Bird, speech: 'Quero frango', color: 'bg-yellow-600' },
        { text: 'Carne', icon: Beef, speech: 'Quero carne', color: 'bg-red-600' },
        { text: 'Peixe', icon: Fish, speech: 'Quero peixe', color: 'bg-blue-400' },
        { text: 'Porco', icon: Beef, speech: 'Quero porco', color: 'bg-pink-500' },
        { text: 'Hambúrguer', icon: Beef, speech: 'Quero hambúrguer', color: 'bg-red-500' },
        { text: 'Salsicha', icon: Beef, speech: 'Quero salsicha', color: 'bg-red-400' },
        { text: 'Nuggets', icon: Bird, speech: 'Quero nuggets', color: 'bg-yellow-500' },
        { text: 'Bife', icon: Beef, speech: 'Quero bife', color: 'bg-red-700' }
      ]
    },
    massas: {
      items: [
        { text: 'Macarrão', icon: Pizza, speech: 'Quero macarrão', color: 'bg-yellow-600' },
        { text: 'Pizza', icon: Pizza, speech: 'Quero pizza', color: 'bg-red-500' },
        { text: 'Lasanha', icon: Pizza, speech: 'Quero lasanha', color: 'bg-orange-500' },
        { text: 'Nhoque', icon: Pizza, speech: 'Quero nhoque', color: 'bg-yellow-500' },
        { text: 'Espaguete', icon: Pizza, speech: 'Quero espaguete', color: 'bg-yellow-700' },
        { text: 'Pão', icon: Cookie, speech: 'Quero pão', color: 'bg-orange-400' }
      ]
    },
    doces: {
      items: [
        { text: 'Chocolate', icon: Candy, speech: 'Quero chocolate', color: 'bg-brown-600' },
        { text: 'Sorvete', icon: IceCream, speech: 'Quero sorvete', color: 'bg-pink-400' },
        { text: 'Bolo', icon: Cookie, speech: 'Quero bolo', color: 'bg-yellow-400' },
        { text: 'Biscoito', icon: Cookie, speech: 'Quero biscoito', color: 'bg-orange-300' },
        { text: 'Bala', icon: Candy, speech: 'Quero bala', color: 'bg-red-400' },
        { text: 'Pudim', icon: IceCream, speech: 'Quero pudim', color: 'bg-yellow-300' },
        { text: 'Gelatina', icon: IceCream, speech: 'Quero gelatina', color: 'bg-red-300' },
        { text: 'Pipoca', icon: Cookie, speech: 'Quero pipoca', color: 'bg-yellow-200' }
      ]
    },
    lanches: {
      items: [
        { text: 'Sanduíche', icon: Sandwich, speech: 'Quero sanduíche', color: 'bg-yellow-500' },
        { text: 'Hot dog', icon: Sandwich, speech: 'Quero hot dog', color: 'bg-red-500' },
        { text: 'Salgado', icon: Pizza, speech: 'Quero salgado', color: 'bg-orange-500' },
        { text: 'Batata frita', icon: Pizza, speech: 'Quero batata frita', color: 'bg-yellow-600' },
        { text: 'Pastel', icon: Pizza, speech: 'Quero pastel', color: 'bg-orange-400' },
        { text: 'Coxinha', icon: Pizza, speech: 'Quero coxinha', color: 'bg-yellow-700' }
      ]
    },
    vegetais: {
      items: [
        { text: 'Cenoura', icon: Carrot, speech: 'Quero cenoura', color: 'bg-orange-500' },
        { text: 'Tomate', icon: Apple, speech: 'Quero tomate', color: 'bg-red-500' },
        { text: 'Alface', icon: Salad, speech: 'Quero alface', color: 'bg-green-400' },
        { text: 'Brócolis', icon: Salad, speech: 'Quero brócolis', color: 'bg-green-600' },
        { text: 'Batata', icon: Apple, speech: 'Quero batata', color: 'bg-yellow-700' },
        { text: 'Milho', icon: Carrot, speech: 'Quero milho', color: 'bg-yellow-400' }
      ]
    },
    sopas: {
      items: [
        { text: 'Sopa de legumes', icon: Soup, speech: 'Quero sopa de legumes', color: 'bg-green-500' },
        { text: 'Caldo de frango', icon: Soup, speech: 'Quero caldo de frango', color: 'bg-yellow-500' },
        { text: 'Canja', icon: Soup, speech: 'Quero canja', color: 'bg-yellow-400' }
      ]
    },
    saladas: {
      items: [
        { text: 'Salada verde', icon: Salad, speech: 'Quero salada verde', color: 'bg-green-400' },
        { text: 'Salada de frutas', icon: Apple, speech: 'Quero salada de frutas', color: 'bg-red-400' }
      ]
    },
    sede: {
      items: [
        { text: 'Água', icon: Droplet, speech: 'Quero água', color: 'bg-blue-400' },
        { text: 'Suco', icon: Droplet, speech: 'Quero suco', color: 'bg-orange-400' },
        { text: 'Leite', icon: Droplet, speech: 'Quero leite', color: 'bg-gray-200' },
        { text: 'Refrigerante', icon: Droplet, speech: 'Quero refrigerante', color: 'bg-red-500' },
        { text: 'Achocolatado', icon: Droplet, speech: 'Quero achocolatado', color: 'bg-brown-500' },
        { text: 'Chá', icon: Droplet, speech: 'Quero chá', color: 'bg-green-600' },
        { text: 'Café', icon: Droplet, speech: 'Quero café', color: 'bg-brown-700' },
        { text: 'Vitamina', icon: Droplet, speech: 'Quero vitamina', color: 'bg-pink-400' }
      ]
    },
    sentimentos: {
      items: [
        { text: 'Feliz', icon: Smile, speech: 'Estou feliz', color: 'bg-yellow-400' },
        { text: 'Triste', icon: Frown, speech: 'Estou triste', color: 'bg-blue-400' },
        { text: 'Com raiva', icon: Angry, speech: 'Estou com raiva', color: 'bg-red-500' },
        { text: 'Assustado', icon: AlertCircle, speech: 'Estou assustado', color: 'bg-orange-500' },
        { text: 'Cansado', icon: Wind, speech: 'Estou cansado', color: 'bg-gray-400' },
        { text: 'Animado', icon: Activity, speech: 'Estou animado', color: 'bg-green-400' },
        { text: 'Com sono', icon: Bed, speech: 'Estou com sono', color: 'bg-purple-400' },
        { text: 'Com dor', icon: AlertCircle, speech: 'Estou com dor', color: 'bg-red-600' }
      ]
    },
    acoes: {
      items: [
        { text: 'Ir', icon: Move, speech: 'Quero ir', color: 'bg-blue-500' },
        { text: 'Parar', icon: X, speech: 'Quero parar', color: 'bg-red-500' },
        { text: 'Sentar', icon: User, speech: 'Vou sentar', color: 'bg-green-500' },
        { text: 'Levantar', icon: Activity, speech: 'Vou levantar', color: 'bg-yellow-500' },
        { text: 'Brincar', icon: Activity, speech: 'Quero brincar', color: 'bg-pink-500' },
        { text: 'Dormir', icon: Bed, speech: 'Quero dormir', color: 'bg-purple-500' },
        { text: 'Assistir TV', icon: Tablet, speech: 'Quero assistir TV', color: 'bg-blue-600' },
        { text: 'Ouvir música', icon: Music, speech: 'Quero ouvir música', color: 'bg-pink-600' }
      ]
    },
    pessoas: {
      items: [
        { text: 'Eu', icon: User, speech: 'Eu', color: 'bg-blue-500' },
        { text: 'Você', icon: Target, speech: 'Você', color: 'bg-green-500' },
        { text: 'Mamãe', icon: Heart, speech: 'Mamãe', color: 'bg-pink-500' },
        { text: 'Papai', icon: Users, speech: 'Papai', color: 'bg-blue-600' },
        { text: 'Irmão', icon: Baby, speech: 'Irmão', color: 'bg-green-600' },
        { text: 'Irmã', icon: Baby, speech: 'Irmã', color: 'bg-pink-600' },
        { text: 'Vovó', icon: Heart, speech: 'Vovó', color: 'bg-purple-500' },
        { text: 'Vovô', icon: Users, speech: 'Vovô', color: 'bg-purple-600' },
        { text: 'Tia', icon: Heart, speech: 'Tia', color: 'bg-pink-400' },
        { text: 'Tio', icon: Users, speech: 'Tio', color: 'bg-blue-400' },
        { text: 'Amigo', icon: Smile, speech: 'Amigo', color: 'bg-yellow-500' },
        { text: 'Professor', icon: GraduationCap, speech: 'Professor', color: 'bg-orange-500' }
      ]
    },
    lugares: {
      items: [
        { text: 'Casa', icon: Home, speech: 'Quero ir para casa', color: 'bg-blue-500' },
        { text: 'Escola', icon: GraduationCap, speech: 'Quero ir para escola', color: 'bg-green-500' },
        { text: 'Parque', icon: TreePine, speech: 'Quero ir ao parque', color: 'bg-green-600' },
        { text: 'Médico', icon: Stethoscope, speech: 'Vou ao médico', color: 'bg-red-500' },
        { text: 'Terapia', icon: Heart, speech: 'Vou à terapia', color: 'bg-purple-500' },
        { text: 'Shopping', icon: MapPin, speech: 'Quero ir ao shopping', color: 'bg-pink-500' },
        { text: 'Praia', icon: Globe, speech: 'Quero ir à praia', color: 'bg-blue-400' },
        { text: 'Casa da vovó', icon: Home, speech: 'Quero ir na casa da vovó', color: 'bg-purple-400' }
      ]
    },
    necessidades: {
      items: [
        { text: 'Banheiro', icon: HelpCircle, speech: 'Preciso ir ao banheiro', color: 'bg-blue-500' },
        { text: 'Ajuda', icon: HelpCircle, speech: 'Preciso de ajuda', color: 'bg-red-500' },
        { text: 'Descansar', icon: Wind, speech: 'Preciso descansar', color: 'bg-green-500' },
        { text: 'Silêncio', icon: X, speech: 'Preciso de silêncio', color: 'bg-gray-500' },
        { text: 'Abraço', icon: Heart, speech: 'Quero um abraço', color: 'bg-pink-500' }
      ]
    },
    respostas: {
      items: [
        { text: 'Sim', icon: Check, speech: 'Sim', color: 'bg-green-500' },
        { text: 'Não', icon: X, speech: 'Não', color: 'bg-red-500' },
        { text: 'Ok', icon: Check, speech: 'Ok', color: 'bg-blue-500' },
        { text: 'Talvez', icon: HelpCircle, speech: 'Talvez', color: 'bg-yellow-500' },
        { text: 'Depois', icon: Clock, speech: 'Depois', color: 'bg-orange-500' },
        { text: 'Agora', icon: Clock, speech: 'Agora', color: 'bg-green-600' }
      ]
    },
    brincadeira: {
      items: [
        { text: 'Bola', icon: Activity, speech: 'Quero brincar de bola', color: 'bg-orange-500' },
        { text: 'Boneca', icon: Baby, speech: 'Quero brincar de boneca', color: 'bg-pink-500' },
        { text: 'Carrinho', icon: Move, speech: 'Quero brincar de carrinho', color: 'bg-blue-500' },
        { text: 'Quebra-cabeça', icon: Target, speech: 'Quero fazer quebra-cabeça', color: 'bg-purple-500' },
        { text: 'Massinha', icon: Palmtree, speech: 'Quero brincar de massinha', color: 'bg-yellow-500' },
        { text: 'Pintar', icon: Activity, speech: 'Quero pintar', color: 'bg-red-500' },
        { text: 'Lego', icon: Target, speech: 'Quero brincar de lego', color: 'bg-green-500' },
        { text: 'Esconde-esconde', icon: HelpCircle, speech: 'Quero brincar de esconde-esconde', color: 'bg-indigo-500' },
        { text: 'Pega-pega', icon: Move, speech: 'Quero brincar de pega-pega', color: 'bg-orange-600' },
        { text: 'Balanço', icon: Activity, speech: 'Quero ir no balanço', color: 'bg-blue-600' },
        { text: 'Videogame', icon: Tablet, speech: 'Quero jogar videogame', color: 'bg-purple-600' },
        { text: 'Bicicleta', icon: Move, speech: 'Quero andar de bicicleta', color: 'bg-green-600' }
      ]
    },
    numeros: {
      items: [
        { text: '1', icon: Target, speech: 'Um', color: 'bg-red-400' },
        { text: '2', icon: Target, speech: 'Dois', color: 'bg-orange-400' },
        { text: '3', icon: Target, speech: 'Três', color: 'bg-yellow-400' },
        { text: '4', icon: Target, speech: 'Quatro', color: 'bg-green-400' },
        { text: '5', icon: Target, speech: 'Cinco', color: 'bg-blue-400' },
        { text: '6', icon: Target, speech: 'Seis', color: 'bg-indigo-400' },
        { text: '7', icon: Target, speech: 'Sete', color: 'bg-purple-400' },
        { text: '8', icon: Target, speech: 'Oito', color: 'bg-pink-400' },
        { text: '9', icon: Target, speech: 'Nove', color: 'bg-red-500' },
        { text: '10', icon: Target, speech: 'Dez', color: 'bg-orange-500' }
      ]
    },
    escola: {
      items: [
        { text: 'Lápis', icon: GraduationCap, speech: 'Lápis', color: 'bg-yellow-600' },
        { text: 'Caneta', icon: GraduationCap, speech: 'Caneta', color: 'bg-blue-600' },
        { text: 'Caderno', icon: GraduationCap, speech: 'Caderno', color: 'bg-red-500' },
        { text: 'Livro', icon: GraduationCap, speech: 'Livro', color: 'bg-green-600' },
        { text: 'Mochila', icon: GraduationCap, speech: 'Mochila', color: 'bg-purple-600' },
        { text: 'Borracha', icon: GraduationCap, speech: 'Borracha', color: 'bg-pink-500' },
        { text: 'Régua', icon: GraduationCap, speech: 'Régua', color: 'bg-gray-500' },
        { text: 'Tesoura', icon: GraduationCap, speech: 'Tesoura', color: 'bg-orange-600' },
        { text: 'Cola', icon: GraduationCap, speech: 'Cola', color: 'bg-yellow-500' },
        { text: 'Giz de cera', icon: GraduationCap, speech: 'Giz de cera', color: 'bg-green-500' }
      ]
    },
    alfabeto: {
      items: [
        { text: 'A', icon: GraduationCap, speech: 'A', color: 'bg-red-400' },
        { text: 'B', icon: GraduationCap, speech: 'B', color: 'bg-orange-400' },
        { text: 'C', icon: GraduationCap, speech: 'C', color: 'bg-yellow-400' },
        { text: 'D', icon: GraduationCap, speech: 'D', color: 'bg-green-400' },
        { text: 'E', icon: GraduationCap, speech: 'E', color: 'bg-blue-400' },
        { text: 'F', icon: GraduationCap, speech: 'F', color: 'bg-indigo-400' },
        { text: 'G', icon: GraduationCap, speech: 'G', color: 'bg-purple-400' },
        { text: 'H', icon: GraduationCap, speech: 'H', color: 'bg-pink-400' },
        { text: 'I', icon: GraduationCap, speech: 'I', color: 'bg-red-500' },
        { text: 'J', icon: GraduationCap, speech: 'J', color: 'bg-orange-500' },
        { text: 'K', icon: GraduationCap, speech: 'K', color: 'bg-yellow-500' },
        { text: 'L', icon: GraduationCap, speech: 'L', color: 'bg-green-500' },
        { text: 'M', icon: GraduationCap, speech: 'M', color: 'bg-blue-500' },
        { text: 'N', icon: GraduationCap, speech: 'N', color: 'bg-indigo-500' },
        { text: 'O', icon: GraduationCap, speech: 'O', color: 'bg-purple-500' },
        { text: 'P', icon: GraduationCap, speech: 'P', color: 'bg-pink-500' },
        { text: 'Q', icon: GraduationCap, speech: 'Q', color: 'bg-red-600' },
        { text: 'R', icon: GraduationCap, speech: 'R', color: 'bg-orange-600' },
        { text: 'S', icon: GraduationCap, speech: 'S', color: 'bg-yellow-600' },
        { text: 'T', icon: GraduationCap, speech: 'T', color: 'bg-green-600' },
        { text: 'U', icon: GraduationCap, speech: 'U', color: 'bg-blue-600' },
        { text: 'V', icon: GraduationCap, speech: 'V', color: 'bg-indigo-600' },
        { text: 'W', icon: GraduationCap, speech: 'W', color: 'bg-purple-600' },
        { text: 'X', icon: GraduationCap, speech: 'X', color: 'bg-pink-600' },
        { text: 'Y', icon: GraduationCap, speech: 'Y', color: 'bg-red-700' },
        { text: 'Z', icon: GraduationCap, speech: 'Z', color: 'bg-orange-700' }
      ]
    },
    bebidas: {
      items: [
        { text: 'Água', icon: Droplet, speech: 'Quero água', color: 'bg-blue-400' },
        { text: 'Suco de laranja', icon: Droplet, speech: 'Quero suco de laranja', color: 'bg-orange-400' },
        { text: 'Suco de uva', icon: Droplet, speech: 'Quero suco de uva', color: 'bg-purple-400' },
        { text: 'Leite', icon: Droplet, speech: 'Quero leite', color: 'bg-gray-200' },
        { text: 'Achocolatado', icon: Droplet, speech: 'Quero achocolatado', color: 'bg-brown-500' },
        { text: 'Refrigerante', icon: Droplet, speech: 'Quero refrigerante', color: 'bg-red-500' },
        { text: 'Chá', icon: Droplet, speech: 'Quero chá', color: 'bg-green-600' },
        { text: 'Café', icon: Droplet, speech: 'Quero café', color: 'bg-brown-700' },
        { text: 'Vitamina', icon: Droplet, speech: 'Quero vitamina', color: 'bg-pink-400' },
        { text: 'Água de coco', icon: Droplet, speech: 'Quero água de coco', color: 'bg-green-300' }
      ]
    },
    fazenda: {
      items: [
        { text: 'Vaca', icon: Beef, speech: 'Vaca', color: 'bg-brown-500' },
        { text: 'Cavalo', icon: Beef, speech: 'Cavalo', color: 'bg-brown-600' },
        { text: 'Galinha', icon: Bird, speech: 'Galinha', color: 'bg-yellow-600' },
        { text: 'Porco', icon: Beef, speech: 'Porco', color: 'bg-pink-500' },
        { text: 'Ovelha', icon: Beef, speech: 'Ovelha', color: 'bg-gray-300' },
        { text: 'Pato', icon: Bird, speech: 'Pato', color: 'bg-yellow-500' },
        { text: 'Galo', icon: Bird, speech: 'Galo', color: 'bg-red-600' },
        { text: 'Cabra', icon: Beef, speech: 'Cabra', color: 'bg-gray-500' },
        { text: 'Coelho', icon: Dog, speech: 'Coelho', color: 'bg-gray-400' }
      ]
    },
    vogais: {
      items: [
        { text: 'A', icon: GraduationCap, speech: 'A', color: 'bg-red-500' },
        { text: 'E', icon: GraduationCap, speech: 'E', color: 'bg-blue-500' },
        { text: 'I', icon: GraduationCap, speech: 'I', color: 'bg-yellow-500' },
        { text: 'O', icon: GraduationCap, speech: 'O', color: 'bg-green-500' },
        { text: 'U', icon: GraduationCap, speech: 'U', color: 'bg-purple-500' }
      ]
    },
    objetos_casa: {
      items: [
        { text: 'Sofá', icon: Home, speech: 'Sofá', color: 'bg-blue-500' },
        { text: 'Mesa', icon: Home, speech: 'Mesa', color: 'bg-brown-600' },
        { text: 'Cadeira', icon: Home, speech: 'Cadeira', color: 'bg-brown-500' },
        { text: 'Cama', icon: Bed, speech: 'Cama', color: 'bg-blue-600' },
        { text: 'TV', icon: Tablet, speech: 'Televisão', color: 'bg-gray-700' },
        { text: 'Geladeira', icon: Home, speech: 'Geladeira', color: 'bg-gray-400' },
        { text: 'Fogão', icon: Home, speech: 'Fogão', color: 'bg-gray-600' },
        { text: 'Porta', icon: Home, speech: 'Porta', color: 'bg-brown-700' },
        { text: 'Janela', icon: Home, speech: 'Janela', color: 'bg-blue-400' },
        { text: 'Telefone', icon: Tablet, speech: 'Telefone', color: 'bg-green-600' }
      ]
    },
    bichos: {
      items: [
        { text: 'Cachorro', icon: Dog, speech: 'Cachorro', color: 'bg-brown-500' },
        { text: 'Gato', icon: Cat, speech: 'Gato', color: 'bg-orange-500' },
        { text: 'Pássaro', icon: Bird, speech: 'Pássaro', color: 'bg-blue-500' },
        { text: 'Peixe', icon: Fish, speech: 'Peixe', color: 'bg-blue-400' },
        { text: 'Coelho', icon: Dog, speech: 'Coelho', color: 'bg-gray-400' },
        { text: 'Tartaruga', icon: Dog, speech: 'Tartaruga', color: 'bg-green-600' },
        { text: 'Hamster', icon: Dog, speech: 'Hamster', color: 'bg-brown-400' },
        { text: 'Leão', icon: Cat, speech: 'Leão', color: 'bg-yellow-600' },
        { text: 'Elefante', icon: Dog, speech: 'Elefante', color: 'bg-gray-600' },
        { text: 'Macaco', icon: Dog, speech: 'Macaco', color: 'bg-brown-600' },
        { text: 'Girafa', icon: Dog, speech: 'Girafa', color: 'bg-yellow-500' },
        { text: 'Zebra', icon: Dog, speech: 'Zebra', color: 'bg-gray-500' }
      ]
    },
    emojis: {
      items: [
        { text: '😀 Feliz', icon: Smile, speech: 'Feliz', color: 'bg-yellow-400' },
        { text: '😢 Triste', icon: Frown, speech: 'Triste', color: 'bg-blue-400' },
        { text: '😡 Bravo', icon: Angry, speech: 'Bravo', color: 'bg-red-500' },
        { text: '😴 Sono', icon: Wind, speech: 'Com sono', color: 'bg-purple-400' },
        { text: '😋 Gostoso', icon: Smile, speech: 'Gostoso', color: 'bg-pink-400' },
        { text: '🤢 Enjoado', icon: Frown, speech: 'Enjoado', color: 'bg-green-400' },
        { text: '😱 Assustado', icon: AlertCircle, speech: 'Assustado', color: 'bg-orange-500' },
        { text: '❤️ Amor', icon: Heart, speech: 'Amor', color: 'bg-red-600' }
      ]
    },
    cores: {
      items: [
        { text: 'Vermelho', icon: Apple, speech: 'Vermelho', color: 'bg-red-500' },
        { text: 'Azul', icon: Droplet, speech: 'Azul', color: 'bg-blue-500' },
        { text: 'Amarelo', icon: Banana, speech: 'Amarelo', color: 'bg-yellow-400' },
        { text: 'Verde', icon: TreePine, speech: 'Verde', color: 'bg-green-500' },
        { text: 'Rosa', icon: Heart, speech: 'Rosa', color: 'bg-pink-400' },
        { text: 'Laranja', icon: Citrus, speech: 'Laranja', color: 'bg-orange-500' },
        { text: 'Roxo', icon: Grape, speech: 'Roxo', color: 'bg-purple-500' },
        { text: 'Preto', icon: X, speech: 'Preto', color: 'bg-gray-900' },
        { text: 'Branco', icon: Check, speech: 'Branco', color: 'bg-gray-100' },
        { text: 'Marrom', icon: Cookie, speech: 'Marrom', color: 'bg-brown-600' }
      ]
    },
    dinossauros: {
      items: [
        { text: 'T-Rex', icon: Bird, speech: 'Tiranossauro Rex', color: 'bg-green-600' },
        { text: 'Tricerátops', icon: Bird, speech: 'Tricerátops', color: 'bg-orange-600' },
        { text: 'Estegossauro', icon: Bird, speech: 'Estegossauro', color: 'bg-purple-600' },
        { text: 'Braquiossauro', icon: Bird, speech: 'Braquiossauro', color: 'bg-blue-600' },
        { text: 'Velociraptor', icon: Bird, speech: 'Velociraptor', color: 'bg-red-600' },
        { text: 'Pterodáctilo', icon: Bird, speech: 'Pterodáctilo', color: 'bg-yellow-600' }
      ]
    },
    formas: {
      items: [
        { text: '⚫ Círculo', icon: Target, speech: 'Círculo', color: 'bg-blue-500' },
        { text: '⬛ Quadrado', icon: Target, speech: 'Quadrado', color: 'bg-red-500' },
        { text: '▲ Triângulo', icon: Target, speech: 'Triângulo', color: 'bg-green-500' },
        { text: '⭐ Estrela', icon: Target, speech: 'Estrela', color: 'bg-yellow-500' },
        { text: '❤️ Coração', icon: Heart, speech: 'Coração', color: 'bg-pink-500' },
        { text: '◆ Losango', icon: Target, speech: 'Losango', color: 'bg-purple-500' }
      ]
    },
    conceitos: {
      items: [
        { text: 'Grande', icon: Move, speech: 'Grande', color: 'bg-blue-600' },
        { text: 'Pequeno', icon: Target, speech: 'Pequeno', color: 'bg-blue-400' },
        { text: 'Alto', icon: Activity, speech: 'Alto', color: 'bg-green-600' },
        { text: 'Baixo', icon: Wind, speech: 'Baixo', color: 'bg-green-400' },
        { text: 'Rápido', icon: Move, speech: 'Rápido', color: 'bg-red-500' },
        { text: 'Devagar', icon: Wind, speech: 'Devagar', color: 'bg-orange-400' },
        { text: 'Quente', icon: AlertCircle, speech: 'Quente', color: 'bg-red-600' },
        { text: 'Frio', icon: Droplet, speech: 'Frio', color: 'bg-blue-500' },
        { text: 'Cheio', icon: Check, speech: 'Cheio', color: 'bg-purple-600' },
        { text: 'Vazio', icon: X, speech: 'Vazio', color: 'bg-gray-400' }
      ]
    },
    esportes: {
      items: [
        { text: 'Futebol', icon: Activity, speech: 'Futebol', color: 'bg-green-600' },
        { text: 'Basquete', icon: Activity, speech: 'Basquete', color: 'bg-orange-600' },
        { text: 'Vôlei', icon: Activity, speech: 'Vôlei', color: 'bg-blue-600' },
        { text: 'Natação', icon: Droplet, speech: 'Natação', color: 'bg-blue-400' },
        { text: 'Corrida', icon: Move, speech: 'Corrida', color: 'bg-red-500' },
        { text: 'Ciclismo', icon: Move, speech: 'Ciclismo', color: 'bg-green-500' },
        { text: 'Judô', icon: Activity, speech: 'Judô', color: 'bg-purple-600' },
        { text: 'Ginástica', icon: Activity, speech: 'Ginástica', color: 'bg-pink-600' }
      ]
    },
    cozinha: {
      items: [
        { text: 'Panela', icon: Utensils, speech: 'Panela', color: 'bg-gray-600' },
        { text: 'Prato', icon: Utensils, speech: 'Prato', color: 'bg-blue-400' },
        { text: 'Copo', icon: Droplet, speech: 'Copo', color: 'bg-blue-300' },
        { text: 'Garfo', icon: Utensils, speech: 'Garfo', color: 'bg-gray-500' },
        { text: 'Faca', icon: Utensils, speech: 'Faca', color: 'bg-gray-700' },
        { text: 'Colher', icon: Utensils, speech: 'Colher', color: 'bg-gray-400' },
        { text: 'Tigela', icon: Soup, speech: 'Tigela', color: 'bg-orange-400' },
        { text: 'Chaleira', icon: Droplet, speech: 'Chaleira', color: 'bg-red-500' }
      ]
    },
    vestuario: {
      items: [
        { text: 'Camisa', icon: User, speech: 'Camisa', color: 'bg-blue-500' },
        { text: 'Calça', icon: User, speech: 'Calça', color: 'bg-indigo-600' },
        { text: 'Vestido', icon: User, speech: 'Vestido', color: 'bg-pink-500' },
        { text: 'Sapato', icon: User, speech: 'Sapato', color: 'bg-brown-600' },
        { text: 'Meia', icon: User, speech: 'Meia', color: 'bg-gray-500' },
        { text: 'Casaco', icon: User, speech: 'Casaco', color: 'bg-red-600' },
        { text: 'Boné', icon: User, speech: 'Boné', color: 'bg-green-600' },
        { text: 'Pijama', icon: Bed, speech: 'Pijama', color: 'bg-purple-500' }
      ]
    },
    instrumentos: {
      items: [
        { text: 'Violão', icon: Music, speech: 'Violão', color: 'bg-brown-600' },
        { text: 'Piano', icon: Music, speech: 'Piano', color: 'bg-gray-800' },
        { text: 'Bateria', icon: Music, speech: 'Bateria', color: 'bg-gray-600' },
        { text: 'Flauta', icon: Music, speech: 'Flauta', color: 'bg-yellow-600' },
        { text: 'Violino', icon: Music, speech: 'Violino', color: 'bg-brown-700' },
        { text: 'Tambor', icon: Music, speech: 'Tambor', color: 'bg-red-600' },
        { text: 'Pandeiro', icon: Music, speech: 'Pandeiro', color: 'bg-orange-600' },
        { text: 'Xilofone', icon: Music, speech: 'Xilofone', color: 'bg-rainbow' }
      ]
    },
    atividades: {
      items: [
        { text: 'Desenhar', icon: Activity, speech: 'Quero desenhar', color: 'bg-pink-500' },
        { text: 'Ler', icon: GraduationCap, speech: 'Quero ler', color: 'bg-blue-600' },
        { text: 'Cantar', icon: Music, speech: 'Quero cantar', color: 'bg-purple-500' },
        { text: 'Dançar', icon: Activity, speech: 'Quero dançar', color: 'bg-pink-600' },
        { text: 'Correr', icon: Move, speech: 'Quero correr', color: 'bg-red-500' },
        { text: 'Pular', icon: Activity, speech: 'Quero pular', color: 'bg-green-500' },
        { text: 'Nadar', icon: Droplet, speech: 'Quero nadar', color: 'bg-blue-400' },
        { text: 'Cozinhar', icon: Utensils, speech: 'Quero cozinhar', color: 'bg-orange-600' }
      ]
    },
    cidades: {
      items: [
        { text: 'São Paulo', icon: Globe, speech: 'São Paulo', color: 'bg-gray-600' },
        { text: 'Rio de Janeiro', icon: Globe, speech: 'Rio de Janeiro', color: 'bg-blue-600' },
        { text: 'Brasília', icon: Globe, speech: 'Brasília', color: 'bg-green-600' },
        { text: 'Salvador', icon: Globe, speech: 'Salvador', color: 'bg-yellow-600' },
        { text: 'Fortaleza', icon: Globe, speech: 'Fortaleza', color: 'bg-blue-500' },
        { text: 'Belo Horizonte', icon: Globe, speech: 'Belo Horizonte', color: 'bg-orange-600' }
      ]
    },
    natal: {
      items: [
        { text: 'Papai Noel', icon: User, speech: 'Papai Noel', color: 'bg-red-600' },
        { text: 'Árvore de Natal', icon: TreePine, speech: 'Árvore de Natal', color: 'bg-green-600' },
        { text: 'Presente', icon: Target, speech: 'Presente', color: 'bg-red-500' },
        { text: 'Estrela', icon: Target, speech: 'Estrela', color: 'bg-yellow-500' },
        { text: 'Rena', icon: Dog, speech: 'Rena', color: 'bg-brown-600' },
        { text: 'Sino', icon: Music, speech: 'Sino', color: 'bg-yellow-600' },
        { text: 'Boneco de neve', icon: User, speech: 'Boneco de neve', color: 'bg-blue-100' },
        { text: 'Guirlanda', icon: TreePine, speech: 'Guirlanda', color: 'bg-green-500' }
      ]
    }
  };

  const currentPageId = navigationStack[navigationStack.length - 1].id;
  const currentPage = vocabulary[currentPageId as keyof typeof vocabulary];

  const navigateTo = (id: string, name: string) => {
    speak(name);
    setNavigationStack([...navigationStack, { id, name }]);
  };

  const navigateBack = () => {
    if (navigationStack.length > 1) {
      speak('Voltar');
      setNavigationStack(navigationStack.slice(0, -1));
    } else {
      speak('Voltando');
      onNavigate('home');
    }
  };

  const handleItemClick = (item: any) => {
    speak(item.speech);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200 text-gray-800">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 border-b border-blue-300/50 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            onClick={navigateBack}
            className="bg-blue-600/70 hover:bg-blue-600 text-white p-3 rounded-xl border border-blue-400/50 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          
          <h1 className={`${getTitleClass()} font-bold text-blue-800 text-center flex-1 px-4`}>
            {navigationStack[navigationStack.length - 1].name}
          </h1>
          
          <div className="w-14"></div>
        </div>

        {/* Breadcrumb */}
        {navigationStack.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            {navigationStack.map((item, index) => (
              <React.Fragment key={index}>
                <span className={`${getTextClass()} text-blue-700 font-medium`}>
                  {item.name}
                </span>
                {index < navigationStack.length - 1 && (
                  <span className="text-blue-500">›</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <p className={`${getTextClass()} text-center text-purple-700 mb-6`}>
          {currentPage && 'items' in currentPage ? 'Toque no cartão para falar 🗣️' : 'Escolha uma categoria 💬'}
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 max-w-7xl mx-auto overflow-x-auto pb-4">
          {currentPage && 'categories' in currentPage && currentPage.categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-all duration-300 border-2 bg-white/90 border-blue-300 hover:border-purple-400 hover:scale-105 hover:shadow-xl active:scale-95"
              onClick={() => navigateTo(category.id, category.name)}
            >
              <div className="p-4 sm:p-6 flex flex-col items-center text-center space-y-2 sm:space-y-3">
                <div className={`${category.color} p-3 sm:p-4 rounded-2xl shadow-lg`}>
                  <category.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <h3 className={`${getTextClass()} font-bold text-gray-800`}>
                  {category.name}
                </h3>
              </div>
            </Card>
          ))}

          {currentPage && 'items' in currentPage && currentPage.items.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 border-2 bg-white/90 border-blue-300 hover:border-purple-400 hover:scale-105 hover:shadow-xl active:scale-95"
              onClick={() => handleItemClick(item)}
            >
              <div className="p-4 sm:p-6 flex flex-col items-center text-center space-y-2 sm:space-y-3">
                <div className={`${item.color} p-3 sm:p-4 rounded-2xl shadow-lg`}>
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <h3 className={`${getTextClass()} font-bold text-gray-800`}>
                  {item.text}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PECSCommunicationScreen;
