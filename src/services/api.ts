
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Student Registration
export const registerUser = async (
  full_name: string,
  email: string,
  password: string,
  student_id: string,
  department: string
) => {
  const response = await API.post("/auth/register", {
    full_name,
    email,
    password,
    student_id,
    department,
  });

  return response.data;
};

// Student Login
export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export default API;

