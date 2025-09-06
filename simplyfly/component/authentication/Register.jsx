import React, { useState } from "react";
import axios from "axios";
import AuthService from "../../Service/AuthService";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [userDetails, setUser] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        role: "",
        contactNumber: "",
        gender: "",
        address: ""
    });

    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...userDetails, [name]: value });

        let errorMsg = "";
        switch (name) {
            case "name":
                if (!value.trim()) errorMsg = "Name is required";
                else if (value.length > 100) errorMsg = "Name max 100 chars";
                break;
            case "email":
                if (!value.trim()) errorMsg = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = "Invalid email";
                break;
            case "password":
                if (!value.trim()) errorMsg = "Password is required";
                else if (value.length < 8 || value.length > 64) errorMsg = "Password 8-64 chars";
                break;
            case "age":
                if (!value) errorMsg = "Age is required";
                else if (value < 1) errorMsg = "Age must be at least 1";
                break;
            case "contactNumber":
                if (!/^\d{10}$/.test(value)) errorMsg = "Contact must be 10 digits";
                break;
            case "gender":
                if (!["Male", "Female", "Other"].includes(value)) errorMsg = "Select a valid gender";
                break;
            case "address":
                if (!value.trim()) errorMsg = "Address is required";
                else if (value.length > 255) errorMsg = "Max 255 characters";
                break;
            case "role":
                if (!value) errorMsg = "Role is required";
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: errorMsg });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

     
        for (let field in userDetails) {
            if (!userDetails[field] || errors[field]) {
                setMsg(`Please correct the ${field} field`);
                return;
            }
        }

        try {
            const response = await AuthService.register(userDetails);
            console.log(response.data);
            setMsg("✅ User registered successfully!");
            setTimeout(() => navigate("/"), 1500); 
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || "❌ Something went wrong";
            setMsg(errMsg);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center py-4">
            <div className="container position-relative">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="text-center mb-3">
                            <h1 className="display-5 fw-bold text-black mb-2">✈️ SimpliFly</h1>
                            <p className="text-grey-50 fs-6">Your journey begins here</p>
                        </div>

                        <div
                            className="card shadow-lg border-0"
                            style={{
                                borderRadius: "15px",
                                backdropFilter: "blur(10px)",
                                background: "rgba(255, 255, 255, 0.95)",
                                maxHeight: "85vh",
                                overflowY: "auto",
                            }}
                        >
                            <div className="card-header bg-transparent border-0 text-center py-3">
                                <h4 className="mb-0 text-dark fw-semibold">Welcome to SimpliFly</h4>
                                <p className="text-muted mt-1 mb-0">Sign Up</p>
                            </div>

                            <div className="card-body px-4 py-3">
                                {msg && (
                                    <div
                                        className={`alert border-0 rounded-3 py-2`}
                                        style={{ background: msg.includes("✅") ? "#d4edda" : "#f8d7da", color: msg.includes("✅") ? "#155724" : "#721c24" }}
                                    >
                                        {msg}
                                    </div>
                                )}

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userDetails.name}
                                        onChange={handleChange}
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleChange}
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={userDetails.password}
                                        onChange={handleChange}
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>

                                {/* Age */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={userDetails.age}
                                        onChange={handleChange}
                                        className={`form-control ${errors.age ? "is-invalid" : ""}`}
                                        placeholder="Enter your age"
                                    />
                                    {errors.age && <small className="text-danger">{errors.age}</small>}
                                </div>

                                {/* Role */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold mb-2">Sign up as</label>
                                    <div className="btn-group w-100" role="group">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="role"
                                            id="rolePassenger"
                                            value="PASSENGER"
                                            checked={userDetails.role === "PASSENGER"}
                                            onChange={handleChange}
                                        />
                                        <label className="btn btn-outline-primary btn-sm" htmlFor="rolePassenger">
                                            👤 PASSENGER
                                        </label>

                                        
                                    </div>
                                    {errors.role && <small className="text-danger">{errors.role}</small>}
                                </div>

                                {/* Contact */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Contact Number</label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        value={userDetails.contactNumber}
                                        onChange={handleChange}
                                        className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                                        placeholder="Enter your contact number"
                                    />
                                    {errors.contactNumber && <small className="text-danger">{errors.contactNumber}</small>}
                                </div>

                                {/* Gender */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={userDetails.gender}
                                        onChange={handleChange}
                                        className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.gender && <small className="text-danger">{errors.gender}</small>}
                                </div>

                                {/* Address */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Address</label>
                                    <textarea
                                        name="address"
                                        value={userDetails.address}
                                        onChange={handleChange}
                                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                        placeholder="Enter your address"
                                    ></textarea>
                                    {errors.address && <small className="text-danger">{errors.address}</small>}
                                </div>

                                <div className="d-grid mb-3">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="btn btn-primary py-2 fw-semibold"
                                        style={{
                                            background: "linear-gradient(45deg, #667eea, #764ba2)",
                                            border: "none",
                                            borderRadius: "10px",
                                            fontSize: "16px",
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>

                            <div className="card-footer bg-transparent border-0 text-center py-3">
                                <p className="mb-0 text-muted small">
                                    Already have an account?{" "}
                                    <a href="/" className="text-decoration-none fw-semibold" style={{ color: "#667eea" }}>
                                        Sign in here
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
