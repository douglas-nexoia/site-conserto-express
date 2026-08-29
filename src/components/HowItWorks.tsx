const steps = [
  {
    num: "01",
    title: "Contato pelo WhatsApp",
    desc: "Você nos informa qual é o aparelho, a marca e o defeito observado. Nós alinhamos o horário mais conveniente para a visita técnica.",
  },
  {
    num: "02",
    title: "Diagnóstico no Seu Endereço",
    desc: "O técnico da Conserto Express vai até o seu imóvel em Poços de Caldas com ferramental completo e peças para testar o equipamento.",
  },
  {
    num: "03",
    title: "Orçamento Claro & Sem Surpresas",
    desc: "Explicamos exatamente qual peça precisa ser reparada ou substituída e passamos o valor antes de iniciar qualquer serviço.",
  },
  {
    num: "04",
    title: "Conserto no Local & Garantia de 90 Dias",
    desc: "Com sua aprovação, o serviço é realizado no local, seu eletrodoméstico volta a funcionar e você recebe a garantia de 90 dias por escrito.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#0A141E] text-white py-16 sm:py-24 border-t border-white/10">
      <div className="container-max">
        {/* Section Header */}
        <div className="max-w-[600px] mb-14">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
            02 — Processo
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] text-white">
            Como funciona o atendimento
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => (
            <div key={idx} className="relative flex flex-col justify-between">
              <div>
                <div className="font-mono text-3xl font-bold text-[#00A843] mb-4">
                  {s.num}
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2.5">
                  {s.title}
                </h3>
                <p className="font-sans text-sm text-white/65 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
