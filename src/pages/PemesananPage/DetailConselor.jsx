const DetailConselor = () => {
  return (
    <div className="w-full  p-4 block md:grid grid-cols-2">
      <div id="imgKonselor">
        <img
          src="https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
          alt=""
          className="w-full md:w-[420px] h-[458px] object-fill rounded-lg"
        />
      </div>
      <div id="detailKonselor" className="mt-9">
        <div className="w-72">
          <div className="flex mb-6 justify-between">
            <h1 className="font-semibold text-lg">Nama</h1>
            <p className="text-lg">Udin</p>
          </div>
          <div className="flex mb-6 justify-between">
            <h1 className=" font-semibold text-lg">Spesialisasi</h1>
            <p className="text-lg">Gangguan Jawa</p>
          </div>
          <div className="flex mb-6 justify-between">
            <h1 className=" font-semibold text-lg">Harga</h1>
            <p className="text-lg">Rp. 40.000</p>
          </div>
        </div>

        <div className="mt-16 ">
          <h1 className="font-semibold text-xl">Jadwal Tersedia</h1>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Waktu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">29 September 2023</td>
                  <td className="px-6 py-4">19.00-20.00</td>
                  <td className="px-6 py-4">
                    <button className="py-2 px-4 bg-sky-600 rounded text-white">
                      Pilih
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    2
                  </th>
                  <td className="px-6 py-4">29 September 2023</td>
                  <td className="px-6 py-4">19.00-20.00</td>
                  <td className="px-6 py-4">
                  <button className="py-2 px-4 bg-sky-600 rounded text-white">
                      Pilih
                    </button>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-4">29 September 2023</td>
                  <td className="px-6 py-4">19.00-20.00</td>
                  <td className="px-6 py-4">
                  <button className="py-2 px-4 bg-sky-600 rounded text-white">
                      Pilih
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailConselor;
