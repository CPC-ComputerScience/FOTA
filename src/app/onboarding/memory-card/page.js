"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MemoryCardGame = () => {
  const router = useRouter();

  // State to store all cards
  const [cards, setCards] = useState([]);

  // State to track selected (clicked) cards
  const [selectedCards, setSelectedCards] = useState([]);

  // State to track cards that have been matched
  const [matchedCards, setMatchedCards] = useState([]);

  // State to track game start and end times
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Function to initialize or restart the game
  const initializeGame = () => {
    const cardImages = [
      '/images/BeiLiYa.jpg',
      '/images/DengChao.jpeg',
      '/images/HaJiMi.jpg',
      '/images/MengLei.jpg',
      '/images/TianYiMing.jpg',
      '/images/Xiong2.jpg',
      '/images/XiongDa.jpg',
      '/images/YuJie.jpg',
    ];

    // Duplicate and shuffle the cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({ id: index, src }));

    // Reset all game states
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedCards([]);
    setStartTime(Date.now());
    setEndTime(null);
  };

  // Initialize the game when the page first loads
  useEffect(() => {
    initializeGame();
  }, []);

  // Set end time when all cards are matched
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0 && !endTime) {
      setEndTime(Date.now());
    }
  }, [matchedCards, cards, endTime]);

  // Handle card click logic
  const handleCardClick = (card) => {
    // Prevent clicking if already selected or matched or if 2 cards are selected
    if (
      selectedCards.length === 2 ||
      matchedCards.includes(card.id) ||
      selectedCards.includes(card)
    )
      return;

    const newSelection = [...selectedCards, card];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      // Check if two selected cards match
      if (newSelection[0].src === newSelection[1].src) {
        setMatchedCards([...matchedCards, newSelection[0].id, newSelection[1].id]);
        setSelectedCards([]);
      } else {
        // If not matched, flip them back after a short delay
        setTimeout(() => {
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  // Check if the player has won
  const hasWon = matchedCards.length === cards.length && cards.length > 0;

  // Calculate elapsed time once the game is finished
  const elapsedTime = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Memory Card Game</h1>

      {/* Show winning message and time taken */}
      {hasWon && (
        <div className="text-center mb-4">
          <h2 className="text-2xl text-green-700 font-semibold">🎉 Congratulations! You Won! 🎉</h2>
          {elapsedTime && <p className="text-lg mt-2">Time Taken: {elapsedTime} seconds</p>}
        </div>
      )}

      {/* Game board grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`flex items-center justify-center border-4 border-white rounded-lg w-20 h-24 shadow-md transform transition duration-200 ease-in-out hover:scale-105 ${
              matchedCards.includes(card.id) || selectedCards.includes(card)
                ? 'bg-green-300'
                : 'bg-white'
            }`}
            onClick={() => handleCardClick(card)}
          >
            {/* Show image if matched or selected, otherwise show question mark */}
            {matchedCards.includes(card.id) || selectedCards.includes(card) ? (
              <img src={card.src} alt="card" className="w-24 h-24 object-cover object-top rounded" />
            ) : (
              '❓'
            )}
          </button>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={initializeGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Restart Game
        </button>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MemoryCardGame;
