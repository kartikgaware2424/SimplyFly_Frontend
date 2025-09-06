import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RouteService from "../../Service/RouteService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RouteList() {
  const [routes, setRoutes] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setMsg("❌ Token not found!");
          return;
        }

        // const res = await axios.get("http://localhost:8080/api/routes/getAllRoutes", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
         const res= await RouteService.getAllRoutes(token);
        setRoutes(res.data);
      } catch (err) {
        console.error(err);
        setMsg("❌ Failed to load routes.");
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://w0.peakpx.com/wallpaper/150/67/HD-wallpaper-airplane-wing-sky-flight-clouds-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container my-5 bg-light p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">🛣️ Routes</h2>
          <div>
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate("/owner-dashboard")}
            >
              🏠 Home
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate("/add-route")}
            >
              ➕ Add New Route
            </button>
          </div>
        </div>

        {msg && <div className="alert alert-danger">{msg}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover text-center shadow-lg rounded">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Distance (km)</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {routes.length > 0 ? (
                routes.map((route) => (
                  <tr key={route.routeId}>
                    <td>{route.routeId}</td>
                    <td>{route.origin}</td>
                    <td>{route.destination}</td>
                    <td>{route.distanceInKm}</td>
                    <td>{route.travelDuration}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/add-flight/${route.routeId}`)}
                      >
                        ✈️ Add Flight
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-muted">
                    No routes available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
