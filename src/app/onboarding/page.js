// src/app/onboarding/page.js
import Link from 'next/link';
import Image from 'next/image';

// 游戏数据配置（必须定义在组件函数之前！）
const games = [
  {
    id: 1,
    title: "GAME1",
    path: "",
    image: "/games/memory-card.png", // 确保图片在 public/games 目录下
    description: "带带大师兄",
  },
  {
    id: 2,
    title: "GAME1: Memory Card",
    path: "/app/game-2",
    image: "/games/klotski.png",
    description: "你所热爱的，就是你的生活",
  },
  {
    id: 3,
    title: "GAME3",
    path: "/games/quiz",
    image: "/games/quiz.png",
    description: "尊尼获加我给你房管你给我说话来",
  },
];

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* 返回主页按钮 */}
      <Link href="/" className="mb-8 inline-block text-blue-600 hover:text-blue-800">
        ← Back to home page
      </Link>

      {/* 游戏入口网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={game.path}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* 游戏图片 */}
            <div className="relative h-48">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover"
              />
            </div>

            {/* 文字描述区域（已修复标题颜色） */}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {game.title}
              </h2>
              <p className="text-gray-600">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}