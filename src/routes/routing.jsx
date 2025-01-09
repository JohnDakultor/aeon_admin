import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Admin";
import ManageBooking from "../pages/ManageBooking";
import ManageRooms from "../pages/ManageRooms";
import NavBar from "../components/NavBar"; // Sidebar component


import { AuthProvider } from "../services/Authentication";
import ReqAuth from "../services/ReqAuth";


// Layout for Admin Pages
const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <NavBar />

      <div className="flex-1">{children}</div>
    </div>
  );
};

const Routing = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} /> {/* Login page */}
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ReqAuth>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
            </ReqAuth>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ReqAuth>
            <AdminLayout>
              <ManageBooking />
            </AdminLayout>
            </ReqAuth>
          }
        />
        <Route
          path="/admin/manage-rooms"
          element={
            <ReqAuth>
            <AdminLayout>
              <ManageRooms />
            </AdminLayout>
            </ReqAuth>
          }
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
