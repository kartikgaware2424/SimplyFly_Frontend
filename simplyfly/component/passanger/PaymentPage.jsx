import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "../../Service/UserService";
import SeatService from "../../Service/SeatService";
import PaymentService from "../../Service/PaymentService";
import BookingService from "../../Service/BookingService";

export default function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { flightId, selectedSeats, totalAmount } = state;
    const [passengerId, setPassengerId] = useState(null);
    const [seatIds, setSeatIds] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("CARD");
    const [msg, setMsg] = useState("");

    // Fetch passenger ID and seat IDs on mount
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        // 1️⃣ Fetch passenger/user ID
        const fetchPassengerId = async () => {
            try {
                if (!token) return setMsg("❌ Token not found!");
                const payload = JSON.parse(atob(token.split('.')[1]));
                const email = payload.sub;
                if (!email) return setMsg("❌ Email not found in token!");

                // const res = await axios.get(
                //     `http://localhost:8080/api/users/getUserByEmail/${email}`,
                //     { headers: { Authorization: `Bearer ${token}` } }
                // );
                const res=await UserService.getUserByEmail(email,token);
                setPassengerId(res.data.userId);

            } catch (err) {
                console.error(err);
                setMsg("❌ Error fetching user details!");
            }
        };

        // 2️⃣ Fetch seat IDs for all selected seats
      const fetchSeatIds = async () => {
  try {
    if (!token) return;
    const ids = [];

    for (let seatNumber of selectedSeats) {
    //   const res = await axios.get(
    //     `http://localhost:8080/api/seats/getBySeatNumber/${seatNumber}`,
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );

    const res = await SeatService.getSeatByNumber(seatNumber, token);

      if (Array.isArray(res.data)) {
        // If backend returns an array
        res.data.forEach(seat => ids.push(seat.seat_id || seat.seatId));
      } else if (res.data) {
        // If backend returns a single seat object
        ids.push(res.data.seat_id || res.data.seatId);
      }
    }

    console.log("Fetched seat IDs:", ids);
    setSeatIds(ids);
  } catch (err) {
    console.error(err);
    setMsg("❌ Error fetching seat IDs!");
  }
};

        fetchPassengerId();
        fetchSeatIds();
    }, [selectedSeats]);

    const handlePayment = async () => {
        if (!passengerId) {
            setMsg("❌ Passenger ID not loaded yet.");
            return;
        }

        if (seatIds.length === 0) {
            setMsg("❌ Seat IDs not loaded yet.");
            return;
        }
        console.log("This is seat id", seatIds);

        const token = localStorage.getItem("jwtToken");

        try {
            // 1️⃣ Add Booking
            const now = new Date();
            const localIsoString = now.getFullYear() + "-" +
                String(now.getMonth() + 1).padStart(2, "0") + "-" +
                String(now.getDate()).padStart(2, "0") + "T" +
                String(now.getHours()).padStart(2, "0") + ":" +
                String(now.getMinutes()).padStart(2, "0") + ":" +
                String(now.getSeconds()).padStart(2, "0");

            const bookingDto = {
                bookingDate: localIsoString,
                totalAmount,
                status: "CONFIRMED",
                passengerId: parseInt(passengerId),
                flightId: parseInt(flightId),
                bookedSeatIds: seatIds, // <-- array of seat IDs
                paymentId: null,
                refundId: null
            };

            // const bookingRes = await axios.post(
            //     `http://localhost:8080/api/bookings/add`,
            //     bookingDto,
            //     { headers: { Authorization: `Bearer ${token}` } }
            // );

             const bookingRes = await BookingService.addBooking(bookingDto, token);

            const bookingId = bookingRes.data.bookingId;

            // 2️⃣ Add Payment
            const paymentDto = {
                amount: totalAmount,
                paymentDate: new Date(),
                paymentMethod,
                transactionId: "TXN" + Math.floor(Math.random() * 1000000),
                status: "SUCCESS",
                bookingId
            };

            // await axios.post(
            //     `http://localhost:8080/api/payments/add`,
            //     paymentDto,
            //     { headers: { Authorization: `Bearer ${token}` } }
            // );

             await PaymentService.addPayment(paymentDto, token);

            setMsg("✅ Booking & Payment Successful!");
            setTimeout(() => navigate("/my-bookings"), 2000);

        } catch (err) {
            console.error(err);
            setMsg("❌ Payment failed. Please try again!");
        }
    };

    return (
        <div className="container my-5">
            <h2>💳 Payment Page</h2>
            <p>Flight ID: {flightId}</p>
            <p>Passenger ID: {passengerId || "Loading..."}</p>
            <p>Selected Seats: {selectedSeats.join(", ")}</p>
            <p>Total Amount: ₹{totalAmount}</p>

            <label>Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="CARD">CARD</option>
                <option value="UPI">UPI</option>
                <option value="NETBANKING">NETBANKING</option>
            </select>

            <button
                className="btn btn-success mt-3"
                onClick={handlePayment}
                disabled={!passengerId || seatIds.length === 0}
            >
                Pay & Book
            </button>

            {msg && <div className="alert alert-info mt-3">{msg}</div>}
        </div>
    );
}
