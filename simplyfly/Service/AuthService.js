import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  login(credentials) {
    return axios.post(`${API_URL}/login`, credentials);
  }

  register(userDetails) {
    return axios.post(`${API_URL}/register`, userDetails);
  }
}

export default new AuthService();
