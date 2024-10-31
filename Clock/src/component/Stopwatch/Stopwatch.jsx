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
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 p-4"
    >
      <h1 className="text-center p-4 font-bold text-4xl md:text-5xl font-sans text-blue-700 shadow-lg shadow-blue-300 rounded-lg border-b-4 border-blue-500 transition-transform duration-300 transform hover:scale-105">
        Stopwatch
      </h1>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-lg shadow-2xl max-w-lg md:max-w-2xl w-full mx-auto mt-6">
        <div className="text-center text-5xl md:text-7xl font-bold text-white mb-8">
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
