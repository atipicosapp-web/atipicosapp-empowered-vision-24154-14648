import React, { useState, useEffect } from 'react';
import { ArrowLeft, School, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

const schoolInfoSchema = z.object({
  schoolName: z.string().trim().max(100, "Nome da escola muito longo").optional(),
  teacherName: z.string().trim().max(100, "Nome do professor muito longo").optional(),
  observations: z.string().trim().max(2000, "Observações muito longas").optional(),
});

interface FamilySchoolScreenProps {
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
  userName?: string;
}

const FamilySchoolScreen = ({ onNavigate, textSize, voiceSpeed, userName }: FamilySchoolScreenProps) => {
  const { t, language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: '',
    teacherName: '',
    observations: ''
  });

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

  // Fetch school connection data from database
  useEffect(() => {
    const fetchSchoolInfo = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('school_connection')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setConnectionId(data.id);
          setSchoolInfo({
            schoolName: data.school_name || '',
            teacherName: data.teacher_name || '',
            observations: data.observations || ''
          });
        }
      } catch (error) {
        console.error('Error fetching school info:', error);
        toast.error('Erro ao carregar informações da escola');
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolInfo();
  }, [user]);

  const handleSaveInfo = async () => {
    if (!user) {
      toast.error('Você precisa estar autenticado');
      return;
    }

    try {
      setSaving(true);
      // Validate input
      const validatedData = schoolInfoSchema.parse(schoolInfo);

      if (connectionId) {
        // Update existing record
        const { error } = await supabase
          .from('school_connection')
          .update({
            school_name: validatedData.schoolName || null,
            teacher_name: validatedData.teacherName || null,
            observations: validatedData.observations || null,
          })
          .eq('id', connectionId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('school_connection')
          .insert({
            user_id: user.id,
            school_name: validatedData.schoolName || null,
            teacher_name: validatedData.teacherName || null,
            observations: validatedData.observations || null,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) setConnectionId(data.id);
      }

      speak(t('family.school.save'));
      toast.success('Informações salvas com sucesso!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error('Error saving school info:', error);
        toast.error('Erro ao salvar informações');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSendReport = () => {
    speak(t('family.school.sendReport'));
    toast.success('Relatório enviado para a escola! (Em desenvolvimento)');
  };

  useEffect(() => {
    if (!authLoading) {
      speak(t('family.school.title'));
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
            {t('family.school.title')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Loading State */}
        {loading ? (
          <Card className="border bg-white/70 border-blue-300">
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mr-3" />
              <span className={getTextClass()}>Carregando informações...</span>
            </div>
          </Card>
        ) : (
          <>
            {/* Coming Soon Banner */}
            <Card className="border bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300">
              <div className="p-6 text-center">
                <School className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <p className={`${getTextClass()} font-bold text-purple-700`}>
                  {t('family.school.comingSoon')}
                </p>
              </div>
            </Card>

            {/* School Information Form */}
            <Card className="border bg-white/70 border-blue-300">
              <div className="p-6 space-y-4">
                <h2 className={`${getTextClass()} font-bold text-purple-700 mb-4`}>
                  {t('family.school.title')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label>{t('family.school.schoolName')}</Label>
                    <Input
                      value={schoolInfo.schoolName}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, schoolName: e.target.value })}
                      placeholder={t('family.school.schoolName')}
                      maxLength={100}
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <Label>{t('family.school.teacherName')}</Label>
                    <Input
                      value={schoolInfo.teacherName}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, teacherName: e.target.value })}
                      placeholder={t('family.school.teacherName')}
                      maxLength={100}
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <Label>{t('family.school.observations')}</Label>
                    <Textarea
                      value={schoolInfo.observations}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, observations: e.target.value })}
                      placeholder={t('family.school.observations')}
                      rows={4}
                      maxLength={2000}
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {schoolInfo.observations.length}/2000 caracteres
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleSaveInfo}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      t('family.school.save')
                    )}
                  </Button>
                  <Button
                    onClick={handleSendReport}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={saving}
                  >
                    <Send className="mr-2" />
                    {t('family.school.sendReport')}
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default FamilySchoolScreen;
