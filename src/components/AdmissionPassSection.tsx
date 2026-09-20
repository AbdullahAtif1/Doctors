import React, { useState } from 'react';
import { clinicConfig } from '../clinic.config';
import { ArrowUpRight, ShieldCheck, Check, Car } from 'lucide-react';

export const AdmissionPassSection: React.FC = () => {
  const { admissionPassSection, theme } = clinicConfig;
  const { card } = admissionPassSection;

  const [valetEnabled, setValetEnabled] = useState(true);
  const [passConfirmed, setPassConfirmed] = useState(false);

  const handleGoToBooking = () => {
    setPassConfirmed(true);
    setTimeout(() => {
      if (window.innerWidth >= 1024) {
        window.dispatchEvent(new CustomEvent('aura:jump-section', { detail: 3 }));
      } else {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  return (
    <section
      className="relative w-full bg-[#161416] text-white select-none overflow-hidden
                 lg:h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-8
                 h-auto min-h-screen flex flex-col justify-between px-5 py-8"
    >
      {/* 1. Top Header Row */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto shrink-0 mb-4 lg:mb-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.accentColor }}
          />
          <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 font-semibold">
            {admissionPassSection.badge}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-white/80">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7BF0EB]" />
          <span>ZERO PUBLIC WAITING ROOMS</span>
        </div>
      </header>

      {/* 2. Main Split Content Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 min-h-0 flex items-center justify-center my-auto py-2">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Clear Human Headline & Direct CTA (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-xl">
            <div className="text-4xl sm:text-6xl lg:text-[72px] font-bold text-white tight-heading leading-[1.05] tracking-tight mb-6">
              <span className="block">{admissionPassSection.headlineBold}</span>
              <span className="block text-white/40">{admissionPassSection.headlineLight}</span>
            </div>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg mb-8 font-normal">
              {admissionPassSection.description}
            </p>

            <div>
              <button
                type="button"
                onClick={handleGoToBooking}
                className="inline-flex items-center gap-3 py-3.5 px-7 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
                style={{
                  backgroundColor: theme.accentColor,
                  color: '#161416',
                }}
              >
                <span>{admissionPassSection.ctaText}</span>
                <div className="w-5 h-5 rounded-full bg-[#161416] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Cyan Pedestal + Interactive Suite Pass Card (5 Cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div
              className="w-full max-w-[420px] rounded-[36px] p-6 sm:p-7 shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01]"
              style={{ backgroundColor: theme.accentColor }}
            >
              {/* White Upper Content Card */}
              <div className="bg-white text-[#161416] rounded-2xl p-4 sm:p-5 shadow-sm mb-4 flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-black/10"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#00807B] font-bold block mb-0.5">
                    {card.tier}
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-black truncate leading-snug">
                    {card.suiteName}
                  </h4>
                  <span className="text-xs text-black/70 font-medium block mt-1">
                    {card.estimatedStay}
                  </span>
                </div>
              </div>

              {/* White Valet Toggle Option */}
              <div
                onClick={() => setValetEnabled(!valetEnabled)}
                className="bg-white text-[#161416] rounded-2xl p-3.5 sm:p-4 shadow-sm mb-4 flex items-center justify-between cursor-pointer border border-black/5 hover:border-black/20 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                      valetEnabled ? 'bg-[#161416] text-[#7BF0EB]' : 'border-2 border-black/30'
                    }`}
                  >
                    {valetEnabled && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-black block leading-tight truncate">
                      {card.protocolToggleLabel}
                    </span>
                    <span className="text-[11px] text-black/60 font-medium">
                      Private Garage &bull; {card.protocolFee}
                    </span>
                  </div>
                </div>
                <Car className="w-4 h-4 text-black/40 shrink-0" />
              </div>

              {/* Solid Obsidian Action Button */}
              <button
                type="button"
                onClick={handleGoToBooking}
                className="w-full py-4 rounded-2xl bg-[#161416] text-white hover:bg-black font-extrabold text-xs tracking-wider uppercase shadow-md active:scale-[0.99] transition-all cursor-pointer mb-2 flex items-center justify-center gap-2"
              >
                {passConfirmed ? (
                  <span>Opening Calendar &rarr;</span>
                ) : (
                  <span>{card.actionButtonText}</span>
                )}
              </button>

              {/* Minimal Clear Fallback Link */}
              <button
                type="button"
                onClick={() => setValetEnabled(false)}
                className="text-[11px] text-[#161416]/80 hover:text-[#161416] underline underline-offset-2 text-center transition-colors py-1 cursor-pointer font-medium"
              >
                {card.fallbackLinkText}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Footer Row */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-3 border-t border-white/10 flex items-center justify-between shrink-0 pointer-events-none">
        <div className="text-[10px] font-mono text-white/50">
          BEVERLY HILLS &bull; PRIVATE RECOVERY PAVILION
        </div>
        <div className="text-[10px] font-mono text-[#7BF0EB] font-medium">
          CONFIDENTIAL INTAKE
        </div>
      </footer>
    </section>
  );
};

export default AdmissionPassSection;
