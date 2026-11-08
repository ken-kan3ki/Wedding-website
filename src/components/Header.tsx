import React, { useState } from 'react';
import { MapPin, ChevronDown, Sparkles, Plus, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'venues' | 'services' | 'real-weddings' | 'planning';
  setCurrentTab: (tab: 'home' | 'venues' | 'services' | 'real-weddings' | 'planning') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onOpenPartnerModal: () => void;
  bundleCount: number;
  onOpenBundleDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedCity,
  setSelectedCity,
  onOpenPartnerModal,
  bundleCount,
  onOpenBundleDrawer
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cities = ['All Pakistan', 'Lahore', 'Karachi', 'Islamabad', 'Multan'];

  const navItems: { id: 'home' | 'venues' | 'services' | 'real-weddings' | 'planning'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'venues', label: 'Venues' },
    { id: 'services', label: 'Services' },
    { id: 'real-weddings', label: 'Real Weddings' },
    { id: 'planning', label: 'Planning Tools' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17] text-[#FAF8F5] border-b border-[#C5A880]/25 transition-all">
      {/* Top Hairline Trust Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-[#C5A880] border-b border-[#C5A880]/15 bg-[#080B10]">
        <div className="flex items-center gap-4">
          <span>PAKISTAN’S PREMIER ROYAL WEDDING ATELIER</span>
          <span className="text-[#C5A880]/40">·</span>
          <span>CURATED MARQUEES, HAUTE COUTURE & MASTER CHEFS</span>
        </div>
        <div className="flex items-center gap-6">
          <span>ONE-DISH STATUTORY COMPLIANCE ASSURED</span>
          <span className="text-[#C5A880]/40">·</span>
          <span>100% GENERATOR REDUNDANCY VERIFIED</span>
        </div>
      </div>

      {/* Main Navigation Row: 3-Zone Architecture */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-6 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center bg-[#0B0F17] group-hover:border-[#D4AF37] transition-colors">
              <span className="text-[#C5A880] text-xs font-serif font-bold">RN</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif tracking-[0.08em] font-medium text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors whitespace-nowrap">
                RIVAYAT & NOOR
              </div>
            </div>
          </button>

          {/* City Selector */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#C5A880]/30 hover:border-[#C5A880] text-xs font-medium tracking-wider text-[#FAF8F5] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="uppercase">{selectedCity}</span>
              <ChevronDown className={`w-3 h-3 text-[#C5A880] transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-1 w-44 bg-[#0B0F17] border border-[#C5A880] shadow-2xl py-1 z-50">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                      selectedCity === city
                        ? 'bg-[#C5A880] text-[#0B0F17] font-semibold'
                        : 'text-[#FAF8F5] hover:bg-[#181C24] hover:text-[#C5A880]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative py-1 text-sm tracking-wide font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#C5A880]' : 'text-[#FAF8F5]/80 hover:text-[#FAF8F5]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A880]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Bundle & Business CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Bundle Trigger */}
          <button
            onClick={onOpenBundleDrawer}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${
              bundleCount > 0
                ? 'bg-[#0F382C] text-[#FAF8F5] border-[#0F382C] hover:bg-[#13493a]'
                : 'bg-transparent text-[#C5A880] border-[#C5A880]/40 hover:border-[#C5A880]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline">Bundle & Plan</span>
            <span className="font-mono bg-[#C5A880] text-[#0B0F17] px-1.5 py-0.2 text-[11px] font-bold">
              {bundleCount}
            </span>
          </button>

          {/* List Business Action */}
          <button
            onClick={onOpenPartnerModal}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#0B0F17] bg-[#C5A880] hover:bg-[#d8bd95] transition-colors border border-[#C5A880]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List Business</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#FAF8F5] border border-[#C5A880]/30 hover:border-[#C5A880]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F17] border-t border-[#C5A880]/30 px-6 py-6 space-y-4">
          <div className="pb-4 border-b border-[#C5A880]/20">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block mb-2">Select Wedding City</span>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-2 text-xs uppercase tracking-wider text-left border ${
                    selectedCity === city
                      ? 'bg-[#C5A880] text-[#0B0F17] border-[#C5A880] font-semibold'
                      : 'border-[#C5A880]/20 text-[#FAF8F5]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 text-base font-serif tracking-wider ${
                  currentTab === item.id ? 'text-[#C5A880] font-medium' : 'text-[#FAF8F5]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#C5A880]/20">
            <button
              onClick={() => {
                onOpenPartnerModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs uppercase tracking-widest font-semibold bg-[#C5A880] text-[#0B0F17]"
            >
              List Your Marquee or Atelier
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
