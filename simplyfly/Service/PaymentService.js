import axios from "axios";

const API_URL = "http://localhost:8080/api";

class PaymentService {
 
  addPayment(paymentDto, token) {
    return axios.post(`${API_URL}/payments/add`, paymentDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getPaymentByBooking(bookingId, token) {
    return axios.get(`${API_URL}/payments/getByBooking/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new PaymentService();
