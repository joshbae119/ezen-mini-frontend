'use client';
import { useState, useEffect } from 'react';
import { useLoggerContext } from '@/context/LoggerContext';

export function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addLog } = useLoggerContext();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        addLog('게시글 목록을 불러오는 중...', 'info', 'QuestionsFetch');
        const response = await fetch('http://3.37.2.236:8080/api/v1/questions');

        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }

        const responseData = await response.json();
        addLog(
          `API 응답 데이터 구조: ${JSON.stringify(responseData)}`,
          'info',
          'QuestionsFetch'
        );

        if (responseData.success && responseData.data?.content) {
          setQuestions(responseData.data.content);
          addLog(
            `게시글 ${responseData.data.content.length}개 로드 완료`,
            'success',
            'QuestionsFetch'
          );
        } else {
          throw new Error('잘못된 데이터 구조');
        }
      } catch (err) {
        setError(err.message);
        addLog(
          `게시글 목록 로드 실패: ${err.message}`,
          'error',
          'QuestionsFetch'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [addLog]);

  return { questions, loading, error };
}
