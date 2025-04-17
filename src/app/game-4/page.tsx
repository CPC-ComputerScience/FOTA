'use client';

import React, { useState } from 'react';
import Card from './components/Card';
import './styles/game.css';

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const Page = () => {
  const [targetNumber, setTargetNumber] = useState(getRandomNumber());
  const [guess, setGuess] = useState(50);
  const [message, setMessage] = useState('');
  const [animate, setAnimate] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [textColor, setTextColor] = useState('black');
  const [guessCount, setGuessCount] = useState(0);

  const submitGuess = () => {
    if (gameOver) return;
  
    setAnimate(true);
    setGuessCount(prev => prev + 1); // Increment guess count
  
    if (guess === targetNumber) {
      setMessage(`🎉 You guessed it in ${guessCount + 1} guesses! The number was ${targetNumber}.`);
      setGameOver(true);
      setTextColor('green');
    } else if (guess < targetNumber) {
      setMessage('Too low!');
      setTextColor('blue');
    } else {
      setMessage('Too high!');
      setTextColor('red');
    }
  
    setTimeout(() => {
      setAnimate(false);
      setTextColor('black');
    }, 500);
  };

  const resetGame = () => {
    setTargetNumber(getRandomNumber());
    setGuess(50);
    setMessage('');
    setGameOver(false);
    setTextColor('black');
    setGuessCount(0); // Reset guess counter
  };

  return (
    <div className="container">
      <h1>Higher or Lower?</h1>
      <p>How it works: The goal of the game is to try to guess the randomly chosen number.</p>
      <Card number={guess} animate={animate} textColor={textColor} />
      <p>Guesses: {guessCount}</p>
      <p className="message">{message}</p>
      <div className="guess-controls">
        <button onClick={() => setGuess(prev => Math.max(1, prev - 10))}>-10</button>
        <button onClick={() => setGuess(prev => Math.max(1, prev - 1))}>-1</button>
        <button onClick={() => setGuess(prev => Math.min(100, prev + 1))}>+1</button>
        <button onClick={() => setGuess(prev => Math.min(100, prev + 10))}>+10</button>
      </div>
      {!gameOver ? (
        <button className="submit-btn" onClick={submitGuess}>Submit Guess</button>
      ) : (
        <button className="submit-btn" onClick={resetGame}>Play Again</button>
      )}

    </div>
  );
};

export default Page;
