import React from 'react';

export default function IndustryCard({ industry, onSelect }) {
  const { name, description, icon, image } = industry;

  return (
    <div 
      className="industry-pro-card" 
      onClick={() => onSelect(industry)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(industry);
        }
      }}
    >
      <img src={image} alt={`${name} Industry Solutions - TRIOVEXA`} className="industry-card-img" loading="lazy" />
      <div className="industry-card-backdrop">
        <div className="industry-card-icon-tag">
          <i className={icon}></i>
        </div>
        <h3 className="industry-card-name">{name}</h3>
        <p className="industry-card-desc">{description}</p>
      </div>
    </div>
  );
}
