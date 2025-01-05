import { useState, useEffect } from 'react';
import { Question, PaginatedResponse } from '@/types/question';
import { questionsApi } from '@/services/api/questions';

interface UseQuestionsReturn {
  questions: Question[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  refetch: () => void;
}

export function useQuestions(initialPage = 1): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionsApi.getAll(currentPage, pageSize);
      if (response.success && response.data) {
        const paginatedData = response.data as PaginatedResponse<Question>;
        setQuestions(paginatedData.content);
        setTotalPages(paginatedData.totalPages);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [currentPage]);

  return {
    questions,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage: setCurrentPage,
    refetch: fetchQuestions,
  };
}
