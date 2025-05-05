"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MemoryCardGame = () => {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showPin, setShowPin] = useState(false); 
  const [refreshAnimated, setRefreshAnimated] = useState(false);

  const initializeGame = () => {
    const allCardImages = [
      '/images/1.jpg',
      '/images/2.jpeg',
      '/images/3.jpg',
      '/images/4.jpg',
      '/images/5.jpg',
      '/images/6.jpg',
      '/images/7.jpg',
      '/images/8.jpg',
      '/images/9.jpg',
      '/images/10.jpg',
      '/images/11.jpg',
    ];
  
    //  Randomly pick 8 images out of 11
    const selectedImages = [...allCardImages]
  .sort(() => Math.random() - 0.5)
  .slice(0, 8);
  

    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({ id: index, src }));
  
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedCards([]);
    setStartTime(Date.now());
    setEndTime(null);
    setShowPin(false);
  
    setRefreshAnimated(true);
    setTimeout(() => {
      setRefreshAnimated(false);
    }, 400);
  };
  

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0 && !endTime) {
      setEndTime(Date.now());
      setShowPin(true); // Show PIN when game is won
    }
  }, [matchedCards, cards, endTime]);

  const handleCardClick = (card) => {
    if (
      selectedCards.length === 2 ||
      matchedCards.includes(card.id) ||
      selectedCards.includes(card)
    ) return;

    const newSelection = [...selectedCards, card];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      if (newSelection[0].src === newSelection[1].src) {
        setMatchedCards([...matchedCards, newSelection[0].id, newSelection[1].id]);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  const hasWon = matchedCards.length === cards.length && cards.length > 0;
  const elapsedTime = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-300 flex flex-col items-center justify-center p-4">
      <h1 className={`text-3xl font-bold mb-4 text-gray-800 transition duration-300 ${
  refreshAnimated ? 'animate-bounce text-blue-600' : ''
}`}>
  {hasWon ? "🎉YOU WON!🎉" : "Memory Card Game"}
</h1>


      {/* Show winning message, time taken, and PIN */}
      {hasWon && (
        <div className="text-center mb-4">

          {elapsedTime && (
            <p className="text-2xl font-bold text-blue-800 mt-2">
              Time Taken: {elapsedTime} seconds
            </p>
          )}
          {showPin && (
            <p className="text-3xl font-extrabold text-red-600 underline mt-4">
              Your PIN: 2913
            </p>
          )}
        </div>
      )}

      {/* Game board grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
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
            {matchedCards.includes(card.id) || selectedCards.includes(card) ? (
              <div className="relative w-20 h-24 rounded overflow-hidden">
              <Image
                src={card.src}
                alt="card"
                fill
                className="object-cover object-top rounded"
                sizes="(max-width: 768px) 20vw, 80px"
                priority
              />
            </div>
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

        { 
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Back to home page
        </button>
        }
      </div>
    </div>
  );
};

export default MemoryCardGame;
