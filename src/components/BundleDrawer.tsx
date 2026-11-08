import React, { useState } from 'react';
import { Vendor } from '../data/weddingData';
import { X, Trash2, Send, Check, Sparkles } from 'lucide-react';

interface BundleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: Vendor[];
  onRemoveVendor: (vendorId: string) => void;
  onClearBundle: () => void;
  onNavigateToServices: () => void;
}

export const BundleDrawer: React.FC<BundleDrawerProps> = ({
  isOpen,
  onClose,
  bundle,
  onRemoveVendor,
  onClearBundle,
  onNavigateToServices
}) => {
  const [city, setCity] = useState('Lahore');
  const [eventSeason, setEventSeason] = useState('Winter 2026 (Nov–Feb)');
  const [budgetTier, setBudgetTier] = useState('Royal Heirloom (PKR 5M–10M)');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalStartingPkr = bundle.reduce((acc, curr) => acc + curr.startingPricePkr, 0);

  const generateBundleWhatsApp = () => {
    const vendorList = bundle.map((v, i) => `${i + 1}. *${v.name}* (${v.discipline}) — from PKR ${v.startingPricePkr.toLocaleString()}`).join('\n');
    return `Salaam / Hello Rivayat & Noor Concierge Desk,

I would like to inquire about a *Unified Wedding Vendor Bundle*:
*Location:* ${city}
*Target Season:* ${eventSeason}
*Desired Budget Tier:* ${budgetTier}
*Primary Contact:* ${clientName || 'Bridal Family'} (${clientPhone || 'Pending'})

*Selected Ateliers & Services (${bundle.length}):*
${vendorList}

*Aggregated Base Starting Investment:* PKR ${totalStartingPkr.toLocaleString()}

Please coordinate bundled availability discounts and consultation slots.`;
  };

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(generateBundleWhatsApp());
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-[#FAF8F5] text-[#0B0F17] h-full overflow-y-auto border-l border-[#C5A880] shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div>
          <div className="bg-[#0B0F17] text-[#FAF8F5] px-6 py-5 border-b border-[#C5A880]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                  UNIFIED BESPOKE PLANNER
                </span>
                <h2 className="text-xl font-serif text-[#FAF8F5]">
                  Wedding Bundle ({bundle.length})
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#FAF8F5]"
              aria-label="Close bundle drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-[#0F382C] text-[#C5A880] mx-auto flex items-center justify-center border border-[#C5A880]">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-[#0B0F17]">
                  Bundle Inquiry Transmitted
                </h3>
                <p className="text-xs text-[#45474B] leading-relaxed max-w-sm mx-auto">
                  Our royal bridal concierge has synchronized your inquiry with each selected atelier. You will receive a compiled multi-vendor availability docket via WhatsApp and email.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClearBundle();
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-[#0B0F17] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold"
                  >
                    Done & Reset
                  </button>
                </div>
              </div>
            ) : bundle.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-sm text-[#45474B]">
                  Your bespoke bundle is currently empty.
                </p>
                <p className="text-xs text-[#725B38] max-w-xs mx-auto">
                  Browse our curated couture ateliers, fine art photographers, stage decorators, and master bawarchis to build your dream team.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToServices();
                  }}
                  className="px-6 py-3 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Explore Services Directory
                </button>
              </div>
            ) : (
              <>
                {/* List of Selected Vendors */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-[#E5E0D8]">
                    <span className="font-semibold uppercase tracking-wider text-[#725B38]">
                      Selected Suppliers ({bundle.length})
                    </span>
                    <button
                      onClick={onClearBundle}
                      className="text-[11px] text-[#BA1A1A] hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {bundle.map((vendor) => (
                      <div
                        key={vendor.id}
                        className="p-3 bg-[#FFFFFF] border border-[#E5E0D8] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover shrink-0 border border-[#E5E0D8]"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-[#725B38] block truncate">
                              {vendor.discipline}
                            </span>
                            <h4 className="text-xs font-semibold text-[#0B0F17] truncate">
                              {vendor.name}
                            </h4>
                            <span className="text-xs font-mono text-[#0F382C] font-medium">
                              From PKR {vendor.startingPricePkr.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveVendor(vendor.id)}
                          className="p-1.5 text-[#BA1A1A] hover:bg-[#BA1A1A]/10 transition-colors"
                          aria-label={`Remove ${vendor.name} from bundle`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aggregated Total Card */}
                <div className="bg-[#181C24] text-[#FAF8F5] p-4 border border-[#C5A880]/30 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880]">
                      Combined Base Starting Tariff
                    </span>
                    <span className="text-lg font-serif font-bold text-[#C5A880] font-mono">
                      PKR {totalStartingPkr.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#FAF8F5]/60">
                    *Excludes custom customization charges, travel dockets, and venue hall rentals.
                  </p>
                </div>

                {/* Form configuration */}
                <form onSubmit={handleSubmitForm} className="space-y-4 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                        Wedding City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Multan">Multan</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                        Timeline Season
                      </label>
                      <select
                        value={eventSeason}
                        onChange={(e) => setEventSeason(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Winter 2026 (Nov–Feb)">Winter 2026 (Nov–Feb)</option>
                        <option value="Spring 2027 (Mar–Apr)">Spring 2027 (Mar–Apr)</option>
                        <option value="Autumn 2026 (Sep–Oct)">Autumn 2026 (Sep–Oct)</option>
                        <option value="Summer 2026">Summer 2026</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                      Target Budget Tier
                    </label>
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Heritage Classic (PKR 3M–5M)">Heritage Classic (PKR 3M–5M)</option>
                      <option value="Royal Heirloom (PKR 5M–10M)">Royal Heirloom (PKR 5M–10M)</option>
                      <option value="Imperial Society (PKR 10M–25M+)">Imperial Society (PKR 10M–25M+)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Family representative"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 0000000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full py-3 bg-[#0F382C] text-[#FAF8F5] hover:bg-[#144c3c] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 border border-[#0F382C]"
                    >
                      <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Transmit Unified Bundle via WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      Submit Concierge Request
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Drawer Footer Advice */}
        <div className="bg-[#EFEEEB] p-4 text-[11px] text-[#45474B] border-t border-[#E5E0D8]">
          <span className="font-semibold block text-[#0B0F17]">Direct Concierge Guarantee:</span>
          No booking commissions charged to couples. Official rates guaranteed directly from verified ateliers.
        </div>
      </div>
    </div>
  );
};
