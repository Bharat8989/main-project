'use client'

import React, { useState, useEffect, useRef } from 'react';

export default function Stopwatch() {
  const [time, setTime] = useState(() => {
    // Retrieve time from localStorage or default to 0
    const savedTime = localStorage.getItem('stopwatch-time');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    // Retrieve isRunning state from localStorage or default to false
    const savedIsRunning = localStorage.getItem('stopwatch-isRunning');
    return savedIsRunning === 'true';
  });
  const [splits, setSplits] = useState(() => {
    // Retrieve splits from localStorage or default to an empty array
    const savedSplits = localStorage.getItem('stopwatch-splits');
    return savedSplits ? JSON.parse(savedSplits) : [];
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    // Update localStorage whenever time, isRunning, or splits change
    localStorage.setItem('stopwatch-time', time);
    localStorage.setItem('stopwatch-isRunning', isRunning);
    localStorage.setItem('stopwatch-splits', JSON.stringify(splits));
  }, [time, isRunning, splits]);

  useEffect(() => {
    // Start or stop the interval based on isRunning state
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

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
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-lg shadow-xl max-w-md mx-auto">
      <div className="text-6xl font-bold text-white mb-8 text-center">
        {formatTime(time)}
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleStartStop}
          className={`px-4 py-2 text-white rounded ${
            isRunning ? 'bg-red-600' : 'bg-blue-600'
          }`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-4 py-2 text-white bg-gray-500 rounded">
          Reset
        </button>
        <button onClick={handleSplit} disabled={!isRunning} className="px-4 py-2 text-white bg-green-600 rounded">
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
  );
}
