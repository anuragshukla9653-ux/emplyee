import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllEmployees = async () => {
  return axios.get(`${API_URL}/employees`);
};

export const createEmployee = async (employeeData) => {
  return axios.post(`${API_URL}/employees`, employeeData);
};

export const updateEmployee = async (id, employeeData) => {
  return axios.put(`${API_URL}/employees/${id}`, employeeData);
};
