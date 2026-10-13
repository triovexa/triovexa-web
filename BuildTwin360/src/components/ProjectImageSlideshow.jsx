import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * ProjectImageSlideshow
 * - 1.5s auto-cycle interval (per user request)
 * - Auto-pauses on mouse hover
 * - Manual Prev (<) and Next (>) navigation buttons
 * - Animated zoom/enlarge on hover
 * - Lightbox modal teleported to document.body for true full-screen inspection on click
 * - Ambient blurred backdrop + object-fit: contain so portrait mobile screenshots
 *   and landscape photos (smart glasses, dashboards) are 100% visible without any cropping
 */
const ProjectImageSlideshow = React.memo(function ProjectImageSlideshow({
  images = [],
  fallback = '/assets/images/projects/lithin-transport.jpg',
  alt = 'Project preview',
  className = '',
  imgClassName = '',
  interval = 1500, // 1.5 seconds per user request
  isActive = true, // Performance: Only run timer on the active visible card
}) {
  const imageList = Array.isArray(images) && images.length > 0 ? images : [fallback];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset index when images list changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Auto-advance slideshow every 1.5s, PAUSES when inactive, hovered or in lightbox
  useEffect(() => {
    if (!isActive || imageList.length <= 1 || isHovered || isLightboxOpen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, imageList.length, interval, isHovered, isLightboxOpen]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const handleOpenLightbox = (e) => {
    e.stopPropagation();
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = (e) => {
    if (e) e.stopPropagation();
    setIsLightboxOpen(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, imageList.length]);

  const currentSrc = imageList[currentIndex] || fallback;

  return (
    <>
      <div
        className={`project-slideshow-container ${className} ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenLightbox}
        title="Click to view full size"
      >
        {/* Ambient colored blur backdrop matching active image */}
        <div
          className="slideshow-ambient-backdrop"
          style={{ backgroundImage: `url(${currentSrc})` }}
          aria-hidden="true"
        />

        {/* Sharp Image Slide Layers - object-fit: contain prevents cropping */}
        {imageList.map((src, idx) => {
          const isActive = idx === currentIndex;
          return (
            <img
              key={idx}
              src={src}
              alt={`${alt} - view ${idx + 1}`}
              className={`${imgClassName} slideshow-slide-img ${isActive ? 'active' : ''}`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
            />
          );
        })}

        {/* Manual Left and Right Arrow Buttons */}
        {imageList.length > 1 && (
          <div className="slideshow-nav-arrows">
            <button
              type="button"
              className="slideshow-arrow-btn prev"
              onClick={handlePrev}
              aria-label="Previous Image"
              title="Previous image"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button
              type="button"
              className="slideshow-arrow-btn next"
              onClick={handleNext}
              aria-label="Next Image"
              title="Next image"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        )}

        {/* Subtle Hover Zoom Badge */}
        <div className="slideshow-zoom-badge" aria-hidden="true">
          <i className="ri-zoom-in-line"></i>
          <span>Enlarge</span>
        </div>

        {/* Slide Counter / Dots */}
        {imageList.length > 1 && (
          <div className="slideshow-dots" aria-hidden="true">
            {imageList.map((_, idx) => (
              <span
                key={idx}
                className={`slideshow-dot ${idx === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Enlarged Lightbox Modal teleported to document.body */}
      {isLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="slideshow-lightbox-overlay"
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="slideshow-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="slideshow-lightbox-close"
              onClick={handleCloseLightbox}
              aria-label="Close Preview"
            >
              <i className="ri-close-line"></i>
            </button>

            <div className="slideshow-lightbox-media">
              <img
                src={currentSrc}
                alt={alt}
                className="slideshow-lightbox-img"
              />
            </div>

            {imageList.length > 1 && (
              <>
                <button
                  type="button"
                  className="slideshow-lightbox-arrow prev"
                  onClick={handlePrev}
                  aria-label="Previous Image"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </button>
                <button
                  type="button"
                  className="slideshow-lightbox-arrow next"
                  onClick={handleNext}
                  aria-label="Next Image"
                >
                  <i className="ri-arrow-right-s-line"></i>
                </button>

                <div className="slideshow-lightbox-counter">
                  {currentIndex + 1} / {imageList.length}
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
});

export default ProjectImageSlideshow;
