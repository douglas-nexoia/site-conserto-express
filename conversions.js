/**
 * conversions.js — Motor de Rastreamento Google Ads & OCT (Offline Conversion Tracking)
 * Conserto Express Assistência Técnica · Poços de Caldas / MG · Padrão Agência 2026
 *
 * - Google Ads Direct Tag (gtag.js) com Zero TBT
 * - Captura e persistência de tráfego pago (gclid, wbraid, gbraid, _gcl_aw) por 30 dias
 * - Geração e idempotência de protocolo #CE-XXXX (Base32 sem ambiguidade)
 * - Disparo síncrono para Supabase Edge Function via navigator.sendBeacon
 * - Conformidade com Webhook CRM Iara (frase âncora literal obrigatória)
 * - Rastreamento de chamadas telefônicas (data-track="phone")
 */

(function () {
  'use strict';

  // 1. IDENTIFICADORES OFICIAIS (Conserto Express - Poços de Caldas / MG)
  const GOOGLE_ADS_ID = 'AW-11456532846';
  const GOOGLE_ADS_WHATSAPP_CONVERSION = 'AW-11456532846/wwMnCJWIv7MbEO6i89Yq';
  const GOOGLE_ADS_PHONE_CONVERSION = 'AW-11456532846/1DjfCPnnpZscEO6i89Yq';
  const WHATSAPP_NUMBER = '5535999587581';
  const DISPLAY_PHONE = '(35) 99958-7581';
  const EMPRESA_PREFIX = 'CE';
  const ENDPOINT_REGISTRO_CLIQUE = 'https://hrobytuiaxoflsezgpce.supabase.co/functions/v1/registrar-clique-ads';

  // Alfabeto Base32 de 31 caracteres sem ambiguidade (sem 0/O e sem 1/I/L)
  const CHARSET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

  // Mensagens contextuais com a frase âncora mandatória da agência e CRM Iara:
  // "vim pelo site, gostaria de um atendimento"
  const MESSAGES = {
    home: 'Olá! Vim pelo site, gostaria de um atendimento para agendar uma visita técnica.',
    geladeira: 'Olá! Vim pelo site, gostaria de um atendimento para conserto de Geladeira ou Freezer.',
    lavadora: 'Olá! Vim pelo site, gostaria de um atendimento para conserto de Máquina de Lavar ou Lava e Seca.',
    purificador: 'Olá! Vim pelo site, gostaria de um atendimento para conserto de Bebedouro ou Purificador de Água.',
    lavaESeca: 'Olá! Vim pelo site, gostaria de um atendimento para conserto de Lava e Seca ou Secadora.'
  };

  // 2. UTILITÁRIOS DE COOKIES & STORAGE (Retenção de 30 dias)
  function setCookie(name, val, days = 30) {
    try {
      const exp = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(val)};expires=${exp};path=/;SameSite=Lax`;
    } catch (e) {}
  }

  function getCookie(name) {
    try {
      const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    } catch (e) {
      return null;
    }
  }

  // Fallback nativo do Google Ads (_gcl_aw)
  function getGclAw() {
    const raw = getCookie('_gcl_aw');
    if (!raw) return null;
    const parts = raw.split('.');
    if (parts.length >= 3) {
      return parts.slice(2).join('.');
    }
    return raw;
  }

  // 3. CAPTURA E PERSISTÊNCIA DOS PARÂMETROS DE ATRIBUIÇÃO
  const params = new URLSearchParams(window.location.search);
  const queryGclid = params.get('gclid');
  const queryWbraid = params.get('wbraid');
  const queryGbraid = params.get('gbraid');

  if (queryGclid) setCookie('_gclid', queryGclid);
  if (queryWbraid) setCookie('_wbraid', queryWbraid);
  if (queryGbraid) setCookie('_gbraid', queryGbraid);

  const activeGclid = queryGclid || getCookie('_gclid') || getGclAw() || null;
  const activeWbraid = queryWbraid || getCookie('_wbraid') || null;
  const activeGbraid = queryGbraid || getCookie('_gbraid') || null;

  const hasAdsTraffic = Boolean(activeGclid || activeWbraid || activeGbraid);

  // 4. PROTOCOLO IDEMPOTENTE (#CE-XXXX)
  function getOrGenerateProtocol() {
    if (!hasAdsTraffic) {
      return null;
    }

    try {
      const sessionSaved = sessionStorage.getItem('oct_protocol');
      if (sessionSaved && sessionSaved.startsWith(`#${EMPRESA_PREFIX}-`)) {
        return sessionSaved;
      }
    } catch (e) {}

    const cookieSaved = getCookie('_oct_code');
    if (cookieSaved && cookieSaved.startsWith(`#${EMPRESA_PREFIX}-`)) {
      try {
        sessionStorage.setItem('oct_protocol', cookieSaved);
      } catch (e) {}
      return cookieSaved;
    }

    // Gera 4 caracteres aleatórios Base32
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }

    const fullProtocol = `#${EMPRESA_PREFIX}-${code}`;
    try {
      sessionStorage.setItem('oct_protocol', fullProtocol);
    } catch (e) {}
    setCookie('_oct_code', fullProtocol, 30);

    return fullProtocol;
  }

  const activeProtocol = getOrGenerateProtocol();

  // 5. REGISTRO OFFLINE SUPABASE EDGE FUNCTION (sendBeacon fire-and-forget)
  function registrarCliqueAds(origem) {
    if (!hasAdsTraffic || !activeProtocol) return;

    const payload = JSON.stringify({
      empresa: EMPRESA_PREFIX,
      codigo: activeProtocol,
      gclid: activeGclid,
      wbraid: activeWbraid,
      gbraid: activeGbraid,
      url_origem: window.location.href,
      user_agent: navigator.userAgent,
      origem_clique: origem || 'whatsapp_button',
      criado_em: new Date().toISOString()
    });

    let sent = false;
    if (navigator.sendBeacon) {
      try {
        const blob = new Blob([payload], { type: 'application/json' });
        sent = navigator.sendBeacon(ENDPOINT_REGISTRO_CLIQUE, blob);
      } catch (e) {
        sent = false;
      }
    }

    if (!sent && window.fetch) {
      fetch(ENDPOINT_REGISTRO_CLIQUE, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(function () {});
    }
  }

  // 6. CONVERSÃO GOOGLE ADS DIRETA (Zero TBT)
  function dispararConversaoWhatsApp() {
    if (typeof window.loadGtag === 'function') {
      window.loadGtag();
    }
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_WHATSAPP_CONVERSION,
          value: 1.0,
          currency: 'BRL',
          transaction_id: activeProtocol || undefined
        });
      } catch (err) {
        console.error('Erro ao reportar conversao Google Ads WhatsApp:', err);
      }
    }
  }

  function dispararConversaoTelefone() {
    if (typeof window.loadGtag === 'function') {
      window.loadGtag();
    }
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_PHONE_CONVERSION
        });
      } catch (err) {
        console.error('Erro ao reportar conversao Google Ads Telefone:', err);
      }
    }
  }

  // 7. MONTAGEM DE LINK DO WHATSAPP
  function buildWhatsAppUrl(serviceKey) {
    const baseMsg = MESSAGES[serviceKey] || MESSAGES.home;
    const finalMsg = activeProtocol ? `${baseMsg} [Protocolo: ${activeProtocol}]` : baseMsg;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`;
  }

  // 8. INTERCEPTAÇÃO E ATIVAÇÃO DE LINKS & BOTÕES
  function setupTrackingListeners() {
    // Sincronização dinâmica de Radio Pills da Seção de Contato
    const deviceRadios = document.querySelectorAll('.pill-radio, input[name="device"]');
    deviceRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        const contactBtn = document.querySelector('#contato a[data-track="whatsapp"]');
        if (contactBtn) {
          let svc = 'geladeira';
          const val = this.value.toLowerCase();
          if (val.includes('lavadora') || val.includes('lavar')) svc = 'lavadora';
          else if (val.includes('lava e seca') || val.includes('lava_seca') || val.includes('secadora')) svc = 'lavaESeca';
          else if (val.includes('purificador') || val.includes('bebedouro')) svc = 'purificador';
          else if (val.includes('geladeira') || val.includes('freezer')) svc = 'geladeira';

          contactBtn.setAttribute('data-service', svc);
          contactBtn.setAttribute('href', buildWhatsAppUrl(svc));
        }
      });
    });

    // Submissão do Formulário de Contato Direto (#quick-form)
    const quickForm = document.getElementById('quick-form');
    if (quickForm) {
      quickForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('form-name');
        const neighInput = document.getElementById('form-neighborhood');
        const name = nameInput ? nameInput.value.trim() : '';
        const neighborhood = neighInput ? neighInput.value.trim() : '';
        const selectedRadio = document.querySelector('input[name="device"]:checked') || document.querySelector('input[name="aparelho"]:checked');
        const deviceSelected = selectedRadio ? selectedRadio.value : 'Aparelho';

        let svc = 'home';
        const val = deviceSelected.toLowerCase();
        if (val.includes('lavadora') || val.includes('lavar')) svc = 'lavadora';
        else if (val.includes('lava e seca') || val.includes('lava_seca') || val.includes('secadora')) svc = 'lavaESeca';
        else if (val.includes('purificador') || val.includes('bebedouro')) svc = 'purificador';
        else if (val.includes('geladeira') || val.includes('freezer')) svc = 'geladeira';

        let customMsg = `Olá! Vim pelo site, gostaria de um atendimento. Meu nome é ${name}, moro em ${neighborhood} e preciso de conserto para: ${deviceSelected}.`;
        if (activeProtocol) {
          customMsg += ` [Protocolo: ${activeProtocol}]`;
        }
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMsg)}`;

        registrarCliqueAds('whatsapp_form_' + svc);
        dispararConversaoWhatsApp();
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }

    // Acordeão nativo de FAQ (garante abertura e fechamento sem bibliotecas externas)
    document.querySelectorAll('.faq-item').forEach(function (item) {
      item.addEventListener('click', function () {
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
        if (!wasActive) item.classList.add('active');
      });
    });

    // A) Links de WhatsApp
    const waButtons = document.querySelectorAll('a[data-track="whatsapp"], button[data-track="whatsapp"]');
    waButtons.forEach(function (btn) {
      const service = btn.getAttribute('data-service') || 'home';
      const targetUrl = buildWhatsAppUrl(service);

      if (btn.tagName === 'A') {
        btn.setAttribute('href', targetUrl);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      }

      btn.addEventListener('click', function (e) {
        const currentService = btn.getAttribute('data-service') || service;
        const currentUrl = buildWhatsAppUrl(currentService);

        // Dispara registro Supabase imediatamente
        registrarCliqueAds('whatsapp_' + currentService);

        // Dispara conversão no Google Ads com transaction_id
        dispararConversaoWhatsApp();

        if (btn.tagName === 'BUTTON') {
          e.preventDefault();
          window.open(currentUrl, '_blank', 'noopener,noreferrer');
        } else {
          btn.setAttribute('href', currentUrl);
        }
      });
    });

    // B) Links de Telefone / Ligação direta
    const phoneButtons = document.querySelectorAll('a[data-track="phone"], button[data-track="phone"], a[href^="tel:"]');
    phoneButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        registrarCliqueAds('telefone_ligacao');
        dispararConversaoTelefone();
      });
    });
  }

  // Inicialização no DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTrackingListeners);
  } else {
    setupTrackingListeners();
  }

  // Expõe no escopo global para compatibilidade
  window.CE_TRACKING = {
    protocol: activeProtocol,
    hasAdsTraffic: hasAdsTraffic,
    buildWhatsAppUrl: buildWhatsAppUrl,
    registrarCliqueAds: registrarCliqueAds,
    dispararConversaoWhatsApp: dispararConversaoWhatsApp,
    dispararConversaoTelefone: dispararConversaoTelefone
  };
})();
