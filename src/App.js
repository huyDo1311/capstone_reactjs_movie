// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './page/template/Layout';
import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage';
import DetailMovie from './page/HomePage/DetailMovie';
import AdminListUser from './page/Admin/AdminListUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Layout content={<HomePage />} />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/detail/:id" element={<DetailMovie />} />
        <Route path="/admin" element={<AdminListUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
