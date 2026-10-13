import React from 'react';

export default function ServicesHero() {
  return (
    <section className="services-hero-section services-hero-compact" id="hero">
      <div className="container">
        <div className="services-hero-simple">
          <h1 className="services-hero-title">
            Our <span className="gradient-sky-text">Services</span>
          </h1>

          <div className="services-hero-actions">
            <a href="#services-grid" className="btn btn-sky">
              <span>Explore What We Do</span>
              <i className="ri-arrow-down-line"></i>
            </a>

            <a href="#industries" className="btn btn-outline-sky">
              <span>Industries We Serve</span>
              <i className="ri-building-line"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
