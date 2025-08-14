import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getAllUsers = (token) =>
  axios.get(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const register = (userPayload ,token) =>
  axios.post(`${BASE_URL}/register`,  userPayload, {
    headers: { Authorization: `Bearer ${token}` }
  })

  export const update = (userPayload ,token) =>
  axios.put(`${BASE_URL}/users/update`,  userPayload, {
    headers: { Authorization: `Bearer ${token}` }
  })


export const deleteUser = (id, token) =>
  axios.delete(`${BASE_URL}/users/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
