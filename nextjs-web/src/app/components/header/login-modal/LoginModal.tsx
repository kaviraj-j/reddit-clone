"use client";
import React, { useState } from "react";

type Props = {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
};

enum AuthType {
  SignIn,
  SignUp,
}

const LoginModal = ({ showLoginModal, setShowLoginModal }: Props) => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.SignIn);
  const handleClose = () => {
    setShowLoginModal(false);
  };

  const toggleAuthType = () => {
    setAuthType(
      authType === AuthType.SignIn ? AuthType.SignUp : AuthType.SignIn
    );
  };

  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gray-700 text-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {authType === AuthType.SignIn ? "Sign In" : "Sign Up"}
        </h2>

        <form>
          {authType === AuthType.SignUp && (
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 mb-4"
          >
            {authType === AuthType.SignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center">
          {authType === AuthType.SignIn
            ? "New to reddit?"
            : "Already a redditer?"}
          <button
            onClick={toggleAuthType}
            className="text-blue-400 hover:text-blue-500 ml-2"
          >
            {authType === AuthType.SignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
