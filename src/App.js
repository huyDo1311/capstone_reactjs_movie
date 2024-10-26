// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './page/template/Layout';
import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage';
import DetailMovie from './page/HomePage/DetailMovie';
// import AdminListUser from './page/Admin/AdminListUser';
import ErrorPage from './page/ErrorPage/ErrorPage';
import MovieTickets from './page/HomePage/MovieTickets';
import AdminTemplate from './page/template/AdminTemplate/AdminTemplate'
import DashBroad from './page/AdminPage/Dashbroad/DashBroad';
import Films from './page/AdminPage/Films/Films';
import ShowTime from './page/AdminPage/ShowTime/ShowTime';
import AddNew from './page/AdminPage/Films/AddNew/AddNew';
import Edit from './page/AdminPage/Films/Edit/Edit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* user Routing */}
        <Route path="/home" element={<Layout content={<HomePage />} />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/ticket-booking/:id" element={<MovieTickets />} />
        <Route path="/detail/:id" element={<DetailMovie />} />
        <Route path="*" element={<ErrorPage />} />



        {/* admin Routing */}
        <Route path="/admin" element={<AdminTemplate component={<DashBroad />} />} />
        <Route path="/admin/films" element={<AdminTemplate component={<Films />} />} />
        <Route path="/admin/films/addnew" element={<AdminTemplate component={<AddNew />} />} />
        <Route path="/admin/films/edit/:id" element={<AdminTemplate component={<Edit />} />} />
        <Route path="/admin/users" element={<AdminTemplate component={<DashBroad />} />} />
        <Route path="/admin/show-times" element={<AdminTemplate component={<ShowTime />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
