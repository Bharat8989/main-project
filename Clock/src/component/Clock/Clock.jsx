import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialTimeZones = JSON.parse(localStorage.getItem('timeZones')) || [];

const availableTimeZones = [
  { label: 'New York', value: 'America/New_York', offset: '-4 hrs' },
  { label: 'Tokyo', value: 'Asia/Tokyo', offset: '+9 hrs' },
  { label: 'Sydney', value: 'Australia/Sydney', offset: '+10 hrs' },
  { label: 'Moscow', value: 'Europe/Moscow', offset: '+3 hrs' },
  { label: 'Los Angeles', value: 'America/Los_Angeles', offset: '-7 hrs' },
].sort((a, b) => a.label.localeCompare(b.label));

export default function WorldClock() {
  const [dateTime, setDateTime] = useState(new Date());
  const [timeZones, setTimeZones] = useState(initialTimeZones);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update localStorage whenever timeZones changes
  useEffect(() => {
    localStorage.setItem('timeZones', JSON.stringify(timeZones));
  }, [timeZones]);

  const getTimeForZone = (timezone) => {
    const date = new Date();
    return {
      time: date.toLocaleTimeString('en-US', { timeZone: timezone, hour12: true }),
      date: date.toLocaleDateString('en-US', { timeZone: timezone }),
    };
  };

  const addTimeZone = (zone) => {
    setTimeZones((prevZones) => [...prevZones, zone]);
    setIsDialogOpen(false);
  };

  const removeTimeZone = (zoneValue) => {
    setTimeZones((prevZones) => prevZones.filter(zone => zone.value !== zoneValue));
  };

  const filteredTimeZones = availableTimeZones.filter(zone =>
    zone.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='p-4 py-12'>
    <div className="p-6 gap-20 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-6xl font-bold text-center mb-4 "> Clock</h1>
        <div className="text-6xl font-mono text-center">
          {dateTime.toLocaleTimeString('en-US')}
        </div>
        <p className="text-lg text-gray-600 text-center">
          Current: {dateTime.toLocaleDateString('en-GB')}
        </p>

        <div className="mt-8 space-y-6">
          <AnimatePresence>
            {timeZones.map((zone, index) => {
              const zoneTime = getTimeForZone(zone.value);
              return (
                <motion.div
                  key={zone.value}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold">{zoneTime.time}</h2>
                    <p className="text-gray-600">{zone.label}</p>
                    <p className="text-gray-400 text-sm">
                      {zoneTime.date} | {zone.offset}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 w-8 h-8">🕒</span>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => removeTimeZone(zone.value)}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg text-2xl flex items-center"
          >
            ➕ 
          </button>
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Select a City</h2>
              <input
                type="text"
                placeholder="Search city or country"
                className="w-full p-2 mb-4 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="h-64 overflow-y-auto space-y-2">
                {filteredTimeZones.map((zone) => (
                  <button
                    key={zone.value}
                    onClick={() => addTimeZone(zone)}
                    className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    {zone.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
