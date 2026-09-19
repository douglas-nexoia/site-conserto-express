// Módulo centralizado de rastreamento de conversões e contatos — Conserto Express (Poços de Caldas)
export const WHATSAPP_NUMBER = "5535999587581";
export const DISPLAY_PHONE = "(35) 99958-7581";
export const TEL_LINK = "tel:5535999587581";

/**
 * URL do endpoint no CRM Iara / Supabase para registro síncrono/fire-and-forget do clique de anúncio.
 */
export const ENDPOINT_REGISTRO_CLIQUE = "https://hrobytuiaxoflsezgpce.supabase.co/functions/v1/registrar-clique-ads";

// Alfabeto Base32 sem ambiguidade (31 caracteres: 8 dígitos + 23 letras, sem 0/O, 1/I/L)
const CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export const DEFAULT_WHATSAPP_MESSAGE = "Olá! Vim pelo site, gostaria de um atendimento.";

export const WHATSAPP_MESSAGES = {
  home: "Olá! Vim pelo site, gostaria de um atendimento.",
  geladeira: "Olá! Vim pelo site, gostaria de um atendimento para conserto de Geladeira ou Freezer.",
  lavadora: "Olá! Vim pelo site, gostaria de um atendimento para conserto de Lavadora ou Lava e Seca.",
  bebedouro: "Olá! Vim pelo site, gostaria de um atendimento para conserto de Bebedouro ou Purificador.",
} as const;

export type ServiceType = keyof typeof WHATSAPP_MESSAGES;

export interface TrafficAttribution {
  codigo: string;
  gclid: string | null;
  wbraid: string | null;
  gbraid: string | null;
  timestamp: string;
}

/**
 * Lê um cookie específico pelo nome
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Grava um cookie com tempo de expiração em dias
 */
function setCookie(name: string, value: string, days = 30): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Extrai o GCLID do cookie nativo do Google Ads (_gcl_aw) se presente
 */
function getGclAwCookie(): string | null {
  const raw = getCookie("_gcl_aw");
  if (!raw) return null;
  const parts = raw.split(".");
  return parts.length >= 3 ? parts.slice(2).join(".") : raw;
}

/**
 * Gera o código alfanumérico aleatório de 4 caracteres (sem 0/O, 1/I/L)
 */
export function generateProtocolCode(): string {
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * CHARSET.length);
    randomPart += CHARSET[index];
  }
  return randomPart;
}

const STORAGE_KEY = "conserto_express_traffic_attr";

/**
 * Obtém ou inicializa a atribuição de tráfego (GCLID, WBRAID, GBRAID e Código de 4 caracteres).
 * Persiste em sessionStorage e cookies (30 dias) para retenção entre navegações pelas páginas do site.
 */
