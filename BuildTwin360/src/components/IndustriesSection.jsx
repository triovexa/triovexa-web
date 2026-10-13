import React, { useState, useEffect, useRef } from 'react';
import IndustryCard from './IndustryCard';

const INDUSTRIES_DATA = [
  {
    id: 'transport',
    name: 'Transport & Logistics',
    description: 'Fleet, billing, booking and business management solutions.',
    icon: 'ri-truck-line',
    image: '/assets/images/industries/transport.jpg',
  },
  {
    id: 'travel',
    name: 'Travel & Tourism',
    description: 'Websites and digital solutions for travel and tourism businesses.',
    icon: 'ri-compass-3-line',
    image: '/assets/images/industries/travel.jpg',
  },
  {
    id: 'textile',
    name: 'Textile',
    description: 'Digital solutions for textile operations and business management.',
    icon: 'ri-t-shirt-air-line',
    image: '/assets/images/industries/textile.jpg',
  },
  {
    id: 'garments',
    name: 'Garments',
    description: 'Technology solutions for garment production and business workflows.',
    icon: 'ri-scissors-2-line',
    image: '/assets/images/industries/garments.jpg',
  },
  {
    id: 'dyeing',
    name: 'Dyeing',
    description: 'Software solutions for dyeing operations, tracking and management.',
    icon: 'ri-drop-line',
    image: '/assets/images/industries/dyeing.jpg',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Digital tools for production, inventory and operational management.',
    icon: 'ri-settings-5-line',
    image: '/assets/images/industries/manufacturing.jpg',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Web, software and management solutions for educational institutions.',
    icon: 'ri-graduation-cap-line',
    image: '/assets/images/industries/education.jpg',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Digital solutions for healthcare businesses and service providers.',
    icon: 'ri-heart-pulse-line',
    image: '/assets/images/industries/healthcare.jpg',
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Billing, inventory, e-commerce and business management solutions.',
    icon: 'ri-store-2-line',
    image: '/assets/images/industries/retail.jpg',
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    description: 'Secure digital solutions for financial operations and workflows.',
    icon: 'ri-bank-card-line',
    image: '/assets/images/industries/finance.jpg',
  },
  {
    id: 'startups',
    name: 'Startups & New Businesses',
    description: 'Technology solutions that help new businesses launch, grow and scale.',
    icon: 'ri-rocket-2-line',
    image: '/assets/images/industries/startups.jpg',
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    description: 'Digital solutions for government departments, e-governance, and public services.',
    icon: 'ri-government-line',
    image: '/assets/images/industries/government.jpg',
  },
];

export default function IndustriesSection({ onSelectIndustry }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showFullGrid, setShowFullGrid] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const sectionRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const total = INDUSTRIES_DATA.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Entrance animation: animate in from left-bottom corner into center when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.01, rootMargin: '60px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle every 2 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
      if (dx > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const activeIndustry = INDUSTRIES_DATA[currentIndex];

  // Calculate card position styles for the fanned arc deck
  const getCardStyle = (index) => {
    let offset = index - currentIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);

    const isMobile = windowWidth <= 768;
    const isSmallMobile = windowWidth <= 480;

    // Only render cards within visible range (±2 on mobile, ±3 on desktop)
    const maxVisibleOffset = isMobile ? 2 : 3;
    if (absOffset > maxVisibleOffset) {
      return {
        opacity: 0,
        transform: `translateX(${offset * 120}px) translateY(80px) rotate(${offset * 10}deg) scale(0.5)`,
        pointerEvents: 'none',
        zIndex: 0,
      };
    }

    // Geometry responsive to screen width
    const spacingX = isSmallMobile ? 65 : isMobile ? 95 : 145; // horizontal spread
    const dropY = (isMobile ? 11 : 16) * Math.pow(absOffset, 1.25); // downward arch curvature
    const rotationDeg = offset * (isMobile ? 6.5 : 9); // fan angle
    const scale = (isMobile ? 1 : 1.05) - absOffset * 0.08; // middle largest
    const zIndex = 15 - absOffset * 3;
    const opacity = 1 - absOffset * 0.14;

    return {
      transform: `translateX(${offset * spacingX}px) translateY(${dropY}px) rotate(${rotationDeg}deg) scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  return (
    <section 
      className={`industries-section ${isInView ? 'industries-enter-active' : 'industries-enter-initial'}`} 
      id="industries"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <i className="ri-building-line"></i> Domain Specialization
          </span>
          <h2>Industries We Serve</h2>
          <p>Technology solutions tailored for businesses across different industries.</p>
        </div>

        {/* 3D Animated Fanned Deck (Moves every 2 seconds, with touch swipe support) */}
        <div
          className="industry-fan-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fanned Cards Stage */}
          <div 
            className="industry-fan-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {INDUSTRIES_DATA.map((industry, idx) => {
              const isCenter = idx === currentIndex;
              const cardStyle = getCardStyle(idx);

              return (
                <div
                  key={industry.id}
                  className={`industry-fan-card ${isCenter ? 'active-center' : ''}`}
                  style={cardStyle}
                  onClick={() => {
                    if (isCenter) {
                      onSelectIndustry(industry);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${industry.name} Industry`}
                >
                  <img src={industry.image} alt={industry.name} loading="lazy" />
                  <div className="industry-fan-card-overlay">
                    <div className="industry-fan-icon">
                      <i className={industry.icon}></i>
                    </div>
                    <div className="industry-fan-name">{industry.name}</div>
                    <div className="industry-fan-short-desc">{industry.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Industry Information Highlight Panel (Removed 1 to 12 counter as requested) */}
          <div className="active-industry-display">
            <div className="active-industry-live-title">
              {activeIndustry.name} Solutions
            </div>

            <p className="active-industry-live-desc">
              {activeIndustry.description}
            </p>

            <button
              type="button"
              className="btn btn-sky"
              style={{ marginTop: '0.4rem', padding: '0.75rem 1.8rem' }}
              onClick={() => onSelectIndustry(activeIndustry)}
            >
              <span>Discuss {activeIndustry.name} Project</span>
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>

          {/* Controls: Clean Left & Right Arrow Navigation (Removed 1 to 12 dots as requested) */}
          <div className="fan-controls-row">
            <button
              type="button"
              className="fan-nav-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous industry"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>

            <button
              type="button"
              className="fan-nav-arrow-btn"
              onClick={handleNext}
              aria-label="Next industry"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>

          {/* Toggle Button for Full 12-Card Grid */}
          <div className="view-all-grid-toggle">
            <button
              type="button"
              className="view-all-grid-toggle-btn"
              onClick={() => setShowFullGrid(!showFullGrid)}
            >
              <i className={showFullGrid ? 'ri-arrow-up-s-line' : 'ri-grid-fill'}></i>
              <span>{showFullGrid ? 'Hide Full Grid' : 'View All Industries Grid'}</span>
            </button>
          </div>
        </div>

        {/* Optional Full Grid Expansion for Complete Browsing */}
        {showFullGrid && (
          <div className="industries-cards-grid" style={{ marginTop: '2rem' }}>
            {INDUSTRIES_DATA.map((industry) => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                onSelect={onSelectIndustry}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export { INDUSTRIES_DATA };
