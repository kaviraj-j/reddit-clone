"use client";
import React from "react";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";
import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user } = useAuth();
  const isCreatePostPage = usePathname().includes("/post/new");
  return (
    <header className="flex items-start bg-black py-4 px-6 shadow-md">
      <SearchBar />
      {(user && !isCreatePostPage) && <Button className="px-1 py-0.5 mr-2 rounded-lg hover:bg-gray-300 hover:text-black"><Link href={"/post/new"}>Create Post +</Link></Button>}
      <LoginButton />
    </header>
  );
};

export default Header;
