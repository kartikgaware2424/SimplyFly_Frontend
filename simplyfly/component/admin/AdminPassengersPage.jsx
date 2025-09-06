import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminPassengersPage() {
  const [passengers, setPassengers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          window.location.href = "/login";
          return;
        }
        // const res = await axios.get(
        //   "http://localhost:8080/api/users/getUserByRole/PASSENGER",
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const res = await UserService.getUsersByRole("PASSENGER", token);
        setPassengers(res.data);
      } catch (err) {
        console.error("Error fetching passengers", err);
        setError("❌ Failed to load passengers");
      }
    };
    fetchPassengers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this Passenger?")) return;

    try {
      const token = localStorage.getItem("jwtToken");
      // await axios.delete(`http://localhost:8080/api/users/deleteById/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      await UserService.deleteUserById(id, token);
      setPassengers(passengers.filter((u) => u.userId !== id));
      setSuccess("✅ Passenger deleted successfully!");
      setError("");
    } catch (err) {
      console.error("Error deleting passenger", err);
      setError("❌ Failed to delete passenger");
    }
  };

  const viewBookings = async (passenger) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.get(
        `http://localhost:8080/api/bookings/getByUser/${passenger.userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(res.data);
      setSelectedPassenger(passenger);
      setSuccess("✅ Bookings loaded!");
      setError("");
    } catch (err) {
      console.error("Error fetching bookings", err);
      setError("❌ Failed to load bookings");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div className="container mt-4 bg-light p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary">🧑‍✈️ Passengers</h3>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/manage-user")}
          >
            🏠 Home
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {passengers.length === 0 ? (
          <div className="alert alert-info text-center">ℹ️ No passengers found.</div>
        ) : (
          <ul className="list-group">
            {passengers.map((p) => (
              <li
                key={p.userId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  👤 <strong>{p.name}</strong> <br />
                  📧 {p.email}
                </span>
                <div>
                  <button
                    onClick={() => deleteUser(p.userId)}
                    className="btn btn-danger btn-sm me-2"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => viewBookings(p)}
                    className="btn btn-info btn-sm"
                  >
                    📑 View Bookings
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {bookings.length > 0 && (
          <div className="mt-4">
            <h4 className="text-success">
              📑 Bookings of <strong>{selectedPassenger?.name}</strong>
            </h4>
            <ul className="list-group mt-2">
              {bookings.map((b) => (
                <li
                  key={b.bookingId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    🆔 Booking ID: {b.bookingId} <br />
                    ✈️ Flight: {b.flight.flightName} ({b.flight.flightNumber}) <br />
                    📅 Date: {new Date(b.bookingDate).toLocaleString()} <br />
                    💵 Amount: {b.totalAmount} | 🎫 Status: {b.status}
                  </span>
                  <span className="badge bg-dark">
                    Seats: {b.bookedSeats.map((s) => s.seatNumber).join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
