import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function ManageFlight() {
  const navigate = useNavigate(); 
  const [deleteId, setDeleteId] = useState("");
  const [updateData, setUpdateData] = useState({
    flightId: "",
    flightName: "",
    flightNumber: "",
    totalSeats: "",
    fare: "",
    baggageCheckIn: "",
    baggageCabin: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  
  const handleDelete = () => {
    if (deleteId.trim() === "") {
      setMessage("❌ Please enter a Flight ID to delete.");
      setIsSuccess(false);
    } else {
      setMessage(`✅ Flight with ID ${deleteId} deleted (UI only).`);
      setIsSuccess(true);
      setDeleteId("");
    }
  };

  
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!updateData.flightId) {
      setMessage("❌ Flight ID is required for update.");
      setIsSuccess(false);
    } else {
      setMessage(
        `✅ Flight with ID ${updateData.flightId} updated (UI only).`
      );
      setIsSuccess(true);
      setUpdateData({
        flightId: "",
        flightName: "",
        flightNumber: "",
        totalSeats: "",
        fare: "",
        baggageCheckIn: "",
        baggageCabin: "",
        departureDate: "",
        departureTime: "",
        arrivalTime: "",
      });
    }
  };

  
  const goToHome = () => {
    navigate("/owner-dashboard"); 
  };

 
  const containerStyle = {
    minHeight: "100vh",
    padding: "30px",
    background:
      "url('https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw=') no-repeat center center fixed",
    backgroundSize: "cover",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "15px",
    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div style={containerStyle}>
  
      <div className="text-center mb-4">
        <h2 className="mt-2 text-light fw-bold">✈ Manage Flights</h2>
        <p className="text-light">Update or delete flights easily </p>
        <button className="btn btn-warning mt-2" onClick={goToHome}>
          🏠 Home
        </button>
      </div>

    
      <div className="p-4 mb-4" style={cardStyle}>
        <h4 className="mb-3">❌ Delete Flight</h4>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Flight ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      
      <div className="p-4" style={cardStyle}>
        <h4 className="mb-3">✏️ Update Flight</h4>
        <form onSubmit={handleUpdate}>
          <div className="row g-2">
            {Object.entries({
              flightId: "Flight ID",
              flightName: "Flight Name",
              flightNumber: "Flight Number",
              totalSeats: "Total Seats",
              fare: "Fare",
              baggageCheckIn: "Check-in Baggage",
              baggageCabin: "Cabin Baggage",
            }).map(([key, placeholder]) => (
              <div className="col-md-6" key={key}>
                <input
                  type={key === "totalSeats" || key === "fare" ? "number" : "text"}
                  className="form-control mb-2"
                  placeholder={placeholder}
                  value={updateData[key]}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, [key]: e.target.value })
                  }
                  required={["flightId"].includes(key)}
                />
              </div>
            ))}
            <div className="col-md-6">
              <input
                type="date"
                className="form-control mb-2"
                value={updateData.departureDate}
                onChange={(e) =>
                  setUpdateData({ ...updateData, departureDate: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <input
                type="datetime-local"
                className="form-control mb-2"
                value={updateData.departureTime}
                onChange={(e) =>
                  setUpdateData({ ...updateData, departureTime: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <input
                type="datetime-local"
                className="form-control mb-2"
                value={updateData.arrivalTime}
                onChange={(e) =>
                  setUpdateData({ ...updateData, arrivalTime: e.target.value })
                }
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2 w-100">
            Update Flight
          </button>
        </form>
      </div>

      
      {message && (
        <div
          className={`alert mt-4 ${
            isSuccess ? "alert-success" : "alert-danger"
          } d-flex align-items-center`}
        >
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
