import axios from "axios";
import { turnOnLoading, turnOffLoading } from "../redux/loadingSlice";
import { store } from "../index";
export let http = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MSIsIkhldEhhblN0cmluZyI6IjE0LzAzLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0MTkxMDQwMDAwMCIsIm5iZiI6MTcxNDA2NDQwMCwiZXhwIjoxNzQyMDU4MDAwfQ.aL6UU86iw9qfiazPYi9hHV3FjYthitqZbK5pBfChSiU",
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("USER_LOGIN"))?.accessToken,
  },
});

http.interceptors.request.use(
  function (config) {
    console.log("len");
    console.log(config);
    store.dispatch(turnOnLoading());
    return config;
  },
  function (err) {
    store.dispatch(turnOffLoading());
    return err;
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    console.log("response về");
    setTimeout(() => {
      store.dispatch(turnOffLoading());
    }, 3000);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store.dispatch(turnOffLoading());

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
