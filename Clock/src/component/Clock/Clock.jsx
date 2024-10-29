import React, { useState, useEffect } from 'react';

const initialTimeZones = [
  { label: 'Singapore', value: 'Asia/Singapore', offset: '+2.5 hrs' },
  { label: 'Islamabad', value: 'Asia/Karachi', offset: '-0.5 hrs' },
  { label: 'Dhaka', value: 'Asia/Dhaka', offset: '+0.5 hrs' },
  { label: 'London', value: 'Europe/London', offset: '-5.5 hrs' },
];

const availableTimeZones = [
  { label: 'New York', value: 'America/New_York', offset: '-4 hrs' },
  { label: 'Tokyo', value: 'Asia/Tokyo', offset: '+9 hrs' },
  { label: 'Sydney', value: 'Australia/Sydney', offset: '+10 hrs' },
  { label: 'Moscow', value: 'Europe/Moscow', offset: '+3 hrs' },
  { label: 'Los Angeles', value: 'America/Los_Angeles', offset: '-7 hrs' },
  { label: 'Islamabad', value: 'Asia/Karachi', offset: '-0.5 hrs' },
  { label: 'Dhaka', value: 'Asia/Dhaka', offset: '+0.5 hrs' },
  { label: 'London', value: 'Europe/London', offset: '-5.5 hrs' },
].sort((a, b) => a.label.localeCompare(b.label));  // Sort alphabetically

const WorldClock = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [timeZones, setTimeZones] = useState(initialTimeZones);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeForZone = (timezone) => {
    const date = new Date();
    return {
      time: date.toLocaleTimeString('en-US', { timeZone: timezone, hour12: true }),
      date: date.toLocaleDateString('en-US', { timeZone: timezone }),
    };
  };

  const addTimeZone = (zone) => {
    setTimeZones((prevZones) => [...prevZones, zone]);
    setShowModal(false);
  };

  const removeTimeZone = (zoneValue) => {
    setTimeZones((prevZones) => prevZones.filter(zone => zone.value !== zoneValue));
  };

  const filteredTimeZones = availableTimeZones.filter(zone =>
    zone.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 text-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Clock</h1>
      <div className="text-6xl font-mono">
        {dateTime.toLocaleTimeString('en-US')}
      </div>
      <p className="text-lg text-gray-500">
        Current: {dateTime.toLocaleDateString('en-GB')} pm
      </p>

      <div className="mt-8 space-y-4">
        {timeZones.map((zone, index) => {
          const zoneTime = getTimeForZone(zone.value);
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            >
              <div>
                <h2 className="text-3xl font-bold">{zoneTime.time}</h2>
                <p className="text-gray-500">{zone.label}</p>
                <p className="text-gray-400 text-sm">
                  {zoneTime.date} | {zone.offset}
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-gray-400 text-4xl mr-4">🕒</div>
                <button
                  onClick={() => removeTimeZone(zone.value)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg text-2xl"
        >
          ➕
        </button>
      </div>

      {showModal && (
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
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {filteredTimeZones.map((zone, index) => (
                <li key={index}>
                  <button
                    onClick={() => addTimeZone(zone)}
                    className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    {zone.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldClock;
