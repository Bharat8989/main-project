import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialTimeZones = JSON.parse(localStorage.getItem('timeZones')) || [];

const availableTimeZones = [
  { label: 'New York', value: 'America/New_York', offset: '-9.5 hrs from IST' }, // UTC-5
  { label: 'Los Angeles', value: 'America/Los_Angeles', offset: '-12.5 hrs from IST' }, // UTC-8
  { label: 'Chicago', value: 'America/Chicago', offset: '-10.5 hrs from IST' }, // UTC-6
  { label: 'Houston', value: 'America/Chicago', offset: '-10.5 hrs from IST' }, // UTC-6
  { label: 'Phoenix', value: 'America/Phoenix', offset: '-12.5 hrs from IST' }, // UTC-7
  { label: 'London', value: 'Europe/London', offset: '-5.5 hrs from IST' }, // UTC+0
  { label: 'Tokyo', value: 'Asia/Tokyo', offset: '+3.5 hrs from IST' }, // UTC+9
  { label: 'Sydney', value: 'Australia/Sydney', offset: '+5.5 hrs from IST' }, // UTC+11
  { label: 'Auckland', value: 'Pacific/Auckland', offset: '+7.5 hrs from IST' }, // UTC+13
  { label: 'Moscow', value: 'Europe/Moscow', offset: '-2.5 hrs from IST' }, // UTC+3
  { label: 'Berlin', value: 'Europe/Berlin', offset: '-4.5 hrs from IST' }, // UTC+1
  { label: 'Paris', value: 'Europe/Paris', offset: '-4.5 hrs from IST' }, // UTC+1
  { label: 'Beijing', value: 'Asia/Shanghai', offset: '+2.5 hrs from IST' }, // UTC+8
  { label: 'New Delhi', value: 'Asia/Kolkata', offset: '0 hrs from IST' }, // UTC+5:30 (IST)
  { label: 'Bangkok', value: 'Asia/Bangkok', offset: '-1 hr from IST' }, // UTC+7
  { label: 'Dubai', value: 'Asia/Dubai', offset: '-1.5 hrs from IST' }, // UTC+4
  { label: 'Cape Town', value: 'Africa/Johannesburg', offset: '-3.5 hrs from IST' }, // UTC+2
  { label: 'Buenos Aires', value: 'America/Argentina/Buenos_Aires', offset: '-8.5 hrs from IST' }, // UTC-3
  { label: 'São Paulo', value: 'America/Sao_Paulo', offset: '-8.5 hrs from IST' }, // UTC-3
  { label: 'Toronto', value: 'America/Toronto', offset: '-10.5 hrs from IST' }, // UTC-5
  { label: 'Mexico City', value: 'America/Mexico_City', offset: '-11.5 hrs from IST' }, // UTC-6
  { label: 'Seoul', value: 'Asia/Seoul', offset: '+3.5 hrs from IST' }, // UTC+9
  { label: 'Singapore', value: 'Asia/Singapore', offset: '+2.5 hrs from IST' }, // UTC+8
  { label: 'Nairobi', value: 'Africa/Nairobi', offset: '-2.5 hrs from IST' }, // UTC+3
  { label: 'Jakarta', value: 'Asia/Jakarta', offset: '-0.5 hrs from IST' }, // UTC+7
  { label: 'Honolulu', value: 'Pacific/Honolulu', offset: '-15.5 hrs from IST' }, // UTC-10
  { label: 'Istanbul', value: 'Europe/Istanbul', offset: '-2.5 hrs from IST' }, // UTC+3
  { label: 'Athens', value: 'Europe/Athens', offset: '-3.5 hrs from IST' }, // UTC+2
  { label: 'Cairo', value: 'Africa/Cairo', offset: '-3.5 hrs from IST' }, // UTC+2
  { label: 'Rome', value: 'Europe/Rome', offset: '-4.5 hrs from IST' }, // UTC+1
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
    <div className='p-4 py-12 bg-transparent'>
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

    <div className="p-6 gap-20 sm:p-6 lg:p-8 text-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-6xl font-bold text-center mb-4 "> Clock</h1>
        <div className="text-6xl font-mono text-center">
          {dateTime.toLocaleTimeString('en-US')}
        </div>
        <p className="text-lg text-gray-300 text-center">
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
                  className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold">{zoneTime.time}</h2>
                    <p className="text-gray-300">{zone.label}</p>
                    <p className="text-gray-400 text-sm">
                      {zoneTime.date} | {zone.offset}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
  <span className="text-gray-400 w-10 text-2xl">🕒</span> {/* Increased text size */}
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
  className="bg-slate-300 text-white p-2 rounded-full shadow-lg text-2xl flex items-center relative -mt-2"
>
  ➕ 
</button>

        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
            <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Select a City</h2>
              <input
                type="text"
                placeholder="Search city or country"
                className="w-full p-3 mb-4 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="h-64 overflow-y-auto space-y-2">
                {filteredTimeZones.map((zone) => (
                  <button
                    key={zone.value}
                    onClick={() => addTimeZone(zone)}
                    className="w-full text-left p-2 bg-gray-700 hover:bg-slate-500 rounded"
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
