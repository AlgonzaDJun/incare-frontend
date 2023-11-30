import React, { useState } from "react";
import { Link } from "react-router-dom";


const PageKuis = () => {
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  return (
    <div className="bg-[#F2F7FF] min-h-screen p-8 md:p-28">
      <div className="flex flex-col md:flex-row items-center">
        <img src="/img/Group 49.png" className="max-w-full h-auto md:max-w-sm md:mr-8 mb-4 md:mb-0" alt="Gambar" />
        <div className="text-center md:text-left">
          <p className="mb-4">
            Kamu belum yakin perlu bantuan profesional atau tidak? Cobalah ikuti kuis singkat ini yang terdiri dari 5 pertanyaan untuk mendapatkan pemahaman lebih baik tentang kondisi kesehatan mental Anda saat ini. Melalui kuis ini, Anda dapat meraih gambaran tentang diri Anda dan menerima saran yang praktis.
          </p>
          <Link to="/quiz" style={{ cursor: 'pointer', color: '#435EBE' }}>
            <button onClick={handleStartQuiz} className="bg-[#435EBE] text-white  mx-auto md:mx-0 block px-4 py-2 rounded hover:bg-[#3d55ab]">Coba Test!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default PageKuis;
