import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PoliticaPrivacidade = () => {
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
          <h1 className="text-3xl font-bold mb-4 text-foreground">POLÍTICA DE PRIVACIDADE — ATIPICOSAPP</h1>
          <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>

          <div className="space-y-6 text-foreground">
            <p>
              A Política de Privacidade do ATIPICOSAPP descreve como coletamos, utilizamos, tratamos e protegemos dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Sobre o aplicativo</h2>
              <p>
                O ATIPICOSAPP é uma plataforma destinada a autistas, TDAH, famílias, cuidadores e PCD, oferecendo: comandos de voz, prevenção de crises, PECs e pictogramas, relatórios, cursos, jogos educativos, acesso a profissionais e comunidade exclusiva.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Dados coletados</h2>
              <p>Coletamos:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nome, e-mail e telefone</li>
                <li>Voz/áudio (comandos)</li>
                <li>Imagens e fotos (quando o usuário opta)</li>
                <li>Dados sensíveis (autismo, crises, terapias)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Finalidade</h2>
              <p>Usamos os dados para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Gerar relatórios</li>
                <li>Melhorar acessibilidade</li>
                <li>Personalizar experiência</li>
                <li>Ativar automações</li>
                <li>Permitir contato com profissionais, caso o usuário autorize</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Armazenamento</h2>
              <p>
                Os dados são armazenados com segurança em servidores protegidos, com criptografia e controle de acesso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Compartilhamento</h2>
              <p>
                Não compartilhamos dados com terceiros sem consentimento.<br />
                Usuários podem optar por enviar relatórios a profissionais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Direitos do usuário</h2>
              <p>O usuário pode solicitar:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Acesso</li>
                <li>Correção</li>
                <li>Exclusão total</li>
                <li>Exportação</li>
                <li>Revogação de consentimento</li>
                <li>Informações sobre tratamento</li>
              </ul>
              <p className="mt-3">
                <strong>Solicitações:</strong> atipicosapp@contato.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Assinaturas</h2>
              <p>
                O app oferece assinatura mensal, anual e teste grátis de 3 dias, com renovação automática.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Acessibilidade</h2>
              <p>
                O ATIPICOSAPP inclui: comandos de voz, texto-fala, botões grandes, contraste, navegação simplificada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Segurança</h2>
              <p>
                Adotamos criptografia, monitoramento e medidas técnicas para proteger dados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Alterações</h2>
              <p>
                A Política pode ser atualizada a qualquer momento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Controlador</h2>
              <p>
                <strong>Atipicosapp — CNPJ 63.603.066/0001-96</strong><br />
                Responsável: Marcos de Azevedo<br />
                Email: atipicosapp@contato.com<br />
                Endereço: Rua Águas Marinhas, 86 — Jardim Ipanema — São Bernardo do Campo — SP — CEP 09841-450
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
