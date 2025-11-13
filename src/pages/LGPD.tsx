import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LGPD = () => {
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
          <h1 className="text-3xl font-bold mb-4 text-foreground">DOCUMENTO DE CONFORMIDADE LGPD — ATIPICOSAPP</h1>
          <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Encarregado de Dados (DPO)</h2>
              <p>
                <strong>Marcos de Azevedo</strong> — atipicosapp@contato.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Tipos de dados tratados</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Dados cadastrais: nome, email, telefone</li>
                <li>Dados sensíveis: autismo, crises, terapias</li>
                <li>Voz/áudio</li>
                <li>Imagens/fotos</li>
                <li>Dados técnicos do dispositivo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Bases legais utilizadas</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Consentimento</li>
                <li>Execução de contrato</li>
                <li>Proteção da saúde</li>
                <li>Legítimo interesse</li>
                <li>Segurança do usuário</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Finalidade</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Geração de relatórios</li>
                <li>Personalização</li>
                <li>Prevenção de crises</li>
                <li>Melhorias técnicas</li>
                <li>Comunicação com profissionais (opcional)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Retenção</h2>
              <p>
                Dados ficam armazenados até o usuário solicitar exclusão.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Armazenamento</h2>
              <p>
                Serviço: Sistema seguro com criptografia e padrões de segurança.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Compartilhamento</h2>
              <p>
                Apenas quando o usuário optar por enviar relatórios a profissionais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Direitos garantidos</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Confirmar tratamento</li>
                <li>Acessar dados</li>
                <li>Corrigir dados</li>
                <li>Revogar consentimento</li>
                <li>Excluir dados</li>
                <li>Exportar dados</li>
                <li>Reclamar à ANPD</li>
              </ul>
              <p className="mt-3">
                <strong>Solicitações:</strong> atipicosapp@contato.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Segurança</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Criptografia</li>
                <li>Logs de acesso</li>
                <li>Autenticação segura</li>
                <li>Restrições de permissão</li>
                <li>Monitoramento</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGPD;
