'use client';

import { useState, useEffect } from 'react';

interface PowerBarProps {
  onAttack: (power: number) => void;
  isActive: boolean;
}

export default function PowerBar({ onAttack, isActive }: PowerBarProps) {
  const [cursorX, setCursorX] = useState(50);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCursorX((x) => {
        const next = x + direction * 2;
        if (next >= 100 || next <= 0) setDirection(-direction);
        return Math.max(0, Math.min(100, next));
      });
    }, 10);

    return () => clearInterval(interval);
  }, [isActive, direction]);

  const handleClick = () => {
    if (!isActive) return;

    const center = Math.abs(cursorX - 50);
    const power = Math.max(0.2, 1 - center / 50);
    onAttack(power);
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <div
        style={{
          width: '300px',
          height: '20px',
          background: '#444',
          borderRadius: '10px',
          position: 'relative',
          margin: '0 auto',
          overflow: 'hidden',
          cursor: isActive ? 'pointer' : 'default',
        }}
        onClick={handleClick}
      >
        <div
          style={{
            width: '10px',
            height: '100%',
            background: 'red',
            position: 'absolute',
            left: `${cursorX}%`,
            transform: 'translateX(-50%)',
            transition: 'left 0.01s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            height: '100%',
            width: '2px',
            background: 'gold',
            transform: 'translateX(-50%)',
            opacity: 0.5,
          }}
        />
      </div>
      <p style={{ color: 'lightgray', marginTop: '8px' }}>
        {isActive ? 'Click to stop the bar and attack!' : 'Enemy Turn...'}
      </p>
    </div>
  );
}
