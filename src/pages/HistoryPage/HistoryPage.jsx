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
  }, []);

  const disabledRatingClass =
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  const enabledRatingClass =
    "text-white bg-incare-primary hover:bg-incare-darker font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  const handleAksiMulai = (item) => {
    if (item.media_konseling === "chat") {
      // window.location.href = "/payment/" + item.kode_booking;
      window.open(
        `https://api.whatsapp.com/send?phone=6281243367761&text=Id%20Booking%20%3A%20${item._id}%0AHalo%20dokter%20${item.conselor_id.user_id.fullname}%2C%20saya%20ingin%20melakukan%20konseling%F0%9F%98%87`
      );
    } else {
      window.open(item.link_konseling.meeting_url);
    }
  };

  const handleBayar = (item) => {
    // console.log(dataInvoice);
    // console.log({
    //   kode: item.kode_pembayaran,
    //   // data,
    // });

    const data = dataInvoice.filter(
      (data) => data.externalId === item.kode_pembayaran
    );
    // console.log(data)

    window.open(data[0].invoiceUrl);
  };

  return (
    <SidebarSecond>
      {isLoading && <LoadingFullPage />}
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
                              {item.media_konseling}
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
                                type="button"
                                className={
                                  item.status === "pending"
                                    ? disabledRatingClass
                                    : enabledRatingClass
                                }
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

                {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarSecond>
  );
};

export default HistoryPage;
