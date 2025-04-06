"use client";

import { useState, useEffect } from 'react';

const MemoryCardGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const cardImages = ["🐶", "🐱", "🦊", "🐻", "🐼", "🐨", "🐸", "🐵"];
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
    <div className="grid grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <button
          key={card.id}
          className={`border rounded-lg w-20 h-20 text-3xl ${
            matchedCards.includes(card.id) || selectedCards.includes(card) ? 'bg-green-200' : 'bg-gray-200'
          }`}
          onClick={() => handleCardClick(card)}
        >
          {matchedCards.includes(card.id) || selectedCards.includes(card) ? card.icon : '?' }
        </button>
      ))}
    </div>
  );
};

export default MemoryCardGame;