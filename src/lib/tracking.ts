// Google Ads & GTM Conversion Tracking Helper for Conserto Express (Poços de Caldas)

/**
 * Link e Mensagem Oficial de WhatsApp da Conserto Express (Poços de Caldas)
 * Obrigatório para compatibilidade com o gatilho de lead do CRM ("Vim pelo site, gostaria de um atendimento.")
 */
export const OFFICIAL_WHATSAPP_PHONE = "5535999587581";
export const OFFICIAL_WHATSAPP_MESSAGE = "Olá! Vim pelo site, gostaria de um atendimento.";
export const OFFICIAL_WHATSAPP_LINK =
  "https://api.whatsapp.com/send?phone=5535999587581&text=Ol%C3%A1%21%20Vim%20pelo%20site%2C%20gostaria%20de%20um%20atendimento.";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const trackWhatsAppConversion = (label: string = "whatsapp_lead") => {
  if (typeof window !== "undefined") {
    // 1. DataLayer event for GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      conversion_label: label,
      timestamp: new Date().toISOString(),
    });

    // 2. Direct gtag event if configured
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "contact",
        event_label: label,
      });
    }
  }
};

export const trackPhoneConversion = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "phone_click",
      timestamp: new Date().toISOString(),
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "contact", {
        event_category: "phone",
      });
    }
  }
};
