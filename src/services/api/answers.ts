import axios from 'axios';
import { Answer, ApiResponse } from '@/types/question';

const api = axios.create({
  baseURL: '/api/v1',
});

export const answersApi = {
  async create(data: {
    content: string;
    questionId: number;
  }): Promise<ApiResponse<Answer>> {
    const response = await api.post('/answers', data);
    return response.data;
  },
};
