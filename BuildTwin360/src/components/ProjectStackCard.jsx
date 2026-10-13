import React, { useState } from 'react';

export default function ProjectStackCard({ project, index, onOpenInquiry }) {
  const [imageError, setImageError] = useState(false);

  // Fallback visual if image file is being replaced or missing
  const fallbackGradient = `linear-gradient(135deg, ${project.themeColor}22 0%, #0d1527 100%)`;

  return (
    <article
      className="nexus-stack-card"
      id={`project-${project.id}`}
      style={{
        '--card-index': index,
        '--theme-color': project.themeColor,
        '--border-glow': project.borderGlow,
        '--accent-gradient': project.accentGradient,
        top: `calc(88px + ${index * 20}px)`,
        zIndex: 10 + index,
      }}
    >
      {/* Subtle top indicator bar */}
      <div
        className="nexus-card-topbar"
        style={{ background: `linear-gradient(90deg, ${project.themeColor}, transparent)` }}
      />

      <div className="nexus-card-inner">
        {/* Left Column: Details & Technical Metrics */}
        <div className="nexus-card-content">
          {/* Top Pill / Badge row (Matching "Eyes", "Hands" in reference UI) */}
          <div className="nexus-card-pill-row">
            <span className="nexus-card-pill" style={{ borderColor: project.themeColor }}>
              {project.tagIcon && <i className={project.tagIcon} style={{ color: project.themeColor }}></i>}
              <span>{project.tagPill}</span>
            </span>

            {project.badgeText && (
              <span className={`nexus-card-badge variant-${project.badgeVariant || 'default'}`}>
                {project.badgeText}
              </span>
            )}

            <span className="nexus-card-index-indicator">
              0{index + 1}
            </span>
          </div>

          {/* Title and Category */}
          <div className="nexus-card-header">
            <span className="nexus-card-category">{project.category}</span>
            <h2 className="nexus-card-title">{project.title}</h2>
          </div>

          {/* Summary */}
          <p className="nexus-card-description">{project.summary}</p>

          {/* Key Features Bullet List */}
          {project.features && project.features.length > 0 && (
            <div className="nexus-features-list">
              {project.features.slice(0, 4).map((feat, fIdx) => (
                <div key={fIdx} className="nexus-feature-item">
                  <span className="nexus-check-icon" style={{ color: project.themeColor }}>
                    <i className="ri-checkbox-circle-fill"></i>
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Stats Bar */}
          {project.stats && project.stats.length > 0 && (
            <div className="nexus-stats-grid">
              {project.stats.map((stat, sIdx) => (
                <div key={sIdx} className="nexus-stat-box">
                  <div className="nexus-stat-value" style={{ color: project.themeColor }}>
                    {stat.value}
                  </div>
                  <div className="nexus-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Chips */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="nexus-tech-chips">
              {project.techStack.map((tech, tIdx) => (
                <span key={tIdx} className="nexus-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="nexus-card-actions">
            {project.hasLiveLink && project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-nexus-primary"
                style={{
                  background: project.themeColor,
                  color: '#070b13',
                  boxShadow: `0 0 25px ${project.borderGlow}`,
                }}
              >
                <span>{project.actionText || 'Launch Live Project'}</span>
                <i className="ri-external-link-line"></i>
              </a>
            ) : project.portalDomain ? (
              /* User instruction: For 2nd and 3rd transport projects, do NOT show external link, show protected indicator */
              <div className="nexus-locked-portal-info">
                <div className="nexus-locked-badge">
                  <i className="ri-shield-keyhole-line"></i>
                  <span>Private Client Infrastructure</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInquiry &&
                    onOpenInquiry({
                      name: project.title,
                      type: 'client-architecture-inquiry',
                    })
                  }
                  className="btn btn-nexus-ghost"
                >
                  <i className="ri-information-line"></i>
                  <span>Inquire Similar Solution</span>
                </button>
              </div>
            ) : (
              /* In-House Product or Academic Project */
              <button
                type="button"
                onClick={() =>
                  onOpenInquiry &&
                  onOpenInquiry({
                    name: project.title,
                    type: project.demoModalTag || 'project-demo-request',
                  })
                }
                className="btn btn-nexus-primary"
                style={{
                  background: project.themeColor,
                  color: '#070b13',
                  boxShadow: `0 0 25px ${project.borderGlow}`,
                }}
              >
                <span>{project.actionText || 'Request Details'}</span>
                <i className="ri-arrow-right-up-line"></i>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Visual Showcase Device Frame */}
        <div className="nexus-card-visual">
          <div className="nexus-browser-frame" style={{ borderColor: project.borderGlow }}>
            {/* Browser Header Bar */}
            <div className="nexus-browser-header">
              <div className="nexus-browser-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="nexus-browser-address-bar">
                <i className="ri-lock-fill"></i>
                <span>
                  {project.liveUrl
                    ? project.liveUrl.replace(/^https?:\/\//, '')
                    : project.portalDomain
                    ? project.portalDomain
                    : `triovexa.internal/${project.id}`}
                </span>
              </div>
              <div className="nexus-browser-actions">
                <i className="ri-share-forward-line"></i>
              </div>
            </div>

            {/* Image Preview Container */}
            <div className="nexus-image-container">
              {!imageError ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="nexus-project-img"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="nexus-fallback-visual" style={{ background: fallbackGradient }}>
                  <div className="nexus-fallback-content">
                    <i className="ri-code-box-line" style={{ color: project.themeColor }}></i>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                    <span className="nexus-fallback-tip">Drop {project.image.split('/').pop()} into public folder</span>
                  </div>
                </div>
              )}

              {/* Floating Status Pill over image */}
              <div className="nexus-img-badge-overlay">
                <span className="live-dot" style={{ background: project.themeColor }}></span>
                <span>{project.badgeText || 'Enterprise Ready'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
