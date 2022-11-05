import React from "react";

export default function NavBar() {
  return (
    <div>
      <nav class="navbar navbar-light bg-transparent px-5 mt-4">
        <a class="navbar-brand " href="/">
          <div className="">
            <img
              src="logo.png"
              width="40"
              height="40"
              class="d-inline-block align-text-bottom mx-3"
              alt="logo"
            />
            <h3 className="d-inline-block text-light">
              Welcome to Student Portal
            </h3>
          </div>
        </a>
      </nav>
      <hr className="seperator rounded"/>
    </div>
  );
}
