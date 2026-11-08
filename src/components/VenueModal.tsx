import React, { useState } from 'react';
import { Venue } from '../data/weddingData';
import { X, Check, Clock, ShieldCheck, Zap, Car, Users, Sparkles } from 'lucide-react';

interface VenueModalProps {
  venue: Venue | null;
  onClose: () => void;
  onCheckAvailability: (venue: Venue) => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({
  venue,
  onClose,
  onCheckAvailability
}) => {
  const [selectedMenuIdx, setSelectedMenuIdx] = useState(0);

  if (!venue) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-[#FAF8F5] text-[#0B0F17] w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#C5A880] shadow-2xl relative">
        {/* Sticky Header with Title and Close */}
        <div className="sticky top-0 z-20 bg-[#0B0F17] text-[#FAF8F5] px-6 py-4 border-b border-[#C5A880]/40 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                {venue.city} · {venue.area}
              </span>
              {venue.isVerified && (
                <span className="text-[10px] bg-[#D4AF37] text-[#0B0F17] font-bold px-1.5 py-0.2 tracking-wider uppercase">
                  SHAHI VERIFIED
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#FAF8F5]">
              {venue.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#FAF8F5] transition-colors"
            aria-label="Close venue details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Bento Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 aspect-[16/10] overflow-hidden bg-[#0B0F17]">
              <img
                src={venue.images[0]}
                alt={venue.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="aspect-[16/10] overflow-hidden bg-[#0B0F17]">
                <img
                  src={venue.images[1] || venue.images[0]}
                  alt={`${venue.name} interior`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 bg-[#181C24] p-4 text-[#FAF8F5] border border-[#C5A880]/20 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block">Guest Capacity</span>
                  <p className="text-xl font-serif mt-1 font-mono">{venue.capacityMin.toLocaleString()} to {venue.capacityMax.toLocaleString()} Persons</p>
                </div>
                <div className="pt-2 border-t border-[#C5A880]/20">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block">Hall Rent</span>
                  <p className="text-sm font-mono font-medium">PKR {(venue.hallRent).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Address */}
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-[#725B38]">
              Architectural Overview & Heritage
            </h3>
            <p className="text-sm text-[#45474B] leading-relaxed">
              {venue.description}
            </p>
            <p className="text-xs text-[#725B38] font-medium pt-1">
              Address: {venue.address}
            </p>
          </div>

          {/* Pakistani Logistical Specifications Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-[#725B38]">
              Logistical & Engineering Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-3">
                <span className="text-[10px] uppercase tracking-wider text-[#45474B] block">Covered Area</span>
                <span className="text-sm font-semibold font-mono text-[#0B0F17]">{venue.specifications.totalAreaSqFt}</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-3">
                <span className="text-[10px] uppercase tracking-wider text-[#45474B] block">Ceiling Height</span>
                <span className="text-sm font-semibold font-mono text-[#0B0F17]">{venue.specifications.ceilingHeightFt} Feet</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-3">
                <span className="text-[10px] uppercase tracking-wider text-[#45474B] block">Valet Parking</span>
                <span className="text-sm font-semibold font-mono text-[#0B0F17]">{venue.specifications.parkingCapacity} Vehicles</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-3">
                <span className="text-[10px] uppercase tracking-wider text-[#45474B] block">Bridal Suites</span>
                <span className="text-sm font-semibold font-mono text-[#0B0F17]">{venue.specifications.bridalSuitesCount} Dedicated Rooms</span>
              </div>
            </div>

            {/* Compliance Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E0D8] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0F382C] shrink-0" />
                <div>
                  <span className="text-xs font-semibold block">One-Dish Compliant</span>
                  <span className="text-[10px] text-[#45474B]">Licensed under Marriage Act</span>
                </div>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E0D8] flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-xs font-semibold block">100% Prime Generator</span>
                  <span className="text-[10px] text-[#45474B]">Automatic 0-second transfer</span>
                </div>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E0D8] flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#725B38] shrink-0" />
                <div>
                  <span className="text-xs font-semibold block">Segregated Halls</span>
                  <span className="text-[10px] text-[#45474B]">Acoustically isolated partitions</span>
                </div>
              </div>
            </div>

            {/* Curfew Callout */}
            <div className="p-3 bg-[#0B0F17] text-[#FAF8F5] border-l-2 border-[#C5A880] flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-[#C5A880] uppercase tracking-wider block">
                  Curfew & Law Enforcement Policy ({venue.curfewTime})
                </span>
                <span className="text-[#FAF8F5]/80">{venue.curfewNote}</span>
              </div>
            </div>
          </div>

          {/* Tabbed Pakistani Catering Menus */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-[#725B38]">
                Curated Banquet Menus
              </h3>
              <span className="text-xs text-[#45474B]">Prices in PKR inclusive of standard taxes</span>
            </div>

            {/* Menu Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-[#E5E0D8] pb-1">
              {venue.menus.map((menu, idx) => (
                <button
                  key={menu.name}
                  onClick={() => setSelectedMenuIdx(idx)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                    selectedMenuIdx === idx
                      ? 'bg-[#0B0F17] text-[#C5A880] border border-[#0B0F17]'
                      : 'bg-[#FFFFFF] text-[#45474B] border border-[#E5E0D8] hover:border-[#C5A880]'
                  }`}
                >
                  {menu.name.split(' ')[0]} ({idx + 1})
                </button>
              ))}
            </div>

            {/* Active Menu Card */}
            {venue.menus[selectedMenuIdx] && (
              <div className="bg-[#FFFFFF] border border-[#C5A880]/40 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E5E0D8] pb-3">
                  <div>
                    <h4 className="text-base font-serif font-semibold text-[#0B0F17]">
                      {venue.menus[selectedMenuIdx].name}
                    </h4>
                    <p className="text-xs text-[#45474B] mt-0.5">
                      {venue.menus[selectedMenuIdx].description}
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-lg font-serif font-bold text-[#0F382C] font-mono">
                      PKR {venue.menus[selectedMenuIdx].price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#45474B] block uppercase tracking-wider">Per Person</span>
                  </div>
                </div>

                {/* Items Checklist */}
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#725B38] block mb-2">
                    Included Culinary Courses
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {venue.menus[selectedMenuIdx].items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[#0B0F17]">
                        <Check className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#45474B]">
              <span className="block font-medium">Have specific guest requirements or custom dates?</span>
              <span>Our wedding concierge will verify direct marquee availability with management.</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider font-semibold border border-[#0B0F17] hover:bg-[#FAF8F5]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onCheckAvailability(venue);
                }}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-semibold bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Check Availability & Calculate Bill</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
