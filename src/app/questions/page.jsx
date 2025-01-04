'use client';

import { useRouter } from 'next/navigation';
import { useQuestions } from '@/hooks/useQuestions';

export default function QuestionsPage() {
  const router = useRouter();
  const { questions, loading, error } = useQuestions();

  const handleHomeClick = () => {
    router.push('/');
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

  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      <button
        onClick={handleHomeClick}
        className='absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors'
      >
        HOME
      </button>
      <h1 className='text-3xl font-bold mb-8'>질문게시판</h1>

      <div className='w-full max-w-3xl space-y-4'>
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.id}
              className='p-4 border rounded-lg hover:shadow-md transition-shadow'
            >
              <h2 className='text-xl font-semibold'>{question.subject}</h2>
              <p className='text-gray-600 mt-2'>{question.content}</p>
              <div className='text-sm text-gray-500 mt-2'>
                작성일: {new Date(question.createDate).toLocaleString()}
              </div>
              <div className='text-sm text-gray-500'>
                답변 수: {question.answers?.length || 0}
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
