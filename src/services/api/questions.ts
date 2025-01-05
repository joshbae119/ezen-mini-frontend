import axios from 'axios';
import { Question, ApiResponse, PaginatedResponse } from '@/types/question';

const api = axios.create({
  baseURL: '/api/v1',
});

export const questionsApi = {
  async getAll(
    page: number,
    size: number
  ): Promise<ApiResponse<PaginatedResponse<Question>>> {
    const response = await api.get('/questions', {
      params: { page, size },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<Question>> {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  },

  async create(data: Partial<Question>): Promise<ApiResponse<Question>> {
    const response = await api.post('/questions', data);
    return response.data;
  },

  async update(
    id: number,
    data: Partial<Question>
  ): Promise<ApiResponse<Question>> {
    const response = await api.put(`/questions/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<ApiResponse<void>> {
    const response = await api.delete(`/questions/${id}`);
    return response.data;
  },
};
