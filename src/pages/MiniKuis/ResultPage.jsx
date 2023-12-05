import React from "react";

const ResultPage = ({ totalScore, mood }) => (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4 text-[#435EBE]">Hasil Kamu:</h1>
      <h3 className="text-3xl font-bold text-center mb-4 text-[#435EBE]">{totalScore}</h3>
      <h3 className="text-3xl font-bold text-center mb-4 text-[#435EBE]">{mood}</h3>
      <p className="text-lg text-center mb-4 text-[#000000]"> Monitor emosi harian yang Anda rasakan dengan menggunakan fitur dari aplikasi InCare. Jika Anda sudah merasa cukup stres, ada baiknya menghubungi Psikolog kami yang akan membantu Anda untuk meregulasi tingkat stres Anda agar tidak meningkat.</p>
    </div>
  );
  
  export default ResultPage;