import React from 'react';

interface InstructionModalProps {
  onStartGame: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ onStartGame }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sequence Memory Game</h2>
        <p>
          Memorize the sequence of colors shown to you. Once the sequence is displayed, click the colors in the correct order to proceed to the next level.
        </p>
        <p>
          The game gets progressively harder as the sequence grows longer. Can you reach the final level?
        </p>
        <button className="start-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default InstructionModal;