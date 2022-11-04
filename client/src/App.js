import React from "react";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer"
import "./App.css";
function App() {
  return (
    <div>
      <NavBar />
      <hr className="seperator rounded"/>
      {/* <Carousel /> */}
      <Footer />
    </div>
  );
}

export default App;
