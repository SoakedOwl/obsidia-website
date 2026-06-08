'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ArrowRight, ChevronDown, Mail, Check, X } from 'lucide-react';


/* ── Service item type ─────────────────────────────────────── */
type ServiceItem = { label: string; href: string; tag: string; desc: string };

/* ── Scroll to top (smooth) ────────────────────────────────── */
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ── Active-tab background — white-on-blue treatment ───────── */
const ACTIVE_TAB_BG: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(255,255,255,0.18)',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.28)',
};

/* ─────────────────────────────────────────────────────────────
   Animated hamburger icon — unchanged
───────────────────────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  const base: React.CSSProperties = {
    display: 'block',
    width: '20px',
    height: '1.5px',
    backgroundColor: 'currentColor',
    transition: 'transform 320ms cubic-bezier(0.76,0,0.24,1), opacity 200ms ease',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '20px' }}>
      <span style={{ ...base, transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
      <span style={{ ...base, opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }} />
      <span style={{ ...base, transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Desktop nav link — white text on blue bar, active tab highlight
───────────────────────────────────────────────────────────── */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <div style={{ position: 'relative' }}>
      {active && (
        <motion.div
          layoutId="nav-active-bg"
          style={ACTIVE_TAB_BG}
          transition={{ type: 'spring', stiffness: 400, damping: 38 }}
        />
      )}
      <Link
        href={href}
        onClick={active ? (e) => { e.preventDefault(); scrollToTop(); } : undefined}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          color: '#ffffff',
          textDecoration: 'none',
          padding: '9px 14px',
          opacity: active ? 1 : 0.7,
          whiteSpace: 'nowrap',
          transition: 'opacity 180ms ease',
        }}
        onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
      >
        {label}
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services nav trigger — pure trigger, matches NavLink structure
───────────────────────────────────────────────────────────── */
function ServicesNavItem({
  pathname, label, open, onEnter, onLeave,
}: {
  pathname: string;
  label: string;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const isActive = pathname.startsWith('/services');
  return (
    <div style={{ position: 'relative' }}>
      {isActive && (
        <motion.div
          layoutId="nav-active-bg"
          style={ACTIVE_TAB_BG}
          transition={{ type: 'spring', stiffness: 400, damping: 38 }}
        />
      )}
      <Link
        href="/services"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={pathname === '/services' ? (e) => { e.preventDefault(); scrollToTop(); } : undefined}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          color: '#ffffff',
          textDecoration: 'none',
          padding: '9px 14px',
          opacity: isActive || open ? 1 : 0.7,
          whiteSpace: 'nowrap',
          transition: 'opacity 180ms ease',
        }}
        onMouseEnter={(e) => {
          onEnter();
          if (!isActive && !open) (e.currentTarget as HTMLElement).style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          onLeave();
          if (!isActive && !open) (e.currentTarget as HTMLElement).style.opacity = '0.7';
        }}
      >
        {label}
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Dashed-frame service icons (15×15 px)
───────────────────────────────────────────────────────────── */
function AutomationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="0.5"  y="5.5"  width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.3 0.9"/>
      <rect x="6"    y="0.5"  width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.3 0.9"/>
      <rect x="11.5" y="5.5"  width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.3 0.9"/>
      <path d="M4.5 7.5H6M10 2.5H11.5M10 7.5H11.5" stroke="currentColor" strokeWidth="0.75"/>
      <path d="M8 4.5V5.5"                           stroke="currentColor" strokeWidth="0.75"/>
      <path d="M2.5 9.5V12.5H7.5"                   stroke="currentColor" strokeWidth="0.75"/>
      <path d="M13.5 9.5V12.5H8.5"                  stroke="currentColor" strokeWidth="0.75"/>
      <circle cx="8" cy="12.5" r="1" stroke="currentColor" strokeWidth="0.75"/>
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="0.5" y="1.5" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 0.9"/>
      <path d="M0.5 5H15.5M4 1.5V5"                stroke="currentColor" strokeWidth="0.75"/>
      <rect x="2"   y="7"   width="5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="0.75"/>
      <path d="M9 8H14M9 10.5H12.5M2 12.5H14"      stroke="currentColor" strokeWidth="0.75"/>
    </svg>
  );
}

function AppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="4.5" y="0.5" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="0.8"  strokeDasharray="1.5 0.9"/>
      <rect x="1"   y="4"   width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="0.75"/>
      <rect x="6"   y="9"   width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="0.8"  strokeDasharray="1.5 0.9"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual service card
