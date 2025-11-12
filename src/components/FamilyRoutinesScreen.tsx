import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

const routineSchema = z.object({
  name: z.string().trim().min(1, "Nome da rotina é obrigatório").max(200, "Nome muito longo"),
  type: z.string().trim().min(1, "Tipo é obrigatório"),
  time: z.string().trim().min(1, "Horário é obrigatório").max(20, "Horário inválido"),
});

interface Routine {
  id: string;
  name: string;
  type: string;
  time: string;
  completed: boolean;
}

interface FamilyRoutinesScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FamilyRoutinesScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FamilyRoutinesScreenProps) => {
  const { t, language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoutine, setNewRoutine] = useState({ name: '', type: 'hygiene', time: '' });

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'pt-BR' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES';
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getTextClass = () => {
    const baseSize = 'text-sm sm:text-base';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-base`;
      case 'medium': return `${baseSize} lg:text-lg`;
      case 'large': return `${baseSize} lg:text-xl`;
      case 'gigante': return `${baseSize} lg:text-2xl`;
      default: return `${baseSize} lg:text-lg`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-xl sm:text-2xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-2xl`;
      case 'medium': return `${baseSize} lg:text-3xl`;
      case 'large': return `${baseSize} lg:text-4xl`;
      case 'gigante': return `${baseSize} lg:text-5xl`;
      default: return `${baseSize} lg:text-3xl`;
    }
  };

  const routineTypes = ['hygiene', 'food', 'school', 'communication', 'exercise', 'leisure'];

  const completionRate = Math.round((routines.filter(r => r.completed).length / routines.length) * 100) || 0;

  // Fetch routines from database
  useEffect(() => {
    const fetchRoutines = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('family_routines')
          .select('*')
          .eq('user_id', user.id)
          .order('time', { ascending: true });

        if (error) throw error;

        if (data) {
          setRoutines(
            data.map((routine) => ({
              id: routine.id,
              name: routine.name,
              type: routine.type,
              time: routine.time,
              completed: routine.completed || false,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching routines:', error);
        toast.error('Erro ao carregar rotinas');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [user]);

  const handleToggleComplete = async (id: string) => {
    if (!user) return;

    const routine = routines.find((r) => r.id === id);
    if (!routine) return;

    const newCompletedState = !routine.completed;

    // Optimistic update
    setRoutines(
      routines.map((r) =>
        r.id === id ? { ...r, completed: newCompletedState } : r
      )
    );

    try {
      const { error } = await supabase
        .from('family_routines')
        .update({ completed: newCompletedState })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      if (newCompletedState) {
        speak(t('family.routines.completed'));
        toast.success(t('family.routines.completed'));
      }
    } catch (error) {
      console.error('Error updating routine:', error);
      toast.error('Erro ao atualizar rotina');
      // Revert optimistic update
      setRoutines(
        routines.map((r) =>
          r.id === id ? { ...r, completed: !newCompletedState } : r
        )
      );
    }
  };

  const handleAddRoutine = async () => {
    if (!user) {
      toast.error('Você precisa estar autenticado');
      return;
    }

    try {
      // Validate input
      const validatedData = routineSchema.parse(newRoutine);

      const { data, error } = await supabase
        .from('family_routines')
        .insert({
          user_id: user.id,
          name: validatedData.name,
          type: validatedData.type,
          time: validatedData.time,
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setRoutines([
          ...routines,
          {
            id: data.id,
            name: data.name,
            type: data.type,
            time: data.time,
            completed: data.completed || false,
          },
        ]);
        setNewRoutine({ name: '', type: 'hygiene', time: '' });
        setShowAddForm(false);
        speak(`Nova rotina adicionada: ${data.name}`);
        toast.success('Rotina adicionada com sucesso!');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error('Error adding routine:', error);
        toast.error('Erro ao adicionar rotina');
      }
    }
  };

  const handleDeleteRoutine = async (id: string) => {
    if (!user) return;

    // Optimistic update
    const routineToDelete = routines.find((r) => r.id === id);
    setRoutines(routines.filter((routine) => routine.id !== id));

    try {
      const { error } = await supabase
        .from('family_routines')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      speak('Rotina excluída');
      toast.success('Rotina excluída!');
    } catch (error) {
      console.error('Error deleting routine:', error);
      toast.error('Erro ao remover rotina');
      // Revert optimistic update
      if (routineToDelete) {
        setRoutines([...routines, routineToDelete]);
      }
    }
  };

  useEffect(() => {
    if (!authLoading) {
      speak(t('family.routines.title'));
    }
  }, [authLoading]);

  // Authentication check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-md text-center border bg-white/70 border-purple-300">
          <p className="text-lg mb-4">Você precisa estar autenticado para acessar esta área</p>
          <Button onClick={() => onNavigate('auth')} className="bg-purple-600 hover:bg-purple-700">
            Fazer Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Header */}
      <header className="p-4 sm:p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            onClick={() => {
              speak(t('family.back'));
              onNavigate('family-area');
            }}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2" />
            {t('family.back')}
          </Button>
        </div>
        <div className="text-center mt-4">
          <h1 className={`${getTitleClass()} font-bold`}>
            {t('family.routines.title')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Loading State */}
        {loading ? (
          <Card className="border bg-white/70 border-purple-300">
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mr-3" />
              <span className={getTextClass()}>Carregando rotinas...</span>
            </div>
          </Card>
        ) : (
          <>
            {/* Completion Rate */}
            <Card className="border bg-white/70 border-purple-300">
              <div className="p-6">
                <h2 className={`${getTextClass()} font-bold text-purple-700 mb-2`}>
                  {t('family.routines.completionRate')}: {completionRate}%
                </h2>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Routines List */}
            <div className="space-y-3">
              {routines.length === 0 ? (
                <Card className="border bg-white/70 border-purple-300">
                  <div className="p-8 text-center text-gray-600">
                    <p className={getTextClass()}>
                      Nenhuma rotina cadastrada ainda. Clique em "Adicionar Rotina" para começar!
                    </p>
                  </div>
                </Card>
              ) : (
                routines.map((routine) => (
            <Card key={routine.id} className="border bg-white/70 border-blue-300">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Checkbox
                    checked={routine.completed}
                    onCheckedChange={() => handleToggleComplete(routine.id)}
                    className="w-6 h-6"
                  />
                  <div className="flex-1">
                    <h3 className={`${getTextClass()} font-bold ${routine.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {routine.name}
                    </h3>
                    <p className={`text-sm text-gray-600`}>
                      {t(`family.routines.types.${routine.type}`)} - {routine.time}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRoutine(routine.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
                </Card>
              ))
            )}
            </div>

            {/* Add Routine Button/Form */}
        {!showAddForm ? (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
          >
            <Plus className="mr-2" />
            {t('family.routines.add')}
          </Button>
        ) : (
          <Card className="border bg-white/70 border-purple-300">
            <div className="p-6 space-y-4">
              <h3 className={`${getTextClass()} font-bold text-purple-700`}>
                {t('family.routines.add')}
              </h3>
              <div className="space-y-3">
                <div>
                  <Label>{t('family.routines.name')}</Label>
                  <Input
                    value={newRoutine.name}
                    onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                    placeholder={t('family.routines.name')}
                  />
                </div>
                <div>
                  <Label>{t('family.routines.type')}</Label>
                  <Select
                    value={newRoutine.type}
                    onValueChange={(value) => setNewRoutine({ ...newRoutine, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {routineTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {t(`family.routines.types.${type}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('family.routines.time')}</Label>
                  <Input
                    type="time"
                    value={newRoutine.time}
                    onChange={(e) => setNewRoutine({ ...newRoutine, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddRoutine}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {t('family.routines.save')}
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewRoutine({ name: '', type: 'hygiene', time: '' });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  {t('family.routines.cancel')}
                </Button>
              </div>
            </div>
            </Card>
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyRoutinesScreen;
