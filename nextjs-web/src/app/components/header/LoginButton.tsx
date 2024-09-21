"use client";

import { useState } from "react";
import LoginModal from "./login-modal/LoginModal";
import { useAuth } from "@/app/context/authContext";

const LoginButton = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  return (
    <>
      <button
        className="bg-orange-600 text-white px-2 py-1 m-3 rounded-2xl"
        onClick={() => setShowLoginModal(true)}
      >
        {user ? user.username : "Log In"}
      </button>

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
