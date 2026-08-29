import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Guarantee from "@/components/Guarantee";
import StoreLocation from "@/components/StoreLocation";
import Coverage from "@/components/Coverage";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { AlertTriangle, Droplets, Zap, Wrench, ArrowRight } from "lucide-react";
import { trackWhatsAppConversion } from "@/lib/tracking";

const fridgeProblems = [
  {
    icon: AlertTriangle,
    title: "Parte de baixo não gela ou freezer bloqueando de gelo",
    desc: "Problema clássico em geladeiras Frost Free: defeito no sensor de degelo, termofusível ou resistência queimada bloqueando a circulação do ar frio.",
    tags: ["Frost Free", "Sensor de Degelo", "Resistência", "Ventilador"],
  },
  {
    icon: Droplets,
    title: "Vazamento de água embaixo ou dentro da gaveta",
    desc: "Dreno de degelo entupido com limo ou calha de escoamento desnivelada, fazendo a água transbordar para o piso da sua cozinha.",
    tags: ["Dreno entupido", "Calha", "Bandeja evaporadora"],
  },
  {
    icon: Zap,
    title: "Motor (compressor) estala e não liga ou fica apitando",
    desc: "Falha no relé de partida, protetor térmico desarmando ou queima do compressor. Teste elétrico e substituição por motor original com gás ecológico.",
    tags: ["Troca de motor", "Relé de partida", "Gás ecológico R600a"],
  },
  {
    icon: Wrench,
    title: "Placa eletrônica Inverter piscando ou travada",
    desc: "Oscilações de energia que danificam a placa de controle de refrigeradores Inverter, Side by Side e French Door. Diagnóstico no local.",
    tags: ["Side by Side", "French Door", "Inverter"],
  },
];

const Index = () => {
  const WHATSAPP_GELADEIRA = "Olá, preciso de conserto na minha geladeira (Ref: #geladeira-pocos)";

  return (
    <>
      <Helmet>
        <title>Conserto de Geladeiras e Freezers em Poços de Caldas | Conserto Express</title>
        <meta
          name="description"
          content="Assistência técnica especializada em Geladeiras e Freezers em Poços de Caldas. Atendimento rápido no seu endereço com garantia de 90 dias por escrito e peças originais. Loja física na R. Cel. Virgílio Silva, 1374."
        />
        <link rel="canonical" href="https://consertoexpress.com.br/" />
      </Helmet>

      <div className="min-h-screen bg-[#0A141E] text-white">
        <Header currentRoute="/" whatsappMessage={WHATSAPP_GELADEIRA} />

        <main>
          {/* Hero with Real Facade Background & Calibrated 18% position to hide adjacent building on the left */}
          <Hero
            badgeRegion="Poços de Caldas / MG"
            badgeCredential="Loja Física na R. Cel. Virgílio Silva, 1374"
            title={
              <>
                Conserto de Geladeiras e<br />
                <span className="text-[#00A843]">Freezers em Poços de Caldas</span>
              </>
            }
            description="Não gela, está vazando água ou motor não liga? Atendimento técnico rápido no seu endereço com loja física própria, peças originais e 90 dias de garantia por escrito."
            whatsappMessage={WHATSAPP_GELADEIRA}
            bgPosition="18% center"
          />

          <Brands />

          {/* Sintomas Mais Frequentes de Geladeiras */}
          <section className="bg-[#F5F4F1] text-[#14212E] py-16 sm:py-24">
            <div className="container-max">
              <div className="max-w-[640px] mb-12">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
                  01 — Diagnóstico Especializado
                </div>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] mb-4">
                  Qual é o defeito da sua geladeira?
                </h2>
                <p className="font-sans text-base text-[#68737E]">
                  Trabalhamos com equipamentos de precisão para identificar o componente com falha na primeira visita.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fridgeProblems.map((p, idx) => {
                  const Icon = p.icon;
                  const waRefUrl = `https://wa.me/5535999587801?text=${encodeURIComponent(`Olá! Minha geladeira está com o seguinte defeito: ${p.title} (Ref: #geladeira-pocos)`)}`;

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
                        onClick={() => trackWhatsAppConversion(`fridge_problem_${idx}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans font-semibold text-sm text-[#00A843] hover:text-[#008F39] pt-4 border-t border-[#E4E2DD]"
                      >
                        <span>Pedir conserto deste defeito</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <Services />
          <HowItWorks />
          <Guarantee />
          <StoreLocation />
          <Coverage />
          <SocialProof />
          <FAQ />
          <Contact whatsappMessage={WHATSAPP_GELADEIRA} />
        </main>

        <Footer />
        <WhatsAppFloat whatsappMessage={WHATSAPP_GELADEIRA} />
      </div>
    </>
  );
};

export default Index;
