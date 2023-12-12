import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import SidebarKonselor from "../../components/SidebarKonselor";
import axios from "axios";
const ScheduleTable = () => {
  const [openModal, setOpenModal] = useState(false);

  const [schedules, setSchedules] = useState([]);
  const getSchedules = async () => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/pusher/konselor/${userId}`
    );
    setSchedules(response.data.data.schedule);
  };
  useEffect(() => {
    getSchedules();
  }, []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };
  const formatDateTime = (date, time) => {
    const dateObject = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);

    dateObject.setHours(hours, minutes);
    return dateObject.toISOString();
  };
  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    const begin = formatDateTime(selectedDate, startTime);
    const end = formatDateTime(selectedDate, endTime);
    const userId = localStorage.getItem("userId");
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/conselors/${userId}`, {
      begin,
      end,
    });
    getSchedules();
  };
  // console.log(startTime);
  // console.log(selectedDate);
  // console.log(formatDateTime(selectedDate, startTime));
  // const handleEditSchedule = (index) => {
  //   const schedule = schedules[index];
  //   setSelectedDate(new Date(schedule.date));

  //   const times = schedule.time.split(" - ");
  //   setStartTime(times[0]);
  //   setEndTime(times[1]);

  //   setEditIndex(index);
  // };

  const handleDeleteSchedule = async (id) => {
    const userId = localStorage.getItem("userId");
    await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/conselors/${userId}/schedule/${id}`
    );
    getSchedules();
    setOpenModal(false);
  };
  const parseDate = (datetime) => {
    const isoDate = new Date(datetime);
    const formattedDate = isoDate.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };
  const parseTime = (dateTime) => {
    const isoDate = new Date(dateTime);
    const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);
    const hours = addLeadingZero(isoDate.getHours());
    const minutes = addLeadingZero(isoDate.getMinutes());
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };
  return (
    <div className="bg-[#F2F7FF] min-h-screen flex items-center justify-center px-6">
      <SidebarKonselor />
      <div className="w-11/12 mx-auto bg-white p-6 rounded-xl shadow-xl">
        <form onSubmit={handleSaveSchedule}>
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
              type="time"
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
              type="time"
              id="endTime"
              value={endTime}
              onChange={handleEndTimeChange}
              placeholder="Contoh: 17:00"
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-40 bg-[#435EBE] text-white px-4 py-2 place-self-end rounded hover:bg-[#3d55ab]"
          >
            Tambah Jadwal
          </button>
        </form>
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
              {schedules.map((schedule, index) => {
                // Mendapatkan string dengan format "Sabtu 10 Desember 2023"

                // const formattedTime = `${begin.getHours()}:${begin.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
                return (
                  <tr key={index} className="bg-white">
                    <td className="border w-4/12 text-center border-gray-300 p-2">
                      {`${parseDate(schedule.begin)}`}
                    </td>
                    <td className="border w-4/12 text-center border-gray-300 p-2">
                      {`${parseTime(schedule.begin)} - ${parseTime(
                        schedule.end
                      )}`}
                    </td>
                    <td className="border border-gray-300 text-center p-2">
                      {/* <button
                        // onClick={() => handleEditSchedule(index)}
                        className="text-[#435EBE] hover:text-[#3d55ab] mr-2"
                      >
                        Edit
                      </button> */}

                      <button
                        onClick={() => setOpenModal(true)}
                        className="text-[#435EBE] hover:text-[#3d55ab] ml-2"
                      >
                        Hapus
                      </button>
                      <Modal
                        show={openModal}
                        size="md"
                        onClose={() => setOpenModal(false)}
                        popup
                      >
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this schedule?
                            </h3>
                            <div className="flex justify-center gap-4">
                              <Button
                                color="failure"
                                onClick={() =>
                                  handleDeleteSchedule(schedule._id)
                                }
                              >
                                {"Yes, I'm sure"}
                              </Button>
                              <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                              >
                                No, cancel
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
