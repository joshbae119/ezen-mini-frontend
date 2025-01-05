import axios from 'axios';
import { Answer, ApiResponse } from '@/types/question';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const answersApi = {
  async create(data: Partial<Answer>): Promise<ApiResponse<Answer>> {
    const response = await axios.post(`${API_URL}/api/answers`, data);
    return response.data;
  },

  async update(
    id: number,
    data: Partial<Answer>
  ): Promise<ApiResponse<Answer>> {
    const response = await axios.put(`${API_URL}/api/answers/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<ApiResponse<void>> {
    const response = await axios.delete(`${API_URL}/api/answers/${id}`);
    return response.data;
  },
};
