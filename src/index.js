import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd"; // Import ConfigProvider
import userSlice from "./redux/userSlice";

const theme = {
    components: {
      Tabs: {
    inkBarColor: 'red',
    colorBorder: 'rgb(20,20,20)',
      },
      Dropdown: {

        colorBgElevated: 'black'
      }
    },
};

let store = configureStore({
  reducer: {
    userSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider theme={theme}> {/* Wrap App with ConfigProvider */}
      <App />
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
