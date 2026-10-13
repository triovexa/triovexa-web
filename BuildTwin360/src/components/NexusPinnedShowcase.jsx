import React, { useState, useEffect, useRef } from 'react';

export default function NexusPinnedShowcase({ projects, onOpenInquiry }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Monitor scroll within the pinned section
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalCards = projects.length;
      if (totalCards <= 1) {
        setScrollProgress(0);
        setActiveCardIndex(0);
        return;
      }

      const totalScrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;
      const clamped = Math.max(0, Math.min(totalScrollableDistance, currentScroll));
      const progress = totalScrollableDistance > 0 ? (clamped / totalScrollableDistance) * (totalCards - 1) : 0;

      setScrollProgress(progress);
      setActiveCardIndex(Math.min(totalCards - 1, Math.floor(progress)));
    };

    const onScrollThrottled = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('onscroll', onScrollThrottled);
      cancelAnimationFrame(animationFrameId);
    };
  }, [projects]);

  // Jump directly to card on dot/pill click
  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    const totalCards = projects.length;
    if (totalCards <= 1) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const totalScrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (totalCards - 1)) * totalScrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Color schemes inspired by the reference images (Yellow.ai Nexus)
  const cardThemes = [
    {
      bg: '#E4E815', // Vibrant Acid Lime / Yellow from reference
      textColor: '#070b13',
      pillBg: '#070b13',
      pillColor: '#ffffff',
      descColor: '#1e293b',
      checkColor: '#070b13',
      chipBg: 'rgba(0, 0, 0, 0.08)',
      chipColor: '#070b13',
      border: 'none',
      badgeBg: 'rgba(0, 0, 0, 0.1)',
      badgeColor: '#070b13',
    },
    {
      bg: '#F5F3E9', // Warm White / Cream from reference
      textColor: '#0a0f1d',
      pillBg: '#0a0f1d',
      pillColor: '#ffffff',
      descColor: '#334155',
      checkColor: '#0a0f1d',
      chipBg: 'rgba(0, 0, 0, 0.07)',
      chipColor: '#0f172a',
      border: 'none',
      badgeBg: 'rgba(0, 0, 0, 0.08)',
      badgeColor: '#0f172a',
    },
    {
      bg: '#0e172a', // Midnight Navy / Cyan
      textColor: '#ffffff',
      pillBg: '#00f2fe',
      pillColor: '#070b13',
      descColor: '#94a3b8',
      checkColor: '#00f2fe',
      chipBg: 'rgba(255, 255, 255, 0.08)',
      chipColor: '#e2e8f0',
      border: '1px solid rgba(0, 242, 254, 0.3)',
      badgeBg: 'rgba(0, 242, 254, 0.15)',
      badgeColor: '#00f2fe',
    },
    {
      bg: '#142019', // Deep Forest / Emerald
      textColor: '#ffffff',
      pillBg: '#10b981',
      pillColor: '#070b13',
      descColor: '#a7f3d0',
      checkColor: '#10b981',
      chipBg: 'rgba(255, 255, 255, 0.08)',
      chipColor: '#e2e8f0',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeColor: '#10b981',
    },
  ];

  const totalCards = projects.length;

  return (
    <div
      className="nexus-pinned-track"
      ref={containerRef}
      style={{
        // Height equals (totalCards * 100vh) to provide scroll depth while pinned
        height: `${Math.max(2, totalCards) * 115}vh`,
      }}
    >
      {/* Sticky Viewport - Locks on screen while user scrolls through cards */}
      <div className="nexus-sticky-stage">
        <div className="container nexus-stage-container">
          {/* Card Deck Wrapper */}
          <div className="nexus-cards-deck">
            {projects.map((project, index) => {
              const diff = index - scrollProgress;
              const theme = cardThemes[index % cardThemes.length];

              let transform = '';
              let opacity = 1;
              let zIndex = 10 + index;
              let filter = 'none';
              let pointerEvents = 'auto';

              if (diff <= 0) {
                // Card is active or has been passed: ZOOM OUT EFFECT!
                // As next card scrolls up, this card scales down smoothly from 1 to 0.88!
                const scale = Math.max(0.86, 1 + diff * 0.1);
                const translateY = diff * 25; // subtle upward drift
                transform = `scale(${scale}) translateY(${translateY}px)`;
                opacity = Math.max(0, 1 + diff * 0.7);
                filter = `brightness(${Math.max(0.65, 1 + diff * 0.25)})`;
                zIndex = 10 + index;
                if (diff < -0.9) pointerEvents = 'none';
              } else if (diff > 0 && diff < 1) {
                // Incoming card entering from below and stacking over the previous card
                const translateY = diff * 102;
                transform = `translateY(${translateY}%) scale(1)`;
                opacity = 1;
                zIndex = 20 + index;
              } else {
                // Card waiting below
                transform = `translateY(110%) scale(1)`;
                opacity = 0;
                zIndex = 5;
                pointerEvents = 'none';
              }

              return (
                <div
                  key={project.id}
                  className="nexus-showcase-card"
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.textColor,
                    border: theme.border,
                    transform,
                    opacity,
                    zIndex,
                    filter,
                    pointerEvents,
                  }}
                >
                  <div className="nexus-showcase-inner">
                    {/* Left Side: Content */}
                    <div className="nexus-showcase-left">
                      {/* Pill Tag (Matching "Eyes", "Hands" in reference) */}
                      <div className="nexus-pill-badge-row">
                        <span
                          className="nexus-reference-pill"
                          style={{
                            backgroundColor: theme.pillBg,
                            color: theme.pillColor,
                          }}
                        >
                          {project.tagIcon && <i className={project.tagIcon}></i>}
                          <span>{project.tagPill}</span>
                        </span>

                        <span
                          className="nexus-category-badge"
                          style={{
                            backgroundColor: theme.badgeBg,
                            color: theme.badgeColor,
                          }}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* Large Bold Headline */}
                      <h2
                        className="nexus-showcase-title"
                        style={{ color: theme.textColor }}
                      >
                        {project.title}
                      </h2>

                      {/* Clean 1-2 sentence core purpose */}
                      <p
                        className="nexus-showcase-summary"
                        style={{ color: theme.descColor }}
                      >
                        {project.summary}
                      </p>

                      {/* Clean Bullets */}
                      {project.features && (
                        <ul className="nexus-showcase-features">
                          {project.features.map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              style={{ color: theme.textColor }}
                            >
                              <i
                                className="ri-checkbox-circle-fill"
                                style={{ color: theme.checkColor }}
                              ></i>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech Stack Chips */}
                      {project.techStack && (
                        <div className="nexus-showcase-chips">
                          {project.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="nexus-chip"
                              style={{
                                backgroundColor: theme.chipBg,
                                color: theme.chipColor,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Row */}
                      <div className="nexus-showcase-actions">
                        {project.hasLiveLink && project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-nexus-live"
                          >
                            <span>Launch Live Platform</span>
                            <i className="ri-external-link-line"></i>
                          </a>
                        ) : project.portalDomain ? (
                          <div className="nexus-private-badge">
                            <i className="ri-shield-keyhole-line"></i>
                            <span>🔒 Private Client Infrastructure</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenInquiry &&
                              onOpenInquiry({
                                name: project.title,
                                type: project.demoModalTag || 'project-demo-request',
                              })
                            }
                            className="btn btn-nexus-live"
                          >
                            <span>Request Architecture Details</span>
                            <i className="ri-arrow-right-up-line"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Side: UI Mockup Showcase */}
                    <div className="nexus-showcase-right">
                      <div className="nexus-screen-mockup">
                        {/* Chrome Header */}
                        <div className="nexus-mockup-header">
                          <div className="nexus-mockup-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                          </div>
                          <div className="nexus-mockup-url">
                            <i className="ri-lock-fill"></i>
                            <span>
                              {project.liveUrl
                                ? project.liveUrl.replace(/^https?:\/\//, '')
                                : project.portalDomain
                                ? project.portalDomain
                                : `triovexa.internal/${project.id}`}
                            </span>
                          </div>
                        </div>

                        {/* Image Canvas */}
                        <div className="nexus-mockup-canvas">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="nexus-mockup-image"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = '/assets/images/projects/lithin-main.jpg';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Navigation Indicator */}
          <div className="nexus-stepper-bar">
            <div className="nexus-stepper-info">
              <span>Scroll to zoom & stack</span>
              <i className="ri-arrow-down-line"></i>
            </div>
            <div className="nexus-stepper-dots">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={`nexus-step-dot ${activeCardIndex === i ? 'active' : ''}`}
                  onClick={() => scrollToCard(i)}
                  title={p.title}
                >
                  <span className="dot-label">{p.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
