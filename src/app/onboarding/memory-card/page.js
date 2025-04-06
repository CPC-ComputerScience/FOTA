"use client";

import { useState, useEffect } from 'react';

const MemoryCardGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const cardImages = [
      '/images/BeiLiYa.jpg',
      '/images/DengChao.jpg',
      '/images/HaJiMi.jpg',
      '/images/MengLei.jpg',
      '/images/TianYiMing.jpg',
      '/images/Xiong2.jpg',
      '/images/XiongDa.jpg',
      '/images/YuJie.jpg'
    ];
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, flipped: false }));

    setCards(shuffledCards);
  }, []);

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || matchedCards.includes(card.id) || selectedCards.includes(card)) return;

    const newSelection = [...selectedCards, card];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      if (newSelection[0].icon === newSelection[1].icon) {
        setMatchedCards([...matchedCards, newSelection[0].id, newSelection[1].id]);
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Memory Card Game</h1>
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
            <img src={card.src} alt="card" className="w-12 h-12" />
          ) : (
            '❓'
          )}
        </button>
        
        ))}
      </div>
    </div>
  );
};

export default MemoryCardGame;
