import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "../../Service/UserService";
import FlightService from "../../Service/FlightService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function GetBooking() {
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch owner flights on load
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) {
                    setError("❌ No token found. Please log in again.");
                    return;
                }

                // Decode JWT to get email
                const payload = JSON.parse(atob(token.split(".")[1]));
                const email = payload.sub;

                // Fetch userId by email
                // const userRes = await axios.get(
                //     `http://localhost:8080/api/users/getUserByEmail/${email}`,
                //     { headers: { Authorization: `Bearer ${token}` } }
                // );

                const userRes = await UserService.getUserByEmail(email, token);

                const ownerId = userRes.data.userId;

                // Fetch flights by ownerId
                // const flightRes = await axios.get(
                //     `http://localhost:8080/api/flights/getByOwner/${ownerId}`,
                //     { headers: { Authorization: `Bearer ${token}` } }
                // );

                const flightRes = await FlightService.getFlightsByOwner(ownerId, token);

                setFlights(flightRes.data);
            } catch (err) {
                console.error(err);
                setError("❌ Failed to fetch flights.");
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    // Delete Flight
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flight?")) return;

        try {
            const token = localStorage.getItem("jwtToken");
            // await axios.delete(`http://localhost:8080/api/flights/deleteById/${id}`, {
            //     headers: { Authorization: `Bearer ${token}` },
            // });

            await FlightService.deleteFlight(id, token);

            setFlights(flights.filter((f) => f.flightId !== id));
        } catch (err) {
            console.error(err);
            setError("❌ Failed to delete flight.");
        }
    };

    if (loading) return <p className="text-center mt-5">Loading flights...</p>;

    return (
        <div
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg')", // background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "30px",
            }}
        >
            <div className="container bg-light p-4 rounded shadow">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary m-0">
                        <i className="bi bi-airplane-fill me-2"></i> My Flight  Booking
                    </h2>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/owner-dashboard")}
                    >
                        🏠 Home
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {flights.length === 0 ? (
                    <div className="alert alert-info text-center">No flights found.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover shadow-sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Number</th>
                                    <th>Seats</th>
                                    <th>Fare</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Route ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight) => (
                                    <tr key={flight.flightId}>
                                        <td>{flight.flightId}</td>
                                        <td>{flight.flightName}</td>
                                        <td>{flight.flightNumber}</td>
                                        <td>{flight.totalSeats}</td>
                                        <td>{flight.fare}</td>
                                        <td>{flight.departureTime}</td>
                                        <td>{flight.arrivalTime}</td>
                                        <td>{flight.route.routeId}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    navigate(`/flight-booking/${flight.flightId}`, {
                                                        state: { flight },
                                                    })
                                                }
                                            >
                                                <i className="bi bi-pencil-square"></i> Bookings
                                            </button>
                                           
                                        </td>
                                    </tr>
                                ))}

                                

                                
                            </tbody>

                            
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}