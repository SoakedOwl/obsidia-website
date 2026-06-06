'use client';

import { useEffect } from 'react';

const SCROLLBAR_WIDTH = 20; // must match ::-webkit-scrollbar width in globals.css

export default function ScrollbarHover() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const overScrollbar = e.clientX >= window.innerWidth - SCROLLBAR_WIDTH;
      document.documentElement.classList.toggle('sb-hovered', overScrollbar);
    };

    const handleLeave = () => {
      document.documentElement.classList.remove('sb-hovered');
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      document.documentElement.classList.remove('sb-hovered');
    };
  }, []);

  return null;
}
