import React, { useState } from 'react';
import { X, Calculator, CheckSquare, MessageCircle, Copy, Check } from 'lucide-react';

interface PlanningSuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTool?: 'budget' | 'checklist' | 'rsvp';
}

export const PlanningSuiteModal: React.FC<PlanningSuiteModalProps> = ({
  isOpen,
  onClose,
  defaultTool = 'budget'
}) => {
  const [activeTab, setActiveTab] = useState<'budget' | 'checklist' | 'rsvp'>(defaultTool);

  // Multi-Event Budget State
  const [mehndiGuests, setMehndiGuests] = useState(300);
  const [mehndiRate, setMehndiRate] = useState(2500);
  const [mehndiExtras, setMehndiExtras] = useState(350000);

  const [baraatGuests, setBaraatGuests] = useState(500);
  const [baraatRate, setBaraatRate] = useState(3400);
  const [baraatExtras, setBaraatExtras] = useState(850000);

  const [walimaGuests, setWalimaGuests] = useState(600);
  const [walimaRate, setWalimaRate] = useState(4200);
  const [walimaExtras, setWalimaExtras] = useState(900000);

  const mehndiTotal = (mehndiGuests * mehndiRate) + mehndiExtras;
  const baraatTotal = (baraatGuests * baraatRate) + baraatExtras;
  const walimaTotal = (walimaGuests * walimaRate) + walimaExtras;
  const grandTotal = mehndiTotal + baraatTotal + walimaTotal;

  // Desi Checklist State
  const [checklist, setChecklist] = useState<{ id: string; period: string; task: string; done: boolean }[]>([
    { id: '1', period: '9–12 Months', task: 'Lock Marquee / Banquet Hall (Peak winter dates fill 1 year ahead)', done: true },
    { id: '2', period: '9–12 Months', task: 'Book Bridal Couture Ateliers (Bunto, Ali Xeeshan require 16+ weeks)', done: true },
    { id: '3', period: '6–8 Months', task: 'Contract Lead Fine Art Photographer & 4K Cinema team', done: false },
    { id: '4', period: '6–8 Months', task: 'Select Master Desi Bawarchi / Caterer for Dum Pukht menu tasting', done: false },
    { id: '5', period: '3–4 Months', task: 'Confirm Segregated Hall partition & acoustic soundproofing', done: false },
    { id: '6', period: '3–4 Months', task: 'Reserve Bridal Makeup Salons for Mehndi, Baraat & Walima', done: false },
    { id: '7', period: '1–2 Months', task: 'Verify Punjab One-Dish compliance & sharp 10 PM curfew protocol', done: false },
    { id: '8', period: '2 Weeks', task: 'Confirm 100% prime generator redundancy with marquee management', done: false },
    { id: '9', period: '1 Week', task: 'Finalize valet parking staff count and VIP family motorcade slots', done: false },
  ]);

  const toggleTask = (id: string) => {
    setChecklist(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // WhatsApp RSVP State
  const [rsvpCouple, setRsvpCouple] = useState('Zara & Hamza');
  const [rsvpCeremony, setRsvpCeremony] = useState('Walima Reception');
  const [rsvpVenue, setRsvpVenue] = useState('The Nishat Royal Marquee, Lahore');
  const [rsvpDate, setRsvpDate] = useState('Sunday, 22nd November 2026');
  const [rsvpTime, setRsvpTime] = useState('Dinner Served at 7:45 PM (Strict 10:00 PM Curfew)');
  const [copiedRsvp, setCopiedRsvp] = useState(false);

  const getRsvpText = () => {
    return `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

In the Name of Allah, the Most Beneficent, the Most Merciful.

Mr. & Mrs. Tariq request the honor of your presence and blessings at the ${rsvpCeremony} of their beloved children:
*${rsvpCouple}*

*Venue:* ${rsvpVenue}
*Date:* ${rsvpDate}
*Time:* ${rsvpTime}
*Dress Code:* Traditional Festive / Royal Formal

Kindly confirm your RSVP by replying to this message.
May Allah bless this union with affection and prosperity.`;
  };

  const handleCopyRsvp = () => {
    navigator.clipboard.writeText(getRsvpText());
    setCopiedRsvp(true);
    setTimeout(() => setCopiedRsvp(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-[#FAF8F5] text-[#0B0F17] w-full max-w-3xl border border-[#C5A880] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#0B0F17] text-[#FAF8F5] px-6 py-4 border-b border-[#C5A880]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
              PAKISTANI NUPTIAL SUITE
            </span>
            <h2 className="text-xl font-serif text-[#FAF8F5]">
              Wedding Planning & Logistical Suite
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#FAF8F5]"
            aria-label="Close planning suite modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-[#181C24] px-6 pt-3 border-b border-[#C5A880]/20 flex gap-2">
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'budget'
                ? 'border-[#C5A880] text-[#C5A880] bg-[#0B0F17]'
                : 'border-transparent text-[#FAF8F5]/70 hover:text-[#FAF8F5]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Multi-Event Budget Tool</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'border-[#C5A880] text-[#C5A880] bg-[#0B0F17]'
                : 'border-transparent text-[#FAF8F5]/70 hover:text-[#FAF8F5]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Desi Timeline Checklist</span>
          </button>
          <button
            onClick={() => setActiveTab('rsvp')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'rsvp'
                ? 'border-[#C5A880] text-[#C5A880] bg-[#0B0F17]'
                : 'border-transparent text-[#FAF8F5]/70 hover:text-[#FAF8F5]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp RSVP Card</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: MULTI-EVENT BUDGET CALCULATOR */}
          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-serif font-semibold text-[#0B0F17]">
                  Ceremony-by-Ceremony PKR Expense Projection
                </h3>
                <p className="text-xs text-[#45474B]">
                  Accurately model catering and venue costs across traditional Pakistani multi-day celebrations.
                </p>
              </div>

              {/* Grand Total Summary Box */}
              <div className="bg-[#0B0F17] text-[#FAF8F5] p-5 border border-[#C5A880] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880]">
                    Projected Grand Multi-Day Investment
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C5A880] font-mono mt-0.5">
                    PKR {grandTotal.toLocaleString()}
                  </div>
                  <span className="text-xs text-[#FAF8F5]/70">
                    Approximately {(grandTotal / 10000000).toFixed(2)} Crore PKR (or {(grandTotal / 100000).toFixed(1)} Lacs)
                  </span>
                </div>
                <div className="text-xs space-y-1 text-right text-[#FAF8F5]/80">
                  <div>Mehndi: <span className="font-mono text-[#C5A880]">PKR {mehndiTotal.toLocaleString()}</span></div>
                  <div>Baraat: <span className="font-mono text-[#C5A880]">PKR {baraatTotal.toLocaleString()}</span></div>
                  <div>Walima: <span className="font-mono text-[#C5A880]">PKR {walimaTotal.toLocaleString()}</span></div>
                </div>
              </div>

              {/* Ceremony 1: Mehndi */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E5E0D8] space-y-3">
                <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#725B38]">
                    1. Mehndi Celebration
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#0B0F17]">
                    Subtotal: PKR {mehndiTotal.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[#45474B] mb-1">Guests: {mehndiGuests}</label>
                    <input
                      type="range"
                      min={100}
                      max={1000}
                      step={25}
                      value={mehndiGuests}
                      onChange={(e) => setMehndiGuests(Number(e.target.value))}
                      className="w-full accent-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#45474B] mb-1">Per-Head (PKR): {mehndiRate}</label>
                    <input
                      type="number"
                      value={mehndiRate}
                      onChange={(e) => setMehndiRate(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#45474B] mb-1">Décor & Hall Rent (PKR)</label>
                    <input
                      type="number"
                      value={mehndiExtras}
                      onChange={(e) => setMehndiExtras(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Ceremony 2: Baraat */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E5E0D8] space-y-3">
                <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#725B38]">
                    2. Baraat & Nikkah
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#0B0F17]">
                    Subtotal: PKR {baraatTotal.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[#45474B] mb-1">Guests: {baraatGuests}</label>
                    <input
                      type="range"
                      min={150}
                      max={1500}
                      step={25}
                      value={baraatGuests}
                      onChange={(e) => setBaraatGuests(Number(e.target.value))}
                      className="w-full accent-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#45474B] mb-1">Per-Head (PKR): {baraatRate}</label>
                    <input
                      type="number"
                      value={baraatRate}
                      onChange={(e) => setBaraatRate(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#45474B] mb-1">Décor, Hall & Stage (PKR)</label>
                    <input
                      type="number"
                      value={baraatExtras}
                      onChange={(e) => setBaraatExtras(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Ceremony 3: Walima */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E5E0D8] space-y-3">
                <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#725B38]">
                    3. Royal Walima Reception
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#0B0F17]">
                    Subtotal: PKR {walimaTotal.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[#45474B] mb-1">Guests: {walimaGuests}</label>
                    <input
                      type="range"
                      min={200}
                      max={2000}
                      step={25}
                      value={walimaGuests}
                      onChange={(e) => setWalimaGuests(Number(e.target.value))}
                      className="w-full accent-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#45474B] mb-1">Per-Head (PKR): {walimaRate}</label>
                    <input
                      type="number"
                      value={walimaRate}
                      onChange={(e) => setWalimaRate(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#45474B] mb-1">Grand Marquee Rent & Décor (PKR)</label>
                    <input
                      type="number"
                      value={walimaExtras}
                      onChange={(e) => setWalimaExtras(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESI TIMELINE CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-serif font-semibold text-[#0B0F17]">
                  The Pakistani Wedding Master Timeline
                </h3>
                <p className="text-xs text-[#45474B]">
                  Essential milestone dockets tailored specifically to local marquee bookings, couture lead times, and Punjab/Sindh marriage ordinances.
                </p>
              </div>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleTask(item.id)}
                    className={`p-3 border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      item.done
                        ? 'bg-[#FAF8F5] border-[#E5E0D8] opacity-70'
                        : 'bg-[#FFFFFF] border-[#C5A880]/50 hover:border-[#C5A880]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 border flex items-center justify-center shrink-0 ${
                        item.done ? 'bg-[#0F382C] border-[#0F382C] text-[#FAF8F5]' : 'border-[#C5A880]'
                      }`}>
                        {item.done && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#725B38] block">
                          {item.period}
                        </span>
                        <span className={`text-xs ${item.done ? 'line-through text-[#45474B]' : 'text-[#0B0F17] font-medium'}`}>
                          {item.task}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WHATSAPP RSVP CARD */}
          {activeTab === 'rsvp' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-serif font-semibold text-[#0B0F17]">
                  WhatsApp Digital Formal RSVP Generator
                </h3>
                <p className="text-xs text-[#45474B]">
                  Instantly construct an elegant digital invitation message for family broadcast circles with full event itinerary and curfew compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Couple Names</label>
                  <input
                    type="text"
                    value={rsvpCouple}
                    onChange={(e) => setRsvpCouple(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Ceremony Title</label>
                  <input
                    type="text"
                    value={rsvpCeremony}
                    onChange={(e) => setRsvpCeremony(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Venue Address</label>
                  <input
                    type="text"
                    value={rsvpVenue}
                    onChange={(e) => setRsvpVenue(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Event Date</label>
                  <input
                    type="text"
                    value={rsvpDate}
                    onChange={(e) => setRsvpDate(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2"
                  />
                </div>
              </div>

              {/* Message Preview Box */}
              <div className="bg-[#181C24] text-[#FAF8F5] p-4 border border-[#C5A880]/40 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                  Live Message Preview
                </span>
                <pre className="text-xs font-mono whitespace-pre-wrap text-[#FAF8F5]/90 leading-relaxed max-h-48 overflow-y-auto">
                  {getRsvpText()}
                </pre>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCopyRsvp}
                  className="px-6 py-2.5 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
                >
                  {copiedRsvp ? <Check className="w-3.5 h-3.5 text-[#0F382C]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRsvp ? 'Copied Invitation' : 'Copy Invitation Text'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
