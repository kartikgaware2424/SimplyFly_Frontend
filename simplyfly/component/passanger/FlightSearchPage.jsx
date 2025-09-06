import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import FlightService from '../../Service/FlightService';

const FlightSearchPage = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:8080/api/flights/searchByRoute/${origin}/${destination}`
      // );
      const response = await FlightService.searchByRoute(origin, destination);
      setFlights(response.data);
    } catch (error) {
      toast.error('No flights found!');
    }
  };

  const isFutureOrToday = (departureTime) => {
    const now = new Date();
    const dep = new Date(departureTime);
    return dep >= now; // true if departure is present or future
  };

  return (
    <div className="container py-4">
      <h3>Search Flights</h3>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="list-group">
        {flights.map((flight) => (
          <div
            key={flight.flightId}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {flight.flightName} - ₹{flight.fare} <br />
              Departure: {new Date(flight.departureTime).toLocaleString()}
            </span>
            {isFutureOrToday(flight.departureTime) && (
              <button
                className="btn btn-success"
                onClick={() =>
                  navigate('/select-seats', { state: { flight } })
                }
              >
                Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchPage;
