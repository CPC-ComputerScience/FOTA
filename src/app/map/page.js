// src/app/map/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const floor1ImagePath = "/map/floor1.jpg"; // 一楼地图路径
const floor2ImagePath = "/map/floor2.jpg"; // 二楼地图路径
const scheduleImagePath = "/map/schedule.jpg"; // 完整时间表图片路径

const scheduleData = [
    // 音乐类活动
    {
      time: "6:45-7:00",
      locations: {
        "Lobby": "Crestwood Voices (warm-up)"
      }
    },
    {
      time: "7:15-7:30",
      locations: {
        "Gym 1 (office side)": "Jazz Band",
        "Courtyard": "DRAMA: Scenes & Games"
      }
    },
    {
      time: "7:30-7:45",
      locations: {
        "Gym 2 (scoreboard side)": "Gr.8 Band"
      }
    },
    {
      time: "7:45-8:00",
      locations: {
        "Gym 1 (office side)": "Strings Club"
      }
    },
    {
      time: "8:00-8:15",
      locations: {
        "Gym 2 (scoreboard side)": "Gr.9 Band"
      }
    },
    {
      time: "8:15-8:30",
      locations: {
        "Gym 1 (office side)": "Sr. Band"
      }
    },
    {
      time: "8:30-8:45",
      locations: {
        "Gym 2 (scoreboard side)": "Sr and Gr.9 Band"
      }
    },
    {
      time: "8:45-9:00",
      locations: {
        "Gym 2 (scoreboard side)": "Rock Band"
      }
    },
  
    // 长期活动（7:15-8:45）
    {
      time: "7:15-8:45",
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
      time: "7:45-8:15",
      locations: {
        "Courtyard": "AP Artwork and Painting demo"
      }
    }
  ];

const locationCoordinates = {
  "Gym 1 (office side)": { x: 120, y: 45 },
  "LC": { x: 300, y: 80 },
  "227.0": { x: 200, y: 150 },
  // 其他地点坐标...
};

export default function MapPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [showSchedule, setShowSchedule] = useState(false);

  // 时间转换函数
  const parseTime = (timeStr) => {
    const [start, end] = timeStr.split('-').map(t => {
      const [hours, minutes] = t.trim().split(':');
      const date = new Date();
      date.setHours(parseInt(hours)), 
      date.setMinutes(parseInt(minutes));
      return date;
    });
    return { start, end };
  };

  // 更新当前活动
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
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
    }, 1000 * 30); // 每30秒更新

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* 标题和楼层切换按钮 */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-black mb-2">FOTA Live Map</h1>
        <div className="flex space-x-2 mb-4">
          <button 
            onClick={() => setCurrentFloor(1)}
            className={`px-4 py-2 rounded-lg ${currentFloor === 1 ? 'bg-blue-600 text-white' : 'bg-white text-black border border-gray-300'}`}
          >
            1F
          </button>
          <button 
            onClick={() => setCurrentFloor(2)}
            className={`px-4 py-2 rounded-lg ${currentFloor === 2 ? 'bg-blue-600 text-white' : 'bg-white text-black border border-gray-300'}`}
          >
            2F
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* 地图容器 */}
        <div className="relative w-full md:w-2/3 aspect-video">
          <Image
            src={currentFloor === 1 ? floor1ImagePath : floor2ImagePath}
            alt={`Floor ${currentFloor} Map`}
            fill
            className="rounded-lg shadow-lg object-cover"
          />
          
          {/* 动态标记 */}
          {currentEvents.map((event, index) => (
            locationCoordinates[event.location] && (
              <div
                key={index}
                className="absolute animate-pulse"
                style={{
                  left: `${locationCoordinates[event.location].x}px`,
                  top: `${locationCoordinates[event.location].y}px`
                }}
              >
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                <div className="absolute left-6 top-0 bg-white p-2 rounded shadow text-sm min-w-[200px] border border-gray-200">
                  <h3 className="font-bold text-black">{event.location}</h3>
                  <p className="text-black">{event.activity}</p>
                  <p className="text-gray-600 text-xs">{event.time}</p>
                </div>
              </div>
            )
          ))}
        </div>

        {/* 活动侧边栏 */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Ongoing activities</h2>
          </div>
          
          {currentEvents.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {currentEvents.map((event, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                  <h3 className="font-semibold text-black">{event.location}</h3>
                  <p className="text-sm text-black">{event.activity}</p>
                  <p className="text-xs text-gray-600">{event.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No current activities</p>
          )}

          <button 
            onClick={() => setShowSchedule(!showSchedule)}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
    </div>
  );
}