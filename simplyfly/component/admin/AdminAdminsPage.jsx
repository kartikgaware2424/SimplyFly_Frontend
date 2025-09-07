import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        // const res = await axios.get(
        //   "http://localhost:8080/api/users/getUserByRole/ADMIN",
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const res = await UserService.getUsersByRole("ADMIN", token);
        setAdmins(res.data);
      } catch (err) {
        console.error("Error fetching admins", err);
      }
    };
    fetchAdmins();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this Admin?")) return;
    

    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:8080/api/users/deleteById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // await UserService.deleteUserById(id, token);
      setAdmins(admins.filter((u) => u.userId !== id));
    } catch (err) {
      console.error("Error deleting admin", err);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mt-5 bg-light p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary">
            👨‍💼 Admin Management
          </h3>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/manage-user")}
          >
            🏠 Home
          </button>
        </div>

        {admins.length === 0 ? (
          <div className="alert alert-info text-center">
            ℹ️ No admins found.
          </div>
        ) : (
          <ul className="list-group">
            {admins.map((a) => (
              <li
                key={a.userId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  👤 <strong>{a.name}</strong> <br />
                  📧 {a.email}
                </span>
                <button
                  onClick={() => deleteUser(a.userId)}
                  className="btn btn-danger btn-sm"
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
