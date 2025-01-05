import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/api';

const api = axios.create({
  baseURL: '/api/v1',
});

export const questionsApi = {
  getAll: async (page = 1, size = 10) => {
    const { data } = await api.get(API_ENDPOINTS.QUESTIONS, {
      params: {
        page: page - 1,
        size,
      },
    });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(API_ENDPOINTS.QUESTION_DETAIL(id));
    return data;
  },

  create: async (questionData) => {
    const { data } = await api.post(API_ENDPOINTS.QUESTIONS, questionData);
    return data;
  },
};
