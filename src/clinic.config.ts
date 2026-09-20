export interface PillarCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  ctaText: string;
}

export interface CertificationItem {
  code: string;
  label: string;
  subtext: string;
}

export interface BookingTimeSlot {
  label: string;
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
  available: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  headline: string;
  quote: string;
  procedure: string;
  image: string;
}

export interface ModalityItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  downtime: string;
  bgGradient: string;
  textColor: string;
  iconLabel: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  authorMoniker: string;
  authorRole: string;
}

export interface AdmissionPassConfig {
  badge: string;
  headlineBold: string;
  headlineLight: string;
  description: string;
  ctaText: string;
  card: {
    suiteName: string;
    tier: string;
    estimatedStay: string;
    image: string;
    protocolToggleLabel: string;
    protocolFee: string;
    actionButtonText: string;
    fallbackLinkText: string;
  };
}

export interface FinalCtaConfig {
  headline: string;
  subheadline: string;
  ctaText: string;
  bgImage: string;
}

export interface NavMenuItem {
  id: string;
  label: string;
  sectionIndex: number;
  image: string;
}

export interface ClinicConfig {
  meta: {
    name: string;
    tagline: string;
    subtagline: string;
    cityState: string;
  };
  theme: {
    accentColor: string;
    accentHover: string;
    surfaceDark: string;
    surfaceDarkElevated: string;
    surfaceLight: string;
  };
  hero: {
    badge: string;
    headline: string;
    description: string;
    primaryCtaText: string;
    bgImage: string;
    floatingPreview: {
      tag: string;
      title: string;
      metric: string;
      subtext: string;
      image: string;
    };
    partnerLogos: string[];
  };
  pillarsSection: {
    badge: string;
    headline: string;
    subheadline: string;
    cards: PillarCard[];
    complianceTitle: string;
    certifications: CertificationItem[];
  };
  bookingSection: {
    badge: string;
    headline: string;
    description: string;
    businessDaysCount: number;
    timeSlots: BookingTimeSlot[];
    guarantees: { title: string; desc: string }[];
  };
  testimonialsSection: {
    badge: string;
    headline: string;
    subheadline: string;
    items: TestimonialItem[];
  };
  modalitiesSection: {
    badge: string;
    headlineBold: string;
    headlineLight: string;
    ctaText: string;
    items: ModalityItem[];
  };
  faqSection: {
    badge: string;
    headline: string;
    bgImage: string;
    ctaText: string;
    items: FAQItem[];
  };
  admissionPassSection: AdmissionPassConfig;
  finalCtaSection: FinalCtaConfig;
  footerSection: {
    brandName: string;
    tagline: string;
    cityState: string;
    legalText: string;
    copyright: string;
    navLinks: { label: string; href: string }[];
  };
}

