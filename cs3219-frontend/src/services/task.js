import axios from "axios";

const API_URL = "http://localhost:4000";

export const getTaskListService = async () => {
  try {
    return await axios.get(`${API_URL}/tasks`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const getTaskService = async (id) => {
  try {
    return await axios.get(`${API_URL}/tasks/${id}`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const addTaskService = async (task) => {
  try {
    return await axios.post(`${API_URL}/tasks`, task);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const deleteTaskService = async (id) => {
  try {
    return await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const updateTaskService = async (id, task) => {
  try {
    return await axios.put(`${API_URL}/tasks/${id}`, task);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};
