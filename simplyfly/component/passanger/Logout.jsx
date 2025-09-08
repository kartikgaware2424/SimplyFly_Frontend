import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
   
    localStorage.removeItem("jwtToken");

   
    localStorage.clear();

    
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 text-center">
        <h4>🚪 Logging out...</h4>
        <p className="text-muted">You will be redirected to the login page.</p>
      </div>
    </div>
  );
}
