'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FAQAccordion from '../components/FAQAccordion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EMAIL = 'sales@obsidia.space';

const EMAIL_CLIENTS = [
  { label: 'Gmail',            icon: 'G', url: () => `https://mail.google.com/mail/?view=cm&to=${EMAIL}`, platforms: ['all'] },
  { label: 'Outlook',          icon: 'O', url: () => `https://outlook.office.com/mail/deeplink/compose?to=${EMAIL}`, platforms: ['all'] },
  { label: 'Apple Mail',       icon: 'A', url: () => `mailto:${EMAIL}`, platforms: ['ios', 'mac'] },
  { label: 'Default mail app', icon: 'D', url: () => `mailto:${EMAIL}`, platforms: ['android', 'other'] },
];

function detectPlatform(): 'ios' | 'mac' | 'android' | 'other' {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
  if (/Macintosh/.test(ua)) return 'mac';
  if (/Android/.test(ua)) return 'android';
  return 'other';
}

function EmailChooser({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [platform, setPlatform] = useState<'ios' | 'mac' | 'android' | 'other'>('other');

  useEffect(() => { setPlatform(detectPlatform()); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const visibleClients = EMAIL_CLIENTS.filter(c => c.platforms.includes('all') || c.platforms.includes(platform));

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button" onClick={() => setOpen(v => !v)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'rgb(255, 255, 255)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'color 200ms ease' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(255, 255, 255)'; }}
        aria-haspopup="listbox" aria-expanded={open}
      >
        <Mail size={12} color="var(--accent)" strokeWidth={1.5} />
        {email}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: 0, backgroundColor: '#1A1A18', border: '1px solid rgba(255,255,255,0.1)', padding: '6px', minWidth: '210px', zIndex: 200, boxShadow: '0 16px 48px rgba(0,0,0,0.38)' }}
          >
            <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.25)', padding: '6px 10px 8px' }}>Open with</p>
            {visibleClients.map(client => (
              <a
                key={client.label} href={client.url()}
                target={client.label !== 'Apple Mail' && client.label !== 'Default mail app' ? '_blank' : undefined}
                rel="noreferrer noopener" onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 10px', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: 'rgba(220,225,248,0.7)', textDecoration: 'none', transition: 'background 150ms ease, color 150ms ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.color = '#DCE1F5'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(220,225,248,0.7)'; }}
              >
                <span style={{ width: '22px', height: '22px', backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: 'rgba(220,225,248,0.4)', flexShrink: 0 }}>{client.icon}</span>
                {client.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FieldProps { label: string; name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; placeholder?: string; autoFocus?: boolean; }
function Field({ label, name, type = 'text', value, onChange, required, placeholder, autoFocus }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: focused ? 'var(--accent)' : 'rgba(13,17,71,0.38)', transition: 'color 220ms ease', userSelect: 'none' }}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} autoFocus={autoFocus}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '14px',
          color: '#0D1147',
          backgroundColor: focused ? '#FFFFFF' : 'rgba(13,17,71,0.025)',
          border: `1.5px solid ${focused ? 'var(--accent)' : 'rgba(13,17,71,0.1)'}`,
          borderRadius: '10px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 220ms ease, background-color 200ms ease, box-shadow 220ms ease',
          boxShadow: focused ? '0 0 0 3px rgba(61,82,230,0.08)' : 'none',
        }}
      />
    </div>
  );
}

