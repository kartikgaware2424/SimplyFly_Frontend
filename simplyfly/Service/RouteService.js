import axios from "axios";

const API_URL = "http://localhost:8080/api/routes";

class RouteService {
 
  addRoute(route, token) {
    return axios.post(`${API_URL}/add`, route, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  
  getAllRoutes(token) {
    return axios.get(`${API_URL}/getAllRoutes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  
  getRouteById(id, token) {
    return axios.get(`${API_URL}/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  deleteRouteById(id, token) {
    return axios.delete(`${API_URL}/deleteById/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  
  updateRouteById(id, updatedRoute, token) {
    return axios.put(`${API_URL}/updateById/${id}`, updatedRoute, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}

export default new RouteService();
