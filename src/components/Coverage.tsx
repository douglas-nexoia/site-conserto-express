import { MapPin } from "lucide-react";
import { trackWhatsAppConversion, OFFICIAL_WHATSAPP_LINK } from "@/lib/tracking";

const bairros = [
  "Centro",
  "Jardim dos Estados",
  "Country Club",
  "Cascatinha",
  "Santa Rosália",
  "Vila Cruz",
  "Zona Sul (Cohab / São Sebastião)",
  "Zona Leste (Dom Bosco)",
  "Zona Oeste (Jardim Country)",
  "Jardim São Bento",
  "Vila Nova",
  "Parque Pinheiros",
];

const Coverage = () => {
  const whatsappUrl = OFFICIAL_WHATSAPP_LINK;

  return (
    <section id="onde" className="bg-[#0A141E] text-white py-16 sm:py-24 border-t border-white/10">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Neighborhood Chips */}
          <div className="lg:col-span-7">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
              05 — Cobertura
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] mb-4 text-white">
              Atendemos todos os bairros de Poços de Caldas
            </h2>
            <p className="font-sans text-base sm:text-[16.5px] text-white/60 leading-relaxed mb-8 max-w-[480px]">
              Técnicos em rota constante por todas as regiões e bairros de Poços de Caldas para garantir agilidade no atendimento domiciliar.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {bairros.map((bairro, idx) => (
                <span
                  key={idx}
                  className="font-sans text-xs sm:text-sm text-white/80 border border-white/15 bg-white/5 rounded px-3 py-1.5"
                >
                  {bairro}
                </span>
              ))}
              <span className="font-sans text-xs sm:text-sm text-[#00A843] border border-[#00A843]/60 bg-[#00A843]/10 rounded px-3 py-1.5 font-semibold">
                + toda a cidade
              </span>
            </div>

            {/* Link */}
            <a
              href={whatsappUrl}
              onClick={() => trackWhatsAppConversion("coverage_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-semibold text-base text-white border-b-2 border-[#00A843] pb-1 hover:text-[#00A843] transition-colors"
            >
              <span>Consultar o meu bairro →</span>
            </a>
          </div>

          {/* Right Column: Real Embedded Google Map of Poços de Caldas */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[440px] aspect-square rounded-md overflow-hidden bg-[#12212F] border border-white/15 relative shadow-xl">
              {/* Real Google Maps Embed with Dark Night Theme filter */}
              <iframe
                title="Mapa de Atendimento Conserto Express - Poços de Caldas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59397.69766938927!2d-46.60259837929452!3d-21.78912448408331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c9ddb383827d0d%3A0xc3c5f63d0be3c415!2sPo%C3%A7os%20de%20Caldas%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)",
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Base Card on Top */}
              <div className="absolute top-4 left-4 right-4 bg-[#0A141E]/92 backdrop-blur-md border border-white/15 rounded p-3 flex items-center justify-between pointer-events-none shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00A843] shadow-[0_0_0_3px_rgba(0,168,67,0.25)]" />
                  <div>
                    <div className="font-heading font-semibold text-xs text-white">
                      Loja Física em Poços de Caldas
                    </div>
                    <div className="font-sans text-[11px] text-white/60">
                      R. Cel. Virgílio Silva, 1374
                    </div>
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-[#00A843] shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
