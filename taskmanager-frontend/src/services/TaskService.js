import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tasks';

const getAllTasks = () => {
  return axios.get(BASE_URL, {
    auth: {
      username: 'admin',
      password: 'admin123'
    }
  });
};

export default {
  getAllTasks
};

