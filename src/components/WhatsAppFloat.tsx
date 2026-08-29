import { MessageCircle } from "lucide-react";
import { trackWhatsAppConversion } from "@/lib/tracking";

interface WhatsAppFloatProps {
  whatsappMessage?: string;
}

const WhatsAppFloat = ({
  whatsappMessage = "Olá! Vim pelo site da Conserto Express e gostaria de solicitar um atendimento em Poços de Caldas.",
}: WhatsAppFloatProps) => {
  const whatsappUrl = `https://wa.me/5535999587801?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <aside aria-label="Atendimento via WhatsApp" className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        onClick={() => trackWhatsAppConversion("floating_btn")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#00A843] hover:bg-[#008F39] text-white font-sans font-bold text-sm sm:text-base px-5 py-3.5 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 group"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </aside>
  );
};

export default WhatsAppFloat;
