import { useState, useEffect } from 'react';
import { questionsApi } from '@/services/api/questions';

export function useQuestions(initialPage = 1) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionsApi.getAll(currentPage, pageSize);
      if (response.success && response.data) {
        setQuestions(response.data.content);
        setTotalPages(response.data.totalPages);
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

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const refetch = () => {
    fetchQuestions();
  };

  return {
    questions,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    refetch,
  };
}
