import { ShieldCheck, MapPin, Wrench } from "lucide-react";
import { trackWhatsAppConversion } from "@/lib/tracking";

const Guarantee = () => {
  const whatsappUrl = `https://wa.me/5535999587581?text=${encodeURIComponent("Olá! Quero confirmar a garantia e agendar a visita da Conserto Express.")}`;

  return (
    <section className="bg-[#F5F4F1] text-[#14212E] py-16 sm:py-24">
      <div className="container-max">
        <div className="bg-white border border-[#E4E2DD] rounded-xl p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
              03 — Segurança & Confiança
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.06] tracking-[-0.03em] mb-5 text-[#14212E]">
              90 dias de garantia por escrito e endereço físico em Poços de Caldas
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#68737E] leading-relaxed mb-6">
              Você não está contratando alguém sem procedência na internet. A Conserto Express possui loja física estabelecida na cidade, peças originais e técnicos responsáveis.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00A843] shrink-0 mt-0.5" />
                <span className="font-sans text-sm sm:text-base text-[#14212E]">
                  Garantia formal de 90 dias em todas as ordens de serviço.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00A843] shrink-0 mt-0.5" />
                <span className="font-sans text-sm sm:text-base text-[#14212E]">
                  Loja física aberta na Rua Cel. Virgílio Silva, 1374 — Poços de Caldas.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-[#00A843] shrink-0 mt-0.5" />
                <span className="font-sans text-sm sm:text-base text-[#14212E]">
                  Peças de reposição originais e procedência garantida.
                </span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              onClick={() => trackWhatsAppConversion("guarantee_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00A843] hover:bg-[#008F39] text-white font-sans font-bold text-base px-6 py-3.5 rounded-md shadow-sm transition-transform active:scale-95"
            >
              <span>Falar com a nossa equipe</span>
            </a>
          </div>

          {/* Right Column: High Authority Graphic Box */}
          <div className="lg:col-span-5 bg-[#0A141E] text-white rounded-lg p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#00A843] uppercase tracking-widest mb-4">
                Compromisso Conserto Express
              </div>
              <div className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-2">
                100%
              </div>
              <div className="font-sans text-base text-white/80 font-medium mb-6">
                Transparência no diagnóstico e compromisso com a sua tranquilidade.
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/55 space-y-1.5">
              <div>• Diagnóstico claro antes de executar</div>
              <div>• Atendimento com pontualidade no seu endereço</div>
              <div>• Nota e comprovante de garantia entregues no local</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
