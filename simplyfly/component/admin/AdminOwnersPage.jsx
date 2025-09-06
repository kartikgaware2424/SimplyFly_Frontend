import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOwnersPage() {
  const [owners, setOwners] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        // const res = await axios.get(
        //   "http://localhost:8080/api/users/getUserByRole/OWNER",
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
          const res = await UserService.getUsersByRole("OWNER", token);
        setOwners(res.data);
      } catch (err) {
        console.error("Error fetching owners", err);
      }
    };
    fetchOwners();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this Owner?")) return;

    try {
      const token = localStorage.getItem("jwtToken");
      // await axios.delete(`http://localhost:8080/api/users/deleteById/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      await UserService.deleteUserById(id, token);
      setOwners(owners.filter((u) => u.userId !== id));
    } catch (err) {
      console.error("Error deleting owner", err);
    }
  };

  const viewFlights = async (owner) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.get(
        `http://localhost:8080/api/flights/getByOwner/${owner.userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFlights(res.data);
      setSelectedOwner(owner);
    } catch (err) {
      console.error("Error fetching flights", err);
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
          <h3 className="text-primary">🛫 Flight Owners</h3>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/manage-user")}
          >
            🏠 Home
          </button>
        </div>

        {owners.length === 0 ? (
          <div className="alert alert-info text-center">ℹ️ No owners found.</div>
        ) : (
          <ul className="list-group">
            {owners.map((o) => (
              <li
                key={o.userId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  👤 <strong>{o.name}</strong> <br />
                  📧 {o.email}
                </span>
                <div>
                  <button
                    onClick={() => deleteUser(o.userId)}
                    className="btn btn-danger btn-sm me-2"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => viewFlights(o)}
                    className="btn btn-info btn-sm"
                  >
                    ✈️ View Flights
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {flights.length > 0 && (
          <div className="mt-4">
            <h4 className="text-success">
              ✈️ Flights by Owner: <strong>{selectedOwner?.name}</strong>
            </h4>
            <ul className="list-group mt-2">
              {flights.map((f) => (
                <li
                  key={f.flightId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    🛩️ {f.flightName} ({f.flightNumber}) <br />
                    💺 Seats: {f.totalSeats} | 💵 Fare: {f.fare}
                  </span>
                  <span className="badge bg-dark">
                    Route ID: {f.route.routeId}
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
