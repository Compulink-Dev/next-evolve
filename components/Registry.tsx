import Image from "next/image";
import React from "react";

function Registry() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto max-w-7xl px-8 md:px-4 my-8 gap-8 ">
      <form action="" className=" flex flex-col gap-4">
        <input
          type="text"
          placeholder="Company"
          className="bg-purple-200 p-2 outline-purple-400"
        />
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <input
            type="text"
            placeholder="First Name"
            className="bg-purple-200 p-2 w-full outline-purple-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="bg-purple-200 p-2 w-full outline-purple-400"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <input
            type="text"
            placeholder="Phone Number"
            className="bg-purple-200 p-2 w-full outline-purple-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-purple-200 p-2 w-full outline-purple-400"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <input
            type="text"
            placeholder="Country"
            className="bg-purple-200 p-2 w-full outline-purple-400"
          />
          <input
            type="text"
            placeholder="City"
            className="bg-purple-200 p-2 w-full outline-purple-400"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 outline-purple-400"
            >
              From
            </label>
            <input
              id="from"
              type="date"
              placeholder="From"
              className="bg-purple-200 p-2 w-full outline-purple-400"
            />
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              To
            </label>
            <input
              id="to"
              type="date"
              placeholder="To"
              className="bg-purple-200 p-2 w-full outline-purple-400"
            />
          </div>
        </div>
        <div className="flex justify-end gap-5">
          {/* <button className="bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-300 hover:scale-110">
            Cancel
          </button> */}
          <button className="bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-300 hover:scale-110">
            Register
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center">
        <Image unoptimized src="/hotel.jpg" width={500} height={500} alt="" />
      </div>
    </div>
  );
}

export default Registry;
