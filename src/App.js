// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './page/template/Layout';
import HomePage from './page/HomePage/HomePage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoginPage from './page/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Layout content={<HomePage />} />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
