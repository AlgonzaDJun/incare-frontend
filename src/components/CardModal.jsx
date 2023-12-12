const CardModal = ({ showModal, closeModal }) => {
  return (
    showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-20">
            <span
              className="absolute top-0 right-0 p-2 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-3xl font-bold mb-4 text-center text-[#435EBE]">
              Registrasi Berhasil
            </h2>
            <p>Kami akan menghubungi anda jika lulus tahap filtrasi pertama</p>
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CardModal;
