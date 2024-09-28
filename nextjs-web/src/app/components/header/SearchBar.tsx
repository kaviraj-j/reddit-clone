import React from "react";
import { Search } from 'lucide-react';

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="flex justify-center my-6">
      <form action="" className="flex items-center bg-gray-800 rounded-lg px-2 py-1 shadow-sm">
      <button
          type="submit"
          className="p-2 text-gray-500 hover:text-blue-500 focus:outline-none"
        >
          <Search className="w-5 h-5" />
        </button>
        <input
          type="text"
          placeholder="Search Reddit"
          className="bg-transparent focus:outline-none px-3 py-2 rounded-l-md w-full text-gray-200"
        />
        
      </form>
    </div>
  );
};

export default SearchBar;
