// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./page/template/Layout";
import HomePage from "./page/HomePage/HomePage";
import LoginPage from "./page/LoginPage/LoginPage";
import AdminListUser from "./page/AdminListUser/AdminListUser";
import CarouselSlice from "./page/AdminListUser/CarouselSlice";
import FilterFilm from "./page/AdminListUser/FilterFilm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routeing */}
        <Route path="/" element={<Layout content={<HomePage/>}/>}/>
        <Route path="/login" element={<Layout content={<LoginPage/>}/>}/>

        {/* Admin Routeing */}
        <Route path="/list-user" element={<Layout content={<AdminListUser/>}/>}/>
        <Route path="/carousel" element={<Layout content={<CarouselSlice/>}/>}/>
        <Route path="/filter-film" element={<Layout content={<FilterFilm/>}/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
