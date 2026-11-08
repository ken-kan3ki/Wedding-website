import React, { useState } from 'react';
import { Calculator, CheckSquare, MessageCircle, Copy, Check, ShieldAlert, Sparkles } from 'lucide-react';

export const PlanningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'budget' | 'checklist' | 'rsvp'>('budget');

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

  // Checklist State
  const [checklist, setChecklist] = useState([
    { id: '1', period: '9–12 Months', task: 'Lock Marquee or Palace hall slot (especially for peak November–February dates)', done: true },
    { id: '2', period: '9–12 Months', task: 'Initiate bespoke Bridal Couture appointments (Bunto Kazmi, Ali Xeeshan, Faraz Manan)', done: true },
    { id: '3', period: '6–8 Months', task: 'Secure Fine Art 4K Photography & Cinema dockets with lead visualists', done: false },
    { id: '4', period: '6–8 Months', task: 'Book Mughal Stage & Floral Décor architect and inspect 3D layout renders', done: false },
    { id: '5', period: '4–6 Months', task: 'Arrange menu food tasting session with Master Desi Bawarchi (Mutton Dum Pukht & Biryani)', done: false },
    { id: '6', period: '3–4 Months', task: 'Audit Marquee for dual-hall acoustic segregation and verify soundproof partitions', done: false },
    { id: '7', period: '2–3 Months', task: 'Lock Bridal Makeup Salons for Mehndi, Baraat & Walima looks', done: false },
    { id: '8', period: '1 Month', task: 'Verify Punjab Marriage Ordinance compliance: One-Dish menu certificate & 10:00 PM lights-out plan', done: false },
    { id: '9', period: '2 Weeks', task: 'Confirm 100% prime diesel generator switchover test with venue engineering staff', done: false },
    { id: '10', period: '1 Week', task: 'Review Valet parking team roster and allocate VIP motorcade entrance lane', done: false },
  ]);

  const toggleTask = (id: string) => {
    setChecklist(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // RSVP Generator State
  const [couple, setCouple] = useState('Zara & Hamza');
  const [parents, setParents] = useState('Mr. & Mrs. Tariq Mahmood');
  const [ceremony, setCeremony] = useState('Royal Walima Reception');
  const [venue, setVenue] = useState('The Nishat Royal Marquee, Lahore');
  const [date, setDate] = useState('Sunday, 22nd November 2026');
  const [dinnerTime, setDinnerTime] = useState('7:45 PM Sharp (10:00 PM Curfew Adherence)');
  const [copied, setCopied] = useState(false);

  const getRsvpFormatted = () => {
    return `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

In the Name of Allah, the Most Beneficent, the Most Merciful.

${parents} request the honour of your presence and warm prayers at the ${ceremony} of their beloved children:

*${couple}*

*Venue:* ${venue}
*Date:* ${date}
*Dinner Served:* ${dinnerTime}
*Dress Code:* Traditional Formal / Royal Attire

Kindly RSVP with your confirmed party size.
May Allah bless this union with everlasting barakah and bliss.`;
  };

  const handleCopyRsvp = () => {
    navigator.clipboard.writeText(getRsvpFormatted());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="border-b border-[#E5E0D8] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
            CEREMONIAL LOGISTICS
          </span>
          <span className="text-xs text-[#45474B]">·</span>
          <span className="text-xs text-[#45474B] font-mono">Bespoke Pakistani Nuptial Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#0B0F17]">
          The Desi Wedding Planning Suite
        </h1>
        <p className="text-xs text-[#45474B] max-w-3xl leading-relaxed">
          Engineered for families orchestrating multi-day Pakistani celebrations. Accurately model ceremony budgets in PKR, track time-sensitive marquee and atelier deadlines, and generate formal digital RSVPs.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E0D8] pb-3">
        <button
          onClick={() => setActiveTab('budget')}
          className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border flex items-center gap-2 ${
            activeTab === 'budget'
              ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17]'
              : 'bg-[#FFFFFF] text-[#45474B] border-[#E5E0D8] hover:border-[#C5A880]'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Multi-Event Budget Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border flex items-center gap-2 ${
            activeTab === 'checklist'
              ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17]'
              : 'bg-[#FFFFFF] text-[#45474B] border-[#E5E0D8] hover:border-[#C5A880]'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Desi Timeline Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('rsvp')}
          className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border flex items-center gap-2 ${
            activeTab === 'rsvp'
              ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17]'
              : 'bg-[#FFFFFF] text-[#45474B] border-[#E5E0D8] hover:border-[#C5A880]'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>WhatsApp RSVP Manager</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'budget' && (
        <div className="space-y-8">
          {/* Grand Total Hero Box */}
          <div className="bg-[#0B0F17] text-[#FAF8F5] p-6 sm:p-8 border border-[#C5A880] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                Total Multi-Day Projected Nuptial Budget
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#C5A880] font-mono">
                PKR {grandTotal.toLocaleString()}
              </div>
              <p className="text-xs text-[#FAF8F5]/70">
                Equivalent to approx <strong>{(grandTotal / 10000000).toFixed(2)} Crore PKR</strong> (or {(grandTotal / 100000).toFixed(1)} Lacs PKR)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs font-mono text-[#FAF8F5]/90 border-t md:border-t-0 md:border-l border-[#C5A880]/30 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-[#C5A880] text-[10px] block uppercase">Mehndi</span>
                <span>PKR {mehndiTotal.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[#C5A880] text-[10px] block uppercase">Baraat</span>
                <span>PKR {baraatTotal.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[#C5A880] text-[10px] block uppercase">Walima</span>
                <span>PKR {walimaTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Interactive Ceremony Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Event 1: Mehndi */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] space-y-4">
              <div className="border-b border-[#E5E0D8] pb-3">
                <span className="text-[10px] uppercase font-semibold text-[#725B38] block">Day 1</span>
                <h3 className="text-lg font-serif font-semibold text-[#0B0F17]">Mehndi Dholak</h3>
                <span className="text-xs font-mono font-bold text-[#0F382C] mt-1 block">
                  PKR {mehndiTotal.toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#45474B]">Guest Count:</span>
                    <span className="font-mono font-bold">{mehndiGuests}</span>
                  </div>
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
                  <label className="block text-[#45474B] mb-1">Per-Head Food Rate (PKR)</label>
                  <input
                    type="number"
                    value={mehndiRate}
                    onChange={(e) => setMehndiRate(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#45474B] mb-1">Décor & Sound (PKR)</label>
                  <input
                    type="number"
                    value={mehndiExtras}
                    onChange={(e) => setMehndiExtras(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Event 2: Baraat */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] space-y-4">
              <div className="border-b border-[#E5E0D8] pb-3">
                <span className="text-[10px] uppercase font-semibold text-[#725B38] block">Day 2</span>
                <h3 className="text-lg font-serif font-semibold text-[#0B0F17]">Baraat & Nikkah</h3>
                <span className="text-xs font-mono font-bold text-[#0F382C] mt-1 block">
                  PKR {baraatTotal.toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#45474B]">Guest Count:</span>
                    <span className="font-mono font-bold">{baraatGuests}</span>
                  </div>
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
                  <label className="block text-[#45474B] mb-1">Per-Head Food Rate (PKR)</label>
                  <input
                    type="number"
                    value={baraatRate}
                    onChange={(e) => setBaraatRate(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#45474B] mb-1">Marquee Rent & Stage (PKR)</label>
                  <input
                    type="number"
                    value={baraatExtras}
                    onChange={(e) => setBaraatExtras(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Event 3: Walima */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] space-y-4">
              <div className="border-b border-[#E5E0D8] pb-3">
                <span className="text-[10px] uppercase font-semibold text-[#725B38] block">Day 3</span>
                <h3 className="text-lg font-serif font-semibold text-[#0B0F17]">Walima Reception</h3>
                <span className="text-xs font-mono font-bold text-[#0F382C] mt-1 block">
                  PKR {walimaTotal.toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#45474B]">Guest Count:</span>
                    <span className="font-mono font-bold">{walimaGuests}</span>
                  </div>
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
                  <label className="block text-[#45474B] mb-1">Per-Head Food Rate (PKR)</label>
                  <input
                    type="number"
                    value={walimaRate}
                    onChange={(e) => setWalimaRate(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#45474B] mb-1">Palace Rent & Décor (PKR)</label>
                  <input
                    type="number"
                    value={walimaExtras}
                    onChange={(e) => setWalimaExtras(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Legal Compliance Tip */}
          <div className="p-4 bg-[#FFFFFF] border border-[#C5A880] flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div className="text-xs text-[#45474B] leading-relaxed">
              <span className="font-semibold text-[#0B0F17] block">Statutory Budget Note:</span>
              Punjab One-Dish regulations limit food catering to 1 main course + 1 rice + 1 dessert. Selecting an official One-Dish menu typically reduces food costs by 25–35% while ensuring 100% police clearance on event night.
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E5E0D8] pb-4">
            <h3 className="text-xl font-serif text-[#0B0F17]">
              Master Pakistani Wedding Milestones
            </h3>
            <p className="text-xs text-[#45474B] mt-1">
              Click any milestone to mark as completed. Timelines reflect typical seasonal demand in Lahore, Karachi, and Islamabad.
            </p>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleTask(item.id)}
                className={`p-4 border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                  item.done
                    ? 'bg-[#FAF8F5] border-[#E5E0D8] opacity-75'
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
                    <span className="text-[10px] uppercase font-semibold text-[#725B38] block tracking-wider">
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

      {/* TAB CONTENT: WHATSAPP RSVP */}
      {activeTab === 'rsvp' && (
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E5E0D8] pb-4">
            <h3 className="text-xl font-serif text-[#0B0F17]">
              Pakistani Formal WhatsApp RSVP Card
            </h3>
            <p className="text-xs text-[#45474B] mt-1">
              Customize event coordinates, timings, and curfew reminders. Copy and paste directly into family WhatsApp groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Couple Names</label>
              <input
                type="text"
                value={couple}
                onChange={(e) => setCouple(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Host Parents</label>
              <input
                type="text"
                value={parents}
                onChange={(e) => setParents(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Ceremony Title</label>
              <input
                type="text"
                value={ceremony}
                onChange={(e) => setCeremony(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Venue Name & City</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Event Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#725B38] mb-1">Dinner Time & Curfew Notice</label>
              <input
                type="text"
                value={dinnerTime}
                onChange={(e) => setDinnerTime(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2"
              />
            </div>
          </div>

          {/* Formatted Output */}
          <div className="bg-[#0B0F17] text-[#FAF8F5] p-5 border border-[#C5A880]/30 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
              Live Invitation Broadcast Preview
            </span>
            <pre className="text-xs font-mono whitespace-pre-wrap text-[#FAF8F5]/90 leading-relaxed max-h-60 overflow-y-auto">
              {getRsvpFormatted()}
            </pre>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCopyRsvp}
              className="px-6 py-3 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#0F382C]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Invitation to Clipboard' : 'Copy Invitation Text'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
