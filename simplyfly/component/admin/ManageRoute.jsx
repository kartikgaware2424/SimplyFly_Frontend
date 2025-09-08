import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RouteService from "../../Service/RouteService";

export default function ManageRoute() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [updatedRoute, setUpdatedRoute] = useState({
    origin: "",
    destination: "",
    distanceInKm: "",
    travelDuration: "",
  });

  const navigate = useNavigate();

  
  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const res = await RouteService.getAllRoutes(token);
      setRoutes(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching routes", err);
      setError("Failed to load routes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  
  const deleteRoute = async (id) => {
    if (!window.confirm("Are you sure you want to delete this route?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      await RouteService.deleteRouteById(id, token);
      alert("Route deleted successfully!");
      fetchRoutes();
    } catch (err) {
      console.error("Error deleting route", err);
      alert("Failed to delete route");
    }
  };


  const openUpdateModal = (route) => {
    setSelectedRoute(route);
    setUpdatedRoute({
      origin: route.origin,
      destination: route.destination,
      distanceInKm: route.distanceInKm,
      travelDuration: route.travelDuration,
    });
  };

  
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await RouteService.updateRouteById(selectedRoute.routeId, updatedRoute, token);
      alert("Route updated successfully!");
      fetchRoutes();
      setSelectedRoute(null);
    } catch (err) {
      console.error("Error updating route", err);
      alert("Failed to update route");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
      }}
    >
      <div className="container bg-white p-4 rounded shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📍 Route Management</h2>
          <button className="btn btn-dark" onClick={() => navigate("/admin-dashboard")}>
            🏠 Home
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading routes...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <table className="table table-bordered table-hover text-center">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Distance (Km)</th>
                <th>Travel Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.routeId}>
                  <td>{route.routeId}</td>
                  <td>{route.origin}</td>
                  <td>{route.destination}</td>
                  <td>{route.distanceInKm}</td>
                  <td>{route.travelDuration}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => openUpdateModal(route)}
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                    >
                      ✏️ Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteRoute(route.routeId)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
      {selectedRoute && (
        <div
          className="modal fade show"
          id="updateModal"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Update Route</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedRoute(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>Origin</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedRoute.origin}
                      onChange={(e) =>
                        setUpdatedRoute({ ...updatedRoute, origin: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Destination</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedRoute.destination}
                      onChange={(e) =>
                        setUpdatedRoute({ ...updatedRoute, destination: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Distance (Km)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={updatedRoute.distanceInKm}
                      onChange={(e) =>
                        setUpdatedRoute({ ...updatedRoute, distanceInKm: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Travel Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2h 15m"
                      value={updatedRoute.travelDuration}
                      onChange={(e) =>
                        setUpdatedRoute({ ...updatedRoute, travelDuration: e.target.value })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedRoute(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