export function getTrafficAttribution(): TrafficAttribution | null {
  if (typeof window === "undefined") return null;

  // 1. Verificar se já temos armazenado na sessão atual
  let storedJson = sessionStorage.getItem(STORAGE_KEY);
  if (!storedJson) {
    storedJson = getCookie(STORAGE_KEY);
  }

  let stored: TrafficAttribution | null = null;
  if (storedJson) {
    try {
      stored = JSON.parse(storedJson) as TrafficAttribution;
    } catch {
      stored = null;
    }
  }

  // 2. Checar parâmetros da URL atual
  const searchParams = new URLSearchParams(window.location.search);
  const urlGclid = searchParams.get("gclid");
  const urlWbraid = searchParams.get("wbraid");
  const urlGbraid = searchParams.get("gbraid");
  const cookieGclid = getGclAwCookie();

  const gclid = urlGclid || (stored?.gclid ?? null) || cookieGclid;
  const wbraid = urlWbraid || (stored?.wbraid ?? null);
  const gbraid = urlGbraid || (stored?.gbraid ?? null);

  const hasPaidTraffic = Boolean(gclid || wbraid || gbraid);

  if (!hasPaidTraffic) {
    return null;
  }

  // Reutiliza o código existente da sessão para manter idempotência (limpando qualquer prefixo prévio), ou gera um novo de 4 chars
  const rawCodigo = stored?.codigo || generateProtocolCode();
  const codigo = rawCodigo.replace(/^#[A-Z]+-/, "");

  const attribution: TrafficAttribution = {
    codigo,
    gclid: gclid || null,
    wbraid: wbraid || null,
    gbraid: gbraid || null,
    timestamp: stored?.timestamp || new Date().toISOString(),
  };

  // Salvar no sessionStorage e cookie
  try {
    const serialized = JSON.stringify(attribution);
    sessionStorage.setItem(STORAGE_KEY, serialized);
    setCookie(STORAGE_KEY, serialized, 30);
  } catch {
    // Silently ignore storage quota errors
  }

  return attribution;
}

/**
 * Gera a URL do WhatsApp com a mensagem contextual por serviço.
 * Se o visitante veio via anúncio pago (Google Ads), anexa o protocolo "#CE-XXXX".
 * Se o visitante for tráfego orgânico, entrega a mensagem limpa.
 */
export function getWhatsAppUrl(service: ServiceType = "home", customText?: string): string {
  const baseText = customText || WHATSAPP_MESSAGES[service] || WHATSAPP_MESSAGES.home;
  const attribution = getTrafficAttribution();

  let finalText = baseText;
  if (attribution?.codigo) {
    const cleanCode = attribution.codigo.replace(/^#[A-Z]+-/, "");
    finalText = `${baseText} Protocolo: #CE-${cleanCode}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalText)}`;
}

/**
 * Registra o clique do Google Ads no backend de forma síncrona/fire-and-forget
 * utilizando sendBeacon com string simples (sem preflight OPTIONS) e fallback fetch keepalive.
 */
export function registrarCliqueAds(): void {
  if (typeof window === "undefined") return;

  const attribution = getTrafficAttribution();
  if (!attribution || (!attribution.gclid && !attribution.wbraid && !attribution.gbraid)) {
    return;
  }

  // O endpoint do Supabase exige EXATAMENTE os 4 caracteres alfanuméricos, sem '#' e sem prefixo
  const cleanCode = attribution.codigo.replace(/^#[A-Z]+-/, "");

  const payload = {
    empresa: "CE",
    codigo: cleanCode,
    gclid: attribution.gclid,
    wbraid: attribution.wbraid,
    gbraid: attribution.gbraid,
    url_origem: window.location.href,
    user_agent: navigator.userAgent,
    criado_em: new Date().toISOString(),
  };

  if (ENDPOINT_REGISTRO_CLIQUE) {
    const payloadStr = JSON.stringify(payload);
    let sent = false;

    // 1. sendBeacon com string direta: enviado como text/plain sem preflight OPTIONS
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      try {
        sent = navigator.sendBeacon(ENDPOINT_REGISTRO_CLIQUE, payloadStr);
      } catch {
        sent = false;
      }
    }

    // 2. fetch simples com keepalive: true e Content-Type text/plain (sem headers customizados que gerem OPTIONS)
    if (!sent && typeof fetch !== "undefined") {
      try {
        fetch(ENDPOINT_REGISTRO_CLIQUE, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: payloadStr,
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Ignora erro para nunca travar a navegação do usuário
      }
    }
  }

  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    console.log("[Google Ads Tracking - Conserto Express] Clique registrado:", payload);
  }
}

/**
 * Dispara evento de conversão do WhatsApp no DataLayer / Google Ads
 */
export function reportarConversaoWhatsApp(label: string = "whatsapp_lead"): boolean {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        conversion_label: label,
        timestamp: new Date().toISOString(),
      });

      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          event_category: "contact",
          event_label: label,
        });
      }
    }
  } catch (err) {
    console.error("Erro ao reportar conversão de WhatsApp:", err);
  }
  return true;
}

/**
 * Dispara evento de conversão de Ligação Telefônica no DataLayer / Google Ads
 */
export function reportarConversaoTelefone(): boolean {
  try {
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
  } catch (err) {
    console.error("Erro ao reportar conversão de Telefone:", err);
  }
  return true;
}

/**
 * Manipulador global de clique para todos os botões e links de WhatsApp.
 * Dispara tanto a conversão do Google Ads no dataLayer/gtag quanto o registro do clique offline.
 */
export function handleWhatsAppClick(label?: string): void {
  reportarConversaoWhatsApp(label);
  registrarCliqueAds();
}

// Aliases para compatibilidade total com o código existente
export const trackWhatsAppConversion = handleWhatsAppClick;
export const trackPhoneConversion = reportarConversaoTelefone;
export const OFFICIAL_WHATSAPP_PHONE = WHATSAPP_NUMBER;
export const OFFICIAL_WHATSAPP_MESSAGE = DEFAULT_WHATSAPP_MESSAGE;
export const OFFICIAL_WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;
