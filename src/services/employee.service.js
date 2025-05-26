import axiosInstance from "../axios/axiosInstance.js.jsx";
import { createAsyncThunk } from "@reduxjs/toolkit.js.jsx";
import toast from "react-hot-toast";
import useGetToken from "../hooks.js.jsx";
import axios from "axios";

// Fetch all employees
export const getAllEmployees = createAsyncThunk(
  "employee/getAllEmployees",
  async ({ currentPage, filters }, { rejectWithValue }) => {
    const { department, role, status, name } = filters;

    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        name: name || "",
        department: department || "",
        role: role || "",
        status: status || "",
      }).toString();

      const { data } = await axiosInstance.get(`/employees?${queryParams}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Fetch a single employee by ID
export const getEmployeeById = createAsyncThunk(
  "employee/getEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/employees/${id}`);
      return data.employee;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Create a new employee
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      console.log(employee);
      const { data } = await axiosInstance.post("/employees", employee);
      toast.success(data.message);
      return data.employee;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Create a new employee
export const bulkUploadEmployees = createAsyncThunk(
  "employee/bulkUploadEmployees",
  async (employeesRecords, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/employees/bulk",
        employeesRecords
      );
      toast.success(data.message);
      return data.employees;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Update an existing employee
export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async ({ id, employee }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/employees/${id}`, employee);
      toast.success(data.message);
      return data.employee;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/employees/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Update Profile
export const updateProfile = async (setProfileLoading, formData) => {
  try {
    const token = useGetToken();
    setProfileLoading(true);

    const { data } = await axios.patch(
      `${import.meta.env.VITE_URL}/employees/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success(data.message);
    return data.updatedProfilePicture;
  } catch (error) {
    toast.error(error.response?.data.message || error.message);
  } finally {
    setProfileLoading(false);
  }
};
