import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    author: "Rodrigo Carvalho",
    region: "Jardim dos Estados, Poços de Caldas",
    rating: 5,
    date: "Avaliação Google",
    comment: "Minha geladeira parou de gelar na sexta-feira à tarde. Entrei em contato e o técnico veio no mesmo dia. Diagnosticou que era o relé e sensor de degelo, trocou na hora com peça original e deu garantia de 90 dias. Excelente atendimento!",
  },
  {
    author: "Mariana Alvarenga",
    region: "Centro, Poços de Caldas",
    rating: 5,
    date: "Avaliação Google",
    comment: "Minha máquina de lavar Electrolux não estava centrifugando e fazendo um barulho horrível. Fui até a loja deles na Virgílio Silva e agendei a visita. O técnico foi super pontual e honesto no orçamento. Recomendo demais!",
  },
  {
    author: "Cláudio Ferreira",
    region: "Cascatinha, Poços de Caldas",
    rating: 5,
    date: "Avaliação Google",
    comment: "Atendimento impecável no nosso bebedouro de coluna da empresa. Trocaram o refil, fizeram a higienização completa e o compressor voltou a gelar a água perfeitamente. Preço justo e nota fiscal certinha.",
  },
  {
    author: "Patrícia Nogueira",
    region: "Country Club, Poços de Caldas",
    rating: 5,
    date: "Avaliação Google",
    comment: "Empresa séria e com loja física na cidade, o que passa muita confiança. Consertaram a placa da minha lava e seca com muita agilidade. Já indiquei para minha família toda aqui em Poços.",
  },
];

const SocialProof = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel on mobile (4.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="bg-[#F5F4F1] text-[#14212E] py-16 sm:py-24">
      <div className="container-max">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-[600px]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
              06 — Prova Social
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] text-[#14212E]">
              O que dizem nossos clientes em Poços de Caldas
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E4E2DD] px-4 py-2 rounded-md shadow-sm">
            <div className="flex text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
              ))}
            </div>
            <span className="font-heading font-bold text-sm text-[#14212E]">4.8 / 5.0</span>
            <span className="font-sans text-xs text-[#68737E]">no Google</span>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E4E2DD] rounded-md p-6 flex flex-col justify-between hover:border-[#14212E] transition-colors shadow-sm"
            >
              <div>
                {/* Stars */}
                <div className="flex text-[#F59E0B] mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                  ))}
                </div>
                <p className="font-sans text-sm text-[#4A5568] leading-relaxed mb-6 italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E2DD]">
                <div className="font-heading font-bold text-sm text-[#14212E]">
                  {r.author}
                </div>
                <div className="font-sans text-xs text-[#68737E]">
                  {r.region}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Auto-play Carousel */}
        <div className="md:hidden">
          <div className="bg-white border border-[#E4E2DD] rounded-md p-6 shadow-sm min-h-[220px] flex flex-col justify-between">
            <div>
              <div className="flex text-[#F59E0B] mb-3">
                {[...Array(reviews[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                ))}
              </div>
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed mb-4 italic">
                "{reviews[currentSlide].comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#E4E2DD] flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-sm text-[#14212E]">
                  {reviews[currentSlide].author}
                </div>
                <div className="font-sans text-xs text-[#68737E]">
                  {reviews[currentSlide].region}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded border border-[#E4E2DD] text-[#14212E] hover:bg-[#F5F4F1]"
                  aria-label="Avaliação anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded border border-[#E4E2DD] text-[#14212E] hover:bg-[#F5F4F1]"
                  aria-label="Próxima avaliação"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === i ? "w-6 bg-[#00A843]" : "w-1.5 bg-[#E4E2DD]"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
