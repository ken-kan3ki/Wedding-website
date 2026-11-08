import React, { useState } from 'react';
import { Venue } from '../data/weddingData';
import { X, Calendar, Users, Send, Check, Copy } from 'lucide-react';

interface CheckAvailabilityModalProps {
  venue: Venue | null;
  onClose: () => void;
}

export const CheckAvailabilityModal: React.FC<CheckAvailabilityModalProps> = ({
  venue,
  onClose
}) => {
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [ceremony, setCeremony] = useState<'Mehndi' | 'Baraat' | 'Walima' | 'Nikkah'>('Walima');
  const [guestCount, setGuestCount] = useState<number>(venue ? Math.min(venue.capacityMax, 500) : 400);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!venue) return null;

  const currentMenu = venue.menus[selectedMenuIndex] || venue.menus[0];
  const cateringTotal = guestCount * currentMenu.price;
  const grandTotal = cateringTotal + venue.hallRent;

  const generateWhatsAppMessage = () => {
    return `Salaam / Hello Rivayat & Noor Concierge,

I am inquiring regarding availability for:
*Venue:* ${venue.name} (${venue.city}, ${venue.area})
*Ceremony:* ${ceremony}
*Target Date:* ${eventDate}
*Estimated Guests:* ${guestCount} persons
*Selected Menu:* ${currentMenu.name} (PKR ${currentMenu.price.toLocaleString()}/head)
*Estimated Budget:* PKR ${grandTotal.toLocaleString()} (Includes PKR ${(venue.hallRent).toLocaleString()} Hall Rent)
*Client Name:* ${fullName || 'Bridal Family'}
*Phone:* ${phone || 'Provided via Portal'}
*Special Requests:* ${notes || 'None'}

Please verify date slot availability with the marquee management.`;
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#FAF8F5] text-[#0B0F17] w-full max-w-2xl border border-[#C5A880] shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#0B0F17] text-[#FAF8F5] px-6 py-4 border-b border-[#C5A880]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
              MARQUEE AVAILABILITY & QUOTE ESTIMATOR
            </span>
            <h2 className="text-xl font-serif text-[#FAF8F5]">
              {venue.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#FAF8F5] transition-colors"
            aria-label="Close availability modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-[#0F382C] text-[#C5A880] mx-auto flex items-center justify-center border border-[#C5A880]">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif text-[#0B0F17]">
              Availability Request Dispatched
            </h3>
            <p className="text-sm text-[#45474B] max-w-md mx-auto leading-relaxed">
              Your dates and specifications have been forwarded to the administrative desk of <strong>{venue.name}</strong>. A dedicated wedding coordinator will reach out to you within 2 hours.
            </p>
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-4 text-xs font-mono text-[#0B0F17] max-w-md mx-auto text-left space-y-1">
              <p>Reference: RN-PK-{Date.now().toString().slice(-6)}</p>
              <p>Date: {eventDate} · {ceremony}</p>
              <p>Est. Grand Total: PKR {grandTotal.toLocaleString()}</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Back to Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Ceremony & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  Wedding Ceremony
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {(['Mehndi', 'Baraat', 'Walima', 'Nikkah'] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCeremony(item)}
                      className={`py-2 px-3 text-xs uppercase tracking-wider transition-colors border ${
                        ceremony === item
                          ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17] font-semibold'
                          : 'bg-[#FFFFFF] border-[#E5E0D8] text-[#45474B] hover:border-[#C5A880]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  Target Event Date
                </label>
                <div className="flex items-center border border-[#E5E0D8] bg-[#FFFFFF] px-3 py-2">
                  <Calendar className="w-4 h-4 text-[#C5A880] mr-2 shrink-0" />
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs text-[#0B0F17] focus:outline-none bg-transparent"
                  />
                </div>
                <span className="text-[10px] text-[#45474B] mt-1 block">
                  *Winter peak slots (Nov–Feb) book 4–6 months in advance.
                </span>
              </div>
            </div>

            {/* Step 2: Guest Count Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#725B38]">
                  Estimated Guest Count
                </label>
                <span className="text-sm font-bold font-mono text-[#0B0F17] bg-[#FFFFFF] px-2 py-0.5 border border-[#E5E0D8]">
                  {guestCount.toLocaleString()} Guests
                </span>
              </div>
              <input
                type="range"
                min={venue.capacityMin}
                max={venue.capacityMax}
                step={25}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#45474B] font-mono">
                <span>Min: {venue.capacityMin.toLocaleString()}</span>
                <span>Max Capacity: {venue.capacityMax.toLocaleString()}</span>
              </div>
            </div>

            {/* Step 3: Catering Package Choice */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#725B38] block">
                Select Catering Menu Tariff
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {venue.menus.map((menu, idx) => (
                  <button
                    key={menu.name}
                    type="button"
                    onClick={() => setSelectedMenuIndex(idx)}
                    className={`p-3 text-left border transition-all ${
                      selectedMenuIndex === idx
                        ? 'bg-[#0B0F17] text-[#FAF8F5] border-[#C5A880]'
                        : 'bg-[#FFFFFF] border-[#E5E0D8] text-[#0B0F17] hover:border-[#C5A880]'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider block opacity-70">
                      Option {idx + 1}
                    </span>
                    <span className="text-xs font-semibold block line-clamp-1">
                      {menu.name.split(' ')[0]} Menu
                    </span>
                    <span className="text-xs font-mono font-bold text-[#C5A880] mt-1 block">
                      PKR {menu.price.toLocaleString()} / head
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Real-time PKR Bill Breakdown */}
            <div className="bg-[#181C24] text-[#FAF8F5] p-4 border border-[#C5A880]/30 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                Transparent PKR Budget Projection
              </span>
              <div className="flex justify-between text-xs py-1 border-b border-white/10">
                <span className="text-[#FAF8F5]/80">Catering ({guestCount} guests × PKR {currentMenu.price.toLocaleString()}):</span>
                <span className="font-mono">PKR {cateringTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/10">
                <span className="text-[#FAF8F5]/80">Base Hall Rental:</span>
                <span className="font-mono">PKR {(venue.hallRent).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-1 text-[#C5A880]">
                <span>Estimated Grand Total:</span>
                <span className="text-base font-mono font-bold">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Step 5: Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M. Tariq / Fatima Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] px-3 py-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] px-3 py-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full sm:w-auto px-4 py-3 text-xs uppercase tracking-wider font-semibold border border-[#0B0F17] text-[#0B0F17] hover:bg-[#FFFFFF] flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#0F382C]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Details' : 'Copy Quote Text'}</span>
              </button>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full sm:flex-1 py-3 text-xs uppercase tracking-widest font-semibold bg-[#0F382C] text-[#FAF8F5] hover:bg-[#144c3c] transition-colors flex items-center justify-center gap-2 border border-[#0F382C]"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Verify on WhatsApp</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-semibold bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] transition-colors"
              >
                Submit Form
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
