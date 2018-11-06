import React from "react";
// import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light override-nav">
    <a className="navbar-brand" href="#">Rate My Project</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/features">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/about">About Us</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;