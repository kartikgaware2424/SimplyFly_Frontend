
import axios from "axios";

const API_URL = "http://localhost:8080/api/flights";

class FlightService {

  addFlight(flightDto, token) {
    return axios.post(`${API_URL}/add`, flightDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
  getAllFlights(token) {
    return axios.get(`${API_URL}/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }


  getFlightsByOwner(ownerId, token) {
    return axios.get(`${API_URL}/getByOwner/${ownerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteFlight(flightId, token) {
    return axios.delete(`${API_URL}/deleteById/${flightId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateFlight(flightId, flight, token) {
    return axios.put(`${API_URL}/updateById/${flightId}`, flight, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  searchByRoute(origin, destination) {
    return axios.get(`${API_URL}/searchByRoute/${origin}/${destination}`);
  }

  
  searchByRouteAndDate(origin, destination, departureDate, token) {
    return axios.get(
      `${API_URL}/searchByRouteAndDate/${origin}/${destination}/${departureDate}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }


  getFlightById(flightId, token) {
    return axios.get(`${API_URL}/getById/${flightId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new FlightService();
