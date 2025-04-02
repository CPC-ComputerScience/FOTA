"use client";

import ColorButton from '../components/ColorButton';
import ResultModal from '../components/ResultModal';
import SequenceDisplay from '../components/SequenceDisplay';
import '../styles/game.css';

import React, { useState, useEffect } from 'react';

const colors = ['red', 'blue', 'green', 'yellow'];

const MemoryTest = ({ pin }: { pin: string }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<string[]>([]); 
  const [playerInput, setPlayerInput] = useState<string[]>([]); 
  const [showModal, setShowModal] = useState(false);
  const [flashing, setFlashing] = useState<string | null>(null); 
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    generateNewSequence();
  }, [level]);

  const generateNewSequence = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prev) => [...prev, newColor]);
    setPlayerInput([]);
    flashSequence([...sequence, newColor]);
  };

  const flashSequence = async (seq: string[]) => {
    for (let i = 0; i < seq.length; i++) {
      setFlashing(seq[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFlashing(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  };

  const handleColorClick = (color: string) => {
    setPlayerInput((prev) => [...prev, color]);

    if (sequence[playerInput.length] !== color) {
      alert('Incorrect! Try again from level 1.');
      setLevel(1);
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setSequence([]); 
      setPlayerInput([]);
      flashSequence([]); 
    } else if (playerInput.length + 1 === sequence.length) {
      if (level === 5) {
        setShowModal(true);
      } else {
        setLevel((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="game-container">
      <h1>Memory Sequence Test</h1>
      <p>Level: {level}</p>
      <div className="button-grid">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            className={`color-button ${color} ${flashing === color ? 'flash' : ''}`}
          >
            {color}
          </button>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <p>Success! Your code is: {pin}</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MemoryTest;