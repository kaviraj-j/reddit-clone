import React from "react";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";

type Props = {};

const Header = (props: Props) => {
  const user = false;

  return (
    <header className="flex items-center justify-between bg-black py-4 px-6 shadow-md">
      <SearchBar />
      <div className="ml-auto">
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;
