'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import CTABand from '../../components/CTABand';
import MagneticButton from '../../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];



/* ── Website section mockup sub-components ────────────────── */
function SiteNavSection() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#0F1225', borderBottom: '1px solid rgba(61,82,230,0.1)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: 'auto', flexShrink: 0 }}>
        <div style={{ width: '9px', height: '9px', backgroundColor: 'var(--accent)', transform: 'rotate(45deg)', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '8px', fontWeight: 600, color: 'rgba(220,225,248,0.82)', letterSpacing: '0.06em' }}>OBSIDIA</span>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        {['Services', 'Work', 'About', 'Contact'].map(l => (
          <span key={l} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', color: 'rgba(220,225,248,0.38)', letterSpacing: '0.03em' }}>{l}</span>
        ))}
      </div>
      <div style={{ marginLeft: '12px', backgroundColor: 'rgba(61,82,230,0.75)', borderRadius: '2px', padding: '3px 9px', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>Get Started</span>
      </div>
    </div>
  );
}

function SiteHeroSection() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#0B0D1A', display: 'grid', gridTemplateColumns: '1fr 0.8fr', padding: '18px 16px', gap: '12px', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '5%', width: '180px', height: '160px', background: 'radial-gradient(circle, rgba(61,82,230,0.11) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
        <div style={{ fontSize: '5.5px', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(61,82,230,0.65)' }}>Digital Solutions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px', margin: '2px 0' }}>
          <div style={{ height: '11px', width: '92%', backgroundColor: 'rgba(220,225,248,0.80)', borderRadius: '1.5px' }} />
          <div style={{ height: '11px', width: '78%', backgroundColor: 'rgba(220,225,248,0.80)', borderRadius: '1.5px' }} />
          <div style={{ height: '11px', width: '62%', backgroundColor: 'rgba(220,225,248,0.80)', borderRadius: '1.5px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
          <div style={{ height: '5.5px', width: '88%', backgroundColor: 'rgba(220,225,248,0.20)', borderRadius: '1px' }} />
          <div style={{ height: '5.5px', width: '72%', backgroundColor: 'rgba(220,225,248,0.20)', borderRadius: '1px' }} />
        </div>
        <div style={{ display: 'flex', gap: '7px', alignItems: 'center', marginTop: '5px' }}>
          <div style={{ backgroundColor: 'var(--accent)', borderRadius: '2px', padding: '4px 12px' }}>
            <span style={{ fontSize: '7px', fontFamily: 'var(--font-body), sans-serif', color: '#FAFBFF', letterSpacing: '0.05em' }}>Start a project</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '7px', fontFamily: 'var(--font-body), sans-serif', color: 'rgba(61,82,230,0.65)', letterSpacing: '0.03em' }}>View work</span>
            <span style={{ fontSize: '8px', color: 'rgba(61,82,230,0.5)', lineHeight: 1 }}>→</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ position: 'relative', width: '88px', height: '72px' }}>
          <div style={{ position: 'absolute', top: '10px', right: 0, width: '76px', height: '58px', backgroundColor: 'rgba(61,82,230,0.06)', border: '1px solid rgba(61,82,230,0.12)', borderRadius: '4px' }} />
          <div style={{ position: 'absolute', top: '5px', right: '5px', width: '76px', height: '58px', backgroundColor: 'rgba(61,82,230,0.09)', border: '1px solid rgba(61,82,230,0.16)', borderRadius: '4px' }} />
          <div style={{ position: 'absolute', top: 0, right: '10px', width: '76px', height: '58px', backgroundColor: '#141628', border: '1px solid rgba(61,82,230,0.24)', borderRadius: '4px', padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.55)' }} />
              <div style={{ height: '3.5px', width: '36px', backgroundColor: 'rgba(220,225,248,0.28)', borderRadius: '1px' }} />
              <div style={{ marginLeft: 'auto', height: '3.5px', width: '16px', backgroundColor: 'rgba(61,82,230,0.45)', borderRadius: '1px' }} />
            </div>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '22px' }}>
              {[35, 55, 28, 72, 42, 65, 38, 58].map((h, j) => (
                <div key={j} style={{ flex: 1, height: `${h * 0.3}px`, backgroundColor: j === 3 || j === 5 ? 'rgba(61,82,230,0.7)' : 'rgba(220,225,248,0.14)', borderRadius: '1px 1px 0 0' }} />
              ))}
            </div>
            <div style={{ height: '2.5px', width: '100%', backgroundColor: 'rgba(220,225,248,0.06)', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '64%', backgroundColor: 'rgba(61,82,230,0.55)', borderRadius: '1px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteFeaturesSection() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#0E1120', borderTop: '1px solid rgba(61,82,230,0.07)', padding: '10px 16px 8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <div style={{ width: '14px', height: '1px', backgroundColor: 'rgba(61,82,230,0.45)' }} />
        <span style={{ fontSize: '5px', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(61,82,230,0.55)' }}>What We Build</span>
      </div>
      <div style={{ height: '8px', width: '48%', backgroundColor: 'rgba(220,225,248,0.68)', borderRadius: '1.5px', flexShrink: 0 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', flex: 1, minHeight: 0 }}>
        {([
          { col: 'rgba(61,82,230,0.7)',  tw: '80%' },
          { col: 'rgba(123,79,212,0.7)', tw: '72%' },
          { col: 'rgba(34,197,94,0.5)',  tw: '76%' },
        ] as const).map((f, i) => (
          <div key={i} style={{ backgroundColor: '#0F1226', border: '1px solid rgba(61,82,230,0.1)', borderRadius: '4px', padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ width: '13px', height: '13px', backgroundColor: 'rgba(61,82,230,0.12)', border: '1px solid rgba(61,82,230,0.2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '5px', height: '5px', backgroundColor: f.col, borderRadius: '0.5px' }} />
            </div>
            <div style={{ height: '5.5px', width: '70%', backgroundColor: 'rgba(220,225,248,0.62)', borderRadius: '1px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ height: '4px', width: '95%', backgroundColor: 'rgba(220,225,248,0.18)', borderRadius: '1px' }} />
              <div style={{ height: '4px', width: f.tw, backgroundColor: 'rgba(220,225,248,0.18)', borderRadius: '1px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SiteCtaSection() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#0D1028', backgroundImage: 'linear-gradient(135deg, rgba(61,82,230,0.14) 0%, rgba(61,82,230,0.06) 100%)', borderTop: '1px solid rgba(61,82,230,0.14)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '16px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5px' }}>
        <div style={{ height: '8px', width: '72%', backgroundColor: 'rgba(220,225,248,0.72)', borderRadius: '1.5px' }} />
        <div style={{ height: '5.5px', width: '50%', backgroundColor: 'rgba(220,225,248,0.28)', borderRadius: '1px' }} />
      </div>
      <div style={{ backgroundColor: 'rgba(61,82,230,0.8)', borderRadius: '2px', padding: '4.5px 11px', flexShrink: 0, boxShadow: '0 0 14px rgba(61,82,230,0.35)' }}>
        <span style={{ fontSize: '7px', fontFamily: 'var(--font-body), sans-serif', color: '#FAFBFF', letterSpacing: '0.05em' }}>Contact us</span>
      </div>
    </div>
  );
}

function SiteFooterSection() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#090B16', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        <div style={{ width: '7px', height: '7px', backgroundColor: 'rgba(61,82,230,0.55)', transform: 'rotate(45deg)' }} />
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', color: 'rgba(220,225,248,0.30)', letterSpacing: '0.07em' }}>OBSIDIA</span>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {['Services', 'Work', 'About', 'Careers'].map(l => (
          <span key={l} style={{ fontSize: '6px', fontFamily: 'var(--font-body), sans-serif', color: 'rgba(220,225,248,0.18)' }}>{l}</span>
        ))}
      </div>
      <span style={{ fontSize: '5.5px', fontFamily: 'var(--font-mono), monospace', color: 'rgba(220,225,248,0.14)', letterSpacing: '0.08em' }}>© 2024 OBSIDIA</span>
    </div>
  );
}

/* ── Animated browser build visual ───────────────────────── */
function BrowserBuildVisual() {
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 5), 1200);
    return () => clearInterval(id);
  }, [mounted]);

  const SECTIONS = [
    { id: 'nav',      flex: 0.85 },
    { id: 'hero',     flex: 3.8  },
    { id: 'features', flex: 2.6  },
    { id: 'cta',      flex: 1.1  },
    { id: 'footer',   flex: 0.75 },
  ] as const;

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0D0F1A', overflow: 'hidden' }}>
      {/* Gradient panel separator — left edge */}
      <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '1px', background: 'linear-gradient(180deg, rgba(61,82,230,0.0) 0%, rgba(61,82,230,0.5) 40%, rgba(123,79,212,0.4) 70%, rgba(61,82,230,0.0) 100%)', zIndex: 2 }} />
      {/* Cobalt ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(61,82,230,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(61,82,230,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '20px', left: '24px', fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.32)', zIndex: 1 }}>Website Preview</div>
      <div style={{ position: 'absolute', top: '22px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'statPulse 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.32)' }}>Building</span>
      </div>

      {/* Browser window */}
      <div style={{ position: 'absolute', inset: '52px 24px 28px', backgroundColor: '#0E1020', border: '1px solid rgba(61,82,230,0.2)', borderRadius: '4px', overflow: 'hidden', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease' }}>
        {/* Browser chrome */}
        <div style={{ height: '28px', backgroundColor: '#141628', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 14px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', opacity: 0.7 }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A2A38' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A2A38' }} />
          <div style={{ flex: 1, marginLeft: '12px', height: '14px', backgroundColor: '#1A1A18', borderRadius: '2px', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>yourbrand.com</span>
          </div>
        </div>

        {/* Website sections */}
        <div style={{ height: 'calc(100% - 28px)', display: 'flex', flexDirection: 'column' }}>
          {SECTIONS.map((section, i) => {
            const built = i <= phase;
            const isBuilding = i === phase;
            return (
              <div key={section.id} style={{ flex: section.flex, position: 'relative', overflow: 'hidden' }}>
                {/* Scan line — sweeps down as section renders */}
                {isBuilding && (
                  <motion.div
                    key={phase}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: 260, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(61,82,230,0.55) 20%, rgba(200,215,255,0.95) 50%, rgba(61,82,230,0.55) 80%, transparent 100%)',
                      boxShadow: '0 0 10px rgba(61,82,230,0.7), 0 0 4px rgba(200,215,255,0.5)',
                      zIndex: 20, pointerEvents: 'none',
                    }}
                  />
                )}
                {/* Content: fades in when built, ghost-dim when waiting */}
                <motion.div
                  animate={{ opacity: built ? 1 : 0.04 }}
                  transition={{ duration: 0.42, delay: isBuilding ? 0.22 : 0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  {section.id === 'nav'      && <SiteNavSection />}
                  {section.id === 'hero'     && <SiteHeroSection />}
                  {section.id === 'features' && <SiteFeaturesSection />}
                  {section.id === 'cta'      && <SiteCtaSection />}
                  {section.id === 'footer'   && <SiteFooterSection />}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress counter — kept from original */}
      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono), monospace', fontSize: '8px', color: 'rgba(61,82,230,0.45)', letterSpacing: '0.12em', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease 400ms' }}>
        {Math.min(phase + 1, 5)}/5 SECTIONS · {Math.min((phase + 1) * 20, 100)}% BUILT
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function WebsitesHero() {
  const CYCLE = ['win clients.', 'drive inquiries.', 'close deals.', 'build trust.', 'earns its keep.'];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % CYCLE.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section data-nav-theme="dark" id="web-hero" data-section-label="Overview" style={{ position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '92px' }} className="web-hero-grid">
      <div aria-hidden style={{ position: 'absolute', top: '92px', left: 0, right: 0, bottom: 0, width: '55%', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(61,82,230,0.09) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="web-hero-content" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px 80px 32px', maxWidth: '680px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ marginBottom: '28px' }}>
          <div className="section-label" style={{ color: 'var(--accent)' }}>Website Development</div>
        </motion.div>
        <h1 className="font-heading" style={{ fontSize: 'clamp(44px, 5.5vw, 82px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--dark-text)', marginBottom: '28px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <span style={{ display: 'block', marginBottom: '0.04em' }}>Your website</span>
            <span style={{ display: 'block', marginBottom: '0.04em' }}>should actually</span>
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'block', color: 'var(--accent)', fontStyle: 'italic' }}>
                {CYCLE[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.85 }} className="font-body" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8, color: 'var(--dark-muted)', maxWidth: '460px', marginBottom: '44px' }}>
          A slow, confusing, or outdated website costs you leads every day, and most businesses don&rsquo;t notice until a competitor takes them. We build websites that earn their keep.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <MagneticButton strength={0.22}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', backgroundColor: 'var(--accent)', padding: '14px 28px', borderRadius: '50px', transition: 'background-color 200ms ease' }}
              onMouseEnter={(e) => { (e.currentTarget).style.backgroundColor = 'var(--accent-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget).style.backgroundColor = 'var(--accent)'; }}>
              Start a Project <ArrowRight size={13} />
            </Link>
          </MagneticButton>
          <Link href="/approach" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dark-muted)', textDecoration: 'none', borderBottom: '1px solid var(--dark-border)', paddingBottom: '3px', transition: 'color 200ms ease, border-color 200ms ease' }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = 'var(--dark-text)'; el.style.borderColor = 'var(--dark-muted)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = 'var(--dark-muted)'; el.style.borderColor = 'var(--dark-border)'; }}>
            Our Process <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} style={{ position: 'relative', height: '100%', minHeight: '500px' }}>
        <BrowserBuildVisual />
      </motion.div>

      <style>{`
        @media (max-width: 1024px) { .web-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; } .web-hero-grid > div:last-child { display: none !important; } }
        @media (max-width: 600px) { .web-hero-content { padding: 72px 20px 48px 20px !important; } }
      `}</style>
    </section>
  );
}



/* ── Problem section — two-column layout ─────────────────── */
const WEB_PROBLEMS = [
  {
    n: '01',
    title: 'Slow sites do not lose visitors. They send them to competitors.',
    body: 'Every second of delay is a decision made without you. Most sites lose that argument before they finish loading.',
  },
  {
    n: '02',
    title: 'First impressions close deals before you do.',
    body: 'Buyers have already judged your business before they read a word. An outdated site is a closed door.',
  },
  {
    n: '03',
    title: 'Built for a business you no longer run.',
    body: 'The messaging, the structure, the calls to action. All written for a version of the company that has moved on.',
  },
];

/* ── Shared diagnostic design language ────────────────────── */

const EASE_OUT = [0.22, 1, 0.36, 1] as [number,number,number,number];
const EASE_IN  = [0.55, 0, 1, 0.45] as [number,number,number,number];

/* Severity palette — one language shared by the left widgets and the
   right console: cobalt baseline, amber strain, red failure */
const SEV = {
  healthy:  '#3D52E6',
  warning:  '#F59E0B',
  critical: '#EF4444',
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

/* Light instrument cell — frames each left widget so the three read as
   one diagnostic rig and inherit the console's severity bar motif */
function InstrumentCell({ active, small, children }: { active: boolean; small?: boolean; children: React.ReactNode }) {
  return (
    <div className="web-instr-cell" style={{
      width: '100%',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: small ? '6px 8px' : '8px 10px 8px',
      height: small ? 'auto' : '125px',
      minHeight: small ? '80px' : undefined,
      overflow: 'hidden',
      boxShadow: '0 1px 2px rgba(8,9,14,0.05), inset 0 1px 0 rgba(255,255,255,0.7)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative',
    }}>
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: active ? SEV.critical : SEV.healthy,
        opacity: active ? 0.95 : 0.45,
        boxShadow: active ? `0 0 10px ${SEV.critical}` : 'none',
        transition: 'background-color 500ms ease, opacity 500ms ease, box-shadow 500ms ease',
      }} />
      {children}
    </div>
  );
}

/* 01 — Dual bar: YOUR SITE drains, COMPETITOR fills */
function BarComparisonWidget({ active, small }: { active: boolean; small?: boolean }) {
  return (
    <div aria-hidden style={{ width: '100%' }}>
      {/* Visitor counts — move in opposite directions */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
        {/* YOUR SITE — drops */}
        <div style={{ flex: 1, height: '20px', position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={active ? 'sl' : 'sh'}
              initial={{ opacity: 0, y: active ? 10 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: active ? -10 : 10 }}
              transition={{ duration: active ? 0.65 : 0.5, ease: active ? EASE_IN : EASE_OUT }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono),monospace', fontSize: small ? '9px' : '11px', fontWeight: 700, color: active ? SEV.critical : 'rgba(61,82,230,0.8)' }}
            >
              {active ? '341' : '1,247'}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* COMPETITOR — rises */}
        <div style={{ flex: 1, height: '20px', position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={active ? 'ch' : 'cl'}
              initial={{ opacity: 0, y: active ? -10 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: active ? 10 : -10 }}
              transition={{ duration: active ? 0.65 : 0.5, ease: active ? EASE_IN : EASE_OUT }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono),monospace', fontSize: small ? '11px' : '14px', fontWeight: 700, color: active ? 'rgba(34,197,94,0.95)' : 'rgba(61,82,230,0.55)' }}
            >
              {active ? '1,831' : '891'}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Bars */}
      <div className="web-bar-comp" style={{ display: 'flex', gap: '6px', height: small ? '36px' : '50px', width: '100%', alignItems: 'flex-end' }}>
        {/* YOUR SITE — drains */}
        <div style={{ flex: 1, height: '100%', backgroundColor: 'rgba(61,82,230,0.07)', borderRadius: '3px 3px 0 0', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            animate={{ height: active ? '22%' : '65%' }}
            transition={{ duration: active ? 0.72 : 0.52, ease: active ? EASE_IN : EASE_OUT }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderRadius: '2px 2px 0 0', backgroundColor: active ? 'rgba(239,68,68,0.85)' : 'rgba(61,82,230,0.62)', transition: 'background-color 480ms ease' }}
          />
        </div>
        {/* COMPETITOR — fills */}
        <div style={{ flex: 1, height: '100%', backgroundColor: 'rgba(61,82,230,0.07)', borderRadius: '3px 3px 0 0', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            animate={{ height: active ? '78%' : '35%' }}
            transition={{ duration: active ? 0.72 : 0.52, ease: active ? EASE_IN : EASE_OUT }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderRadius: '2px 2px 0 0', backgroundColor: active ? 'rgba(34,197,94,0.78)' : 'rgba(61,82,230,0.42)', transition: 'background-color 480ms ease' }}
          />
        </div>
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
        {(['YOUR\nSITE', 'COMP'] as const).map(lbl => (
          <span key={lbl} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono),monospace', fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(13,17,71,0.42)', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}

/* 02 — Score dial: 92 → 24, TRUSTED → DISMISSED, COMPETITOR → YOUR SITE */
function ScoreDialWidget({ active, small }: { active: boolean; small?: boolean }) {
  const r = 40, cx = 50, cy = 50;
  const circ   = 2 * Math.PI * r;          // 251.33
  const arcLen = (200 / 360) * circ;       // 139.63
  const gapLen = circ - arcLen;            // 111.70
  const score  = active ? 24 : 92;
  const offset = arcLen * (1 - score / 100);
  const fillColor = active ? SEV.critical : '#22C55E';

  return (
    <div aria-hidden style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100%' }}>
      {/* Status word */}
      <AnimatePresence mode="wait">
        <motion.span
          key={active ? 'd' : 't'}
          initial={{ opacity: 0, y: active ? -6 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: active ? 0.26 : 0.95, ease: active ? EASE_IN : EASE_OUT }}
          style={{ fontFamily: 'var(--font-mono),monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: active ? SEV.critical : 'rgba(13,17,71,0.55)' }}
        >
          {active ? 'DISMISSED' : 'TRUSTED'}
        </motion.span>
      </AnimatePresence>

      {/* SVG gauge */}
      <div className="web-score-dial-wrap" style={{ position: 'relative', width: small ? '44px' : '60px', height: small ? '44px' : '60px' }}>
        <svg width={small ? '44' : '60'} height={small ? '44' : '60'} viewBox="0 0 100 100" overflow="visible">
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(61,82,230,0.12)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${arcLen} ${gapLen}`}
            style={{ transform: 'rotate(145deg)', transformOrigin: `${cx}px ${cy}px` }}
          />
          {/* Fill — CSS transition for directional timing */}
          <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth="6" strokeLinecap="round"
            stroke={fillColor}
            strokeDasharray={`${arcLen} ${gapLen}`}
            strokeDashoffset={offset}
            style={{
              transform: 'rotate(145deg)',
              transformOrigin: `${cx}px ${cy}px`,
              transition: active
                ? 'stroke-dashoffset 0.44s cubic-bezier(0.55,0,1,0.45), stroke 0.28s ease'
                : 'stroke-dashoffset 1.45s cubic-bezier(0.22,1,0.36,1), stroke 1.05s ease 0.18s',
            }}
          />
        </svg>
        {/* Score */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={active ? 'b' : 'g'}
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.84 }}
              transition={{ duration: active ? 0.24 : 0.9, ease: active ? EASE_IN : EASE_OUT }}
              style={{ fontFamily: 'var(--font-mono),monospace', fontSize: '8px', fontWeight: 700, lineHeight: 1, color: fillColor }}
            >
              {score}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Competitor / Your Site label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={active ? 'y' : 'c'}
          initial={{ opacity: 0, y: active ? -4 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: active ? 0.28 : 0.82, ease: active ? EASE_IN : EASE_OUT, delay: active ? 0.18 : 0 }}
          style={{ fontFamily: 'var(--font-mono),monospace', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: active ? 'rgba(239,68,68,0.65)' : 'rgba(61,82,230,0.55)' }}
        >
          {active ? 'YOUR SITE' : 'COMPETITOR'}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* 03 — Morphing layout: headline updates, surrounding frame stays frozen */
function MorphingLayoutWidget({ active, small }: { active: boolean; small?: boolean }) {
  return (
    <div aria-hidden className="web-morph-widget" style={{ width: '100%', height: small ? '48px' : '80px', maxWidth: '100%', backgroundColor: '#F5F5FA', border: '1px solid rgba(61,82,230,0.14)', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Frozen nav */}
      <div style={{ height: '20px', flexShrink: 0, backgroundColor: 'rgba(61,82,230,0.06)', borderBottom: '1px solid rgba(61,82,230,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
        <div style={{ width: '12px', height: '4px', backgroundColor: 'rgba(61,82,230,0.24)', borderRadius: '1px' }} />
        <div style={{ display: 'flex', gap: '4px' }}>
          {[14,11,8].map((w,i) => <div key={i} style={{ width: `${w}px`, height: '3px', backgroundColor: 'rgba(61,82,230,0.16)', borderRadius: '1px' }} />)}
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, padding: '-4px -4px -4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Morphing headline */}
        <div style={{ height: '20px', position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={active ? 'stale' : 'fresh'}
              initial={{ opacity: 0, y: active ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: active ? -8 : 8 }}
              transition={{ duration: 0.38, ease: EASE_OUT }}
              style={{
                position: 'absolute', display: 'flex', alignItems: 'center', inset: 0,
                fontFamily: 'var(--font-mono),monospace',
                fontSize: '7px',
                fontWeight: active ? 400 : 700,
                letterSpacing: active ? '0.01em' : '0.10em',
                textTransform: 'uppercase',
                color: active ? 'rgba(13,17,71,0.58)' : 'rgba(13,17,71,0.85)',
                whiteSpace: 'nowrap',
              }}
            >
              {active ? 'Est. 2014 · Your Partner in Excellence' : 'RESULTS. DELIVERED.'}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Frozen sub-line */}
        <div style={{ width: '56px', height: '3px', backgroundColor: 'rgba(61,82,230,0.12)', borderRadius: '1px' }} />

        {/* Frozen CTA — fixed size regardless of headline length */}
        <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
          <div style={{ width: '34px', height: '9px', backgroundColor: 'rgba(61,82,230,0.26)', borderRadius: '1.5px' }} />
          <div style={{ width: '20px', height: '9px', backgroundColor: 'rgba(61,82,230,0.09)', borderRadius: '1.5px' }} />
        </div>

        {/* Frozen 3-col blocks */}
        <div style={{ display: 'flex', gap: '4px', marginTop: 'auto' }}>
          {[1,1,1].map((_,i) => <div key={i} style={{ flex: 1, height: '18px', backgroundColor: 'rgba(61,82,230,0.05)', border: '1px solid rgba(61,82,230,0.09)', borderRadius: '1.5px' }} />)}
        </div>
      </div>
    </div>
  );
}

const PROB_WIDGETS = [BarComparisonWidget, ScoreDialWidget, MorphingLayoutWidget];

/* ── Problem item row — generous, instrument-framed widgets ─── */
function ProblemItem({
  item, index, isMobile,
}: {
  item: typeof WEB_PROBLEMS[0]; index: number; isMobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Widget = PROB_WIDGETS[index];
  const isLast = index === WEB_PROBLEMS.length - 1;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={{
        hidden: { opacity: 0, x: -24 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.68, ease: EASE_OUT } },
      }}
      className="web-prob-item"
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '100px 1fr' : '160px 1fr',
        gap: isMobile ? '12px' : '22px',
        alignItems: 'center',
        paddingBottom: isLast ? 0 : '14px',
        marginBottom: isLast ? 0 : '14px',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        cursor: 'default',
      }}
    >
      {/* Number + widget column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', width: isMobile ? '100px' : '120px' }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.18em', color: 'var(--accent)',
        }}>
          {item.n}
        </span>
        <InstrumentCell active={hovered} small={isMobile}>
          <Widget active={hovered} small={isMobile} />
        </InstrumentCell>
      </div>

      {/* Text column */}
      <div>
        {/* Title: shifts + cobalt underline draws on hover */}
        <div style={{ position: 'relative', marginBottom: '14px', display: 'inline-block' }}>
          <h3 className="font-heading" style={{
            fontSize: isMobile ? '14px' : 'clamp(15px, 1.5vw, 21px)',
            fontWeight: 500, letterSpacing: '-0.025em',
            color: 'var(--text)', lineHeight: 1.1,
            transform: hovered ? 'translateX(6px)' : 'translateX(0)',
            transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
          }}>
            {item.title}
          </h3>
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            transition={{
              scaleX: { duration: hovered ? 0.46 : 0.32, ease: hovered ? EASE_OUT : EASE_IN },
              opacity: { duration: 0.18 },
            }}
            style={{
              position: 'absolute', bottom: '-4px', left: 0,
              width: '100%', height: '2px',
              backgroundColor: 'var(--accent)',
              transformOrigin: 'left center',
            }}
          />
        </div>
        <p className="font-body" style={{
          fontSize: isMobile ? '12px' : '13px', lineHeight: 1.55,
          color: 'var(--text-secondary)', margin: 0, maxWidth: '54ch',
        }}>
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Live Diagnostic — event stream + degrading vitals ──────── */
type LogEvent = { id: number; ts: string; type: 'BOUNCE' | 'ABANDONED' | 'TIMEOUT' | 'EXIT'; path: string };

const SEED_EVENTS: LogEvent[] = [
  { id: 5, ts: '09:44:12', type: 'BOUNCE',    path: '/services'  },
  { id: 4, ts: '09:44:08', type: 'ABANDONED', path: '/contact'   },
  { id: 3, ts: '09:44:01', type: 'TIMEOUT',   path: '/products'  },
  { id: 2, ts: '09:43:55', type: 'EXIT',      path: '/'          },
  { id: 1, ts: '09:43:50', type: 'BOUNCE',    path: '/pricing'   },
];

function LiveDiagnosticCard(_: { visible: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [rev, setRev] = useState(14480);
  const [bump, setBump] = useState(0);
  const [tick, setTick] = useState(0);
  const [events, setEvents] = useState<LogEvent[]>(SEED_EVENTS);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: false, amount: 0.15 });
  const eidRef = useRef(100);

  useEffect(() => {
    const TYPES: LogEvent['type'][] = ['BOUNCE', 'ABANDONED', 'TIMEOUT', 'EXIT', 'BOUNCE', 'EXIT'];
    const PATHS = ['/services', '/pricing', '/contact', '/', '/about', '/solutions'];
    const id = setInterval(() => {
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
      setRev(r => r + Math.floor(Math.random() * 28 + 14));
      setBump(b => b + 1);
      setTick(t => (t >= 20 ? 0 : t + 1));
      setEvents(prev => [{
        id: eidRef.current++,
        ts,
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        path: PATHS[Math.floor(Math.random() * PATHS.length)],
      }, ...prev.slice(0, 6)]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const p = tick / 20;
  const bounceRate = 44 + (78 - 44) * p;
  const convRate   = 3.4 - (3.4 - 0.8) * p;
  const loadTime   = 1.3 + (4.2 - 1.3) * p;

  const typeColor = (t: LogEvent['type']) => (t === 'BOUNCE' || t === 'EXIT') ? '#EF4444' : '#F59E0B';

  const vitals = [
    { label: 'BOUNCE RATE', val: `${bounceRate.toFixed(0)}%`, bar: 28 + 62 * p, col: '#EF4444' },
    { label: 'CONVERSION',  val: `${convRate.toFixed(1)}%`,   bar: 72 - 60 * p, col: '#EF4444' },
    { label: 'LOAD TIME',   val: `${loadTime.toFixed(1)}s`,   bar: 16 + 74 * p, col: '#F59E0B' },
  ];

  return (
    <motion.div
      ref={cardRef}
      className="web-diag-card"
      animate={{ opacity: cardInView ? 1 : 0 }}
      transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '100%',
        height: 'calc(100dvh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        background: '#06080F',
        border: '1px solid rgba(61,82,230,0.18)',
        borderRadius: '14px',
        position: 'relative', overflow: 'hidden',
        fontFamily: 'var(--font-mono), monospace',
        boxShadow: '0 0 0 1px rgba(61,82,230,0.08), 0 8px 32px rgba(6,8,15,0.72), 0 32px 64px rgba(61,82,230,0.14)',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(120,130,200,0.045) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />
      {/* Scan lines */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)', pointerEvents: 'none' }} />
      {/* Corner glows */}
      <div aria-hidden style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 65%)', filter: 'blur(28px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-50px', left: '-30px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(61,82,230,0.10) 0%, transparent 65%)', filter: 'blur(32px)', pointerEvents: 'none' }} />

      {/* Title bar */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.055)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {(['#EF4444', '#F59E0B', '#22C55E'] as const).map((c, i) => (
            <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: i === 2 ? 0.4 : 0.8 }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          {/* Sonar-ping live indicator */}
          <span style={{ position: 'relative', width: '6px', height: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <motion.span
              animate={reduced ? {} : { scale: [1, 3.8], opacity: [0.65, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0 }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid #22C55E', transformOrigin: 'center' }}
            />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px rgba(34,197,94,0.85)', zIndex: 1 }} />
          </span>
          <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(34,197,94,0.75)' }}>
            LIVE AUDIT
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        {/* Revenue accumulator */}
        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <div style={{ fontSize: '8.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.5)', marginBottom: '8px' }}>
            EST. REVENUE LOST — THIS MONTH
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <motion.span
              key={bump}
              initial={reduced ? false : { color: '#FF8888' }}
              animate={{ color: '#EF4444' }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              style={{ fontSize: 'clamp(32px, 3.2vw, 46px)', fontWeight: 500, color: '#EF4444', letterSpacing: '-0.03em', lineHeight: 1, fontFamily: 'var(--font-heading), serif', textShadow: '0 0 28px rgba(239,68,68,0.3)' }}
            >
              ${rev.toLocaleString()}
            </motion.span>
            <div>
              <div style={{ fontSize: '9px', color: 'rgba(239,68,68,0.55)', letterSpacing: '0.08em' }}>↑ +$21 / 1.4s</div>
              <div style={{ fontSize: '8px', color: 'rgba(239,68,68,0.3)', letterSpacing: '0.06em', marginTop: '2px' }}>ACCUMULATING</div>
            </div>
          </div>
        </div>

        {/* Event stream — flex: 1 so it fills remaining height */}
        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ fontSize: '8.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(120,130,200,0.45)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span>EVENT STREAM</span>
            <span style={{ flex: 1, height: '1px', background: 'rgba(120,130,200,0.12)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', overflow: 'hidden', flex: 1 }}>
            <AnimatePresence initial={false}>
              {events.map((ev, idx) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1 - idx * 0.13, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', lineHeight: 1, padding: '3px 0' }}
                >
                  <span style={{ color: 'rgba(120,130,200,0.3)', flexShrink: 0, letterSpacing: '0.04em', fontSize: '10px' }}>{ev.ts}</span>
                  <span style={{ color: typeColor(ev.type), letterSpacing: '0.1em', minWidth: '72px', flexShrink: 0, textShadow: `0 0 9px ${typeColor(ev.type)}55`, fontWeight: 600 }}>{ev.type}</span>
                  <span style={{ color: 'rgba(220,225,248,0.28)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.path}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Vitals */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: '8.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(120,130,200,0.45)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>SITE VITALS</span>
            <span style={{ flex: 1, height: '1px', background: 'rgba(120,130,200,0.12)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {vitals.map(v => (
              <div key={v.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(120,130,200,0.42)' }}>{v.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: v.col, textShadow: `0 0 10px ${v.col}55` }}>{v.val}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${v.bar}%`, background: `linear-gradient(90deg, ${v.col}66, ${v.col})`, borderRadius: '2px', boxShadow: `0 0 6px ${v.col}88`, transition: 'width 1.4s cubic-bezier(0.22,1,0.36,1)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ── Two-column problem section ───────────────────────────── */
function WebStickyProblem() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: false, amount: 0.05 });
  const labelRef = useRef<HTMLDivElement>(null);
  const labelInView = useInView(labelRef, { once: false, amount: 0.5 });
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, { once: false, amount: 0.45 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth <= 768); }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="web-problem"
      data-section-label="Where Most Sites Fail"
      data-nav-theme="light"
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        className="web-prob-outer"
        style={{
          width: '100%',
          height: '100%',
          padding: '40px 40px 40px 52px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* ── Left — fills remaining width ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, paddingTop: '40px' }}>

          {/* Section label */}
          <motion.div
            ref={labelRef}
            animate={{ opacity: labelInView ? 1 : 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ marginBottom: '8px' }}
          >
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              Where Most Sites Fail
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            ref={headlineRef}
            animate={{ opacity: headlineInView ? 1 : 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            style={{ marginBottom: '14px' }}
          >
            <h2 className="font-heading" style={{
              fontSize: 'clamp(28px, 3.2vw, 46px)',
              fontWeight: 500, letterSpacing: '-0.042em',
              color: 'var(--text)', lineHeight: 0.96,
            }}>
              The site is live.
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                The leads are not.
              </em>
            </h2>
          </motion.div>

          {/* Problem items */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } } }}
          >
            {WEB_PROBLEMS.map((p, i) => (
              <ProblemItem key={i} item={p} index={i} isMobile={isMobile} />
            ))}
          </motion.div>
        </div>

        {/* ── Right — Live Diagnostic card, full height ── */}
        <div className="web-sticky-right" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', alignSelf: 'stretch', paddingTop: '70px' }}>
          <LiveDiagnosticCard visible={visible} />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .web-prob-outer {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
            padding: 64px 40px !important;
          }
        }
        @media (max-width: 768px) {
          .web-diag-card { display: none !important; }
          .web-sticky-right { display: none !important; }
          #web-problem { height: auto !important; overflow: visible !important; }
          .web-prob-outer { height: auto !important; }
        }
        @media (max-width: 640px) {
          .web-prob-outer { padding: 48px 20px !important; }
          .web-prob-item {
            grid-template-columns: 80px 1fr !important;
            gap: 12px !important;
            align-items: center !important;
          }
          .web-prob-item > div:first-child { width: 80px !important; }
          .web-instr-cell { height: auto !important; padding: 6px 8px !important; min-height: 0 !important; }
          .web-bar-comp { height: 32px !important; }
          .web-score-dial-wrap { width: 38px !important; height: 38px !important; }
          .web-score-dial-wrap svg { width: 100% !important; height: 100% !important; }
          .web-morph-widget { height: 40px !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Services grid with wireframe card backgrounds ────────── */
const WEB_SERVICES = [
  { n: '01', tag: 'Conversion', title: 'Landing Pages', body: 'Fast, focused pages with one job: get visitors to act.' },
  { n: '02', tag: 'Corporate',  title: 'Corporate & Brand Sites', body: 'Ranks where it should, handles real traffic, and moves visitors to the right place.' },
  { n: '03', tag: 'Commerce',   title: 'E-Commerce', body: 'Built around how buyers actually behave, with a backend your team can manage.' },
  { n: '04', tag: 'Applications', title: 'Web Applications', body: 'Browser-based tools built entirely around your workflow, not a generic template.' },
];

/* ── Services: equal-width four-card horizontal grid ────────── */

/* Decorative art — unique motif per card, sits in the open middle area */
function FunnelArt({ hov }: { hov: boolean }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" width="100%" style={{
      opacity: hov ? 0.24 : 0.07,
      transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)',
    }}>
      <path d="M16 18 L144 18 L96 58 L96 102 L64 102 L64 58 Z" stroke="white" strokeWidth="1" fill="none"/>
      <line x1="16" y1="18" x2="144" y2="18" stroke="white" strokeWidth="0.6"/>
      <line x1="30" y1="34" x2="130" y2="34" stroke="white" strokeWidth="0.5"/>
      <line x1="46" y1="50" x2="114" y2="50" stroke="white" strokeWidth="0.4"/>
      <rect x="70" y="74" width="20" height="14" rx="2" stroke="white" strokeWidth="0.8"/>
    </svg>
  );
}

function BrowserArt({ hov }: { hov: boolean }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" width="100%" style={{
      opacity: hov ? 0.24 : 0.07,
      transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)',
    }}>
      <rect x="10" y="10" width="140" height="100" rx="3" stroke="white" strokeWidth="1"/>
      <line x1="10" y1="30" x2="150" y2="30" stroke="white" strokeWidth="0.8"/>
      <circle cx="23" cy="20" r="3" stroke="white" strokeWidth="0.7"/>
      <circle cx="35" cy="20" r="3" stroke="white" strokeWidth="0.7"/>
      <circle cx="47" cy="20" r="3" stroke="white" strokeWidth="0.7"/>
      <rect x="18" y="42" width="124" height="10" rx="1" stroke="white" strokeWidth="0.6"/>
      <rect x="18" y="60" width="84" height="8" rx="1" stroke="white" strokeWidth="0.5"/>
      <rect x="18" y="76" width="52" height="18" rx="2" stroke="white" strokeWidth="0.8"/>
    </svg>
  );
}

function ProductGridArt({ hov }: { hov: boolean }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" width="100%" style={{
      opacity: hov ? 0.24 : 0.07,
      transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)',
    }}>
      {([0,1,2] as number[]).map(col => ([0,1] as number[]).map(row => (
        <rect key={`${col}-${row}`}
          x={10 + col * 50} y={8 + row * 56}
          width="44" height="50" rx="2"
          stroke="white" strokeWidth="0.8"
        />
      )))}
      <rect x="10" y="106" width="140" height="5" rx="1" stroke="white" strokeWidth="0.5"/>
    </svg>
  );
}

function DashboardArt({ hov }: { hov: boolean }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" width="100%" style={{
      opacity: hov ? 0.24 : 0.07,
      transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)',
    }}>
      <rect x="10" y="10" width="44" height="100" rx="2" stroke="white" strokeWidth="0.7"/>
      <rect x="62" y="10" width="88" height="46" rx="2" stroke="white" strokeWidth="0.9"/>
      <rect x="62" y="64" width="40" height="46" rx="2" stroke="white" strokeWidth="0.6"/>
      <rect x="110" y="64" width="40" height="46" rx="2" stroke="white" strokeWidth="0.6"/>
      <line x1="70" y1="26" x2="142" y2="26" stroke="white" strokeWidth="0.5"/>
      <line x1="70" y1="38" x2="118" y2="38" stroke="white" strokeWidth="0.4"/>
    </svg>
  );
}

