import React, { useState, useRef } from 'react';

export default function CTASection({ onOpenInquiry, showProjectsButton = true }) {
  const boxRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setMousePos({ x: px, y: py });

    // Subtle 3D tilt (max ±4deg for smooth elegance)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    const rotateX = -((y - centerY) / centerY) * 4.5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <section className="services-cta-section" id="contact">
      <div className="container">
        <div
          ref={boxRef}
          className={`services-cta-box ${isHovered ? 'hovered' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`,
          }}
        >
          {/* Interactive Mouse-Tracking Spotlight */}
          <div
            className="cta-spotlight"
            style={{
              background: `radial-gradient(circle 420px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 242, 254, 0.22) 0%, rgba(0, 132, 199, 0.08) 50%, transparent 75%)`,
            }}
          ></div>

          {/* Ambient Corner Beam / Glow */}
          <div className="cta-ambient-beam"></div>

          {/* Content Layer */}
          <div className="cta-content-inner">
            <h2>
              Have an Idea? <span className="gradient-sky-text">Let's Build It.</span>
            </h2>

            <p>
              Tell us what your business needs. We'll turn your idea into a practical digital solution.
            </p>

            <div className="services-cta-actions">
              <button
                type="button"
                onClick={() => onOpenInquiry({ name: 'General Consultation', type: 'cta' })}
                className="btn btn-sky cta-pulse-btn"
              >
                <span>Let's Talk</span>
                <i className="ri-chat-smile-2-line"></i>
              </button>

              {showProjectsButton && (
                <a href="/projects?tab=client" className="btn btn-outline-sky">
                  <span>View Our Projects</span>
                  <i className="ri-folder-shared-line"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
