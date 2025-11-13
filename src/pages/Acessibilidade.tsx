import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Acessibilidade = () => {
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
          <h1 className="text-3xl font-bold mb-4 text-foreground">POLÍTICA DE ACESSIBILIDADE — ATIPICOSAPP</h1>
          <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>

          <div className="space-y-6 text-foreground">
            <p>
              O ATIPICOSAPP se compromete a oferecer uma experiência acessível para autistas, TDAH, PCD, familiares e cuidadores.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Recursos oferecidos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comandos de voz</li>
                <li>Texto para fala</li>
                <li>Botões grandes</li>
                <li>Interface simplificada</li>
                <li>Modo de alto contraste</li>
                <li>Sistema de PECs e pictogramas</li>
                <li>Organização visual clara</li>
                <li>Redução de sobrecarga sensorial</li>
                <li>Navegação para pessoas com limitações motoras</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Nosso compromisso</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Melhorar continuamente a acessibilidade</li>
                <li>Atender solicitações enviadas ao canal oficial</li>
                <li>Promover inclusão e autonomia</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contato de acessibilidade</h2>
              <p>
                Email: atipicosapp@contato.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acessibilidade;
