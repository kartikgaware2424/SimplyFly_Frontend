import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function AddFlight() {
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
    routeId: "",
    ownerId: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (flight.departureTime >= flight.arrivalTime) {
      setError("Arrival time must be after departure time!");
      return;
    }

    console.log("Flight Added:", flight);
    setSuccess(true);
    setFlight({
      flightName: "",
      flightNumber: "",
      totalSeats: "",
      fare: "",
      baggageCheckIn: "",
      baggageCabin: "",
      departureDate: "",
      departureTime: "",
      arrivalTime: "",
      routeId: "",
      ownerId: "",
    });
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
                <h1>
                  <i className="bi bi-airplane-fill me-2"></i>Add Flight
                </h1>
              </div>
              <div className="card-body p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Flight added successfully!
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
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        <i className="bi bi-briefcase-fill me-1"></i> Check-in
                        Baggage
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="baggageCheckIn"
                        value={flight.baggageCheckIn}
                        onChange={handleChange}
                        placeholder="e.g. 15kg"
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
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-calendar-event-fill me-1"></i>{" "}
                        Departure Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="departureDate"
                        value={flight.departureDate}
                        onChange={handleChange}
                        required
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
                        min="1"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="bi bi-person-fill me-1"></i> Owner ID
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="ownerId"
                        value={flight.ownerId}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success w-100 mt-4">
                    <i className="bi bi-plus-circle-fill me-2"></i> Add Flight
                  </button>
                </form>

                <div className="text-center mt-3">
                  <button
                    onClick={() => navigate("/owner-dashboard")}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-house-fill me-2"></i> Home
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
