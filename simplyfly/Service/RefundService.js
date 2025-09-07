import axios from "axios";

const BASE_URL = "http://localhost:8080/api/refunds";

class RefundService {
  
  getRefundsByOwner(ownerId, token) {
    return axios.get(`${BASE_URL}/getByOwner/${ownerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  approveRefund(refundId, token) {
    return axios.put(
      `${BASE_URL}/approve/${refundId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  rejectRefund(refundId, token) {
    return axios.put(
      `${BASE_URL}/reject/${refundId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}

export default new RefundService();
