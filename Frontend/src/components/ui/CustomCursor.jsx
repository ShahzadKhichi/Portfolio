import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const isInteractable = 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'input' ||
        e.target.tagName.toLowerCase() === 'textarea' ||
        e.target.closest('button') ||
        e.target.closest('a');
      
      setIsHovering(!!isInteractable);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-teal-accent rounded-full pointer-events-none z-[9999]"
        style={{
          boxShadow: '0 0 10px rgba(0, 245, 212, 0.8), 0 0 20px rgba(0, 245, 212, 0.4)'
        }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-teal-accent rounded-full pointer-events-none z-[9998]"
        style={{
          backgroundColor: isHovering ? 'rgba(0, 245, 212, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(0, 245, 212, 0.2)' : 'none'
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}
