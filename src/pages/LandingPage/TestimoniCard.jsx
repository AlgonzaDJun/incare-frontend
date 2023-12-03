/* eslint-disable react/prop-types */
const TestimoniCard = ({nama, rating, komentar}) => {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <figure className="max-w-screen-md mx-auto">
        <svg
          className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p className="text-xl text-gray-900 dark:text-white">
            &quot;{komentar}&quot;
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3">
          <img
            className="w-6 h-6 rounded-full"
            src={"https://ui-avatars.com/api/?name=" + nama}
            alt="profile picture"
          />
          <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <div className="pr-3 font-medium text-gray-900 dark:text-white">
              {nama.charAt(0).toUpperCase()}
            </div>
            <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400 flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              {rating}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default TestimoniCard;
