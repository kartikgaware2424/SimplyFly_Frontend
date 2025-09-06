import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashBoard() {
  const cards = [
    {
      title: "Regsiter New Admin and Flight Owner",
      link: "/admin-register",
     desc: "You can register new admin and Flight Owner.",
    },
    {
      title: "Manage Accounts",
      link: "/manage-user",
      desc: "Manage User Account (FlightOwner & Passenger)",
    },
    {
      title: "Manage route",
      link: "/manage-route",
       desc: "View and manage all your  route in one place.",
    },
    {
      title: "Manage Refund",
      link: "/manage-adminrefund",
       desc: "View and manage all your  refund in one place.",
    }
    
  ];

  return (
   <div
  className="min-vh-100 d-flex flex-column"
  style={{
    backgroundImage:
      "url('https://images.alphacoders.com/118/thumb-1920-1181929.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  }}
>
  
  <nav
    className="d-flex justify-content-between align-items-center p-3"
    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
  >
    <div className="fw-bold fs-3">✈️ SimpliFly</div>
    <div className="d-flex gap-3">
      <Link
        to="/Logout"
        className="text-white text-decoration-none fw-bold"
      >
        Logout
      </Link>
      <Link
        to="/profile"
        className="text-white text-decoration-none fw-bold"
      >
        Profile
      </Link>
    </div>
  </nav>

  
  <div className="p-4 text-center" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
    <h1 className="display-4 fw-bold">Welcome, Administrator!</h1>
    <p className="lead">Manage your Flight with us with easy steps!!!!</p>
  </div>

 
  <div className="container mt-5 mb-5">
    <h4 className="mb-4 text-center text-white">Administrator's Dashboard</h4>

    <div className="row g-4">
      {cards.map((card) => (
        <div className="col-md-4" key={card.title}>
          <Link
            to={card.link}
            className="card h-100 text-decoration-none text-dark"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)", 
              backdropFilter: "blur(10px)", 
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "15px",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <img
              src={card.img}
              className="card-img-top"
              alt={card.title}
              style={{ height: "180px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              
              <p className="card-text">{card.desc}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>


  <footer
    className="text-center py-4 mt-auto"
    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
  >
    <p className="mb-0 text-white-50">©2025 SimpliFly. Fly with confidence.</p>
  </footer>
</div>
    
  );
}
