import { trackWhatsAppConversion, trackPhoneConversion } from "@/lib/tracking";
import facadeImage from "@/assets/conserto_express_fachada_hq.webp";

interface HeroProps {
  badgeRegion?: string;
  badgeCredential?: string;
  title: React.ReactNode;
  description: string;
  whatsappMessage: string;
  bgPosition?: string;
}

const Hero = ({
  badgeRegion = "Poços de Caldas / MG",
  badgeCredential = "Loja Física na R. Cel. Virgílio Silva, 1374",
  title,
  description,
  whatsappMessage,
  bgPosition = "18% center",
}: HeroProps) => {
  const whatsappUrl = `https://wa.me/5535999587801?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative min-h-[600px] lg:min-h-[660px] flex items-center bg-[#0A141E] overflow-hidden">
      {/* 1. Real Store Facade Background Image with background-size: cover & calibrated background-position */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: `url(${facadeImage})`,
          backgroundSize: "cover",
          backgroundPosition: bgPosition,
        }}
      />

      {/* 2. Canonical Gradient Overlay: Hides adjacent building on the left behind solid dark panel and illuminates facade on the right */}
      <div 
        className="absolute inset-0 z-0 hidden lg:block"
        style={{
          background: "linear-gradient(90deg, #0A141E 0%, #0A141E 48%, rgba(10, 20, 30, 0.88) 64%, rgba(10, 20, 30, 0.2) 100%)",
        }}
      />

      {/* Mobile & Tablet Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 lg:hidden"
        style={{
          background: "linear-gradient(180deg, rgba(10, 20, 30, 0.94) 0%, rgba(10, 20, 30, 0.88) 60%, rgba(10, 20, 30, 0.96) 100%)",
        }}
      />

      {/* 3. Subtle Ambient Light */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#00A843]/[0.06] rounded-full blur-3xl pointer-events-none z-0" />

      {/* 4. Hero Content */}
      <div className="container-max w-full relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[720px]">
          {/* 2 Badges */}
          <div className="flex flex-wrap gap-2.5 mb-7">
            <span className="inline-flex items-center gap-2 border border-white/15 bg-white/5 backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs font-sans font-medium text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A843]" />
              {badgeRegion}
            </span>
            <span className="inline-flex items-center gap-2 border border-white/15 bg-white/5 backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs font-sans font-medium text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A843]" />
              {badgeCredential}
            </span>
          </div>

          {/* H1 in 2-3 lines */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-[-0.035em] text-white mb-6 text-balance">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-[580px]">
            {description}
          </p>

          {/* 2 CTAs */}
          <div className="flex flex-wrap gap-3.5 mb-10">
            <a
              href={whatsappUrl}
              onClick={() => trackWhatsAppConversion("hero_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#00A843] hover:bg-[#008F39] text-white font-sans font-bold text-base px-7 py-4 rounded-md shadow-md transition-transform duration-150 active:scale-95"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span>Chamar no WhatsApp</span>
            </a>
            <a
              href="tel:+553520390020"
              onClick={trackPhoneConversion}
              className="inline-flex items-center gap-2 border border-white/25 hover:bg-white/5 text-white font-sans font-semibold text-base px-6 py-4 rounded-md transition-colors"
            >
              <span>Ligar (35) 2039-0020</span>
            </a>
          </div>

          {/* 3 Numerical Proofs */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-[600px]">
            <div>
              <div className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                Loja física
              </div>
              <div className="font-sans text-xs text-white/60 mt-1">Poços de Caldas / MG</div>
            </div>
            <div>
              <div className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                90 dias
              </div>
              <div className="font-sans text-xs text-white/60 mt-1">de garantia por escrito</div>
            </div>
            <div>
              <div className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                Em domicílio
              </div>
              <div className="font-sans text-xs text-white/60 mt-1">técnicos em rota diária</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
