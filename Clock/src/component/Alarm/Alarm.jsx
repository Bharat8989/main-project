import React, { useState } from 'react';

const Alarm = () => {
  const [alarms, setAlarms] = useState([{ time: "06:28", isOn: true }]);
  const [showModal, setShowModal] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState("06:00");

  // Function to calculate the time until each alarm
  const calculateTimeUntilAlarm = (alarmTime) => {
    const now = new Date();
    const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
    const alarmDate = new Date(now);
    alarmDate.setHours(alarmHour, alarmMinute, 0, 0);

    // If the alarm time has already passed today, set it for the next day
    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const timeDifference = alarmDate - now;
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

    return `in ${hours} hours ${minutes} minutes`;
  };

  // Function to add a new alarm
  const handleAddAlarm = () => {
    setAlarms((prevAlarms) => [
      ...prevAlarms,
      { time: newAlarmTime, isOn: true },
    ]);
    setShowModal(false); // Close the modal after adding the alarm
  };

  // Function to toggle alarm on/off
  const toggleAlarm = (index) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm, i) =>
        i === index ? { ...alarm, isOn: !alarm.isOn } : alarm
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Alarms</h1>

      <div className="space-y-4">
        {alarms.map((alarm, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between w-80">
            <div>
              <h2 className="text-4xl font-semibold">{alarm.time}</h2>
              <p className="text-gray-500">Alarm {calculateTimeUntilAlarm(alarm.time)}</p>
            </div>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="toggle-checkbox hidden"
                checked={alarm.isOn}
                onChange={() => toggleAlarm(index)}
              />
              <div className={`toggle-slot ${alarm.isOn ? 'bg-blue-500' : 'bg-gray-400'} w-14 h-8 flex items-center rounded-full p-1`}>
                <div className={`toggle-dot ${alarm.isOn ? 'translate-x-6' : 'translate-x-0'} w-6 h-6 bg-white rounded-full shadow-md transform transition`} />
              </div>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg text-2xl"
      >
        +
      </button>

      {/* Modal for selecting a new alarm time */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Set Alarm Time</h2>
            <input
              type="time"
              value={newAlarmTime}
              onChange={(e) => setNewAlarmTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAlarm}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Alarm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alarm;
