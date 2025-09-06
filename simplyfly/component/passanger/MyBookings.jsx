import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import BookingService from "../../Service/BookingService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setMsg("❌ Token not found!");
          setLoading(false);
          return;
        }

        // Decode JWT to extract email
        const payload = JSON.parse(atob(token.split(".")[1]));
        const email = payload.sub;

        // Get user details
        // const userRes = await axios.get(
        //   `http://localhost:8080/api/users/getUserByEmail/${email}`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const userRes=await UserService.getUserByEmail(email,token);

        const userId = userRes.data.userId;

        // Fetch bookings by user
        // const bookingRes = await axios.get(
        //   `http://localhost:8080/api/bookings/getByUser/${userId}`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const bookingRes = await BookingService.getBookingsByUser(userId, token);

        // Ensure it's always an array

        let bookingsData = bookingRes.data;

        // ✅ If backend returns string instead of array, parse it
        if (typeof bookingsData === "string") {
          try {
            bookingsData = JSON.parse(bookingsData);
          } catch (e) {
            console.error("Failed to parse bookings JSON:", e);
            bookingsData = [];
          }
        }

        // ✅ Ensure always an array
        if (!Array.isArray(bookingsData)) {
          bookingsData = [bookingsData];
        }

        setBookings(bookingsData);
        console.log("Final bookings:", bookingsData);


        setMsg("");
      } catch (err) {
        console.error(err);
        setMsg("❌ Failed to fetch bookings!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  console.log(" booking", bookings)



  const cancelBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem("jwtToken");
    // await axios.delete(`http://localhost:8080/api/bookings/cancel/${bookingId}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    await BookingService.cancelBooking(bookingId, token);
    setBookings(bookings.filter((b) => b.bookingId !== bookingId));
    setMsg("✅ Booking cancelled and refund request created.");
  } catch (err) {
    setMsg("❌ Failed to cancel booking.");
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container bg-light p-5 rounded shadow-lg" style={{ maxWidth: "1000px" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">✈️ My Bookings</h2>

        {msg && <div className="alert alert-info">{msg}</div>}

        {loading ? (
          <div className="text-center text-muted">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-muted">No bookings found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>Flight Name</th>
                  <th>Flight Number</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Total Amount</th>
                  <th>Seats</th>
                  <th>Refund</th>
                  <th>Refund Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.flight.flightName}</td>
                    <td>{booking.flight?.flightNumber || "N/A"}</td>
                    <td>
                      {booking.flight?.departureTime
                        ? new Date(booking.flight.departureTime).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      {booking.flight?.arrivalTime
                        ? new Date(booking.flight.arrivalTime).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>{booking.flight?.route?.origin || "N/A"}</td>
                    <td>{booking.flight?.route?.destination || "N/A"}</td>
                    <td>
                      <span
                        className={`badge ${booking.status === "CONFIRMED"
                            ? "bg-success"
                            : "bg-warning text-dark"
                          }`}
                      >
                        {booking.status || "N/A"}
                      </span>
                    </td>
                    <td>₹{booking.totalAmount || 0}</td>
                    <td>
                      {booking.bookedSeats?.length > 0
                        ? booking.bookedSeats.map((s) => s.seatNumber).join(", ")
                        : "—"}
                    </td>

                    <td>
                      {new Date(booking.flight?.departureTime) > new Date(Date.now() + 24 * 60 * 60 * 1000) ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => cancelBooking(booking.bookingId)}
                        >
                          ❌ Cancel
                        </button>
                      ) : (
                        <span className="text-muted">Not cancellable</span>
                      )}
                    </td>
                    <td>{booking.refund?.status}</td>
                  </tr>


                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={() => navigate("/passenger")}>
            🔙 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
