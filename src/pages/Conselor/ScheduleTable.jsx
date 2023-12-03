import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveSchedule } from '../../redux/actions/conselorAction';
import SidebarSecond from '../../components/SidebarSecond';
// import action creators dari file Anda

const ScheduleTable = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(''); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSaveSchedule = () => {
    const combinedDateTime = new Date(selectedDate);
    if (selectedTime) {
      const timeSplit = selectedTime.split(':');
      combinedDateTime.setHours(parseInt(timeSplit[0], 10));
      combinedDateTime.setMinutes(parseInt(timeSplit[1], 10));
    }

    const scheduleData = { datetime: combinedDateTime };
    saveSchedule(scheduleData);
  };

  return (
    <div className='bg-[#F2F7FF] min-h-screen flex items-center justify-center px-6'>
       <SidebarSecond/>
    <div className=" w-11/12 mx-auto bg-white p-6 rounded-xl shadow-xl">
      <div className="mb-4">
        <h1  className="text-3xl font-bold mb-4 text-center text-[#435EBE]">Pilih Jadwal</h1>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal</label>
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleDateChange}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Waktu (HH:MM)</label>
        <input
          type="text"
          id="time"
          value={selectedTime}
          onChange={handleTimeChange}
          placeholder="Contoh: 08:30"
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        onClick={handleSaveSchedule}
        className=" w-52 bg-[#435EBE] text-white px-4 py-2 place-self-end rounded hover:bg-[#3d55ab]"
      >
        Simpan Jadwal
      </button>
    </div>
    </div>
  );
};

export default ScheduleTable;
