import { useState } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { SITE } from '../../constants/site';
import { contactReasons } from '../../data/portfolio';
import { sendContactMessage } from '../../api/contactApi';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import GlowButton from '../common/GlowButton';

const initialForm = {
  name: '',
  email: '',
  company: '',
  service: 'MERN app',
  budget: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await sendContactMessage(form);
      setForm(initialForm);
      setStatus({ type: 'success', message: 'Message sent. Syed will respond soon.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(93,242,255,0.12),transparent_34rem)]" />
      <div className="container-premium relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Bring a sharper web presence to life."
          copy="Send the project context, timeline, and preferred service. The backend stores each inquiry in MongoDB and can send email notifications through Nodemailer."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <GlassCard className="p-6">
            <h3 className="text-2xl font-semibold text-white">Project paths</h3>
            <div className="mt-6 grid gap-3">
              {contactReasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <button
                    type="button"
                    key={reason.label}
                    onClick={() => setForm((current) => ({ ...current, service: reason.label }))}
                    data-magnetic
                    data-magnetic-strength="0.06"
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      form.service === reason.label
                        ? 'border-cyan/50 bg-cyan/10 text-white'
                        : 'border-white/10 bg-white/[0.035] text-mist hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="text-cyan" />
                    {reason.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm text-mist">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition hover:text-white">
                <Mail size={17} className="text-cyan" /> {SITE.email}
              </a>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 transition hover:text-white">
                <Phone size={17} className="text-cyan" /> {SITE.phone}
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={17} className="text-cyan" /> {SITE.location}
              </span>
            </div>
            <div className="mt-8">
              <GlowButton href={`mailto:${SITE.email}`} icon={false}>
                Email directly
              </GlowButton>
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-mist">
                  Name
                  <input
                    required
                    minLength={2}
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    className="min-h-12 rounded-2xl border border-white/10 bg-white/[0.045] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan/50"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm text-mist">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    className="min-h-12 rounded-2xl border border-white/10 bg-white/[0.045] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan/50"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-mist">
                  Company
                  <input
                    name="company"
                    value={form.company}
                    onChange={updateField}
                    className="min-h-12 rounded-2xl border border-white/10 bg-white/[0.045] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan/50"
                    placeholder="Company or brand"
                  />
                </label>
                <label className="grid gap-2 text-sm text-mist">
                  Budget
                  <input
                    name="budget"
                    value={form.budget}
                    onChange={updateField}
                    className="min-h-12 rounded-2xl border border-white/10 bg-white/[0.045] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan/50"
                    placeholder="Estimated range"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-mist">
                Service
                <select
                  name="service"
                  value={form.service}
                  onChange={updateField}
                  className="min-h-12 rounded-2xl border border-white/10 bg-white/[0.045] px-4 text-white outline-none transition focus:border-cyan/50"
                >
                  {contactReasons.map((reason) => (
                    <option key={reason.label} value={reason.label} className="bg-ink">
                      {reason.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm text-mist">
                Message
                <textarea
                  required
                  minLength={10}
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  rows={6}
                  className="resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan/50"
                  placeholder="Tell Syed what you want to build, redesign, or improve."
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                data-magnetic
                data-magnetic-strength="0.1"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink shadow-glow transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-65"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Send message
              </button>

              {status.message ? (
                <p
                  className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-mint/30 bg-mint/10 text-mint'
                      : 'border-coral/30 bg-coral/10 text-coral'
                  }`}
                  role="status"
                >
                  {status.type === 'success' ? <CheckCircle2 size={17} /> : null}
                  {status.message}
                </p>
              ) : null}
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
