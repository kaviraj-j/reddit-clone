"use client";

import { useRef, useState,useEffect } from "react";
import LoginModal from "./login-modal/LoginModal";
import { useAuth } from "@/app/context/authContext";

const LoginButton = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showLogoutButton, setShowLogoutButton] = useState<boolean>(false);
  const logoutButtonRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    console.log("Clicked!!!");
    if (!user) {
      setShowLoginModal(true);
      console.log("if");
    } else {
      console.log("else");
      setShowLogoutButton(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (logoutButtonRef.current && !logoutButtonRef.current.contains(event.target as Node)) {
        setShowLogoutButton(false); // Close the logout button if clicked outside
      }
    };

    if (showLogoutButton) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutButton]);
  return (
    <>
      <button
        className="bg-orange-600 text-white px-2 py-1 m-3 rounded-2xl"
        onClick={() => handleClick()}
      >
        {user ? user.username : "Log In"}
      </button>
      {showLogoutButton && (
        <div ref={logoutButtonRef} className="absolute mt-2 bg-white shadow-lg rounded-md">
            <button
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          onClick={() => {
            setShowLogoutButton(false);
            logout();
          }}
        >
          Logout
        </button>
        </div>
      )}

      {!user && (
        <LoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </>
  );
};

export default LoginButton;
