import React from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaUser, FaCalendarAlt } from 'react-icons/fa';
import InputCard from '../InputCard/InputCard';
import { MdSearch } from 'react-icons/md';

const Search = () => {
  return (
    <>
      <div className='rounded-xl p-5  border-4 border-gray-300'>
        <div className='flex justify-between  gap-2 items-center bg-white p-4 rounded-xl w-full mx-auto'>
          <InputCard icon={<FaPlaneDeparture />} title={"Departure"} child1={"London"} child2={"xyz int. Airport"} />
          <InputCard icon={<FaPlaneArrival />} title={"Arrival"} child1={"Mexico"} child2={"xyz int. airport"} />
          <InputCard icon={<FaPlaneDeparture />} title={"Departure"} child1={"18/9/25"} child2={"sunday"} />
          <InputCard icon={<FaPlaneDeparture />} title={"Arrival"} child1={"18/9/25"} child2={"sunday"} />
          <div className="flex flex-col items-start justify-start gap-2 min-w-[140px]">
            <div className="flex items-center gap-4 text-sm text-gray-700">
              <label className="flex items-center gap-1">
                <input type="radio" name="trip" className="accent-primary" defaultChecked />
                One way
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="trip" className="accent-primary" />
                Round trip
              </label>

            </div>

            {/* Search Button */}
            <button className="bg-primary w-full flex justify-center items-center gap-2  text-white font-semibold rounded-lg px-6 py-2  mt-2">
              <MdSearch className='text-xl' />
              <p className='text-lg'>Search</p>
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Search;
