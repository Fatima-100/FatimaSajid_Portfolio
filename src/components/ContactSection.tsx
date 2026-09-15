import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#dfb098', '#eed4c6', '#c9a0dc'],
    });
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#dfb098', '#eed4c6', '#c9a0dc'],
    });
  };

  return (
    <section id="contact" className="py-14 sm:py-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#141222]/90 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b172a] border border-[#dfb098]/30 text-xs font-semibold text-[#dfb098] mb-4 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
              <span>Initiate Collaboration</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f2f8] tracking-tight mb-4">
              Let's build something extraordinary together.
            </h2>
            <p className="text-sm sm:text-base text-[#9e97af]">
              Currently open to software engineering internships, junior developer roles, and high-impact full-stack & AI collaborations.
            </p>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={handleCopyEmail}
              id="copy-email-btn"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-[#12101c] bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] hover:brightness-110 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#12101c]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : `Copy: ${PERSONAL_INFO.email}`}</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              id="direct-email-btn"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#f4f2f8] bg-[#1d1830] hover:bg-[#282242] border border-white/15 shadow-sm transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#dfb098]" />
              <span>Send Direct Email</span>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              id="contact-github-btn"
              className="p-3 rounded-full bg-[#1d1830] hover:bg-[#282242] text-[#c5bed5] hover:text-[#f4f2f8] border border-white/10 shadow-sm transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              id="contact-linkedin-btn"
              className="p-3 rounded-full bg-[#1d1830] hover:bg-[#282242] text-[#c5bed5] hover:text-[#f4f2f8] border border-white/10 shadow-sm transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Inquiry Form */}
          <div className="max-w-xl mx-auto bg-[#1a162b]/80 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-inner">
            {formSent ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#f4f2f8]">
                  Message Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#9e97af]">
                  Thank you for reaching out, {formData.name}. I'll respond directly to {formData.email} promptly.
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-4 py-1.5 text-xs font-semibold text-[#dfb098] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#d5cee3] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sarah Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#120f20] border border-white/10 focus:border-[#dfb098] focus:outline-none text-xs text-[#f4f2f8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#d5cee3] mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#120f20] border border-white/10 focus:border-[#dfb098] focus:outline-none text-xs text-[#f4f2f8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d5cee3] mb-1">
                    Message / Opportunity Details
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell me about your team, project, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120f20] border border-white/10 focus:border-[#dfb098] focus:outline-none text-xs text-[#f4f2f8] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-3 rounded-xl font-bold text-xs text-[#12101c] bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] hover:brightness-110 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Message</span>
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#9e97af]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#dfb098]" />
              {PERSONAL_INFO.location}
            </span>
            <span>COMSATS University Islamabad · BS Software Engineering</span>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-[#7c6a8f] space-y-2">
          <p>© 2026 Fatima Sajid. Hand-crafted with React, Three.js, and modern TypeScript.</p>
          <p className="text-[11px] text-[#9e97af]">Designed in Obsidian Onyx & Rose Gold Luxe with 3D Holographic WebGL.</p>
        </footer>

      </div>
    </section>
  );
};
