import { ArrowRight, Refrigerator, Disc3, Droplets } from "lucide-react";
import { trackWhatsAppConversion } from "@/lib/tracking";

const services = [
  {
    id: "geladeiras",
    kicker: "01 — Refrigeração Doméstica & Residencial",
    title: "Conserto de Geladeiras & Freezers",
    route: "/",
    whatsappRef: "Olá, preciso de conserto na minha geladeira (Ref: #geladeira-pocos)",
    icon: Refrigerator,
    slotText: "frost free · duplex · side by side · inverse",
    desc: "Não gela, congela alimentos embaixo, não liga ou apresenta vazamento de gás. Diagnóstico preciso no seu endereço com peças originais e 90 dias de garantia.",
    tags: ["Frost Free", "Carga de Gás", "Troca de Motor", "Sensor & Degelo"],
  },
  {
    id: "lavadoras",
    kicker: "02 — Lavagem & Centrifugação",
    title: "Máquinas de Lavar & Lava e Seca",
    route: "/lavadoras",
    whatsappRef: "Olá, preciso de conserto na minha lavadora (Ref: #lavadora-pocos)",
    icon: Disc3,
    slotText: "automáticas · front load · lava e seca",
    desc: "Não esvazia a água, barulho forte na centrifugação, não gira o tambor ou trava o ciclo. Manutenção rápida com peças de alta durabilidade.",
    tags: ["Lava e Seca", "Bomba de Drenagem", "Rolamento", "Placas"],
  },
  {
    id: "bebedouros",
    kicker: "03 — Água Gelada & Pura",
    title: "Bebedouros & Purificadores",
    route: "/bebedouros-e-purificadores",
    whatsappRef: "Olá, gostaria de orçamento para conserto de purificador/bebedouro (Ref: #purificador-pocos)",
    icon: Droplets,
    slotText: "residencial · comercial · empresas",
    desc: "Não gela a água, pinga na torneira, fluxo fraco ou necessita de troca de filtro e higienização interna. Atendimento para casas, consultórios e empresas.",
    tags: ["IBBL", "Latina", "Troca de Filtro", "Termostato"],
  },
];

const Services = () => {
  return (
    <section id="servicos" className="bg-[#F5F4F1] text-[#14212E] py-16 sm:py-24">
      <div className="container-max">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-[600px]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
              01 — Especialidades
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] text-[#14212E]">
              O que consertamos em Poços de Caldas
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-[16.5px] text-[#68737E] max-w-[360px] leading-relaxed">
            Três especialidades com assistência técnica em domicílio e loja física própria na cidade.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => {
            const waUrl = `https://wa.me/5535999587581?text=${encodeURIComponent(s.whatsappRef)}`;
            const Icon = s.icon;

            return (
              <div
                key={s.id}
                className="bg-white border border-[#E4E2DD] rounded-md overflow-hidden flex flex-col justify-between hover:border-[#14212E] transition-colors"
              >
                {/* Technical Graphic Header */}
                <div 
                  className="h-40 bg-[#EDEBE6] p-6 flex flex-col justify-between border-b border-[#E4E2DD]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(58deg, rgba(20,33,46,.045) 0 2px, transparent 2px 13px)'
                  }}
                >
                  <div className="w-10 h-10 rounded-md bg-white border border-[#E4E2DD] flex items-center justify-center text-[#00A843]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10.5px] tracking-wide text-[#68737E] uppercase">
                    {s.slotText}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#9AA2AC] mb-2">
                      {s.kicker}
                    </div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#14212E] tracking-tight mb-3">
                      {s.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-[15px] text-[#68737E] leading-relaxed mb-5">
                      {s.desc}
                    </p>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="font-sans text-xs text-[#5A646E] bg-[#F2F0EC] rounded px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#E4E2DD] flex items-center justify-between">
                    <a
                      href={waUrl}
                      onClick={() => trackWhatsAppConversion(`services_${s.id}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-semibold text-sm sm:text-[15px] text-[#00A843] hover:text-[#008F39] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Chamar no WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={s.route}
                      className="font-mono text-xs text-[#68737E] hover:text-[#14212E] underline transition-colors"
                    >
                      Página dedicada
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
