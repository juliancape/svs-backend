import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ElectionList from "./components/ElectionList";
import Register from "./components/Register";
import Elections from "./components/Elections";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/elections" element={<ElectionList />} />
        <Route path="/electionlist" element={<Elections />} />
      </Routes>
    </Router>
  );
}

export default App;
