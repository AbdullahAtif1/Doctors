import React, { useState, useRef, useEffect, useCallback } from 'react';
import { clinicConfig } from '../clinic.config';
import { X, ArrowLeft, ArrowRight, Compass } from 'lucide-react';

type TestimonialItem = (typeof clinicConfig.testimonialsSection.items)[number];

export const TestimonialsHelixSection: React.FC = () => {
  const { testimonialsSection, theme } = clinicConfig;
  const items = testimonialsSection.items;

  // Desktop Mouse Track Refs
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const currentPercentage = useRef<number>(0);

  // Mobile Scroll State
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const [activeModalItem, setActiveModalItem] = useState<TestimonialItem | null>(null);
  const [trackPercent, setTrackPercent] = useState<number>(0);

  // --- DESKTOP MOUSE DISPLACEMENT ENGINE ---
  const updateTrackPosition = useCallback((targetPercent: number) => {
    const clamped = Math.max(Math.min(targetPercent, 0), -100);
    currentPercentage.current = clamped;
    setTrackPercent(clamped);

    const track = desktopTrackRef.current;
    if (!track) return;

    track.animate(
      { transform: `translate(${clamped}%, -50%)` },
      { duration: 1200, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );

    const images = track.getElementsByClassName('track-image');
    for (let i = 0; i < images.length; i++) {
      const img = images[i] as HTMLElement;
      img.animate(
        { objectPosition: `${100 + clamped}% 50%` },
        { duration: 1200, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (activeModalItem || window.innerWidth < 1024) return;
    const ratio = e.clientX / window.innerWidth;
    const targetPercent = ratio * -100;
    updateTrackPosition(targetPercent);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (activeModalItem || window.innerWidth < 1024) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 4) return;

    const deltaPercent = (delta / window.innerWidth) * 35;
    const nextPercent = currentPercentage.current - deltaPercent;
    updateTrackPosition(nextPercent);
  };

  // --- MOBILE SCROLL-SNAP TRACKER ---
  const handleMobileScroll = () => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.82;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), items.length - 1));
  };

  // Modal navigation
  const handleNextModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeModalItem) return;
    const currentIndex = items.findIndex((it) => it.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % items.length;
    setActiveModalItem(items[nextIndex]);
  };

  const handlePrevModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeModalItem) return;
    const currentIndex = items.findIndex((it) => it.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setActiveModalItem(items[prevIndex]);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      className="relative w-full bg-[#0E0D0E] text-white select-none overflow-hidden
                 /* Desktop: 100vh viewport lock with mouse tracking */
                 lg:h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-8 lg:cursor-crosshair
                 /* Mobile: fluid vertical container */
                 flex flex-col justify-between min-h-screen px-5 py-8"
    >
      {/* Background ambient bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-10 blur-[150px]"
        style={{ backgroundColor: theme.accentColor }}
      />

      {/* 1. Header Row */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto shrink-0 mb-6 lg:mb-2 pointer-events-none">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accentColor }}
            />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
              {testimonialsSection.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tight-heading leading-snug">
            {testimonialsSection.headline}
          </h2>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className="route-glass-pill px-4 py-1.5 text-xs text-white/70 font-mono flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#7BF0EB]" />
            <span>MOVE CURSOR HORIZONTALLY TO NAVIGATE</span>
          </div>
        </div>
      </header>

      {/* 2A. DESKTOP STAGE (>= 1024px): Mouse Kinetic Track */}
      <div className="relative z-10 w-full flex-1 min-h-0 hidden lg:block">
        <div
          ref={desktopTrackRef}
          id="image-track"
          style={{
            transform: 'translate(0%, -50%)',
            top: '50%',
            left: '50%',
          }}
          className="absolute flex gap-[4vmin] user-select-none will-change-transform"
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="relative shrink-0 w-[38vmin] h-[56vmin] rounded-3xl overflow-hidden shadow-2xl border border-white/15 hover:border-white/80 hover:scale-[1.03] transition-all duration-300 group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
                className="track-image w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                style={{
                  objectPosition: 'center 35%',
                  filter: 'brightness(0.85)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <div className="text-[10px] font-mono tracking-widest text-[#7BF0EB] uppercase mb-1">
                  0{idx + 1} &mdash; {item.procedure}
                </div>
                <h3 className="text-lg font-bold text-white tight-heading leading-tight truncate">
                  {item.headline}
                </h3>
                <div className="text-xs text-white/60 font-mono mt-1">
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2B. MOBILE STAGE (< 1024px): 1-Card Touch Snap Carousel */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center my-auto lg:hidden">
        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="relative shrink-0 w-[82vw] max-w-[340px] h-[52vh] snap-center rounded-3xl overflow-hidden shadow-2xl border border-white/20 active:scale-[0.98] transition-transform"
            >
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.85)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <div className="text-[10px] font-mono tracking-widest text-[#7BF0EB] uppercase mb-1.5">
                  0{idx + 1} &bull; {item.procedure}
                </div>
                <h3 className="text-xl font-bold text-white tight-heading leading-tight mb-1">
                  {item.headline}
                </h3>
                <p className="text-xs text-white/70 italic line-clamp-2 mb-2">
                  "{item.quote}"
                </p>
                <div className="text-xs font-mono text-white/90">
                  {item.name} &bull; <span className="text-white/50">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {items.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeMobileIndex ? 'w-6 bg-[#7BF0EB]' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Footer Bar */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto pt-4 border-t border-white/10 flex items-center justify-between shrink-0 pointer-events-none">
        {/* Desktop Progress */}
        <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-white/50">
          <span>TRACK BEARING</span>
          <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7BF0EB] transition-all duration-300 rounded-full"
              style={{ width: `${Math.abs(trackPercent)}%` }}
            />
          </div>
          <span className="text-[#7BF0EB] font-mono">
            {Math.round(Math.abs(trackPercent))}%
          </span>
        </div>

        {/* Mobile Slide Index */}
        <div className="lg:hidden text-xs font-mono text-[#7BF0EB]">
          {activeMobileIndex + 1} / {items.length}
        </div>

        <div className="text-[10px] font-mono text-white/40">
          <span className="hidden sm:inline">KINETIC DISPLACEMENT &bull; </span>
          {items.length} ARCHIVES
        </div>
      </footer>

      {/* ============================================================
          CAMILLE MORMAL SPOTLIGHT EDITORIAL MODAL
          ============================================================ */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 w-screen h-[100dvh] max-w-[100vw] overflow-hidden bg-[#0A090A]/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 cursor-default box-border"
        >
          {/* Top Bar */}
          <div className="w-full max-w-5xl mx-auto shrink-0 flex items-center justify-between gap-3 pt-1 pb-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-[#7BF0EB] shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/70 truncate">
                {activeModalItem.procedure}
              </span>
            </div>

            <button
              onClick={() => setActiveModalItem(null)}
              className="route-glass-pill p-2 text-white hover:border-white/40 cursor-pointer transition-all shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Center Stage Card Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl mx-auto flex-1 min-h-0 flex items-center justify-center py-2 px-1 min-w-0"
          >
            <div className="relative w-full max-w-[92vw] sm:max-w-2xl md:max-w-3xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex items-center justify-center min-h-[340px] max-h-[64vh] sm:aspect-[16/9]">
              {/* Card Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 filter brightness-[0.32]"
                style={{ backgroundImage: `url(${activeModalItem.image})` }}
              />
              {/* Shading Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/60 backdrop-blur-[1.5px]" />

              {/* Text & Content */}
              <div className="relative z-10 px-8 sm:px-14 py-6 text-center max-w-lg mx-auto flex flex-col items-center justify-center">
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 sm:mb-3 drop-shadow-md leading-tight">
                  {activeModalItem.headline}
                </h3>
                <p className="text-xs sm:text-base text-white/90 font-light italic leading-relaxed mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-none">
                  "{activeModalItem.quote}"
                </p>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#7BF0EB]">
                  {activeModalItem.name} &bull; {activeModalItem.role}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevModal}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full route-glass-pill flex items-center justify-center text-white hover:border-white/50 cursor-pointer transition-all z-20"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextModal}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full route-glass-pill flex items-center justify-center text-white hover:border-white/50 cursor-pointer transition-all z-20"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Bar Thumbnail Selector */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl mx-auto shrink-0 flex items-center justify-between pt-2 pb-1 border-t border-white/10 min-w-0"
          >
            <div className="text-xs font-mono tracking-wider text-white/60 shrink-0 mr-2">
              {items.findIndex((it) => it.id === activeModalItem.id) + 1} &mdash; {items.length}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[60vw] sm:max-w-[75vw] min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {items.map((it) => {
                const isCurrent = it.id === activeModalItem.id;
                return (
                  <button
                    key={it.id}
                    onClick={() => setActiveModalItem(it)}
                    className={`w-8 h-5 sm:w-11 sm:h-7 rounded-md overflow-hidden border shrink-0 transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-[#7BF0EB] scale-110 shadow-lg opacity-100'
                        : 'border-white/20 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${it.image})` }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
