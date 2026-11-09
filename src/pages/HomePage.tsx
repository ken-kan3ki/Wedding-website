import React, { useState } from 'react';
import { Search, MapPin, Sparkles, ArrowRight, ShieldCheck, Clock, Users, ChevronRight } from 'lucide-react';
import { CATEGORIES, VENUES_DATA, REAL_WEDDINGS, EDITORIAL_ARTICLES, Venue, RealWedding, ASSETS } from '../data/weddingData';
import { VenueCard } from '../components/VenueCard';

interface HomePageProps {
  onNavigate: (tab: 'home' | 'venues' | 'services' | 'real-weddings' | 'planning', filterOptions?: any) => void;
  onOpenVenueModal: (venue: Venue) => void;
  onOpenAvailabilityModal: (venue: Venue) => void;
  onOpenRealWeddingModal: (wedding: RealWedding) => void;
  onOpenPlanningSuite: (tool?: 'budget' | 'checklist' | 'rsvp') => void;
  onOpenPartnerModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenVenueModal,
  onOpenAvailabilityModal,
  onOpenRealWeddingModal,
  onOpenPlanningSuite,
  onOpenPartnerModal
}) => {
  // Search Bar State
  const [searchCategory, setSearchCategory] = useState('venues');
  const [searchCity, setSearchCity] = useState('Lahore');
  const [searchBudget, setSearchBudget] = useState('any');

  // Curated Listings City Tab
  const [curatedCity, setCuratedCity] = useState<'All' | 'Lahore' | 'Karachi' | 'Islamabad' | 'Multan'>('All');

  const filteredVenues = curatedCity === 'All'
    ? VENUES_DATA
    : VENUES_DATA.filter(v => v.city === curatedCity);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCategory === 'venues') {
      onNavigate('venues', { city: searchCity, budget: searchBudget });
    } else {
      onNavigate('services', { city: searchCity, discipline: searchCategory });
    }
  };

  return (
    <div className="space-y-20">
      {/* 1. HERO SECTION: Grand Editorial Focus */}
      <section className="relative min-h-[620px] lg:min-h-[720px] flex items-center justify-center bg-[#0B0F17] text-[#FAF8F5] overflow-hidden">
        {/* Background Image with Opulent Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroLahoreMarquee}
            alt="Opulent Pakistani Marquee Pavilion"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-[#0B0F17]/40" />
        </div>

        {/* Decorative Hairline Frame */}
        <div className="absolute inset-6 pointer-events-none border border-[#C5A880]/20 hidden lg:block" />

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-16 text-center space-y-8">
          <div className="inline-flex items-center gap-2 border border-[#C5A880]/40 px-3 py-1 bg-[#0B0F17]/80 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
              PAKISTAN’S REGAL WEDDING COMPENDIUM
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#FAF8F5] leading-[1.15] text-balance">
            Where Mughal Grandeur Meets Modern Nuptial Poise
          </h1>

          <p className="text-sm sm:text-base text-[#FAF8F5]/80 max-w-2xl mx-auto leading-relaxed font-light">
            An authoritative directory connecting elite families with Pakistan’s finest crystal ballrooms, heritage marquees, master bawarchis, and haute couture bridal ateliers.
          </p>

          {/* Dual-Filter Search Engine */}
          <div className="bg-[#FAF8F5] p-3 sm:p-4 text-[#0B0F17] border border-[#C5A880] shadow-2xl text-left max-w-3xl mx-auto">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              {/* Category */}
              <div className="sm:col-span-4">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-[#725B38] block mb-1">
                  Seeking
                </label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2.5 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="venues">Royal Marquees & Palaces</option>
                  <option value="Bridal Couture">Haute Couture Bridal Wear</option>
                  <option value="Fine Art Photography">Fine Art 4K Photography</option>
                  <option value="Stage Décor">Imperial Floral & Stage Décor</option>
                  <option value="Desi Catering">Dum Pukht Desi Catering</option>
                  <option value="Henna Artisans">Bespoke Henna Artists</option>
                </select>
              </div>

              {/* City */}
              <div className="sm:col-span-3">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-[#725B38] block mb-1">
                  Wedding City
                </label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2.5 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Lahore">Lahore (Gulberg & DHA)</option>
                  <option value="Karachi">Karachi (Clifton & Creek)</option>
                  <option value="Islamabad">Islamabad / Rawalpindi</option>
                  <option value="Multan">Multan (Cantt)</option>
                </select>
              </div>

              {/* Budget */}
              <div className="sm:col-span-2">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-[#725B38] block mb-1">
                  Per-Head
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E0D8] p-2.5 text-xs text-[#0B0F17] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="any">Any Tier</option>
                  <option value="under3000">&lt; PKR 3,000</option>
                  <option value="3000-5000">PKR 3K–5K</option>
                  <option value="5000plus">PKR 5,000+</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#0B0F17] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 border border-[#0B0F17]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Discover</span>
                </button>
              </div>
            </form>

            {/* Popular Local Search Tags */}
            <div className="pt-3 border-t border-[#E5E0D8] mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#45474B]">
              <span className="font-semibold uppercase tracking-wider text-[#725B38]">Popular:</span>
              <button
                onClick={() => onNavigate('venues', { query: 'DHA Phase 5' })}
                className="hover:text-[#0B0F17] hover:underline"
              >
                DHA Phase 5 Marquees
              </button>
              <span>·</span>
              <button
                onClick={() => onNavigate('venues', { filterSegregated: true })}
                className="hover:text-[#0B0F17] hover:underline"
              >
                Segregated Walima Hall
              </button>
              <span>·</span>
              <button
                onClick={() => onNavigate('services', { discipline: 'Bridal Couture' })}
                className="hover:text-[#0B0F17] hover:underline"
              >
                Couture Bridal Studio
              </button>
              <span>·</span>
              <button
                onClick={() => onNavigate('venues', { filterOneDish: true })}
                className="hover:text-[#0B0F17] hover:underline"
              >
                One-Dish Compliant
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 text-xs">
            <div className="border border-[#C5A880]/20 bg-[#0B0F17]/60 p-3 backdrop-blur-sm">
              <span className="text-lg font-serif font-bold text-[#C5A880] block font-mono">100%</span>
              <span className="text-[#FAF8F5]/70 text-[10px] uppercase tracking-wider">Generator Backup Verified</span>
            </div>
            <div className="border border-[#C5A880]/20 bg-[#0B0F17]/60 p-3 backdrop-blur-sm">
              <span className="text-lg font-serif font-bold text-[#C5A880] block font-mono">PKR Rates</span>
              <span className="text-[#FAF8F5]/70 text-[10px] uppercase tracking-wider">Authentic 2026 Tariffs</span>
            </div>
            <div className="border border-[#C5A880]/20 bg-[#0B0F17]/60 p-3 backdrop-blur-sm">
              <span className="text-lg font-serif font-bold text-[#C5A880] block font-mono">One-Dish</span>
              <span className="text-[#FAF8F5]/70 text-[10px] uppercase tracking-wider">Statutory Compliant Menus</span>
            </div>
            <div className="border border-[#C5A880]/20 bg-[#0B0F17]/60 p-3 backdrop-blur-sm">
              <span className="text-lg font-serif font-bold text-[#C5A880] block font-mono">Curfew Alerts</span>
              <span className="text-[#FAF8F5]/70 text-[10px] uppercase tracking-wider">Punjab & Sindh Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY ARCHITECTURE: 8 Visual Cards */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E0D8] pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
              DISCIPLINES OF CELEBRATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0B0F17]">
              Essential Pillars of the Pakistani Wedding
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold uppercase tracking-widest text-[#725B38] hover:text-[#0B0F17] flex items-center gap-1 transition-colors"
          >
            <span>All 8 Disciplines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.id === 'marquees') {
                  onNavigate('venues');
                } else {
                  onNavigate('services', { category: cat.name });
                }
              }}
              className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#725B38]">
                    {cat.count}
                  </span>
                  <div className="w-2 h-2 rotate-45 bg-[#E5E0D8] group-hover:bg-[#C5A880] transition-colors" />
                </div>
                <h3 className="mt-4 text-lg font-serif font-semibold text-[#0B0F17] group-hover:text-[#725B38] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-[#45474B] leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-semibold uppercase tracking-wider text-[#0B0F17] group-hover:text-[#C5A880] transition-colors">
                <span>Explore Directory</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CURATED LISTINGS: Top Marquees with City Tabs */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E0D8] pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
              FEATURED PALACES & BANQUETS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0B0F17]">
              Curated Royal Marquees of Pakistan
            </h2>
          </div>

          {/* City Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {(['All', 'Lahore', 'Karachi', 'Islamabad', 'Multan'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setCuratedCity(city)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors border ${
                  curatedCity === city
                    ? 'bg-[#0B0F17] text-[#C5A880] border-[#0B0F17]'
                    : 'bg-[#FFFFFF] text-[#45474B] border-[#E5E0D8] hover:border-[#C5A880]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.slice(0, 3).map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onOpenDetails={onOpenVenueModal}
              onCheckAvailability={onOpenAvailabilityModal}
            />
          ))}
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={() => onNavigate('venues')}
            className="px-8 py-3.5 bg-[#0B0F17] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#0B0F17] text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            View All Verified Wedding Marquees ({VENUES_DATA.length})
          </button>
        </div>
      </section>

      {/* 4. REAL WEDDINGS FEED: Event-Tagged Galleries with Vendor Credits */}
      <section className="bg-[#181C24] text-[#FAF8F5] py-16 px-6 sm:px-12 border-y border-[#C5A880]/30">
        <div className="max-w-[1440px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#C5A880]/20 pb-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                HERITAGE CHRONICLES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5]">
                Real Pakistani Weddings
              </h2>
            </div>
            <button
              onClick={() => onNavigate('real-weddings')}
              className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] hover:underline flex items-center gap-1"
            >
              <span>Explore All Nuptial Stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REAL_WEDDINGS.map((wedding) => (
              <div
                key={wedding.id}
                onClick={() => onOpenRealWeddingModal(wedding)}
                className="bg-[#0B0F17] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={wedding.coverImage}
                      alt={wedding.couple}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B0F17]/85 border border-[#C5A880] text-[10px] uppercase font-semibold text-[#C5A880] px-2 py-0.5 tracking-wider">
                      {wedding.ceremony}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#0B0F17]/80 text-[10px] uppercase tracking-wider text-[#FAF8F5] px-2 py-0.5">
                      {wedding.city}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs text-[#C5A880] font-mono">
                      {wedding.venueName} · {wedding.date}
                    </div>
                    <h3 className="text-xl font-serif text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                      {wedding.couple}
                    </h3>
                    <p className="text-xs text-[#FAF8F5]/70 line-clamp-2 leading-relaxed">
                      {wedding.story}
                    </p>

                    {/* Tagged Credits Preview */}
                    <div className="pt-3 border-t border-[#C5A880]/20 space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                        Credited Suppliers:
                      </span>
                      <div className="text-xs text-[#FAF8F5]/80 space-y-0.5">
                        {wedding.vendors.slice(0, 2).map((v) => (
                          <div key={v.name} className="flex justify-between">
                            <span className="text-[#FAF8F5]/50">{v.role}:</span>
                            <span className="font-medium">{v.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-xs text-[#C5A880]">
                    <span className="uppercase tracking-wider font-semibold">Read Full Docket</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PLANNING SUITE TEASER: 3 Cards */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-8">
        <div className="border-b border-[#E5E0D8] pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
            ORGANIZATIONAL EXCELLENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0B0F17]">
            The Desi Wedding Planning Suite
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Budget Calculator */}
          <div
            onClick={() => onOpenPlanningSuite('budget')}
            className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] transition-all cursor-pointer group space-y-4"
          >
            <div className="w-10 h-10 border border-[#C5A880] bg-[#0B0F17] text-[#C5A880] flex items-center justify-center">
              <span className="font-mono font-bold text-sm">PKR</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#725B38] font-semibold block">
                Ceremony Modeling
              </span>
              <h3 className="text-lg font-serif font-semibold text-[#0B0F17] group-hover:text-[#725B38] transition-colors">
                Multi-Event Budget Tool
              </h3>
            </div>
            <p className="text-xs text-[#45474B] leading-relaxed">
              Calculate exact guest and per-head catering tariffs separately across Mehndi, Baraat, and Walima with real Pakistani rupee metrics.
            </p>
            <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-[#0B0F17] group-hover:text-[#C5A880] flex items-center gap-1">
              <span>Launch Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Desi Timeline Checklist */}
          <div
            onClick={() => onOpenPlanningSuite('checklist')}
            className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] transition-all cursor-pointer group space-y-4"
          >
            <div className="w-10 h-10 border border-[#C5A880] bg-[#0B0F17] text-[#C5A880] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#725B38] font-semibold block">
                Lead-Time Guidance
              </span>
              <h3 className="text-lg font-serif font-semibold text-[#0B0F17] group-hover:text-[#725B38] transition-colors">
                Desi Timeline Checklist
              </h3>
            </div>
            <p className="text-xs text-[#45474B] leading-relaxed">
              Tailored specifically to local bridal couture lead times (16+ weeks for Bunto / Faraz Manan) and marquee date locks.
            </p>
            <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-[#0B0F17] group-hover:text-[#C5A880] flex items-center gap-1">
              <span>Review Milestones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: WhatsApp RSVP Manager */}
          <div
            onClick={() => onOpenPlanningSuite('rsvp')}
            className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] transition-all cursor-pointer group space-y-4"
          >
            <div className="w-10 h-10 border border-[#C5A880] bg-[#0B0F17] text-[#C5A880] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#725B38] font-semibold block">
                Digital Protocol
              </span>
              <h3 className="text-lg font-serif font-semibold text-[#0B0F17] group-hover:text-[#725B38] transition-colors">
                WhatsApp RSVP Manager
              </h3>
            </div>
            <p className="text-xs text-[#45474B] leading-relaxed">
              Generate formal Urdu/English bilingual digital invitations with exact marquee locations and strict 10:00 PM curfew notices.
            </p>
            <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-[#0B0F17] group-hover:text-[#C5A880] flex items-center gap-1">
              <span>Create Invitation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL HUB: Wedding Law Guides */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-8">
        <div className="border-b border-[#E5E0D8] pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#725B38]">
            THE WEDDING GAZETTE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0B0F17]">
            Statutory Guidance & Royal Traditions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDITORIAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="p-6 bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] transition-all space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] text-[#725B38]">
                <span className="font-semibold uppercase tracking-wider">{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-base font-serif font-semibold text-[#0B0F17]">
                {article.title}
              </h3>
              <p className="text-xs text-[#45474B] leading-relaxed">
                {article.summary}
              </p>
              <div className="pt-2 text-[11px] text-[#725B38] font-mono">
                {article.date}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
