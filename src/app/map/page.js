// src/app/map/page.js
'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const floor1ImagePath = "/map/floor1.png"; // 一楼地图路径
const floor2ImagePath = "/map/floor2.png"; // 二楼地图路径
const scheduleImagePath = "/map/schedule.png"; // 完整时间表图片路径

const scheduleData = [
    // 音乐类活动
    {
      time: "18:45-19:00",
      locations: {
        "Lobby": "Crestwood Voices (warm-up)"
      }
    },
    {
      time: "19:15-19:30",
      locations: {
        "Gym 1 (office side)": "Jazz Band",
        "Courtyard": "DRAMA: Scenes & Games"
      }
    },
    {
      time: "19:30-19:45",
      locations: {
        "Gym 2 (scoreboard side)": "Gr.8 Band"
      }
    },
    {
      time: "19:45-20:00",
      locations: {
        "Gym 1 (office side)": "Strings Club"
      }
    },
    {
      time: "20:00-20:15",
      locations: {
        "Gym 2 (scoreboard side)": "Gr.9 Band"
      }
    },
    {
      time: "20:15-20:30",
      locations: {
        "Gym 1 (office side)": "Sr. Band"
      }
    },
    {
      time: "20:30-20:45",
      locations: {
        "Gym 2 (scoreboard side)": "Sr and Gr.9 Band"
      }
    },
    {
      time: "20:45-21:00",
      locations: {
        "Gym 2 (scoreboard side)": "Rock Band"
      }
    },
  
    // 长期活动（7:15-8:45）
    {
      time: "19:15-20:45",
      locations: {
        "LC": "TGJ Displays & Grade 9 Science Periodic Table Element Cubes",
        "Guidance Hallway outside LC": "Intro to Robotics Escape Room + TEJ3M Arduino Installation",
        "Tech Hallway outside LC": "Posters for Photo Contest",
        "113": "Grade 12 Art Installation",
        "115": "Grade 12 Art Installation",
        "117": "Grade 12 Art Installation",
        "119": "Grade 12 Art Installation",
        "120": "Community Art Project",
        "110": "DRAMA: Scenes & Games",
        "108": "Drama Short Films & Set Dioramas",
        "112": "Photobooth"
      }
    },
  
    // 其他时间段活动
    {
      time: "19:45-20:15",
      locations: {
        "Courtyard": "AP Artwork and Painting demo"
      }
    }
  ];

const locationCoordinates = {
  
};

export default function MapPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 时间转换函数
  const parseTime = (timeStr) => {
    const [start, end] = timeStr.split('-').map(t => {
      const [hours, minutes] = t.trim().split(':');
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      return date;
    });
    return { start, end };
  };

  // 封装更新事件的逻辑
  const updateEvents = useCallback(() => {
    const activeEvents = scheduleData.filter(event => {
      const { start, end } = parseTime(event.time);
      return currentTime >= start && currentTime <= end;
    }).flatMap(event => 
      Object.entries(event.locations).map(([location, activity]) => ({
        location,
        activity,
        time: event.time
      }))
    );
    setCurrentEvents(activeEvents);
  }, [currentTime]);

  // 更新当前时间和活动
  useEffect(() => {
    updateEvents(); // Initial call
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // Update time periodically
      updateEvents(); // Update events with new time
    }, 1000 * 30); // Every 30 seconds
    return () => clearInterval(timer);
  }, [updateEvents]); // Depends on updateEvents, which depends on currentTime

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* 标题和楼层切换 - 始终显示 */}
      <div className="mb-4 sticky top-0 bg-gray-100 z-10 pt-2 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">FOTA Live Map</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentFloor(1)}
              className={`px-4 py-2 rounded-lg text-sm md:text-base ${
                currentFloor === 1 ? 'bg-blue-600 text-white' : 'bg-white text-black border border-gray-300'
              }`}
            >
              1F
            </button>
            <button 
              onClick={() => setCurrentFloor(2)}
              className={`px-4 py-2 rounded-lg text-sm md:text-base ${
                currentFloor === 2 ? 'bg-blue-600 text-white' : 'bg-white text-black border border-gray-300'
              }`}
            >
              2F
            </button>
          </div>
        </div>
        {/* 返回主页按钮 */}
        <Link href="/" passHref>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm md:text-base hover:bg-green-700 transition-colors">
            Back
          </button>
        </Link>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* 活动侧边栏 - 移动端放上面 */}
        <div className={`w-full ${isMobile ? 'mb-4' : 'md:w-1/3'}`}>
          <div className="bg-white p-4 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-black">Ongoing activities</h2>
            </div>
            
            <div className={`${isMobile ? 'max-h-[200px]' : 'max-h-[400px]'} overflow-y-auto mb-4`}>
              {currentEvents.length > 0 ? (
                currentEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200 mb-2">
                    <h3 className="font-semibold text-black text-sm md:text-base">{event.location}</h3>
                    <p className="text-black text-xs md:text-sm">{event.activity}</p>
                    <p className="text-gray-600 text-xs">{event.time}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No current activities</p>
              )}
            </div>

            <button 
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              {showSchedule ? 'Hide Full Schedule' : 'Show Full Schedule'}
            </button>

            {showSchedule && (
              <div className="mt-4">
                <Image
                  src={scheduleImagePath}
                  alt="Full Event Schedule"
                  width={600}
                  height={800}
                  className="w-full h-auto rounded border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* 地图容器 - 移动端放下面 */}
        <div className={`w-full ${isMobile ? 'h-[60vh]' : 'md:w-2/3 aspect-video'}`}>
          <div className="relative w-full h-full bg-gray-200 rounded-lg shadow-lg overflow-hidden">
            <Image
              src={currentFloor === 1 ? floor1ImagePath : floor2ImagePath}
              alt={`Floor ${currentFloor} Map`}
              fill
              className="object-contain"
              priority
            />
            
            {/* 动态标记 */}
            {currentEvents.map((event, index) => (
              locationCoordinates[event.location] && (
                <div
                  key={index}
                  className="absolute animate-pulse"
                  style={{
                    left: `${locationCoordinates[event.location].x}px`,
                    top: `${locationCoordinates[event.location].y}px`,
                    transform: isMobile ? 'scale(0.8)' : 'scale(1)'
                  }}
                >
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full shadow-lg"></div>
                  <div className={`absolute left-4 md:left-6 top-0 bg-white p-2 rounded shadow ${
                    isMobile ? 'text-xs min-w-[120px]' : 'text-sm min-w-[200px]'
                  } border border-gray-200`}>
                    <h3 className="font-bold text-black">{event.location}</h3>
                    <p className="text-black">{event.activity}</p>
                    <p className="text-gray-600 text-xs">{event.time}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}