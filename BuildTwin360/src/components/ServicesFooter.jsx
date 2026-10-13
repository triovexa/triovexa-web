import React from 'react';

export default function ServicesFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <a href="/" className="logo" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              <div className="logo-icon">
                <i className="ri-code-s-slash-line"></i>
              </div>
              <span>
                <span className="gradient-sky-text">TRIO</span>VEXA
              </span>
            </a>
            <p style={{ color: 'var(--text-sky-light)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '340px' }}>
              TRIOVEXA - Modern Software & App Development Studio. Empowering businesses with smart billing, custom ERP, cross-platform mobile apps, and scalable web solutions.
            </p>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>
              Core Services
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                color: 'var(--text-sky-light)',
                fontSize: '0.9rem',
              }}
            >
              <li><a href="#services-grid">Billing Software</a></li>
              <li><a href="#services-grid">Website Development</a></li>
              <li><a href="#services-grid">Mobile App Development</a></li>
              <li><a href="#services-grid">Offline Software</a></li>
              <li><a href="#services-grid">ERP & HRM Solutions</a></li>
              <li><a href="#services-grid">Software Modernization</a></li>
              <li><a href="#services-grid">Custom Software</a></li>
            </ul>
          </div>

          {/* Industries Links */}
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>
              Industries
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                color: 'var(--text-sky-light)',
                fontSize: '0.9rem',
              }}
            >
              <li><a href="#industries">Transport & Logistics</a></li>
              <li><a href="#industries">Travel & Tourism</a></li>
              <li><a href="#industries">Textile & Dyeing</a></li>
              <li><a href="#industries">Garments & Apparel</a></li>
              <li><a href="#industries">Manufacturing</a></li>
              <li><a href="#industries">Retail & E-Commerce</a></li>
              <li><a href="#industries">Startups & New Businesses</a></li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>
              Connect With Us
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="WhatsApp"
              >
                <i className="ri-whatsapp-fill"></i>
              </a>
              <a href="tel:+919876543210" className="social-icon-btn" aria-label="Phone">
                <i className="ri-phone-fill"></i>
              </a>
              <a href="mailto:contact@triovexa.com" className="social-icon-btn" aria-label="Mail">
                <i className="ri-mail-fill"></i>
              </a>
            </div>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                color: 'var(--text-sky-light)',
                fontSize: '0.9rem',
              }}
            >
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services Overview</a></li>
              <li><a href="/#portfolio">Portfolio (200+ Projects)</a></li>
              <li><a href="/#ratings">Client Reviews (98%)</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} TRIOVEXA Software & App Solutions. All Rights Reserved.</div>
          <div>200+ Projects Completed • 98.4% Success Rating</div>
        </div>
      </div>
    </footer>
  );
}
