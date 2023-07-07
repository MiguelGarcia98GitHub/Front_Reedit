import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { baseBackendURL } from "../config/globals";
import jwt_decode from "jwt-decode";
import { delay } from "../helpers/helpers";

interface DecodedJWTToken {
  id: number;
  email: string;
  username: string;
}

interface ErrorResponse {
  message: string;
  statusCode: number;
}

interface Store {
  logged: any;
  logIn: (
    email: string,
    password: string
  ) => Promise<DecodedJWTToken> | Promise<ErrorResponse>;
  posts: any;
  getAllPosts: () => Promise<any>;
}

export const useStore = create<Store>()(
  devtools((set) => ({
    logged: false,
    logIn: async (email, password) => {
      await delay(500);
      try {
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

        console.log("loginData from Zustand:");
        console.log(loginData);

        if (loginData.access_token) {
          const decodedJWTToken = jwt_decode(loginData.access_token) as any;
          set({
            logged: {
              id: decodedJWTToken.id,
              email: decodedJWTToken.email,
              username: decodedJWTToken.username,
            },
          });

          // some time to show spinner for better user experience
          return Promise.resolve(decodedJWTToken);
        }

        if (loginData.statusCode !== 200) {
          return Promise.resolve(loginData);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    posts: null,
    getAllPosts: async () => {
      try {
        const response = await fetch(`${baseBackendURL}/posts`);

        const postsData = await response.json();

        set({
          posts: postsData,
        });

        return Promise.resolve(postsData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  }))
);
