import React, { useState, useMemo } from 'react';
import { VENUES_DATA, Venue } from '../data/weddingData';
import { VenueCard } from '../components/VenueCard';
import { Search, RotateCcw, Filter } from 'lucide-react';

interface VenuesPageProps {
  initialCity?: string;
  onOpenVenueModal: (venue: Venue) => void;
  onOpenAvailabilityModal: (venue: Venue) => void;
  initialFilters?: {
    city?: string;
    budget?: string;
    filterSegregated?: boolean;
    filterOneDish?: boolean;
    query?: string;
  };
}

export const VenuesPage: React.FC<VenuesPageProps> = ({
  initialCity,
  onOpenVenueModal,
  onOpenAvailabilityModal,
  initialFilters
}) => {
  // Filter States
  const [selectedCity, setSelectedCity] = useState<string>(initialFilters?.city || (initialCity && initialCity !== 'All Pakistan' ? initialCity : 'All'));
  const [searchQuery, setSearchQuery] = useState<string>(initialFilters?.query || '');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [minCapacity, setMinCapacity] = useState<number>(100);
  const [maxBudget, setMaxBudget] = useState<number>(
    initialFilters?.budget === 'under3000' ? 3000 : initialFilters?.budget === '3000-5000' ? 5000 : 7500
  );

  // Checkboxes
  const [filterSegregated, setFilterSegregated] = useState<boolean>(Boolean(initialFilters?.filterSegregated));
  const [filterOneDish, setFilterOneDish] = useState<boolean>(Boolean(initialFilters?.filterOneDish));
  const [filterGenerator, setFilterGenerator] = useState<boolean>(false);
  const [filterValet, setFilterValet] = useState<boolean>(false);
  const [filterBridalSuite, setFilterBridalSuite] = useState<boolean>(false);
  const [filterOutsideCatering, setFilterOutsideCatering] = useState<boolean>(false);

  // Mobile Filter Drawer toggle
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Sub-areas options based on city
  const areasByCity: Record<string, string[]> = {
    All: ['All Sub-Areas', 'Gulberg', 'DHA Phase 5 & 6', 'Clifton', 'DHA Phase 8 & Creek', 'Diplomatic Enclave', 'Multan Cantt'],
    Lahore: ['All Sub-Areas', 'Gulberg & Emporium', 'DHA Phase 5 & 6', 'Model Town & Johar Town', 'Bedian Road'],
    Karachi: ['All Sub-Areas', 'Clifton Block 4', 'DHA Phase 8 & Creek', 'Karsaz & Shahrah-e-Faisal'],
    Islamabad: ['All Sub-Areas', 'Sector G-5 & Diplomatic Enclave', 'Sector E-7 & F-7', 'Club Road & Rawalpindi'],
    Multan: ['All Sub-Areas', 'Multan Cantt & Abdali Road', 'Bosan Road']
  };

  const currentAreas = areasByCity[selectedCity] || areasByCity['All'];

  // Filtering Logic
  const filteredVenues = useMemo(() => {
    return VENUES_DATA.filter((venue) => {
      // City
      if (selectedCity !== 'All' && venue.city !== selectedCity) return false;

      // Area
      if (selectedArea !== 'All' && selectedArea !== 'All Sub-Areas' && !venue.area.includes(selectedArea.split(' ')[0])) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = venue.name.toLowerCase().includes(q);
        const matchesArea = venue.area.toLowerCase().includes(q);
        const matchesAddress = venue.address.toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesAddress) return false;
      }

      // Capacity (venue max capacity should be at least minCapacity)
      if (venue.capacityMax < minCapacity) return false;

      // Budget (venue min price per head should be <= maxBudget)
      if (venue.pricePerHeadMin > maxBudget) return false;

      // Pakistani Logistical Checkboxes
      if (filterSegregated && !venue.segregatedHalls) return false;
      if (filterOneDish && !venue.oneDishCompliant) return false;
      if (filterGenerator && !venue.generatorBackup) return false;
      if (filterValet && !venue.valetParking) return false;
      if (filterBridalSuite && !venue.bridalSuite) return false;
      if (filterOutsideCatering && !venue.outsideCateringAllowed) return false;

      return true;
    });
  }, [
    selectedCity,
    selectedArea,
    searchQuery,
    minCapacity,
    maxBudget,
    filterSegregated,
    filterOneDish,
    filterGenerator,
    filterValet,
    filterBridalSuite,
    filterOutsideCatering
  ]);

  const handleResetFilters = () => {
    setSelectedCity('All');
    setSelectedArea('All');
    setSearchQuery('');
    setMinCapacity(100);
    setMaxBudget(7500);
    setFilterSegregated(false);
    setFilterOneDish(false);
    setFilterGenerator(false);
    setFilterValet(false);
    setFilterBridalSuite(false);
    setFilterOutsideCatering(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-[#E5E0D8] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
            CURATED DIRECTORY
          </span>
          <span className="text-xs text-[#45474B]">·</span>
          <span className="text-xs text-[#45474B] font-mono">{filteredVenues.length} Marquees Available</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#0B0F17]">
            Royal Wedding Marquees & Palaces
          </h1>
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#0B0F17] flex items-center justify-center gap-2 self-start"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{showMobileFilters ? 'Hide Filters' : 'Filter Marquees'}</span>
          </button>
        </div>
        <p className="text-xs text-[#45474B] max-w-3xl leading-relaxed">
          Inspect certified banquet ballrooms, Mughal lawn pavilions, and marquee structures with complete acoustical segregation, Punjab One-Dish compliance, and high-capacity generator dockets.
        </p>
      </div>

      {/* Main Grid: Sidebar Filters + Venue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* FILTER SIDEBAR (Desktop + Mobile Drawer) */}
        <aside className={`lg:col-span-1 space-y-6 bg-[#FFFFFF] border border-[#E5E0D8] p-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0B0F17]">
              Refine Search
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-[#725B38] hover:text-[#0B0F17] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search by Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block">
              Marquee Name / Keyword
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Nishat, Serena, DHA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880] pr-8"
              />
              <Search className="w-3.5 h-3.5 text-[#45474B] absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* City Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block">
              Metropolitan City
            </label>
            <div className="grid grid-cols-2 gap-1">
              {['All', 'Lahore', 'Karachi', 'Islamabad', 'Multan'].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setSelectedArea('All');
                  }}
                  className={`py-1.5 px-2 text-xs uppercase tracking-wider transition-colors border ${
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

          {/* Sub-Area Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#725B38] block">
              Sub-Area / Locality
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
            >
              {currentAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Capacity Slider */}
          <div className="space-y-2 pt-2 border-t border-[#E5E0D8]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] uppercase font-semibold text-[#725B38]">Min. Guest Capacity</span>
              <span className="font-mono font-bold text-[#0B0F17]">{minCapacity.toLocaleString()}+</span>
            </div>
            <input
              type="range"
              min={100}
              max={2000}
              step={50}
              value={minCapacity}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
              className="w-full accent-[#C5A880]"
            />
            <div className="flex justify-between text-[10px] text-[#45474B] font-mono">
              <span>100</span>
              <span>2,000+ Guests</span>
            </div>
          </div>

          {/* Budget Ceiling Slider */}
          <div className="space-y-2 pt-2 border-t border-[#E5E0D8]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] uppercase font-semibold text-[#725B38]">Max Per-Head Budget</span>
              <span className="font-mono font-bold text-[#0B0F17]">PKR {maxBudget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={2000}
              max={7500}
              step={200}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#C5A880]"
            />
            <div className="flex justify-between text-[10px] text-[#45474B] font-mono">
              <span>PKR 2,000</span>
              <span>PKR 7,500+</span>
            </div>
          </div>

          {/* Pakistani Logistical Checkboxes */}
          <div className="space-y-3 pt-3 border-t border-[#E5E0D8]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#725B38] block">
              Logistical & Legal Compliance
            </span>

            {/* Checkbox 1: Segregated Halls */}
            <label className="flex items-center gap-2 text-xs text-[#0B0F17] cursor-pointer">
              <input
                type="checkbox"
                checked={filterSegregated}
                onChange={(e) => setFilterSegregated(e.target.checked)}
                className="w-4 h-4 accent-[#0B0F17] rounded-none cursor-pointer"
              />
              <span>Segregated Soundproof Halls</span>
            </label>

            {/* Checkbox 2: One-Dish Compliance */}
            <label className="flex items-center gap-2 text-xs text-[#0B0F17] cursor-pointer">
              <input
                type="checkbox"
                checked={filterOneDish}
                onChange={(e) => setFilterOneDish(e.target.checked)}
                className="w-4 h-4 accent-[#0B0F17] rounded-none cursor-pointer"
              />
              <span>One-Dish Law Certified</span>
            </label>

            {/* Checkbox 3: Generator Backup */}
            <label className="flex items-center gap-2 text-xs text-[#0B0F17] cursor-pointer">
              <input
                type="checkbox"
                checked={filterGenerator}
                onChange={(e) => setFilterGenerator(e.target.checked)}
                className="w-4 h-4 accent-[#0B0F17] rounded-none cursor-pointer"
              />
              <span>100% Prime Generator Backup</span>
            </label>

            {/* Checkbox 4: Valet */}
            <label className="flex items-center gap-2 text-xs text-[#0B0F17] cursor-pointer">
              <input
                type="checkbox"
                checked={filterValet}
                onChange={(e) => setFilterValet(e.target.checked)}
                className="w-4 h-4 accent-[#0B0F17] rounded-none cursor-pointer"
              />
              <span>Valet Parking Facility</span>
            </label>

            {/* Checkbox 5: Bridal Suite */}
            <label className="flex items-center gap-2 text-xs text-[#0B0F17] cursor-pointer">
              <input
                type="checkbox"
                checked={filterBridalSuite}
                onChange={(e) => setFilterBridalSuite(e.target.checked)}
                className="w-4 h-4 accent-[#0B0F17] rounded-none cursor-pointer"
              />
              <span>Dedicated Bridal Suite</span>
            </label>

            {/* Checkbox 6: Outside Catering */}
            <label className="flex items-center gap-2 text-xs text-[#0B0F17] cursor-pointer">
              <input
                type="checkbox"
                checked={filterOutsideCatering}
                onChange={(e) => setFilterOutsideCatering(e.target.checked)}
                className="w-4 h-4 accent-[#0B0F17] rounded-none cursor-pointer"
              />
              <span>Outside Bawarchi Allowed</span>
            </label>
          </div>
        </aside>

        {/* VENUES GRID RESULTS */}
        <main className="lg:col-span-3 space-y-6">
          {/* Active Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#FFFFFF] border border-[#E5E0D8] text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#0B0F17]">Active Filter:</span>
              <span className="text-[#725B38] font-mono">
                {selectedCity} {selectedArea !== 'All' ? `· ${selectedArea}` : ''} · Up to PKR {maxBudget.toLocaleString()}
              </span>
              {(filterSegregated || filterOneDish || filterGenerator) && (
                <span className="text-[#0F382C] font-medium">
                  · Compliance filters active
                </span>
              )}
            </div>

            <span className="text-[#45474B] font-mono">
              Showing {filteredVenues.length} of {VENUES_DATA.length} venues
            </span>
          </div>

          {filteredVenues.length === 0 ? (
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-12 text-center space-y-4">
              <p className="text-base font-serif text-[#0B0F17]">
                No wedding marquees match your exact criteria.
              </p>
              <p className="text-xs text-[#45474B] max-w-md mx-auto leading-relaxed">
                Try widening your budget range or resetting the sub-area and compliance filters to see all regional ballrooms.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#0B0F17] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  onOpenDetails={onOpenVenueModal}
                  onCheckAvailability={onOpenAvailabilityModal}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