export const navMenuItems: NavMenuItem[] = [
  {
    id: "nav-hero",
    label: "01 // Welcome",
    sectionIndex: 0,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nav-modalities",
    label: "02 // Treatments & Tools",
    sectionIndex: 1,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nav-pillars",
    label: "03 // How We Care For You",
    sectionIndex: 2,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nav-booking",
    label: "04 // Book an Appointment",
    sectionIndex: 3,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nav-evidence",
    label: "05 // Patient Stories",
    sectionIndex: 4,
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nav-faq",
    label: "06 // Common Questions",
    sectionIndex: 5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nav-pass",
    label: "07 // Your Private Suite",
    sectionIndex: 6,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
];

export const clinicConfig: ClinicConfig = {
  meta: {
    name: "AURA SURGICAL & AESTHETICS",
    tagline: "Next-generation clinical care, tailored to you",
    subtagline: "Private recovery suites, zero wait times, and bespoke treatment plans.",
    cityState: "Beverly Hills, CA",
  },
  theme: {
    accentColor: "#7BF0EB",
    accentHover: "#5CE6E0",
    surfaceDark: "#161416",
    surfaceDarkElevated: "#1D1A1E",
    surfaceLight: "#FBFBFB",
  },
  hero: {
    badge: "A BETTER KIND OF DOCTOR'S VISIT",
    headline: "Feel cared for from the moment you walk in.",
    description:
      "No crowded lobbies and no long waits. You get your own quiet room and a dedicated team focused only on you.",
    primaryCtaText: "Schedule a Visit",
    bgImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80",
    floatingPreview: {
      tag: "CONCIERGE SUITE",
      title: "Private Recovery Lounge",
      metric: "100% Private",
      subtext: "Quiet check-in with dedicated specialist support.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    },
    partnerLogos: [
      "CEDARS-SINAI AFFILIATE",
      "BEVERLY MEDICAL",
      "VOGUE HEALTH",
    ],
  },
  pillarsSection: {
    badge: "HOW WE TAKE CARE OF YOU",
    headline: "Private care. Top surgeons. Zero waiting.",
    subheadline: "Designed so you feel safe, comfortable, and respected from start to finish.",
    complianceTitle: "ACCREDITATIONS & SAFETY STANDARDS",
    cards: [
      {
        id: "pillar-discretion",
        tag: "PRIVATE ACCESS",
        title: "Private Valet & Direct Entry",
        description:
          "Drive straight into our quiet underground garage. You step directly into your personal suite with zero public waiting rooms or crowded lobbies.",
        metric: "< 60s",
        metricLabel: "CAR TO SUITE",
        ctaText: "Book Meeting",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "pillar-fellowship",
        tag: "TOP SURGEONS",
        title: "One Dedicated Medical Team",
        description:
          "Your board-certified surgeon and private nursing team focus exclusively on you from check-in through your entire recovery.",
        metric: "1 : 1",
        metricLabel: "CARE RATIO",
        ctaText: "Book Meeting",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "pillar-recovery",
        tag: "AROUND-THE-CLOCK HELP",
        title: "24/7 Direct Doctor & Nurse Access",
        description:
          "Have a question after you head home? Reach your personal care team directly anytime day or night. We check on you every step of the way.",
        metric: "24/7",
        metricLabel: "ALWAYS REACHABLE",
        ctaText: "Book Meeting",
        image:
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    certifications: [
      {
        code: "HIPAA",
        label: "100% Private Records",
        subtext: "Encrypted & Confidential",
      },
      {
        code: "QUAD-A",
        label: "Quad-A Certified Facility",
        subtext: "Gold Standard Surgery Safety",
      },
      {
        code: "ABMS",
        label: "Board-Certified Surgeons",
        subtext: "Top Beverly Hills Specialists",
      },
    ],
  },
  bookingSection: {
    badge: "SCHEDULE A VISIT",
    headline: "Book an appointment that fits your day",
    description:
      "Pick your preferred date and time. Your private coordinator will confirm your visit right away.",
    businessDaysCount: 5,
    timeSlots: [
      { label: "09:30 AM", hour: "09", minute: "30", period: "AM", available: true },
      { label: "11:00 AM", hour: "11", minute: "00", period: "AM", available: true },
      { label: "01:30 PM", hour: "01", minute: "30", period: "PM", available: true },
      { label: "03:00 PM", hour: "03", minute: "00", period: "PM", available: true },
      { label: "04:30 PM", hour: "04", minute: "30", period: "PM", available: true },
    ],
    guarantees: [
      {
        title: "Zero Waiting Rooms",
        desc: "Pull straight into private valet and walk right into your room.",
      },
      {
        title: "Dedicated Doctor Time",
        desc: "Unrushed one-on-one time with your doctor to answer every question.",
      },
      {
        title: "Complete Privacy",
        desc: "Your records and visits are kept strictly confidential.",
      },
    ],
  },
  testimonialsSection: {
    badge: "PATIENT EXPERIENCES",
    headline: "What our patients say about their visits",
    subheadline: "Real feedback on our doctors, quiet suites, and gentle recovery.",
    items: [
      {
        id: "helix-01",
        name: "Elena Rostova",
        role: "Patient",
        headline: "Quiet, peaceful room",
        quote: "Having my own quiet room with no waiting area took away all my doctor anxiety.",
        procedure: "Facial Care & Skin Renewal",
        image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-02",
        name: "Dr. Marcus Sterling",
        role: "Surgeon & Patient",
        headline: "Spotless and professional",
        quote: "As a surgeon myself, I was blown away by their safety, cleanliness, and kind team.",
        procedure: "Microsurgery Care",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-03",
        name: "Vivienne C.",
        role: "Patient",
        headline: "Looks completely natural",
        quote: "My face looks refreshed and rested, but nobody can tell I had anything done.",
        procedure: "Facial Contouring",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-04",
        name: "Julian Vance",
        role: "Patient",
        headline: "Private door-to-door visit",
        quote: "I drove into the private garage, went straight up, and never ran into a single stranger.",
        procedure: "Nose & Breathing Surgery",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-05",
        name: "Dr. Aris Thorne",
        role: "Medical Director",
        headline: "Saw my results beforehand",
        quote: "The 3D photos let me see my exact results before we even booked the date.",
        procedure: "3D Face Mapping",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-06",
        name: "Clara Beauchamp",
        role: "Patient",
        headline: "Calm and peaceful rest",
        quote: "The private recovery rooms are so calm and quiet you forget you're at a clinic.",
        procedure: "Private Suite Recovery",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-07",
        name: "Soren Lindqvist",
        role: "Patient",
        headline: "Soft lighting and zero stress",
        quote: "The cozy rooms and soft lights made resting after my treatment very easy.",
        procedure: "Recovery Suite Stay",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-08",
        name: "Nadia Kournikova",
        role: "Patient",
        headline: "Healed faster than expected",
        quote: "The nurses checked in on me every morning. I was back on my feet in half the time.",
        procedure: "Rapid Healing Program",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-09",
        name: "Arthur Pendelton",
        role: "Patient",
        headline: "Gentle doctor, great results",
        quote: "Great surgical precision delivered with the kindness of a boutique hotel stay.",
        procedure: "Eyelid & Brow Refinement",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1920&q=80",
      },
      {
        id: "helix-10",
        name: "Seraphina Lin",
        role: "Patient",
        headline: "Smooth and easy from day one",
        quote: "From pulling into the garage to going home, the entire day was effortless.",
        procedure: "Skin Regeneration",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1920&q=80",
      },
    ],
  },
  modalitiesSection: {
    badge: "CLINICAL MODALITIES // BIOTECH SUITE",
    headlineBold: "Aura integrates precision medical technology like",
    headlineLight:
      "Vectra 3D Imaging, Secret RF skin contouring, Alma Picosecond lasers, Hyperbaric Oxygen suites, and restorative exosome therapies.",
    ctaText: "Explore Full Clinical Index",
    items: [
      {
        id: "vectra-3d",
        name: "Vectra 3D H2",
        badge: "0.1mm Detailed Contour",
        iconLabel: "V3D",
        category: "PRE-OP 3D DIAGNOSTICS",
        downtime: "0 Hours (Diagnostic)",
        description:
          "High-definition 3D imaging that captures every angle and depth of your features so you and your surgeon can preview realistic results before treatment begins.",
        bgGradient: "from-[#991B1B] to-[#7F1D1D]",
        textColor: "#FFFFFF",
      },
      {
        id: "secret-rf",
        name: "Secret™ RF & CO2",
        badge: "Dermal Coagulation",
        iconLabel: "SRF",
        category: "SKIN RENEWAL & TIGHTENING",
        downtime: "24–48 Hours",
        description:
          "Combines gentle micro-needles with targeted warmth to rebuild collagen beneath the skin, smoothing fine lines and restoring natural firmness with minimal redness.",
        bgGradient: "from-[#4D7C0F] to-[#3F6212]",
        textColor: "#FFFFFF",
      },
      {
        id: "picoclear",
        name: "Alma Picosecond",
        badge: "Targeted Laser Pulse",
        iconLabel: "PICO",
        category: "PIGMENT & CLARITY",
        downtime: "Zero Downtime",
        description:
          "Ultra-short light pulses that gently break up sun damage, pigmentation, and scars without generating excess heat, leaving surrounding skin calm and protected.",
        bgGradient: "from-[#5B21B6] to-[#4C1D95]",
        textColor: "#FFFFFF",
      },
      {
        id: "hbot",
        name: "Hyperbaric Chamber",
        badge: "Pressurized Medical O2",
        iconLabel: "HBOT",
        category: "POST-PROCEDURE RECOVERY",
        downtime: "Recovery Suite",
        description:
          "Pressurized pure oxygen therapy that dramatically speeds up tissue repair, reduces swelling, and cuts overall healing time by nearly half.",
        bgGradient: "from-[#1F2937] to-[#111827]",
        textColor: "#FFFFFF",
      },
      {
        id: "exo",
        name: "Exosome Restorative Matrix",
        badge: "Autologous Cellular Signal",
        iconLabel: "EXO",
        category: "CELLULAR REGENERATION",
        downtime: "Same Day",
        description:
          "Bio-active growth messengers applied after treatments to rapidly calm the skin barrier, boost natural cell turnover, and accelerate radiant healing.",
        bgGradient: "from-[#0284C7] to-[#0369A1]",
        textColor: "#FFFFFF",
      },
      {
        id: "ldt",
        name: "Ballancer® Pro Lymphatic",
        badge: "Medical Wave Compression",
        iconLabel: "LDT",
        category: "LYMPHATIC DRAINAGE",
        downtime: "Immediate Relief",
        description:
          "Precision compression massage sleeves that gently stimulate fluid movement, flushing post-operative swelling and leaving you feeling light and relaxed.",
        bgGradient: "from-[#0F766E] to-[#115E59]",
        textColor: "#7BF0EB",
      },
    ],
  },
  faqSection: {
    badge: "QUESTIONS & ANSWERS",
    headline: "Everything you need to know before your visit.",
    ctaText: "Ask a Question",
    bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=85",
    items: [
      {
        id: "faq-1",
        category: "ANONYMITY & ACCESS",
        question: "Will anyone see me when I arrive?",
        answer:
          "No. You pull straight into our private underground garage and take a private elevator directly to your personal suite. There are no shared lobbies or waiting areas.",
        authorMoniker: "HEAD OF PATIENT PRIVACY",
        authorRole: "Beverly Hills Clinic",
      },
      {
        id: "faq-2",
        category: "SURGICAL RIGOR",
        question: "Who will actually perform my care?",
        answer:
          "Only senior, board-certified surgeons with privileges at Cedars-Sinai. You work directly with your chosen doctor from start to finish—never an assistant.",
        authorMoniker: "CHIEF OF SURGERY",
        authorRole: "Medical Governance",
      },
      {
        id: "faq-3",
        category: "RECOVERY ACCELERATION",
        question: "How does the oxygen chamber help me heal?",
        answer:
          "You relax comfortably inside a pressurized oxygen pod after treatment. Breathing pure oxygen brings down swelling quickly and cuts recovery time in half.",
        authorMoniker: "RECOVERY DIRECTOR",
        authorRole: "Patient Care",
      },
      {
        id: "faq-4",
        category: "FINANCIAL DISCRETION",
        question: "Are my records and payments confidential?",
        answer:
          "100% confidential. All documents are protected with bank-grade encryption, and payments show up under a discreet private name with zero medical terms.",
        authorMoniker: "PATIENT CONCIERGE",
        authorRole: "Private Desk",
      },
    ],
  },
  admissionPassSection: {
    badge: "YOUR PRIVATE VISIT",
    headlineBold: "Your private suite",
    headlineLight: "is waiting for you.",
    description:
      "Every visit includes quiet valet parking into our private garage, your own personal room, and direct access to your doctor from start to finish.",
    ctaText: "Schedule Your Visit",
    card: {
      suiteName: "Private Recovery Suite",
      tier: "BEVERLY HILLS PRIVATE WING",
      estimatedStay: "Personal Room • Dedicated Care Team",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      protocolToggleLabel: "Private Underground Valet",
      protocolFee: "Included Free",
      actionButtonText: "Reserve This Suite",
      fallbackLinkText: "Prefer to park yourself? Let us know",
    },
  },
  finalCtaSection: {
    headline: "Ready to feel your best?",
    subheadline: "Come visit our quiet Beverly Hills suites. Meet your doctor, ask every question, and decide what's right for you—with zero pressure.",
    ctaText: "Book Your Consultation",
    bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2560&q=85",
  },
  footerSection: {
    brandName: "Aura",
    tagline: "Surgical & Aesthetic Institute",
    cityState: "Beverly Hills, CA",
    legalText:
      "Aura Surgical & Aesthetics is a private surgical institute accredited by the AAAASF. Clinical care provided exclusively by licensed medical fellows.",
    copyright: "© 2026 Aura Surgical & Aesthetics Inc. All rights reserved.",
    navLinks: [
      { label: "Infrastructure", href: "#pillars" },
      { label: "Modalities", href: "#modalities" },
      { label: "Admissions", href: "#booking" },
      { label: "Evidence", href: "#testimonials" },
      { label: "Protocols", href: "#faq" },
    ],
  },
};