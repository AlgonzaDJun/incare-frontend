import { useParams } from "react-router-dom";
import SidebarSecond from "../../components/SidebarSecond";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusByidBooking } from "../../redux/reducers/bookingReducer";
import { useEffect } from "react";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { kodeBooking } = useParams();

  const updateBooking = useSelector((state) => state.booking);

  console.log(updateBooking);

  useEffect(() => {
    if (kodeBooking) {
      // console.log(kodeBooking)
      dispatch(updateStatusByidBooking(kodeBooking, { status: "success" }));
    }
  }, []);

  const disabledRatingClass =
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  const enabledRatingClass =
    "text-white bg-incare-primary hover:bg-incare-darker font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  return (
    <SidebarSecond>
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <h1 className="mt-10 text-2xl font-semibold text-gray-900 dark:text-white">
            Pertemuan Anda
          </h1>
        </div>

        <div className="mt-10 flex-grow w-[350px] md:w-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className=" overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Konselor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Konseling
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jam Konseling
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Media Konseling
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status Booking
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">Dr. Udin</td>
                  <td className="px-6 py-4">12-12-2023</td>
                  <td className="px-6 py-4">09.00-10.00</td>
                  <td className="px-6 py-4">Zoom</td>
                  <td className="px-6 py-4">PENDING</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Mulai Konseling
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className={disabledRatingClass}
                      disabled
                    >
                      Rating
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    2
                  </th>
                  <td className="px-6 py-4">Dr. Ajeng</td>
                  <td className="px-6 py-4">23-11-2023</td>
                  <td className="px-6 py-4">16.00-18.00</td>
                  <td className="px-6 py-4">Chat</td>
                  <td className="px-6 py-4">PAID</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Mulai Konseling
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className={disabledRatingClass}
                      disabled
                    >
                      Rating
                    </button>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-4">Dr. Pemai</td>
                  <td className="px-6 py-4">24-11-2023</td>
                  <td className="px-6 py-4">19.00-20.00</td>
                  <td className="px-6 py-4">chat</td>
                  <td className="px-6 py-4">FINISHED</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Mulai Konseling
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" className={enabledRatingClass}>
                      Rating
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarSecond>
  );
};

export default HistoryPage;
