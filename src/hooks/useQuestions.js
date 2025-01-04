'use client';
import { useState, useEffect } from 'react';

export function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://3.37.2.236:8080/api/v1/questions');

        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }

        const responseData = await response.json();

        if (responseData.success && responseData.data?.content) {
          setQuestions(responseData.data.content);
        } else {
          throw new Error('잘못된 데이터 구조');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return { questions, loading, error };
}
