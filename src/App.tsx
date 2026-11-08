import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { VenuesPage } from './pages/VenuesPage';
import { ServicesPage } from './pages/ServicesPage';
import { RealWeddingsPage } from './pages/RealWeddingsPage';
import { PlanningPage } from './pages/PlanningPage';

// Modals & Drawers
import { VenueModal } from './components/VenueModal';
import { CheckAvailabilityModal } from './components/CheckAvailabilityModal';
import { BundleDrawer } from './components/BundleDrawer';
import { PartnerModal } from './components/PartnerModal';
import { RealWeddingsModal } from './components/RealWeddingsModal';
import { PlanningSuiteModal } from './components/PlanningSuiteModal';

import { Venue, Vendor, RealWedding, VENUES_DATA } from './data/weddingData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'venues' | 'services' | 'real-weddings' | 'planning'>('home');
  const [selectedCity, setSelectedCity] = useState<string>('All Pakistan');

  // Filter props passed between pages
  const [venueFilters, setVenueFilters] = useState<any>(null);
  const [serviceFilters, setServiceFilters] = useState<any>(null);

  // Modals state
  const [selectedVenueForModal, setSelectedVenueForModal] = useState<Venue | null>(null);
  const [selectedVenueForAvailability, setSelectedVenueForAvailability] = useState<Venue | null>(null);
  const [selectedRealWedding, setSelectedRealWedding] = useState<RealWedding | null>(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [planningModalOpen, setPlanningModalOpen] = useState(false);
  const [planningDefaultTool, setPlanningDefaultTool] = useState<'budget' | 'checklist' | 'rsvp'>('budget');

  // Bundle & Plan State
  const [bundle, setBundle] = useState<Vendor[]>([]);
  const [bundleDrawerOpen, setBundleDrawerOpen] = useState(false);

  const handleToggleBundle = (vendor: Vendor) => {
    setBundle((prev) => {
      const exists = prev.some((v) => v.id === vendor.id);
      if (exists) {
        return prev.filter((v) => v.id !== vendor.id);
      } else {
        return [...prev, vendor];
      }
    });
  };

  const handleRemoveFromBundle = (vendorId: string) => {
    setBundle((prev) => prev.filter((v) => v.id !== vendorId));
  };

  const handleClearBundle = () => {
    setBundle([]);
  };

  // Cross-page navigation helper
  const handleNavigate = (
    tab: 'home' | 'venues' | 'services' | 'real-weddings' | 'planning',
    filterOptions?: any
  ) => {
    if (tab === 'venues' && filterOptions) {
      setVenueFilters(filterOptions);
    } else if (tab === 'venues' && !filterOptions) {
      setVenueFilters(null);
    }

    if (tab === 'services' && filterOptions) {
      setServiceFilters(filterOptions);
    } else if (tab === 'services' && !filterOptions) {
      setServiceFilters(null);
    }

    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlanningTool = (tool: 'budget' | 'checklist' | 'rsvp' = 'budget') => {
    setPlanningDefaultTool(tool);
    setPlanningModalOpen(true);
  };

  const handleSelectVenueById = (venueId: string) => {
    const found = VENUES_DATA.find((v) => v.id === venueId);
    if (found) {
      setSelectedVenueForModal(found);
    } else {
      handleNavigate('venues');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B0F17] flex flex-col font-sans selection:bg-[#C5A880]/20 selection:text-[#0B0F17]">
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setVenueFilters(null);
          setServiceFilters(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        bundleCount={bundle.length}
        onOpenBundleDrawer={() => setBundleDrawerOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenVenueModal={(venue) => setSelectedVenueForModal(venue)}
            onOpenAvailabilityModal={(venue) => setSelectedVenueForAvailability(venue)}
            onOpenRealWeddingModal={(wedding) => setSelectedRealWedding(wedding)}
            onOpenPlanningSuite={handleOpenPlanningTool}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
          />
        )}

        {currentTab === 'venues' && (
          <VenuesPage
            initialCity={selectedCity}
            initialFilters={venueFilters}
            onOpenVenueModal={(venue) => setSelectedVenueForModal(venue)}
            onOpenAvailabilityModal={(venue) => setSelectedVenueForAvailability(venue)}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            bundle={bundle}
            initialFilters={serviceFilters}
            onToggleBundle={handleToggleBundle}
            onOpenBundleDrawer={() => setBundleDrawerOpen(true)}
          />
        )}

        {currentTab === 'real-weddings' && (
          <RealWeddingsPage
            onOpenRealWeddingModal={(wedding) => setSelectedRealWedding(wedding)}
            onNavigateToVenues={() => handleNavigate('venues')}
          />
        )}

        {currentTab === 'planning' && (
          <PlanningPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <VenueModal
        venue={selectedVenueForModal}
        onClose={() => setSelectedVenueForModal(null)}
        onCheckAvailability={(venue) => {
          setSelectedVenueForModal(null);
          setSelectedVenueForAvailability(venue);
        }}
      />

      <CheckAvailabilityModal
        venue={selectedVenueForAvailability}
        onClose={() => setSelectedVenueForAvailability(null)}
      />

      <RealWeddingsModal
        wedding={selectedRealWedding}
        onClose={() => setSelectedRealWedding(null)}
        onSelectVenue={handleSelectVenueById}
        onNavigateToVenues={() => handleNavigate('venues')}
      />

      <PlanningSuiteModal
        isOpen={planningModalOpen}
        onClose={() => setPlanningModalOpen(false)}
        defaultTool={planningDefaultTool}
      />

      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      <BundleDrawer
        isOpen={bundleDrawerOpen}
        onClose={() => setBundleDrawerOpen(false)}
        bundle={bundle}
        onRemoveVendor={handleRemoveFromBundle}
        onClearBundle={handleClearBundle}
        onNavigateToServices={() => handleNavigate('services')}
      />
    </div>
  );
}
