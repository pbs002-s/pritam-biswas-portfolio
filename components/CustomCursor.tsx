import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Desktop-only custom cursor: a precise dot that tracks the mouse 1:1,
 * a lagging ring that eases toward it, and a soft trailing glow behind
 * both. Grows + brightens over links, buttons, and anything flagged
 * with data-cursor-hover. Never mounts on touch/coarse-pointer devices,
 * so mobile and tablet behavior is untouched.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.5 });

  const glowX = useSpring(dotX, { stiffness: 90, damping: 22, mass: 0.9 });
  const glowY = useSpring(dotY, { stiffness: 90, damping: 22, mass: 0.9 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    document.body.classList.add('has-custom-cursor');

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return !!el.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]');
    };

    const handleOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovered(true);
    };
    const handleOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovered(false);
    };
    const handleLeaveWindow = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-glow"
        style={{ x: glowX, y: glowY, opacity: visible ? 1 : 0 }}
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          width: hovered ? 52 : 32,
          height: hovered ? 52 : 32,
          marginTop: hovered ? -26 : -16,
          marginLeft: hovered ? -26 : -16,
          borderColor: hovered ? 'rgba(0,229,89,0.9)' : 'rgba(0,229,89,0.5)',
          backgroundColor: hovered ? 'rgba(0,229,89,0.08)' : 'rgba(0,229,89,0)'
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        animate={{ scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
