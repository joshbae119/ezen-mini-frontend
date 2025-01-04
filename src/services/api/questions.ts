import axios from 'axios';
import { Question, QuestionDetail } from '@/types/question';

const api = axios.create({
  baseURL: '/api/v1',
});

export const questionsApi = {
  getAll: async () => {
    const { data } = await api.get<Question[]>('/questions');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<QuestionDetail>(`/questions/${id}`);
    return data;
  },
};
