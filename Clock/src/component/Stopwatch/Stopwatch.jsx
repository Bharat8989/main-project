'use client'

import React, { useState, useEffect, useRef } from 'react';

export default function Stopwatch() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('stopwatch-time');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem('stopwatch-isRunning');
    return savedIsRunning === 'true';
  });
  const [splits, setSplits] = useState(() => {
    const savedSplits = localStorage.getItem('stopwatch-splits');
    return savedSplits ? JSON.parse(savedSplits) : [];
  });
  const intervalRef = useRef(null);
  const stopwatchRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('stopwatch-time', time);
    localStorage.setItem('stopwatch-isRunning', isRunning);
    localStorage.setItem('stopwatch-splits', JSON.stringify(splits));
  }, [time, isRunning, splits]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        // Enter full-screen mode
        if (stopwatchRef.current && !document.fullscreenElement) {
          stopwatchRef.current.requestFullscreen();
        }
      } else if (e.key === 'Escape') {
        // Exit full-screen mode
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setSplits([]);
    localStorage.removeItem('stopwatch-time');
    localStorage.removeItem('stopwatch-isRunning');
    localStorage.removeItem('stopwatch-splits');
  };

  const handleSplit = () => {
    setSplits((prevSplits) => [...prevSplits, time]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={stopwatchRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-transparent p-4"
    >
          <meta charset="UTF-8" />
<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="A comprehensive timer application built using React, featuring time management tools such as a stopwatch and full-screen timer." />
<meta name="author" content="Bharat Kadam" />
<meta name="keywords" content="Clock, React App, Time Zones, Bharat Kadam, World Clock, Indian Time Zone, Full-Screen Timer, Stopwatch, Timer" />
<meta name="robots" content="index, follow" />
<meta name="language" content="English" />
<meta property="og:title" content="World Clock & Timer App: Manage Time Across Time Zones" />
<meta property="og:description" content="Explore time management with our full-featured clock and timer app, including global time zones and stopwatch functionalities." />
{/* <meta property="og:image" content="URL_to_your_app_image" /> */}
{/* <meta property="og:url" content="https://yourappurl.com" /> */}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="World Clock & Timer App: Manage Time Across Time Zones" />
<meta name="twitter:description" content="Explore time management with our full-featured clock and timer app, including global time zones and stopwatch functionalities." />
{/* <meta name="twitter:image" content="URL_to_your_app_image" /> */}
{/* <meta name="canonical" content="https://yourappurl.com" /> */}

      <h1 className="text-6xl font-bold text-center mb-4 text-white ">Stopwatch</h1>
      <div className="bg-gradient-to-r bg-transparent  p-8 rounded-lg shadow-2xl max-w-lg md:max-w-2xl w-full mx-auto mt-6">
        <div className="text-center text-7xl md:text-7xl font-bold text-white mb-8">
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleStartStop}
            className={`px-6 py-3 text-lg font-semibold text-white rounded ${
              isRunning ? 'bg-red-600' : 'bg-blue-600'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 text-lg font-semibold text-white bg-gray-500 rounded"
          >
            Reset
          </button>
          <button
            onClick={handleSplit}
            disabled={!isRunning}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded"
          >
            Split
          </button>
        </div>
        {splits.length > 0 && (
          <div className="h-40 overflow-y-auto rounded border p-4 bg-gray-800">
            <h3 className="font-semibold text-white mb-2">Split Times:</h3>
            <ul className="space-y-2">
              {splits.map((splitTime, index) => (
                <li key={index} className="text-white">
                  {index + 1}. {formatTime(splitTime)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
