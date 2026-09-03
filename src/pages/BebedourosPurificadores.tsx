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
import { Droplets, Sparkles, ShieldCheck, Wrench } from "lucide-react";

const purifierProblems: DefectItem[] = [
  {
    icon: Droplets,
    title: "Água não gela ou termostato desregulado",
    desc: "Problema no compressor, falta de gás refrigerante ou termostato de controle térmico inoperante. Diagnóstico rápido para você voltar a ter água gelada.",
    tags: ["Termostato", "Compressor", "Carga de Gás"],
    whatsappRef: "Olá! Meu purificador/bebedouro não está gelando a água (Ref: #purificador-pocos)",
  },
  {
    icon: Sparkles,
    title: "Troca de Refil / Filtro & Higienização Interna",
    desc: "Substituição do elemento filtrante por refil original e sanitização do reservatório com bactericida para eliminar gosto de cloro e impurezas.",
    tags: ["Refil Original", "Anti-Cloro", "Higienização"],
    whatsappRef: "Olá! Preciso de troca de refil e higienização no meu purificador (Ref: #purificador-pocos)",
  },
  {
    icon: Wrench,
    title: "Pingando na torneira ou vazamento pela base",
    desc: "Válvula solenoide travada, conexões de engate rápido com folga ou torneira ressecada. Reparo com substituição de componentes vedantes.",
    tags: ["Torneira", "Engate Rápido", "Sem Vazamento"],
    whatsappRef: "Olá! Meu purificador está com vazamento ou pingando na torneira (Ref: #purificador-pocos)",
  },
  {
    icon: ShieldCheck,
    title: "Bebedouros Industriais & Comerciais",
    desc: "Manutenção de bebedouros de pressão, bebedouros de coluna e industriais de 25L, 50L e 100L para empresas, academias e comércios.",
    tags: ["Bebedouro Industrial", "Pressão", "Empresas & Academias"],
    whatsappRef: "Olá! Preciso de manutenção em bebedouro industrial/comercial (Ref: #purificador-pocos)",
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
  const WHATSAPP_PURIFICADOR = "Olá! Vim pelo site, gostaria de um atendimento.";

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

          {/* Carrossel Dinâmico de Defeitos de Bebedouros */}
          <DefectsCarousel
            kicker="01 — Problemas Frequentes"
            title="Como está funcionando seu purificador?"
            subtitle="Garantimos água pura, cristalina e gelada para a sua família ou empresa."
            items={purifierProblems}
            conversionPrefix="purifier_problem"
          />

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
