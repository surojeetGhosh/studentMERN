import React from "react";
import "./carousel.css";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleControls"
        class="carousel slide px-5"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active text-center">
            <a href="/login">
              <img src="login.png" class="w-25" alt="login" />
            </a>     
          </div>
          <div class="carousel-item text-center">
            <a href="/register">
              <img src="register.png" class="w-25" alt="register" />
            </a>
            
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}
