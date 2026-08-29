import { MapPin, Clock, Phone } from "lucide-react";
import internalPhoto from "@/assets/conserto_express_interno.webp";
import { trackWhatsAppConversion, trackPhoneConversion } from "@/lib/tracking";

const StoreLocation = () => {
  const whatsappUrl = `https://wa.me/5535999587801?text=${encodeURIComponent("Olá! Gostaria de visitar a loja da Conserto Express na Cel. Virgílio Silva.")}`;

  return (
    <section className="bg-[#07111D] text-white py-16 sm:py-24 border-t border-white/10">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Store Details */}
          <div className="lg:col-span-6">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
              04 — Loja Física
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.06] tracking-[-0.03em] mb-5 text-white">
              Venha tomar um café ou chame nosso técnico em domicílio
            </h2>
            <p className="font-sans text-base text-white/70 leading-relaxed mb-8">
              A Conserto Express conta com sede própria e oficina técnica completa em Poços de Caldas para receber você ou despachar nossos técnicos para o seu endereço.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 rounded-md p-4">
                <MapPin className="w-5 h-5 text-[#00A843] shrink-0 mt-0.5" />
                <div>
                  <div className="font-heading font-semibold text-sm text-white">Endereço da Loja</div>
                  <div className="font-sans text-xs sm:text-sm text-white/70">
                    Rua Cel. Virgílio Silva, 1374 — Poços de Caldas / MG
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 rounded-md p-4">
                <Clock className="w-5 h-5 text-[#00A843] shrink-0 mt-0.5" />
                <div>
                  <div className="font-heading font-semibold text-sm text-white">Horário de Atendimento</div>
                  <div className="font-sans text-xs sm:text-sm text-white/70">
                    Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                onClick={() => trackWhatsAppConversion("store_location_cta")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00A843] hover:bg-[#008F39] text-white font-sans font-bold text-sm sm:text-base px-6 py-3 rounded-md shadow-sm transition-transform active:scale-95"
              >
                <span>Falar no WhatsApp</span>
              </a>
              <a
                href="tel:+553520390020"
                onClick={trackPhoneConversion}
                className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/5 text-white font-sans font-semibold text-sm sm:text-base px-5 py-3 rounded-md transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00A843]" />
                <span>(35) 2039-0020</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Internal Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#0A141E]">
              <img
                src={internalPhoto}
                alt="Oficina e Recepção da Loja Conserto Express em Poços de Caldas"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center brightness-90 hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A141E] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A141E]/90 backdrop-blur-md border border-white/10 rounded-md p-3 flex items-center justify-between">
                <div>
                  <div className="font-heading font-semibold text-xs text-white">Conserto Express — Loja Física</div>
                  <div className="font-sans text-[11px] text-white/60">R. Cel. Virgílio Silva, 1374</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A843] shadow-[0_0_0_3px_rgba(0,168,67,0.25)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocation;
