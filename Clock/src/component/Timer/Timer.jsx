'use client'

import React, { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(() => JSON.parse(localStorage.getItem('isRunning')) || false);
  const [timeLeft, setTimeLeft] = useState(() => JSON.parse(localStorage.getItem('timeLeft')) || 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Save `timeLeft` and `isRunning` states to localStorage
    localStorage.setItem('timeLeft', JSON.stringify(timeLeft));
    localStorage.setItem('isRunning', JSON.stringify(isRunning));
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert('Your timer has finished!');
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) return;
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
  };

  const formatTime = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Countdown Timer</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
            <input
              type="number"
              id="hours"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
            <input
              type="number"
              id="minutes"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-1">Seconds</label>
            <input
              type="number"
              id="seconds"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="text-5xl font-bold text-center mb-6 text-gray-800">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={handleStart} disabled={isRunning} className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600">
            Start
          </button>
          <button onClick={handleStop} disabled={!isRunning} className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600">
            Stop
          </button>
          <button onClick={handleRestart} className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
