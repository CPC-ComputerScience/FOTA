// src/app/test/page.js
'use client';
import { useState, useEffect } from 'react';

// 复制您原有的活动数据
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

export default function TestPage() {
  const [testTime, setTestTime] = useState("07:20");
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  // 时间转换函数 (从您的代码复制)
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

  // 测试函数
  const testActivities = () => {
    const [hours, minutes] = testTime.split(':');
    const testDate = new Date();
    testDate.setHours(parseInt(hours));
    testDate.setMinutes(parseInt(minutes));

    const activeEvents = scheduleData.filter(event => {
      const { start, end } = parseTime(event.time);
      return testDate >= start && testDate <= end;
    }).flatMap(event => 
      Object.entries(event.locations).map(([location, activity]) => ({
        location,
        activity,
        time: event.time
      }))
    );

    setCurrentEvents(activeEvents);
    setIsTesting(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-black">活动功能测试</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">测试控制面板</h2>
        
        <div className="flex items-center gap-4 mb-4">
          <label className="text-black">
            测试时间:
            <input
              type="time"
              value={testTime}
              onChange={(e) => setTestTime(e.target.value)}
              className="ml-2 p-2 border rounded"
            />
          </label>
          
          <button
            onClick={testActivities}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            测试该时间
          </button>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <p className="text-black">
            <span className="font-semibold">当前测试时间:</span> {testTime}
          </p>
          <p className="text-black">
            <span className="font-semibold">系统时间:</span> {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {isTesting && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">测试结果</h2>
          
          {currentEvents.length > 0 ? (
            <div className="space-y-3">
              {currentEvents.map((event, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded border border-gray-200">
                  <h3 className="font-bold text-black">{event.location}</h3>
                  <p className="text-black">{event.activity}</p>
                  <p className="text-sm text-gray-600">时间段: {event.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 p-4 bg-yellow-50 rounded border border-yellow-200">
              该时间段没有活动安排
            </p>
          )}

          <button
            onClick={() => setIsTesting(false)}
            className="mt-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            重置测试
          </button>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-black">所有活动时间表</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-black border">时间段</th>
                <th className="px-4 py-2 text-left text-black border">地点</th>
                <th className="px-4 py-2 text-left text-black border">活动</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.flatMap(event => 
                Object.entries(event.locations).map(([location, activity], i) => (
                  <tr key={`${event.time}-${i}`} className="border">
                    <td className="px-4 py-2 text-black border">{i === 0 ? event.time : ''}</td>
                    <td className="px-4 py-2 text-black border">{location}</td>
                    <td className="px-4 py-2 text-black border">{activity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}