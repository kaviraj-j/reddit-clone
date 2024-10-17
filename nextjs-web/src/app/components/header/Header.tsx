import React from "react";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";
import SidePanel from "../side-panel/SidePanel";
type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex items-start bg-black py-4 px-6 shadow-md">
      <SearchBar />
      <LoginButton />
    </header>
  );
};

export default Header;
