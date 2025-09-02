import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

class SimplyFlyService {
 
  searchFlights(from, to, date) {
    return axios.get(`${BASE_URL}/flights/search?from=${from}&to=${to}&date=${date}`);
  }

  getFlightById(flightId) {
    return axios.get(`${BASE_URL}/flights/${flightId}`);
  }

  addFlight(flight) {
    return axios.post(`${BASE_URL}/owner/flights/add`, flight);
  }

  updateFlight(flightId, flight) {
    return axios.put(`${BASE_URL}/owner/flights/update/${flightId}`, flight);
  }

  deleteFlight(flightId) {
    return axios.delete(`${BASE_URL}/owner/flights/delete/${flightId}`);
  }

  
  getSeatsByFlight(flightId) {
    return axios.get(`${BASE_URL}/flights/${flightId}/seats`);
  }

  bookSeats(bookingData) {
    return axios.post(`${BASE_URL}/bookings`, bookingData);
  }

  
  makePayment(paymentData) {
    return axios.post(`${BASE_URL}/payments`, paymentData);
  }

  getPassengerBookings(passengerId) {
    return axios.get(`${BASE_URL}/passengers/${passengerId}/bookings`);
  }

  getBookingById(bookingId) {
    return axios.get(`${BASE_URL}/bookings/${bookingId}`);
  }

  getUserById(userId) {
    return axios.get(`${BASE_URL}/users/${userId}`);
  }

  getAllUsers() {
    return axios.get(`${BASE_URL}/users`);
  }
}

export default new SimplyFlyService();
