import { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types/question';
import { questionsApi } from '@/services/api/questions';

interface UseQuestionDetailReturn {
  question: Question | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useQuestionDetail(
  id: string | number
): UseQuestionDetailReturn {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = useCallback(async () => {
    try {
      setLoading(true);
      const response = await questionsApi.getById(Number(id));
      if (response.success) {
        setQuestion(response.data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return {
    question,
    loading,
    error,
    refetch: fetchQuestion,
  };
}
