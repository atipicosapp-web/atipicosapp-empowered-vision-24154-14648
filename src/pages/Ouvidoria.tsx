import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Ouvidoria = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="bg-card rounded-lg p-6 md:p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-foreground">CANAL DE OUVIDORIA, RECLAMAÇÕES E DENÚNCIAS — ATIPICOSAPP</h1>
          <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>

          <div className="space-y-6 text-foreground">
            <p>
              O ATIPICOSAPP disponibiliza um canal exclusivo para:
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Tipos de solicitação</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Denúncias</li>
                <li>Reclamações</li>
                <li>Abuso na comunidade</li>
                <li>Violação de privacidade</li>
                <li>Uso inadequado</li>
                <li>Solicitações de LGPD</li>
                <li>Questões de acessibilidade</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Como enviar</h2>
              <p className="text-lg">
                📩 <strong>Email:</strong> atipicosapp@contato.com
              </p>
              <p className="text-lg mt-2">
                ⏳ <strong>Prazo de resposta:</strong> até 7 dias úteis
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Funcionamento</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Toda denúncia recebe protocolo</li>
                <li>Informações são mantidas em sigilo</li>
                <li>Conteúdos ofensivos são analisados e podem ser removidos</li>
                <li>Medidas podem incluir bloqueio, suspensão ou investigação interna</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ouvidoria;
