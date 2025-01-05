import { useState } from 'react';
import { Question, Answer } from '@/types/question';
import { answersApi } from '@/services/api/answers';
import { formatDate } from '@/utils/dateFormat';
import AnswerForm from '@/components/questions/AnswerForm';
import { motion } from 'framer-motion';

interface QuestionDetailProps {
  question: Question;
  onAnswerAdded?: () => Promise<void>;
}

export default function QuestionDetail({
  question,
  onAnswerAdded,
}: QuestionDetailProps) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const handleAnswerSubmit = async (answerData: {
    content: string;
    questionId: number;
  }) => {
    try {
      await answersApi.create({
        content: answerData.content,
        questionId: question.id,
      });
      setShowAnswerForm(false);
      if (onAnswerAdded) {
        await onAnswerAdded();
      }
    } catch (error) {
      console.error('답변 등록 실패:', error);
    }
  };

  return (
    <div className='w-full max-w-3xl mt-8'>
      <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          {question.subject}
        </h1>
        <p className='text-gray-600 mb-4 text-base leading-relaxed'>
          {question.content}
        </p>
        <div className='text-sm text-gray-400'>
          작성일: {formatDate(question.createDate)}
        </div>
      </div>

      <div className='mb-8'>
        <button
          onClick={() => setShowAnswerForm(!showAnswerForm)}
          className='px-6 py-3 bg-gray-500 text-white rounded-xl 
                     hover:bg-red-800 transform hover:scale-105 
                     transition-all duration-300 shadow-lg 
                     hover:shadow-xl font-medium text-sm'
        >
          답변작성
        </button>
      </div>

      {showAnswerForm && (
        <div className='mb-8'>
          <AnswerForm
            questionId={question.id}
            onSubmit={handleAnswerSubmit}
            onCancel={() => setShowAnswerForm(false)}
          />
        </div>
      )}

      <div className='bg-gray-500 text-white p-4 rounded-xl shadow-lg mb-4'>
        <h2 className='text-lg font-medium'>
          답변 목록
          <span className='ml-2 text-gray-200'>
            ({question.answers?.length || 0})
          </span>
        </h2>
      </div>

      {question.answers && question.answers.length > 0 ? (
        <div className='space-y-4'>
          {question.answers.map((answer) => (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300'
            >
              <p className='text-gray-700 mb-3 text-base'>{answer.content}</p>
              <div className='text-sm text-gray-400'>
                작성일: {formatDate(answer.createDate)}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500 text-center py-8'>아직 답변이 없습니다.</p>
      )}
    </div>
  );
}
