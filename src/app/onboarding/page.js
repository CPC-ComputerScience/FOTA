// src/app/onboarding/page.js
import Link from 'next/link';
import Image from 'next/image';

// 游戏数据配置（必须定义在组件函数之前！）
const games = [
  {
    id: 1,
    title: "GAME1: Memory Card",
    path: "/onboarding/memory-card",
    image: "/games/memory-card.jpg", // 确保图片在 public/games 目录下
    description: "10101001000101101001110101001000011100111110001001000101",
  },
  {
    id: 2,
    title: "GAME2",
    path: "/games/klotski",
    image: "/games/klotski.jpg",
    description: "---",
  },
  {
    id: 3,
    title: "GAME3",
    path: "/games/quiz",
    image: "/games/quiz.jpg",
    description: "---",
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