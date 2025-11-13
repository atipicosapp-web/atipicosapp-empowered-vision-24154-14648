import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Brain,
  Heart,
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  Award,
  Shield,
  Smartphone,
  Watch,
  Tablet,
  Star,
  AlertCircle,
  GraduationCap,
  UserCheck,
  Gamepad2,
  Image as ImageIcon,
  Volume2,
  Download,
  Check,
  ChevronDown,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from '@/assets/logo-atipicos.jpg';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownload = async () => {
    try {
      // Verifica se o arquivo existe antes de tentar baixar
      const res = await fetch('/atipicos.apk', { method: 'HEAD' });
      if (!res.ok) {
        // Feedback amigável no caso de 404
        const { toast } = await import('@/components/ui/use-toast');
        toast({
          title: 'APK indisponível',
          description: 'Ainda não encontramos o arquivo atipicos.apk. Atualize a página após o upload ou tente novamente em alguns minutos.',
          variant: 'destructive',
        } as any);
        return;
      }

      // Dispara o download
      const link = document.createElement('a');
      link.href = '/atipicos.apk';
      link.download = 'Atipicos.apk';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      const { toast } = await import('@/components/ui/use-toast');
      toast({
        title: 'Falha no download',
        description: 'Ocorreu um erro ao iniciar o download no seu dispositivo.',
        variant: 'destructive',
      } as any);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AtípicosApp" className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--blue-medium))] to-[hsl(var(--magenta))] bg-clip-text text-transparent">
              AtípicosApp
            </span>
          </div>
          
          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('inicio')} className="text-sm hover:text-primary transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('funcionalidades')} className="text-sm hover:text-primary transition-colors">
              Funcionalidades
            </button>
            <button onClick={() => scrollToSection('acessibilidade')} className="text-sm hover:text-primary transition-colors">
              Acessibilidade
            </button>
            <button onClick={() => scrollToSection('beneficios')} className="text-sm hover:text-primary transition-colors">
              Benefícios
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-sm hover:text-primary transition-colors">
              Depoimentos
            </button>
            <Button onClick={handleDownload} className="bg-gradient-to-r from-[hsl(var(--blue-medium))] to-[hsl(var(--magenta))] hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              BAIXAR AGORA
            </Button>
          </nav>

          {/* Menu Mobile */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <ChevronDown className={`h-6 w-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('inicio')} className="text-left hover:text-primary transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection('funcionalidades')} className="text-left hover:text-primary transition-colors">
                Funcionalidades
              </button>
              <button onClick={() => scrollToSection('acessibilidade')} className="text-left hover:text-primary transition-colors">
                Acessibilidade
              </button>
              <button onClick={() => scrollToSection('beneficios')} className="text-left hover:text-primary transition-colors">
                Benefícios
              </button>
              <button onClick={() => scrollToSection('depoimentos')} className="text-left hover:text-primary transition-colors">
                Depoimentos
              </button>
              <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-[hsl(var(--blue-medium))] to-[hsl(var(--magenta))]">
                <Download className="mr-2 h-4 w-4" />
                BAIXAR AGORA
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 px-4 bg-gradient-to-b from-[hsl(var(--blue-light))] via-[hsl(var(--purple))] to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">Campeão de vendas nos EUA, Canadá e Portugal</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight max-w-prose">
                O aplicativo mais completo para Autistas, TDAH, PCD, Famílias e Cuidadores
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 max-w-prose">
                Comunicação, prevenção de crises, rotina visual, comunidade, jogos educativos e suporte profissional em um só lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={handleDownload} className="bg-white text-[hsl(var(--purple))] hover:bg-white/90 px-6 py-5">
                  <Download className="mr-2 h-4 w-4" />
                  BAIXAR AGORA
                </Button>
                <Button onClick={handleDownload} variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-6 py-5">
                  Teste Grátis 3 Dias
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>100% Acessível</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>IA Avançada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Teste Grátis</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <img src={logo} alt="AtípicosApp Interface" className="w-full rounded-2xl shadow-2xl" />
              </div>
              
              {/* Dispositivos Miniatura */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl z-20">
                <Tablet className="h-12 w-12 text-[hsl(var(--purple))]" />
                <p className="text-xs mt-2 font-medium">Tablet</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl z-20">
                <Watch className="h-12 w-12 text-[hsl(var(--magenta))]" />
                <p className="text-xs mt-2 font-medium">Smartwatch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o AtípicosApp */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">O que é o AtípicosApp?</h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            O <strong>AtípicosApp</strong> é mais do que um aplicativo — é uma ferramenta de transformação para famílias, cuidadores e pessoas com autismo, TDAH e outras necessidades especiais. Desenvolvido com amor e tecnologia de ponta, nosso app oferece suporte completo para comunicação, prevenção de crises, rotina visual e muito mais.
          </p>
        </div>
      </section>

      {/* Funcionalidades Principais */}
      <section id="funcionalidades" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Funcionalidades Principais</h2>
            <p className="text-base text-muted-foreground">
              Tudo que você precisa em um único aplicativo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-[hsl(var(--purple))] mb-4" />
                <CardTitle>Previsão de Crises</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sistema inteligente que monitora padrões e ajuda a prevenir crises antes que aconteçam.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-[hsl(var(--blue-medium))] mb-4" />
                <CardTitle>Cursos Exclusivos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Acesso a cursos especializados para desenvolvimento contínuo e aprendizado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-[hsl(var(--magenta))] mb-4" />
                <CardTitle>Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conecte-se com outras famílias e compartilhe experiências em um ambiente seguro.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <UserCheck className="h-12 w-12 text-[hsl(var(--purple))] mb-4" />
                <CardTitle>Acesso a Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conecte-se com fonoaudiólogos, psicólogos e outros profissionais especializados.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-[hsl(var(--blue-medium))] mb-4" />
                <CardTitle>Professora IA</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Assistente virtual inteligente para apoio educacional personalizado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-[hsl(var(--magenta))] mb-4" />
                <CardTitle>Terapeuta Virtual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Suporte terapêutico disponível 24/7 para momentos de necessidade.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-[hsl(var(--purple))] mb-4" />
                <CardTitle>Comunicação PECs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sistema completo de pictogramas para comunicação alternativa eficaz.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-[hsl(var(--blue-medium))] mb-4" />
                <CardTitle>Rotina Visual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Organize o dia com pictogramas visuais para melhor compreensão da rotina.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ImageIcon className="h-12 w-12 text-[hsl(var(--magenta))] mb-4" />
                <CardTitle>Leitura de Imagens</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tecnologia de voz que descreve imagens para melhor compreensão do ambiente.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-[hsl(var(--purple))] mb-4" />
                <CardTitle>Tela de Emoções</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Identifique e comunique emoções de forma visual e intuitiva.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Gamepad2 className="h-12 w-12 text-[hsl(var(--blue-medium))] mb-4" />
                <CardTitle>Jogos Educativos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Aprenda brincando com jogos desenvolvidos para estímulo cognitivo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-[hsl(var(--magenta))] mb-4" />
                <CardTitle>Preciso de Ajuda</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sistema de emergência rápido para situações que necessitam atenção imediata.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios Concretos */}
      <section id="beneficios" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Benefícios Concretos</h2>
            <p className="text-base text-muted-foreground">
              Resultados reais que transformam vidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--blue-medium))] to-[hsl(var(--purple))] rounded-full flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Redução de Crises</h3>
              <p className="text-muted-foreground">
                Monitore padrões e previna crises com alertas inteligentes e estratégias personalizadas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--purple))] to-[hsl(var(--magenta))] rounded-full flex items-center justify-center">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Melhora da Comunicação</h3>
              <p className="text-muted-foreground">
                PECs, pictogramas e comandos de voz facilitam a expressão e compreensão.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--magenta))] to-[hsl(var(--blue-medium))] rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Desenvolvimento Emocional</h3>
              <p className="text-muted-foreground">
                Tela de emoções e terapeuta virtual ajudam no reconhecimento e gestão emocional.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--blue-medium))] to-[hsl(var(--magenta))] rounded-full flex items-center justify-center">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Autonomia e Rotina</h3>
              <p className="text-muted-foreground">
                Rotina visual estruturada promove independência e reduz ansiedade.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--purple))] to-[hsl(var(--blue-medium))] rounded-full flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Apoio para Famílias</h3>
              <p className="text-muted-foreground">
                Comunidade, cursos e relatórios auxiliam toda a família no processo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--magenta))] to-[hsl(var(--purple))] rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Inclusão Social</h3>
              <p className="text-muted-foreground">
                Ferramentas de acessibilidade promovem participação ativa na sociedade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brindes de Assinatura */}
      <section className="py-16 px-4 bg-gradient-to-r from-[hsl(var(--blue-medium))] to-[hsl(var(--magenta))] text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <Award className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Assine e Ganhe Instantaneamente Smartwatch e Tablet!
          </h2>
          <p className="text-lg mb-12 text-white/90">
            Ao assinar nossos planos, você recebe automaticamente seus brindes
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Tablet className="h-24 w-24 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Tablet Premium</h3>
              <p className="text-white/80">
                Tablet de última geração para aproveitar ainda mais o app
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Watch className="h-24 w-24 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Smartwatch</h3>
              <p className="text-white/80">
                Smartwatch moderno para monitoramento em tempo real
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-white/70">
            * Sorteios realizados mensalmente entre assinantes ativos
          </p>
        </div>
      </section>

      {/* Acessibilidade */}
      <section id="acessibilidade" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 mx-auto mb-4 text-[hsl(var(--purple))]" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">100% Acessível</h2>
            <p className="text-base text-muted-foreground">
              Desenvolvido seguindo as melhores práticas de acessibilidade
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Normas WCAG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conformidade total com padrões internacionais de acessibilidade
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Comandos de Voz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Controle total do app usando apenas sua voz
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Leitura por Voz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Todo conteúdo pode ser ouvido em voz alta
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Navegação Simplificada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interface intuitiva e fácil de usar para todos
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Alto Contraste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Modos visuais adaptados para diferentes necessidades
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Estímulo Visual Suave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Design pensado para reduzir sobrecarga sensorial
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">O Que Dizem Nossos Usuários</h2>
            <p className="text-base text-muted-foreground">
              Histórias reais de transformação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--blue-medium))] to-[hsl(var(--purple))] flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <CardTitle className="text-lg">Maria Rosa</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  "O AtípicosApp mudou completamente a rotina do meu filho. Ele consegue se comunicar melhor e as crises diminuíram muito!"
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--purple))] to-[hsl(var(--magenta))] flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                  <div>
                    <CardTitle className="text-lg">João Silva</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  "Incrível! A função de previsão de crises me ajuda a estar sempre preparado. Recomendo para todas as famílias."
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--magenta))] to-[hsl(var(--blue-medium))] flex items-center justify-center text-white font-bold">
                    AC
                  </div>
                  <div>
                    <CardTitle className="text-lg">Ana Costa</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  "Os pictogramas são perfeitos! Minha filha finalmente consegue expressar o que sente. Estou muito feliz!"
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--blue-medium))] to-[hsl(var(--magenta))] flex items-center justify-center text-white font-bold">
                    PL
                  </div>
                  <div>
                    <CardTitle className="text-lg">Pedro Lima</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  "A comunidade do app é maravilhosa! Conheci outras famílias e trocamos muitas experiências valiosas."
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--purple))] to-[hsl(var(--blue-medium))] flex items-center justify-center text-white font-bold">
                    CF
                  </div>
                  <div>
                    <CardTitle className="text-lg">Carla Fernandes</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  "Os jogos educativos são divertidos e educativos. Meu filho aprende brincando e eu fico tranquila!"
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--magenta))] to-[hsl(var(--purple))] flex items-center justify-center text-white font-bold">
                    RS
                  </div>
                  <div>
                    <CardTitle className="text-lg">Roberto Santos</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  "Excelente app! O acesso a profissionais especializados fez toda a diferença no desenvolvimento do meu sobrinho."
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-base text-muted-foreground">
              Tire suas dúvidas sobre o AtípicosApp
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Meus dados estão seguros?</AccordionTrigger>
              <AccordionContent>
                Sim! Utilizamos criptografia de ponta a ponta e seguimos rigorosamente a LGPD. Seus dados são armazenados com segurança e você tem total controle sobre eles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Tenho controle sobre o que compartilho?</AccordionTrigger>
              <AccordionContent>
                Totalmente! Você decide o que compartilhar e com quem. Os relatórios só são enviados a profissionais com sua autorização expressa.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Como funciona o teste grátis?</AccordionTrigger>
              <AccordionContent>
                Oferecemos 3 dias de teste grátis com acesso completo a todas as funcionalidades. Após o período, você pode escolher um dos nossos planos de assinatura.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Como faço para baixar sem Google Play?</AccordionTrigger>
              <AccordionContent>
                Basta clicar no botão "BAIXAR AGORA" em nosso site. O APK será baixado diretamente no seu celular e você poderá instalá-lo manualmente.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>O app funciona em todos os celulares?</AccordionTrigger>
              <AccordionContent>
                Sim! O AtípicosApp é compatível com a maioria dos smartphones Android. Também oferecemos suporte para tablets e smartwatches.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Posso cancelar a assinatura a qualquer momento?</AccordionTrigger>
              <AccordionContent>
                Sim, você pode cancelar sua assinatura a qualquer momento através do próprio aplicativo, sem burocracia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-[hsl(var(--blue-medium))] via-[hsl(var(--purple))] to-[hsl(var(--magenta))] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Pronto para transformar a rotina e comunicação da sua família?
          </h2>
          <p className="text-lg mb-10 text-white/90">
            Junte-se a milhares de famílias que já descobriram o poder do AtípicosApp
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownload} className="bg-white text-[hsl(var(--purple))] hover:bg-white/90 px-8 py-6">
              <Download className="mr-2 h-5 w-5" />
              BAIXAR AGORA
            </Button>
            <Button onClick={handleDownload} variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6">
              Teste Grátis 3 Dias
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/70">
            Download direto do APK • Sem necessidade de Google Play
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="AtípicosApp" className="h-10 w-10 rounded-lg" />
                <span className="text-lg font-bold">AtípicosApp</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A plataforma completa para autistas, TDAH, PCD, famílias e cuidadores.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Informações Legais</h3>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/politica-privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Privacidade
                </Link>
                <Link to="/termos-uso" className="text-muted-foreground hover:text-foreground transition-colors">
                  Termos de Uso
                </Link>
                <Link to="/lgpd" className="text-muted-foreground hover:text-foreground transition-colors">
                  LGPD
                </Link>
                <Link to="/acessibilidade" className="text-muted-foreground hover:text-foreground transition-colors">
                  Acessibilidade
                </Link>
                <Link to="/ouvidoria" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ouvidoria
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>CNPJ:</strong> 63.603.066/0001-96</p>
                <p><strong>Email:</strong> atipicosapp@contato.com</p>
                <p>
                  <strong>Endereço:</strong><br />
                  Rua Águas Marinhas, 86<br />
                  Jardim Ipanema<br />
                  São Bernardo do Campo - SP<br />
                  CEP 09841-450
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 AtípicosApp. Todos os direitos reservados.</p>
            <p className="mt-2">Desenvolvido com ❤️ por Marcos de Azevedo</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
