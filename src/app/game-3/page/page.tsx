"use client";

import React, { useState, useEffect } from 'react';
import InstructionModal from '../components/InstructionModal';
import '../styles/game.css';

const colors = ['red', 'blue', 'green', 'yellow'];

const MemoryTest = ({ pin }: { pin: string }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [flashing, setFlashing] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hasBeatenGame, setHasBeatenGame] = useState(false); 

  
  // Check localStorage for "hasBeatenGame" after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const beatenGame = localStorage.getItem("hasBeatenGame") === "true";
      setHasBeatenGame(beatenGame);
    }
  }, []);

  useEffect(() => {
    if (gameStarted) {
      generateNewSequence(true);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted && level > 1) {
      generateNewSequence();
    }
  }, [level]);

  const generateNewSequence = (reset = false) => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prev) => (reset ? [newColor] : [...prev, newColor]));
    setPlayerInput([]);
    flashSequence(reset ? [newColor] : [...sequence, newColor]);
  };

  const flashSequence = async (seq: string[]) => {
    setIsFlashing(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    for (let i = 0; i < seq.length; i++) {
      setFlashing(seq[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFlashing(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    setIsFlashing(false);
  };

  const handleColorClick = (color: string) => {
    if (isFlashing) return;

    setPlayerInput((prev) => [...prev, color]);

    if (sequence[playerInput.length] !== color) {
      alert('Incorrect! Try again from level 1.');
      setLevel(1);
      setGameStarted(false); // Reset the game
    } else if (playerInput.length + 1 === sequence.length) {
      if (level === 5) {
        setShowModal(true);
        setGameWon(true);
        localStorage.setItem("hasBeatenGame", "true"); // Save to cache
        setHasBeatenGame(true); // Update state
      } else {
        setLevel((prev) => prev + 1);
      }
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setLevel(1); // Reset level
    setGameWon(false); // Reset gameWon state
  };

  const handleReplay = () => {
    setGameStarted(false);
    setLevel(1);
    setSequence([]);
    setPlayerInput([]);
    setShowModal(false);
    setGameWon(false); // Reset gameWon state
  };

  return (
    <div>
      {!gameStarted && <InstructionModal onStartGame={handleStartGame} />}
      {gameStarted && (
        <div className="game-container">
          <h1>Memory Sequence Test</h1>
          <p>Level: {level}</p>
          <div className="button-grid">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className={`color-button ${color} ${flashing === color ? 'flash' : ''}`}
                disabled={isFlashing}
              >
                {color}
              </button>
            ))}
          </div>
          {gameWon && (
            <button className="start-button" onClick={handleReplay}>
              Replay Game
            </button>
          )}
          {showModal && (
            <div className="modal">
              <p>The code is: {pin}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          )}
        </div>
      )}
      {hasBeatenGame && (
        <button
          className="show-code-button"
          onClick={() => setShowModal(true)}
        >
          Show Code
        </button>
      )}
    </div>
  );
};

export default MemoryTest;