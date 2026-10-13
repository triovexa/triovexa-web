import React, { useState, useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

const SERVICES_DATA = [
  {
    id: 'billing',
    name: 'Billing Software',
    description: 'Smart billing and business management software built for your workflow.',
    icon: 'ri-bill-line',
    image: '/assets/images/services/billing.jpg',
    tags: ['GST Invoicing', 'Barcode POS', 'Real-time Reports'],
    fullDetails: 'Customized point-of-sale, thermal printing support, automated tax invoices, and instant ledger balance sheets designed for seamless retail and wholesale billing.',
  },
  {
    id: 'website',
    name: 'Website Development',
    description: 'Modern, responsive websites designed to represent your business professionally.',
    icon: 'ri-global-line',
    image: '/assets/images/services/website.jpg',
    tags: ['Modern React/Vite', 'SEO Optimized', 'Ultra Fast Loading'],
    fullDetails: 'Visually stunning, mobile-first responsive corporate websites and web portals engineered with state-of-the-art tech stacks for maximum brand credibility.',
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Development',
    description: 'User-friendly mobile applications for Android and iOS platforms.',
    icon: 'ri-smartphone-line',
    image: '/assets/images/services/mobile-app.jpg',
    tags: ['Android & iOS', 'Offline Capable', 'Smooth UX'],
    fullDetails: 'Native and cross-platform smartphone applications featuring live GPS tracking, push notifications, offline caching, and frictionless customer onboarding.',
  },
  {
    id: 'offline-software',
    name: 'Offline Software',
    description: 'Reliable desktop software that works without constant internet access.',
    icon: 'ri-hard-drive-2-line',
    image: '/assets/images/services/offline-software.jpg',
    tags: ['Local Database', 'Zero Downtime', 'Auto Cloud Sync'],
    fullDetails: 'Robust standalone desktop solutions engineered to operate 100% reliably in environments with intermittent internet connectivity, with safe automatic cloud synchronization.',
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    description: 'Clean and intuitive interfaces designed for better user experiences.',
    icon: 'ri-palette-line',
    image: '/assets/images/services/ui-ux.jpg',
    tags: ['Design Systems', 'Interactive Prototypes', 'User Centered'],
    fullDetails: 'Human-centered user journeys, wireframing, high-fidelity prototypes, and sleek modern design languages that boost user retention and productivity.',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Websites',
    description: 'Complete online stores with products, payments, orders and business management.',
    icon: 'ri-shopping-cart-2-line',
    image: '/assets/images/services/ecommerce.jpg',
    tags: ['Payment Gateways', 'Inventory Tracking', 'Order CMS'],
    fullDetails: 'Full-featured online storefronts with integrated UPI, debit/credit cards, automatic shipping calculations, discount coupons, and inventory synchronization.',
  },
  {
    id: 'erp-hrm',
    name: 'ERP & HRM Solutions',
    description: 'Business systems for managing employees, operations, payroll and workflows.',
    icon: 'ri-team-line',
    image: '/assets/images/services/erp-hrm.jpg',
    tags: ['Payroll & Shifts', 'Department Workflows', 'Staff Logs'],
    fullDetails: 'Integrated enterprise resource planning and human resource management systems covering attendance biometric sync, leave approvals, salary slips, and multi-department workflows.',
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'AI-powered solutions that automate tasks and turn business data into insights.',
    icon: 'ri-brain-line',
    image: '/assets/images/services/ai-ml.jpg',
    tags: ['Process Automation', 'Predictive Analytics', 'Smart Chatbots'],
    fullDetails: 'Intelligent algorithms, predictive demand forecasting, automated optical character recognition (OCR), and conversational AI assistants that reduce manual labor.',
  },
  {
    id: 'maintenance',
    name: 'Software Maintenance',
    description: 'Ongoing fixes, improvements, updates and technical support for existing software.',
    icon: 'ri-tools-line',
    image: '/assets/images/services/maintenance.jpg',
    tags: ['24/7 Monitoring', 'Security Patches', 'Speed Optimization'],
    fullDetails: 'Proactive server health checks, regular database indexing, vulnerability patch releases, bug fixes, and continuous technical support to guarantee maximum uptime.',
  },
  {
    id: 'modernization',
    name: 'Software Modernization',
    description: 'Modernizing existing software with improved technology, performance and user experience.',
    icon: 'ri-refresh-line',
    image: '/assets/images/services/modernization.jpg',
    tags: ['Legacy Migration', 'Cloud Architecture', 'Modern UI'],
    fullDetails: 'Specifically tailored for businesses with legacy, slow, or outdated software systems. We refactor old codebases, migrate databases to modern clouds, and revamp old interfaces into fast, modern applications.',
  },
  {
    id: 'custom-software',
    name: 'Custom Software Development',
    description: 'Fully customized software built around your unique business requirements.',
    icon: 'ri-code-box-line',
    image: '/assets/images/services/custom-software.jpg',
    tags: ['Bespoke Logic', 'Custom APIs', 'Scalable Architecture'],
    fullDetails: 'End-to-end bespoke software engineered from the ground up to match your exact business operational procedures, workflows, and third-party integrations.',
  },
  {
    id: 'seo',
    name: 'SEO & Digital Optimization',
    description: 'Data-driven SEO strategies, keyword ranking, and digital optimization to grow your online visibility.',
    icon: 'ri-search-eye-line',
    image: '/assets/images/services/seo.jpg',
    tags: ['Search Ranking', 'Keyword Audit', 'Organic Growth'],
    fullDetails: 'Comprehensive search engine optimization including on-page metadata, technical crawlability, Google Search Console indexing, high-intent keyword strategies, and local business SEO to drive organic leads.',
  },
];

export default function ServicesGrid({ onExploreService }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  const windowRef = useRef(null);

  // Responsive card geometry: adapts between mobile, tablet, and desktop
  const isMobile = windowWidth <= 768;
  const isSmallMobile = windowWidth <= 480;
  const CARD_WIDTH = isSmallMobile ? 275 : isMobile ? 290 : 330;
  const CARD_GAP = isMobile ? 16 : 24;
  const TOTAL_CARDS = SERVICES_DATA.length; // 12
  const leftPad = isMobile ? 16 : Math.max(24, (windowWidth - 1200) / 2 + 15);
  // Total span from left edge of track to right edge of Card 12:
  const cardsSpan = leftPad + TOTAL_CARDS * CARD_WIDTH + (TOTAL_CARDS - 1) * CARD_GAP;
  // Maximum distance to translate so Card 12 (SEO) is fully visible at right edge
  const maxScrollDistance = Math.max(400, cardsSpan - windowWidth + (isMobile ? 16 : 24));
  // Total track width including end padding:
  const TOTAL_TRACK_WIDTH = cardsSpan + (isMobile ? 40 : 100);

  // Exact outer section height: (maxScrollDistance + windowHeight - navbarOffset)
  const navbarOffset = isMobile ? 65 : 70;
  const sectionHeight = maxScrollDistance + windowHeight - navbarOffset;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile Touch-Swipe Support: allows mobile users to swipe horizontally on cards with their thumb
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const dx = touchStartX - e.touches[0].clientX;
      const dy = touchStartY - e.touches[0].clientY;

      // When horizontal swipe is detected on cards, translate to page scroll
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
        window.scrollBy({ top: dx * 1.15 });
        touchStartX = e.touches[0].clientX;
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Scroll synchronization: scrolling DOWN directly drives translateX across all 12 cards!
  // ONLY when Card 12 is fully in view does it release and scroll down to Industries!
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          // Navbar sticky offset
          const scrolled = navbarOffset - rect.top;
          const clamped = Math.max(0, Math.min(maxScrollDistance, scrolled));

          // Direct GPU accelerated transform for zero-lag silky smooth motion
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(-${clamped}px, 0, 0)`;
          }

          setTranslateX(clamped);
          setScrollProgress(clamped / maxScrollDistance);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxScrollDistance, navbarOffset]);

  const handleArrowNav = (direction) => {
    if (!sectionRef.current) return;
    const step = isMobile ? 300 : 360;
    const currentScrollY = window.scrollY;
    const targetScrollY = direction === 'right' ? currentScrollY + step : currentScrollY - step;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <section 
      className="services-pin-section" 
      id="services-grid" 
      ref={sectionRef}
      style={{ height: `${sectionHeight}px` }}
    >
      <div className="services-pin-viewport">
        {/* Section Header */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="services-pin-header">
            <div>
              <span className="section-tag" style={{ marginBottom: '0.35rem' }}>
                <i className="ri-apps-2-line"></i> Comprehensive Capabilities
              </span>
              <h2 className="services-pin-title">
                What We Do
              </h2>
              <p className="services-pin-subtitle">
                Technology solutions designed for real business needs.
              </p>
            </div>

            {/* Horizontal Stream Control Bar */}
            <div className="services-stream-controls">
              <div className="stream-progress-track">
                <div 
                  className="stream-progress-bar"
                  style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
                ></div>
              </div>

              <div className="stream-nav-buttons">
                <button 
                  type="button" 
                  className="stream-arrow-btn"
                  onClick={() => handleArrowNav('left')}
                  aria-label="Scroll left"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </button>
                
                <button 
                  type="button" 
                  className="stream-arrow-btn"
                  onClick={() => handleArrowNav('right')}
                  aria-label="Scroll right"
                >
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Streaming Cards Track */}
        <div className="services-stream-window" ref={windowRef}>
          <div 
            className="services-stream-track" 
            ref={trackRef}
            style={{
              transform: `translate3d(-${translateX}px, 0, 0)`,
              width: `${TOTAL_TRACK_WIDTH}px`,
            }}
          >
            {SERVICES_DATA.map((service, index) => {
              const isStaggered = index % 2 === 1;
              return (
                <div 
                  key={service.id} 
                  className={`service-stream-card-wrapper ${isStaggered ? 'staggered-down' : 'staggered-up'}`}
                >
                  <ServiceCard
                    service={service}
                    onExplore={onExploreService}
                    isStaggered={isStaggered}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export { SERVICES_DATA };
