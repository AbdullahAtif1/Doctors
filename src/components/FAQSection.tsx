import React, { useState, useRef, useEffect } from 'react';
import { clinicConfig } from '../clinic.config';
import { ArrowUpRight, ShieldCheck, Star } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqSection, theme } = clinicConfig;
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  // Subtle Mouse Parallax Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    targetPos.current = {
      x: -xRatio * 26,
      y: -yRatio * 16,
    };
  };

  const handleMouseLeave = () => {
    targetPos.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    const loop = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.05;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) scale(1.05)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const handleCtaClick = () => {
    if (window.innerWidth >= 1024) {
      window.dispatchEvent(new CustomEvent('aura:jump-section', { detail: 3 }));
    } else {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#0E1214] text-white select-none overflow-hidden
                 lg:h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-8
                 h-auto min-h-screen flex flex-col justify-between px-5 py-8"
    >
      {/* 1. Sunny Island Midday Scenery with Mouse Displacement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={bgRef}
          className="absolute -inset-[4%] w-[108%] h-[108%] bg-cover bg-center filter brightness-[0.78] contrast-[1.05] saturate-[1.08] will-change-transform"
          style={{ backgroundImage: `url(${faqSection.bgImage})` }}
        />

        {/* Ambient daylight top gradient for clean status text contrast */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />
        {/* Ground shadow blend */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* 2. Top Header Taxonomy */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto shrink-0 mb-4 lg:mb-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shadow-[0_0_10px_#7BF0EB]"
            style={{ backgroundColor: theme.accentColor }}
          />
          <span className="text-[10px] font-mono tracking-widest uppercase text-white font-semibold drop-shadow-md">
            {faqSection.badge}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-white/90 drop-shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7BF0EB]" />
          <span>VERIFIED CLINICAL PROTOCOL</span>
        </div>
      </header>

      {/* 3. Center Frosted Glass Card (Coastal Cyan & Obsidian Glass) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 min-h-0 flex items-center justify-center my-auto py-2">
        <div
          className="w-full rounded-[36px] border border-white/30 shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between lg:max-h-[530px] overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(14, 38, 42, 0.45) 0%, rgba(14, 18, 22, 0.78) 100%)',
            backdropFilter: 'blur(36px)',
            WebkitBackdropFilter: 'blur(36px)',
            boxShadow:
              '0 30px 70px -15px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          }}
        >
          {/* Top Row: Subtitle, Main Headline & Action Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#7BF0EB] uppercase mb-1 font-semibold">
                CLEAR ANSWERS &bull; ZERO GUESSWORK
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tight-heading leading-tight tracking-tight drop-shadow-sm">
                {faqSection.headline}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-3 py-3.5 px-6 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl cursor-pointer self-start sm:self-auto shrink-0"
              style={{
                backgroundColor: theme.accentColor,
                color: '#161416',
              }}
            >
              <div className="w-5 h-5 rounded-full bg-[#161416] text-white flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3" />
              </div>
              <span>{faqSection.ctaText}</span>
            </button>
          </div>

          {/* Bottom Row: 4 Columns with Larger High-Readability Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 overflow-y-auto lg:overflow-visible">
            {faqSection.items.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => toggleFaq(item.id)}
                  className="flex flex-col justify-between cursor-pointer group transition-all"
                >
                  <div>
                    {/* 5 Rating Stars */}
                    <div className="flex items-center gap-1 mb-2.5 text-white">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className="w-3.5 h-3.5 fill-[#7BF0EB] stroke-none group-hover:scale-110 transition-transform"
                        />
                      ))}
                    </div>

                    {/* Question (Enlarged) */}
                    <h3 className="text-base lg:text-[17px] font-bold text-white leading-snug mb-2.5 group-hover:text-[#7BF0EB] transition-colors">
                      {item.question}
                    </h3>

                    {/* Answer (Enlarged and Higher Contrast) */}
                    <p className="text-[13px] lg:text-sm text-white/95 font-normal leading-relaxed mb-4">
                      {item.answer}
                    </p>
                  </div>

                  {/* Moniker & Department (Clearer Tags) */}
                  <div className="pt-2.5 border-t border-white/20">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase block">
                      {item.authorMoniker}
                    </span>
                    <span className="text-[10px] font-mono text-white/70 tracking-wider uppercase block">
                      {item.authorRole}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 4. Footer Compliance Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-3 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 pointer-events-none">
        <div className="text-[10px] font-mono text-white/80 drop-shadow-sm">
          BEVERLY HILLS &bull; 24/7 PATIENT CONCIERGE ACCESS
        </div>
        <div className="text-[10px] font-mono text-[#7BF0EB] drop-shadow-sm font-semibold">
          100% PRIVATE &bull; DISCREET BILLING
        </div>
      </footer>
    </section>
  );
};

export default FAQSection;