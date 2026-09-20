import React, { useRef, useEffect } from 'react';
import { clinicConfig } from '../clinic.config';
import { ArrowLeft, ArrowUp, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const { footerSection, finalCtaSection, theme } = clinicConfig;

  const bgRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    targetPos.current = { x: -xRatio * 16, y: -yRatio * 10 };
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

  const handleReturnStart = () => {
    if (window.innerWidth >= 1024) {
      // Desktop: reset horizontal track back to start
      window.dispatchEvent(new CustomEvent('aura:scroll-start'));
    } else {
      // Mobile: standard vertical scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-screen bg-[#0A090B] text-white select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Upper Area: Visual Pavilion Backdrop with CTA Capsule */}
      <div className="relative flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            ref={bgRef}
            className="absolute -inset-[3%] w-[106%] h-[106%] bg-cover bg-center filter brightness-[0.85] contrast-[1.05] will-change-transform"
            style={{ backgroundImage: `url(${finalCtaSection.bgImage})` }}
          />
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0A090B]/80 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0A090B] via-[#0A090B]/90 to-transparent" />
        </div>

        {/* Top Header Tag */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full shadow-[0_0_8px_#7BF0EB]"
              style={{ backgroundColor: theme.accentColor }}
            />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white font-semibold drop-shadow-md">
              PRIORITY ADMISSION // FINAL STEP
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/90 drop-shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7BF0EB]" />
            <span>ENCRYPTED INTAKE PIPELINE</span>
          </div>
        </div>

        {/* Center Frosted Capsule */}
        <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-3">
          <div
            className="w-full rounded-[32px] sm:rounded-[40px] border border-white/30 p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(18, 16, 20, 0.75) 100%)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              boxShadow:
                '0 30px 70px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
            }}
          >
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tight-heading leading-[1.12] mb-3 drop-shadow-sm">
                {finalCtaSection.headline}
              </h2>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed drop-shadow-sm">
                {finalCtaSection.subheadline}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 py-4 px-8 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-2xl cursor-pointer"
                style={{
                  backgroundColor: theme.accentColor,
                  color: '#161416',
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#161416] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <span>{finalCtaSection.ctaText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Area: Solid Dark Base for High Readability */}
      <div className="relative z-20 w-full bg-[#0A090B] border-t border-white/10 px-6 sm:px-10 lg:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Brand & Tagline */}
            <div className="flex items-baseline gap-3">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#7BF0EB]" />
                {footerSection.brandName}
              </span>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                {footerSection.tagline} &bull; {footerSection.cityState}
              </span>
            </div>

            {/* Nav Anchors */}
            <nav className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-widest text-white/70">
              {footerSection.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#7BF0EB] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Socials + Return Button (Left on Desktop, Up on Mobile) */}
            <div className="flex items-center gap-2.5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#7BF0EB] hover:border-[#7BF0EB] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="X"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#7BF0EB] hover:border-[#7BF0EB] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <button
                onClick={handleReturnStart}
                aria-label="Return to beginning"
                className="w-8 h-8 rounded-full bg-[#7BF0EB] text-[#0A090B] flex items-center justify-center hover:bg-white transition-all cursor-pointer ml-1"
              >
                {/* Desktop: Left arrow for horizontal return; Mobile: Up arrow */}
                <ArrowLeft className="hidden lg:block w-4 h-4" />
                <ArrowUp className="block lg:hidden w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
            <p>{footerSection.legalText}</p>
            <div className="shrink-0">{footerSection.copyright}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
