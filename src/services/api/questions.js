import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

export const questionsApi = {
  getAll: async () => {
    const { data } = await api.get('/questions');
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/questions/${id}`);
    return data;
  },
};
