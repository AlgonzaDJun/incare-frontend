import { useEffect } from "react";
import SidebarSecond from "../../components/SidebarSecond";
import { getAllBooking } from "../../redux/reducers/bookingReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

export default function PertemuanKonselor() {
  const dispatch = useDispatch();
  const { allBooking } = useSelector((state) => state.booking);
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getAllBooking(token));
  }, [dispatch]);

  const disabledRatingClass =
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  const handleAksiMulai = (item) => {
    if (item.media_konseling === "chat") {
      // window.location.href = "/payment/" + item.kode_booking;
      window.open(
        `https://api.whatsapp.com/send?phone=6281243367761&text=Id%20Booking%20%3A%20${item._id}%0AHalo%20Dokter%20${item.conselor_id.user_id.fullname}%2C%20saya%20ingin%20melakukan%20konseling%F0%9F%98%87`
      );
    } else {
      window.open(item.link_konseling.meeting_url);
    }
  };
  console.log(allBooking.data);
  return (
    <>
      <SidebarSecond>
        <h1 className="mt-10 text-2xl font-semibold text-gray-900 dark:text-white">
          Pertemuan Konselor
        </h1>
        <div className="mt-10 flex-grow w-[350px] md:w-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className=" overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Pasien
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
                </tr>
              </thead>
              <tbody>
                {allBooking.data ? (
                  []
                    .concat(allBooking.data)
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    // allBooking.data
                    .map((item, index) => {
                      const date = moment
                        .utc(item.tanggal_konseling)
                        .format("DD MMMM YYYY");

                      const time = moment
                        .utc(item.tanggal_konseling)
                        .format("HH:mm");

                      const time2 = moment
                        .utc(item.tanggal_konseling)
                        .add(1, "hours")
                        .format("HH:mm");

                      // Waktu dari database
                      const targetTime = new Date(item.tanggal_konseling);
                      // selisih waktu 7 jam
                      targetTime.setHours(targetTime.getHours() - 7 + 1);
                      const conselingTime = new Date(item.tanggal_konseling);
                      conselingTime.setHours(conselingTime.getHours() - 7);

                      // Waktu saat ini
                      const currentTime = new Date();
                      // check current time is past 1 hour from target time

                      const isConselingTIme = currentTime > conselingTime;

                      return (
                        <>
                          <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={index}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {index + 1}
                            </th>
                            <td className="px-6 py-4">
                              {item.user_id.fullname}
                            </td>
                            <td className="px-6 py-4">{date}</td>
                            <td className="px-6 py-4">
                              {time}-{time2}
                            </td>
                            <td className="px-6 py-4">
                              {item.media_konseling === "zoom" ? (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                  >
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="20"
                                      fill="#2196f3"
                                    ></circle>
                                    <path
                                      fill="#fff"
                                      d="M29,31H14c-1.657,0-3-1.343-3-3V17h15c1.657,0,3,1.343,3,3V31z"
                                    ></path>
                                    <polygon
                                      fill="#fff"
                                      points="37,31 31,27 31,21 37,17"
                                    ></polygon>
                                  </svg>
                                  <h2 className="font-semibold">
                                    {item.media_konseling}
                                  </h2>
                                </>
                              ) : (
                                <>
                                  <img
                                    width="48"
                                    height="48"
                                    src="https://img.icons8.com/color/48/chat--v1.png"
                                    alt="chat--v1"
                                  />
                                  <h2 className="font-semibold">
                                    {item.media_konseling}
                                  </h2>
                                </>
                              )}
                            </td>
                            <td className="px-6 py-4">{item.status}</td>
                            <td className="px-6 py-4 text-right">
                              <button
                                href="#"
                                className={
                                  item.status === "pending"
                                    ? "text-white bg-incare-primary hover:bg-incare-darker font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    : isConselingTIme
                                    ? "text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    : disabledRatingClass
                                }
                                disabled={
                                  !isConselingTIme && item.status !== "pending"
                                }
                                onClick={
                                  item.status === "pending"
                                    ? () => null
                                    : () => handleAksiMulai(item)
                                }
                              >
                                {item.status === "pending" ? "Bayar" : "Mulai"}
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                ) : (
                  <>Loading....</>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </SidebarSecond>
    </>
  );
}
