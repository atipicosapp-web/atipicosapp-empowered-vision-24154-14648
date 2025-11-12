import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { z } from 'zod';

interface AuthScreenProps {
  onNavigate: (page: string) => void;
  voiceSpeed: string;
}

const authSchema = z.object({
  email: z.string().email('Email inválido').max(255, 'Email muito longo'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(100, 'Senha muito longa'),
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo').optional(),
});

const AuthScreen = ({ onNavigate, voiceSpeed }: AuthScreenProps) => {
  const { language, t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const validation = authSchema.safeParse({
        email: email.trim(),
        password,
        name: isSignUp ? name.trim() : undefined,
      });

      if (!validation.success) {
        const errorMessage = validation.error.errors[0].message;
        toast.error(errorMessage);
        speak(errorMessage);
        setLoading(false);
        return;
      }

      if (isSignUp) {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email: validation.data.email,
          password: validation.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name: validation.data.name || '',
            }
          }
        });

        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Este email já está cadastrado. Faça login.');
            speak('Este email já está cadastrado.');
          } else {
            toast.error(error.message);
            speak('Erro ao criar conta.');
          }
        } else {
          toast.success('Conta criada com sucesso! Você já pode usar o aplicativo.');
          speak('Conta criada com sucesso!');
          onNavigate('home');
        }
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email: validation.data.email,
          password: validation.data.password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Email ou senha incorretos.');
            speak('Email ou senha incorretos.');
          } else {
            toast.error(error.message);
            speak('Erro ao fazer login.');
          }
        } else {
          toast.success('Login realizado com sucesso!');
          speak('Bem-vindo de volta!');
          onNavigate('home');
        }
      }
    } catch (error: any) {
      toast.error('Erro ao processar autenticação.');
      speak('Erro ao processar autenticação.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast.error('Erro ao fazer login com Google.');
        speak('Erro ao fazer login com Google.');
      }
    } catch (error: any) {
      toast.error('Erro ao processar autenticação com Google.');
      speak('Erro ao processar autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'var(--welcome-gradient)' }}>
      <header className="relative p-4 sm:p-6 lg:p-8 text-center border-b-2 border-white/20">
        <div className="absolute top-4 left-4">
          <Button
            onClick={() => onNavigate('welcome')}
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
          {isSignUp ? 'Criar Conta' : 'Entrar'}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/90 drop-shadow">
          {isSignUp ? 'Crie sua conta para salvar seu progresso' : 'Entre com sua conta para continuar'}
        </p>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm sm:text-base font-medium mb-2 block">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => speak('Digite seu nome')}
                      className="bg-card border-2 border-primary text-card-foreground text-base sm:text-lg p-3 sm:p-4 rounded-xl"
                      placeholder="Seu nome"
                      required={isSignUp}
                      maxLength={100}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-foreground text-sm sm:text-base font-medium mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => speak('Digite seu email')}
                    className="bg-card border-2 border-primary text-card-foreground text-base sm:text-lg p-3 sm:p-4 rounded-xl"
                    placeholder="seu@email.com"
                    required
                    maxLength={255}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-foreground text-sm sm:text-base font-medium mb-2 block">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => speak('Digite sua senha')}
                    className="bg-card border-2 border-primary text-card-foreground text-base sm:text-lg p-3 sm:p-4 rounded-xl"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    maxLength={100}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground py-3 px-4 rounded-xl font-medium text-lg disabled:opacity-50"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {loading ? 'Processando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-3 px-4 rounded-xl font-medium text-lg"
              >
                <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
                Continuar com Google
              </Button>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    speak(isSignUp ? 'Fazer login' : 'Criar conta');
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {isSignUp ? 'Já tem uma conta? Entrar' : 'Não tem conta? Criar agora'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
