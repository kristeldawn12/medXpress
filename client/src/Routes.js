import React from "react";
import Home from "./pages/Home";
import OrderRx from "./pages/OrderRx";
import Status from "./pages/Status";
import ViewPending from "./pages/ViewPending";
import { Route, Routes } from "react-router-dom";

const PharmRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<OrderRx />} />
      <Route path="/status" element={<Status />} />
      <Route path="/pending" element={<ViewPending />} />
    </Routes>
  );
};

export default PharmRoutes;
