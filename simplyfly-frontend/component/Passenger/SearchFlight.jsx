import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import planeLogo from '../assets/planeLogo.jpg';

export default function SearchFlight() {
    const navigate = useNavigate();

    const cities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune",
        "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
        "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
        "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad",
        "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi","Goa"
    ];

    const [flightSearch, setFlightSearch] = useState({
        origin: "",
        destination: "",
        departureDate: ""
    });

    const [flights, setFlights] = useState([]);
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightSearch({ ...flightSearch, [name]: value });
    };

  
    const dummyFlights = [
        {
            flightId: 1,
            flightName: "Air India Express",
            flightNumber: "AI101",
            departureDate: "2025-09-10",
            departureTime: "2025-09-10T08:00",
            arrivalTime: "2025-09-10T10:00",
            fare: 4500,
            totalSeats: 120
        },
        {
            flightId: 2,
            flightName: "IndiGo Airlines",
            flightNumber: "IG201",
            departureDate: "2025-09-10",
            departureTime: "2025-09-10T12:30",
            arrivalTime: "2025-09-10T14:30",
            fare: 5200,
            totalSeats: 150
        }
    ];

    const handleSearchByRouteAndDate = (e) => {
        e.preventDefault();
        setMsg("");
        setFlights([]);

        if (!flightSearch.origin || !flightSearch.destination || !flightSearch.departureDate) {
            setMsg("Please fill all fields!");
            return;
        }
         if (flightSearch.origin === flightSearch.destination) {
        setMsg("Origin and Destination cannot be the same ❌");
        return;
    }

        
        const results = dummyFlights.filter(f => f.departureDate === flightSearch.departureDate);
        if (results.length === 0) setMsg("No flights found ❌");
        setFlights(results);
    };

    const parseDateTime = (dt) => {
        if (!dt) return "";
        return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <img src={planeLogo} alt="Logo" style={{ width: "60px" }} />
                <h2 className="mt-2">✈️ Welcome, Passenger!</h2>
                <p className="text-muted">Find flights across India easily</p>
            </div>

            <div className="card p-4 shadow-lg mb-4">
                <h4 className="mb-3 text-primary">Search Flights by Route & Date</h4>
                <form onSubmit={handleSearchByRouteAndDate}>
                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Origin</label>
                            <select
                                className="form-select"
                                name="origin"
                                value={flightSearch.origin}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Origin</option>
                                {cities.map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Destination</label>
                            <select
                                className="form-select"
                                name="destination"
                                value={flightSearch.destination}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Destination</option>
                                {cities.map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Departure Date</label>
                            <input
                                type="date"
                                name="departureDate"
                                value={flightSearch.departureDate}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-gradient w-100 mb-3" style={{ background: "linear-gradient(45deg, #667eea, #764ba2)", color: "#fff" }}>
                        Search Flights
                    </button>
                </form>

                {msg && <div className="alert alert-danger mt-3">{msg}</div>}
            </div>

            {flights.length > 0 && (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {flights.map(flight => (
                        <div className="col" key={flight.flightId}>
                            <div className="card h-100 shadow-sm">
                                <img src={planeLogo} className="card-img-top" alt="Flight Logo" style={{ height: "120px", objectFit: "contain" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{flight.flightName}</h5>
                                    <p className="card-text mb-1"><strong>Flight Number:</strong> {flight.flightNumber}</p>
                                    <p><strong>Departure:</strong> {flight.departureDate} | {parseDateTime(flight.departureTime)}</p>
                                    <p><strong>Arrival:</strong> {flight.departureDate} | {parseDateTime(flight.arrivalTime)}</p>
                                    <p className="card-text mb-1"><strong>Fare:</strong> ₹{flight.fare}</p>
                                    <p className="card-text mb-1"><strong>Total Seats:</strong> {flight.totalSeats}</p>
                                    <button
                                        className="btn btn-primary w-100 mt-2"
                                        onClick={() => navigate(`/selectseat/${flight.flightId}/${flight.totalSeats}`)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center mt-4">
                <Link to="/passenger-dashboard" className="btn btn-outline-secondary">
                  Home Page
                </Link>
            </div>
        </div>
    );
}
