import { useState } from "react";

interface FAQProps {
  customFaqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "O conserto é feito na minha casa ou precisa levar o aparelho?",
    a: "Em mais de 95% dos casos o conserto é realizado 100% no seu endereço. Nossos técnicos levam peças de reposição e ferramental de diagnóstico na van.",
  },
  {
    q: "Qual a garantia oferecida pela Conserto Express?",
    a: "Oferecemos 90 dias de garantia por escrito em todas as ordens de serviço, cobrindo as peças novas e a mão de obra realizada.",
  },
  {
    q: "Onde fica a loja física da Conserto Express em Poços de Caldas?",
    a: "Estamos localizados na Rua Cel. Virgílio Silva, 1374 — Poços de Caldas / MG. Você pode vir nos visitar ou solicitar o técnico diretamente no seu endereço.",
  },
  {
    q: "Quais são as formas de pagamento aceitas?",
    a: "Aceitamos Pix, dinheiro e cartões de débito ou crédito parcelados diretamente com o técnico na maquininha após o término do serviço.",
  },
  {
    q: "Como solicitar um orçamento ou visita?",
    a: "Basta clicar em qualquer botão do WhatsApp deste site e nos enviar uma mensagem com o tipo de aparelho, a marca e o bairro. Respondemos em minutos!",
  },
];

const FAQ = ({ customFaqs }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = customFaqs || defaultFaqs;

  return (
    <section className="bg-[#0A141E] text-white py-16 sm:py-24 border-t border-white/10">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
              07 — Dúvidas Frequentes
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] mb-4">
              Perguntas frequentes
            </h2>
            <p className="font-sans text-base text-white/55 leading-relaxed">
              Tudo o que você precisa saber sobre valores, garantia, atendimento em domicílio e nossa loja física.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="border-b border-white/10 py-5 sm:py-6 cursor-pointer select-none group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading font-semibold text-base sm:text-lg text-white group-hover:text-[#00A843] transition-colors">
                      {faq.q}
                    </h3>
                    <span className="font-heading text-2xl font-light text-[#00A843] leading-none shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  {isOpen && (
                    <p className="font-sans text-sm sm:text-[15.5px] text-white/65 leading-relaxed mt-3.5 max-w-[620px]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
