// FlightService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/flights";

class FlightService {
  // Add a new flight
  addFlight(flightDto, token) {
    return axios.post(`${API_URL}/add`, flightDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Get all flights
  getAllFlights(token) {
    return axios.get(`${API_URL}/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Get flights by owner ID
  getFlightsByOwner(ownerId, token) {
    return axios.get(`${API_URL}/getByOwner/${ownerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Delete a flight by ID
  deleteFlight(flightId, token) {
    return axios.delete(`${API_URL}/deleteById/${flightId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Update a flight by ID
  updateFlight(flightId, flight, token) {
    return axios.put(`${API_URL}/updateById/${flightId}`, flight, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Search flights by origin & destination
  searchByRoute(origin, destination) {
    return axios.get(`${API_URL}/searchByRoute/${origin}/${destination}`);
  }

  // Search flights by origin, destination & departure date
  searchByRouteAndDate(origin, destination, departureDate, token) {
    return axios.get(
      `${API_URL}/searchByRouteAndDate/${origin}/${destination}/${departureDate}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Get flight by ID
  getFlightById(flightId, token) {
    return axios.get(`${API_URL}/getById/${flightId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new FlightService();
