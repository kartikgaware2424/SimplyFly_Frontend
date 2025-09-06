import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RouteService from "../../Service/RouteService";

export default function AddRoute() {
  const [route, setRoute] = useState({
    origin: "",
    destination: "",
    distanceInKm: "",
    travelDuration: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      route.origin.trim().toLowerCase() ===
      route.destination.trim().toLowerCase()
    ) {
      setError("Origin and Destination cannot be the same!");
      setSuccess(false);
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      await RouteService.addRoute(route,token)

      setSuccess(true);
      setError("");

      // Reset form
      setRoute({
        origin: "",
        destination: "",
        distanceInKm: "",
        travelDuration: "",
      });

      // Redirect to route list after 2s
      setTimeout(() => {
        navigate("/route-list");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to add route. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://w0.peakpx.com/wallpaper/150/67/HD-wallpaper-airplane-wing-sky-flight-clouds-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div className="col-md-6">
        <div
          className="card shadow-lg border-0"
          style={{
            background: "rgba(0, 123, 255, 0.6)",
            color: "white",
            borderRadius: "15px",
          }}
        >
          <div
            className="card-header text-center"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}
          >
            <h4>
              <i className="bi bi-airplane-engines-fill me-2"></i> Add Route{" "}
              <i className="bi bi-airplane-engines-fill ms-2"></i>
            </h4>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                Route added successfully! Redirecting...
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="origin" className="form-label">
                  <i className="bi bi-geo-alt-fill text-light"></i> Origin
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="origin"
                  name="origin"
                  placeholder="Enter origin city"
                  value={route.origin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="destination" className="form-label">
                  <i className="bi bi-geo-fill text-light"></i> Destination
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="destination"
                  name="destination"
                  placeholder="Enter destination city"
                  value={route.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="distanceInKm" className="form-label">
                  <i className="bi bi-arrows-expand text-light"></i> Distance (km)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="distanceInKm"
                  name="distanceInKm"
                  placeholder="Enter distance in km"
                  value={route.distanceInKm}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="travelDuration" className="form-label">
                  <i className="bi bi-clock-fill text-light"></i> Travel Duration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="travelDuration"
                  name="travelDuration"
                  placeholder="Enter duration (e.g. 3h 15m)"
                  value={route.travelDuration}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-light w-100 mb-2">
                <i className="bi bi-plus-circle-fill me-2"></i> Add Route
              </button>
            </form>

            <div className="text-center mt-3">
              <button
                onClick={() => navigate("/route-list")}
                className="btn btn-dark"
              >
                <i className="bi bi-arrow-left-circle me-2"></i> Back to Routes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
