import React from "react";
import { useAuth } from "../Contexts/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
          <span className="navbar-brand me-2">
            <h1
              style={{
                fontSize: "24px",
                color: "blue",
                fontWeight: "bold",
                margin: "0",
                padding: "10px",
              }}
            >
              Crime Complaint
            </h1>
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <button
            onClick={logout}
            type="button"
            className="btn btn-primary me-3"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
