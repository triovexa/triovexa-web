import React, { useState, useEffect, useRef } from 'react';

export default function ProjectsNavbar({ activeTab, onSelectTab, onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProjectsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tabId) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    }
    setProjectsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
        <div className="container">
          <nav className="nav-wrapper">
            {/* Logo */}
            <a href="/" className="logo">
              <div className="logo-icon">
                <i className="ri-code-s-slash-line"></i>
              </div>
              <span>
                <span className="gradient-sky-text">TRIO</span>VEXA
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="nav-menu">
              <li>
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="nav-link">
                  Services
                </a>
              </li>

              {/* Projects Dropdown Menu */}
              <li
                className="nav-item-dropdown"
                ref={dropdownRef}
                onMouseEnter={() => setProjectsDropdownOpen(true)}
                onMouseLeave={() => setProjectsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-link dropdown-toggle active`}
                  onClick={() => setProjectsDropdownOpen(!projectsDropdownOpen)}
                  aria-expanded={projectsDropdownOpen}
                >
                  <span>Projects & Products</span>
                  <i className={`ri-arrow-down-s-line dropdown-arrow ${projectsDropdownOpen ? 'rotated' : ''}`}></i>
                </button>

                <div className={`projects-nav-dropdown-menu ${projectsDropdownOpen ? 'show' : ''}`}>
                  <div className="dropdown-menu-header">
                    <span>EXPLORE PORTFOLIOS</span>
                  </div>

                  <a
                    href="/projects?tab=client"
                    className={`dropdown-menu-item ${activeTab === 'client' ? 'active-item' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick('client');
                    }}
                  >
                    <div className="dropdown-item-icon client-icon">
                      <i className="ri-truck-line"></i>
                    </div>
                    <div className="dropdown-item-info">
                      <div className="dropdown-item-title">Our Client Projects</div>
                      <div className="dropdown-item-desc">Lithin Transport, Saraswathy Traders & Billing Systems</div>
                    </div>
                  </a>

                  <a
                    href="/projects?tab=products"
                    className={`dropdown-menu-item ${activeTab === 'products' ? 'active-item' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick('products');
                    }}
                  >
                    <div className="dropdown-item-icon product-icon">
                      <i className="ri-apps-2-line"></i>
                    </div>
                    <div className="dropdown-item-info">
                      <div className="dropdown-item-title">Our In-House Products</div>
                      <div className="dropdown-item-desc">HRM, ERP, TaskPulse AI & BuildTwin360</div>
                    </div>
                  </a>

                  <a
                    href="/projects?tab=academic"
                    className={`dropdown-menu-item ${activeTab === 'academic' ? 'active-item' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick('academic');
                    }}
                  >
                    <div className="dropdown-item-icon academic-icon">
                      <i className="ri-graduation-cap-line"></i>
                    </div>
                    <div className="dropdown-item-info">
                      <div className="dropdown-item-title">Academic Projects</div>
                      <div className="dropdown-item-desc">Visually Impaired Mobility Assist, Maternal Health Tracker & IoT</div>
                    </div>
                  </a>
                </div>
              </li>

              <li>
                <a href="/#portfolio" className="nav-link">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/#ratings" className="nav-link">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>

            {/* Actions */}
            <div className="nav-actions">
              <button
                type="button"
                onClick={() =>
                  onOpenInquiry &&
                  onOpenInquiry({ name: 'Project & Product Inquiry', type: 'projects-nav' })
                }
                className="btn btn-sky"
              >
                <span>Let's Talk</span>
                <i className="ri-arrow-right-line"></i>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <i className={mobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'}></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="/" onClick={() => setMobileMenuOpen(false)}>
          <i className="ri-home-4-line" style={{ marginRight: '8px' }}></i>
          Home
        </a>
        <a href="/services" onClick={() => setMobileMenuOpen(false)}>
          <i className="ri-service-line" style={{ marginRight: '8px' }}></i>
          Services (What We Do)
        </a>

        {/* Mobile Dropdown Category Links */}
        <div className="mobile-drawer-category-heading">
          <i className="ri-folder-open-line"></i>
          <span>PROJECTS & PRODUCTS</span>
        </div>
        <a
          href="/projects?tab=client"
          className={activeTab === 'client' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick('client');
          }}
        >
          <i className="ri-truck-line" style={{ marginRight: '8px', color: '#10b981' }}></i>
          Our Client Projects
        </a>
        <a
          href="/projects?tab=products"
          className={activeTab === 'products' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick('products');
          }}
        >
          <i className="ri-apps-2-line" style={{ marginRight: '8px', color: '#00f2fe' }}></i>
          Our In-House Products
        </a>
        <a
          href="/projects?tab=academic"
          className={activeTab === 'academic' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick('academic');
          }}
        >
          <i className="ri-graduation-cap-line" style={{ marginRight: '8px', color: '#8b5cf6' }}></i>
          Academic Projects
        </a>

        <a href="/#portfolio" onClick={() => setMobileMenuOpen(false)}>
          <i className="ri-briefcase-line" style={{ marginRight: '8px' }}></i>
          Portfolio
        </a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
          <i className="ri-mail-line" style={{ marginRight: '8px' }}></i>
          Contact Us
        </a>

        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            if (onOpenInquiry) {
              onOpenInquiry({ name: 'Project & Product Inquiry', type: 'mobile-nav' });
            }
          }}
          className="btn btn-sky"
          style={{ width: '100%', marginTop: '0.8rem', justifyContent: 'center' }}
        >
          <span>Let's Talk</span>
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </>
  );
}
