import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Refund() {
  const [refunds, setRefunds] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setError("❌ No token found. Please log in again.");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const email = payload.sub;

        // Fetch userId by email
        // const userRes = await axios.get(
        //   `http://localhost:8080/api/users/getUserByEmail/${email}`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const userRes = await UserService.getUserByEmail(email, token);

        const ownerId = userRes.data.userId;

        // Fetch refunds for owner’s flights
        // const refundRes = await axios.get(
        //   `http://localhost:8080/api/refunds/getByOwner/${ownerId}`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const refundRes = await RefundService.getRefundsByOwner(ownerId, token);

        setRefunds(refundRes.data);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch refunds.");
      } finally {
        setLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  const handleRefundAction = async (refundId, action) => {
    try {
      const token = localStorage.getItem("jwtToken");
      // If the action is approve then insert into approve else in reject 
      const url =
         action === "approve"
          ? `http://localhost:8080/api/refunds/approve/${refundId}`
          : `http://localhost:8080/api/refunds/reject/${refundId}`;

      await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } });

      alert(`Refund ${action}d successfully`);

      // Update status locally
      setRefunds((prev) =>
        prev.map((r) =>r.refundId === refundId
            ? { ...r, status: action === "approve" ? "COMPLETED" : "REJECTED" }
            : r
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to process refund action");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading refunds...</p>;

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div className="container bg-light p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary m-0">
            <i className="bi bi-cash-coin me-2"></i> Refund Requests
          </h2>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/admin-dashboard")}
          >
            🏠 Home
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {refunds.length === 0 ? (
          <div className="alert alert-info text-center">No refund requests found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Booking</th>
                  <th>Passenger</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((r) => (
                  <tr key={r.refundId}>
                    <td>{r.refundId}</td>
                    <td>{r.booking?.bookingId || "N/A"}</td>
                    <td>{r.booking?.passenger?.name || "N/A"}</td>
                    <td>{r.booking?.passenger?.email || "N/A"}</td>
                    <td>{r.amount}</td>
                    <td>
                      <span
                        className={`badge ${
                          r.status === "PENDING"
                            ? "bg-warning"
                            : r.status === "COMPLETED"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td>
                      {r.status === "PENDING" && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleRefundAction(r.refundId, "approve")}
                          >
                            ✅ Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleRefundAction(r.refundId, "reject")}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      )}
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
