
import axios from "axios";


const BASE_URL = "http://localhost:8080"; 


const api = axios.create({
  baseURL: BASE_URL
});


export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};


export const postRequest = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};


export const putRequest = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
};

export const deleteRequest = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};
