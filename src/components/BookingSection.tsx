import React, { useState, useEffect, useRef } from 'react';
import { clinicConfig } from '../clinic.config';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

type DialAngles = [number, number];

const CLOCK_DIGITS: Record<string, DialAngles[][]> = {
  '0': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[0, 180], [225, 225], [225, 225], [0, 180]],
    [[0, 180], [225, 225], [225, 225], [0, 180]],
    [[0, 180], [225, 225], [225, 225], [0, 180]],
    [[0, 180], [225, 225], [225, 225], [0, 180]],
    [[0, 90], [0, 270], [0, 90], [0, 270]],
  ],
  '1': [
    [[225, 225], [180, 90], [180, 270], [225, 225]],
    [[225, 225], [0, 180], [0, 180], [225, 225]],
    [[225, 225], [0, 180], [0, 180], [225, 225]],
    [[225, 225], [0, 180], [0, 180], [225, 225]],
    [[225, 225], [0, 180], [0, 180], [225, 225]],
    [[225, 225], [0, 90], [0, 270], [225, 225]],
  ],
  '2': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[180, 90], [180, 270], [0, 270], [225, 225]],
    [[0, 180], [0, 90], [180, 270], [225, 225]],
    [[0, 180], [225, 225], [225, 225], [225, 225]],
    [[0, 90], [0, 270], [0, 90], [0, 270]],
  ],
  '3': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[180, 90], [180, 270], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[0, 90], [0, 270], [0, 90], [0, 270]],
  ],
  '4': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[0, 180], [225, 225], [0, 180], [0, 180]],
    [[0, 90], [0, 270], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 90], [0, 270]],
  ],
  '5': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[0, 180], [0, 180], [225, 225], [225, 225]],
    [[0, 90], [180, 270], [180, 90], [180, 270]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[0, 90], [0, 270], [0, 90], [0, 270]],
  ],
  '6': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[0, 180], [225, 225], [225, 225], [225, 225]],
    [[0, 180], [180, 90], [180, 270], [180, 270]],
    [[0, 180], [225, 225], [0, 180], [0, 180]],
    [[0, 180], [225, 225], [0, 180], [0, 180]],
    [[0, 90], [0, 270], [0, 90], [0, 270]],
  ],
  '7': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 90], [0, 270]],
  ],
  '8': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[0, 180], [225, 225], [225, 225], [0, 180]],
    [[0, 90], [180, 270], [180, 90], [0, 270]],
    [[0, 180], [225, 225], [225, 225], [0, 180]],
    [[0, 180], [225, 225], [225, 225], [0, 180]],
    [[0, 90], [0, 270], [0, 90], [0, 270]],
  ],
  '9': [
    [[180, 90], [180, 270], [180, 90], [180, 270]],
    [[0, 180], [225, 225], [0, 180], [0, 180]],
    [[0, 90], [180, 270], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[225, 225], [225, 225], [0, 180], [0, 180]],
    [[0, 90], [0, 270], [0, 90], [0, 270]],
  ],
};

