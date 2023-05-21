import React from "react";
import "./App.css";

import PharmProvider from "./context/PharmProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";

import PharmacyLogApp from "./components/PharmacyLogApp";

const App = () => {
  return (
    <PharmProvider>
      <Router>
        <Navigation />
        <PharmacyLogApp />
      </Router>
    </PharmProvider>
  );
};

export default App;
