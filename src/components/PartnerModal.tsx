import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [businessType, setBusinessType] = useState<'Marquee / Palace' | 'Bridal Couture' | 'Photography' | 'Décor & Florals' | 'Catering' | 'Makeup & Henna'>('Marquee / Palace');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#FAF8F5] text-[#0B0F17] w-full max-w-xl border border-[#C5A880] shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#0B0F17] text-[#FAF8F5] px-6 py-4 border-b border-[#C5A880]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
              PARTNER ONBOARDING
            </span>
            <h2 className="text-xl font-serif text-[#FAF8F5]">
              List Your Marquee or Atelier
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#FAF8F5]"
            aria-label="Close partner modal"
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
              Application Logged for Review
            </h3>
            <p className="text-xs text-[#45474B] leading-relaxed max-w-sm mx-auto">
              Our partner inspection committee verifies physical venue infrastructure, generator redundancy, and statutory certifications before granting the Shahi Verified emblem.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#0B0F17] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <p className="text-xs text-[#45474B] leading-relaxed">
              Showcase your venue or bridal services to thousands of discerning brides and grooms across Pakistan and overseas overseas diaspora.
            </p>

            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                Category of Enterprise
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as any)}
                className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
              >
                <option value="Marquee / Palace">Marquee / Palace Banquet Hall</option>
                <option value="Bridal Couture">Haute Couture Bridal Atelier</option>
                <option value="Photography">Fine Art & Cinema Studio</option>
                <option value="Décor & Florals">Royal Stage & Floral Décor</option>
                <option value="Catering">Mughal & Desi Catering Kitchen</option>
                <option value="Makeup & Henna">Bridal Salon & Henna Artist</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  Establishment Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Palm Banquets"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  Operating City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad / Rawalpindi</option>
                  <option value="Multan">Multan</option>
                  <option value="Nationwide">Nationwide</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  Primary Contact Person
                </label>
                <input
                  type="text"
                  required
                  placeholder="Owner / General Manager"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block mb-1">
                  Official WhatsApp Contact
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs uppercase tracking-wider border border-[#0B0F17] hover:bg-[#FAF8F5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
