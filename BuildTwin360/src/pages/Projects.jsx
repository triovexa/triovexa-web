import React, { useState, useEffect } from 'react';
import ProjectsNavbar from '../components/ProjectsNavbar';
import NexusStackingCards from '../components/NexusStackingCards';
import ProjectsOverviewGrid from '../components/ProjectsOverviewGrid';
import CTASection from '../components/CTASection';
import ServicesFooter from '../components/ServicesFooter';
import InquiryModal from '../components/InquiryModal';
import {
  PROJECT_CATEGORIES,
  CLIENT_PROJECTS,
  IN_HOUSE_PRODUCTS,
  ACADEMIC_PROJECTS,
} from '../data/projectsData';
import '../styles/projects.css';

export default function Projects() {
  // Read active tab from URL query param if present
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (['client', 'products', 'academic'].includes(tabParam)) {
        return tabParam;
      }
    }
    return 'client';
  });

  // Inquiry modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedService: null,
  });

  const handleOpenInquiry = (service) => {
    setModalState({
      isOpen: true,
      selectedService: service || { name: 'Projects & Products Consultation', type: 'general' },
    });
  };

  const handleCloseInquiry = () => {
    setModalState({ isOpen: false, selectedService: null });
  };

  // Switch tab and sync with browser URL
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.pushState(null, '', url.pathname + url.search);

      // Scroll smoothly to top of cards
      const cardsEl = document.getElementById('nexus-cards-showcase');
      if (cardsEl) {
        cardsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleScrollToGrid = () => {
    const gridEl = document.getElementById('all-projects-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Listen to popstate (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (['client', 'products', 'academic'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentCategory = PROJECT_CATEGORIES.find((cat) => cat.id === activeTab) || PROJECT_CATEGORIES[0];

  let currentProjects = CLIENT_PROJECTS;
  if (activeTab === 'products') {
    currentProjects = IN_HOUSE_PRODUCTS;
  } else if (activeTab === 'academic') {
    currentProjects = ACADEMIC_PROJECTS;
  }

  return (
    <div className="projects-page-wrapper">
      {/* Navigation Header */}
      <ProjectsNavbar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Hero Header Section - Clean & Focused per user image red-line removals */}
      <section className="projects-hero-clean" id="projects-hero">
        <div className="nexus-full-container">
          <h1 className="projects-clean-title">
            The Innovation Pillars of <span className="nexus-brand-text">TRIOVEXA</span>
          </h1>

          {/* Clean Category Switcher Tabs */}
          <div className="projects-category-tabs-container">
            <div className="projects-category-tabs">
              {PROJECT_CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`projects-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabChange(cat.id)}
                  >
                    <div className="tab-btn-icon">
                      <i className={cat.icon}></i>
                    </div>
                    <div className="tab-btn-text">
                      <span className="tab-btn-label">{cat.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 1. Yellow.ai Nexus Interactive Stacking & Zoom-Out Cards Showcase */}
      <section className="nexus-cards-showcase-section" id="nexus-cards-showcase">
        <NexusStackingCards
          key={activeTab}
          projects={currentProjects}
          onOpenInquiry={handleOpenInquiry}
          onScrollToGrid={handleScrollToGrid}
        />
      </section>

      {/* 2. All Projects Grid Overview (Appears immediately after cards deck per user instruction) */}
      <ProjectsOverviewGrid
        category={currentCategory}
        projects={currentProjects}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 3. CTA Section - View Our Projects button is hidden on projects page per user request */}
      <CTASection onOpenInquiry={handleOpenInquiry} showProjectsButton={false} />

      {/* 4. Footer */}
      <ServicesFooter onOpenInquiry={handleOpenInquiry} />

      {/* 5. Inquiry Modal */}
      <InquiryModal
        isOpen={modalState.isOpen}
        onClose={handleCloseInquiry}
        selectedService={modalState.selectedService}
      />
    </div>
  );
}
