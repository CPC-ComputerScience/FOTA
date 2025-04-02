// src/app/games/game1/page.js
import Link from 'next/link';
import Image from 'next/image';



export default function Game1Page() {
  return (
    <div className="game-container">
      {/* 返回上级链接 */}
      <Link href="/games" className="back-link">
        ← 返回游戏列表
      </Link>

      {/* 游戏标题 */}
      <h1 className="game-title">{gameData.title}</h1>

      {/* 游戏封面图 */}
      <div className="game-cover">
        <Image
          src={gameData.image}
          alt={gameData.title}
          width={600}
          height={400}
          priority
        />
      </div>

      {/* 游戏描述 */}
      <p className="game-description">{gameData.description}</p>

      {/* 游戏规则列表 */}
      <div className="game-rules">
        <h2>游戏规则</h2>
        <ul>
          {gameData.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      {/* 开始游戏按钮 */}
      <Link href="/games/game1/play" className="start-button">
        开始游戏
      </Link>
    </div>
  );
}