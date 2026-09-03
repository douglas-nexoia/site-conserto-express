import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import DefectsCarousel, { DefectItem } from "@/components/DefectsCarousel";
import HowItWorks from "@/components/HowItWorks";
import Guarantee from "@/components/Guarantee";
import StoreLocation from "@/components/StoreLocation";
import Coverage from "@/components/Coverage";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { AlertCircle, Waves, Gauge, Disc3 } from "lucide-react";

const washerProblems: DefectItem[] = [
  {
    icon: Waves,
    title: "Não esvazia a água ou não centrifuga",
    desc: "Bomba de drenagem travada por moedas/grampos, atuador de freio danificado ou correia rompida. Desobstruímos o circuito e trocamos a bomba com peça original.",
    tags: ["Bomba travada", "Atuador de freio", "Correia"],
    whatsappRef: "Olá! Minha lavadora não esvazia a água ou não centrifuga (Ref: #lavadora-pocos)",
  },
  {
    icon: Disc3,
    title: "Barulho alto na centrifugação (parecendo turbina)",
    desc: "Desgaste nos rolamentos do tambor e retentor com vazamento de água na mecânica. Troca completa do kit de rolamentos e mecanismo com vedação nova.",
    tags: ["Rolamento", "Retentor de água", "Mecanismo"],
    whatsappRef: "Olá! Minha lavadora está com barulho muito alto ao centrifugar (Ref: #lavadora-pocos)",
  },
  {
    icon: AlertCircle,
    title: "Não liga, trava no meio da lavagem ou erro no painel",
    desc: "Pane na placa principal de comando ou na trava eletrônica da porta (muito frequente em Lava e Seca front load). Diagnóstico eletrônico no local.",
    tags: ["Placa de potência", "Trava de porta", "Lava e Seca"],
    whatsappRef: "Olá! Minha máquina trava no meio da lavagem ou não liga (Ref: #lavadora-pocos)",
  },
  {
    icon: Gauge,
    title: "Enche de água sem parar ou transborda",
    desc: "Defeito no pressostato de nível ou na válvula de entrada de água que não fecha a vedação. Substituição com peças originais e teste de estanqueidade.",
    tags: ["Pressostato", "Válvula d'água", "Sem transbordar"],
    whatsappRef: "Olá! Minha lavadora enche de água sem parar e transborda (Ref: #lavadora-pocos)",
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
  const WHATSAPP_LAVADORA = "Olá! Vim pelo site, gostaria de um atendimento.";

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

          {/* Carrossel Dinâmico de Defeitos da Lavadora */}
          <DefectsCarousel
            kicker="01 — Falhas Mais Comuns"
            title="O que está acontecendo com sua lavadora?"
            subtitle="Trabalhamos com diagnósticos precisos para evitar trocas desnecessárias de peças."
            items={washerProblems}
            conversionPrefix="washer_problem"
          />

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
