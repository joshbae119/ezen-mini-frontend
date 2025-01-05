import { useState, useEffect, useCallback } from 'react';
import { Question, PaginatedResponse } from '@/types/question';
import { questionsApi } from '@/services/api/questions';

interface UseQuestionsReturn {
  questions: Question[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  refetch: (goToLast?: boolean) => Promise<void>;
}

export function useQuestions(initialPage = 1): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const fetchQuestions = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await questionsApi.getAll(page - 1, pageSize);
      if (response.success && response.data) {
        const paginatedData = response.data as PaginatedResponse<Question>;
        setQuestions(paginatedData.content);
        setTotalPages(paginatedData.totalPages);
        setCurrentPage(page);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(
    async (goToLast = false) => {
      if (goToLast) {
        const response = await questionsApi.getAll(0, pageSize);
        if (response.success && response.data) {
          const lastPage = response.data.totalPages;
          await fetchQuestions(lastPage);
        }
      } else {
        await fetchQuestions(currentPage);
      }
    },
    [currentPage, fetchQuestions]
  );

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage, fetchQuestions]);

  return {
    questions,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage: fetchQuestions,
    refetch,
  };
}
