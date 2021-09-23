import axios from "axios";

const API_URL = "http://localhost:4000";

export const getTaskListService = async () => {
  try {
    return await axios.get(`${API_URL}/task/getList`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};
