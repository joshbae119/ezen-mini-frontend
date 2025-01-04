'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function QuestionDetail() {
  const router = useRouter();
  const params = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestionDetail() {
      try {
        const response = await fetch(`/api/v1/questions/${params.id}`);
        if (!response.ok) throw new Error('서버 응답 오류');

        const data = await response.json();
        if (data.success) {
          setQuestion(data.data);
        } else {
          throw new Error('데이터 로드 실패');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchQuestionDetail();
    }
  }, [params.id]);

  const handleBackClick = () => {
    router.push('/questions');
  };

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        로딩 중...
      </div>
    );
  if (error)
    return (
      <div className='flex justify-center items-center min-h-screen text-red-500'>
        에러: {error}
      </div>
    );
  if (!question)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        질문을 찾을 수 없습니다.
      </div>
    );

  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      <button
        onClick={handleBackClick}
        className='absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors'
      >
        뒤로가기
      </button>

      <div className='w-full max-w-3xl mt-16'>
        <h1 className='text-3xl font-bold mb-4'>{question.subject}</h1>
        <p className='text-gray-600 mb-4'>{question.content}</p>
        <div className='text-sm text-gray-500'>
          작성일: {new Date(question.createDate).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