const CARD_ARTS = [FunnelArt, BrowserArt, ProductGridArt, DashboardArt];

function ServiceCard({
  s, index, isMobile = false, isExpanded = false, onToggle,
}: {
  s: typeof WEB_SERVICES[0]; index: number;
  isMobile?: boolean; isExpanded?: boolean; onToggle?: () => void;
}) {
  const [hov, setHov] = useState(false);
  const Art = CARD_ARTS[index];
  const scRef = useRef<HTMLDivElement>(null);
  const scInView = useInView(scRef, { once: false, amount: 0.2 });

  /* ── Mobile accordion ─── */
  if (isMobile) {
    return (
      <div
        ref={scRef}
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Collapsed header — always visible */}
        <div
          onClick={onToggle}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 20px', cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontFamily: 'var(--font-mono), monospace', fontSize: '10px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: isExpanded ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
              transition: 'color 280ms ease', flexShrink: 0,
            }}>{s.n}</span>
            <h3 className="font-heading" style={{
              fontSize: 'clamp(18px, 4.5vw, 22px)',
              fontWeight: 500, letterSpacing: '-0.02em',
              color: 'var(--dark-text)', lineHeight: 1.1, margin: 0,
            }}>{s.title}</h3>
          </div>
          <span style={{
            fontFamily: 'var(--font-mono), monospace', fontSize: '20px', lineHeight: 1,
            color: isExpanded ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
            transform: isExpanded ? 'rotate(45deg)' : 'none',
            transition: 'color 280ms ease, transform 280ms cubic-bezier(0.22,1,0.36,1)',
            flexShrink: 0,
          }}>+</span>
        </div>

        {/* Expandable body — grid-template-rows transition */}
        <div style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 350ms cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 20px 28px' }}>
              <div style={{ height: '100px', marginBottom: '16px' }}>
                <Art hov={true} />
              </div>
              <p className="font-body" style={{
                fontSize: '14px', lineHeight: 1.78,
                color: 'rgba(220,225,248,0.62)', margin: 0,
              }}>{s.body}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop (unchanged) ─── */
  return (
    <motion.div
      ref={scRef}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      animate={{ opacity: scInView ? 1 : 0 }}
      transition={{ duration: 0.68, ease: [0.25, 1, 0.5, 1] as [number,number,number,number], delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
      style={{
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        padding: '28px 26px 26px',
        backgroundColor: hov ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.028)',
        borderRadius: '16px',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'background-color 320ms cubic-bezier(0.25,1,0.5,1), border-color 320ms cubic-bezier(0.25,1,0.5,1)',
        cursor: 'default',
        minHeight: '420px',
      }}
    >
      {/* Top: number + tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: hov ? 'var(--accent)' : 'rgba(255,255,255,0.22)',
          transition: 'color 280ms cubic-bezier(0.25,1,0.5,1)',
        }}>{s.n}</span>
        <span style={{
          fontFamily: 'var(--font-mono), monospace', fontSize: '8px',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(220,225,248,0.28)',
        }}>{s.tag}</span>
      </div>

      {/* Title */}
      <h3 className="font-heading" style={{
        fontSize: 'clamp(17px, 1.8vw, 24px)',
        fontWeight: 500, letterSpacing: '-0.02em',
        color: 'var(--dark-text)', lineHeight: 1.1,
        margin: 0, position: 'relative', zIndex: 1,
      }}>{s.title}</h3>

      {/* Art — flex middle, open breathing room */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '28px 0 20px', position: 'relative', zIndex: 1,
      }}>
        <Art hov={hov} />
      </div>

      {/* Bottom: body text + hover reveal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="font-body" style={{
          fontSize: '13px', lineHeight: 1.78,
          color: 'rgba(220,225,248,0.48)',
          margin: 0,
        }}>{s.body}</p>

        <motion.span
          animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 6 }}
          transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] as [number,number,number,number], delay: hov ? 0.07 : 0 }}
          style={{
            display: 'block', marginTop: '14px',
            fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(61,82,230,0.72)',
          }}
        >
          Explore →
        </motion.span>
      </div>

      <motion.div
        animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{
          scaleX: { duration: hov ? 0.52 : 0.24, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
          opacity: { duration: 0.14 },
        }}
        style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '100%', height: '1px',
          backgroundColor: 'rgba(61,82,230,0.4)',
          transformOrigin: 'left center', pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

function WebServicesGrid() {
  const gridHdrRef = useRef<HTMLDivElement>(null);
  const gridHdrInView = useInView(gridHdrRef, { once: false, amount: 0.4 });
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return (
    <section
      id="web-services"
      data-section-label="What We Design"
      style={{
        backgroundColor: 'var(--dark-bg)',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        padding: '80px 32px 96px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '40%',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(61,82,230,0.08) 0%, transparent 65%)',
        pointerEvents: 'none', transform: 'translate(-50%, -50%)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          ref={gridHdrRef}
          animate={{ opacity: gridHdrInView ? 1 : 0 }}
          transition={{ duration: 0.72, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
          style={{ marginBottom: '52px' }}
        >
          <div style={{
            fontFamily: 'var(--font-body), sans-serif', fontSize: '9px',
            fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--accent)', border: '1px solid rgba(61,82,230,0.25)',
            padding: '5px 12px', display: 'inline-block', marginBottom: '24px',
          }}>What We Design</div>

          <h2 className="font-heading" style={{
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 500, letterSpacing: '-0.044em',
            color: 'var(--dark-text)', lineHeight: 0.94,
          }}>
            Four formats.<br />
            <em style={{ fontStyle: 'italic' }}>Built to win.</em>
          </h2>
        </motion.div>

        {/* Equal 4-column grid */}
        <div
          className="web-svc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          {WEB_SERVICES.map((s, i) => (
            <ServiceCard
              key={s.n} s={s} index={i}
              isMobile={isMobile}
              isExpanded={expandedIndex === i}
              onToggle={() => setExpandedIndex(prev => prev === i ? null : i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .web-svc-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          #web-services { padding: 48px 20px !important; }
          .web-svc-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
        @media (max-width: 560px) {
          .web-svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Process section — milestone tracker ──────────────────── */
const WEB_PHASES = [
  {
    n: '01', title: 'Audit', tag: 'Discovery', time: '~1 wk',
    detail: 'We audit your current site, map what\'s costing you conversions, and define the goal before we touch design. You get a prioritised improvement brief.',
    deliverable: 'Conversion & performance audit report',
    accent: 'rgba(61,82,230,0.07)',
  },
  {
    n: '02', title: 'Wireframing', tag: 'Structure', time: '~1 wk',
    detail: 'We wireframe every key page and present the information architecture for your sign-off. Nothing is designed until the structure is agreed.',
    deliverable: 'Signed-off page wireframes',
    accent: 'rgba(61,82,230,0.05)',
  },
  {
    n: '03', title: 'Build', tag: 'Development', time: '~3 wks',
    detail: 'Development against a staging environment that mirrors production. Every page is performance-tested and reviewed across devices before handoff.',
    deliverable: 'Tested, optimised website',
    accent: 'rgba(61,82,230,0.07)',
  },
  {
    n: '04', title: 'Launch', tag: 'Delivery', time: '~1 wk',
    detail: 'We handle deployment, configure analytics and performance monitoring, and train your team on content management. First 30 days of fixes included.',
    deliverable: 'Live site with 30-day support',
    accent: 'rgba(61,82,230,0.05)',
  },
];

function WebPhaseRow({ phase, index, visible, isLast }: { phase: typeof WEB_PHASES[0]; index: number; visible: boolean; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr',
        gap: '0 28px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 600ms ease ${index * 120 + 300}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 120 + 300}ms`,
      }}
      className="web-phase-row"
    >
      {/* Left rail */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2px' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.1em', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease', marginBottom: '10px' }}>{phase.n}</span>
        <div style={{
          width: '9px', height: '9px',
          backgroundColor: 'var(--accent)',
          transform: `rotate(45deg) scale(${hov ? 1.4 : 1})`,
          transition: 'transform 200ms ease',
          flexShrink: 0,
          zIndex: 2,
        }} />
        {!isLast && (
          <div style={{ flex: 1, width: '1px', backgroundColor: 'var(--border)', marginTop: '8px', minHeight: '40px' }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{ paddingBottom: isLast ? '0' : '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease' }}>{phase.tag}</span>
          <span style={{ width: '1px', height: '8px', backgroundColor: 'var(--border)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--muted)' }}>{phase.time}</span>
        </div>
        <h3 className="font-heading" style={{ fontSize: 'clamp(24px, 2.4vw, 34px)', fontWeight: 500, letterSpacing: '-0.02em', color: hov ? 'var(--accent)' : 'var(--text)', lineHeight: 1.1, marginBottom: '14px', transition: 'color 200ms ease' }}>{phase.title}</h3>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '560px', marginBottom: '16px' }}>{phase.detail}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease' }}>Deliverable:</span>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{phase.deliverable}</span>
        </div>
      </div>
    </div>
  );
}

function WebProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: false, amount: 0.06 });
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="web-process" data-section-label="How We Work" style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'flex-end', marginBottom: '0', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 600ms ease, transform 600ms ease' }} className="web-proc-hdr">
          <div>
            <div className="section-label" style={{ marginBottom: '20px' }}>How We Work</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--text)', lineHeight: 1.05 }}>
              From first call to a launched website.
            </h2>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: '4px' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>4–6 wks</div>
            <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '4px' }}>first call to launch</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '48px auto 80px', padding: '0 32px' }}>
        {WEB_PHASES.map((p, i) => (
          <WebPhaseRow key={i} phase={p} index={i} visible={visible} isLast={i === WEB_PHASES.length - 1} />
        ))}
      </div>
      <style>{`@media (max-width: 640px) { .web-proc-hdr { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function WebsitesClient() {
  return (
    <>
      <WebsitesHero />
      <WebStickyProblem />
      <WebServicesGrid />
      <CTABand />
    </>
  );
}
