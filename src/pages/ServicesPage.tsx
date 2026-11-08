import React, { useState, useMemo } from 'react';
import { VENDORS_DATA, Vendor } from '../data/weddingData';
import { VendorCard } from '../components/VendorCard';
import { Sparkles, Search, RotateCcw } from 'lucide-react';

interface ServicesPageProps {
  bundle: Vendor[];
  onToggleBundle: (vendor: Vendor) => void;
  onOpenBundleDrawer: () => void;
  initialFilters?: {
    discipline?: string;
    city?: string;
    category?: string;
  };
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  bundle,
  onToggleBundle,
  onOpenBundleDrawer,
  initialFilters
}) => {
  // Filters
  const [selectedCeremony, setSelectedCeremony] = useState<string>('All');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(
    initialFilters?.discipline || (initialFilters?.category ? initialFilters.category.split(' ')[0] : 'All')
  );
  const [selectedCity, setSelectedCity] = useState<string>(initialFilters?.city || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const disciplines = [
    'All',
    'Bridal Couture',
    'Fine Art Photography',
    'Stage Décor',
    'Desi Catering',
    'Makeup Artists',
    'Henna Artisans',
    'Luxury Vintage Rentals'
  ];

  const ceremonies = ['All', 'Mayun / Dholak', 'Mehndi', 'Baraat / Nikkah', 'Walima'];

  const filteredVendors = useMemo(() => {
    return VENDORS_DATA.filter((vendor) => {
      // Discipline
      if (selectedDiscipline !== 'All' && !vendor.discipline.toLowerCase().includes(selectedDiscipline.toLowerCase())) {
        return false;
      }

      // City
      if (selectedCity !== 'All' && vendor.city !== selectedCity) {
        return false;
      }

      // Ceremony
      if (selectedCeremony !== 'All' && !vendor.ceremonies.includes(selectedCeremony as any)) {
        return false;
      }

      // Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = vendor.name.toLowerCase().includes(q);
        const matchesTagline = vendor.tagline.toLowerCase().includes(q);
        const matchesArea = vendor.area.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesArea) return false;
      }

      return true;
    });
  }, [selectedDiscipline, selectedCity, selectedCeremony, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCeremony('All');
    setSelectedDiscipline('All');
    setSelectedCity('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-[#E5E0D8] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
            HAUTE BRIDAL ATELIERS
          </span>
          <span className="text-xs text-[#45474B]">·</span>
          <span className="text-xs text-[#45474B] font-mono">{filteredVendors.length} Suppliers Active</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#0B0F17]">
            Curated Pakistani Wedding Services
          </h1>
          {/* Bundle Trigger */}
          <button
            onClick={onOpenBundleDrawer}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all flex items-center gap-2 ${
              bundle.length > 0
                ? 'bg-[#0F382C] text-[#FAF8F5] border-[#0F382C]'
                : 'bg-[#FFFFFF] border-[#C5A880] text-[#0B0F17]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Open Bundle & Plan ({bundle.length})</span>
          </button>
        </div>
        <p className="text-xs text-[#45474B] max-w-3xl leading-relaxed">
          Filter certified bridal masters by ceremony dockets—from ancient Mayun ubtan sessions and vibrant Mehndi dholaks to royal candlelight Baraats and grand Walimas.
        </p>
      </div>

      {/* RITUAL TAXONOMY FILTER BAR */}
      <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#725B38] block mb-1">
              Ritual Taxonomy: Filter by Ceremony
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ceremonies.map((ceremony) => (
                <button
                  key={ceremony}
                  onClick={() => setSelectedCeremony(ceremony)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors border ${
                    selectedCeremony === ceremony
                      ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17]'
                      : 'bg-[#FAF8F5] text-[#45474B] border-[#E5E0D8] hover:border-[#C5A880]'
                  }`}
                >
                  {ceremony}
                </button>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div className="shrink-0">
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#725B38] block mb-1">
              City
            </span>
            <div className="flex flex-wrap gap-1">
              {['All', 'Lahore', 'Karachi', 'Islamabad'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors border ${
                    selectedCity === city
                      ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17] font-semibold'
                      : 'bg-[#FAF8F5] text-[#45474B] border-[#E5E0D8] hover:border-[#C5A880]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Discipline Tabs */}
        <div className="pt-2 border-t border-[#E5E0D8] flex items-center justify-between gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 min-w-max">
            {disciplines.map((disc) => (
              <button
                key={disc}
                onClick={() => setSelectedDiscipline(disc)}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  selectedDiscipline === disc
                    ? 'bg-[#0F382C] text-[#FAF8F5] font-semibold'
                    : 'text-[#45474B] hover:text-[#0B0F17] hover:bg-[#FAF8F5]'
                }`}
              >
                {disc}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetFilters}
            className="text-[11px] text-[#725B38] hover:text-[#0B0F17] flex items-center gap-1 shrink-0 ml-4"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Floating Bundle Summary Strip if bundle has items */}
      {bundle.length > 0 && (
        <div className="bg-[#0B0F17] text-[#FAF8F5] border border-[#C5A880] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0F382C] border border-[#C5A880] flex items-center justify-center text-xs font-mono font-bold text-[#C5A880]">
              {bundle.length}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                Your Multi-Service Wedding Bundle
              </span>
              <span className="text-xs text-[#FAF8F5]/80">
                {bundle.map(b => b.name).join(' · ')}
              </span>
            </div>
          </div>
          <button
            onClick={onOpenBundleDrawer}
            className="px-5 py-2.5 bg-[#C5A880] text-[#0B0F17] text-xs uppercase tracking-widest font-semibold hover:bg-[#d8bd95] transition-colors shrink-0"
          >
            Review & Transmit Unified Bundle
          </button>
        </div>
      )}

      {/* VENDOR CARDS GRID */}
      {filteredVendors.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-12 text-center space-y-4">
          <p className="text-base font-serif text-[#0B0F17]">
            No verified bridal suppliers match this ritual or discipline selection.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#0B0F17] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => {
            const inBundle = bundle.some(b => b.id === vendor.id);
            return (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isInBundle={inBundle}
                onToggleBundle={onToggleBundle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
