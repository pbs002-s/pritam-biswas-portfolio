import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'always';
  as?: keyof JSX.IntrinsicElements;
  onComplete?: () => void;
}

const DEFAULT_CHARS = '01#@$%&*<>~/\\{}[]+=_-;^!ABCDEF';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 35,
  maxIterations = 10,
  sequential = true,
  characters = DEFAULT_CHARS,
  className = '',
  encryptedClassName = 'text-[#00E559] opacity-80',
  animateOn = 'always',
  as: Component = 'span',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    let iteration = 0;
    const currentRevealed = new Set<number>();
    setRevealedIndices(new Set());

    const charArray = text.split('');

    intervalRef.current = setInterval(() => {
      const scrambled = charArray.map((char, index) => {
        if (char === ' ') return ' ';
        if (currentRevealed.has(index)) return char;

        if (sequential) {
          if (iteration >= index * (maxIterations / charArray.length)) {
            currentRevealed.add(index);
            return char;
          }
        } else {
          if (Math.random() < 0.15 && iteration > 3) {
            currentRevealed.add(index);
            return char;
          }
        }

        return characters[Math.floor(Math.random() * characters.length)];
      });

      setDisplayText(scrambled.join(''));
      setRevealedIndices(new Set(currentRevealed));

      iteration++;

      if (currentRevealed.size === charArray.filter(c => c !== ' ').length || iteration > maxIterations * 3) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
        if (onComplete) onComplete();
      }
    }, speed);
  };

  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !isScrambling) {
      startScramble();
    }
  };

  return (
    <Component
      className={`inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText.split('').map((char, idx) => {
        const isRevealed = revealedIndices.has(idx) || !isScrambling || char === ' ';
        return (
          <span
            key={idx}
            className={isRevealed ? '' : encryptedClassName}
          >
            {char}
          </span>
        );
      })}
    </Component>
  );
};

export default DecryptedText;
