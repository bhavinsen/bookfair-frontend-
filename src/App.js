import React from "react";
import { Route, Routes } from "react-router-dom";
import BuyerDashboard from "./BuyerDashboard";
import Dashboard from "./Dashboard";
import Home from "./Home";
import "./index.css";
import ShopMain from "./shopMain";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route exact path="/shopMain" element={<ShopMain />} />
      </Routes>
    </div>
  );
};

export default App;
