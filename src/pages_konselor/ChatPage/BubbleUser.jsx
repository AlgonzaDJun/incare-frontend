/* eslint-disable react/prop-types */
const BubbleUser = ({pesan}) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          U
        </div>
        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>{pesan}</div>
        </div>
      </div>
    </div>
  );
};

export default BubbleUser;
