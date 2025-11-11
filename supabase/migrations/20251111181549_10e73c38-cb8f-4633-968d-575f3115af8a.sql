-- Tabela de rotinas da família
CREATE TABLE public.family_routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  time TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de progresso da família
CREATE TABLE public.family_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  communication_progress INTEGER DEFAULT 0,
  emotions_progress INTEGER DEFAULT 0,
  routine_progress INTEGER DEFAULT 0,
  ai_teacher_progress INTEGER DEFAULT 0,
  total_percentage INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de relatórios da família
CREATE TABLE public.family_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de conquistas da família
CREATE TABLE public.family_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de conexão com escola
CREATE TABLE public.school_connection (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  school_name TEXT,
  teacher_name TEXT,
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de dados do Mundo Atípicos
CREATE TABLE public.mundo_atipicos_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  coins INTEGER DEFAULT 0,
  pieces INTEGER DEFAULT 0,
  selected_skin INTEGER DEFAULT 0,
  selected_hair INTEGER DEFAULT 0,
  selected_clothes INTEGER DEFAULT 0,
  selected_accessories INTEGER DEFAULT 0,
  selected_expression INTEGER DEFAULT 0,
  unlocked_rewards JSONB DEFAULT '[]'::jsonb,
  game_scores JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.family_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_connection ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mundo_atipicos_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies para family_routines
CREATE POLICY "Usuários podem ver suas próprias rotinas"
  ON public.family_routines FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias rotinas"
  ON public.family_routines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias rotinas"
  ON public.family_routines FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias rotinas"
  ON public.family_routines FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies para family_progress
CREATE POLICY "Usuários podem ver seu próprio progresso"
  ON public.family_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seu próprio progresso"
  ON public.family_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio progresso"
  ON public.family_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies para family_reports
CREATE POLICY "Usuários podem ver seus próprios relatórios"
  ON public.family_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios relatórios"
  ON public.family_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios relatórios"
  ON public.family_reports FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies para family_achievements
CREATE POLICY "Usuários podem ver suas próprias conquistas"
  ON public.family_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias conquistas"
  ON public.family_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies para school_connection
CREATE POLICY "Usuários podem ver sua própria conexão escolar"
  ON public.school_connection FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar sua própria conexão escolar"
  ON public.school_connection FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar sua própria conexão escolar"
  ON public.school_connection FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies para mundo_atipicos_data
CREATE POLICY "Usuários podem ver seus próprios dados do Mundo Atípicos"
  ON public.mundo_atipicos_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios dados do Mundo Atípicos"
  ON public.mundo_atipicos_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios dados do Mundo Atípicos"
  ON public.mundo_atipicos_data FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_family_routines_updated_at
  BEFORE UPDATE ON public.family_routines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_school_connection_updated_at
  BEFORE UPDATE ON public.school_connection
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mundo_atipicos_data_updated_at
  BEFORE UPDATE ON public.mundo_atipicos_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();