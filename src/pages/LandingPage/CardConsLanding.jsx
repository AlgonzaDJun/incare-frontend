/* eslint-disable react/prop-types */
const CardConsLanding = ({spesialis, namaKonselor, img = "https://www.mvphealthcare.com/-/media/project/mvp/healthcare/hero-images/1-6-2-2-findadoctor.png?h=550&iar=0&w=393&rev=aad8c1c5f21d401091ed0f36f9da02a3&hash=D363D50C795676D5E9447F6FFB2D1E3C"}) => {
  return (
    <div className="md:w-72 w-64 mx-auto bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 md:mx-6 my-6">
      <a href="#">
        <img
          className="rounded-t-lg w-full h-48 object-contain "
          src={img}
          alt="image"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {namaKonselor}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
          {new Array(5).fill(
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          )}
        </p>
        <p className="text-lg text-gray-700 mb-3">
          Specialis in <span className="font-semibold">{spesialis}</span>
        </p>
        <button
          type="button"
          className="text-white bg-incare-primary hover:bg-incare-darker  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          onClick={() => window.location.replace("/booking")}
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
};

export default CardConsLanding;
