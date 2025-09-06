import axios from "axios";

const BASE_URL = "http://localhost:8080/api/refunds";

class RefundService {
  // ✅ Get refunds by ownerId
  getRefundsByOwner(ownerId, token) {
    return axios.get(`${BASE_URL}/getByOwner/${ownerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // ✅ Approve refund
  approveRefund(refundId, token) {
    return axios.put(
      `${BASE_URL}/approve/${refundId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // ✅ Reject refund
  rejectRefund(refundId, token) {
    return axios.put(
      `${BASE_URL}/reject/${refundId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}

export default new RefundService();
