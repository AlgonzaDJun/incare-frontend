import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerConselor } from "../../redux/actions/conselorAction";
import SidebarSecond from "../../components/SidebarSecond";

const FormConselor = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    spesialisasi: "",
    deskripsi: "",
  });
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Mengambil user_id dari localStorage saat komponen dimuat
    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSpesialisasiChange = (e) => {
    const { value } = e.target;
    setUserData({ ...userData, spesialisasi: value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Validasi checkbox
      if (!isChecked) {
        setError("Checkbox harus di-centang untuk melanjutkan.");
        setError("")
        return;
      }

    try {
        // Mengambil token dari local storage
        const token = localStorage.getItem('token'); // Ganti 'token' sesuai dengan nama key token di local storage
        if (!token) {
          // Handle jika token tidak ditemukan
          return;
        }
      const dataToSend = { ...userData, user_id: userId }; 
      // Dispatch action to register counselor
      dispatch(registerConselor(dataToSend, token));
      setError(null);
      setIsChecked(false);
      console.log(dataToSend)
      // Clear form after successful registration
      setUserData({ spesialisasi: "", deskripsi: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const spesialisasiOptions = [
    { label: "Relationship", value: "Relationship" },
    { label: "Family Issues", value: "Family Issues" },
    { label: "Emotional Problems", value: "Emotional Problems" },
    { label: "Social Relation", value: "Social Relation" },
    { label: "Education Issues", value: "Education Issues" },
    // ...Tambahkan opsi spesialisasi lainnya di sini sesuai kebutuhan
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F7FF] px-4">
        <SidebarSecond/>
    <form onSubmit={handleSubmit} className=" w-11/12 mx-auto bg-white p-6 rounded-xl shadow-xl">
      <h1  className="text-3xl font-bold mb-4 text-center text-[#435EBE]">Register Conselor</h1>
      <br />
      <div className="mb-4">
        <label htmlFor="spesialisasi" className="block text-md font-medium text-gray-700">
          Spesialisasi:
        </label><br />
        <select
          id="spesialisasi"
          name="spesialisasi"
          value={userData.spesialisasi}
          onChange={handleSpesialisasiChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Pilih Spesialisasi</option>
          {spesialisasiOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="deskripsi" className="block text-md font-medium text-gray-700">
          Deskripsi:
        </label><br />
        <textarea
          type="text"
          id="deskripsi"
          name="deskripsi"
          placeholder="Ceritakan pengalamanmu"
          value={userData.deskripsi}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
      <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2 leading-tight"
        />
        <span>Pastikan data yang anda isi sudah benar dan dapat dipertanggung jawabkan</span>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <br />
      <div className="grid grid-cols-1">
      <button
        type="submit"
        className=" w-52 bg-[#435EBE] text-white px-4 py-2 place-self-end rounded hover:bg-[#3d55ab]"
      >
        Kirim
      </button>
      </div>
    </form>
    </div>
  );
};
export default FormConselor;
