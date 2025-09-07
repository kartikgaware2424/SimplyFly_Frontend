import axios from "axios";

const API_URL = "http://localhost:8080/api";

class SeatService {
 
  getSeatByNumber(seatNumber, token) {
    return axios.get(`${API_URL}/seats/getBySeatNumber/${seatNumber}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }


  getSeatsByFlight(flightId, token) {
    return axios.get(`${API_URL}/seats/getByFlight/${flightId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addSeat(seatDto, token) {
    return axios.post(`${API_URL}/seats/add`, seatDto, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

export default new SeatService();