───────────────────────────────────────────────────────────── */
function ServiceCard({
  item, icon, isActive,
}: {
  item: ServiceItem;
  icon: React.ReactNode;
  isActive: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 18px',
        minHeight: '84px',
        borderRadius: '8px',
        backgroundColor: isActive
          ? 'rgba(61,82,230,0.12)'
          : hov
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(255,255,255,0.042)',
        border: `1px solid ${
          isActive
            ? 'rgba(61,82,230,0.24)'
            : hov
            ? 'rgba(255,255,255,0.12)'
            : 'rgba(255,255,255,0.06)'}`,
        textDecoration: 'none',
        transition: 'background-color 220ms ease, border-color 220ms ease',
      }}
    >
      {/* Top: icon + tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{
          display: 'flex',
          color: isActive ? 'var(--accent)' : hov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)',
          transition: 'color 220ms ease',
        }}>
          {icon}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isActive ? 'rgba(61,82,230,0.80)' : hov ? 'var(--accent)' : 'rgba(255,255,255,0.22)',
          transition: 'color 220ms ease',
        }}>
          {item.tag}
        </span>
      </div>
      {/* Service name */}
      <span style={{
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        fontSize: '19px',
        fontWeight: 500,
        letterSpacing: '-0.015em',
        lineHeight: 1.15,
        color: isActive ? '#fff' : hov ? '#fff' : 'rgba(220,225,248,0.60)',
        transition: 'color 220ms ease',
      }}>
        {item.label}
      </span>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services dropdown — 2×2 card grid
   Row 1: Automation | Websites
   Row 2: Apps       | View All (accent CTA)
