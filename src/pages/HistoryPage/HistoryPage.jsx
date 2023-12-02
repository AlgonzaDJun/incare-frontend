/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import SidebarSecond from "../../components/SidebarSecond";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBooking,
  updateStatusByidBooking,
} from "../../redux/reducers/bookingReducer";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import LoadingFullPage from "../../components/LoadingFullPage";
import { getAllInvoice } from "../../redux/reducers/invoiceReducer";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { postReview } from "../../redux/reducers/reviewReducer";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { kodeBooking } = useParams();

  const updateBooking = useSelector((state) => state.booking);
  const invoices = useSelector((state) => state.invoice);

  const { allBooking, isLoading, isFulfilled, isErrored, booking } =
    updateBooking;

  const {
    allInvoice,
    isLoading: isLoadingInvoice,
    isFulfilled: isFulfilledInvoice,
    isErrored: isErroredInvoice,
    invoice,
  } = invoices;

  const dataInvoice = allInvoice.data;

  console.log(allBooking);

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njg5MThlZGUyMzk3MTBjMzBlZTU3OCIsImVtYWlsIjoia2lzaWdpOTY5MEBtYWlub2ouY29tIiwiaWF0IjoxNzAxMzkyMDkxfQ.M25J0ZPCcrcNWq50xuI3-YW4H2mtkyCrcQ7-7Si6y-0";
  // console.log(updateBooking);

  useEffect(() => {
    if (kodeBooking) {
      // console.log(kodeBooking)
      dispatch(updateStatusByidBooking(kodeBooking, { status: "success" }));
    }
    dispatch(getAllBooking(token));
    dispatch(getAllInvoice());

    // localStorage.setItem(
    //   "token",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njg5MThlZGUyMzk3MTBjMzBlZTU3OCIsImVtYWlsIjoia2lzaWdpOTY5MEBtYWlub2ouY29tIiwiaWF0IjoxNzAxNDkwMjkwfQ.yuBs6nnGR2C6CAtyx6Uo5oS7ehUe4_O0dc3qTOfFVXc"
    // );

    // localStorage.setItem("userId", "6568918ede239710c30ee578");
  }, []);

  const disabledRatingClass =
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  const enabledRatingClass =
    "text-white bg-incare-primary hover:bg-incare-darker font-medium rounded-lg text-sm px-5 py-2.5 text-center";

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

  const handleBayar = (item) => {
    const data = dataInvoice.filter(
      (data) => data.externalId === item.kode_pembayaran
    );
    // console.log(data)

    window.open(data[0].invoiceUrl);
  };

  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  const [konselor, setKonselor] = useState();

  function onCloseModal() {
    setOpenModal(false);
    setComment("");
    setStarValue(0);
    setTempValue(0);
  }

  const review = useSelector((state) => state.review);
  const {
    loading: loadingReview,
    error: errorReview,
    review: dataReview,
  } = review;

  useEffect(() => {
    if (dataReview) {
      onCloseModal();
    }
  }, [dataReview]);

  function handleModalRating() {
    if (starValue === 0 || comment === "") {
      alert("Harap isi rating dan komentar anda");
      return;
    }
    // console.log({
    //   id: konselor,
    //   rate: starValue,
    //   comment,
    // });

    const data = {
      rate: starValue,
      comment,
    };

    const token = localStorage.getItem("token");

    dispatch(postReview(konselor, data, token));
  }

  // RATING
  const [starValue, setStarValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);

  const handleHover = (val) => {
    if (starValue === 0) {
      setTempValue(val);
    }
  };

  const handleClick = (val) => {
    setStarValue(val);
    setTempValue(0);
  };

  const handleMouseLeave = () => {
    setTempValue(0);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill =
      starValue >= i || tempValue >= i ? "text-yellow-500" : "text-gray-300";
    stars.push(
      <svg
        key={i}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleHover(i)}
        onMouseLeave={handleMouseLeave}
        className={`w-10 h-10 cursor-pointer fill-current ${fill}`}
        viewBox="0 0 24 24"
      >
        {/* your star icon */}
        <path d="M12 2l2.56 7.377L22 9.745l-6.468 5.65L17.692 22 12 18.435 6.308 22l1.16-6.605L2 9.745l7.44.632L12 2z" />
      </svg>
    );
  }

  return (
    <SidebarSecond>
      {isLoading && <LoadingFullPage />}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <h1 className="mt-10 text-2xl font-semibold text-gray-900 dark:text-white">
            Pertemuan Anda
          </h1>
        </div>

        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Berikan penilaian anda
              </h3>
              <div>
                <div className="mb-2 block">
                  <div className="flex">
                    {stars.map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                  </div>
                </div>

                <label
                  htmlFor="message"
                  className="block mt-6 mb-3 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <div className="w-full">
                <Button onClick={handleModalRating}>Nilai</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

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
                      // Waktu saat ini
                      const currentTime = new Date();
                      // check current time is past 1 hour from target time
                      const isPast1Hours = currentTime > targetTime;

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
                              Dr. {item.conselor_id.user_id.fullname}
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
                              <a
                                href="#"
                                className={
                                  item.status === "pending"
                                    ? "text-white bg-incare-primary hover:bg-incare-darker font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    : "text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                }
                                onClick={
                                  item.status === "pending"
                                    ? () => handleBayar(item)
                                    : () => handleAksiMulai(item)
                                }
                              >
                                {item.status === "pending" ? "Bayar" : "Mulai"}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  item.conselor_id.user_id._id
                                    ? setKonselor(item.conselor_id._id)
                                    : null;
                                  setOpenModal(true);
                                }}
                                type="button"
                                disabled={!isPast1Hours}
                                className={
                                  !isPast1Hours
                                    ? disabledRatingClass
                                    : enabledRatingClass
                                }
                                // className={enabledRatingClass}
                              >
                                Rating
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
      </div>
    </SidebarSecond>
  );
};

export default HistoryPage;
