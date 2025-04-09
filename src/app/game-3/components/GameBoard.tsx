import React from 'react';

interface GameBoardProps {
  level: number;
  colors: string[];
  flashing: string | null;
  isFlashing: boolean;
  onColorClick: (color: string) => void;
  errorMessage: string | null;
}

const GameBoard: React.FC<GameBoardProps> = ({
  level,
  colors,
  flashing,
  isFlashing,
  onColorClick,
  errorMessage,
}) => {
  return (
    <div className="game-container">
      <h1>Memory Sequence Test</h1>
      <p>Level: {level}</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-grid">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorClick(color)}
            className={`color-button ${color} ${flashing === color ? 'flash' : ''}`}
            disabled={isFlashing}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
