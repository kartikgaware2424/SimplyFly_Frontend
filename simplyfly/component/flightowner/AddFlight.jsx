import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import FlightService from "../../Service/FlightService";
import UserService from "../../Service/UserService";
import axios from "axios";

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

const toSeconds = (val) => {
  // datetime-local gives 
  if (!val) return "";
  return val.length === 16 ? `${val}:00` : val;
};

export default function AddFlight() {
  const navigate = useNavigate();
  const { routeId } = useParams(); // /add-flight/:routeId
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [flight, setFlight] = useState({
    flightName: "",
    flightNumber: "",
    totalSeats: "",
    fare: "",
    baggageCheckIn: "",
    baggageCabin: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    routeId: routeId || "",   // from URL
    ownerId: "",              // from token
  });

  // Fetch ownerId userId via token -> email -> API
  useEffect(() => {
    const fetchOwnerId = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) return setError("❌ No token found! Please log in.");

        const payload = parseJwt(token);
        const email = payload?.sub;
        if (!email) return setError("❌ Email not found in token.");

        const res = await UserService.getUserByEmail(email, token);
        console.log(res)
        setFlight((prev) => ({ ...prev, ownerId: res.data.userId }));
      } catch (e) {
        console.error(e);
        setError("❌ Failed to load owner ID.");
      }
    };
    fetchOwnerId();
  }, []);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  // Client-side validations mirroring FlightDto
  const validateForm = () => {
    if (!flight.flightName?.trim() || flight.flightName.length > 100)
      return "Flight name is required (max 100 chars).";
    if (!flight.flightNumber?.trim() || flight.flightNumber.length > 20)
      return "Flight number is required (max 20 chars).";
    const seats = Number(flight.totalSeats);
    if (!seats || seats < 1 || seats > 1000)
      return "Total seats must be between 1 and 1000.";
    const fare = Number(flight.fare);
    if (!fare || fare <= 0 || fare > 100000)
      return "Fare must be > 0 and ≤ 100,000.";
    if (!flight.baggageCheckIn?.trim() || flight.baggageCheckIn.length > 20)
      return "Check-in baggage info required (max 20 chars).";
    if (!flight.baggageCabin?.trim() || flight.baggageCabin.length > 20)
      return "Cabin baggage info required (max 20 chars).";
    if (!flight.departureTime) return "Departure time is required.";
    if (!flight.arrivalTime) return "Arrival time is required.";

    const dep = new Date(flight.departureTime);
    const arr = new Date(flight.arrivalTime);
    const now = new Date();

    if (dep > arr || dep.getTime() === arr.getTime())
      return "Arrival must be after departure.";
    if (dep < now || arr < now)
      return "Departure/Arrival must be today or in the future.";
    if (!flight.routeId) return "Route ID is required.";
    if (!flight.ownerId) return "Owner ID is missing.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    // Ensure date fields match backend pattern
    const departureTime = toSeconds(flight.departureTime);
    const arrivalTime = toSeconds(flight.arrivalTime);
    const departureDate =
      flight.departureDate || flight.departureTime.split("T")[0];

    const flightDto = {
      flightName: flight.flightName.trim(),
      flightNumber: flight.flightNumber.trim(),
      totalSeats: Number(flight.totalSeats),
      fare: Number(flight.fare),
      baggageCheckIn: flight.baggageCheckIn.trim(),
      baggageCabin: flight.baggageCabin.trim(),
      departureDate,                 // LocalDate (yyyy-MM-dd)
      departureTime,                 // LocalDateTime (yyyy-MM-dd'T'HH:mm:ss)
      arrivalTime,                   // LocalDateTime (yyyy-MM-dd'T'HH:mm:ss)
      routeId: Number(flight.routeId),
      ownerId: Number(flight.ownerId),
    };

    try {
      const token = localStorage.getItem("jwtToken");
      await FlightService.addFlight(flightDto, token);


      setSuccess(true);
      setError("");

      // Reset (keep routeId & ownerId)
      setFlight((prev) => ({
        ...prev,
        flightName: "",
        flightNumber: "",
        totalSeats: "",
        fare: "",
        baggageCheckIn: "",
        baggageCabin: "",
        departureDate: "",
        departureTime: "",
        arrivalTime: "",
      }));

      setTimeout(() => navigate("/manage-flight"), 1500);
    } catch (err) {
      console.error(err);
      // Try to show backend validation messages if any
      const backendMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "❌ Failed to add flight.";
      setError(backendMsg);
      setSuccess(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/137004182/photo/xl-jet-airplane-landing-in-bright-sky.jpg?s=612x612&w=0&k=20&c=PC5wJh9j3PB09ZQCSRDfTfHBai3-1-6qjLrnQ9aM4fk=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="card shadow-lg border-0" style={{ borderRadius: "15px" }}>
              <div className="card-header text-center bg-primary text-white">
                <h1><i className="bi bi-airplane-fill me-2"></i>Add Flight</h1>
              </div>
              <div className="card-body p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Flight added successfully! Redirecting...
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-plane-fill me-1"></i> Flight Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="flightName"
                        value={flight.flightName}
                        onChange={handleChange}
                        placeholder="Enter flight name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-hash me-1"></i> Flight Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="flightNumber"
                        value={flight.flightNumber}
                        onChange={handleChange}
                        placeholder="Enter flight number"
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        <i className="bi bi-people-fill me-1"></i> Total Seats
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="totalSeats"
                        value={flight.totalSeats}
                        onChange={handleChange}
                        min="1"
                        max="1000"
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        <i className="bi bi-currency-rupee me-1"></i> Fare
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="fare"
                        value={flight.fare}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        max="100000"
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        <i className="bi bi-briefcase-fill me-1"></i> Check-in Baggage
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="baggageCheckIn"
                        value={flight.baggageCheckIn}
                        onChange={handleChange}
                        placeholder="e.g. 15kg"
                        maxLength={20}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-bag-fill me-1"></i> Cabin Baggage
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="baggageCabin"
                        value={flight.baggageCabin}
                        onChange={handleChange}
                        placeholder="e.g. 7kg"
                        maxLength={20}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-calendar-event-fill me-1"></i> Departure Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="departureDate"
                        value={flight.departureDate}
                        onChange={handleChange}
                        // optional because we derive from departureTime if empty
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-clock-fill me-1"></i> Departure Time
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="departureTime"
                        value={flight.departureTime}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-alarm-fill me-1"></i> Arrival Time
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="arrivalTime"
                        value={flight.arrivalTime}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Route ID from URL (read-only) */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-signpost-2-fill me-1"></i> Route ID
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="routeId"
                        value={flight.routeId}
                        onChange={handleChange}
                        readOnly
                        required
                      />
                    </div>

                    {/* Owner ID from token (read-only) */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-person-fill me-1"></i> Owner ID
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="ownerId"
                        value={flight.ownerId}
                        readOnly
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success w-100 mt-4">
                    <i className="bi bi-plus-circle-fill me-2"></i> Add Flight
                  </button>
                </form>

                <div className="text-center mt-3">
                  <button onClick={() => navigate("/route-list")} className="btn btn-primary">
                    <i className="bi bi-arrow-left-circle me-2"></i> Back to Routes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
