import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/api';

const api = axios.create({
  baseURL: '/api/v1',
});

export const questionsApi = {
  getAll: async () => {
    const { data } = await api.get(API_ENDPOINTS.QUESTIONS);
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(API_ENDPOINTS.QUESTION_DETAIL(id));
    return data;
  },
};
