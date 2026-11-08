import React, { useState } from 'react';
import { REAL_WEDDINGS, RealWedding } from '../data/weddingData';
import { MapPin, Calendar, Users, ArrowRight, Sparkles } from 'lucide-react';

interface RealWeddingsPageProps {
  onOpenRealWeddingModal: (wedding: RealWedding) => void;
  onNavigateToVenues: () => void;
}

export const RealWeddingsPage: React.FC<RealWeddingsPageProps> = ({
  onOpenRealWeddingModal,
  onNavigateToVenues
}) => {
  const [selectedCeremony, setSelectedCeremony] = useState<'All' | 'Mehndi' | 'Baraat / Nikkah' | 'Walima'>('All');

  const filteredWeddings = selectedCeremony === 'All'
    ? REAL_WEDDINGS
    : REAL_WEDDINGS.filter(w => w.ceremony === selectedCeremony);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="border-b border-[#E5E0D8] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
            DOCUMENTARY ARCHIVES
          </span>
          <span className="text-xs text-[#45474B]">·</span>
          <span className="text-xs text-[#45474B] font-mono">{filteredWeddings.length} Celebrations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#0B0F17]">
          Real Pakistani Weddings & Vendor Credits
        </h1>
        <p className="text-xs text-[#45474B] max-w-3xl leading-relaxed">
          Examine curated high-society celebrations across Lahore, Karachi, and Islamabad with complete tagged supplier dockets—from the historic marquees to master couturiers and photographers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-[#E5E0D8] pb-3">
        {(['All', 'Mehndi', 'Baraat / Nikkah', 'Walima'] as const).map((ceremony) => (
          <button
            key={ceremony}
            onClick={() => setSelectedCeremony(ceremony)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors border ${
              selectedCeremony === ceremony
                ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17]'
                : 'bg-[#FFFFFF] text-[#45474B] border-[#E5E0D8] hover:border-[#C5A880]'
            }`}
          >
            {ceremony}
          </button>
        ))}
      </div>

      {/* Grid of Real Weddings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWeddings.map((wedding) => (
          <div
            key={wedding.id}
            onClick={() => onOpenRealWeddingModal(wedding)}
            className="group bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* 16:10 Aspect Ratio Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0F17]">
                <img
                  src={wedding.coverImage}
                  alt={wedding.couple}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 bg-[#0B0F17]/85 border border-[#C5A880] text-[10px] uppercase font-semibold text-[#C5A880] px-2.5 py-1 tracking-wider">
                  {wedding.ceremony}
                </div>
                <div className="absolute top-3 right-3 bg-[#0B0F17]/80 text-[10px] uppercase tracking-wider text-[#FAF8F5] px-2.5 py-1">
                  {wedding.city}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#725B38] font-mono border-b border-[#E5E0D8] pb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    <span className="truncate">{wedding.venueName}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3 text-[#C5A880]" />
                    <span>{wedding.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif text-[#0B0F17] group-hover:text-[#725B38] transition-colors">
                  {wedding.couple}
                </h3>

                <p className="text-xs text-[#45474B] line-clamp-3 leading-relaxed">
                  {wedding.story}
                </p>

                {/* Palette */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#725B38] block mb-1.5 font-semibold">
                    Wedding Palette
                  </span>
                  <div className="flex items-center gap-1.5">
                    {wedding.palette.map((color) => (
                      <div
                        key={color}
                        className="w-5 h-5 border border-[#E5E0D8]"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Tagged Vendors preview */}
                <div className="pt-3 border-t border-[#E5E0D8] space-y-1 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#725B38] font-semibold block">
                    Tagged Suppliers ({wedding.vendors.length}):
                  </span>
                  {wedding.vendors.slice(0, 3).map((v) => (
                    <div key={v.name} className="flex justify-between text-[#45474B]">
                      <span className="text-[#725B38]">{v.role}:</span>
                      <span className="font-medium text-[#0B0F17]">{v.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#0B0F17] group-hover:text-[#C5A880] transition-colors">
                <span className="font-semibold uppercase tracking-wider">Read Wedding Docket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
