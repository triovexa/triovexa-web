import React, { useState, useEffect, useRef } from 'react';
import '../styles/services.css';
import ServicesNavbar from '../components/ServicesNavbar';
import ServicesHero from '../components/ServicesHero';
import ServicesGrid from '../components/ServicesGrid';
import IndustriesSection from '../components/IndustriesSection';
import ServicesFAQ from '../components/ServicesFAQ';
import CTASection from '../components/CTASection';
import ServicesFooter from '../components/ServicesFooter';
import InquiryModal from '../components/InquiryModal';

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toasts, setToasts] = useState([]);

  const canvasRef = useRef(null);

  // Background Particle Canvas (Electric Cyan Ambient Nodes - identical to Home page)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 55);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleOpenInquiry = (item = null) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="services-page-container">
      {/* Liquid Aurora Glow Blobs (identical to Home page) */}
      <div className="aurora-container">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {/* Background Particles Canvas */}
      <canvas id="particles-canvas" ref={canvasRef}></canvas>

      {/* Header Navigation */}
      <ServicesNavbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content */}
      <main>
        {/* Section 1: Hero */}
        <ServicesHero onOpenInquiry={handleOpenInquiry} />

        {/* Section 2: What We Do (12 Services) */}
        <ServicesGrid onExploreService={handleOpenInquiry} />

        {/* Section 3: Industries We Serve (12 Industries) */}
        <IndustriesSection onSelectIndustry={handleOpenInquiry} />

        {/* Section 4: Frequently Asked Questions (FAQ) */}
        <ServicesFAQ />

        {/* Section 5: Final CTA */}
        <CTASection onOpenInquiry={handleOpenInquiry} />
      </main>

      {/* Footer */}
      <ServicesFooter />

      {/* Inquiry / Lead Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedItem={selectedItem}
        onSubmitSuccess={showToast}
      />

      {/* Toast Notification Container */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              <i
                className="ri-checkbox-circle-fill"
                style={{ fontSize: '1.3rem', color: 'var(--text-sky-bright)' }}
              ></i>
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
