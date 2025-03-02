import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../Firebase/Config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login & signup
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Account created successfully!");
          setIsSignUp(false); // Switch back to login after sign-up
        })
        .catch((error) => setError(error.message));
    } else {
      // Login Logic
      signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate("/dashboard"))
        .catch((error) => setError(error.message));
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#0d6efd",
          height: "62%",
          clipPath: "polygon(100% 52%, 0% 100%, 0% 0%, 100% 0%)",
          overflow: "hidden",
          left: 0,
          right: 0,
          top: 0,
        }}
      />
      <form onSubmit={handleAuth}>
        <section className="vh-100 login-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-5 text-center">
                    <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="mb-4 w-100">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-4 w-100">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      {isSignUp ? "Sign Up" : "Login"}
                    </button>

                    <p className="mt-3">
                      {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => setIsSignUp(!isSignUp)}
                      >
                        {isSignUp ? "Login" : "Sign Up"}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
