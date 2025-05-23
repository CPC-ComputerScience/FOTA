"use client";

import React, { useState, useEffect, useCallback } from 'react';
import InstructionModal from './components/InstructionModal';
import Link from "next/link";

import './styles/game.css';

const colors = ['red', 'blue', 'green', 'yellow'];

const MemoryTest: React.FC = () => {
  const pin = "4032";

  const [level, setLevel] = useState(1);
  const [, setSequence] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [flashing, setFlashing] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hasBeatenGame, setHasBeatenGame] = useState(false);
  const [showCodeButton, setShowCodeButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // Flash the sequence
  const flashSequence = useCallback(async (seq: string[]) => {
    setIsFlashing(true); // Disable player input during flashing

    // Add a delay before starting the flashing sequence
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second pause

    for (let i = 0; i < seq.length; i++) {
      setFlashing(seq[i]); // Highlight the current color
      await new Promise((resolve) => setTimeout(resolve, 500)); // Flash duration
      setFlashing(null); // Remove highlight
      await new Promise((resolve) => setTimeout(resolve, 300)); // Pause between flashes
    }

    setIsFlashing(false); // Enable player input after flashing
  }, []);

  // Generate a new sequence
  const generateNewSequence = useCallback(
    (reset = false) => {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setSequence((prevSequence) => {
        const newSequence = reset ? [newColor] : [...prevSequence, newColor];
        setPlayerInput([]);
        flashSequence(newSequence); // Flash the updated sequence
        return newSequence; // Update the sequence state
      });
    },
    [flashSequence] // Include flashSequence as a dependency
  );

  // Handles player's color button clicks
  const handleColorClick = (color: string) => {
    if (isFlashing || hasBeatenGame) return; // Prevent clicks if flashing or game is beaten

    const button = document.querySelector(`.color-button.${color}`);
    if (button) {
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, 300); // Ensure the animation completes
    }


    setPlayerInput((prev) => [...prev, color]);

    setSequence((prevSequence) => {
      if (prevSequence[playerInput.length] !== color) {
        setErrorMessage("Incorrect! Restart Game");
        setGameStarted(false);
      } else if (playerInput.length + 1 === prevSequence.length) {
        if (level === 6) {
          setShowModal(true);
          setGameWon(true);
          localStorage.setItem("hasBeatenGame", "true");
          setHasBeatenGame(true); // Disable buttons after beating the game
          setShowCodeButton(true); // Show the "Show Code" button
          localStorage.setItem("showCodeButton", "true");
        } else {
          setLevel((prev) => {
            console.log("Incrementing level:", prev + 1);
            return prev + 1;
          });
        }
      }
      return prevSequence; // Return the sequence unchanged
    });
  };

  // Starts the game
  const handleStartGame = () => {
    setGameStarted(true);
    setLevel(1);
    setGameWon(false);
    setErrorMessage(null);
    setHasBeatenGame(false); // Allow button clicks for the new game
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
    setHasBeatenGame(false); // Allow button clicks for the new game
    // Do not reset `showCodeButton` so the button remains visible
  };

  // Check localStorage for "hasBeatenGame" and "showCodeButton" after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const beatenGame = localStorage.getItem("hasBeatenGame") === "true";
      const showCode = localStorage.getItem("showCodeButton") === "true";
      setHasBeatenGame(beatenGame);
      setShowCodeButton(showCode);
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
  }, [generateNewSequence, gameStarted, level]);

  return (
    <div className="memory-test-page">
      <div className="back-to-home">
        <Link href="/" className="back-button">
          Back to Home
        </Link>
      </div>
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
                className={`color-button ${color} ${flashing === color ? "flash" : ""}`}
                disabled={isFlashing || hasBeatenGame} // Disable buttons if flashing or game is beaten
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
      {showCodeButton && (
        <button className="show-code-button" onClick={() => setShowModal(true)}>
          Show Code
        </button>
      )}
    </div>
  );
};

export default MemoryTest;