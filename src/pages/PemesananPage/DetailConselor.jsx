// import { Link } from "react-router-dom";
import CardConselor from "./CardConselor";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import { Button, Label, Modal, Radio } from "flowbite-react";
import { Link } from "react-router-dom";

const DetailConselor = () => {
  const [openModal, setOpenModal] = useState(false);
  const [medKonseling, setMedKonseling] = useState(null);
  const swiperRef = useRef();

  const handleMedKonseling = (e) => {
    if (!medKonseling) {
      alert("Pilih media konseling terlebih dahulu");
      return;
    }
    setOpenModal(false);
    e.preventDefault();
    window.location.replace(`/payment/${medKonseling}`);
    // console.log(medKonseling);
  };

  return (
    <>
      <div className="w-full p-7 block md:grid grid-cols-2">
        <div id="imgKonselor" className="mt-4">
          <Link
            to={"/booking"}
            className="font-bold flex text-lg text-incare-primary hover:text-incare-darker mb-2 gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Kembali Pilih Konselor
          </Link>
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
                      <button
                        className="py-2 px-4 bg-incare-primary hover:bg-incare-darker rounded text-white"
                        onClick={() => setOpenModal(true)}
                      >
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
                    <td className="px-6 py-4">30 September 2023</td>
                    <td className="px-6 py-4">16.00-17.00</td>
                    <td className="px-6 py-4">
                      <button
                        className="py-2 px-4 bg-incare-primary hover:bg-incare-darker rounded text-white"
                        onClick={() => setOpenModal(true)}
                      >
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
                    <td className="px-6 py-4">31 September 2023</td>
                    <td className="px-6 py-4">15.00-16.00</td>
                    <td className="px-6 py-4">
                      <button
                        className="py-2 px-4 bg-incare-primary hover:bg-incare-darker rounded text-white"
                        onClick={() => setOpenModal(true)}
                      >
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

      {/* MODAL */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Pilih Media Konseling</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 flex">
            <div className="">
              <fieldset className="flex max-w-md gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="zoom"
                    name="countries"
                    value="zoom"
                    onChange={() => setMedKonseling("zoom")}
                  />
                  <Label htmlFor="zoom">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 48 48"
                    >
                      <circle cx="24" cy="24" r="20" fill="#2196f3"></circle>
                      <path
                        fill="#fff"
                        d="M29,31H14c-1.657,0-3-1.343-3-3V17h15c1.657,0,3,1.343,3,3V31z"
                      ></path>
                      <polygon
                        fill="#fff"
                        points="37,31 31,27 31,21 37,17"
                      ></polygon>
                    </svg>
                    <p className="text-center">Video Call Zoom</p>
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="chat"
                    name="countries"
                    value="chat"
                    onChange={() => setMedKonseling("chat")}
                  />
                  <Label htmlFor="chat">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-12 h-w-12 text-incare-primary hover:text-incare-darker"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-center">Chat</p>
                  </Label>
                </div>
              </fieldset>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-incare-primary hover:bg-incare-darker"
            onClick={handleMedKonseling}
          >
            Pesan Sekarang
          </Button>
        </Modal.Footer>
      </Modal>

      {/* END MODAL */}

      <div className="w-full p-7 relative box-border overflow-hidden">
        <h1 className="font-bold text-2xl">Rekomendasi Konselor Lainnya</h1>

        {/* CAROUSEL */}
        <div className="ml-12 lg:ml-0">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              639: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <CardConselor
                namaKonselor={"udin"}
                hargaKonselor={40000}
                ratingKonselor={5}
                imgKonselor={
                  "https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardConselor
                namaKonselor={"udin"}
                hargaKonselor={40000}
                ratingKonselor={5}
                imgKonselor={
                  "https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardConselor
                namaKonselor={"udin"}
                hargaKonselor={40000}
                ratingKonselor={5}
                imgKonselor={
                  "https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardConselor
                namaKonselor={"udin"}
                hargaKonselor={40000}
                ratingKonselor={5}
                imgKonselor={
                  "https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardConselor
                namaKonselor={"udin"}
                hargaKonselor={40000}
                ratingKonselor={5}
                imgKonselor={
                  "https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
                }
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="absolute top-1/2 z-10 flex justify-between w-full pr-16 xl:pr-32">
          <button onClick={() => swiperRef.current?.slidePrev()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-incare-primary hover:text-incare-darker"
            >
              <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
            </svg>
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8  text-incare-primary hover:text-incare-darker"
            >
              <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailConselor;
