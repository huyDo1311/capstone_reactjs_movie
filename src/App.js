// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./page/template/Layout";
import HomePage from "./page/HomePage/HomePage";
import LoginPage from "./page/LoginPage/LoginPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout content={<HomePage/>}/>}/>
        <Route path="/login" element={<Layout content={<LoginPage/>}/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
