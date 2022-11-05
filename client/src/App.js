import React from "react";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Carousel />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>    
      <Footer />
    </div>
  );
}

export default App;