───────────────────────────────────────────────────────────── */
function ServicesDropdownContent({
  pathname, items, viewAll,
}: {
  pathname: string;
  items: ServiceItem[];
  viewAll: string;
}) {
  const [viewAllHov, setViewAllHov] = useState(false);
  const ICONS = [<AutomationIcon key="a" />, <WebIcon key="w" />, <AppIcon key="p" />];

  return (
    <div
      role="region"
      aria-label="Services menu"
      style={{
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6px',
      }}
    >
      {items.map((item, i) => (
        <ServiceCard
          key={item.href}
          item={item}
          icon={ICONS[i]}
          isActive={pathname.startsWith(item.href)}
        />
      ))}

      {/* 4th slot — View All CTA card */}
      <Link
        href="/services"
        onMouseEnter={() => setViewAllHov(true)}
        onMouseLeave={() => setViewAllHov(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px 18px',
          minHeight: '84px',
          borderRadius: '8px',
          backgroundColor: viewAllHov ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.042)',
          border: `1px solid ${viewAllHov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
          textDecoration: 'none',
          transition: 'background-color 220ms ease, border-color 220ms ease',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: viewAllHov ? 'var(--accent)' : 'rgba(255,255,255,0.22)',
          transition: 'color 220ms ease',
        }}>
          Overview
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '19px',
            fontWeight: 500,
            letterSpacing: '-0.015em',
            color: viewAllHov ? '#fff' : 'rgba(220,225,248,0.60)',
            transition: 'color 220ms ease',
          }}>
            {viewAll}
          </span>
          <ArrowRight
            size={11}
            style={{
              color: viewAllHov ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)',
              transform: viewAllHov ? 'translateX(3px)' : 'translateX(0)',
              transition: 'color 220ms ease, transform 220ms ease',
              flexShrink: 0,
            }}
          />
        </div>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mobile full-screen menu — unchanged
───────────────────────────────────────────────────────────── */
function MobileMenu({
  open,
  pathname,
  links,
  serviceItems,
  allServicesLabel,
  companyLabel,
  youAreHereLabel,
  onClose,
}: {
  open: boolean;
  pathname: string;
  links: { label: string; href: string }[];
  serviceItems: ServiceItem[];
  allServicesLabel: string;
  companyLabel: string;
  onClose: () => void;
  youAreHereLabel: string;
}) {
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => { if (!open) setServicesOpen(false); }, [open]);

  const currentPage = links.find((l) =>
    l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
  )?.label ?? 'Home';

  return (
    <div
      aria-hidden={!open}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        backgroundColor: '#0D0D0D',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 440ms cubic-bezier(0.76,0,0.24,1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #1A1A18 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        opacity: 0.7, pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '-100px', left: '-60px',
        width: '380px', height: '380px',
        background: 'radial-gradient(circle, rgba(61,82,230,0.10) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
        backgroundColor: 'var(--accent)',
        transform: open ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 560ms cubic-bezier(0.76,0,0.24,1) 80ms',
      }} />
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        height: '100%',
        padding: '96px 40px 48px 52px',
        overflowY: 'auto',
      }}>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {links.map(({ label, href }, i) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

            if (label === 'Services') {
              const anyServiceActive = pathname.startsWith('/services');
              return (
                <div key={href}>
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-heading), Georgia, serif',
                      fontSize: 'clamp(34px, 7.5vw, 52px)',
                      fontWeight: 500,
                      letterSpacing: '-0.025em',
                      color: anyServiceActive ? 'var(--accent)' : 'rgba(220,225,248,0.55)',
                      textDecoration: 'none',
                      borderBottom: servicesOpen ? '1px solid transparent' : '1px solid #1A1A18',
                      padding: '18px 0',
                      opacity: open ? 1 : 0,
                      transform: open ? 'translateX(0)' : 'translateX(28px)',
                      transition: [
                        `opacity 480ms ease ${i * 55 + 60}ms`,
                        `transform 480ms cubic-bezier(0.22,1,0.36,1) ${i * 55 + 60}ms`,
                        'color 180ms ease',
                        'border-color 180ms ease',
                      ].join(', '),
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '10px', fontWeight: 400,
                        color: '#2A2A28', letterSpacing: '0.12em',
                        flexShrink: 0,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      Services
                    </div>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)',
                        color: anyServiceActive ? 'var(--accent)' : '#4A4A48',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: servicesOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 380ms cubic-bezier(0.22,1,0.36,1)',
                    borderBottom: servicesOpen ? '1px solid #1A1A18' : 'none',
                  }}>
                  <div style={{ overflow: 'hidden', minHeight: 0 }}>
                    <Link
                      href="/services"
                      onClick={(e) => { if (pathname === '/services') { e.preventDefault(); onClose(); scrollToTop(); } }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 0 12px 26px',
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: pathname === '/services' ? 'var(--accent)' : 'rgba(220,225,248,0.45)',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--dark-border)',
                        transition: 'color 160ms ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dark-text)'; }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          pathname === '/services' ? 'var(--accent)' : 'rgba(220,225,248,0.45)';
                      }}
                    >
                      <span style={{ width: '1px', height: '14px', backgroundColor: '#2A2A28', flexShrink: 0 }} />
                      {allServicesLabel}
                      <ArrowRight size={11} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </Link>
                    {serviceItems.map((item, j) => {
                      const subActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={(e) => { if (subActive) { e.preventDefault(); onClose(); scrollToTop(); } }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 0 14px 26px',
                            fontFamily: 'var(--font-heading), Georgia, serif',
                            fontSize: 'clamp(20px, 4vw, 28px)',
                            fontWeight: 500,
                            letterSpacing: '-0.02em',
                            color: subActive ? 'var(--dark-text)' : 'rgba(220,225,248,0.45)',
                            textDecoration: 'none',
                            borderBottom: j < serviceItems.length - 1 ? '1px solid var(--dark-border)' : 'none',
                            transition: 'color 160ms ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.55)';
                          }}
                          onMouseLeave={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.45)';
                          }}
                        >
                          <span style={{
                            width: '3px', height: '20px', flexShrink: 0,
                            backgroundColor: subActive ? 'var(--accent)' : '#1E1E1C',
                            transition: 'background-color 160ms ease',
                          }} />
                          <div>
                            <div style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '9px',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: subActive ? 'var(--accent)' : '#2E2E2C',
                              marginBottom: '3px',
                            }}>
                              {item.tag}
                            </div>
                            {item.label}
                          </div>
                          <ArrowUpRight
                            size={14}
                            style={{
                              marginLeft: 'auto',
                              opacity: subActive ? 1 : 0.18,
                              color: subActive ? 'var(--accent)' : 'currentColor',
                              flexShrink: 0,
                            }}
                          />
                        </Link>
                      );
                    })}
                  </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                onClick={isActive ? (e) => { e.preventDefault(); onClose(); scrollToTop(); } : undefined}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-heading), Georgia, serif',
                  fontSize: 'clamp(34px, 7.5vw, 52px)',
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  color: isActive ? 'var(--accent)' : 'rgba(220,225,248,0.55)',
                  textDecoration: 'none',
                  borderBottom: '1px solid #1A1A18',
                  padding: '18px 0',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(28px)',
                  transition: [
                    `opacity 480ms ease ${i * 55 + 60}ms`,
                    `transform 480ms cubic-bezier(0.22,1,0.36,1) ${i * 55 + 60}ms`,
                    'color 180ms ease',
                  ].join(', '),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--dark-text)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.55)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px', fontWeight: 400,
                    color: '#2A2A28', letterSpacing: '0.12em',
                    flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {label}
                </div>
                <ArrowUpRight
                  size={18}
                  style={{
                    opacity: isActive ? 1 : 0.25,
                    color: isActive ? 'var(--accent)' : 'currentColor',
                    flexShrink: 0,
                  }}
                />
              </Link>
            );
          })}
        </nav>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          paddingTop: '32px',
          borderTop: '1px solid #1A1A18',
          opacity: open ? 1 : 0,
          transition: `opacity 400ms ease ${links.length * 55 + 180}ms`,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#2A2A28',
            }}>
              {companyLabel}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#2A2A28', marginBottom: '4px',
            }}>
              {youAreHereLabel}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px', color: 'var(--accent)', fontWeight: 500,
              letterSpacing: '0.04em',
            }}>
              {currentPage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────
   Contact drawer — slides in from right
───────────────────────────────────────────────────────────── */
function DarkField({ label, name, type = 'text', value, onChange, placeholder }: { label: string; name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: focused ? 'var(--accent)' : 'rgba(220,225,248,0.38)', transition: 'color 220ms ease', userSelect: 'none' }}>
        {label}
      </label>
      <input
        name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="drawer-input"
        style={{
          width: '100%',
          padding: '12px 16px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '14px',
          color: 'var(--dark-text)',
          backgroundColor: focused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
          border: `1.5px solid ${focused ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '10px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 220ms ease, background-color 200ms ease, box-shadow 220ms ease',
          boxShadow: focused ? '0 0 0 3px rgba(61,82,230,0.12)' : 'none',
        }}
      />
    </div>
  );
}

