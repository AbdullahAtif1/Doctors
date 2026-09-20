import React, { useState, useEffect, useRef } from 'react';
import { navMenuItems, clinicConfig } from '../clinic.config';
import { Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react';

interface CurtainNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectSection: (sectionIndex: number) => void;
}

export const CurtainNav: React.FC<CurtainNavProps> = ({
  isOpen,
  onToggle,
  onSelectSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Lock mobile body scroll when modal overlay is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMobileSelect = (index: number) => {
    setMobileMenuOpen(false);
    onSelectSection(index);
  };

  const handleMenuTrackWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY * 1.5;
    }
  };

  const handleDesktopCardClick = (sectionIndex: number) => {
    onSelectSection(sectionIndex);
    setTimeout(() => {
      onToggle();
    }, 380);
  };

  return (
    <>
      {/* =========================================================
          1. MOBILE TOP FROSTED HEADER
         ========================================================= */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 p-4 select-none pointer-events-none">
        <header className="w-full max-w-md mx-auto flex items-center justify-between px-5 py-3 rounded-full bg-[#111012]/80 backdrop-blur-xl border border-white/15 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7BF0EB]" />
            <span className="text-base font-bold tracking-tight text-white">
              {clinicConfig.meta.name.split(' ')[0]}
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/90 uppercase px-3 py-1.5 rounded-full bg-white/5 border border-white/10 active:scale-95 transition-all cursor-pointer"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-3.5 h-3.5 text-[#7BF0EB]" />
            <span>Menu</span>
          </button>
        </header>
      </div>

      {/* =========================================================
          2. MOBILE OVERLAY DRAWER (Plain English Labels)
         ========================================================= */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] bg-[#0E0D0E]/95 backdrop-blur-2xl flex flex-col justify-between p-6 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7BF0EB]" />
            <span className="text-xs font-mono tracking-widest text-white/70 uppercase">
              SECTIONS
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            aria-label="Close mobile menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vertical Links List */}
        <nav className="flex flex-col gap-2 my-auto py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navMenuItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleMobileSelect(item.sectionIndex)}
              className="flex items-center justify-between py-3.5 border-b border-white/5 text-left group active:opacity-70 transition-opacity cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#7BF0EB] font-semibold">
                  0{idx + 1}
                </span>
                <span className="text-lg font-bold text-white tracking-tight">
                  {item.label.replace(/^[0-9]+\s*\/\/\s*/, '')}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#7BF0EB] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
          <span>{clinicConfig.meta.cityState}</span>
          <span className="text-[#7BF0EB] font-semibold">100% PRIVATE CARE</span>
        </div>
      </div>

      {/* =========================================================
          3. DESKTOP RADIANT BOTTOM BUTTON
         ========================================================= */}
      <div
        className={`hidden lg:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50 select-none transition-all duration-300 ${
          isOpen
            ? 'opacity-0 pointer-events-none scale-90 translate-y-4'
            : 'opacity-100 pointer-events-auto scale-100 translate-y-0'
        }`}
      >
        <button
          onClick={onToggle}
          aria-label="Open menu"
          className="aura-glow-button relative flex items-center gap-3 px-8 py-3.5 rounded-full border bg-[#141215]/90 text-white backdrop-blur-2xl hover:scale-105 hover:bg-[#1b181e] transition-all cursor-pointer shadow-2xl"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7BF0EB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#7BF0EB]"></span>
          </span>

          <Menu className="w-4 h-4 text-[#7BF0EB]" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase">
            Menu
          </span>
        </button>
      </div>

      {/* =========================================================
          4. DESKTOP 65VH CURTAIN DRAWER
         ========================================================= */}
      <div
        onWheel={handleMenuTrackWheel}
        className={`hidden lg:flex fixed bottom-0 left-0 w-full h-[65vh] bg-[#0A090B] z-40 flex-col justify-between px-10 py-8 transition-all duration-1100 ease-[cubic-bezier(0.25,1,0.3,1)] ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Top Header Row */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between shrink-0 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7BF0EB] shadow-[0_0_8px_#7BF0EB]" />
            <span className="text-xs font-mono tracking-widest text-[#7BF0EB] uppercase font-bold">
              PAGE DIRECTORY
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider hidden xl:inline">
              CLICK ANY CARD TO NAVIGATE &bull; SCROLL HORIZONTALLY
            </span>

            <button
              onClick={onToggle}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#7BF0EB] text-[#0A090B] hover:bg-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(123,240,235,0.4)] active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Cards Row */}
        <div
          ref={scrollContainerRef}
          className="w-full max-w-7xl mx-auto flex-1 flex items-center gap-6 overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {navMenuItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleDesktopCardClick(item.sectionIndex)}
              style={{
                transitionDelay: isOpen ? `${idx * 40}ms` : '0ms',
                transform: isOpen
                  ? 'translateY(0px) scale(1)'
                  : 'translateY(50px) scale(0.92)',
                opacity: isOpen ? 1 : 0,
              }}
              className="group relative shrink-0 w-[270px] sm:w-[320px] h-[260px] rounded-3xl overflow-hidden border border-white/15 hover:border-[#7BF0EB] hover:scale-105 transition-all duration-500 shadow-2xl cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.label}
                draggable={false}
                className="w-full h-full object-cover filter brightness-[0.55] group-hover:brightness-[0.85] transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/80 group-hover:text-[#7BF0EB] group-hover:border-[#7BF0EB] transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <span className="text-sm font-mono font-bold tracking-wider text-white group-hover:text-[#7BF0EB] uppercase transition-colors block">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CurtainNav;
