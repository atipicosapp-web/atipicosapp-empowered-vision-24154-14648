import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TermosUso = () => {
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
          <h1 className="text-3xl font-bold mb-4 text-foreground">TERMOS DE USO — ATIPICOSAPP</h1>
          <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Aceitação</h2>
              <p>
                Ao utilizar o ATIPICOSAPP, o usuário concorda com este documento e com a Política de Privacidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Objetivo</h2>
              <p>
                O app oferece conteúdo de apoio a autistas, TDAH, PCD, familiares e cuidadores.<br />
                Inclui: comandos de voz, PECs, prevenção de crises, relatórios, cursos, jogos e comunidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Cadastro</h2>
              <p>
                Exige nome, email e telefone verídicos.<br />
                O usuário é responsável pela confidencialidade do acesso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Uso proibido</h2>
              <p>É proibido:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Uso ilegal</li>
                <li>Conteúdo ofensivo</li>
                <li>Ameaças e discriminação</li>
                <li>Compartilhar dados de terceiros</li>
                <li>Manipular relatórios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Dados pessoais</h2>
              <p>
                Tratamento conforme Política de Privacidade e LGPD.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Assinaturas</h2>
              <p>O app oferece:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Assinatura mensal</li>
                <li>Assinatura anual</li>
                <li>Teste grátis de 3 dias</li>
                <li>Renovação automática</li>
              </ul>
              <p className="mt-3">
                Cancelamentos devem ser feitos pelo app.<br />
                Valores pagos não são reembolsáveis, exceto quando previsto em lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Comunidade</h2>
              <p>
                Comentários ofensivos ou discriminatórios poderão ser removidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Conexão com profissionais</h2>
              <p>
                Relatórios só são enviados a profissionais mediante autorização.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Limitação de responsabilidade</h2>
              <p>
                O app não substitui serviço médico, psiquiátrico ou terapêutico profissional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Suspensão</h2>
              <p>
                O ATIPICOSAPP pode suspender contas que violem regras.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Contato</h2>
              <p>
                Email de suporte: atipicosapp@contato.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Controlador</h2>
              <p>
                <strong>Atipicosapp — CNPJ 63.603.066/0001-96</strong><br />
                Marcos de Azevedo
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermosUso;
