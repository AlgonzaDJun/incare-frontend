// import { Link } from "react-router-dom";
import CardConselor from "./CardConselor";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

const DetailConselor = () => {
  // const navigationNextRef = useRef(null);
  // const navigationPrevRef = useRef(null);
  const swiperRef = useRef();

  return (
    <>
      <div className="w-full p-7 block md:grid grid-cols-2">
        <div id="imgKonselor" className="flex items-center mt-9">
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
                      <button className="py-2 px-4 bg-incare-primary hover:bg-incare-darker rounded text-white">
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
                      <button className="py-2 px-4 bg-incare-primary hover:bg-incare-darker rounded text-white">
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
                      <button className="py-2 px-4 bg-incare-primary hover:bg-incare-darker rounded text-white">
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
