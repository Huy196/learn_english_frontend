import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getAllUsers = (token) =>
  axios.get(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteUser = (id, token) =>
  axios.delete(`${BASE_URL}/users/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
