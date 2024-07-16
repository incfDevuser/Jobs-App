import axios from "axios";

const API = "http://localhost:3000/jobsApp";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const registerUser = (user) =>
  axiosInstance.post(`${API}/register`, user);
export const loginUser = (user) => axiosInstance.post(`${API}/login`, user);
export const logoutUser = (user) => axiosInstance.post(`${API}/logout`);

export const getAdminUsers = async()=>{
  try {
    const response = await axiosInstance.get(`${API}/admin/users`)
    return response.data
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const myProfile = async()=>{
  try {
    const response = await axiosInstance.get(`${API}/profile`)
    return response.data
  } catch (error) {
    throw error.response?.data || error;
  }
}
