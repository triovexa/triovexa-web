import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  /* --------------------------------------------------------------------------
     1. Header Scroll State
     -------------------------------------------------------------------------- */
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* --------------------------------------------------------------------------
     2. Background Particles Canvas (Electric Cyan Ambient Nodes)
     -------------------------------------------------------------------------- */
  const canvasRef = useRef(null);

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
    const particleCount = Math.min(Math.floor(width / 15), 65);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2.2 + 1;
        this.alpha = Math.random() * 0.6 + 0.2;
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

          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.18 * (1 - dist / 125)})`;
            ctx.lineWidth = 0.7;
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

  /* --------------------------------------------------------------------------
     3. Typewriter Effect
     -------------------------------------------------------------------------- */
  const phrases = [
    'Textiles & Garments Projects',
    'Transport & Logistics Apps',
    'Dyeing Factory Automation',
    'Travels & Reservation Apps',
    'Shop E-Commerce & POS Solutions',
    'Custom Software & ERP Builds',
  ];

  const [typewriterText, setTypewriterText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timer = setTimeout(() => {
      if (isDeleting) {
        setTypewriterText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setTypewriterText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? 35 : 75);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  /* --------------------------------------------------------------------------
     4. Interactive Project Estimator State
     -------------------------------------------------------------------------- */
  const estimatorOptions = [
    { id: 'shop', name: 'Shop Website & App', sub: 'Billing & E-Commerce', icon: 'ri-store-2-line', price: 1800, weeks: 3 },
    { id: 'textile', name: 'Textiles & Garments ERP', sub: 'Production & Stock', icon: 'ri-shirt-line', price: 2800, weeks: 4 },
    { id: 'transport', name: 'Transport & Travels', sub: 'GPS & Reservations', icon: 'ri-truck-line', price: 2500, weeks: 3 },
    { id: 'custom', name: 'Custom Enterprise', sub: 'Tailor-Made Software', icon: 'ri-settings-5-line', price: 3200, weeks: 4 },
  ];

  const [selectedSoftware, setSelectedSoftware] = useState(estimatorOptions[0]);
  const [featureCheckboxes, setFeatureCheckboxes] = useState({
    mobileApp: true,
    alerts: false,
    posBilling: false,
  });

  const handleCheckboxChange = (name) => {
    setFeatureCheckboxes((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Calculate dynamic totals
  let addedPrice = 0;
  let addedWeeks = 0;

  if (featureCheckboxes.mobileApp) {
    addedPrice += 500;
    addedWeeks += 0.5;
  }
  if (featureCheckboxes.alerts) {
    addedPrice += 400;
    addedWeeks += 0.5;
  }
  if (featureCheckboxes.posBilling) {
    addedPrice += 600;
    addedWeeks += 1;
  }

  const totalPrice = selectedSoftware.price + addedPrice;
  const totalWeeks = Math.round(selectedSoftware.weeks + addedWeeks);

  /* --------------------------------------------------------------------------
     5. Portfolio Filter State
     -------------------------------------------------------------------------- */
  const [portfolioFilter, setPortfolioFilter] = useState('all');

  const portfolioData = [
    {
      id: 1,
      category: 'textile',
      img: '/assets/images/textile-erp.jpg',
      alt: 'Textile & Dyeing ERP',
      tags: ['Textile & Dyeing', 'ERP', 'GST Billing'],
      title: 'TexDye Mill ERP & Recipe Suite',
      desc: 'Complete greige fabric inventory, dyeing vessel batch tracking, and automated GST invoice billing.',
    },
    {
      id: 2,
      category: 'transport',
      img: '/assets/images/transport-app.jpg',
      alt: 'Transport & Travels App',
      tags: ['Transport & Travels', 'GPS App', 'Driver App'],
      title: 'FleetSync Live Transport App',
      desc: 'Real-time fleet tracking, consignment status updates, driver route assignment, and trip expense logs.',
    },
    {
      id: 3,
      category: 'shop',
      img: '/assets/images/happy-client-delivery.jpg',
      alt: 'Shop E-Commerce Web & POS',
      tags: ['Shop & Retail', 'E-Commerce', 'Thermal POS'],
      title: 'RetailPro Shop Web & Barcode POS',
      desc: 'Online shopping website paired with Android thermal printer barcode billing app for fast checkouts.',
    },
  ];

  /* --------------------------------------------------------------------------
     6. Contact Form & Toast State
     -------------------------------------------------------------------------- */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'textile',
    message: '',
  });

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    showToast(
      `Thank you ${formData.name}! Your project request has been submitted. Our team will contact you within 2 hours.`,
      'success'
    );

    setFormData({
      name: '',
      email: '',
      service: 'textile',
      message: '',
    });
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="home-page-container">
      {/* Animated Liquid Aurora Glow Blobs Background */}
      <div className="aurora-container">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {/* Background Particle Canvas */}
      <canvas id="particles-canvas" ref={canvasRef}></canvas>

      {/* Header Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
        <div className="container">
          <nav className="nav-wrapper">
            <a href="#" onClick={(e) => handleSmoothScroll(e, '#hero')} className="logo">
              <div className="logo-icon">
                <i className="ri-code-s-slash-line"></i>
              </div>
              <span>
                <span className="gradient-sky-text">TRIO</span>VEXA
              </span>
            </a>

            <ul className="nav-menu">
              <li>
                <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="nav-link active">
                  Home
                </a>
              </li>
              <li>
                <a href="#delivery" onClick={(e) => handleSmoothScroll(e, '#delivery')} className="nav-link">
                  Client Success
                </a>
              </li>
              <li>
                <a href="#dashboard" onClick={(e) => handleSmoothScroll(e, '#dashboard')} className="nav-link">
                  Executive Dashboard
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="nav-link">
                  Industries & Projects
                </a>
              </li>
              <li>
                <a href="#estimator" onClick={(e) => handleSmoothScroll(e, '#estimator')} className="nav-link">
                  Cost Estimator
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="nav-link">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#ratings" onClick={(e) => handleSmoothScroll(e, '#ratings')} className="nav-link">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="nav-link">
                  Contact
                </a>
              </li>
            </ul>

            <div className="nav-actions">
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="btn btn-sky">
                <span>Get Free Quote</span>
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section (Home) */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-pulse"></span>
              <span>🏆 200+ Successful Projects Delivered • 98% 5-Star Rating</span>
            </div>

            <h1 className="hero-title">
              Custom Software & App Solutions For <br />
              <span id="typewriter-target" className="typewriter-text">
                {typewriterText || 'Textiles & Garments'}
              </span>
            </h1>

            <p className="hero-subtitle">
              We build high-performance Web Applications, Mobile Apps, and Enterprise ERP Systems for Textiles, Transport, Garments, Dyeing, Travels, Shops, and Custom Business Requirements.
            </p>

            <div className="hero-cta-group">
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="btn btn-sky">
                <i className="ri-whatsapp-line"></i>
                <span>Start Your Project Today</span>
              </a>
              <a href="#delivery" onClick={(e) => handleSmoothScroll(e, '#delivery')} className="btn btn-outline-sky">
                <i className="ri-checkbox-circle-fill"></i>
                <span>See Verified Delivery Workflow</span>
              </a>
            </div>

            {/* Track Record Highlights */}
            <div className="stats-grid">
              <div className="glass-card stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">Software Projects Done</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">5-Star Client Rating</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-number">7+</div>
                <div className="stat-label">Specialized Industry Verticals</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Customised Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Happy Client Project Delivery Section */}
      <section id="delivery" className="delivery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <i className="ri-emotion-happy-line"></i> Client Satisfaction Guarantee
            </span>
            <h2>Proven Software Delivery Cycle</h2>
            <p>From initial requirement planning to final deployment and support, we ensure 100% client satisfaction on every software build.</p>
          </div>

          <div className="delivery-section-grid">
            {/* Animated Image Container with Floating Badges */}
            <div className="delivery-image-container">
              {/* Floating Badge 1 (Top Left) */}
              <div className="floating-badge badge-top-left">
                <div className="badge-icon">
                  <i className="ri-checkbox-circle-fill"></i>
                </div>
                <div>
                  <div className="badge-text-title">Delivered Successfully!</div>
                  <div className="badge-text-sub">100% Verified Quality</div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right) */}
              <div className="floating-badge badge-bottom-right">
                <div className="badge-icon">
                  <i className="ri-thumb-up-fill"></i>
                </div>
                <div>
                  <div className="badge-text-title">Happy Client 👍</div>
                  <div className="badge-text-sub">98% 5-Star Satisfaction</div>
                </div>
              </div>

              <div className="delivery-img-wrapper">
                <img
                  src="/assets/images/happy-client-delivery.jpg"
                  alt="TRIOVEXA Software Development Project Delivered Successfully to Happy Client"
                />
              </div>
            </div>

            {/* Software Development Cycle Checklist */}
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                Our Guaranteed 5-Step Project Lifecycle
              </h3>
              <p style={{ color: 'var(--text-sky-light)', marginBottom: '1.5rem' }}>
                We maintain full transparency with clients throughout the entire development process:
              </p>

              <div className="checklist-card">
                <div className="checklist-item">
                  <div className="check-icon">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>1. Planning & Architecture Requirements</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      In-depth requirement analysis and DB architecture design.
                    </div>
                  </div>
                </div>

                <div className="checklist-item">
                  <div className="check-icon">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>2. High-Speed Software & App Development</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Agile sprint development using React, Next.js, Android & Node.js.
                    </div>
                  </div>
                </div>

                <div className="checklist-item">
                  <div className="check-icon">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>3. Rigorous QA & Security Testing</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Zero-bug unit testing, load stress test, and security audit.
                    </div>
                  </div>
                </div>

                <div className="checklist-item">
                  <div className="check-icon">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>4. Seamless Cloud Deployment</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Deploying live production builds with SSL encryption and domain setup.
                    </div>
                  </div>
                </div>

                <div className="checklist-item">
                  <div className="check-icon">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>5. Post-Launch Technical Support</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Continuous SLA maintenance, backup, and immediate support.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Professional Executive Software Dashboard Section */}
      <section id="dashboard" className="dashboard-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <i className="ri-shield-flash-line"></i> Live Performance Telemetry
            </span>
            <h2>Executive Software & Success Dashboard</h2>
            <p>
              Real-time performance analytics, project completion velocity, and verified client satisfaction metrics across 200+ enterprise deployments.
            </p>
          </div>

          <div className="pro-dashboard-container">
            {/* Top Status Bar */}
            <div className="dashboard-top-status">
              <div className="status-indicator-pill">
                <span className="status-dot"></span>
                <span>SYSTEM STATUS: ALL 200+ SOFTWARE DEPLOYMENTS VERIFIED OPERATIONAL</span>
              </div>
              <div className="dashboard-sync-tag">
                <i className="ri-refresh-line" style={{ color: 'var(--text-sky-bright)' }}></i> SLA Compliance Rate:{' '}
                <strong style={{ color: '#ffffff' }}>100% Optimal</strong>
              </div>
            </div>

            {/* Executive KPI Grid Cards */}
            <div className="dashboard-grid">
              <div className="kpi-card-pro">
                <div className="kpi-top-row">
                  <div className="kpi-icon-wrapper">
                    <i className="ri-pie-chart-2-line"></i>
                  </div>
                  <div className="kpi-trend-tag">+2.4% vs Avg</div>
                </div>
                <div className="kpi-val-large">98.4%</div>
                <div className="kpi-title-pro">Overall Success Rate</div>
                <div className="kpi-sub-pro">Across 200+ completed builds</div>
              </div>

              <div className="kpi-card-pro">
                <div className="kpi-top-row">
                  <div className="kpi-icon-wrapper">
                    <i className="ri-checkbox-circle-line"></i>
                  </div>
                  <div className="kpi-trend-tag" style={{ background: 'rgba(0,242,254,0.1)', color: 'var(--text-sky-bright)' }}>
                    100% Verified
                  </div>
                </div>
                <div className="kpi-val-large">200+</div>
                <div className="kpi-title-pro">Projects Delivered</div>
                <div className="kpi-sub-pro">Apps & Software Systems</div>
              </div>

              <div className="kpi-card-pro">
                <div className="kpi-top-row">
                  <div className="kpi-icon-wrapper">
                    <i className="ri-time-line"></i>
                  </div>
                  <div className="kpi-trend-tag">0.8% Ahead</div>
                </div>
                <div className="kpi-val-large">99.2%</div>
                <div className="kpi-title-pro">On-Time Velocity</div>
                <div className="kpi-sub-pro">Zero delivery delays</div>
              </div>

              <div className="kpi-card-pro">
                <div className="kpi-top-row">
                  <div className="kpi-icon-wrapper">
                    <i className="ri-star-fill" style={{ color: 'var(--accent-amber)' }}></i>
                  </div>
                  <div className="kpi-trend-tag" style={{ background: 'rgba(251,191,36,0.15)', color: 'var(--accent-amber)' }}>
                    4.95 / 5.0
                  </div>
                </div>
                <div className="kpi-val-large">98.0%</div>
                <div className="kpi-title-pro">Client Satisfaction</div>
                <div className="kpi-sub-pro">Verified 5-Star reviews</div>
              </div>
            </div>

            {/* Analytics Breakdown Grid */}
            <div className="dashboard-analytics-wrapper">
              <div className="progress-card-inner">
                <h3
                  style={{
                    fontSize: '1.35rem',
                    marginBottom: '1.25rem',
                    color: 'var(--text-sky-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <i className="ri-bar-chart-grouped-line"></i> Industry Success Rate Breakdown
                </h3>

                <div className="progress-list">
                  <div>
                    <div className="progress-item-header">
                      <span>
                        Textiles & Garments ERPs <span className="progress-item-badge">65+ Done</span>
                      </span>
                      <span style={{ color: 'var(--accent-emerald)' }}>99.1% Success</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '99.1%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="progress-item-header">
                      <span>
                        Transport & Fleet Apps <span className="progress-item-badge">45+ Done</span>
                      </span>
                      <span style={{ color: 'var(--accent-emerald)' }}>98.5% Success</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '98.5%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="progress-item-header">
                      <span>
                        Shop E-Commerce & POS <span className="progress-item-badge">40+ Done</span>
                      </span>
                      <span style={{ color: 'var(--accent-emerald)' }}>99.4% Success</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '99.4%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="progress-item-header">
                      <span>
                        Dyeing Mill Automation <span className="progress-item-badge">35+ Done</span>
                      </span>
                      <span style={{ color: 'var(--accent-emerald)' }}>97.8% Success</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '97.8%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="progress-item-header">
                      <span>
                        Travels Booking & Apps <span className="progress-item-badge">25+ Done</span>
                      </span>
                      <span style={{ color: 'var(--accent-emerald)' }}>98.0% Success</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '98.0%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="progress-item-header">
                      <span>
                        Custom Enterprise Software <span className="progress-item-badge">20+ Done</span>
                      </span>
                      <span style={{ color: 'var(--accent-emerald)' }}>100% Success</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Window Frame Graphic */}
              <div className="dashboard-graphic-frame">
                <div className="dashboard-window-bar">
                  <div className="window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#bae6fd', fontWeight: 600 }}>
                    <i className="ri-line-chart-line" style={{ color: 'var(--text-sky-bright)' }}></i>{' '}
                    TRIOVEXA-SYNERGY-ANALYTICS-V4.5
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>🟢 LIVE</div>
                </div>
                <img
                  src="/assets/images/pro-dashboard.jpg"
                  alt="TRIOVEXA Professional Executive SaaS Analytics Dashboard Interface"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Industries & Solutions Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <i className="ri-building-4-line"></i> Specialized Solutions
            </span>
            <h2>Industries We Empower</h2>
            <p>From manufacturing plants to retail shops, we design and deploy tailored software and mobile applications.</p>
          </div>

          <div className="industry-grid">
            {/* 1. Textiles Projects */}
            <div className="glass-card industry-card">
              <div className="industry-icon">
                <i className="ri-shirt-line"></i>
              </div>
              <h3>Textiles Projects</h3>
              <p>Yarn inventory tracking, loom production monitoring, fabric billing, and mill ERP software.</p>
              <ul className="industry-list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Raw Material & Greige Stock Tracker
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Loom Production & Operator Logs
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Dispatch & GST Automated Invoicing
                </li>
              </ul>
            </div>

            {/* 2. Transport Projects */}
            <div className="glass-card industry-card">
              <div className="industry-icon">
                <i className="ri-truck-line"></i>
              </div>
              <h3>Transport & Logistics</h3>
              <p>Live GPS vehicle tracking apps, driver assignment, trip billing, and fleet management portals.</p>
              <ul className="industry-list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Real-Time Driver & Vehicle App
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Fuel Expense & Maintenance Logs
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Automated Consignment Tracking
                </li>
              </ul>
            </div>

            {/* 3. Garments Projects */}
            <div className="glass-card industry-card">
              <div className="industry-icon">
                <i className="ri-scissors-2-line"></i>
              </div>
              <h3>Garments Software</h3>
              <p>Style order sheets, cutting unit trackers, stitching line capacity, and export packing systems.</p>
              <ul className="industry-list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Order Sampling & Costing Sheets
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Cutting & Sewing Line Efficiency
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Export Packing List Generator
                </li>
              </ul>
            </div>

            {/* 4. Dyeing Unit Projects */}
            <div className="glass-card industry-card">
              <div className="industry-icon">
                <i className="ri-drop-line"></i>
              </div>
              <h3>Dyeing Unit Software</h3>
              <p>Chemical lab recipe management, batch dyeing status, shade matching, and liquor ratio logs.</p>
              <ul className="industry-list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Lab Recipe & Shade Combination
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Dye Vessel Batch Automation
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Chemical Stock & Reorder Alerts
                </li>
              </ul>
            </div>

            {/* 5. Travels Projects */}
            <div className="glass-card industry-card">
              <div className="industry-icon">
                <i className="ri-bus-2-line"></i>
              </div>
              <h3>Travels & Reservations</h3>
              <p>Vehicle booking portals, seat reservation apps, tour package booking engines, and driver apps.</p>
              <ul className="industry-list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Online Passenger Booking App
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Tour Package & Hotel Booking
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Instant SMS & WhatsApp Confirmation
                </li>
              </ul>
            </div>

            {/* 6. Shop E-Commerce & POS */}
            <div className="glass-card industry-card">
              <div className="industry-icon">
                <i className="ri-store-2-line"></i>
              </div>
              <h3>Shop Websites & Billing Apps</h3>
              <p>Retail store e-commerce websites, POS barcode billing apps, inventory management & customer rewards.</p>
              <ul className="industry-list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Custom E-Commerce Web & Android App
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Thermal Printer Barcode Billing POS
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i> Daily Sales & Profit Dashboards
                </li>
              </ul>
            </div>

            {/* 7. Customized Tailor-Made Software */}
            <div
              className="glass-card industry-card"
              style={{
                gridColumn: '1 / -1',
                background: 'rgba(0, 242, 254, 0.08)',
                borderColor: 'var(--border-glow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div
                  className="industry-icon"
                  style={{
                    background: 'var(--gradient-electric-sky)',
                    color: '#070d19',
                    marginBottom: 0,
                  }}
                >
                  <i className="ri-magic-line"></i>
                </div>
                <div style={{ flex: 1 }}>
                  <h3>Fully Customized Software & Mobile Apps</h3>
                  <p style={{ marginBottom: '0.5rem', color: 'var(--text-sky-light)' }}>
                    Have a unique business workflow? We design and build 100% tailor-made software solutions matching your exact business process.
                  </p>
                </div>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="btn btn-sky">
                  Request Custom Build
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Cost Estimator */}
      <section id="estimator" className="estimator-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <i className="ri-calculator-line"></i> Project Estimator
            </span>
            <h2>Estimate Your Project Budget & Timeline</h2>
            <p>Choose your software type and options to get an instant cost calculation.</p>
          </div>

          <div className="glass-card estimator-box">
            <div className="estimator-step-title">1. Select Your Software Type:</div>
            <div className="estimator-options-grid">
              {estimatorOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedSoftware(opt)}
                  className={`estimator-opt-card ${selectedSoftware.id === opt.id ? 'selected' : ''}`}
                >
                  <i className={opt.icon}></i>
                  <div style={{ fontWeight: 700 }}>{opt.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-sky-light)' }}>{opt.sub}</div>
                </div>
              ))}
            </div>

            <div className="estimator-step-title">2. Select Add-on Features:</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  background: 'var(--bg-glass)',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                }}
              >
                <input
                  type="checkbox"
                  className="estimator-feature-cb"
                  checked={featureCheckboxes.mobileApp}
                  onChange={() => handleCheckboxChange('mobileApp')}
                />
                <span>Android / iOS Mobile App</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  background: 'var(--bg-glass)',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                }}
              >
                <input
                  type="checkbox"
                  className="estimator-feature-cb"
                  checked={featureCheckboxes.alerts}
                  onChange={() => handleCheckboxChange('alerts')}
                />
                <span>WhatsApp & SMS Alerts</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  background: 'var(--bg-glass)',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                }}
              >
                <input
                  type="checkbox"
                  className="estimator-feature-cb"
                  checked={featureCheckboxes.posBilling}
                  onChange={() => handleCheckboxChange('posBilling')}
                />
                <span>GST & Thermal Printer Billing</span>
              </label>
            </div>

            <div className="estimator-result-card">
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-sky-bright)', fontWeight: 700 }}>
                  ESTIMATED INVESTMENT & DURATION
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Estimated Price:</span>
                    <div className="result-val" id="estimator-price">
                      ${totalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Delivery Time:</span>
                    <div className="result-val" id="estimator-timeline" style={{ color: 'var(--text-sky-bright)' }}>
                      {totalWeeks} Weeks
                    </div>
                  </div>
                </div>
              </div>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="btn btn-sky">
                <span>Book Free Demo</span>
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <i className="ri-gallery-line"></i> Verified Case Studies
            </span>
            <h2>Recent Completed Projects</h2>
            <p>Take a look at some of our 200+ successful deployments across different sectors.</p>
          </div>

          <div className="portfolio-filters">
            <button
              className={`filter-btn ${portfolioFilter === 'all' ? 'active' : ''}`}
              onClick={() => setPortfolioFilter('all')}
            >
              All Deliveries (200+)
            </button>
            <button
              className={`filter-btn ${portfolioFilter === 'textile' ? 'active' : ''}`}
              onClick={() => setPortfolioFilter('textile')}
            >
              Textile & Garments
            </button>
            <button
              className={`filter-btn ${portfolioFilter === 'transport' ? 'active' : ''}`}
              onClick={() => setPortfolioFilter('transport')}
            >
              Transport & Travels
            </button>
            <button
              className={`filter-btn ${portfolioFilter === 'shop' ? 'active' : ''}`}
              onClick={() => setPortfolioFilter('shop')}
            >
              Shop & E-Commerce
            </button>
          </div>

          <div className="portfolio-grid">
            {portfolioData.map((item) => {
              const isVisible = portfolioFilter === 'all' || item.category === portfolioFilter;
              if (!isVisible) return null;

              return (
                <div key={item.id} className="glass-card portfolio-card" data-category={item.category}>
                  <div className="portfolio-img-wrapper">
                    <img src={item.img} alt={item.alt} />
                  </div>
                  <div className="portfolio-info">
                    <div className="portfolio-tags">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="portfolio-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3>{item.title}</h3>
                    <p style={{ color: 'var(--text-sky-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Ratings & Testimonials */}
      <section id="ratings" className="ratings-section">
        <div className="container">
          <div className="ratings-banner">
            <div className="stars-wrapper">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>98% Client Satisfaction Rate</h2>
            <p
              style={{
                color: 'var(--text-sky-light)',
                fontSize: '1.1rem',
                maxWidth: '650px',
                margin: '0.5rem auto 0 auto',
              }}
            >
              Over 200+ clients trust TRIOVEXA for uninterrupted technical support, high software performance, and custom business automation.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="glass-card testimonial-card">
              <p style={{ fontStyle: 'italic', color: 'var(--text-sky-light)' }}>
                "TRIOVEXA delivered our Dyeing Unit & Garments production software on time. The batch tracking and chemical stock alerts saved us huge costs!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">TM</div>
                <div>
                  <div style={{ fontWeight: 700 }}>Textile Mill Manager</div>
                  <small style={{ color: 'var(--text-dim)' }}>Tirupur Textile Hub</small>
                </div>
              </div>
            </div>

            <div className="glass-card testimonial-card">
              <p style={{ fontStyle: 'italic', color: 'var(--text-sky-light)' }}>
                "Our Travels booking app & driver fleet tracker built by TRIOVEXA has simplified daily trip management. Exceptional 5-star team support!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">TL</div>
                <div>
                  <div style={{ fontWeight: 700 }}>Transport & Logistics Owner</div>
                  <small style={{ color: 'var(--text-dim)' }}>Fleet Services</small>
                </div>
              </div>
            </div>

            <div className="glass-card testimonial-card">
              <p style={{ fontStyle: 'italic', color: 'var(--text-sky-light)' }}>
                "Superb shop billing website and mobile app! Barcode scanning is ultra-fast, and our customers love ordering online."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RS</div>
                <div>
                  <div style={{ fontWeight: 700 }}>Retail Store Proprietor</div>
                  <small style={{ color: 'var(--text-dim)' }}>Retail Superstore</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <i className="ri-customer-service-fill"></i> Get Started
            </span>
            <h2>Let's Discuss Your Software & App Project</h2>
            <p>Send us your requirements to receive a detailed cost proposal and live demo.</p>
          </div>

          <div className="contact-grid">
            <div>
              <h3>Contact TRIOVEXA</h3>
              <p style={{ color: 'var(--text-sky-light)', marginTop: '0.5rem' }}>
                Ready to digitize your business? Fill in the form or call us directly. Our team responds within 2 hours.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon">
                    <i className="ri-phone-fill"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Direct Phone / WhatsApp</div>
                    <div style={{ color: 'var(--text-sky-light)' }}>+91 98765 43210</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">
                    <i className="ri-mail-fill"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Official Email</div>
                    <div style={{ color: 'var(--text-sky-light)' }}>contact@triovexa.com</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">
                    <i className="ri-map-pin-fill"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Headquarters</div>
                    <div style={{ color: 'var(--text-sky-light)' }}>Software Development Center & Global Client Desk</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <form id="triovexa-contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="form-name">Your Name / Company Name *</label>
                  <input
                    type="text"
                    id="form-name"
                    className="form-control"
                    placeholder="e.g. Ramesh Textiles / Kumar Travels"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-email">Mobile Number / Email *</label>
                  <input
                    type="text"
                    id="form-email"
                    className="form-control"
                    placeholder="Mobile Number or Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-service">Select Project Category</label>
                  <select
                    id="form-service"
                    className="form-control"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="textile">Textiles / Garments / Dyeing Software</option>
                    <option value="transport">Transport / Travels / Fleet App</option>
                    <option value="shop">Shop Website & Billing App</option>
                    <option value="custom">Fully Customized Software / App</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form-message">Project Requirements Details</label>
                  <textarea
                    id="form-message"
                    className="form-control"
                    rows={4}
                    placeholder="Mention your requirements, features needed, or budget..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-sky" style={{ width: '100%' }}>
                  <i className="ri-send-plane-fill"></i> Send Project Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#" onClick={(e) => handleSmoothScroll(e, '#hero')} className="logo" style={{ marginBottom: '1rem' }}>
                <div className="logo-icon">
                  <i className="ri-code-s-slash-line"></i>
                </div>
                <span>
                  <span className="gradient-sky-text">TRIO</span>VEXA
                </span>
              </a>
              <p style={{ color: 'var(--text-sky-light)', fontSize: '0.92rem', maxWidth: '320px' }}>
                TRIOVEXA - Modern Software & App Development Studio. Empowering business with custom ERP, Mobile Apps & Web Solutions.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem' }}>Industries</h4>
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
                <li>
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                    Textiles Software
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                    Transport & Fleet Apps
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                    Garments & Dyeing ERP
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                    Travels Booking App
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                    Shop Websites & POS
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
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
                <li>
                  <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#delivery" onClick={(e) => handleSmoothScroll(e, '#delivery')}>
                    Client Success
                  </a>
                </li>
                <li>
                  <a href="#dashboard" onClick={(e) => handleSmoothScroll(e, '#dashboard')}>
                    Executive Dashboard
                  </a>
                </li>
                <li>
                  <a href="#estimator" onClick={(e) => handleSmoothScroll(e, '#estimator')}>
                    Cost Estimator
                  </a>
                </li>
                <li>
                  <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')}>
                    200+ Projects
                  </a>
                </li>
                <li>
                  <a href="#ratings" onClick={(e) => handleSmoothScroll(e, '#ratings')}>
                    Client Reviews (98%)
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem' }}>Connect With Us</h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
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
            </div>
          </div>

          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} TRIOVEXA Software & App Solutions. All Rights Reserved.</div>
            <div>200+ Projects Completed • 98.4% Success Rating</div>
          </div>
        </div>
      </footer>

      {/* Toast Notification Container */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              <i
                className={
                  toast.type === 'error'
                    ? 'ri-error-warning-fill'
                    : toast.type === 'info'
                    ? 'ri-information-fill'
                    : 'ri-checkbox-circle-fill'
                }
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
