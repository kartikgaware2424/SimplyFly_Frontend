import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingService from "../../Service/BookingService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FlightBooking() {
  const { flightId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setError("❌ No token found. Please log in again.");
          return;
        }

        const res = await BookingService.getBookingsByFlight(flightId, token);

        setBookings(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [flightId]);

  if (loading) return <p className="text-center mt-5">Loading bookings...</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">📑 Flight {flightId} - Bookings</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/owner-dashboard")}
        >
          🏠 Home
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {bookings.length === 0 ? (
        <div className="alert alert-info text-center">No bookings found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm text-center">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>Passenger Name</th>
                <th>Email</th>
                <th>Seat No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.passenger?.name || "N/A"}</td>
                  <td>{b.passenger?.email || "N/A"}</td>
                   <td>
                    {b.bookedSeats && b.bookedSeats.length > 0
                      ? b.bookedSeats.map((seat) => seat.seatNumber).join(", ")
                      : "N/A"}
                  </td>
                  <td>{b.status || "CONFIRMED"}</td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
      )}
    </div>
  );
}
