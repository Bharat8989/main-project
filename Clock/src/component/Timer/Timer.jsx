'use client'

// import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Maximize, Minimize } from 'lucide-react';

export default function Timer() {
  const [hours, setHours] = useState(parseInt(localStorage.getItem("hours")) || 0);
  const [minutes, setMinutes] = useState(parseInt(localStorage.getItem("minutes")) || 0);
  const [seconds, setSeconds] = useState(parseInt(localStorage.getItem("seconds")) || 0);
  const [isRunning, setIsRunning] = useState(JSON.parse(localStorage.getItem("isRunning")) || false);
  const [timeLeft, setTimeLeft] = useState(parseInt(localStorage.getItem("timeLeft")) || 0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert('Time is up!');
    }

    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("isRunning", JSON.stringify(isRunning));
    localStorage.setItem("hours", hours);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, hours, minutes, seconds]);

  const handleStart = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) return;
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
  };

  const handleScroll = (type, value) => {
    if (type === 'hours') setHours(value);
    if (type === 'minutes') setMinutes(value);
    if (type === 'seconds') setSeconds(value);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullScreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  const formatTime = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="flex items-center justify-center min-h-screen bg-transparent p-4">
    
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

   
      
      <div className="w-full max-w-xs">
        {/* Time Picker - Only show when not running */}
        {!isRunning && (
          <>
            <div className="text-center mb-4 text-3xl text-white font-semibold">
              <h1 className="text-6xl font-bold text-center mb-4 p-2"> Timer </h1>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              {['hours', 'minutes', 'seconds'].map((type) => (
                <div 
                  key={type} 
                  className="relative w-16 h-48 bg-slate-800 rounded-lg overflow-hidden"
                >
                  <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-slate-800 to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none z-10" />
                  <div className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
                    <div className="text-center pt-[88px] pb-[88px]">
                      {Array.from({ length: type === 'hours' ? 24 : 60 }, (_, i) => i).map((value) => (
                        <div
                          key={value}
                          className={`h-12 flex items-center justify-center cursor-pointer snap-center ${
                            (type === 'hours' && value === hours) ||
                            (type === 'minutes' && value === minutes) ||
                            (type === 'seconds' && value === seconds)
                              ? 'text-white text-2xl font-bold'
                              : 'text-slate-500 text-xl'
                          }`}
                          onClick={() => handleScroll(type, value)}
                        >
                          {String(value).padStart(2, '0')}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Timer Display */}
        <div className="text-7xl font-bold text-center mb-6 text-white font-mono">
          {formatTime(timeLeft)}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-3">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Play className="mr-2 h-4 w-4" />
              Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Pause className="mr-2 h-4 w-4" />
              Stop
            </button>
          )}
          <button
            onClick={handleRestart}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Restart
          </button>
          <button
            onClick={toggleFullScreen}
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
