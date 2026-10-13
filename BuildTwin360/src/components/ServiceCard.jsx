import React from 'react';

export default function ServiceCard({ service, onExplore, isStaggered }) {
  const { id, name, description, icon, image, tags } = service;

  return (
    <div 
      className={`service-pro-card ${isStaggered ? 'staggered-card' : ''}`}
      onClick={() => onExplore(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExplore(service);
        }
      }}
    >
      {/* Service Visual Header with Icon Badge - High Visibility, Uncropped Image */}
      <div className="service-image-header">
        <img src={image} alt={`${name} - TRIOVEXA`} loading="lazy" />
        <div className="service-image-overlay">
          <div className="service-icon-badge">
            {id === 'billing' ? (
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ color: 'var(--text-sky-bright)' }}
              >
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                <path d="M14 8H8" />
                <path d="M16 12H8" />
                <path d="M13 16H8" />
              </svg>
            ) : (
              <i className={icon}></i>
            )}
          </div>
        </div>
      </div>

      {/* Service Content Body - Compact Without Empty Wasted Space */}
      <div className="service-card-body">
        <h3 className="service-card-title">{name}</h3>
        <p className="service-card-desc">{description}</p>

        {/* Feature Tags */}
        {tags && tags.length > 0 && (
          <div className="service-tags-list">
            {tags.map((tag, idx) => (
              <span key={idx} className="service-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer Interaction */}
        <div className="service-card-footer">
          <span className="service-explore-link">
            <span>Explore Details</span>
            <i className="ri-arrow-right-line"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
