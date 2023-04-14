import React from "react";

const NoWorkId = () => {
  return (
    <div className="w-full bg-white h-[70vh] rounded-md p-4 flex justify-center items-center ">
      <div className="flex w-full justify-center flex-col items-center ">
        <div className="w-[200px] h-[200px] text-bodyBackground ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-full h-full "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <div className="text-gray-500 text-xl font-medium">
            <h2>Please Select Work to see Proposals. </h2>
        </div>
      </div>
    </div>
  );
};

export default NoWorkId;
