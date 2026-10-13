import React, { useState } from 'react';

export default function InquiryModal({ isOpen, onClose, selectedItem, onSubmitSuccess }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    company: '',
    serviceInterest: selectedItem ? selectedItem.name : 'General Inquiry',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      alert('Please provide your name and contact number/email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(
        `Thank you ${formData.name}! Your request for "${formData.serviceInterest}" has been received. Our solutions architect will connect with you within 2 hours.`
      );
      onClose();
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Let's Discuss Your Project
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sky)' }}>
              {selectedItem ? `Subject: ${selectedItem.name}` : 'Custom Software & IT Solutions'}
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="modal-form-group">
              <label>Your Name *</label>
              <input
                type="text"
                required
                className="modal-input"
                placeholder="e.g. Rajesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="modal-form-group">
              <label>Phone Number or Email *</label>
              <input
                type="text"
                required
                className="modal-input"
                placeholder="+91 98765 43210 or yourname@company.com"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>

            <div className="modal-form-group">
              <label>Company / Business Name (Optional)</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Apex Textiles / Fleet Logistics"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="modal-form-group">
              <label>Selected Service or Industry</label>
              <input
                type="text"
                className="modal-input"
                value={formData.serviceInterest}
                onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
              />
            </div>

            <div className="modal-form-group">
              <label>Brief Requirements (Optional)</label>
              <textarea
                rows="2"
                className="modal-input"
                placeholder="Describe your current system or what you'd like to build..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-sky"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
                <i className="ri-send-plane-fill"></i>
              </button>

              <a
                href="https://wa.me/919876543210?text=Hi%20TRIOVEXA,%20I%20would%20like%20to%20discuss%20a%20software%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-sky"
                style={{ gap: '0.5rem' }}
              >
                <i className="ri-whatsapp-line" style={{ color: '#25D366' }}></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
