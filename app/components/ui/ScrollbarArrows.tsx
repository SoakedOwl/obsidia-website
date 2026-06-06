'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCROLLBAR_WIDTH = 20; // must match globals.css ::-webkit-scrollbar width
const SCROLL_STEP = 180;

const ARROW_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ChevronUp() {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 5L4.5 2L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1L4.5 4L7.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ScrollbarArrows() {
  const [visible, setVisible] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  /* Track scroll position to know which arrows are active */
  const updateScrollState = useCallback(() => {
    const { scrollY } = window;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    setCanScrollUp(scrollY > 4);
    setCanScrollDown(scrollY < maxScroll - 4);
  }, []);

  /* Show arrows when cursor is over the scrollbar strip (right edge) */
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const isOverScrollbar = e.clientX >= window.innerWidth - SCROLLBAR_WIDTH;
      setVisible(isOverScrollbar);
      document.documentElement.classList.toggle('sb-thumb-hovered', isOverScrollbar);
    };

    const onMouseLeave = () => {
      setVisible(false);
      document.documentElement.classList.remove('sb-thumb-hovered');
    };

    updateScrollState();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', updateScrollState, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', updateScrollState);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [updateScrollState]);

  const scrollUp = () => window.scrollBy({ top: -SCROLL_STEP, behavior: 'smooth' });
  const scrollDown = () => window.scrollBy({ top: SCROLL_STEP, behavior: 'smooth' });

  const btnStyle: React.CSSProperties = {
    position: 'fixed',
    right: 0,
    width: `${SCROLLBAR_WIDTH}px`,
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F2F2F7',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    zIndex: 9998,
    color: '#9396AF',
    transition: 'color 160ms ease, background 160ms ease',
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Up arrow — top of scrollbar */}
          <motion.button
            key="sb-up"
            aria-label="Scroll up"
            onClick={scrollUp}
            disabled={!canScrollUp}
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollUp ? 1 : 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: ARROW_EASE }}
            style={{ ...btnStyle, top: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#474961'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9396AF'; }}
          >
            <ChevronUp />
          </motion.button>

          {/* Down arrow — bottom of scrollbar */}
          <motion.button
            key="sb-down"
            aria-label="Scroll down"
            onClick={scrollDown}
            disabled={!canScrollDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollDown ? 1 : 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: ARROW_EASE }}
            style={{ ...btnStyle, bottom: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#474961'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9396AF'; }}
          >
            <ChevronDown />
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}
