import { useState, useEffect } from 'react';
import { questionsApi } from '@/services/api/questions';

export function useQuestionDetail(id) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestionDetail() {
      try {
        const response = await questionsApi.getById(id);
        if (response.success) {
          setQuestion(response.data);
        } else {
          throw new Error('데이터 로드 실패');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchQuestionDetail();
    }
  }, [id]);

  return { question, loading, error };
}
