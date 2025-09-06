import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        // const res = await axios.get("http://localhost:8080/api/users/getAll", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
         const res = await UserService.getAllUsers(token);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg')", // 🔹 put your image in public/images/admin-bg.jpg
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        padding: "30px",
      }}
    >
      <div className="container text-center">
        <h2 className="mb-4 fw-bold">👥 Manage Users by Role</h2>

        <div className="row justify-content-center">
          <div className="col-md-3 mb-4">
            <div
              className="card shadow-lg text-center border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin-passengers")}
            >
              <div className="card-body bg-dark text-white rounded-3">
                <h5 className="card-title">🧑‍✈️ Passengers</h5>
                <p className="card-text">
                  View and manage all registered passengers.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div
              className="card shadow-lg text-center border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin-owners")}
            >
              <div className="card-body bg-dark text-white rounded-3">
                <h5 className="card-title">✈️ Owners</h5>
                <p className="card-text">View and manage flight owners.</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div
              className="card shadow-lg text-center border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin-admins")}
            >
              <div className="card-body bg-dark text-white rounded-3">
                <h5 className="card-title">🛡️ Admins</h5>
                <p className="card-text">View and manage system admins.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Button */}
        <button
          className="btn btn-dark mt-4 px-4 fw-bold shadow"
          onClick={() => navigate("/admin-dashboard")}
        >
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
}
