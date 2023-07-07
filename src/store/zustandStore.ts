import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { baseBackendURL } from "../config/globals";
import jwt_decode from "jwt-decode";

interface Store {
  logged: any;
  logIn: (email: string, password: string) => void;
}

export const useStore = create<Store>()(
  devtools((set) => ({
    logged: false,
    logIn: async (email, password) => {
      const response = await fetch(`${baseBackendURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const loginData = await response.json();
      console.log("loginData:");
      console.log(loginData);
      console.log(loginData.access_token);
      console.log(jwt_decode(loginData.access_token));

      const decodedJWTToken = jwt_decode(loginData.access_token) as any;

      set({
        logged: {
          id: decodedJWTToken.id,
          email: decodedJWTToken.email,
          username: decodedJWTToken.username,
        },
      });
    },
  }))
);
