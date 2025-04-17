import React from 'react';
import '../styles/game.css';

interface CardProps {
  number: number | null;
  animate: boolean;
  textColor: string; // Add this prop
}

const Card: React.FC<CardProps> = ({ number, animate, textColor }) => {
  return (
    <div
      className={`card ${animate ? 'flip' : ''}`}
      style={{ color: textColor }}
    >
      {number !== null ? number : '?'}
    </div>
  );
};

export default Card;
