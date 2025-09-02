import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function DisplayBookings() {
    const { state } = useLocation();
    const bookings = state?.bookings || [];

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#f0f2f5" }}>
            <div className="card shadow-lg p-4" style={{ maxWidth: "700px", width: "100%", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 text-primary">✈️ My Bookings</h3>

                {bookings.length === 0 ? (
                    <div className="text-center text-muted">No bookings found.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>Booking </th>
                                    <th>Flight Name</th>
                                    <th>Passenger Name</th>
                                    <th>Seats</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b, index) => (
                                    <tr key={index}>
                                        <td>{b.bookingId}</td>
                                        <td>{b.flightId}</td>
                                        <td>{b.passengerId}</td>
                                        <td>{b.selectedSeats.join(", ")}</td>
                                        <td>₹{b.totalAmount}</td>
                                        <td>
                                            <span className={`badge ${b.status === "CONFIRMED" ? "bg-success" : "bg-warning text-dark"}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="text-center mt-3">
                    <Link to="/passenger-dashboard" className="btn btn-primary">🔙 Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
