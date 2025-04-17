"use client";

import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import InstructionModal from './components/InstructionModal';
import ResultModal from './components/ResultModal';

import './styles/game.css';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  }, [gameStarted]);

  // Generate a new sequence when the level increases
  useEffect(() => {
    if (gameStarted && level > 1) {
      generateNewSequence();
    }
  }, [level]);

  // Generates a new sequence of colors for the game
  const generateNewSequence = (reset = false) => {
    const newColor = colors[Math.floor(Math.random() * colors.length)]; // Randomly pick a color
    setSequence((prev) => (reset ? [newColor] : [...prev, newColor])); // Reset or append to the sequence
    setPlayerInput([]); // Clear player's input
    flashSequence(reset ? [newColor] : [...sequence, newColor]); // Flash the new sequence
  };

  // Flashes the sequence of colors to the player
  const flashSequence = async (seq: string[]) => {
    setIsFlashing(true); // Disable player input during flashing
    await new Promise((resolve) => setTimeout(resolve, 700)); // Initial delay

    for (let i = 0; i < seq.length; i++) {
      setFlashing(seq[i]); // Highlight the current color
      await new Promise((resolve) => setTimeout(resolve, 500)); // Flash duration
      setFlashing(null); // Remove highlight
      await new Promise((resolve) => setTimeout(resolve, 300)); // Pause between flashes
    }

    setIsFlashing(false); // Enable player input after flashing
  };

  // Handles player's color button clicks
  const handleColorClick = (color: string) => {
    if (isFlashing) return; // Ignore clicks during flashing

    const button = document.querySelector(`.color-button.${color}`);
    if (button) {
      button.classList.add('clicked'); // Add a temporary "clicked" class for animation
      setTimeout(() => button.classList.remove('clicked'), 300); // Remove class after animation
    }

    setPlayerInput((prev) => [...prev, color]); // Add clicked color to player's input

    if (sequence[playerInput.length] !== color) { // Check if input is incorrect
      setErrorMessage('Incorrect! Restart Game'); // Set error message
      setGameStarted(false); // Stop the game
    } else if (playerInput.length + 1 === sequence.length) { // Check if sequence is complete
      if (level === 1) { // Check if player has won
        setShowModal(true); // Show winning modal
        setGameWon(true); // Mark game as won
        localStorage.setItem("hasBeatenGame", "true"); // Save progress to localStorage
        setHasBeatenGame(true); // Update state
      } else {
        setLevel((prev) => prev + 1); // Advance to the next level
      }
    }
  };

  // Starts the game
  const handleStartGame = () => {
    setGameStarted(true);
    setLevel(1); // Reset level
    setGameWon(false); // Reset gameWon state
    setErrorMessage(null); // Clear error message
  };

  // Resets the game
  const handleReplay = () => {
    setGameStarted(false); // Go back to the instruction modal
    setLevel(1);
    setSequence([]);
    setPlayerInput([]);
    setShowModal(false);
    setGameWon(false); // Reset gameWon state
    setErrorMessage(null); // Clear error message
  };

  const handleRestartGame = () => {
    setGameStarted(true); // Restart the game without showing the instruction modal
    setLevel(1);
    setSequence([]);
    setPlayerInput([]);
    setShowModal(false);
    setGameWon(false); // Reset gameWon state
    setErrorMessage(null); // Clear error message
  };

  return (
    <div>
      {!gameStarted && !errorMessage && <InstructionModal onStartGame={handleStartGame} />}
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