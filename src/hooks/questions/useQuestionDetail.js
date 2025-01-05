import { useState, useEffect } from 'react';
import { questionsApi } from '@/services/api/questions';
import { ERROR_MESSAGES } from '@/constants/messages';

export function useQuestionDetail(id) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestionDetail = async () => {
    try {
      const response = await questionsApi.getById(id);
      if (response.success) {
        setQuestion(response.data);
      } else {
        throw new Error(ERROR_MESSAGES.DATA_LOAD_FAILED);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.DEFAULT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuestionDetail();
    }
  }, [id]);

  return { question, loading, error, refetch: fetchQuestionDetail };
}
