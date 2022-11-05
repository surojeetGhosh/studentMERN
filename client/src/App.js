import React from "react";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Carousel />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="dashboard" element={<Dashboard isHome = {true} />}></Route>
        <Route path="update" element={<Dashboard isHome = {false} />}></Route>
        <Route path="*" element={<h1 className="text-center">ERROR 404 NOT FOUND</h1>}></Route>
      </Routes>    
      <Footer />
    </div>
  );
}

export default App;
