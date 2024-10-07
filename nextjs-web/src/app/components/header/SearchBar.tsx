import React from "react";
import { Search } from "lucide-react";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold text-orange-500">reddit</h1>

      <div className="flex-grow mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Reddit"
            className="w-full bg-gray-800 rounded-full py-1 px-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
