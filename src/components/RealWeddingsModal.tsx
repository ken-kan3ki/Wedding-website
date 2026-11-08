import React from 'react';
import { RealWedding } from '../data/weddingData';
import { X, Users, MapPin, Calendar, Sparkles } from 'lucide-react';

interface RealWeddingsModalProps {
  wedding: RealWedding | null;
  onClose: () => void;
  onSelectVenue?: (venueId: string) => void;
  onNavigateToVenues?: () => void;
}

export const RealWeddingsModal: React.FC<RealWeddingsModalProps> = ({
  wedding,
  onClose,
  onSelectVenue,
  onNavigateToVenues
}) => {
  if (!wedding) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-[#FAF8F5] text-[#0B0F17] w-full max-w-3xl border border-[#C5A880] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#0B0F17] text-[#FAF8F5] px-6 py-4 border-b border-[#C5A880]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
              REAL WEDDING SHOWCASE · {wedding.ceremony.toUpperCase()}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-[#FAF8F5]">
              {wedding.couple}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#FAF8F5]"
            aria-label="Close real wedding modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Banner */}
        <div className="aspect-[16/9] w-full bg-[#0B0F17] overflow-hidden">
          <img
            src={wedding.coverImage}
            alt={wedding.couple}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8] text-xs text-[#45474B]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{wedding.venueName}, {wedding.city}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{wedding.date}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{wedding.guestCount.toLocaleString()} Guests</span>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#725B38] block mb-2">
              Ceremonial Nuptial Palette
            </span>
            <div className="flex items-center gap-3">
              {wedding.palette.map((color) => (
                <div key={color} className="flex items-center gap-1.5">
                  <div
                    className="w-6 h-6 border border-[#E5E0D8]"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs font-mono text-[#45474B] uppercase">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Story */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#725B38]">
              The Wedding Story
            </h3>
            <p className="text-sm text-[#0B0F17] leading-relaxed">
              {wedding.story}
            </p>
            <p className="text-xs text-[#45474B] leading-relaxed">
              From authentic dholak beats echoing through illuminated Mughal pavilions to hand-beaded bridal heirlooms, this celebration honored generational family traditions while integrating contemporary luxury hospitality.
            </p>
          </div>

          {/* Tagged Vendor Credits */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#725B38]">
                Tagged Vendor Credits
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wedding.vendors.map((v) => (
                <div
                  key={v.name}
                  className="p-3 bg-[#FFFFFF] border border-[#E5E0D8] flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#725B38] block">
                      {v.role}
                    </span>
                    <span className="text-xs font-semibold text-[#0B0F17]">
                      {v.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#0F382C] font-semibold bg-[#0F382C]/10 px-2 py-0.5">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E5E0D8] flex justify-end">
            <button
              onClick={() => {
                onClose();
                if (wedding.venueId && onSelectVenue) {
                  onSelectVenue(wedding.venueId);
                } else if (onNavigateToVenues) {
                  onNavigateToVenues();
                }
              }}
              className="px-6 py-2.5 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Similar Venues
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
