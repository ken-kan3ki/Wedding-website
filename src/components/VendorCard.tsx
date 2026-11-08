import React, { useState } from 'react';
import { Vendor } from '../data/weddingData';
import { Clock, Check, Plus, MessageCircle, Star } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
  isInBundle: boolean;
  onToggleBundle: (vendor: Vendor) => void;
  onOpenInquiry?: (vendor: Vendor) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  isInBundle,
  onToggleBundle,
  onOpenInquiry
}) => {
  const [showInclusions, setShowInclusions] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Salaam / Hello Rivayat & Noor Concierge,

I am interested in booking *${vendor.name}* (${vendor.discipline} in ${vendor.city}).
*Starting Tariff:* PKR ${vendor.startingPricePkr.toLocaleString()} ${vendor.priceUnit}
*Turnaround:* ${vendor.turnaroundTime}

Please connect me with their atelier coordinator for portfolio and date lock.`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className={`group bg-[#FFFFFF] border transition-all flex flex-col justify-between h-full ${
      isInBundle ? 'border-[#0F382C] ring-1 ring-[#0F382C]' : 'border-[#E5E0D8] hover:border-[#C5A880]'
    }`}>
      <div>
        {/* 4:5 Portrait Media Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#0B0F17]">
          <img
            src={vendor.image}
            alt={vendor.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Measured Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

          {/* Verification Badge */}
          {vendor.isVerified && (
            <div className="absolute top-3 left-3 bg-[#0B0F17]/90 border border-[#C5A880] px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-sm">
              <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C5A880]">
                SHAHI VERIFIED
              </span>
            </div>
          )}

          {/* City & Discipline */}
          <div className="absolute top-3 right-3 bg-[#0B0F17]/85 text-[#FAF8F5] text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 border border-white/10">
            {vendor.city}
          </div>

          {/* Turnaround Badge on Media */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FAF8F5]">
            <div className="flex items-center gap-1.5 bg-[#0B0F17]/85 px-2.5 py-1 border border-[#C5A880]/30">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] font-medium tracking-wider uppercase text-[#FAF8F5]">
                {vendor.turnaroundTime}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#0F382C]/90 text-[#FAF8F5] px-2 py-1 text-[11px] font-mono">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span>{vendor.rating.toFixed(2)} ({vendor.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Content Pane */}
        <div className="p-5 space-y-3">
          {/* Discipline and Area */}
          <div className="flex items-center justify-between text-xs text-[#725B38] border-b border-[#E5E0D8] pb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
              {vendor.discipline}
            </span>
            <span className="text-[11px] text-[#45474B]">
              {vendor.area}
            </span>
          </div>

          {/* Vendor Name */}
          <h3 className="text-lg font-serif font-medium text-[#0B0F17] group-hover:text-[#725B38] transition-colors line-clamp-1">
            {vendor.name}
          </h3>

          <p className="text-xs text-[#45474B] line-clamp-2 leading-relaxed">
            {vendor.tagline}
          </p>

          {/* Ceremonies tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {vendor.ceremonies.map((c) => (
              <span
                key={c}
                className="text-[10px] uppercase tracking-wider text-[#0B0F17] bg-[#FAF8F5] border border-[#E5E0D8] px-2 py-0.5"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Inclusions Dropdown Preview */}
          <div className="pt-2">
            <button
              onClick={() => setShowInclusions(!showInclusions)}
              className="text-[11px] text-[#725B38] underline underline-offset-4 hover:text-[#0B0F17] transition-colors"
            >
              {showInclusions ? 'Hide Package Inclusions' : `View Inclusions (${vendor.inclusions.length})`}
            </button>

            {showInclusions && (
              <div className="mt-2 p-3 bg-[#FAF8F5] border border-[#E5E0D8] space-y-1.5 text-xs">
                {vendor.inclusions.map((item) => (
                  <div key={item} className="flex items-start gap-1.5 text-[#45474B]">
                    <Check className="w-3.5 h-3.5 text-[#0F382C] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Booking Footer */}
      <div className="p-5 pt-0 space-y-3">
        <div className="pt-3 border-t border-[#E5E0D8] flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#725B38] block">
              Investment Tier
            </span>
            <span className="text-base font-serif font-semibold text-[#0B0F17] font-mono">
              PKR {vendor.startingPricePkr.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-[#45474B] uppercase tracking-wider">
            {vendor.priceUnit}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onToggleBundle(vendor)}
            className={`py-2 px-3 text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1 border ${
              isInBundle
                ? 'bg-[#0F382C] text-[#FAF8F5] border-[#0F382C]'
                : 'border-[#0B0F17] text-[#0B0F17] hover:bg-[#FAF8F5]'
            }`}
          >
            {isInBundle ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Bundle</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bundle</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="py-2 px-3 text-xs uppercase tracking-wider font-semibold bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] transition-colors flex items-center justify-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
