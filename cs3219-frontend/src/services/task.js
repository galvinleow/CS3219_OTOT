import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:4000/tasks";

// set token to the axios
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getTaskListService = async () => {
  try {
    return await axios.get(`${API_URL}/getAllTasks`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const getTaskService = async (id) => {
  try {
    return await axios.get(`${API_URL}/getSingleTask/${id}`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const addTaskService = async (task) => {
  try {
    return await axios.post(`${API_URL}/addSingleTask`, task);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const deleteTaskService = async (id) => {
  try {
    return await axios.delete(`${API_URL}/deleteSingleTask/${id}`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const updateTaskService = async (id, task) => {
  try {
    return await axios.put(`${API_URL}/updateSingleTask/${id}`, task);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};
