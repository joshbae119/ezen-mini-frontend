import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

export const answersApi = {
  create: async (answerData) => {
    const { data } = await api.post('/answers', answerData);
    return data;
  },
};
