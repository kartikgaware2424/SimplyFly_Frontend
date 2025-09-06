import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../Service/AuthService";
import * as jwt_decode from "jwt-decode";


export default function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const response = await AuthService.login({ email, password });

            if (response.data) {
                const token = response.data; // JWT string
                localStorage.setItem("jwtToken", token);
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const decoded = parseJwt(token);
                const role = decoded?.role;
                localStorage.setItem("userRole", role);

                if (role === "ADMIN") navigate("/admin-dashboard");
                else if (role === "OWNER") navigate("/owner-dashboard");
                else if (role === "PASSENGER") navigate("/passenger");
            } else {
                setMsg("Invalid response from server ❌");
            }
        } catch (err) {
            setMsg("Invalid credentials ❌");
        }
    };



    return (
        <div className="min-vh-100 d-flex align-items-center">
            <div className="position-absolute w-100 h-100"></div>

            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="text-center mb-4">
                            <h1 className="display-4 fw-bold text-black mb-2">✈️ SimpliFly</h1>
                            <p className="text-grey-50 fs-5">Your journey begins here</p>
                        </div>

                        <div
                            className="card shadow-lg border-0"
                            style={{
                                borderRadius: "15px",
                                backdropFilter: "blur(10px)",
                                background: "rgba(255, 255, 255, 0.95)",
                            }}
                        >
                            <div className="card-header bg-transparent border-0 text-center py-4">
                                <h3 className="mb-0 text-dark fw-semibold">Welcome Back</h3>
                                <p className="text-muted mt-2">Sign in to your account</p>
                            </div>

                            <div className="card-body px-4 pb-4">
                                {msg !== "" && (
                                    <div
                                        className={`alert ${msg.includes("SUCCESSFUL")
                                            ? "alert-success"
                                            : "alert-danger"
                                            } border-0 rounded-3`}
                                    >
                                        <div className="d-flex align-items-center">
                                            <span className="me-2">
                                                {msg.includes("SUCCESSFUL") ? "✅" : "❌"}
                                            </span>
                                            {msg}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-dark">
                                            Email
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                👤
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control border-start-0 py-3"
                                                placeholder="Enter your email"
                                                style={{ fontSize: "16px" }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-dark">
                                            Password
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                🔒
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control border-start-0 py-3"
                                                placeholder="Enter your password"
                                                style={{ fontSize: "16px" }}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="d-grid mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg py-3 fw-semibold"
                                            style={{
                                                background: "linear-gradient(45deg, #667eea, #764ba2)",
                                                border: "none",
                                                borderRadius: "10px",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>


                            </div>

                            <div className="card-footer bg-transparent border-0 text-center py-4">
                                <p className="mb-0 text-muted">
                                    Don't have an account?
                                    <Link to="/signup" className="text-decoration-none fw-semibold ms-1" style={{ color: "#667eea" }}> Sign Up here </Link>
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-white-50 small">
                                ©2025 SimpliFly. Fly with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
