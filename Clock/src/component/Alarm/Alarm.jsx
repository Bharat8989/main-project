'use client';

import React, { useState, useEffect } from 'react';

export default function Component() {
  const [alarms, setAlarms] = useState(() => {
    const savedAlarms = localStorage.getItem('alarms');
    return savedAlarms ? JSON.parse(savedAlarms) : [{ time: "06:28 AM", isOn: true }];
  });
  const [showModal, setShowModal] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState("06:00 AM");
  const [alarmMessage, setAlarmMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  const formatTimeTo12Hour = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const parse12HourTimeTo24Hour = (time) => {
    const [timePart, period] = time.split(' ');
    let [hour, minute] = timePart.split(':').map(Number);

    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const calculateTimeUntilAlarm = (alarmTime) => {
    const now = new Date();
    const [alarmHour, alarmMinute] = parse12HourTimeTo24Hour(alarmTime).split(':').map(Number);
    const alarmDate = new Date(now);
    alarmDate.setHours(alarmHour, alarmMinute, 0, 0);

    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const timeDifference = alarmDate - now;
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

    return `in ${hours} hours ${minutes} minutes`;
  };

  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      const currentTime = formatTimeTo12Hour(`${now.getHours()}:${now.getMinutes()}`);

      alarms.forEach((alarm, index) => {
        if (alarm.isOn && alarm.time === currentTime) {
          setAlarmMessage(`Alarm ringing at ${alarm.time}!`);
          setAlarms((prevAlarms) =>
            prevAlarms.map((a, i) => (i === index ? { ...a, isOn: false } : a))
          );
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms);
  }, [alarms]);

  const handleAddAlarm = () => {
    setAlarms((prevAlarms) => [
      ...prevAlarms,
      { time: newAlarmTime, isOn: true },
    ]);
    setShowModal(false);
  };

  const handleRemoveAlarm = (index) => {
    setAlarms((prevAlarms) => prevAlarms.filter((_, i) => i !== index));
  };

  const toggleAlarm = (index) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm, i) =>
        i === index ? { ...alarm, isOn: !alarm.isOn } : alarm
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white p-7">
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

     <h1 className="text-6xl font-bold text-center mb-4 p-8">Alarm</h1>

      {alarmMessage && (
        <div className="bg-red-200 border border-red-500 text-red-900 px-4 py-3 rounded mb-4 w-full max-w-md">
          {alarmMessage}
        </div>
      )}

      <div className="w-full max-w-md space-y-4">
        {alarms.map((alarm, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-lg shadow-lg p-4 sm:p-6 flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl sm:text-3xl font-semibold">{alarm.time}</h2>
              <p className="text-sm sm:text-base text-gray-300">
                Alarm {calculateTimeUntilAlarm(alarm.time)}
              </p>
            </div>

            <div className="flex space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={alarm.isOn}
                  onChange={() => toggleAlarm(index)}
                />
                <div
                  className={`toggle-slot ${
                    alarm.isOn ? 'bg-green-500' : 'bg-gray-400'
                  } w-12 sm:w-14 h-7 sm:h-8 flex items-center rounded-full p-1 cursor-pointer`}
                >
                  <div
                    className={`toggle-dot ${
                      alarm.isOn ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                    } w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
                  />
                </div>
              </label>
              <button
                onClick={() => handleRemoveAlarm(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
     <div className='mt-8 flex justify-center'>
     <button
        onClick={() => setShowModal(true)}
        className="bg-slate-300 text-white p-3 rounded-full shadow-lg text-2xl flex items-center"
        aria-label="Add new alarm"
      >
        ➕ 
      </button>
     </div>
     

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Set Alarm Time</h2>
            <input
              type="time"
              value={parse12HourTimeTo24Hour(newAlarmTime)}
              onChange={(e) => {
                const time = formatTimeTo12Hour(e.target.value);
                setNewAlarmTime(time);
              }}
              className="w-full p-2 border border-gray-500 rounded mb-4 bg-gray-700 text-white"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAlarm}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              >
                Add Alarm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
