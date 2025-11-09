import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

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
  const [routines, setRoutines] = useState<Routine[]>([
    { id: '1', name: 'Escovar os dentes', type: 'hygiene', time: '07:00', completed: false },
    { id: '2', name: 'Café da manhã', type: 'food', time: '07:30', completed: false },
    { id: '3', name: 'Ir para escola', type: 'school', time: '08:00', completed: false },
  ]);
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

  const handleToggleComplete = (id: string) => {
    setRoutines(routines.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
    const routine = routines.find(r => r.id === id);
    if (routine && !routine.completed) {
      speak(t('family.routines.completed'));
      toast.success(t('family.routines.completed'));
    }
  };

  const handleAddRoutine = () => {
    if (!newRoutine.name || !newRoutine.time) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    const routine: Routine = {
      id: Date.now().toString(),
      ...newRoutine,
      completed: false
    };
    setRoutines([...routines, routine]);
    setNewRoutine({ name: '', type: 'hygiene', time: '' });
    setShowAddForm(false);
    speak(`Nova rotina adicionada: ${routine.name}`);
    toast.success('Rotina adicionada com sucesso!');
  };

  const handleDeleteRoutine = (id: string) => {
    setRoutines(routines.filter(r => r.id !== id));
    speak('Rotina excluída');
    toast.success('Rotina excluída!');
  };

  useEffect(() => {
    speak(t('family.routines.title'));
  }, []);

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
          {routines.map((routine) => (
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
          ))}
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
      </div>
    </div>
  );
};

export default FamilyRoutinesScreen;
