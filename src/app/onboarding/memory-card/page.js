"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MemoryCardGame = () => {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

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

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({ id: index, src }));

    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    if (
      selectedCards.length === 2 ||
      matchedCards.includes(card.id) ||
      selectedCards.includes(card)
    )
      return;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Memory Card Game</h1>

      {hasWon && <h2 className="text-2xl text-green-700 font-semibold mb-4">🎉 Congratulations! You Won! 🎉</h2>}

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`flex items-center justify-center border-4 border-white rounded-lg w-24 h-24 shadow-md transform transition duration-200 ease-in-out hover:scale-105 ${
              matchedCards.includes(card.id) || selectedCards.includes(card)
                ? 'bg-green-300'
                : 'bg-white'
            }`}
            onClick={() => handleCardClick(card)}
          >
            {matchedCards.includes(card.id) || selectedCards.includes(card) ? (
              <img src={card.src} alt="card" className="w-12 h-12 object-cover rounded" />
            ) : (
              '❓'
            )}
          </button>
        ))}
      </div>

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
