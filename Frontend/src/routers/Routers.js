import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import LoginAdmin from "../pages/Admin/LoginAdmin";
import RegisterAdmin from "../pages/Admin/RegisterAdmin";
import DashboardStd from "../pages/Student/Std/DashboardStd";
import LoginStd from "../pages/Student/Std/LoginStd";
import RegisterStd from "../pages/Student/Std/RegisterStd";
import Home from '../pages/Home';

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Navigate to = "/Home"/>} />
    <Route path="/Home" element={<Home/>} />
    <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
    <Route path="/LoginAdmin" element={<LoginAdmin/>} />
    <Route path="/RegisterAdmin" element={<RegisterAdmin/>} />
    <Route path="/DashboardStd" element={<DashboardStd/>} />
    <Route path="/LoginStd" element={<LoginStd/>} />
    <Route path="/RegisterStd" element={<RegisterStd/>} />


  </Routes>;
};
export default Routers;
