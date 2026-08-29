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
import { Droplets, Sparkles, ShieldCheck, Wrench, ArrowRight } from "lucide-react";
import { trackWhatsAppConversion } from "@/lib/tracking";

const purifierProblems = [
  {
    icon: Droplets,
    title: "Água não gela ou termostato desregulado",
    desc: "Problema no compressor, falta de gás refrigerante ou termostato de controle térmico inoperante. Diagnóstico rápido para você voltar a ter água gelada.",
    tags: ["Termostato", "Compressor", "Carga de Gás"],
  },
  {
    icon: Sparkles,
    title: "Troca de Refil / Filtro & Higienização Interna",
    desc: "Substituição do elemento filtrante por refil original e sanitização do reservatório com bactericida para eliminar gosto de cloro e impurezas.",
    tags: ["Refil Original", "Anti-Cloro", "Higienização"],
  },
  {
    icon: Wrench,
    title: "Pingando na torneira ou vazamento pela base",
    desc: "Válvula solenoide travada, conexões de engate rápido com folga ou torneira ressecada. Reparo com substituição de componentes vedantes.",
    tags: ["Torneira", "Engate Rápido", "Sem Vazamento"],
  },
  {
    icon: ShieldCheck,
    title: "Bebedouros Industriais & Comerciais",
    desc: "Manutenção de bebedouros de pressão, bebedouros de coluna e industriais de 25L, 50L e 100L para empresas, academias e comércios.",
    tags: ["Bebedouro Industrial", "Pressão", "Empresas & Academias"],
  },
];

const purifierFaqs = [
  {
    q: "Vocês atendem bebedouros residenciais e de empresas?",
    a: "Sim! Atendemos desde purificadores de bancada domésticos até grandes bebedouros industriais e de coluna para empresas e academias.",
  },
  {
    q: "Quais marcas de purificadores vocês consertam?",
    a: "Trabalhamos com IBBL, Latina, Electrolux, Colormaq, Consul, Libell, Masterfrio e as principais marcas do mercado.",
  },
  {
    q: "De quanto em quanto tempo devo trocar o refil do filtro?",
    a: "Recomenda-se a troca do refil a cada 6 meses ou 3.000 litros de água para garantir a pureza microbiológica e a retenção de cloro.",
  },
  {
    q: "Qual a garantia do conserto?",
    a: "90 dias de garantia por escrito em todas as ordens de serviço emitidas pela Conserto Express.",
  },
];

const BebedourosPurificadores = () => {
  const WHATSAPP_PURIFICADOR = "Olá, gostaria de orçamento para conserto de purificador/bebedouro (Ref: #purificador-pocos)";

  return (
    <>
      <Helmet>
        <title>Assistência Técnica de Bebedouros e Purificadores em Poços de Caldas | Conserto Express</title>
        <meta
          name="description"
          content="Conserto de bebedouros, purificadores de água e troca de refil em Poços de Caldas. IBBL, Latina, Electrolux e Consul. Peças originais e 90 dias de garantia por escrito."
        />
        <link rel="canonical" href="https://consertoexpress.com.br/bebedouros-e-purificadores" />
      </Helmet>

      <div className="min-h-screen bg-[#0A141E] text-white">
        <Header currentRoute="/bebedouros-e-purificadores" whatsappMessage={WHATSAPP_PURIFICADOR} />

        <main>
          {/* Hero Section */}
          <Hero
            badgeRegion="Poços de Caldas / MG"
            badgeCredential="Residencial, Comercial & Industrial"
            title={
              <>
                Conserto de Bebedouros e<br />
                <span className="text-[#00A843]">Purificadores em Poços de Caldas</span>
              </>
            }
            description="Não gela a água, está vazando ou precisa de troca de refil e higienização? Atendimento técnico ágil em residências, consultórios e empresas com 90 dias de garantia."
            whatsappMessage={WHATSAPP_PURIFICADOR}
            bgPosition="18% center"
          />

          <Brands />

          {/* Sintomas de Bebedouros */}
          <section className="bg-[#F5F4F1] text-[#14212E] py-16 sm:py-24">
            <div className="container-max">
              <div className="max-w-[640px] mb-12">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
                  01 — Problemas Frequentes
                </div>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] mb-4">
                  Como está funcionando seu purificador?
                </h2>
                <p className="font-sans text-base text-[#68737E]">
                  Garantimos água pura, cristalina e gelada para a sua família ou empresa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {purifierProblems.map((p, idx) => {
                  const Icon = p.icon;
                  const waRefUrl = `https://wa.me/5535999587801?text=${encodeURIComponent(`Olá! Meu purificador/bebedouro está com o seguinte defeito: ${p.title} (Ref: #purificador-pocos)`)}`;

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
                        onClick={() => trackWhatsAppConversion(`purifier_problem_${idx}`)}
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
          <FAQ customFaqs={purifierFaqs} />
          <Contact whatsappMessage={WHATSAPP_PURIFICADOR} />
        </main>

        <Footer />
        <WhatsAppFloat whatsappMessage={WHATSAPP_PURIFICADOR} />
      </div>
    </>
  );
};

export default BebedourosPurificadores;
