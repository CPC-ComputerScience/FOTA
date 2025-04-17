// src/app/map/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
const mapImagePath = "/map/map.jpg";


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

// 地点坐标映射（需根据实际地图调整）
const locationCoordinates = {
  "Gym 1 (office side)": { x: 120, y: 45 },
  "LC": { x: 300, y: 80 },
  "227.0": { x: 200, y: 150 },
  // 其他地点坐标...
};

export default function MapPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentEvents, setCurrentEvents] = useState([]);

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
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">FOTA Live Map</h1>
      
      <div className="flex gap-8">
        {/* 地图容器 */}
        <div className="relative flex-1">
          <Image
            src={mapImagePath} // 直接使用路径
            alt="场馆地图"
            width={1200}      // 设置图片实际宽度（单位：像素）
            height={800}      // 设置图片实际高度
            className="rounded-lg shadow-lg"
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
                <div className="absolute left-6 top-0 bg-white p-2 rounded shadow text-sm min-w-[200px]">
                  <h3 className="font-bold">{event.location}</h3>
                  <p>{event.activity}</p>
                  <p className="text-gray-500 text-xs">{event.time}</p>
                </div>
              </div>
            )
          ))}
        </div>

        {/* 活动侧边栏 */}
        <div className="w-80 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Ongoing activities</h2>
          {currentEvents.length > 0 ? (
            currentEvents.map((event, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded">
                <h3 className="font-semibold">{event.location}</h3>
                <p className="text-sm">{event.activity}</p>
                <p className="text-xs text-gray-500">{event.time}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No current activities</p>
          )}
        </div>
      </div>
    </div>
  );
}