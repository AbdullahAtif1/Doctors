import React, { useRef, useEffect, useState, ComponentType } from 'react';

import * as HeroModule from './components/HeroSection';
import * as ModalitiesModule from './components/ModalitiesSection';
import * as PillarsModule from './components/PillarsSection';
import * as BookingModule from './components/BookingSection';
import * as TestimonialsModule from './components/TestimonialsHelixSection';
import * as FAQModule from './components/FAQSection';
import * as AdmissionPassModule from './components/AdmissionPassSection';
import * as FooterModule from './components/FooterSection';
import { CurtainNav } from './components/CurtainNav';

const resolveComponent = (mod: Record<string, unknown>, fallbackName: string): ComponentType<any> => {
  return (mod.default || mod[fallbackName] || (() => null)) as ComponentType<any>;
};

const HeroSection = resolveComponent(HeroModule, 'HeroSection');
const ModalitiesSection = resolveComponent(ModalitiesModule, 'ModalitiesSection');
const PillarsSection = resolveComponent(PillarsModule, 'PillarsSection');
const BookingSection = resolveComponent(BookingModule, 'BookingSection');
const TestimonialsHelixSection = resolveComponent(TestimonialsModule, 'TestimonialsHelixSection');
const FAQSection = resolveComponent(FAQModule, 'FAQSection');
const AdmissionPassSection = resolveComponent(AdmissionPassModule, 'AdmissionPassSection');
const FooterSection = resolveComponent(FooterModule, 'FooterSection');

