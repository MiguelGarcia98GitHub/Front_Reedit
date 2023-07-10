import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { baseBackendURL } from "../config/globals";
import { delay } from "../helpers/helpers";
import { BackendErrorResponse, Post, loggedIn } from "../interfaces/interfaces";

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
  logged: null | loggedIn;
  logIn: (
    email: string,
    password: string
  ) => Promise<DecodedJWTToken> | Promise<BackendErrorResponse>;
  posts: Post | null;
  getAllPosts: () => Promise<Post[]>;
}

export const useStore = create<Store>()(
  devtools((set) => ({
    logged: null,
    logIn: async (email, password) => {
      console.log("email:");
      console.log(email);
      console.log("password");
      console.log(password);

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

        console.log("response");
        console.log(response);

        const loginData = await response.json();

        console.log("loginData from Zustand:");
        console.log(loginData);

        if (loginData.message) {
          return loginData;
        }

        set({
          logged: loginData,
        });

        return loginData;

        // if (!loginData.access_token) {
        //   return loginData;
        // }

        // if (loginData.access_token) {
        //   set({
        //     logged: loginData,
        //   });

        //   // some time to show spinner for better user experience
        //   return Promise.resolve(loginData);
        // }

        // if (response.status !== 200) {
        //   return Promise.resolve(loginData);
        // }
        // return Promise.resolve(loginData);
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
