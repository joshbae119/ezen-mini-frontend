import { useState } from 'react';
import { formatDate } from '@/utils/dateFormat';
import { answersApi } from '@/services/api/answers';
import AnswerForm from '../AnswerForm';

export default function QuestionDetail({ question, onAnswerAdded }) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const handleAnswerSubmit = async (answerData) => {
    try {
      await answersApi.create(answerData);
      setShowAnswerForm(false);
      if (onAnswerAdded) {
        await onAnswerAdded();
      }
    } catch (error) {
      console.error('답변 등록 실패:', error);
    }
  };

  return (
    <div className='w-full max-w-3xl mt-16'>
      <h1 className='text-3xl font-bold mb-4'>{question.subject}</h1>
      <p className='text-gray-600 mb-4'>{question.content}</p>
      <div className='text-sm text-gray-500 mb-8'>
        작성일: {formatDate(question.createDate)}
      </div>

      <button
        onClick={() => setShowAnswerForm(!showAnswerForm)}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        답변작성
      </button>

      {showAnswerForm && (
        <AnswerForm
          questionId={question.id}
          onSubmit={handleAnswerSubmit}
          onCancel={() => setShowAnswerForm(false)}
        />
      )}

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>답변 목록</h2>
        {question.answers && question.answers.length > 0 ? (
          <div className='space-y-4'>
            {question.answers.map((answer, index) => (
              <div key={index} className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700 mb-2'>{answer.content}</p>
                <div className='text-sm text-gray-500'>
                  작성일: {formatDate(answer.createDate)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>아직 답변이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
