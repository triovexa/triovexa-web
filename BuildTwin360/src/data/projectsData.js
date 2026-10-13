/**
 * TrioVexa Projects & Products Directory
 * 
 * Clean, punchy project models without wordy fluff or count numbers.
 * Fully supports multi-image slideshows, live client URLs, and dedicated student R&D projects.
 */

export const PROJECT_CATEGORIES = [
  {
    id: 'client',
    label: 'Our Client Projects',
    icon: 'ri-truck-line',
    headline: 'Client Deployments & Live Web Systems',
    subheading: 'High-performance commercial logistics platforms, agro-tech commerce systems, and automated enterprise billing solutions built for clients.'
  },
  {
    id: 'products',
    label: 'Our Products',
    icon: 'ri-apps-2-line',
    headline: 'Proprietary In-House Platforms',
    subheading: 'Enterprise ERP systems, biometric HRM suites, AI sprint workflow engines, and 3D digital twin spatial telemetry.'
  },
  {
    id: 'academic',
    label: 'Academic Projects',
    icon: 'ri-graduation-cap-line',
    headline: 'Applied R&D & Embedded Systems',
    subheading: 'Intelligent mobility assistance for visually impaired, maternal health tracking, smart IoT health wearables, and applied embedded R&D.'
  }
];

export const CLIENT_PROJECTS = [
  {
    id: 'lithin-transport',
    title: 'Lithin Transport Logistics Platform',
    category: 'Commercial Logistics & Fleet Web',
    clientName: 'Lithin Transport Ltd.',
    tagPill: 'Primary Client Project',
    tagIcon: 'ri-truck-fill',
    badgeText: 'Live Web Platform',
    badgeVariant: 'live',
    themeColor: '#10b981', // Emerald
    cardBg: '#0e1f18',
    summary: 'Enterprise web platform for heavy-haul road logistics. Automates interstate freight booking, real-time GPS fleet tracking, payload allocation, and shipment tracking.',
    features: [
      'Automated Interstate Freight Consignment Booking',
      'Real-Time GPS Vehicle Fleet Tracking',
      'Instant Consignor / Consignee Consignment Portal'
    ],
    techStack: ['React.js', 'Node.js', 'Express', 'Tailored UI', 'GPS Telemetry', 'PostgreSQL'],
    image: '/assets/images/projects/lithin-transport.jpg',
    images: [
      '/assets/images/projects/lithin-transport.jpg',
      '/assets/images/projects/lithin-transport-2.jpg',
      '/assets/images/projects/lithin-transport-3.jpg',
      '/assets/images/projects/lithin-transport-4.jpg',
      '/assets/images/projects/lithin-transport-5.jpg'
    ],
    hasLiveLink: true,
    liveUrl: 'https://lithintransport.in',
    actionText: 'Live Demo'
  },
  {
    id: 'lithin-billing',
    title: 'Lithin Transport Enterprise Billing & Fuel Audit',
    category: 'Logistics ERP & Financial Automation',
    clientName: 'Lithin Transport Accounts Division',
    tagPill: 'Internal Financial ERP',
    tagIcon: 'ri-money-dollar-circle-line',
    badgeText: '🔒 Protected Enterprise Portal',
    badgeVariant: 'protected',
    themeColor: '#f59e0b', // Amber
    cardBg: '#1f1a0e',
    summary: 'Dedicated accounting ERP for Lithin Transport backend teams. Manages trip fuel reconciliation, driver advance vouchers, toll audit, and GST B2B tax invoices.',
    features: [
      'Trip-Wise Diesel Reconciliation & Variance Audit',
      'Driver Cash Advance & Trip Voucher Settlement',
      'Automated GST-Compliant B2B Tax Invoicing'
    ],
    techStack: ['React.js', 'Express.js', 'PostgreSQL', 'PDF Engine', 'Enterprise Auth'],
    image: '/assets/images/projects/lithin-billing.jpg',
    images: [
      '/assets/images/projects/lithin-billing.jpg',
      '/assets/images/projects/lithin-billing-1.jpg',
      '/assets/images/projects/lithin-billing-2.jpg',
      '/assets/images/projects/lithin-billing-3.jpg',
      '/assets/images/projects/lithin-billing-4.jpg',
      '/assets/images/projects/lithin-billing-5.jpg'
    ],
    hasLiveLink: false, // Rule: No external link button
    portalDomain: 'billing.lithintransport.in',
    actionText: 'Authorized Software'
  },
  {
    id: 'sree-vaarahi-billing',
    title: 'Sree Vaarahi Amman Road Freight Billing Engine',
    category: 'Road Freight Accounting Engine',
    clientName: 'Sree Vaarahi Amman Transports',
    tagPill: 'Commercial Transport Billing',
    tagIcon: 'ri-file-list-3-line',
    badgeText: '🔒 Internal Freight Accounts',
    badgeVariant: 'protected',
    themeColor: '#06b6d4', // Cyan
    cardBg: '#0e1d24',
    summary: 'Road logistics billing software engineered for rapid consignment billing, tonnage rate calculation, trip memos, and outstanding receivables ledger tracking.',
    features: [
      'Dynamic Tonnage & Distance Rate Calculator',
      'Consignor vs Consignee Ledger Reconciliation',
      'Fast Thermal Bill Print & Payment Sync'
    ],
    techStack: ['React', 'Vite', 'Cloud Database', 'Thermal Print API', 'Secure Storage'],
    image: '/assets/images/projects/sree-vaarahi-billing.jpg',
    images: [
      '/assets/images/projects/sree-vaarahi-billing.jpg',
      '/assets/images/projects/sree-vaarahi-billing-1.jpg',
      '/assets/images/projects/sree-vaarahi-billing-2.jpg',
      '/assets/images/projects/sree-vaarahi-billing-3.jpg',
      '/assets/images/projects/sree-vaarahi-billing-4.jpg'
    ],
    hasLiveLink: false, // Rule: No external link button
    portalDomain: 'sreevaarahiammantransportsbilling.netlify.app',
    actionText: 'Authorized Software'
  },
  {
    id: 'saraswathy-traders',
    title: 'Saraswathy Traders (SARAL-X Agro-Tech Platform)',
    category: 'Agro-Biotech & Direct-to-Farmer Commerce',
    clientName: 'Saraswathy Traders',
    tagPill: 'Client Agro-Tech E-Commerce',
    tagIcon: 'ri-plant-line',
    badgeText: 'Live Web Platform',
    badgeVariant: 'live',
    themeColor: '#22c55e', // Vibrant Green
    cardBg: '#0f2316',
    summary: 'Direct-to-farmer bio-fertilizer and organic nutrient platform built for Saraswathy Traders under the SARAL-X brand. Features catalog showcase, crop dosage guides, and direct dealer inquiry channels.',
    features: [
      'Bio-Stimulant & Organic Fertilizer Product Catalog',
      'Crop-Specific Dosage & Soil Treatment Calculator',
      'Direct WhatsApp Order & Regional Dealer Inquiries'
    ],
    techStack: ['React.js', 'Vite', 'Modern CSS', 'Agro Catalog', 'WhatsApp Direct API', 'Cloud CDN'],
    image: '/assets/images/projects/saraswathy-traders.jpg',
    images: [
      '/assets/images/projects/saraswathy-traders.jpg',
      '/assets/images/projects/saraswathy-traders-2.jpg',
      '/assets/images/projects/saraswathy-traders-3.jpg',
      '/assets/images/projects/saraswathy-traders-4.jpg'
    ],
    hasLiveLink: true,
    liveUrl: 'https://saraswathytraders.com/',
    actionText: 'Live Demo'
  },
  {
    id: 'sree-vaarahi-transports',
    title: 'Sree Vaarahi Amman Transports Logistics Platform',
    category: 'Commercial Road Freight & Interstate Fleet Web',
    clientName: 'Sree Vaarahi Amman Transports',
    tagPill: 'Primary Client Project',
    tagIcon: 'ri-truck-line',
    badgeText: 'Live Web Platform',
    badgeVariant: 'live',
    themeColor: '#06b6d4',
    cardBg: '#0c1e28',
    summary: 'Official commercial logistics web portal for Sree Vaarahi Amman Transports. Features interstate heavy transport services, booking inquiries, vehicle fleet showcase, and route network operations.',
    features: [
      'Automated Interstate Freight Consignment Booking',
      'Real-Time Road Transit & Vehicle Fleet Operations',
      'Direct Transporter Quote Request & Customer Service'
    ],
    techStack: ['React.js', 'Vite', 'Tailored UI', 'Cloud CDN', 'Modern CSS'],
    image: '/assets/images/projects/sree-vaarahi.jpg',
    images: [
      '/assets/images/projects/sree-vaarahi.jpg',
      '/assets/images/projects/sree-vaarahi-web.jpg'
    ],
    hasLiveLink: true,
    liveUrl: 'https://sreevaarahiammantransports.com/',
    actionText: 'Live Demo'
  }
];

