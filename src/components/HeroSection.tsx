import React, { useRef, useEffect } from 'react';
import { clinicConfig } from '../clinic.config';
import { ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { hero, meta, theme } = clinicConfig;

  const bgRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Smooth mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    targetPos.current = {
      x: -xRatio * 22,
      y: -yRatio * 14,
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
        bgRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) scale(1.04)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const handleBookingClick = () => {
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
      className="relative w-full bg-[#161416] select-none overflow-hidden
                 min-h-screen flex flex-col justify-between p-6 sm:p-8
                 lg:h-screen lg:max-h-screen lg:p-12"
    >
      {/* 1. Alive Background Canvas with Anti-Glare Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          ref={bgRef}
          className="absolute -inset-[3%] w-[106%] h-[106%] bg-cover bg-center will-change-transform"
          style={{ 
            backgroundImage: `url(${hero.bgImage})`,
            filter: 'brightness(0.92) contrast(1.02)'
          }}
        />

        {/* Global base fade for header and footer readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161416]/90 via-transparent to-black/40" />

        {/* Localized Anti-Glare Scrim behind the glass panel */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
      </div>

      {/* 2. Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto shrink-0 mb-8 lg:mb-0 pointer-events-none">
        <div className="flex items-center gap-3">
          <div 
            className="w-2.5 h-2.5 rounded-full animate-pulse" 
            style={{ 
              backgroundColor: theme.accentColor,
              boxShadow: `0 0 10px ${theme.accentColor}`
            }} 
          />
          <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
            {meta.name}
          </span>
        </div>

        <div className="route-glass-pill px-4 py-1.5 text-xs text-white/80 font-mono tracking-wider">
          {meta.cityState}
        </div>
      </header>

      {/* 3. Main Center Original Optical Glass Panel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center flex-1 min-h-0 my-auto py-6 lg:py-2">
        <div className="w-full max-w-2xl route-glass-panel p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tight-heading mb-3 max-w-xl drop-shadow-sm">
              {hero.headline}
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-white/80 font-normal leading-relaxed max-w-lg mb-6">
              {hero.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleBookingClick}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-xs tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              style={{
                backgroundColor: theme.accentColor,
                color: '#161416',
                boxShadow: `0 10px 25px -5px ${theme.accentColor}40`
              }}
            >
              <span>{hero.primaryCtaText}</span>
              <div className="w-5 h-5 rounded-full bg-[#161416] text-white flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </button>

            <div className="route-glass-pill px-4 py-2 text-[11px] text-white/80 font-medium">
              Private Concierge &bull; Discretion Assured
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Partner Affiliates */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-6 lg:pt-4 pb-2 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 pointer-events-none">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-10 opacity-60">
          {hero.partnerLogos.map((logo, idx) => (
            <span key={idx} className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white uppercase">
              {logo}
            </span>
          ))}
        </div>

        <div className="text-[10px] sm:text-[11px] text-white/50 font-mono tracking-wider shrink-0">
          SCROLL TO EXPLORE &rarr;
        </div>
      </footer>
    </section>
  );
};

export default HeroSection;
