import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'venues' | 'services' | 'real-weddings' | 'planning') => void;
  onOpenPartnerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPartnerModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0B0F17] text-[#FAF8F5] border-t border-[#C5A880]/30 mt-20">
      {/* Top Banner: For Venue Owners and Ateliers */}
      <div className="border-b border-[#C5A880]/20 bg-[#0F382C]/30 py-12 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
              ATELIER & MARQUEE PARTNERSHIP
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5]">
              Own an Esteemed Marquee or Couture Bridal House?
            </h3>
            <p className="text-sm text-[#FAF8F5]/70 leading-relaxed">
              Join Pakistan’s exclusive registry of certified luxury wedding suppliers. Connect with high-intent families across Lahore, Karachi, Islamabad, and overseas diaspora.
            </p>
          </div>
          <button
            onClick={onOpenPartnerModal}
            className="px-6 py-3.5 bg-[#C5A880] text-[#0B0F17] hover:bg-[#d8bd95] text-xs font-semibold uppercase tracking-widest transition-colors shrink-0"
          >
            Apply for Shahi Verification
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center bg-[#0B0F17]">
              <span className="text-[#C5A880] text-xs font-serif font-bold">RN</span>
            </div>
            <div className="text-2xl font-serif tracking-widest text-[#FAF8F5]">
              RIVAYAT & NOOR
            </div>
          </div>
          <p className="text-sm text-[#FAF8F5]/70 leading-relaxed max-w-sm">
            The definitive bridal portal for Pakistan. Celebrating centuries of Mughal splendor, classical zardozi embroidery, royal banquets, and timeless nuptial rituals.
          </p>
          <div className="pt-2 text-xs text-[#C5A880] space-y-1">
            <p>Concierge Desk: Gulberg III, Lahore & Clifton, Karachi</p>
            <p>Direct Inquiries: concierge@rivayatnoor.pk</p>
          </div>
        </div>

        {/* Column 2: Wedding Venues by City */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A880]">
            Regional Venues
          </h4>
          <ul className="space-y-2 text-sm text-[#FAF8F5]/75">
            <li>
              <button onClick={() => onNavigate('venues')} className="hover:text-[#C5A880] transition-colors">
                Lahore Marquees (Gulberg & DHA)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('venues')} className="hover:text-[#C5A880] transition-colors">
                Karachi Creek & Clifton Lawns
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('venues')} className="hover:text-[#C5A880] transition-colors">
                Islamabad Diplomatic Palaces
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('venues')} className="hover:text-[#C5A880] transition-colors">
                Multan Cantt & Heritage Halls
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('venues')} className="hover:text-[#C5A880] transition-colors">
                Segregated Hall Verified Lists
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Bridal Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A880]">
            Haute Services
          </h4>
          <ul className="space-y-2 text-sm text-[#FAF8F5]/75">
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#C5A880] transition-colors">
                Bespoke Bridal Couture
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#C5A880] transition-colors">
                Fine Art 4K Cinematography
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#C5A880] transition-colors">
                Mughal Architectural Décor
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#C5A880] transition-colors">
                Dum Pukht Desi Catering
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#C5A880] transition-colors">
                Rajasthani Organic Henna
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Curated Gazette & Gazette Newsletter */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A880]">
            The Royal Gazette
          </h4>
          <p className="text-xs text-[#FAF8F5]/70 leading-relaxed">
            Receive private preview dockets of new couture collections and seasonal marquee tariff schedules.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex border border-[#C5A880]/40 focus-within:border-[#C5A880]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-[#181C24] px-3 py-2 text-xs text-[#FAF8F5] focus:outline-none placeholder:text-[#FAF8F5]/40"
              />
              <button
                type="submit"
                className="px-3 bg-[#C5A880] text-[#0B0F17] hover:bg-[#d8bd95] transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] text-[#C5A880] flex items-center gap-1">
                <Check className="w-3 h-3 text-[#C5A880]" />
                Subscribed to the Gazette.
              </p>
            )}
          </form>
          <div className="pt-1 text-[11px] text-[#FAF8F5]/50 space-y-1">
            <p>One-Dish Guidelines Certified</p>
            <p>Strict 10:00 PM Punjab Curfew Advisory</p>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#C5A880]/15 py-6 px-6 sm:px-12 text-xs text-[#FAF8F5]/60">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span>© 2026 Rivayat & Noor Limited. All rights reserved.</span>
            <span>·</span>
            <span>Registered in Pakistan</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('planning')} className="hover:text-[#C5A880] transition-colors">
              Desi Timeline Guide
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('venues')} className="hover:text-[#C5A880] transition-colors">
              Punjab Marriage Act Advisory
            </button>
            <span>·</span>
            <button onClick={() => onOpenPartnerModal()} className="hover:text-[#C5A880] transition-colors">
              Vendor Code of Ethics
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
