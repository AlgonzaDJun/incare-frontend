/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById } from "../../redux/reducers/bookingReducer";
import LoadingFullPage from "../../components/LoadingFullPage";
import moment from "moment";
import { FormatRupiah } from "@arismun/format-rupiah";
import { postInvoice } from "../../redux/reducers/invoiceReducer";
// import moment from "moment";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { idbooking } = useParams();
  const navigate = useNavigate();

  const bookingData = useSelector((state) => state.booking);
  const { booking, isLoading, isFulfilled, isErrored } = bookingData;
  const { data } = booking;

  const invoice = useSelector((state) => state.invoice);
  const {
    invoice: dataInvoice,
    isErrored: errorInvoice,
    isFulfilled: fullFiledInvoice,
  } = invoice;

  console.log(dataInvoice);

  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");

  // console.log(data);

  const date = isFulfilled
    ? moment.utc(data.tanggal_konseling).format("DD MMMM YYYY")
    : "loading";
  const jam = isFulfilled
    ? moment.utc(data.tanggal_konseling).format("HH:mm")
    : "loading";
  const jam2 = isFulfilled
    ? moment.utc(data.tanggal_konseling).add(1, "hours").format("HH:mm")
    : "loading";

  useEffect(() => {
    if (isFulfilled === true) {
      setEmail(data.user_id.email);
      setNama(data.user_id.fullname);
      console.log(data);
    }
  }, [isFulfilled]);

  useEffect(() => {
    dispatch(getBookingById(idbooking));
  }, []);

  useEffect(() => {
    if (fullFiledInvoice) {
      // navigate(dataInvoice.data.invoiceUrl);

      window.location.href = dataInvoice.data.invoiceUrl;
    }
  }, [fullFiledInvoice]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const invoice = {
      description:
        "Pembayaran Konseling Dr. " + data.conselor_id.user_id.fullname,
      amount: data.conselor_id.price - 1000,
      external_id: data.kode_pembayaran,
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjE3ZTUyZWZkM2RiMDJjY2U5NTA3YiIsImVtYWlsIjoicmp4MTQwNkBnbWFpbC5jb20iLCJpYXQiOjE3MDE0MDQzNDh9.94w8Yc9iOwdst2y8NndJ5jgVFc-iemSC9L6QEgBG0XQ";
    // console.log(invoice);
    dispatch(postInvoice(invoice, token));
  };

  return (
    <>
      {!isFulfilled ? (
        <LoadingFullPage />
      ) : (
        <div className="grid mt-10 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check secara teliti detail booking anda.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold text-lg">
                    Konseling Dr.{" "}
                    {isFulfilled
                      ? data.conselor_id.user_id.fullname
                      : "loading"}
                  </span>
                  <span className="float-right text-gray-400 text-lg">
                    {jam} - {jam2}
                  </span>
                  <p className="text-lg font-bold"> {date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order.</p>
            <div className="">
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  readOnly
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Nama Pengguna
              </label>
              <div className="relative">
                <input
                  readOnly
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  type="text"
                  id="card-holder"
                  name="card-holder"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">
                    {isFulfilled ? (
                      <FormatRupiah value={data.conselor_id.price} />
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Discount Pengguna Baru
                  </p>
                  <p className="font-semibold text-gray-900">Rp 1.000</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {isFulfilled ? (
                    <FormatRupiah value={data.conselor_id.price - 1000} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
            <button
              className="mt-4 mb-8 w-full rounded-md bg-incare-primary hover:bg-incare-darker px-6 py-3 font-medium text-white"
              onClick={(e) => handleSubmit(e)}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
