import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { trackWhatsAppConversion } from "@/lib/tracking";

export interface DefectItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  whatsappRef: string;
}

interface DefectsCarouselProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  items: DefectItem[];
  conversionPrefix?: string;
}

const DefectsCarousel = ({
  kicker = "01 — Diagnóstico Especializado",
  title,
  subtitle = "Trabalhamos com equipamentos de precisão para identificar o componente com falha na primeira visita.",
  items,
  conversionPrefix = "defect",
}: DefectsCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play every 4.5 seconds (pauses when user hovers or interacts)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="bg-[#F5F4F1] text-[#14212E] py-14 sm:py-20">
      <div className="container-max">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00A843] mb-3">
              {kicker}
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] mb-3 text-[#14212E]">
              {title}
            </h2>
            <p className="font-sans text-base text-[#68737E]">
              {subtitle}
            </p>
          </div>

          {/* Desktop & Tablet Carousel Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <button
              onClick={prevSlide}
              className="p-3 rounded-md border border-[#E4E2DD] bg-white text-[#14212E] hover:bg-[#EDEBE6] hover:border-[#14212E] transition-all active:scale-95 shadow-sm"
              aria-label="Defeito anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-md border border-[#E4E2DD] bg-white text-[#14212E] hover:bg-[#EDEBE6] hover:border-[#14212E] transition-all active:scale-95 shadow-sm"
              aria-label="Próximo defeito"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop View: 2 cards at a time showing current & next */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {[0, 1].map((offset) => {
              const itemIndex = (currentSlide + offset) % items.length;
              const item = items[itemIndex];
              const Icon = item.icon;
              const waUrl = `https://wa.me/5535999587581?text=${encodeURIComponent(item.whatsappRef)}`;

              return (
                <div
                  key={`${itemIndex}-${offset}`}
                  className="bg-white border border-[#E4E2DD] rounded-xl p-7 sm:p-8 flex flex-col justify-between hover:border-[#14212E] hover:shadow-lg transition-all duration-300 min-h-[340px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-lg bg-[#F2F0EC] flex items-center justify-center text-[#00A843]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#9AA2AC]">
                        0{itemIndex + 1} / 0{items.length}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#14212E] mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[#68737E] leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="font-sans text-xs text-[#5A646E] bg-[#F2F0EC] rounded-md px-3 py-1 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={waUrl}
                    onClick={() => trackWhatsAppConversion(`${conversionPrefix}_${itemIndex}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans font-bold text-sm sm:text-base text-[#00A843] hover:text-[#008F39] pt-4 border-t border-[#E4E2DD] transition-colors group"
                  >
                    <span>Pedir conserto deste defeito</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Mobile View: 1 card with full focus and fluid height */}
          <div className="md:hidden">
            {(() => {
              const item = items[currentSlide];
              const Icon = item.icon;
              const waUrl = `https://wa.me/5535999587581?text=${encodeURIComponent(item.whatsappRef)}`;

              return (
                <div className="bg-white border border-[#E4E2DD] rounded-xl p-6 flex flex-col justify-between shadow-md min-h-[320px] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg bg-[#F2F0EC] flex items-center justify-center text-[#00A843]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#9AA2AC]">
                        0{currentSlide + 1} / 0{items.length}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#14212E] mb-2.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-[#68737E] leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="font-sans text-xs text-[#5A646E] bg-[#F2F0EC] rounded px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={waUrl}
                    onClick={() => trackWhatsAppConversion(`${conversionPrefix}_${currentSlide}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans font-bold text-sm text-[#00A843] hover:text-[#008F39] pt-4 border-t border-[#E4E2DD]"
                  >
                    <span>Pedir conserto deste defeito</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })()}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === i
                    ? "w-8 bg-[#00A843]"
                    : "w-2 bg-[#D1CFC9] hover:bg-[#9AA2AC]"
                }`}
                aria-label={`Ir para defeito ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefectsCarousel;
