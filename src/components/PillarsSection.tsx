import React, { useState, useEffect } from 'react';
import { clinicConfig } from '../clinic.config';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const PillarsSection: React.FC = () => {
  const { pillarsSection, theme } = clinicConfig;
  const cards = pillarsSection.cards;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handlePillarStep = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === 'number') {
        setActiveIndex(customEvent.detail);
      }
    };

    window.addEventListener('aura:pillar-step', handlePillarStep);
    return () => window.removeEventListener('aura:pillar-step', handlePillarStep);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleBookMeeting = () => {
    if (window.innerWidth >= 1024) {
      window.dispatchEvent(new CustomEvent('aura:jump-section', { detail: 3 }));
    } else {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full bg-[#161416] select-none
                 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-10
                 min-h-screen px-5 py-10"
    >
      {/* Background ambient bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] rounded-full pointer-events-none opacity-10 blur-[130px]"
        style={{ backgroundColor: theme.accentColor }}
      />

      {/* 1. Header Row */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto shrink-0 mb-4 lg:mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accentColor }}
            />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">
              {pillarsSection.badge}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-white tight-heading leading-snug">
            {pillarsSection.headline}
          </h2>
        </div>

        {/* Step Indicator & Controls (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="route-glass-pill px-3.5 py-1.5 text-xs font-mono text-white/80">
            0{activeIndex + 1} / 0{cards.length}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeIndex === 0
                  ? 'opacity-30 border border-white/10 cursor-not-allowed'
                  : 'route-glass-pill text-white hover:border-white/40'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === cards.length - 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeIndex === cards.length - 1
                  ? 'opacity-30 border border-white/10 cursor-not-allowed'
                  : 'route-glass-pill text-white hover:border-white/40'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2A. Desktop Mode: Animated Stacking Deck */}
      <div className="relative z-10 w-full max-w-7xl mx-auto hidden lg:flex flex-1 min-h-0 items-center justify-center py-4">
        <div className="relative w-full h-[330px]">
          {cards.map((card, idx) => {
            const isPassed = idx < activeIndex;
            const isActive = idx === activeIndex;
            const isAhead = idx > activeIndex;

            let translateX = '0%';
            let scale = 1;
            let opacity = 1;
            let zIndex = isActive ? 20 : isAhead ? 25 + idx : 10 + idx;
            const leftOffset = isPassed ? `${(idx - activeIndex) * 22}px` : '0px';

            if (isAhead) {
              translateX = '105%';
              opacity = 1;
            } else if (isActive) {
              translateX = '0%';
              scale = 1;
              opacity = 1;
            } else if (isPassed) {
              translateX = leftOffset;
              scale = 1 - (activeIndex - idx) * 0.02;
              opacity = 0.55;
            }

            return (
              <div
                key={card.id}
                style={{
                  transform: `translateX(${translateX}) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition:
                    'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease, scale 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow:
                    isActive || isAhead
                      ? '-25px 0 50px -10px rgba(0, 0, 0, 0.7)'
                      : 'none',
                  borderLeft: isPassed
                    ? '2px solid rgba(123, 240, 235, 0.5)'
                    : undefined,
                }}
                className="absolute inset-0 w-full h-full route-glass-panel p-6 lg:p-7 grid grid-cols-12 gap-8 items-center"
              >
                {/* Left Typography Bay */}
                <div className="col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="route-glass-pill px-3 py-1 text-[10px] font-mono text-white/80 uppercase mb-2 inline-block">
                      {card.tag}
                    </span>
                    <h3 className="text-2xl lg:text-[28px] font-bold text-white tight-heading mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-white/80 font-normal leading-relaxed max-w-lg mb-3">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between pt-2.5 border-t border-white/10">
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className="text-3xl lg:text-4xl font-bold tight-heading"
                        style={{ color: theme.accentColor }}
                      >
                        {card.metric}
                      </span>
                      <span className="text-[11px] font-mono text-white/60 tracking-wider uppercase">
                        {card.metricLabel}
                      </span>
                    </div>

                    <button
                      onClick={handleBookMeeting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                      style={{
                        backgroundColor: theme.accentColor,
                        color: '#161416',
                      }}
                    >
                      <span>Book Meeting</span>
                      <div className="w-5 h-5 rounded-full bg-[#161416] text-white flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Right Visual Bay */}
                <div className="col-span-5 h-full relative rounded-2xl overflow-hidden border border-white/15 shadow-inner">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2B. Mobile Mode: Route-style Sticky Stacking Deck */}
      <div className="relative flex flex-col lg:hidden my-6">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            style={{
              top: `${64 + idx * 16}px`,
              zIndex: 10 + idx,
              marginBottom: idx === cards.length - 1 ? '1.5rem' : '3.5rem',
            }}
            className="sticky route-glass-panel p-6 flex flex-col gap-4 shadow-2xl border border-white/15 rounded-3xl bg-[#1D1A1E]"
          >
            <div className="flex items-center justify-between">
              <span className="route-glass-pill px-3 py-1 text-[10px] font-mono text-white/80 uppercase">
                {card.tag}
              </span>
              <span className="text-xs font-mono text-white/50">
                0{idx + 1} / 0{cards.length}
              </span>
            </div>

            <div
              className="w-full h-44 rounded-2xl bg-cover bg-center border border-white/10"
              style={{ backgroundImage: `url(${card.image})` }}
            />

            <div>
              <h3 className="text-xl font-bold text-white tight-heading mb-1.5">
                {card.title}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold"
                  style={{ color: theme.accentColor }}
                >
                  {card.metric}
                </span>
                <span className="text-[10px] font-mono text-white/50 uppercase">
                  {card.metricLabel}
                </span>
              </div>
              <button
                onClick={handleBookMeeting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider"
                style={{
                  backgroundColor: theme.accentColor,
                  color: '#161416',
                }}
              >
                <span>Book Meeting</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Compliance Badges */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-2 shrink-0">
        <div className="text-[10px] font-mono tracking-widest text-center uppercase text-white/40 mb-2">
          {pillarsSection.complianceTitle}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pillarsSection.certifications.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 lg:p-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center gap-3.5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  borderColor: theme.accentColor,
                  boxShadow: `0 0 10px ${theme.accentColor}30`,
                }}
              >
                <span
                  className="text-[9px] font-mono font-bold"
                  style={{ color: theme.accentColor }}
                >
                  {item.code}
                </span>
              </div>

              <div>
                <div className="text-xs font-semibold text-white tracking-wide">
                  {item.label}
                </div>
                <div className="text-[10px] text-white/50 font-mono">
                  {item.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </section>
  );
};

export default PillarsSection;
