import React from 'react';
import '../styles/game.css';

interface CardProps {
  number: number | null;
  animate: boolean;
  textColor: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ number, animate, textColor, className = '' }) => {
  return (
    <div
      className={`card ${animate ? 'flip' : ''} ${className}`}
      style={{ color: textColor }}
    >
      {number !== null ? number : '?'}
    </div>
  );
};

export default Card;