const ClassicDial: React.FC<{ angles: DialAngles }> = ({ angles }) => {
  return (
    <div className="relative w-[11px] h-[11px] lg:w-[12px] lg:h-[12px] rounded-full bg-[#18161A] flex items-center justify-center">
      <div
        className="absolute top-1/2 left-1/2 w-[44%] h-[1.2px] origin-left rounded-full bg-[#7BF0EB] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] duration-1000 shadow-[0_0_2px_#7BF0EB]"
        style={{ transform: `translate(0, -50%) rotate(${angles[0] - 90}deg)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[44%] h-[1.2px] origin-left rounded-full bg-[#7BF0EB] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] duration-1000 shadow-[0_0_2px_#7BF0EB]"
        style={{ transform: `translate(0, -50%) rotate(${angles[1] - 90}deg)` }}
      />
      <div className="w-[2px] h-[2px] rounded-full bg-[#7BF0EB] z-10" />
    </div>
  );
};

const ClassicDigitCluster: React.FC<{ digit: string }> = ({ digit }) => {
  const pattern = CLOCK_DIGITS[digit] || CLOCK_DIGITS['0'];
  return (
    <div className="grid grid-cols-4 gap-[2px] lg:gap-[3px]">
      {pattern.flat().map((angles, idx) => (
        <ClassicDial key={idx} angles={angles} />
      ))}
    </div>
  );
};

// ============================================================================
// OVERTIME LCD 16-SEGMENT COMPONENT
// ============================================================================
const OVERTIME_LCD_MAP: Record<string, string[]> = {
  '0': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f', 'j', 'k'],
  '1': ['b', 'c', 'j'],
  '2': ['a1', 'a2', 'b', 'g2', 'g1', 'e', 'd1', 'd2'],
  '3': ['a1', 'a2', 'b', 'g2', 'c', 'd1', 'd2'],
  '4': ['f', 'g1', 'g2', 'b', 'c'],
  '5': ['a1', 'a2', 'f', 'g1', 'm', 'd1', 'd2'],
  '6': ['a1', 'a2', 'f', 'e', 'd1', 'd2', 'c', 'g1', 'g2'],
  '7': ['a1', 'a2', 'b', 'c'],
  '8': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f', 'g1', 'g2'],
  '9': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'f', 'g1', 'g2'],
};

const OvertimeLcdChar: React.FC<{ char: string; width?: number; height?: number }> = ({
  char,
  width = 46,
  height = 76,
}) => {
  const activeSegments = OVERTIME_LCD_MAP[char] || OVERTIME_LCD_MAP['0'];
  const isActive = (seg: string) => activeSegments.includes(seg);

  const getStyle = (seg: string) => ({
    fill: isActive(seg) ? '#7BF0EB' : 'rgba(255, 255, 255, 0.04)',
    filter: isActive(seg) ? 'drop-shadow(0px 0px 8px rgba(123, 240, 235, 0.75))' : 'none',
    transition: 'fill 300ms ease, filter 300ms ease',
  });

  return (
    <svg
      viewBox="0 0 70 110"
      width={width}
      height={height}
      className="shrink-0 overflow-visible"
    >
      <polygon points="10,6 32,6 27,14 15,14" style={getStyle('a1')} />
      <polygon points="38,6 60,6 55,14 43,14" style={getStyle('a2')} />
      <polygon points="7,9 13,15 13,48 7,53" style={getStyle('f')} />
      <polygon points="63,9 63,53 57,48 57,15" style={getStyle('b')} />
      <polygon points="15,52 28,52 32,55 28,58 15,58 10,55" style={getStyle('g1')} />
      <polygon points="42,52 55,52 60,55 55,58 42,58 38,55" style={getStyle('g2')} />
      <polygon points="7,57 13,62 13,95 7,101" style={getStyle('e')} />
      <polygon points="63,57 63,101 57,95 57,62" style={getStyle('c')} />
      <polygon points="15,96 27,96 32,104 10,104" style={getStyle('d1')} />
      <polygon points="43,96 55,96 60,104 38,104" style={getStyle('d2')} />
      <polygon points="18,18 24,18 33,48 27,48" style={getStyle('h')} />
      <polygon points="33,16 37,16 37,48 33,48" style={getStyle('i')} />
      <polygon points="46,18 52,18 43,48 37,48" style={getStyle('j')} />
      <polygon points="27,62 33,62 24,92 18,92" style={getStyle('k')} />
      <polygon points="33,62 37,62 37,94 33,94" style={getStyle('l')} />
      <polygon points="37,62 43,62 52,92 46,92" style={getStyle('m')} />
    </svg>
  );
};

export const BookingSection: React.FC = () => {
  const { bookingSection } = clinicConfig;

  const dates = [
    { day: 'TUE', date: '22', month: 'SEP' },
    { day: 'WED', date: '23', month: 'SEP' },
    { day: 'THU', date: '24', month: 'SEP' },
    { day: 'FRI', date: '25', month: 'SEP' },
    { day: 'MON', date: '28', month: 'SEP' },
  ];

  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);

  const [displayedDate, setDisplayedDate] = useState(dates[0]);
  const [displayedSlot, setDisplayedSlot] = useState(bookingSection.timeSlots[0]);

  const [alias, setAlias] = useState('');
  const [contact, setContact] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const [showSolidNumbers, setShowSolidNumbers] = useState(true);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTargetDate = dates[selectedDateIdx];
  const activeTargetSlot = bookingSection.timeSlots[selectedSlotIdx] || bookingSection.timeSlots[0];

  const handleSelectDate = (idx: number) => {
    if (idx === selectedDateIdx) return;
    setShowSolidNumbers(false);
    setSelectedDateIdx(idx);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setDisplayedDate(dates[idx]);
      setShowSolidNumbers(true);
    }, 1000);
  };

  const handleSelectSlot = (idx: number) => {
    if (idx === selectedSlotIdx) return;
    setShowSolidNumbers(false);
    setSelectedSlotIdx(idx);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setDisplayedSlot(bookingSection.timeSlots[idx]);
      setShowSolidNumbers(true);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const clockDateD1 = activeTargetDate.date[0];
  const clockDateD2 = activeTargetDate.date[1];
  const clockHourD1 = activeTargetSlot.hour[0];
  const clockHourD2 = activeTargetSlot.hour[1];
  const clockMinD1 = activeTargetSlot.minute[0];
  const clockMinD2 = activeTargetSlot.minute[1];

  return (
    <section className="relative w-full h-full lg:h-screen lg:max-h-screen bg-white text-[#111827] select-none flex flex-col justify-between p-4 sm:p-8 lg:px-12 lg:py-6 overflow-hidden">
      {/* 1. Header */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-black/10 pb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D1C7]" />
          <span className="text-[11px] font-mono tracking-widest text-[#00807B] uppercase font-bold">
            SCHEDULE A VISIT
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#4B5563] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00807B]" />
          <span>100% PRIVATE • ZERO WAITING ROOMS</span>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="w-full max-w-7xl mx-auto flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center py-2">
        {/* LEFT COLUMN: Clean Booking Form with High-Contrast Charcoal Text */}
        <div className="lg:col-span-6 flex flex-col justify-center h-full max-w-xl">
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#111827] leading-tight mb-2">
              Book an appointment that fits your day
            </h2>
            <p className="text-xs sm:text-sm text-[#374151] font-normal leading-relaxed">
              Pick your preferred date and time. Your private coordinator will confirm your visit right away.
            </p>
          </div>

          {/* 01: Date Selection */}
          <div className="mb-3.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#374151] font-bold block mb-1.5">
              01 // CHOOSE A DATE
            </span>
            <div className="grid grid-cols-5 gap-2">
              {dates.map((item, idx) => {
                const isSelected = idx === selectedDateIdx;
                return (
                  <button
                    key={item.date}
                    onClick={() => handleSelectDate(idx)}
                    className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#141215] text-white border-black shadow-md scale-[1.02]'
                        : 'bg-[#F7F7F8] border-black/15 text-[#111827] hover:border-black/40'
                    }`}
                  >
                    <span className={`text-[10px] font-mono block uppercase font-bold ${isSelected ? 'text-[#7BF0EB]' : 'text-[#4B5563]'}`}>
                      {item.day}
                    </span>
                    <span className="text-lg font-extrabold block leading-tight text-[#111827]">
                      {isSelected ? <span className="text-white">{item.date}</span> : item.date}
                    </span>
                    <span className={`text-[9px] font-mono block uppercase font-medium ${isSelected ? 'text-white/70' : 'text-[#6B7280]'}`}>
                      {item.month}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 02: Time Slot Selection */}
          <div className="mb-3.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#374151] font-bold block mb-1.5">
              02 // CHOOSE A TIME WINDOW
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {bookingSection.timeSlots.map((slot, idx) => {
                const isSelected = idx === selectedSlotIdx;
                return (
                  <button
                    key={slot.label}
                    onClick={() => handleSelectSlot(idx)}
                    className={`py-2 rounded-lg border text-center transition-all cursor-pointer font-mono text-[11px] font-bold ${
                      isSelected
                        ? 'bg-[#141215] text-[#7BF0EB] border-black shadow-sm scale-[1.02]'
                        : 'bg-[#F7F7F8] border-black/15 text-[#1F2937] hover:border-black/40'
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 03: Simple Credentials */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#374151] font-bold block mb-1.5">
              03 // YOUR DETAILS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
              <input
                type="text"
                placeholder="Full Name / Preferred Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-black/20 bg-[#F7F7F8] text-xs text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="text"
                placeholder="Phone Number or Email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-black/20 bg-[#F7F7F8] text-xs text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              onClick={() => setIsBooked(true)}
              className="w-full py-3.5 rounded-xl bg-[#7BF0EB] text-[#111012] hover:bg-[#5debe5] font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              {isBooked ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Appointment Confirmed</span>
                </>
              ) : (
                <span>Book an Appointment &rarr;</span>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Chronometer Matrix with Overtime LCD */}
        <div className="lg:col-span-6 bg-[#0E0D0E] border border-white/10 rounded-3xl p-5 lg:p-7 shadow-2xl text-white flex flex-col justify-between h-full max-h-[460px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7BF0EB]" />
              <span className="text-[11px] font-mono tracking-widest text-[#7BF0EB] uppercase">
                KINETIC CHRONOMETER ENGINE
              </span>
            </div>
            <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">
              SYNCED
            </span>
          </div>

          {/* Matrix Body with Overtime LCD Segments */}
          <div className="flex-1 flex flex-col justify-around py-1">
            {/* 01 // SELECTED DATE */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className="text-white/60">01 // SELECTED DATE</span>
                <span className="text-[#7BF0EB] font-bold">
                  {displayedDate.day}, {displayedDate.month} {displayedDate.date}
                </span>
              </div>

              <div className="relative h-24 lg:h-28 flex items-center justify-center">
                {/* Kinetic Clock Matrix */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-4 lg:gap-5 transition-opacity duration-300 ${
                    showSolidNumbers ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="flex gap-1.5 lg:gap-2">
                    <ClassicDigitCluster digit="0" />
                    <ClassicDigitCluster digit="9" />
                  </div>
                  <div className="w-[1px] h-14 bg-white/20" />
                  <div className="flex gap-1.5 lg:gap-2">
                    <ClassicDigitCluster digit={clockDateD1} />
                    <ClassicDigitCluster digit={clockDateD2} />
                  </div>
                </div>

                {/* Overtime LCD Display */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-6 sm:gap-10 transition-all duration-500 ${
                    showSolidNumbers ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="flex gap-3">
                    <OvertimeLcdChar char="0" width={48} height={76} />
                    <OvertimeLcdChar char="9" width={48} height={76} />
                  </div>
                  <div className="w-[1.5px] h-14 sm:h-16 bg-white/20" />
                  <div className="flex gap-3">
                    <OvertimeLcdChar char={displayedDate.date[0]} width={48} height={76} />
                    <OvertimeLcdChar char={displayedDate.date[1]} width={48} height={76} />
                  </div>
                </div>
              </div>

              <div className="flex justify-around text-[9px] font-mono text-white/50 tracking-widest px-8">
                <span>MONTH</span>
                <span>DAY</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-0.5" />

            {/* 02 // TIME WINDOW */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className="text-white/60">02 // ARRIVAL WINDOW</span>
                <span className="text-[#7BF0EB] font-bold">
                  {displayedSlot.period} PRIORITY
                </span>
              </div>

              <div className="relative h-24 lg:h-28 flex items-center justify-center">
                {/* Kinetic Clock Matrix */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-4 lg:gap-5 transition-opacity duration-300 ${
                    showSolidNumbers ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="flex gap-1.5 lg:gap-2">
                    <ClassicDigitCluster digit={clockHourD1} />
                    <ClassicDigitCluster digit={clockHourD2} />
                  </div>
                  <div className="flex flex-col justify-center gap-2.5 px-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7BF0EB]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7BF0EB]" />
                  </div>
                  <div className="flex gap-1.5 lg:gap-2">
                    <ClassicDigitCluster digit={clockMinD1} />
                    <ClassicDigitCluster digit={clockMinD2} />
                  </div>
                </div>

                {/* Overtime LCD Display */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-4 sm:gap-6 transition-all duration-500 ${
                    showSolidNumbers ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="flex gap-3">
                    <OvertimeLcdChar char={displayedSlot.hour[0]} width={48} height={76} />
                    <OvertimeLcdChar char={displayedSlot.hour[1]} width={48} height={76} />
                  </div>

                  {/* Geometric Segment Colon */}
                  <div className="flex flex-col justify-center gap-3 px-1">
                    <div className="w-2 h-2.5 bg-[#7BF0EB] rounded-[1px] shadow-[0_0_8px_#7BF0EB]" />
                    <div className="w-2 h-2.5 bg-[#7BF0EB] rounded-[1px] shadow-[0_0_8px_#7BF0EB]" />
                  </div>

                  <div className="flex gap-3">
                    <OvertimeLcdChar char={displayedSlot.minute[0]} width={48} height={76} />
                    <OvertimeLcdChar char={displayedSlot.minute[1]} width={48} height={76} />
                  </div>
                </div>
              </div>

              <div className="flex justify-around text-[9px] font-mono text-white/50 tracking-widest px-8">
                <span>HOUR</span>
                <span>MIN</span>
              </div>
            </div>
          </div>

          {/* Footer of Matrix */}
          <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px] font-mono text-white/50 shrink-0">
            <span>24-CELL DUAL MATRIX (192 CLOCKS)</span>
            <span className="text-[#7BF0EB] font-semibold">DISCRETE PROTOCOL</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar with Accessible Contrast */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-t border-black/10 pt-2 text-[10px] font-mono text-[#4B5563] font-medium shrink-0">
        <span>100% CONFIDENTIAL • NO PUBLIC WAITING</span>
        <span>BEVERLY HILLS &bull; PRIVATE SUITE</span>
      </div>
    </section>
  );
};

export default BookingSection;
