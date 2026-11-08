import React, { useState } from 'react';
import { Venue } from '../data/weddingData';
import { Users, Clock, ShieldCheck, ChevronLeft, ChevronRight, Zap, Sparkles } from 'lucide-react';

interface VenueCardProps {
  venue: Venue;
  onOpenDetails: (venue: Venue) => void;
  onCheckAvailability: (venue: Venue) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  onOpenDetails,
  onCheckAvailability
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + venue.images.length) % venue.images.length);
  };

  return (
    <div className="group bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] transition-all flex flex-col h-full">
      {/* 16:10 Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0F17]">
        <img
          src={venue.images[currentImgIdx] || venue.images[0]}
          alt={venue.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Gradient scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Shahi Verification Badge */}
        {venue.isVerified && (
          <div className="absolute top-3 left-3 bg-[#0B0F17]/90 border border-[#C5A880] px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-sm">
            <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C5A880]">
              SHAHI VERIFIED
            </span>
          </div>
        )}

        {/* City & Area Badge */}
        <div className="absolute top-3 right-3 bg-[#0B0F17]/80 text-[#FAF8F5] text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 border border-white/10">
          {venue.city} · {venue.area}
        </div>

        {/* Image Carousel Controls if multiple */}
        {venue.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="w-8 h-8 bg-[#0B0F17]/80 text-[#FAF8F5] hover:text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 bg-[#0B0F17]/80 text-[#FAF8F5] hover:text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Curfew & Logistics Overlay at Bottom of Media */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FAF8F5]">
          <div className="flex items-center gap-1.5 bg-[#0B0F17]/80 px-2 py-0.5 border border-white/10">
            <Clock className="w-3 h-3 text-[#C5A880]" />
            <span className="text-[11px] tracking-wider uppercase font-medium">
              Curfew: {venue.curfewTime}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#0F382C]/90 text-[#FAF8F5] px-2 py-0.5 border border-[#C5A880]/40 text-[11px]">
            <Zap className="w-3 h-3 text-[#C5A880]" />
            <span>100% Gen Backup</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Capacity and Segregation Indicator */}
          <div className="flex items-center justify-between text-xs text-[#45474B] pb-2 border-b border-[#E5E0D8]">
            <div className="flex items-center gap-1.5 font-mono">
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{venue.capacityMin.toLocaleString()} – {venue.capacityMax.toLocaleString()} Guests</span>
            </div>
            {venue.segregatedHalls && (
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#0F382C] bg-[#0F382C]/10 px-2 py-0.5">
                Segregated Halls
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(venue)}
            className="mt-3 text-xl font-serif font-medium text-[#0B0F17] hover:text-[#725B38] transition-colors cursor-pointer line-clamp-1"
          >
            {venue.name}
          </h3>

          <p className="mt-2 text-xs text-[#45474B] line-clamp-2 leading-relaxed">
            {venue.description}
          </p>

          {/* Pakistani Logistical Highlights */}
          <div className="mt-3 pt-3 border-t border-[#E5E0D8]/60 flex flex-wrap gap-2 text-[11px] text-[#45474B]">
            {venue.oneDishCompliant && (
              <span className="flex items-center gap-1 text-[#0F382C] font-medium">
                <ShieldCheck className="w-3 h-3 text-[#0F382C]" />
                One-Dish Certified
              </span>
            )}
            {venue.valetParking && (
              <span>· Valet Included ({venue.specifications.parkingCapacity} Cars)</span>
            )}
            {venue.bridalSuite && (
              <span>· {venue.specifications.bridalSuitesCount} Bridal Suites</span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 border-t border-[#E5E0D8] space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#725B38] block">
                Per-Head Catering
              </span>
              <span className="text-base font-serif font-semibold text-[#0B0F17] font-mono">
                PKR {venue.pricePerHeadMin.toLocaleString()} – {venue.pricePerHeadMax.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-[#725B38] block">
                Hall Base Rent
              </span>
              <span className="text-xs font-mono font-medium text-[#45474B]">
                PKR {(venue.hallRent / 100000).toFixed(1)} Lacs
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onOpenDetails(venue)}
              className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#0B0F17] text-[#0B0F17] hover:bg-[#FAF8F5] transition-colors text-center"
            >
              Specs & Menus
            </button>
            <button
              onClick={() => onCheckAvailability(venue)}
              className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] transition-colors text-center flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#C5A880] group-hover:text-[#0B0F17]" />
              <span>Availability</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
