import { trackPhoneConversion } from "@/lib/tracking";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A141E] text-white/60 py-16 border-t border-white/10 font-sans text-sm">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div>
            <span className="font-heading font-bold text-xl text-white block mb-3">
              CONSERTO EXPRESS<span className="text-[#00A843]">.</span>
            </span>
            <p className="text-white/60 leading-relaxed text-sm max-w-[260px] mb-4">
              Assistência técnica e manutenção especializada em geladeiras, freezers, máquinas de lavar, lava e seca, bebedouros e purificadores em Poços de Caldas.
            </p>
            <div className="font-mono text-xs text-[#00A843]">
              90 dias de garantia por escrito
            </div>
          </div>

          {/* Col 2: Serviços */}
          <div>
            <div className="font-heading font-semibold text-white text-base mb-4">
              Especialidades
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Geladeiras & Freezers
                </a>
              </li>
              <li>
                <a href="/lavadoras" className="hover:text-white transition-colors">
                  Máquinas de Lavar & Lava e Seca
                </a>
              </li>
              <li>
                <a href="/bebedouros-e-purificadores" className="hover:text-white transition-colors">
                  Bebedouros & Purificadores
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Loja Física */}
          <div>
            <div className="font-heading font-semibold text-white text-base mb-4">
              Loja Física & Atendimento
            </div>
            <div className="space-y-2 text-xs text-white/50 leading-relaxed">
              <p className="text-white/70 font-medium">Conserto Express Poços de Caldas</p>
              <p>Rua Cel. Virgílio Silva, 1374</p>
              <p>Poços de Caldas — MG</p>
              <p className="pt-2">Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h</p>
            </div>
          </div>

          {/* Col 4: Contato Direto */}
          <div>
            <div className="font-heading font-semibold text-white text-base mb-4">
              Contato Direto
            </div>
            <div className="space-y-2">
              <a
                href="tel:+553520390020"
                onClick={trackPhoneConversion}
                className="font-mono text-sm text-white hover:text-[#00A843] block transition-colors"
              >
                (35) 2039-0020
              </a>
              <div className="font-mono text-xs text-white/50">
                WhatsApp: (35) 99958-7801
              </div>
              <div className="text-xs text-white/50 pt-1">
                Atendimento em domicílio em todos os bairros
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © {currentYear} Conserto Express. Todos os direitos reservados.
          </div>
          <div>
            Poços de Caldas / MG • CNPJ & Inscrição Municipal
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