export const IN_HOUSE_PRODUCTS = [
  {
    id: 'triovexa-hrm',
    title: 'TrioVexa Enterprise HRM & Biometric Attendance',
    category: 'Workforce & Biometric Suite',
    tagPill: 'Enterprise SaaS',
    tagIcon: 'ri-user-settings-line',
    badgeText: '⭐ Flagship Product',
    badgeVariant: 'product',
    themeColor: '#00f2fe', // Electric Cyan
    cardBg: '#0d1d28',
    summary: 'Human capital suite with live biometric IoT attendance sync, automated salary disbursement, PF/ESI statutory compliance, and 5-tier role hierarchy.',
    features: [
      'Biometric Fingerprint & Face IoT Attendance Sync',
      'One-Click Automated Monthly Payroll & Payslip Engine',
      '5-Tier Hierarchy (Admin, HR, Lead, Supervisor, Staff)'
    ],
    techStack: ['React.js', 'Spring Boot', 'Java', 'PostgreSQL', 'Biometric IoT SDK'],
    image: '/assets/images/projects/hrm.jpg',
    images: [
      '/assets/images/projects/hrm.jpg',
      '/assets/images/projects/hrm-1.jpg',
      '/assets/images/projects/hrm-2.jpg',
      '/assets/images/projects/hrm-3.jpg',
      '/assets/images/projects/hrm-4.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'TrioVexa HRM Demo',
    actionText: 'Request Live Demo'
  },
  {
    id: 'triovexa-erp',
    title: 'TrioVexa Cloud ERP & Inventory Engine',
    category: 'Multi-Branch Inventory & Production',
    tagPill: 'Enterprise Solution',
    tagIcon: 'ri-stack-line',
    badgeText: 'Multi-Warehouse',
    badgeVariant: 'product',
    themeColor: '#10b981', // Emerald
    cardBg: '#0e1f18',
    summary: 'Industrial ERP platform for manufacturers and textile mills. Handles multi-branch inventory, bill of materials (BOM), barcode scanning, and GST billing.',
    features: [
      'Multi-Warehouse Inventory & Low Stock Alerts',
      'Production Batch Tracking with Bill of Materials (BOM)',
      'GST & Tax Invoicing with E-Way Bill Integration'
    ],
    techStack: ['React.js', 'Node.js Microservices', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/assets/images/projects/erp.jpg',
    images: [
      '/assets/images/projects/erp.jpg',
      '/assets/images/projects/erp-1.jpg',
      '/assets/images/projects/erp-2.jpg',
      '/assets/images/projects/erp-3.jpg',
      '/assets/images/projects/erp-4.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'TrioVexa ERP Demo',
    actionText: 'Request Live Demo'
  },
  {
    id: 'taskpulse-ai',
    title: 'TaskPulse AI – Sprint & Workflow Intelligence',
    category: 'AI Workflow & Sprint Planning',
    tagPill: 'AI SaaS',
    tagIcon: 'ri-cpu-line',
    badgeText: '🤖 AI Agent Powered',
    badgeVariant: 'ai',
    themeColor: '#8b5cf6', // Violet
    cardBg: '#1a122e',
    summary: 'AI productivity platform converting high-level goals into structured sprints. Features local AES-256 data privacy, predictive velocity models, and blocker detection.',
    features: [
      'Natural Language Goal-to-Sprint Breakdown',
      'AES-256 Local Encryption & Zero-Knowledge Privacy',
      'Predictive Sprint Velocity & Blocker Heatmaps'
    ],
    techStack: ['React Native', 'FastAPI', 'Python AI Agents', 'Vector DB', 'AES-256'],
    image: '/assets/images/projects/taskpulse-ai.jpg',
    images: [
      '/assets/images/projects/taskpulse-ai.jpg',
      '/assets/images/projects/taskpulse-ai-1.jpg',
      '/assets/images/projects/taskpulse-ai-2.jpg',
      '/assets/images/projects/taskpulse-ai-3.jpg',
      '/assets/images/projects/taskpulse-ai-4.jpg',
      '/assets/images/projects/taskpulse-ai-5.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'TaskPulse AI Demo',
    actionText: 'Request Live Demo'
  },
  {
    id: 'buildtwin360',
    title: 'BuildTwin360 – 3D Digital Twin & Construction Telemetry',
    category: 'Spatial BIM & Site Asset Telemetry',
    tagPill: 'DeepTech / PropTech',
    tagIcon: 'ri-building-2-line',
    badgeText: '360° BIM Spatial',
    badgeVariant: 'product',
    themeColor: '#f59e0b', // Amber
    cardBg: '#21180d',
    summary: '3D spatial intelligence system for megaprojects. Combines drone photogrammetry, BIM models, heavy equipment IoT telemetry, and hazard zone safety warnings.',
    features: [
      'Interactive 360° WebGL 3D BIM Model Viewer',
      'Crane & Heavy Equipment IoT Sensor Telemetry',
      'Geo-Fenced Hazard Zone Proximity Safety Alerting'
    ],
    techStack: ['Three.js / WebGL', 'FastAPI', 'MQTT Telemetry', 'TimescaleDB', 'React'],
    image: '/assets/images/projects/buildtwin360.jpg',
    images: [
      '/assets/images/projects/buildtwin360.jpg',
      '/assets/images/projects/buildtwin360-1.jpg',
      '/assets/images/projects/buildtwin360-2.jpg',
      '/assets/images/projects/buildtwin360-3.jpg',
      '/assets/images/projects/buildtwin360-4.jpg',
      '/assets/images/projects/buildtwin360-5.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'BuildTwin360 Demo',
    actionText: 'Request Live Demo'
  }
];

export const ACADEMIC_PROJECTS = [
  {
    id: 'safety-assist',
    title: 'Intelligent Mobility and Safety Assistance System for Visually Impaired Individuals',
    category: 'Hardware Node',
    tagPill: 'Hardware Node',
    tagIcon: 'ri-eye-line',
    badgeText: 'HARDWARE NODE',
    badgeVariant: 'hardware-node',
    themeColor: '#00f2fe',
    cardBg: '#0c1e28',
    summary: 'Intelligent Mobility and Safety Assistance System for Visually Impaired Individuals with OCR and voice navigation.',
    features: [
      'Real-Time Object Detection',
      'Face Recognition System',
      'OCR-Based Text Reading',
      'Voice Command Navigation',
      'Bluetooth Audio Assistance'
    ],
    techStack: [
      'Raspberry Pi',
      'Python',
      'TensorFlow',
      'Ultralytics',
      'EasyOCR',
      'Pyttsx3',
      'SpeechRecognition'
    ],
    image: '/assets/images/projects/Student%20Projects/safety-assist/img1.jpg',
    images: [
      '/assets/images/projects/Student%20Projects/safety-assist/img1.jpg',
      
    ],
    hasLiveLink: false,
    demoModalTag: 'Visually Impaired Mobility Assist',
    actionText: 'Request Live Demo'
  },
  {
    id: 'maternal-health',
    title: 'Maternal Health Tracker',
    category: 'Software Node',
    tagPill: 'Software Node',
    tagIcon: 'ri-heart-pulse-line',
    badgeText: 'SOFTWARE NODE',
    badgeVariant: 'software-node',
    themeColor: '#ec4899',
    cardBg: '#250f1d',
    summary: 'Maternal Health Tracker with real-time temperature, fall detection, and doctor dashboard.',
    features: [
      'Maternal Health Monitoring System',
      'Real-Time Body Temperature Tracking',
      'Automatic Fall Detection & Emergency Alerts',
      'BLE-Based Mobile App Connectivity',
      'Doctor & Patient Real-Time Monitoring Dashboard'
    ],
    techStack: [
      'ESP32 Development Board',
      'MAX30102 Sensor',
      'MPU6050 Sensor',
      'Temperature Sensor',
      'Li-ion Battery',
      'React Native',
      'Spring Boot',
      'MySQL Database'
    ],
    image: '/assets/images/projects/Student%20Projects/Maternal-health/img1.jpg',
    images: [
      '/assets/images/projects/Student%20Projects/Maternal-health/img1.jpg',
      '/assets/images/projects/Student%20Projects/Maternal-health/img2.jpg',
      '/assets/images/projects/Student%20Projects/Maternal-health/img3.jpg',
      '/assets/images/projects/Student%20Projects/Maternal-health/img4.jpg',
      '/assets/images/projects/Student%20Projects/Maternal-health/img5.jpg',
      '/assets/images/projects/Student%20Projects/Maternal-health/img6.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'Maternal Health Tracker',
    actionText: 'Request Live Demo'
  },
  {
    id: 'ai-medicine',
    title: 'AI based Smart Medicine Remainder Android Application',
    category: 'Software Node',
    tagPill: 'Software Node',
    tagIcon: 'ri-terminal-box-line',
    badgeText: 'SOFTWARE NODE',
    badgeVariant: 'software-node',
    themeColor: '#3b82f6',
    cardBg: '#0f182c',
    summary: 'AI based Smart Medicine Remainder Android Application with automated tracking and alerts.',
    features: [
      'Smart Reminders',
      'Medicine Tracking',
      'Missed Dose Alerts',
      'Caregiver Notifications',
      'Health Dashboard'
    ],
    techStack: [
      'React Native',
      'FastAPI',
      'PostgreSQL',
      'Twilio API',
      'Expo Notifications'
    ],
    image: '/assets/images/projects/Student%20Projects/ai-medicine/img1.jpg',
    images: [
      '/assets/images/projects/Student%20Projects/ai-medicine/img1.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img2.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img3.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img4.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img5.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img6.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img7.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img8.jpg',
      '/assets/images/projects/Student%20Projects/ai-medicine/img9.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'AI Smart Medicine Remainder',
    actionText: 'Request Live Demo'
  },
  {
    id: 'crowd-safety',
    title: 'Crowd Safety Application based on Real Time Metro Station Monitoring',
    category: 'Hardware Node',
    tagPill: 'Hardware Node',
    tagIcon: 'ri-cpu-line',
    badgeText: 'HARDWARE NODE',
    badgeVariant: 'hardware-node',
    themeColor: '#ef4444',
    cardBg: '#241010',
    summary: 'Crowd Safety Application based on Real Time Metro Station Monitoring with vision and IoT telemetry.',
    features: [
      'Live Crowd Detection',
      'Real-Time Alerts',
      'Safety Threshold Monitoring',
      'SMS Notifications',
      'Analytics Dashboard',
      'Automated Emergency Indications'
    ],
    techStack: [
      'Arduino Uno',
      'I2C LCD Display',
      'Buzzer',
      'LED Indicators',
      'Camera Module',
      'React Native',
      'FastAPI',
      'OpenCV',
      'Twilio API',
      'Arduino IDE',
      'Serial Communication'
    ],
    image: '/assets/images/projects/Student%20Projects/crowd-safety/img1.jpg',
    images: [
      '/assets/images/projects/Student%20Projects/crowd-safety/img1.jpg',
      '/assets/images/projects/Student%20Projects/crowd-safety/img2.jpg',
      '/assets/images/projects/Student%20Projects/crowd-safety/img3.jpg',
      '/assets/images/projects/Student%20Projects/crowd-safety/img4.jpg',
      '/assets/images/projects/Student%20Projects/crowd-safety/img5.jpg',
      '/assets/images/projects/Student%20Projects/crowd-safety/img6.jpg',
      '/assets/images/projects/Student%20Projects/crowd-safety/img7.jpg',
      '/assets/images/projects/Student%20Projects/crowd-safety/img8.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'Crowd Safety Metro Station',
    actionText: 'Request Live Demo'
  },
  {
    id: 'smart-ring',
    title: 'Smart Ring Application for Health Monitoring',
    category: 'Embedded Node',
    tagPill: 'Embedded Node',
    tagIcon: 'ri-wireless-charging-line',
    badgeText: 'EMBEDDED NODE',
    badgeVariant: 'embedded-node',
    themeColor: '#10b981',
    cardBg: '#0e1f18',
    summary: 'Smart Ring Application for Health Monitoring with posture tracking and real-time vital sensors.',
    features: [
      'Yoga Posture Tracking',
      'Activity Monitoring',
      'Breathing Analysis',
      'Real-Time Health Insights',
      'Smart Notifications',
      'Progress Analytics'
    ],
    techStack: [
      'Smart Sensor Ring',
      'Motion Sensors',
      'Bluetooth Module',
      'Health Monitoring Sensors',
      'React Native',
      'FastAPI',
      'Python',
      'IoT Sensors',
      'Bluetooth Communication',
      'Cloud Analytics'
    ],
    image: '/assets/images/projects/Student%20Projects/smart-ring/img1.jpg',
    images: [
      '/assets/images/projects/Student%20Projects/smart-ring/img1.jpg',
      '/assets/images/projects/Student%20Projects/smart-ring/img2.jpg',
      '/assets/images/projects/Student%20Projects/smart-ring/img3.jpg',
      '/assets/images/projects/Student%20Projects/smart-ring/img4.jpg',
      '/assets/images/projects/Student%20Projects/smart-ring/img5.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'Smart Ring Health Monitoring',
    actionText: 'Request Live Demo'
  },
  {
    id: 'iris-voting',
    title: 'Fingerprint and iris voting system',
    category: 'Hardware Node',
    tagPill: 'Hardware Node',
    tagIcon: 'ri-fingerprint-line',
    badgeText: 'HARDWARE NODE',
    badgeVariant: 'hardware-node',
    themeColor: '#8b5cf6',
    cardBg: '#1b122e',
    summary: 'Fingerprint and iris voting system with facial recognition and secure vote casting.',
    features: [
      'Facial Recognition Authentication',
      'Secure Vote Casting',
      'Automated Voter Verification',
      'Real-Time LCD Guidance System',
      'Audio & Visual Alert System'
    ],
    techStack: [
      'ESP32-CAM Module',
      'ESP32 DevKit V1',
      '16x2 LCD Display with I2C Module',
      'Push Buttons',
      'Active Buzzer',
      'LED Indicators',
      'OV2640 Camera Sensor'
    ],
    image: '/assets/images/projects/Student%20Projects/iris-voting/img1.jpg',
    images: [
      '/assets/images/projects/Student%20Projects/iris-voting/img1.jpg',
      '/assets/images/projects/Student%20Projects/iris-voting/img2.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'Fingerprint & Iris Voting System',
    actionText: 'Request Live Demo'
  },
  {
    id: 'smart-plant',
    title: 'Smart Plant Monitoring system using Raspberry pi and ESP32',
    category: 'Embedded Node',
    tagPill: 'Embedded Node',
    tagIcon: 'ri-plant-line',
    badgeText: 'EMBEDDED NODE',
    badgeVariant: 'embedded-node',
    themeColor: '#22c55e',
    cardBg: '#0f2316',
    summary: 'Smart Plant Monitoring system using Raspberry pi and ESP32 with automated pump control.',
    features: [
      'Automated Soil Moisture Sensing',
      'Ambient Temperature & Humidity Telemetry',
      'Real-Time Water Pump Automation',
      'Cloud Dashboard Monitoring',
      'Data Logs Analysis'
    ],
    techStack: [
      'Raspberry Pi',
      'ESP32',
      'DHT11 Sensor',
      'Soil Moisture Sensor',
      'Python',
      'MQTT',
      'Node.js'
    ],
    image: '/assets/images/projects/Student%20Projects/smart-plant/img1.jpg',
    images: [
      '/assets/images/projects/Student%20Projects/smart-plant/img1.jpg',
      '/assets/images/projects/Student%20Projects/smart-plant/img2.jpg'
    ],
    hasLiveLink: false,
    demoModalTag: 'Smart Plant Monitoring System',
    actionText: 'Request Live Demo'
  },
  {
    id: 'traffic-accident',
    title: 'Smart Traffic Accident Hotspot Prediction and Prevention System',
    category: 'Embedded Node',
    tagPill: 'Embedded Node',
    tagIcon: 'ri-alarm-warning-line',
    badgeText: 'EMBEDDED NODE',
    badgeVariant: 'embedded-node',
    themeColor: '#f97316',
    cardBg: '#24140a',
    summary: 'Smart Traffic Accident Hotspot Prediction and Prevention System with impact telemetry and automated SOS.',
    features: [
      'Real-Time Safety Monitoring',
      'Emergency Alerts',
      'Sensor-Based Detection',
      'Live Dashboard',
      'Automated Notifications',
      'Risk Analysis'
    ],
    techStack: [
      'Arduino/ESP32',
      'Smoke Sensor',
      'Temperature Sensor',
      'Gas Sensor',
      'Buzzer',
      'LED Indicators',
      'FastAPI',
      'React',
      'IoT Sensors'
    ],
    image: '/assets/images/projects/Student%20Projects/traffic-accident/img1.png',
    images: [
      '/assets/images/projects/Student%20Projects/traffic-accident/img1.png',
      '/assets/images/projects/Student%20Projects/traffic-accident/img2.png',
      '/assets/images/projects/Student%20Projects/traffic-accident/img3.png',
      '/assets/images/projects/Student%20Projects/traffic-accident/img4.png',
      '/assets/images/projects/Student%20Projects/traffic-accident/img5.png',
      '/assets/images/projects/Student%20Projects/traffic-accident/img6.png'
    ],
    hasLiveLink: false,
    demoModalTag: 'Traffic Accident Hotspot System',
    actionText: 'Request Live Demo'
  }
];
