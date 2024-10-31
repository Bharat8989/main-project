'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function Timer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(() => JSON.parse(localStorage.getItem('isRunning') || 'false'))
  const [timeLeft, setTimeLeft] = useState(() => JSON.parse(localStorage.getItem('timeLeft') || '0'))
  const intervalRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('timeLeft', JSON.stringify(timeLeft))
    localStorage.setItem('isRunning', JSON.stringify(isRunning))
  }, [timeLeft, isRunning])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      alert('Your timer has finished!')
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, timeLeft])

  const handleStart = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) return
    setTimeLeft(hours * 3600 + minutes * 60 + seconds)
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleRestart = () => {
    setIsRunning(false)
    setTimeLeft(hours * 3600 + minutes * 60 + seconds)
  }

  const formatTime = (time) => {
    const h = Math.floor(time / 3600)
    const m = Math.floor((time % 3600) / 60)
    const s = time % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-center">Countdown Timer</h1>
        </div>
        <div className="p-4">
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
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <motion.div
            className="text-5xl font-bold text-center mb-6 text-gray-800"
            key={timeLeft}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {formatTime(timeLeft)}
          </motion.div>
          <div className="flex justify-center space-x-4">
            <AnimatePresence mode="wait">
              {!isRunning ? (
                <motion.button
                  key="start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleStart}
                  disabled={isRunning}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <Play className="mr-2 h-4 w-4" /> 
                </motion.button>
              ) : (
                <motion.button
                  key="stop"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleStop}
                  disabled={!isRunning}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Pause className="mr-2 h-4 w-4" /> 
                </motion.button>
              )}
            </AnimatePresence>
            <button onClick={handleRestart} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <RotateCcw className="mr-2 h-4 w-4" /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
