import React from "react";
import Home from "./pages/Home";
import ActivityDetail from "./pages/ActivityDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="*" element={<ErrorPage />} />       
        </Routes>
      </div>
    </Router>
  );
};

export default App;
