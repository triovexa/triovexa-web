import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProjectImageSlideshow from './ProjectImageSlideshow';

export default function NexusStackingCards({ projects, onOpenInquiry, onScrollToGrid }) {
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const dimOverlayRefs = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardIndexRef = useRef(0);

  // Expanded theme palettes matching the Yellow.ai Nexus reference aesthetic
  const cardThemes = [
    {
      bg: '#E4E815', // Vibrant Lime/Yellow from reference image
      textColor: '#070b13',
      pillBg: '#070b13',
      pillColor: '#ffffff',
      descColor: '#1e293b',
      checkColor: '#070b13',
      chipBg: 'rgba(0, 0, 0, 0.08)',
      chipColor: '#070b13',
      badgeBg: 'rgba(0, 0, 0, 0.1)',
      badgeColor: '#070b13',
      btnBg: '#070b13',
      btnColor: '#ffffff',
    },
    {
      bg: '#F5F3E9', // Warm White / Cream from reference image
      textColor: '#0a0f1d',
      pillBg: '#0a0f1d',
      pillColor: '#ffffff',
      descColor: '#334155',
      checkColor: '#0a0f1d',
      chipBg: 'rgba(0, 0, 0, 0.07)',
      chipColor: '#0f172a',
      badgeBg: 'rgba(0, 0, 0, 0.08)',
      badgeColor: '#0f172a',
      btnBg: '#0a0f1d',
      btnColor: '#ffffff',
    },
    {
      bg: '#0d1b2a', // Deep Sleek Midnight Navy
      textColor: '#ffffff',
      pillBg: '#00f2fe',
      pillColor: '#070b13',
      descColor: '#94a3b8',
      checkColor: '#00f2fe',
      chipBg: 'rgba(0, 242, 254, 0.12)',
      chipColor: '#e0f2fe',
      badgeBg: 'rgba(0, 242, 254, 0.15)',
      badgeColor: '#00f2fe',
      btnBg: '#00f2fe',
      btnColor: '#070b13',
    },
    {
      bg: '#0d2818', // Deep Forest Agro Green
      textColor: '#ffffff',
      pillBg: '#10b981',
      pillColor: '#070b13',
      descColor: '#a7f3d0',
      checkColor: '#10b981',
      chipBg: 'rgba(16, 185, 129, 0.15)',
      chipColor: '#d1fae5',
      badgeBg: 'rgba(16, 185, 129, 0.2)',
      badgeColor: '#10b981',
      btnBg: '#10b981',
      btnColor: '#070b13',
    },
    {
      bg: '#1e1136', // Deep Royal Violet
      textColor: '#ffffff',
      pillBg: '#a855f7',
      pillColor: '#ffffff',
      descColor: '#d8b4fe',
      checkColor: '#a855f7',
      chipBg: 'rgba(168, 85, 247, 0.15)',
      chipColor: '#f3e8ff',
      badgeBg: 'rgba(168, 85, 247, 0.2)',
      badgeColor: '#c084fc',
      btnBg: '#a855f7',
      btnColor: '#ffffff',
    },
    {
      bg: '#23121d', // Deep Berry Rose
      textColor: '#ffffff',
      pillBg: '#f43f5e',
      pillColor: '#ffffff',
      descColor: '#fda4af',
      checkColor: '#f43f5e',
      chipBg: 'rgba(244, 63, 94, 0.15)',
      chipColor: '#ffe4e6',
      badgeBg: 'rgba(244, 63, 94, 0.2)',
      badgeColor: '#fb7185',
      btnBg: '#f43f5e',
      btnColor: '#ffffff',
    },
    {
      bg: '#231707', // Deep Warm Amber
      textColor: '#ffffff',
      pillBg: '#f59e0b',
      pillColor: '#070b13',
      descColor: '#fde68a',
      checkColor: '#f59e0b',
      chipBg: 'rgba(245, 158, 11, 0.15)',
      chipColor: '#fef3c7',
      badgeBg: 'rgba(245, 158, 11, 0.2)',
      badgeColor: '#fbbf24',
      btnBg: '#f59e0b',
      btnColor: '#070b13',
    },
    {
      bg: '#082026', // Deep Cyber Teal
      textColor: '#ffffff',
      pillBg: '#06b6d4',
      pillColor: '#070b13',
      descColor: '#a5f3fc',
      checkColor: '#06b6d4',
      chipBg: 'rgba(6, 182, 212, 0.15)',
      chipColor: '#cffafe',
      badgeBg: 'rgba(6, 182, 212, 0.2)',
      badgeColor: '#22d3ee',
      btnBg: '#06b6d4',
      btnColor: '#070b13',
    },
  ];

  const totalCards = projects.length;
  const numTransitions = Math.max(1, totalCards - 1);
  const step = 1 / numTransitions;

  // Track height calculation: Each transition gets 70vh of scroll distance
  const trackHeightStyle = `${100 + numTransitions * 70}vh`;

  // Hardware-accelerated direct DOM transform applicator (zero React re-render lag during scroll)
  const applyCardTransforms = useCallback(
    (progressVal) => {
      cardsRef.current.forEach((cardEl, index) => {
        if (!cardEl) return;
        const dimOverlayEl = dimOverlayRefs.current[index];

        if (index === 0) {
          // Card 0: Base card. Scales down gently from 1.0 to 0.94 as Card 1 slides in.
          const trans0Progress = Math.min(1, progressVal / step);
          const scale = 1 - trans0Progress * 0.06;
          const translateY = -trans0Progress * 12;
          const dimOpacity = trans0Progress * 0.16;

          cardEl.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          cardEl.style.opacity = '1';
          cardEl.style.visibility = 'visible';
          cardEl.style.pointerEvents = 'auto';
          if (dimOverlayEl) dimOverlayEl.style.opacity = `${dimOpacity}`;
          return;
        }

        const enterStart = (index - 1) * step;
        const enterEnd = index * step;

        if (progressVal < enterStart) {
          // Card has not arrived yet: cleanly parked off-stage below with visibility: hidden to bypass GPU work
          cardEl.style.transform = 'translate3d(0, 115%, 0) scale(1)';
          cardEl.style.opacity = '0';
          cardEl.style.visibility = 'hidden';
          cardEl.style.pointerEvents = 'none';
          if (dimOverlayEl) dimOverlayEl.style.opacity = '0';
          return;
        }

        if (progressVal >= enterStart && progressVal <= enterEnd) {
          // Card is currently sliding UP directly over previous card
          const localProgress = (progressVal - enterStart) / step;
          const easeProgress = Math.sin((localProgress * Math.PI) / 2);
          const translateY = (1 - easeProgress) * 105;

          cardEl.style.transform = `translate3d(0, ${translateY}%, 0) scale(1)`;
          cardEl.style.opacity = '1';
          cardEl.style.visibility = 'visible';
          cardEl.style.pointerEvents = 'auto';
          if (dimOverlayEl) dimOverlayEl.style.opacity = '0';
          return;
        }

        // progressVal > enterEnd: Card is stacked and peeking out at top
        const subsequentProgress = Math.min(1, (progressVal - enterEnd) / step);
        const scale = 1 - subsequentProgress * 0.06;
        const translateY = -subsequentProgress * 12;
        const dimOpacity = subsequentProgress * 0.16;

        cardEl.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        cardEl.style.opacity = '1';
        cardEl.style.visibility = 'visible';
        cardEl.style.pointerEvents = 'auto';
        if (dimOverlayEl) dimOverlayEl.style.opacity = `${dimOpacity}`;
      });
    },
    [step]
  );

  // 60-120 FPS requestAnimationFrame Scroll Listener
  useEffect(() => {
    let animId;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScrollable = trackHeight - windowHeight;

      if (totalScrollable <= 0) {
        applyCardTransforms(0);
        if (activeCardIndexRef.current !== 0) {
          activeCardIndexRef.current = 0;
          setActiveCardIndex(0);
        }
        return;
      }

      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      // Direct GPU transform update without triggering full React component re-render
      applyCardTransforms(clamped);

      // Determine active primary card for the bottom dock button pills
      const currentIdx = Math.min(
        totalCards - 1,
        Math.floor(clamped * numTransitions + 0.35)
      );

      if (currentIdx !== activeCardIndexRef.current) {
        activeCardIndexRef.current = currentIdx;
        setActiveCardIndex(currentIdx);
      }
    };

    const throttled = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttled, { passive: true });
    window.addEventListener('resize', throttled, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttled);
      window.removeEventListener('resize', throttled);
      cancelAnimationFrame(animId);
    };
  }, [totalCards, numTransitions, applyCardTransforms]);

  // Jump to specific card smoothly
  const scrollToCard = useCallback(
    (index) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const trackTop = rect.top + scrollTop;
      const trackHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScrollable = trackHeight - windowHeight;

      const targetProgress = numTransitions > 0 ? index / numTransitions : 0;
      const targetScroll = trackTop + targetProgress * totalScrollable;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    },
    [numTransitions]
  );

  const handleNext = () => {
    if (activeCardIndex < totalCards - 1) {
      scrollToCard(activeCardIndex + 1);
    } else if (onScrollToGrid) {
      onScrollToGrid();
    }
  };

  const handlePrev = () => {
    if (activeCardIndex > 0) {
      scrollToCard(activeCardIndex - 1);
    }
  };

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <div
      ref={trackRef}
      className="nexus-track-container"
      style={{ height: trackHeightStyle }}
    >
      {/* Sticky Stage: Locks in viewport while cards stack */}
      <div
        className="nexus-sticky-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="nexus-deck-wrapper">
          {/* Deck Container with bounded, responsive height */}
          <div className="nexus-card-deck">
            {projects.map((project, index) => {
              const theme = cardThemes[index % cardThemes.length];
              const isInitiallyVisible = index === 0;

              return (
                <article
                  key={project.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="nexus-stack-card"
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.textColor,
                    zIndex: 10 + index,
                    transform: isInitiallyVisible ? 'translate3d(0, 0px, 0) scale(1)' : 'translate3d(0, 115%, 0) scale(1)',
                    opacity: isInitiallyVisible ? 1 : 0,
                    visibility: isInitiallyVisible ? 'visible' : 'hidden',
                  }}
                >
                  {/* Zero-filter GPU dimming overlay replacing heavy brightness() filter */}
                  <div
                    ref={(el) => (dimOverlayRefs.current[index] = el)}
                    className="nexus-card-dim-overlay"
                    aria-hidden="true"
                  />

                  <div className="nexus-card-inner">
                    {/* Left Column: Clean Project Details per Yellow.ai Reference */}
                    <div className="nexus-card-left">
                      {/* Single Clean Tag Pill */}
                      <div className="nexus-pill-row">
                        <span
                          className="nexus-tag-pill"
                          style={{
                            backgroundColor: theme.pillBg,
                            color: theme.pillColor,
                          }}
                        >
                          {project.tagPill}
                        </span>
                      </div>

                      {/* Project Heading */}
                      <h2
                        className="nexus-card-title"
                        style={{ color: theme.textColor }}
                      >
                        {project.title}
                      </h2>

                      {/* What is What: Clean Bullet Points with Round Dots */}
                      {project.features && (
                        <ul className="nexus-card-bullets">
                          {project.features.map((feat, fIdx) => (
                            <li key={fIdx} style={{ color: theme.textColor }}>
                              <span
                                className="nexus-bullet-dot"
                                style={{ color: theme.checkColor }}
                              >
                                •
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech Stack Chips */}
                      {project.techStack && (
                        <div className="nexus-card-chips">
                          {project.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="nexus-tech-chip"
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

                      {/* Action: Live Demo / Authorized Software */}
                      <div className="nexus-card-actions">
                        {project.hasLiveLink && project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn nexus-btn-action"
                            style={{
                              backgroundColor: theme.btnBg,
                              color: theme.btnColor,
                            }}
                          >
                            <span>Live Demo</span>
                            <i className="ri-external-link-line"></i>
                          </a>
                        ) : project.portalDomain ? (
                          <div
                            className="nexus-private-badge"
                            style={{
                              backgroundColor: theme.badgeBg,
                              color: theme.badgeColor,
                            }}
                          >
                            <i className="ri-shield-keyhole-line"></i>
                            <span>Authorized Software</span>
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
                            className="btn nexus-btn-action"
                            style={{
                              backgroundColor: theme.btnBg,
                              color: theme.btnColor,
                            }}
                          >
                            <span>Request Live Demo</span>
                            <i className="ri-arrow-right-up-line"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Clean Photo Preview with 1.5-second Auto-Slideshow */}
                    <div className="nexus-card-right">
                      <div className="nexus-card-device">
                        <ProjectImageSlideshow
                          images={project.images || (project.image ? [project.image] : [])}
                          fallback={project.image || '/assets/images/projects/lithin-transport.jpg'}
                          alt={project.title}
                          className="nexus-slideshow-container"
                          imgClassName="nexus-chrome-img"
                          interval={1500}
                          isActive={index === activeCardIndex}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Sleek Floating Navigation Dock below deck */}
          <div className="nexus-dock-controls">
            <div className="nexus-dock-arrows">
              <button
                type="button"
                className="nexus-arrow-btn"
                onClick={handlePrev}
                disabled={activeCardIndex === 0}
                aria-label="Previous Project"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>
            </div>

            <div className="nexus-dock-pills">
              {projects.map((proj, idx) => {
                const isActive = idx === activeCardIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    className={`nexus-dock-pill ${isActive ? 'active' : ''}`}
                    onClick={() => scrollToCard(idx)}
                    title={proj.title}
                  >
                    <span className="dock-pill-indicator"></span>
                    <span className="dock-pill-title">
                      {proj.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="nexus-dock-arrows">
              <button
                type="button"
                className="nexus-arrow-btn"
                onClick={handleNext}
                aria-label="Next Project"
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>

            {onScrollToGrid && (
              <button
                type="button"
                className="nexus-dock-grid-btn"
                onClick={onScrollToGrid}
              >
                <span>View All Grid</span>
                <i className="ri-arrow-down-line"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
