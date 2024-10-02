import axios, { AxiosError } from "axios";
import { NewUserPayload, SignInUserPayload } from "./data-types";
import { authUrl } from "@/config/api";

export const signUp = async (userDetails: NewUserPayload) => {
  return axios
    .post(authUrl.signUp, {
      email: userDetails.email,
      password: userDetails.password,
      username: userDetails.username,
    })
    .then((res) => res.data);
};
export const signIn = async (userDetails: SignInUserPayload) => {
  return axios
    .post(authUrl.signIn, {
      email: userDetails.email,
      password: userDetails.password,
    })
    .then((res) => res.data);
};

export const validateToken = async (token: string): Promise<boolean> => {
  console.log("Inside validate token func");
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(authUrl.validateToken, { headers });
    
    console.log("Token is valid");
    return true;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.type === "INVALID TOKEN") {
      console.log("Token is invalid");
      return false;
    }
    console.error("An error occurred while validating the token:", error.message || error);
    return false
  }
};
