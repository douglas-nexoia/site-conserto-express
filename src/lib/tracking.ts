// Google Ads & GTM Conversion Tracking Helper for Conserto Express (Poços de Caldas)

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
