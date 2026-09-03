import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Services from "@/components/Services";
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
import { AlertTriangle, Droplets, Zap, Wrench } from "lucide-react";

const fridgeProblems: DefectItem[] = [
  {
    icon: AlertTriangle,
    title: "Parte de baixo não gela ou freezer bloqueando de gelo",
    desc: "Problema clássico em geladeiras Frost Free: defeito no sensor de degelo, termofusível ou resistência queimada bloqueando a circulação do ar frio.",
    tags: ["Frost Free", "Sensor de Degelo", "Resistência", "Ventilador"],
    whatsappRef: "Olá! Minha geladeira não está gelando embaixo ou bloqueando gelo (Ref: #geladeira-pocos)",
  },
  {
    icon: Droplets,
    title: "Vazamento de água embaixo ou dentro da gaveta",
    desc: "Dreno de degelo entupido com limo ou calha de escoamento desnivelada, fazendo a água transbordar para o piso da sua cozinha.",
    tags: ["Dreno entupido", "Calha", "Bandeja evaporadora"],
    whatsappRef: "Olá! Minha geladeira está vazando água embaixo (Ref: #geladeira-pocos)",
  },
  {
    icon: Zap,
    title: "Motor (compressor) estala e não liga ou fica apitando",
    desc: "Falha no relé de partida, protetor térmico desarmando ou queima do compressor. Teste elétrico e substituição por motor original com gás ecológico.",
    tags: ["Troca de motor", "Relé de partida", "Gás ecológico R600a"],
    whatsappRef: "Olá! O motor da minha geladeira não liga ou fica estalando (Ref: #geladeira-pocos)",
  },
  {
    icon: Wrench,
    title: "Placa eletrônica Inverter piscando ou travada",
    desc: "Oscilações de energia que danificam a placa de controle de refrigeradores Inverter, Side by Side e French Door. Diagnóstico no local.",
    tags: ["Side by Side", "French Door", "Inverter", "Placa"],
    whatsappRef: "Olá! Minha geladeira Inverter está com a placa piscando/travada (Ref: #geladeira-pocos)",
  },
];

const Index = () => {
  const WHATSAPP_GELADEIRA = "Olá! Vim pelo site, gostaria de um atendimento.";

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

          {/* Carrossel Dinâmico de Defeitos de Geladeira */}
          <DefectsCarousel
            kicker="01 — Diagnóstico Especializado"
            title="Qual é o defeito da sua geladeira?"
            subtitle="Trabalhamos com equipamentos de precisão para identificar o componente com falha na primeira visita."
            items={fridgeProblems}
            conversionPrefix="fridge_problem"
          />

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