function DrawerTextarea({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name="message"
      value={value}
      onChange={onChange}
      rows={4}
      placeholder="What are you working on?"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="drawer-input"
      style={{
        width: '100%',
        padding: '12px 16px',
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '14px',
        lineHeight: 1.8,
        color: 'var(--dark-text)',
        backgroundColor: focused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${focused ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '10px',
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 220ms ease, background-color 200ms ease, box-shadow 220ms ease',
        boxShadow: focused ? '0 0 0 3px rgba(61,82,230,0.12)' : 'none',
      }}
    />
  );
}

function ContactDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', _hp: '' });
  const [services, setServices] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => { setForm({ name: '', email: '', phone: '', message: '', _hp: '' }); setServices([]); setSent(false); setSending(false); }, 400);
    }
  }, [open]);

  const wordCount = form.message.trim().split(/\s+/).filter(Boolean).length;
  const msgReady = wordCount >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form._hp) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    setTimeout(() => { setSent(true); setSending(false); }, 600);
  };

  const toggleService = (s: string) => setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const SERVICE_OPTS = ['Workflow Automation', 'Website Development', 'Application Development', 'Other'];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(6,8,15,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 150 }}
          />
          {/* Panel */}
          <motion.div
            variants={{ hidden: { x: '100%' }, visible: { x: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } }, exit: { x: '100%', transition: { duration: 0.34, ease: [0.55, 0, 1, 0.45] } } }}
            initial="hidden" animate="visible" exit="exit"
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '580px', maxWidth: '100vw', background: 'var(--dark-surface)', borderLeft: '1px solid rgba(61,82,230,0.16)', zIndex: 151, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '48px 48px' }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close drawer"
              style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', color: 'rgba(220,225,248,0.6)', lineHeight: 1 }}
            >
              &times;
            </button>

            {sent ? (
              /* Sent state */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px', marginTop: '40px' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid rgba(61,82,230,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(61,82,230,0.1)' }}>
                  <Check size={20} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '22px', fontWeight: 600, color: 'var(--dark-text)', margin: 0 }}>Message sent.</h3>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'rgba(220,225,248,0.45)', lineHeight: 1.7, margin: 0 }}>We&apos;ll be in touch within one hour.</p>
                <button
                  onClick={onClose}
                  style={{ marginTop: '16px', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Heading */}
                <div style={{ marginBottom: '0' }}>
                  <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '28px', fontWeight: 500, color: 'var(--dark-text)', display: 'block', lineHeight: 1.2 }}>Ready to</span>
                  <span style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontStyle: 'italic', fontSize: '36px', fontWeight: 500, color: 'var(--accent)', display: 'block', lineHeight: 1.1 }}>get started?</span>
                </div>

                <form onSubmit={handleSubmit} style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <input name="_hp" value={form._hp} onChange={e => setForm(p => ({ ...p, _hp: e.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, border: 'none', padding: 0 }} />

                  <DarkField label="Name" name="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
                  <DarkField label="Email" name="email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" />
                  <DarkField label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+966 (055) 000 - 0000" />

                  {/* Services */}
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '8.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.35)', marginBottom: '14px' }}>
                      Services interested in
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {SERVICE_OPTS.map(s => {
                        const checked = services.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                          >
                            <span style={{ width: '16px', height: '16px', flexShrink: 0, borderRadius: '3px', border: checked ? 'none' : '1.5px solid rgba(255,255,255,0.2)', backgroundColor: checked ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 140ms ease, border-color 140ms ease' }}>
                              {checked && <Check size={9} color="#FFFFFF" strokeWidth={2.5} />}
                            </span>
                            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'rgba(220,225,248,0.65)' }}>{s}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message / Project description */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: 'rgba(220,225,248,0.38)', userSelect: 'none' }}>
                      Project description
                    </label>
                    <div>
                      <DrawerTextarea
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: msgReady ? 'var(--accent)' : 'rgba(220,225,248,0.2)', transition: 'color 300ms ease' }}>
                        {wordCount} {wordCount === 1 ? 'word' : 'words'}{msgReady ? ' — ready' : ' — 10 min'}
                      </span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--accent)', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body), sans-serif', cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.6 : 1, transition: 'opacity 200ms ease', marginTop: '8px' }}
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Placeholder styles for dark inputs */}
          <style>{`
            .drawer-input::placeholder { color: rgba(220,225,248,0.25) !important; }
            .drawer-input:-webkit-autofill,
            .drawer-input:-webkit-autofill:focus {
              -webkit-box-shadow: 0 0 0 1000px rgba(20,22,40,1) inset !important;
              -webkit-text-fill-color: var(--dark-text) !important;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main navigation — single unified pill bar
   Logo left · links centered · CTA right
───────────────────────────────────────────────────────────── */
export default function Navigation() {
  const [scrolled,    setScrolled]   = useState(false);
  const [progress,    setProgress]   = useState(0);
  const [menuOpen,    setMenuOpen]   = useState(false);
  const [dropOpen,    setDropOpen]   = useState(false);
  const [drawerOpen,  setDrawerOpen] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const openDrop = useCallback(() => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setDropOpen(true);
  }, []);

  const closeDrop = useCallback(() => {
    dropTimer.current = setTimeout(() => setDropOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
  }, []);

  const serviceItems: ServiceItem[] = [
    { label: 'Workflow Automation',     href: '/services/automation', tag: 'Automation', desc: 'Eliminate manual tasks. Build workflows that run themselves.' },
    { label: 'Website Development',     href: '/services/websites',   tag: 'Web',        desc: 'Sites that convert visitors, load fast, work on every device.' },
    { label: 'Application Development', href: '/services/apps',       tag: 'Apps',       desc: 'Custom tools built for exactly how your team operates.' },
  ];

  const NAV_LINKS = [
    { label: 'Home',     href: '/'         },
    { label: 'Services', href: '/services' },
    { label: 'Approach', href: '/approach' },
    { label: 'Contact',  href: '/contact'  },
  ];

  const detectNavTheme = useCallback(() => {
    const elements = document.elementsFromPoint(window.innerWidth / 2, 50) as Element[];
    const section = elements.find(el => el.hasAttribute('data-nav-theme'));
    void section?.getAttribute('data-nav-theme');
  }, []);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (y / docH) * 100 : 0);
      detectNavTheme();
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, [detectNavTheme]);

  useEffect(() => {
    const t = setTimeout(detectNavTheme, 120);
    return () => clearTimeout(t);
  }, [pathname, detectNavTheme]);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || drawerOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, drawerOpen]);

  useEffect(() => {
    const handler = () => setDrawerOpen(true);
    window.addEventListener('openContactDrawer', handler);
    return () => window.removeEventListener('openContactDrawer', handler);
  }, []);

  return (
    <>
      {/* ── Reading progress bar ── */}
      <div
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          height: '2px', width: '100%',
          backgroundColor: 'rgba(255,255,255,0.9)',
          zIndex: 200,
          opacity: scrolled ? 1 : 0,
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left center',
          transition: 'transform 80ms linear, opacity 300ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Header shell ── */}
      <header
        data-main-nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: '10px 16px',
          pointerEvents: 'none',
          transition: 'padding 400ms ease',
        }}
      >
        {/* ── Unified pill bar ── */}
        <div
          className="nav-pill"
          style={{
            position: 'relative',
            pointerEvents: 'auto',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '75px',
            borderRadius: '14px',
            backgroundColor: 'rgba(30,46,180,0.96)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: 'none',
            transition: 'background-color 400ms ease, box-shadow 400ms ease',
          }}
        >

          {/* ── LEFT: Logo ── */}
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
            <Link
              href="/"
              aria-label="Obsidia home"
              onClick={pathname === '/' ? (e) => { e.preventDefault(); scrollToTop(); } : undefined}
              style={{
                display: 'flex', alignItems: 'center',
                height: '60px', padding: '0 14px',
                textDecoration: 'none', flexShrink: 0,
              }}
            >
              <img
                src="/logos/obsidia_logo_offwhite.png"
                alt="Obsidia"
                className="nav-logo-icon"
                style={{ height: '54px', width: 'auto', display: 'block' }}
              />
              <img
                src="/logos/obsidia_logo_name.png"
                alt="Obsidia"
                className="nav-logo-name"
                style={{ height: '20px', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', marginLeft: '0.2px' }}
/>
            </Link>
          </div>

          {/* ── CENTER: Nav links ── */}
          <nav
            aria-label="Main navigation"
            className="nav-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              if (href === '/services') {
                return (
                  <ServicesNavItem
                    key={href}
                    pathname={pathname}
                    label={label}
                    open={dropOpen}
                    onEnter={openDrop}
                    onLeave={closeDrop}
                  />
                );
              }
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <div key={href} onMouseEnter={() => setDropOpen(false)}>
                  <NavLink href={href} label={label} active={isActive} />
                </div>
              );
            })}
          </nav>

          {/* ── RIGHT: CTA + mobile hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px', gap: '8px' }}>

            {/* Desktop mail icon box */}
            <button
              aria-label="Contact us"
              className="nav-cta"
              onClick={() => setDrawerOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Image src="/mail_icon.png" alt="Contact us" width={47} height={47} style={{ display: 'block' }} />
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((v) => !v)}
              className="nav-mobile-toggle"
              style={{
                background: 'none', border: 'none',
                padding: '10px', cursor: 'pointer',
                display: 'none', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>

          {/* ── Services dropdown — floats 8px below bar ── */}
          <AnimatePresence>
            {dropOpen && (
              <motion.div
                key="services-dropdown"
                initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={cancelClose}
                onMouseLeave={closeDrop}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 'calc(50% - 210px)',
                  width: '420px',
                  transformOrigin: 'top center',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(6,8,15,0.97)',
                  backdropFilter: 'blur(32px) saturate(2.2)',
                  WebkitBackdropFilter: 'blur(32px) saturate(2.2)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                  zIndex: 10,
                }}
              >
                <ServicesDropdownContent
                  pathname={pathname}
                  items={serviceItems}
                  viewAll="View all services"
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* ── Mobile menu ── */}
      <MobileMenu
        open={menuOpen}
        pathname={pathname}
        links={NAV_LINKS}
        serviceItems={serviceItems}
        allServicesLabel="View all services"
        companyLabel="An Obsidia Company"
        youAreHereLabel="You are here"
        onClose={() => setMenuOpen(false)}
      />

      {/* ── Contact drawer ── */}
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* ── Responsive rules ── */}
      <style>{`
        .nav-desktop        { display: flex !important; }
        .nav-cta            { display: inline-flex !important; }
        .nav-mobile-toggle  { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop       { display: none !important; }
          .nav-mobile-toggle { display: flex !important; align-items: center !important; justify-content: center !important; }
          .nav-logo-icon     { height: 36px !important; }
          .nav-logo-name     { height: 14px !important; display: block !important; }
          /* Switch to auto 1fr auto so logo and hamburger size naturally, center stays empty */
          .nav-pill          { height: 58px !important; grid-template-columns: auto 1fr auto !important; }
          /* Hide mail icon on mobile — hamburger is the only right-side control */
          .nav-cta           { display: none !important; }
        }
      `}</style>
    </>
  );
}
