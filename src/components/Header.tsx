import { Phone } from "lucide-react";
import { trackWhatsAppConversion, trackPhoneConversion } from "@/lib/tracking";

interface HeaderProps {
  currentRoute?: string;
  whatsappMessage?: string;
}

const Header = ({
  currentRoute = "/",
  whatsappMessage = "Olá! Vim pelo site da Conserto Express e gostaria de um atendimento em Poços de Caldas.",
}: HeaderProps) => {
  const whatsappUrl = `https://wa.me/5535999587801?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A141E]/92 backdrop-blur-[14px] border-b border-white/10 transition-all duration-200">
      <div className="container-max flex items-center justify-between h-20">
        {/* Brand / Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="font-heading font-extrabold text-2xl tracking-tight text-white group-hover:text-[#00A843] transition-colors">
            CONSERTO EXPRESS<span className="text-[#00A843]">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="/"
            className={`font-sans text-sm font-medium transition-colors ${
              currentRoute === "/" ? "text-white font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            Geladeiras & Freezers
          </a>
          <a
            href="/lavadoras"
            className={`font-sans text-sm font-medium transition-colors ${
              currentRoute === "/lavadoras"
                ? "text-[#00A843] font-semibold"
                : "text-white/70 hover:text-white"
            }`}
          >
            Máquinas de Lavar
          </a>
          <a
            href="/bebedouros-e-purificadores"
            className={`font-sans text-sm font-medium transition-colors ${
              currentRoute === "/bebedouros-e-purificadores"
                ? "text-[#00A843] font-semibold"
                : "text-white/70 hover:text-white"
            }`}
          >
            Bebedouros & Purificadores
          </a>
        </nav>

        {/* Contact info & CTA */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Clickable Mono Phone */}
          <a
            href="tel:+553520390020"
            onClick={trackPhoneConversion}
            className="hidden sm:flex items-center gap-2.5 text-white/90 hover:text-white transition-colors group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A843] shadow-[0_0_0_3px_rgba(0,168,67,0.25)]" />
            <span className="font-mono text-sm font-medium text-white/90 group-hover:text-white">
              (35) 2039-0020
            </span>
          </a>

          {/* Primary WhatsApp CTA Button */}
          <a
            href={whatsappUrl}
            onClick={() => trackWhatsAppConversion("header_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00A843] hover:bg-[#008F39] text-white font-sans font-bold text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-md shadow-sm transition-all duration-150 active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>Pedir orçamento</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
