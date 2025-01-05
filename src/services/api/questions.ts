import axios from 'axios';
import { Question, ApiResponse, PaginatedResponse } from '@/types/question';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const questionsApi = {
  async getAll(
    page: number,
    size: number
  ): Promise<ApiResponse<PaginatedResponse<Question>>> {
    const response = await axios.get(`${API_URL}/api/questions`, {
      params: { page, size },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<Question>> {
    const response = await axios.get(`${API_URL}/api/questions/${id}`);
    return response.data;
  },

  async create(data: Partial<Question>): Promise<ApiResponse<Question>> {
    const response = await axios.post(`${API_URL}/api/questions`, data);
    return response.data;
  },

  async update(
    id: number,
    data: Partial<Question>
  ): Promise<ApiResponse<Question>> {
    const response = await axios.put(`${API_URL}/api/questions/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<ApiResponse<void>> {
    const response = await axios.delete(`${API_URL}/api/questions/${id}`);
    return response.data;
  },
};
