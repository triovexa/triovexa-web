import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How much does a custom software or app project cost?',
    answer:
      'Pricing depends directly on project scope, features, and third-party integrations. At TrioVexa, a modern corporate website or standalone billing software typically ranges from ₹15,000 to ₹35,000. End-to-end custom mobile apps (Android & iOS) or multi-department ERP systems range between ₹50,000 to ₹2,50,000+. We evaluate your exact operational requirements upfront and provide a transparent, fixed-price quote with zero hidden charges.',
  },
  {
    id: 2,
    question: 'How long does it take to develop and launch?',
    answer:
      'Standard business websites and smart billing setups usually launch in 2 to 3 weeks. Feature-rich mobile applications or tailored business management ERPs generally take 4 to 8 weeks. We work in structured sprints with weekly progress demos so you can test features and provide feedback throughout development.',
  },
  {
    id: 3,
    question: 'Do you provide 100% source code ownership?',
    answer:
      'Yes, absolutely. Once final delivery and milestone payments are complete, your company owns 100% of the intellectual property (IP), source code, database architectures, and credentials. We transfer the complete Git repository along with deployment documentation.',
  },
  {
    id: 4,
    question: 'What happens after launch? Do you provide maintenance and updates?',
    answer:
      'Every project includes 30 to 60 days of complimentary post-launch support covering bug fixes, server monitoring, and staff training. Following that period, we offer affordable Monthly and Annual Maintenance Contracts (AMC) starting from ₹3,000/month for ongoing security patches, cloud backups, and feature enhancements.',
  },
  {
    id: 5,
    question: 'Can our existing offline software or legacy Excel data be upgraded?',
    answer:
      'Yes. Software modernization is one of our key strengths. We safely migrate your existing data from offline databases, older desktop applications, or spreadsheets into modern cloud systems with zero data loss, guaranteed privacy, and minimal downtime to your daily operations.',
  },
];

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="services-faq-section" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="faq-header">
         
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Transparent information about our pricing, timelines, code ownership, and support.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-container">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className={`faq-card ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon-wrapper">
                    <i className={`ri-arrow-down-s-line faq-icon ${isOpen ? 'rotate' : ''}`}></i>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className={`faq-answer-collapse ${isOpen ? 'show' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
