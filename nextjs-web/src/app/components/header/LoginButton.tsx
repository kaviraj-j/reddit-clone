"use client";

import { useState } from "react";
import LoginModal from "./login-modal/LoginModal";
import { useAuth } from "@/app/context/authContext";

const LoginButton = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showLogoutButton, setShowLogoutButton] = useState<boolean>(false);
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
  return (
    <>
      <button
        className="bg-orange-600 text-white px-2 py-1 m-3 rounded-2xl"
        onClick={() => handleClick()}
      >
        {user ? user.username : "Log In"}
      </button>
      {showLogoutButton && (
        <button
          className="bg-gray-300 text-black px-2 py-1 m-3 rounded-2xl"
          onClick={() => {
            setShowLogoutButton(false);
            logout();
          }}
        >
          Logout
        </button>
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
