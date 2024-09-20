import axios from "axios";
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
