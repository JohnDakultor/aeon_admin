import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Admin";
import {AuthProvider} from "../services/Authentication";
import ReqAuth from "../services/ReqAuth";

const Routing = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<ReqAuth><Dashboard /></ReqAuth>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
