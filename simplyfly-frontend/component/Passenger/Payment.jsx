import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { flightId, selectedSeats, totalAmount } = state;
    const [passengerId, setPassengerId] = useState("12345"); 
    const [paymentMethod, setPaymentMethod] = useState("CARD");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setPassengerId("12345");
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const handlePayment = () => {
        if (!passengerId) {
            setMsg("❌ Passenger ID not loaded yet.");
            return;
        }

        const booking = {
            bookingId: Math.floor(Math.random() * 10000),
            flightId,
            passengerId,
            selectedSeats,
            totalAmount,
            paymentMethod,
            status: "CONFIRMED"
        };

        setMsg("✅ Booking & Payment Successful!");

        setTimeout(() => {
            navigate("/display-bookings", { state: { bookings: [booking] } });
        }, 1500);
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#f8f9fa" }}>
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>
                <h3 className="text-center mb-3 text-primary">💳 Payment Page</h3>

                <div className="mb-2"><strong>Flight ID:</strong> {flightId}</div>
                <div className="mb-2"><strong>Passenger ID:</strong> {passengerId || "Loading..."}</div>
                <div className="mb-2"><strong>Selected Seats:</strong> {selectedSeats.join(", ")}</div>
                <div className="mb-3"><strong>Total Amount:</strong> ₹{totalAmount}</div>

                <label className="form-label">Payment Method:</label>
                <select
                    className="form-select mb-3"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="CARD">CARD</option>
                    <option value="UPI">UPI</option>
                    <option value="NETBANKING">NETBANKING</option>
                </select>

                <button
                    className="btn btn-success w-100 mb-2"
                    onClick={handlePayment}
                    disabled={!passengerId}
                >
                    Pay & Book
                </button>

                {msg && <div className="alert alert-info mt-3 text-center">{msg}</div>}
            </div>
        </div>
    );
}
