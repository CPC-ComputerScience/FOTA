"use client";

import React, { useState, useEffect, useCallback } from 'react';
import InstructionModal from './components/InstructionModal';

import './styles/game.css';

const colors = ['red', 'blue', 'green', 'yellow'];

const MemoryTest: React.FC = () => {
  const pin = "4032"; 

  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [flashing, setFlashing] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hasBeatenGame, setHasBeatenGame] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Wrap generateNewSequence in useCallback to stabilize its reference
  const generateNewSequence = useCallback(
    (reset = false) => {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setSequence((prev) => (reset ? [newColor] : [...prev, newColor]));
      setPlayerInput([]);
      flashSequence(reset ? [newColor] : [...sequence, newColor]);
    },
    [] // Removed `sequence` from dependencies
  );

  // Flashes the sequence of colors to the player
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

  // Handles player's color button clicks
  const handleColorClick = (color: string) => {
    if (isFlashing) return;

    const button = document.querySelector(`.color-button.${color}`);
    if (button) {
      button.classList.add('clicked');
      setTimeout(() => button.classList.remove('clicked'), 300);
    }

    setPlayerInput((prev) => [...prev, color]);

    if (sequence[playerInput.length] !== color) {
      setErrorMessage('Incorrect! Restart Game');
      setGameStarted(false);
    } else if (playerInput.length + 1 === sequence.length) {
      if (level === 1) {
        setShowModal(true);
        setGameWon(true);
        localStorage.setItem("hasBeatenGame", "true");
        setHasBeatenGame(true);
      } else {
        setLevel((prev) => prev + 1);
      }
    }
  };

  // Starts the game
  const handleStartGame = () => {
    setGameStarted(true);
    setLevel(1);
    setGameWon(false);
    setErrorMessage(null);
  };

  // Resets the game
  const handleReplay = () => {
    setGameStarted(false);
    setLevel(1);
    setSequence([]);
    setPlayerInput([]);
    setShowModal(false);
    setGameWon(false);
    setErrorMessage(null);
  };

  // Check localStorage for "hasBeatenGame" after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const beatenGame = localStorage.getItem("hasBeatenGame") === "true";
      setHasBeatenGame(beatenGame);
    }
  }, []);

  // Start a new sequence when the game starts
  useEffect(() => {
    if (gameStarted) {
      generateNewSequence(true);
    }
  }, [generateNewSequence, gameStarted]);

  // Generate a new sequence when the level increases
  useEffect(() => {
    if (gameStarted && level > 1) {
      generateNewSequence();
    }
  }, [gameStarted, generateNewSequence, level]);

  return (
    <div>
      {!gameStarted && !errorMessage && <InstructionModal onStartGame={handleStartGame} />}
      {gameStarted && (
        <div className="game-container">
          <h1 className="memory-title">Memory Sequence Test</h1>
          <p className="level">Level: {level}</p>
          <div className="button-grid">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className={`color-button ${color} ${flashing === color ? 'flash' : ''}`}
                disabled={isFlashing}
              />
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
      {!gameStarted && errorMessage && (
        <div className="error-overlay">
          <p className="error-message">{errorMessage}</p>
          <button className="start-button" onClick={handleReplay}>
            Restart Game
          </button>
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