import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

class UserService {
  getUserByEmail(email, token) {
    return axios.get(`${API_URL}/getUserByEmail/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
  getAllUsers(token) {
    return axios.get(`${BASE_URL}/getAll`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

   getUsersByRole(role, token) {
    return axios.get(`${API_URL}/getUserByRole/${role}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  deleteUserById(id, token) {
    return axios.delete(`${API_URL}/deleteById/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

export default new UserService();
