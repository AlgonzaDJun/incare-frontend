import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerConselor } from "../../redux/actions/conselorAction";
import SidebarSecond from "../../components/SidebarSecond";
import CardModal from "../../components/CardModal";

const FormConselor = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    spesialisasi: "",
    deskripsi: "",
  });
  
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { spesialisasi, deskripsi } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
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

      if (!spesialisasi || !deskripsi) {
        setError("Please enter spesialisasi and deskripsi!")
        return;
      }
      if (!isChecked) {
        setError("Checkbox harus di-centang untuk melanjutkan.");
        // setError("")
        return;
      }

    try {
        
      const userId = localStorage.getItem("userId")

      const newConselor = { ...userData, user_id: userId }; 
      // Dispatch action to register counselor
      await dispatch(registerConselor(newConselor));
      setError("");
      setIsChecked(true);
      console.log(newConselor)
      // Clear form after successful registration
      setUserData({ spesialisasi: "", deskripsi: "" });
      setShowModal(true);
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
          value={spesialisasi}
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
          value={deskripsi}
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
    <CardModal showModal={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};
export default FormConselor;
