// import React from "react";
import { Link } from "react-router-dom";
import logoIncare from "../../assets/incare_bg.png";
import headerImage from "../../assets/animation2.webp";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import CardConsLanding from "./CardConsLanding";

const LandingPage = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div>
      <div className="w-full min-h-screen box-border mb-32 md:mb-0">
        {/* NAVBAR */}
        <nav className="bg-incare-primary dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logoIncare}
                className="md:h-11 h-5 object-cover"
                alt="Flowbite Logo"
              />
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="text-incare-primary bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  className="text-white bg-yellow-400 hover:bg-yellow-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center"
                >
                  Daftar
                </button>
              </div>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-white hover:text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between ${
                navbarOpen ? "" : "hidden"
              } w-full md:flex md:w-auto md:order-1`}
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#tentang"
                    className="block py-2 px-3 text-white hover:text-slate-400 rounded md:bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    Tentang
                  </a>
                </li>
                <li>
                  <a
                    href="#layanan"
                    className="block py-2 px-3 text-white hover:text-slate-400 rounded md:bg-transparent md:p-0 "
                  >
                    Layanan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white hover:text-slate-400 rounded md:bg-transparent md:p-0 "
                  >
                    Konselor
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white hover:text-slate-400 rounded md:bg-transparent md:p-0 "
                  >
                    Berita
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* END OF NAVBAR */}

        {/* MAIN CONTENT */}
        <main className="mt-20 md:mt-40 m-4 box-border">
          {/* START HEADER */}
          <header className="flex flex-col-reverse my-8 mx-auto md:ml-16 md:grid md:grid-cols-2">
            <div className="flex flex-col items-start gap-y-7">
              <div className="text-6xl">
                <h1 className="font-bold mb-3 text-incare-primary hover:text-incare-darker">
                  Utamakan
                </h1>
                <h1 className="font-semibold">Kesehatan Mentalmu</h1>
              </div>
              <p className="text-xl md:text-2xl ">
                <span className="font-semibold text-incare-primary">
                  Konsultasi kesehatan mental
                </span>{" "}
                adalah langkah pertama menuju kesejahteraan pikiran dan perasaan
                yang lebih baik. <br />{" "}
                <p className="mt-2 md:mt-0">
                  <span className="font-semibold text-incare-primary">
                    Bergabunglah dengan kami
                  </span>{" "}
                  untuk mengambil langkah ini bersama-sama
                </p>
              </p>
              <button
                type="button"
                className="text-white bg-yellow-400 hover:bg-yellow-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center"
              >
                Coba Sekarang <FaArrowRight className="inline-block" />
              </button>
            </div>
            <div className="w-full flex justify-center items-center">
              <img
                src={headerImage}
                className="md:h-96 object-cover"
                alt="appointment 2 person"
              />
            </div>
          </header>
          {/* END OF HEADER */}

          {/* START LAYANAN */}
          <section
            id="layanan"
            className="bg-slate-100 -m-4 mt-32 p-4 rounded-lg flex flex-col justify-center items-center pt-8 pb-28 text-slate-900"
          >
            <div className="text-center flex flex-col gap-y-8 mb-8 mt-24">
              <h1 className="text-6xl font-semibold text-incare-primary">
                Layanan Konseling
              </h1>

              <p className="text-xl md:text-2xl md:mx-36">
                Setiap orang berhak mendapatkan ruang aman untuk menceritakan
                masalahnya. <br /> Kami menyediakan berbagai metode konseling
                untuk kebutuhan dan kenyamanan Anda:
              </p>
            </div>
            <div className="w-full space-y-12 md:space-y-0 md:grid md:grid-cols-2 text-center">
              <div className="flex flex-col gap-y-4 justify-center items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-24 md:w-36 md:h-36 text-incare-primary"
                >
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                </svg>

                <h1 className="font-semibold text-5xl">Chat</h1>
                <p className="text-xl font-medium">
                  Sesi konseling Via Chat dengan psikolog atau konselor kami
                </p>
              </div>
              <div>
                <div className="flex flex-col gap-y-4 justify-center items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-24 md:w-36 md:h-36 text-incare-primary"
                  >
                    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                  </svg>

                  <h1 className="font-semibold text-5xl">Zoom Video Call</h1>
                  <p className="text-xl font-medium">
                    Sesi konseling Via Zoom dengan psikolog atau konselor kami
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* END LAYANAN */}

          {/* START KONSELOR */}
          <section
            id="konselor"
            className="mt-20 p-4 rounded-lg md:flex md:justify-end md:items-center pt-8 pb-28 text-slate-900 relative"
          >
            <div className="absolute -z-10 -top-9 right-0 bg-yellow-400 py-7 md:px-10 pl-5 -mr-3 md:-mr-5 rounded-l-full">
              <h1 className="font-semibold text-6xl">Konselor Kami</h1>
            </div>
            <CardConsLanding namaKonselor={"saman"} spesialis={"Percintaan"} />
            <CardConsLanding namaKonselor={"melati"} spesialis={"Depresit"} />
            <CardConsLanding namaKonselor={"arjun"} spesialis={"Olahraga"} />
          </section>
          {/* END KONSELOR */}
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
