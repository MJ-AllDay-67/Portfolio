import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // These must be prefixed with VITE_ in your .env.local file
      const serviceId = import.meta.env.VITE_SERVICE_ID;
      const templateId = import.meta.env.VITE_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are missing');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_email: formData.email, // Ensure your EmailJS template uses {{from_email}}
          message: formData.message,  // Ensure your EmailJS template uses {{message}}
        },
        publicKey
      );

      setStatus('success');
      setFormData({ email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors placeholder:text-gray-500"
          />
        </div>
        <div>
          <textarea
            rows={3}
            placeholder="Send me a message..."
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors resize-none placeholder:text-gray-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          className={`w-full py-2 rounded text-sm font-bold uppercase tracking-widest transition-all
            ${status === 'success' 
              ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
            }
            ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}
          `}
        >
          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Failed - Try Again' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;