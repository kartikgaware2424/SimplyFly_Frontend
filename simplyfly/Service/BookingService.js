import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

class BookingService {
  
  getAllBookings(token) {
    return axios.get(`${API_URL}/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

   getBookingById(bookingId, token) {
    return axios.get(`${API_URL}/getById/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
  getBookingsByFlight(flightId, token) {
    return axios.get(`${API_URL}/getByFlight/${flightId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addBooking(bookingDto, token) {
    return axios.post(`${API_URL}/add`, bookingDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
  updateBooking(id, booking, token) {
    return axios.put(`${API_URL}/update/${id}`, booking, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

   cancelBooking(bookingId, token) {
    return axios.delete(`${API_URL}/cancel/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

   getBookingsByUser(userId, token) {
    return axios.get(`${API_URL}/getByUser/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
}

export default new BookingService();
