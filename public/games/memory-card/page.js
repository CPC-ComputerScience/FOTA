// src/app/games/memory-card/page.js
'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css';

// 卡片图标集（使用表情符号示例）
const cardSymbols = ['🎮', '🎲', '🎯', '🎨', '🎸', '🎭', '🎪', '🎫'];

// 生成卡片数组（每对两个相同的卡片）
const generateCards = () => {
  const duplicated = [...cardSymbols, ...cardSymbols];
  return duplicated
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }))
    .sort(() => Math.random() - 0.5); // 随机打乱顺序
};

export default function MemoryGame() {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);

  // 游戏计时器
  useEffect(() => {
    let timer;
    if (isGameActive) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  // 卡片点击处理
  const handleCardClick = (clickedCard) => {
    if (
      !isGameActive ||
      clickedCard.isMatched ||
      flippedCards.length === 2 ||
      flippedCards.some(card => card.id === clickedCard.id)
    ) return;

    const newCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    
    setCards(newCards);
    setFlippedCards([...flippedCards, clickedCard]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const [firstCard] = flippedCards;
      
      if (firstCard.symbol === clickedCard.symbol) {
        // 匹配成功
        setCards(prev => prev.map(card => 
          card.symbol === clickedCard.symbol 
            ? { ...card, isMatched: true } 
            : card
        ));
        
        // 检查是否全部匹配
        if (newCards.filter(card => card.isMatched).length === cards.length - 2) {
          setIsGameActive(false);
        }
      } else {
        // 匹配失败，翻转回去
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, isFlipped: false }
              : card
          ));
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  // 重置游戏
  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(true);
  };

  return (
    <div className={styles.container}>
      <h1>记忆卡片游戏</h1>
      
      <div className={styles.stats}>
        <div>时间: {time}秒</div>
        <div>步数: {moves}</div>
        <button onClick={resetGame}>重新开始</button>
      </div>

      <div className={styles.cardGrid}>
        {cards.map(card => (
          <div
            key={card.id}
            className={`${styles.card} 
              ${card.isFlipped ? styles.flipped : ''}
              ${card.isMatched ? styles.matched : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <div className={styles.cardFront}>{card.symbol}</div>
            <div className={styles.cardBack}>?</div>
          </div>
        ))}
      </div>

      {!isGameActive && (
        <div className={styles.gameOver}>
          <h2>恭喜！你赢了！</h2>
          <p>用时: {time}秒</p>
          <p>总步数: {moves}</p>
        </div>
      )}
    </div>
  );
}