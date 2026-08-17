import React from 'react';
import { motion } from 'motion/react';

interface SpatialRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  highlightColor?: string;
}

export const SpatialRevealText: React.FC<SpatialRevealTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.025,
}) => {
  const characters = text.split('');

  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.45,
            delay: delay + index * stagger,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default SpatialRevealText;
