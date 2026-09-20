import React, { useState } from 'react';
import { clinicConfig } from '../clinic.config';
import { ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';

type ModalityItem = (typeof clinicConfig.modalitiesSection.items)[number];

export const ModalitiesSection: React.FC = () => {
  const { modalitiesSection, theme } = clinicConfig;
  const items = modalitiesSection.items;

  const [activeTile, setActiveTile] = useState<ModalityItem>(items[0]);

  const handleCtaClick = () => {
    if (window.innerWidth >= 1024) {
      window.dispatchEvent(new CustomEvent('aura:jump-section', { detail: 3 }));
    } else {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full bg-[#FFFFFF] text-[#161416] select-none
                 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-8
                 h-auto min-h-screen flex flex-col justify-between px-5 py-8"
    >
      {/* 1. Header Taxonomy Bar */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto shrink-0 mb-4 lg:mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.accentColor }}
          />
          <span className="text-[10px] font-mono tracking-widest uppercase text-black/70 font-semibold">
            {modalitiesSection.badge}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/15 bg-black/[0.03] text-xs font-mono text-black/80">
          <Activity className="w-3.5 h-3.5 text-[#00807B]" />
          <span>PRECISION MEDICAL SPECIFICATION</span>
        </div>
      </header>

      {/* 2. Main Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 min-h-0 flex flex-col justify-center my-auto py-2">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:h-full lg:max-h-[500px]">
          
          {/* LEFT COLUMN: Editorial Headline & Active Spec Card (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-full py-1">
            {/* Top Text Block - High-Contrast Charcoal for Readability */}
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl lg:text-[30px] xl:text-[34px] font-bold text-[#111827] tight-heading leading-[1.18] tracking-tight mb-3">
                <span>{modalitiesSection.headlineBold} </span>
                <span className="text-[#4B5563] font-medium">
                  {modalitiesSection.headlineLight}
                </span>
              </h2>
            </div>

            {/* Middle: Active Modality Card with Darker, Crisp Text */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.03] border border-black/10 transition-all duration-300 mb-4 lg:mb-0 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#00807B] font-bold">
                  {activeTile.category}
                </span>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-black/[0.06] text-black">
                  {activeTile.downtime}
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[#111827] mb-1.5">
                {activeTile.name}{' '}
                <span className="text-[#4B5563] font-medium text-xs">&bull; {activeTile.badge}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
                {activeTile.description}
              </p>
            </div>

            {/* Bottom: Direct Action Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2.5 py-3 px-6 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                style={{
                  backgroundColor: theme.accentColor,
                  color: '#161416',
                }}
              >
                <div className="w-5 h-5 rounded-full bg-[#161416] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
                <span>{modalitiesSection.ctaText}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 6 Tactile Bento Tiles (5 Cols) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:h-full mt-6 lg:mt-0">
            <div className="grid grid-cols-3 gap-3 w-full max-w-[360px]">
              {items.map((item) => {
                const isActive = activeTile.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveTile(item)}
                    onClick={() => setActiveTile(item)}
                    className={`group relative aspect-square rounded-2xl p-3 flex flex-col items-center justify-center transition-all duration-300 transform cursor-pointer border shadow-md ${
                      item.bgGradient.startsWith('from-')
                        ? `bg-gradient-to-br ${item.bgGradient}`
                        : 'bg-[#161416]'
                    } ${
                      isActive
                        ? 'scale-[1.05] -translate-y-1 ring-3 ring-[#7BF0EB] ring-offset-2 ring-offset-white border-transparent'
                        : 'hover:scale-[1.02] hover:-translate-y-0.5 border-black/10'
                    }`}
                  >
                    {/* Inner Acronym Glyph */}
                    <span
                      className="text-lg sm:text-xl font-black tracking-tight drop-shadow-md select-none font-mono"
                      style={{ color: item.textColor }}
                    >
                      {item.iconLabel}
                    </span>

                    {/* Subtitle tag */}
                    <span
                      className="text-[8px] font-mono tracking-widest uppercase mt-1.5 opacity-90 truncate max-w-full font-semibold"
                      style={{ color: item.textColor }}
                    >
                      {item.name.split(' ')[0]}
                    </span>

                    {/* Active Dot */}
                    {isActive && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7BF0EB] shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Footer Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-4 mt-6 lg:mt-0 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#374151] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-black/80" />
          <span>FDA & CE CLEARED CLINICAL MODALITIES &bull; BEVERLY HILLS</span>
        </div>
        <div className="text-[10px] font-mono text-[#4B5563]">
          SELECT ANY TILE TO AUDIT CLINICAL SPEC
        </div>
      </footer>
    </section>
  );
};

export default ModalitiesSection;
