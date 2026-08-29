import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import HowItWorks from "@/components/HowItWorks";
import Guarantee from "@/components/Guarantee";
import StoreLocation from "@/components/StoreLocation";
import Coverage from "@/components/Coverage";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { AlertCircle, Waves, Gauge, Disc3, ArrowRight } from "lucide-react";
import { trackWhatsAppConversion } from "@/lib/tracking";

const washerProblems = [
  {
    icon: Waves,
    title: "Não esvazia a água ou não centrifuga",
    desc: "Bomba de drenagem travada por moedas/grampos, atuador de freio danificado ou correia rompida. Desobstruímos o circuito e trocamos a bomba com peça original.",
    tags: ["Bomba travada", "Atuador de freio", "Correia"],
  },
  {
    icon: Disc3,
    title: "Barulho alto na centrifugação (parecendo turbina)",
    desc: "Desgaste nos rolamentos do tambor e retentor com vazamento de água na mecânica. Troca completa do kit de rolamentos e mecanismo com vedação nova.",
    tags: ["Rolamento", "Retentor de água", "Mecanismo"],
  },
  {
    icon: AlertCircle,
    title: "Não liga, trava no meio da lavagem ou erro no painel",
    desc: "Pane na placa principal de comando ou na trava eletrônica da porta (muito frequente em Lava e Seca front load). Diagnóstico eletrônico no local.",
    tags: ["Placa de potência", "Trava de porta", "Lava e Seca"],
  },
  {
    icon: Gauge,
    title: "Enche de água sem parar ou transborda",
    desc: "Defeito no pressostato de nível ou na válvula de entrada de água que não fecha a vedação. Substituição com peças originais e teste de estanqueidade.",
    tags: ["Pressostato", "Válvula d'água", "Sem transbordar"],
  },
];

const washerFaqs = [
  {
    q: "O técnico faz o conserto da lavadora na minha residência em Poços de Caldas?",
    a: "Sim, realizamos o diagnóstico e conserto completo no local sem necessidade de retirar sua lavadora.",
  },
  {
    q: "Vocês atendem máquinas Lava e Seca com abertura frontal?",
    a: "Sim! Somos especialistas em Lava e Seca das marcas Samsung, LG, Electrolux, Brastemp e Midea.",
  },
  {
    q: "Quanto tempo dura a garantia da mão de obra e peças?",
    a: "Oferecemos 90 dias de garantia por escrito em todas as ordens de serviço da Conserto Express.",
  },
  {
    q: "Onde fica a loja física de vocês?",
    a: "Nossa loja e oficina técnica ficam na Rua Cel. Virgílio Silva, 1374 — Poços de Caldas / MG.",
  },
];

const Lavadoras = () => {
  const WHATSAPP_LAVADORA = "Olá, preciso de conserto na minha máquina de lavar (Ref: #lavadora-pocos)";

  return (
    <>
      <Helmet>
        <title>Conserto de Máquinas de Lavar e Lava e Seca em Poços de Caldas | Conserto Express</title>
        <meta
          name="description"
          content="Conserto de máquina de lavar, lava e seca e tanquinhos em Poços de Caldas. Não centrifuga, vaza água ou faz barulho. Peças originais e 90 dias de garantia por escrito."
        />
        <link rel="canonical" href="https://consertoexpress.com.br/lavadoras" />
      </Helmet>

      <div className="min-h-screen bg-[#0A141E] text-white">
        <Header currentRoute="/lavadoras" whatsappMessage={WHATSAPP_LAVADORA} />

        <main>
          {/* Hero Section */}
          <Hero
            badgeRegion="Poços de Caldas / MG"
            badgeCredential="Especialistas em Lava e Seca & Automáticas"
            title={
              <>
                Conserto de Máquinas de Lavar e<br />
                <span className="text-[#00A843]">Lava e Seca em Poços de Caldas</span>
              </>
            }
            description="Não centrifuga, não drena a água ou faz barulho excessivo? Atendimento ágil no seu endereço com peças originais, oficina própria e 90 dias de garantia por escrito."
            whatsappMessage={WHATSAPP_LAVADORA}
            bgPosition="18% center"
          />

          <Brands />

          {/* Sintomas da Lavadora */}
          <section className="bg-[#F5F4F1] text-[#14212E] py-16 sm:py-24">
            <div className="container-max">
              <div className="max-w-[640px] mb-12">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
                  01 — Falhas Mais Comuns
                </div>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] mb-4">
                  O que está acontecendo com sua lavadora?
                </h2>
                <p className="font-sans text-base text-[#68737E]">
                  Trabalhamos com diagnósticos precisos para evitar trocas desnecessárias de peças.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {washerProblems.map((p, idx) => {
                  const Icon = p.icon;
                  const waRefUrl = `https://wa.me/5535999587801?text=${encodeURIComponent(`Olá! Minha máquina de lavar está com o seguinte defeito: ${p.title} (Ref: #lavadora-pocos)`)}`;

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-[#E4E2DD] rounded-md p-6 sm:p-7 flex flex-col justify-between hover:border-[#14212E] transition-colors"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-md bg-[#F2F0EC] flex items-center justify-center text-[#00A843] mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-[#14212E] mb-2.5">
                          {p.title}
                        </h3>
                        <p className="font-sans text-sm text-[#68737E] leading-relaxed mb-4">
                          {p.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {p.tags.map((t, i) => (
                            <span key={i} className="font-sans text-xs text-[#5A646E] bg-[#F2F0EC] rounded px-2.5 py-1">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href={waRefUrl}
                        onClick={() => trackWhatsAppConversion(`washer_problem_${idx}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans font-semibold text-sm text-[#00A843] hover:text-[#008F39] pt-4 border-t border-[#E4E2DD]"
                      >
                        <span>Solicitar conserto no WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <HowItWorks />
          <Guarantee />
          <StoreLocation />
          <Coverage />
          <SocialProof />
          <FAQ customFaqs={washerFaqs} />
          <Contact whatsappMessage={WHATSAPP_LAVADORA} />
        </main>

        <Footer />
        <WhatsAppFloat whatsappMessage={WHATSAPP_LAVADORA} />
      </div>
    </>
  );
};

export default Lavadoras;
