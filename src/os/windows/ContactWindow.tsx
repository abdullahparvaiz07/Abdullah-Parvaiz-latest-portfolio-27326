/**
 * Abdullah OS — Contact Window (Email Client Style)
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Github, Linkedin, Mail, Loader2 } from 'lucide-react';

export default function ContactWindow() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) { newErrors.name = 'Name is required'; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Email is required'; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = 'Invalid email'; isValid = false; }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: 'a84e595c-11cc-4eb6-a5f7-c8e34f37b64f',
            name: formData.name,
            email: formData.email,
            message: formData.message,
            from_name: 'Abdullah OS Contact',
          }),
        });
        const result = await response.json();
        if (result.success) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setStatus('idle'), 5000);
      }
    }
  };

  return (
    <div className="os-contact">
      {/* Sidebar */}
      <div className="os-contact-sidebar">
        <div className="os-contact-sidebar-title">Quick Links</div>
        <a href="mailto:abdullahparvaizofficial@gmail.com" className="os-contact-link" target="_blank" rel="noopener noreferrer">
          <Mail size={14} /> <span>Email</span>
        </a>
        <a href="https://github.com/abdullahparvaiz07" className="os-contact-link" target="_blank" rel="noopener noreferrer">
          <Github size={14} /> <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/abdullah-parvaiz-4a0492386/" className="os-contact-link" target="_blank" rel="noopener noreferrer">
          <Linkedin size={14} /> <span>LinkedIn</span>
        </a>

        <div className="os-contact-sidebar-info">
          <div className="os-contact-sidebar-title" style={{ marginTop: '24px' }}>Direct Email</div>
          <p className="os-contact-email-display">abdullahparvaizofficial@gmail.com</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="os-contact-main">
        <div className="os-contact-compose-header">
          <Send size={16} className="text-orange-500" />
          <span>New Message</span>
        </div>

        <form onSubmit={handleSubmit} className="os-contact-form">
          <div className="os-contact-field">
            <label>From:</label>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
              className={errors.name ? 'os-contact-input--error' : ''}
            />
            {errors.name && <span className="os-contact-error"><AlertCircle size={12} /> {errors.name}</span>}
          </div>

          <div className="os-contact-field">
            <label>Reply-To:</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }}
              className={errors.email ? 'os-contact-input--error' : ''}
            />
            {errors.email && <span className="os-contact-error"><AlertCircle size={12} /> {errors.email}</span>}
          </div>

          <div className="os-contact-field os-contact-field--full">
            <label>Message:</label>
            <textarea
              rows={6}
              placeholder="Write your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="os-contact-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="os-contact-send"
            >
              {isSubmitting ? (
                <><Loader2 size={14} className="animate-spin" /> Sending...</>
              ) : status === 'success' ? (
                <><CheckCircle2 size={14} /> Sent!</>
              ) : status === 'error' ? (
                <><AlertCircle size={14} /> Failed — Retry</>
              ) : (
                <><Send size={14} /> Send Message</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
