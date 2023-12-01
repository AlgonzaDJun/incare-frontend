import React, { useState } from 'react';
import SidebarSecond from '../../components/SidebarSecond';

const ScheduleTable = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const scheduleOptions = [
    { id: 1, day: 'Monday', time: '10:00 AM'},
    { id: 2, day: 'Tuesday', time: '08:AM' },
    { id: 3, day: 'Wednesday', time: '19:00 PM' },
    { id: 4, day: 'Thursday', time: '10:00 AM' },
    { id: 5, day: 'Friday', time: '15:00 PM' },
    { id: 6, day: 'Saturday', time: '19:00 PM' },
    { id: 7, day: 'Sunday', time: '07:00 AM' },
  ];

  // Handle pemilihan jadwal
  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule(schedule);
  };

  // Simpan perubahan jadwal yang dipilih
  const handleSaveSchedule = (e) => {
    e.preventDefault()
    
    if (selectedSchedule) {
      console.log('Jadwal disimpan:', selectedSchedule);
    } else {
      console.log('Pilih jadwal terlebih dahulu');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F2F7FF] px-4">
      <SidebarSecond/>
      <div>
      <h2 className="text-3xl font-bold mb-4 text-center text-[#435EBE] p-10">Counselor Schedule(2023)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 ml-12">
        {scheduleOptions.map((schedule) => (
          <div
            key={schedule.id}
            className={`p-4 w-full border rounded-md cursor-pointer ${
              schedule.selected ? 'bg-blue-200' : 'bg-gray-100'
            }`}
            onClick={() => handleSelectSchedule(schedule)}
          >
            <p className="text-lg font-semibold">{schedule.day}</p>
            <p className="text-sm text-gray-600">{schedule.time}</p>
          </div>
        ))}
      </div>
      <hr className="my-6" />
      {/* Form yang akan diisi otomatis dengan jadwal yang dipilih */}
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jadwal Terpilih
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={selectedSchedule ? `${selectedSchedule.day} - ${selectedSchedule.time}` : ''}
            readOnly
          />
             <button
        className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        onClick={handleSaveSchedule}
         >
        Simpan Jadwal
      </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ScheduleTable;
