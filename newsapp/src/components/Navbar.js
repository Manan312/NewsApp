import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export class Navbar extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              News Bytes
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink  className="dropdown-item" to="/business">Bussiness</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/entertainment">Entertainment</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/health">Health</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/science">Science</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/technology">Technology</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/sports">Sports</NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
