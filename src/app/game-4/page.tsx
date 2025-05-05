'use client';

import React, { useState } from 'react';
import Card from './components/Card';
import './styles/game.css';

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const Page = () => {
  const [targetNumber] = useState(getRandomNumber());
  const [guess, setGuess] = useState(50);
  const [message, setMessage] = useState('');
  const [animate, setAnimate] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [textColor, setTextColor] = useState('black');
  const [guessCount, setGuessCount] = useState(0);
  const [codeVisible, setCodeVisible] = useState(false); // New state for showing code
  const [flashClass, setFlashClass] = useState('');

  const submitGuess = () => {
    if (gameOver) return;

    setAnimate(true);
    setGuessCount(prev => prev + 1);

    if (guess === targetNumber) {
      setMessage(`🎉 You guessed it in ${guessCount + 1} guesses! The number was ${targetNumber}.`);
      setGameOver(true);
      setTextColor('green');
      setCodeVisible(true);
      setFlashClass('');
    } else if (guess < targetNumber) {
      setMessage('Too low!');
      setTextColor('blue');
      setFlashClass('flash-blue');
    } else {
      setMessage('Too high!');
      setTextColor('red');
      setFlashClass('flash-red');
    }
    setTimeout(() => {
      setAnimate(false);
      setTextColor('black');
      setFlashClass('');
    }, 500);

  };

  return (
    <div className="container">
      <h1>Higher or Lower?</h1>
      <p>How it works: The goal of the game is to try to guess the randomly chosen number.</p>
      <Card number={guess} animate={animate} textColor={textColor} />
      <p>Guesses: {guessCount}</p>
      <p className={`message ${flashClass}`}>{message}</p>
      {codeVisible && (
        <div className="secret-code">
          <p>Your code is: <strong>1192</strong></p>
        </div>
      )}
      {!gameOver && (
        <>
          <div className="guess-controls">
            <button onClick={() => setGuess(prev => Math.max(1, prev - 10))}>-10</button>
            <button onClick={() => setGuess(prev => Math.max(1, prev - 1))}>-1</button>
            <button onClick={() => setGuess(prev => Math.min(100, prev + 1))}>+1</button>
            <button onClick={() => setGuess(prev => Math.min(100, prev + 10))}>+10</button>
          </div>
          <button className="submit-btn" onClick={submitGuess}>Submit Guess</button>
        </>
      )}
    </div>
  );
};

export default Page;