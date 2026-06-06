'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';

interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface GlareHoverHandle {
  animateIn: () => void;
  animateOut: () => void;
}

const GlareHover = forwardRef<GlareHoverHandle, GlareHoverProps>(({
  width = '500px',
  height = '500px',
  background = '#000',
  borderRadius = '10px',
  borderColor = '#333',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {},
}, ref) => {
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%';
    void el.getBoundingClientRect();
    el.style.transition = `background-position ${transitionDuration}ms ease`;
    el.style.backgroundPosition = '100% 100%';
    console.log('after animateIn:', el.style.backgroundPosition, el.style.transition);
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;
    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%';
    } else {
      el.style.transition = `background-position ${transitionDuration}ms ease`;
      el.style.backgroundPosition = '-100% -100%';
    }
  };

  useImperativeHandle(ref, () => ({ animateIn, animateOut }));

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `linear-gradient(${glareAngle}deg,
      hsla(0,0%,0%,0) 60%,
      ${rgba} 70%,
      hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%',
    pointerEvents: 'none',
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, background, borderRadius, borderColor, ...style }}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
});

GlareHover.displayName = 'GlareHover';

export default GlareHover;
