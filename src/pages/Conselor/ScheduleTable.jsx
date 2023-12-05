/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SidebarSecond from "../../components/SidebarSecond";
import { useDispatch, useSelector } from "react-redux";
import { saveSchedule } from "../../redux/actions/conselorAction";
import { data } from "autoprefixer";
import SidebarKonselor from "../../components/SidebarKonselor";
import { getkonselorByUserId } from "../../redux/reducers/konselorReducer";

const ScheduleTable = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const dataKonselor = useSelector((state) => state.konselor);
  const { konselorDetail } = dataKonselor;

  const handleSaveSchedule = () => {
    const combinedStartDate = new Date(selectedDate);
    const combinedEndDate = new Date(selectedDate);

    if (startTime) {
      const timeSplit = startTime.split(":");
      combinedStartDate.setHours(parseInt(timeSplit[0], 10));
      combinedStartDate.setMinutes(parseInt(timeSplit[1], 10));
    }

    if (endTime) {
      const timeSplit = endTime.split(":");
      combinedEndDate.setHours(parseInt(timeSplit[0], 10));
      combinedEndDate.setMinutes(parseInt(timeSplit[1], 10));
    }

    const days = [
      "minggu",
      "senin",
      "selasa",
      "rabu",
      "kamis",
      "jumat",
      "sabtu",
    ];

    const dayName = days[selectedDate.getDay()];

    const newSchedule = {
      day: dayName,
      time: `${startTime}-${endTime}`,
    };

    if (editIndex !== -1) {
      schedules[editIndex] = newSchedule;
      setEditIndex(-1);
    } else {
      setSchedules([...schedules, newSchedule]);
    }

    const konselor_id = konselorDetail.data && konselorDetail.data._id;

    dispatch(saveSchedule(newSchedule, konselor_id))

    // console.log({ newSchedule, konselor_id });

    setSelectedDate(new Date());
    setStartTime("");
    setEndTime("");
  };

  const handleEditSchedule = (index) => {
    const schedule = schedules[index];
    setSelectedDate(new Date(schedule.date));

    const times = schedule.time.split(" - ");
    setStartTime(times[0]);
    setEndTime(times[1]);

    setEditIndex(index);
  };

  const handleDeleteSchedule = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  const userId = localStorage.getItem("userId");

  console.log(konselorDetail);

  useEffect(() => {
    dispatch(getkonselorByUserId(userId));
  }, []);

  return (
    <div className="bg-[#F2F7FF] min-h-screen flex items-center justify-center px-6">
      <SidebarKonselor />
      <div className="w-11/12 mx-auto bg-white p-6 rounded-xl shadow-xl">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-4 text-center text-[#435EBE]">
            Pilih Jadwal
          </h1>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Tanggal
          </label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={handleDateChange}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Waktu Mulai (HH:MM)
          </label>
          <input
            type="text"
            id="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
            placeholder="Contoh: 08:30"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            Waktu Berakhir (HH:MM)
          </label>
          <input
            type="text"
            id="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
            placeholder="Contoh: 17:00"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={handleSaveSchedule}
          className="w-52 bg-[#435EBE] text-white px-4 py-2 place-self-end rounded hover:bg-[#3d55ab]"
        >
          {editIndex === -1 ? "Simpan Jadwal" : "Edit Jadwal"}
        </button>
        <div>
          <h2 className="text-2xl font-bold mt-6 mb-4 text-center text-[#435EBE]">
            Jadwal Tersimpan
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Tanggal</th>
                <th className="border border-gray-300 p-2">Waktu</th>
                <th className="border border-gray-300 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-300 p-2">
                    {schedule.date}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {schedule.time}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEditSchedule(index)}
                      className="text-[#435EBE] hover:text-[#3d55ab]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(index)}
                      className="text-[#435EBE] hover:text-[#3d55ab] ml-2"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
