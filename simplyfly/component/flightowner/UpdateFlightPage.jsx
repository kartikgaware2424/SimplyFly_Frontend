import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import FlightService from "../../Service/FlightService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateFlightPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(location.state?.flight || {});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");

    
      const updatedFlight = {
        ...flight,
        routeId: flight.route?.routeId || flight.routeId,
        ownerId: flight.owner?.userId || flight.ownerId,
      };

      // await axios.put(
      //   `http://localhost:8080/api/flights/updateById/${id}`,
      //   updatedFlight,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

    
       await FlightService.updateFlight(id, updatedFlight, token);

      setSuccess(true);
      setTimeout(() => navigate("/manage-flight"), 2000);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update flight.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        <i className="bi bi-pencil-square me-2"></i> Update Flight
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Flight updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Flight Name</label>
            <input
              type="text"
              name="flightName"
              value={flight.flightName || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={flight.flightNumber || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Seats</label>
            <input
              type="number"
              name="totalSeats"
              value={flight.totalSeats || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Fare</label>
            <input
              type="number"
              name="fare"
              value={flight.fare || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Departure Time</label>
            <input
              type="datetime-local"
              name="departureTime"
              value={flight.departureTime || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Arrival Time</label>
            <input
              type="datetime-local"
              name="arrivalTime"
              value={flight.arrivalTime || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

      
        <input type="hidden" name="routeId" value={flight.route?.routeId || flight.routeId || ""} />
        <input type="hidden" name="ownerId" value={flight.owner?.userId || flight.ownerId || ""} />

        <button type="submit" className="btn btn-success w-100 mt-4">
          Save Changes
        </button>
      </form>

      <div className="text-center mt-3">
        <button onClick={() => navigate("/manage-flight")} className="btn btn-dark">
          <i className="bi bi-arrow-left-circle me-2"></i> Back
        </button>
      </div>
    </div>
  );
}