export const App: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Synchronous ref for event listener checks
  const isMenuOpenRef = useRef(false);
  useEffect(() => {
    isMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  const targetDistanceRef = useRef(0);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    let currentDistance = 0;
    let animationFrameId: number;
    let maxScroll = 0;
    let activeCardIndex = -1;
    let distToPillars = 0;
    let cardRunway = window.innerWidth * 1.5;

    let isRewinding = false;
    let rewindStartTime = 0;
    let rewindStartDistance = 0;
    const REWIND_DURATION = 4200;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const track = trackRef.current;
    if (!track) return;

    const calculateBounds = () => {
      const w = window.innerWidth;
      distToPillars = 2 * w; // Section 3 is at 2 screens width
      cardRunway = w * 1.5;
      // 8 full sections total (7 transitions) + 1.5 cardRunway
      maxScroll = 7 * w + cardRunway;
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);

    // Footer rewind handler
    const handleScrollStart = () => {
      if (currentDistance <= 10) return;
      isRewinding = true;
      rewindStartTime = performance.now();
      rewindStartDistance = currentDistance;
    };
    window.addEventListener('aura:scroll-start', handleScrollStart);

    // DETERMINISTIC SECTION JUMP HANDLER
    const handleJumpToSection = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      const idx = customEvent.detail;
      const w = window.innerWidth;
      const runway = w * 1.5;

      isRewinding = false;

      let destination = 0;
      if (idx <= 2) {
        // Sections 0 (Hero), 1 (Modalities), 2 (Pillars)
        destination = idx * w;
      } else {
        // Sections 3 (Booking), 4 (Testimonials), 5 (FAQ), 6 (Pass), 7 (Footer)
        // Offset by the 1.5 runway used by Pillars
        destination = 2 * w + runway + (idx - 2) * w;
      }

      targetDistanceRef.current = Math.min(Math.max(0, destination), maxScroll);
    };
    window.addEventListener('aura:jump-section', handleJumpToSection);

    const handleWheel = (e: WheelEvent) => {
      // Ignore scroll wheel when menu is open or review modal is up
      if (isMenuOpenRef.current) return;
      if (document.querySelector('.fixed.z-\\[9999\\]')) return;

      isRewinding = false;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetDistanceRef.current = Math.min(
        Math.max(targetDistanceRef.current + delta * 1.15, 0),
        maxScroll
      );
    };

    const render = (time: number) => {
      if (isRewinding) {
        const elapsed = time - rewindStartTime;
        const progress = Math.min(elapsed / REWIND_DURATION, 1);
        const eased = easeInOutCubic(progress);

        currentDistance = rewindStartDistance * (1 - eased);
        targetDistanceRef.current = currentDistance;

        if (progress >= 1) {
          isRewinding = false;
          currentDistance = 0;
          targetDistanceRef.current = 0;
        }
      } else {
        currentDistance += (targetDistanceRef.current - currentDistance) * 0.04;
      }

      let translateX = 0;
      let nextPillarIdx = 0;

      if (currentDistance < distToPillars) {
        translateX = currentDistance;
        nextPillarIdx = 0;
      } else if (currentDistance <= distToPillars + cardRunway) {
        translateX = distToPillars;
        const localRatio = (currentDistance - distToPillars) / cardRunway;

        if (localRatio < 0.34) {
          nextPillarIdx = 0;
        } else if (localRatio < 0.67) {
          nextPillarIdx = 1;
        } else {
          nextPillarIdx = 2;
        }
      } else {
        translateX = distToPillars + (currentDistance - (distToPillars + cardRunway));
        nextPillarIdx = 2;
      }

      if (progressBarRef.current && maxScroll > 0) {
        const progress = Math.min(Math.max(currentDistance / maxScroll, 0), 1);
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (nextPillarIdx !== activeCardIndex) {
        activeCardIndex = nextPillarIdx;
        window.dispatchEvent(new CustomEvent('aura:pillar-step', { detail: nextPillarIdx }));
      }

      track.style.transform = `translate3d(-${translateX}px, 0px, 0px)`;

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', calculateBounds);
      window.removeEventListener('aura:scroll-start', handleScrollStart);
      window.removeEventListener('aura:jump-section', handleJumpToSection);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSelectSectionFromMenu = (sectionIndex: number) => {
    if (window.innerWidth >= 1024) {
      window.dispatchEvent(new CustomEvent('aura:jump-section', { detail: sectionIndex }));
    } else {
      const sectionIds = ['hero', 'modalities', 'pillars', 'booking', 'testimonials', 'faq', 'pass', 'footer'];
      const targetId = sectionIds[sectionIndex];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="relative w-full bg-[#0A090B] text-white
                 lg:h-screen lg:overflow-hidden
                 min-h-screen overflow-y-auto overflow-x-hidden"
    >
      {/* Curtain Layer: 1100ms smooth curtain drop */}
      <div
        style={{
          transform:
            menuOpen && typeof window !== 'undefined' && window.innerWidth >= 1024
              ? 'translateY(-65vh)'
              : 'translateY(0)',
          transition: 'transform 1100ms cubic-bezier(0.25, 1, 0.3, 1)',
        }}
        className="relative z-20 w-full h-full will-change-transform shadow-[0_30px_70px_rgba(0,0,0,0.95)] bg-[#0E0D0E]"
      >
        <div
          ref={trackRef}
          className="gpu-track lg:flex lg:flex-row lg:h-full lg:w-max flex flex-col w-full"
        >
          {/* Section 0: Hero */}
          <div id="hero" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <HeroSection />
          </div>

          {/* Section 1: Modalities */}
          <div id="modalities" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <ModalitiesSection />
          </div>

          {/* Section 2: Pillars */}
          <div id="pillars" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <PillarsSection />
          </div>

          {/* Section 3: Booking */}
          <div id="booking" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <BookingSection />
          </div>

          {/* Section 4: Testimonials */}
          <div id="testimonials" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <TestimonialsHelixSection />
          </div>

          {/* Section 5: FAQ */}
          <div id="faq" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <FAQSection />
          </div>

          {/* Section 6: Admission Pass */}
          <div id="pass" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <AdmissionPassSection />
          </div>

          {/* Section 7: Final CTA + Solid Base Footer */}
          <div id="footer" className="gpu-section w-full lg:w-screen lg:h-screen shrink-0 overflow-hidden">
            <FooterSection />
          </div>
        </div>
      </div>

      {/* Behind-the-Curtain Navigation Component */}
      <CurtainNav
        isOpen={menuOpen}
        onToggle={() => setMenuOpen((prev) => !prev)}
        onSelectSection={handleSelectSectionFromMenu}
      />

      {/* Global Desktop Progress Line */}
      <div className="hidden lg:block fixed bottom-0 left-0 w-full h-[2px] bg-white/10 z-30 pointer-events-none origin-left">
        <div
          ref={progressBarRef}
          className="h-full bg-[#7BF0EB] will-change-transform origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
};

export default App;