function CustomSelect({ label, options, value, onChange, required }: { label: string; options: string[]; value: string; onChange: (v: string) => void; required?: boolean; }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  const displayText = value || null;
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: open ? 'var(--accent)' : 'rgba(13,17,71,0.38)', transition: 'color 220ms ease', userSelect: 'none' }}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <button type="button" onClick={() => setOpen(v => !v)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 16px',
            display: 'flex',
            alignItems: 'center',
            background: open ? '#FFFFFF' : 'rgba(13,17,71,0.025)',
            border: `1.5px solid ${open ? 'var(--accent)' : 'rgba(13,17,71,0.1)'}`,
            borderRadius: '10px',
            cursor: 'pointer',
            textAlign: 'left',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '14px',
            color: displayText ? '#0D1147' : 'rgba(13,17,71,0.35)',
            transition: 'border-color 220ms ease, background-color 200ms ease, box-shadow 220ms ease',
            boxShadow: open ? '0 0 0 3px rgba(61,82,230,0.08)' : 'none',
          }}>
          <span style={{ flex: 1 }}>{displayText ?? 'Select'}</span>
        </button>
        <ChevronDown size={12} style={{ position: 'absolute', right: '14px', top: '50%', transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, color: open ? 'var(--accent)' : 'rgba(13,17,71,0.28)', transition: 'transform 240ms cubic-bezier(0.22,1,0.36,1), color 220ms ease', pointerEvents: 'none' }} />
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, scaleY: 0.9, y: -4 }} animate={{ opacity: 1, scaleY: 1, y: 0 }} exit={{ opacity: 0, scaleY: 0.9, y: -4 }} transition={{ duration: 0.2, ease: EASE }}
              style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, backgroundColor: '#FFFFFF', border: '1px solid rgba(13,17,71,0.08)', borderRadius: '12px', boxShadow: '0 12px 48px rgba(13,17,71,0.12), 0 2px 8px rgba(13,17,71,0.06)', zIndex: 300, transformOrigin: 'top center', padding: '6px', overflow: 'hidden' }}>
              {options.map(opt => {
                const checked = value === opt;
                return (
                  <button key={opt} type="button" onClick={() => { onChange(checked ? '' : opt); setOpen(false); }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '7px', fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: '#0D1147', transition: 'background 130ms ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(61,82,230,0.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}>
                    <span style={{ width: '15px', height: '15px', flexShrink: 0, borderRadius: '3px', border: `1.5px solid ${checked ? 'var(--accent)' : 'rgba(13,17,71,0.18)'}`, backgroundColor: checked ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 140ms ease, background-color 140ms ease' }}>
                      {checked && <Check size={9} color="#FFFFFF" strokeWidth={2.5} />}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SuccessState() {
  const next = ['Brief reviewed', 'Discovery call', 'Scope document'];
  const subs = ['Within one hour', 'Scheduled in 24 hours', 'Delivered within 3 days'];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
          style={{ width: '56px', height: '56px', flexShrink: 0, border: '1px solid rgba(61,82,230,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(61,82,230,0.05)' }}>
          <Check size={22} color="var(--accent)" strokeWidth={1.5} />
        </motion.div>
        <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em', color: '#0D1147', lineHeight: 0.95, margin: 0 }}>Inquiry sent.</h2>
      </div>
      <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(13,17,71,0.46)', maxWidth: '400px' }}>We&apos;ll be in touch within one hour.</p>
      <div style={{ borderTop: '1px solid rgba(13,17,71,0.08)', paddingTop: '32px' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(13,17,71,0.2)', display: 'block', marginBottom: '24px' }}>What happens next</span>
        {next.map((text, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.1 }}
            style={{ display: 'flex', gap: '20px', paddingBottom: i < next.length - 1 ? '20px' : '0', marginBottom: i < next.length - 1 ? '20px' : '0', borderBottom: i < next.length - 1 ? '1px solid rgba(13,17,71,0.07)' : 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'var(--accent)', flexShrink: 0, paddingTop: '2px', opacity: 0.55 }}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: '#0D1147', fontWeight: 500, marginBottom: '2px' }}>{text}</div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(13,17,71,0.28)' }}>{subs[i]}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <Link href="/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'rgba(13,17,71,0.28)', borderBottom: '1px solid rgba(13,17,71,0.1)', paddingBottom: '3px', transition: 'color 200ms ease, border-color 200ms ease' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent)'; el.style.borderColor = 'var(--accent)'; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(13,17,71,0.28)'; el.style.borderColor = 'rgba(13,17,71,0.1)'; }}>
        Back to home <ArrowRight size={11} />
      </Link>
    </motion.div>
  );
}

function CTAButton({ onClick, type = 'button', disabled = false, children }: { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; children: React.ReactNode; }) {
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} whileHover={disabled ? {} : { y: -2 }} whileTap={disabled ? {} : { y: 0, scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: 'var(--accent)', border: 'none', padding: '16px 40px', borderRadius: '50px', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.55 : 1, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 22px rgba(61,82,230,0.32)', transition: 'opacity 200ms ease, box-shadow 260ms ease' }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 38px rgba(61,82,230,0.52)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 22px rgba(61,82,230,0.32)'; }}>
      <span aria-hidden className="btn-shine" />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '12px' }}>{children}</span>
    </motion.button>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed]   = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '', _hp: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gitHov, setGitHov] = useState(false);

  useEffect(() => { const id = setTimeout(() => setRevealed(true), 80); return () => clearTimeout(id); }, []);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { set(e.target.name, e.target.value); setFormError(''); };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const wordCount = form.message.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form._hp) return;
    if (!form.firstName.trim()) { setFormError('First name is required'); return; }
    if (!form.lastName.trim())  { setFormError('Last name is required'); return; }
    if (!form.email.trim() || !EMAIL_RE.test(form.email.trim())) { setFormError('A valid email address is required'); return; }
    if (!form.service) { setFormError('Please select a service'); return; }
    if (wordCount < 10) { setFormError('Please describe your project (at least 10 words)'); return; }
    setIsSubmitting(true);
    setTimeout(() => { setSubmitted(true); setIsSubmitting(false); }, 600);
  };

  const serviceOpts = ['Workflow Automation', 'Website Development', 'Application Development', 'Not sure yet'];

  return (
    <>
      {/* ── Section 1: Hero + Form ── */}
      <div data-nav-theme="dark" style={{ backgroundColor: 'var(--dark-bg)', minHeight: '100dvh', position: 'relative' }}>
        <div className="contact-split" style={{ display: 'grid', gridTemplateColumns: '42% 58%', minHeight: '100dvh' }}>

          {/* LEFT PANEL */}
          <div
            className="contact-left"
            style={{
              position: 'sticky', top: 0, minHeight: '100dvh',
              display: 'flex', flexDirection: 'column',
              paddingTop: '225px', paddingRight: '56px', paddingBottom: '56px', paddingLeft: '48px',
              backgroundImage: 'radial-gradient(circle, rgba(220,225,248,0.12) 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
              overflow: 'hidden',
            }}
          >
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.3) 0%, transparent 55%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <motion.h1
                className="font-heading"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }} transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
                style={{ fontSize: 'clamp(52px, 5.5vw, 80px)', fontWeight: 500, letterSpacing: '-0.045em', color: '#FFFFFF', lineHeight: 0.95, marginBottom: '20px', margin: 0 }}
              >
                Contact Us
              </motion.h1>
              <div style={{ marginTop: '40px', border: '1px solid rgb(255, 255, 255)', borderRadius: '12px', padding: '20px 24px', maxWidth: '340px', backgroundColor: 'rgba(13,16,32,0.85)' }}>
              <motion.p
                className="font-body"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }} transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
                style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgb(255, 255, 255)', margin: 0 }}
              >
                We are excited about the future of how businesses operate and invite you to build that future with us.
              </motion.p>
              </div>


              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }} transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
                style={{ marginTop: '180px', display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', color: 'var(--accent)', marginBottom: '8px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  or email us directly
                </p>
                <EmailChooser email="sales@obsidia.space" />
              </motion.div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="contact-right" style={{ backgroundColor: 'var(--bg)', padding: '120px 0 96px 64px', display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ width: '100%', maxWidth: '520px' }}>
              {submitted ? <SuccessState /> : (
                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <input name="_hp" value={form._hp} onChange={handleInputChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, border: 'none', padding: 0 }} />

                  {/* Name row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="form-two-col">
                    <Field label="First name" name="firstName" value={form.firstName} onChange={handleInputChange} required autoFocus placeholder="Mohammed" />
                    <Field label="Last name"  name="lastName"  value={form.lastName}  onChange={handleInputChange} required placeholder="Al Otaibi" />
                  </div>

                  {/* Contact row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="form-two-col">
                    <Field label="Email address" name="email" type="email" value={form.email} onChange={handleInputChange} required placeholder="you@company.com" />
                    <Field label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={handleInputChange} placeholder="+966 (055) 000 - 0000" />
                  </div>

                  {/* Service dropdown */}
                  <CustomSelect label="Service needed" options={serviceOpts} value={form.service} onChange={v => { set('service', v); setFormError(''); }} required />

                  {/* Message textarea */}
                  <div>
                    <MessageField value={form.message} onChange={handleInputChange} wordCount={wordCount} />
                  </div>

                  {formError && <p role="alert" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: 'var(--error, #E53E3E)', letterSpacing: '0.02em', margin: 0 }}>{formError}</p>}

                  <div style={{ paddingTop: '8px' }}>
                    <CTAButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit'} <ArrowRight size={12} />
                    </CTAButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: FAQ ── */}
      <section id="contact-faq" style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '96px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start' }} className="faq-two-col">

          {/* LEFT */}
          <div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--text)', lineHeight: 1.1, margin: 0 }}>
              Frequently Asked Questions
            </h2>

            {/* "Still have questions?" card */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--dark-surface)',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid var(--dark-border)',
              marginTop: '36px',
              width: '277px',
              maxWidth: '277px',
            }}>
              <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '8px', whiteSpace: 'nowrap' }}>
                Still have questions?
              </div>
              <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: 'rgba(220,225,248,0.45)', lineHeight: 1.7, marginBottom: '20px' }}>
                Can&apos;t find what you&apos;re looking for? Write to us.
              </div>

              {/* Button in its own card */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '9px 15px',
              }}>
                <button
                  type="button"
                  onMouseEnter={() => setGitHov(true)}
                  onMouseLeave={() => setGitHov(false)}
                  onClick={() => { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactDrawer')); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    position: 'relative',
                    display: 'inline-block',
                    lineHeight: 1.4,
                  }}
                >
                  Get in Touch
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'var(--accent)',
                    display: 'block',
                    transform: gitHov ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: gitHov ? 'left center' : 'right center',
                    transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }} />
                </button>
              </div>

              {/* Decorative logo — partially cropped at bottom-right corner */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/obsidia_web_black_logo.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-18px',
                  right: '-14px',
                  width: '96px',
                  height: '96px',
                  objectFit: 'contain',
                  opacity: 0.1,
                  filter: 'invert(1)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <FAQAccordion hideHeader />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .contact-split { grid-template-columns: 1fr !important; min-height: auto !important; }
          .contact-left { position: relative !important; top: auto !important; height: auto !important; min-height: auto !important; padding: 72px 32px 48px !important; }
          .contact-right { padding: 56px 32px 80px !important; }
          .faq-two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 600px) {
          .form-two-col { grid-template-columns: 1fr !important; }
          .contact-left { padding: 48px 24px 40px !important; }
          .contact-right { padding: 40px 24px 64px !important; }
        }
        input:-webkit-autofill, input:-webkit-autofill:focus { -webkit-box-shadow: 0 0 0 1000px #FFFFFF inset !important; -webkit-text-fill-color: #0D1147 !important; transition: background-color 0s 600000s; }
        ::placeholder { color: rgba(13,17,71,0.28); opacity: 1; }
        textarea::placeholder { color: rgba(13,17,71,0.28); }
        .btn-shine { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .btn-shine::after { content: ''; position: absolute; top: 0; bottom: 0; left: -80%; width: 50%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); animation: btnShine 3s cubic-bezier(0.4,0,0.6,1) infinite; animation-delay: 1.2s; }
        @keyframes btnShine { 0% { left: -80%; opacity: 0; } 10% { opacity: 1; } 50% { left: 150%; opacity: 0; } 100% { left: 150%; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .btn-shine::after { animation: none; } }
      `}</style>
    </>
  );
}

function MessageField({ value, onChange, wordCount }: { value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; wordCount: number }) {
  const [focused, setFocused] = useState(false);
  const ready = wordCount >= 10;
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: focused ? 'var(--accent)' : 'rgba(13,17,71,0.38)', transition: 'color 220ms ease', userSelect: 'none' }}>
        Message<span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>
      </label>
      <textarea
        name="message" value={value} onChange={onChange} rows={5}
        placeholder="Describe your project, the problem you're solving, and your ideal timeline..."
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '14px',
          lineHeight: 1.8,
          color: '#0D1147',
          backgroundColor: focused ? '#FFFFFF' : 'rgba(13,17,71,0.025)',
          border: `1.5px solid ${focused ? 'var(--accent)' : 'rgba(13,17,71,0.1)'}`,
          borderRadius: '10px',
          outline: 'none',
          resize: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 220ms ease, background-color 200ms ease, box-shadow 220ms ease',
          boxShadow: focused ? '0 0 0 3px rgba(61,82,230,0.08)' : 'none',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ready ? 'var(--accent)' : 'rgba(13,17,71,0.18)', transition: 'color 300ms ease' }}>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}{ready ? ' — ready' : ' — 10 min'}
        </span>
      </div>
    </div>
  );
}
