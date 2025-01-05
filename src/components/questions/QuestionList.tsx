import { Question } from '@/types/question';
import QuestionItem from './QuestionItem';
import { motion } from 'framer-motion';

interface QuestionListProps {
  questions: Question[];
  onQuestionClick: (id: number) => void;
}

export default function QuestionList({
  questions,
  onQuestionClick,
}: QuestionListProps) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return <div className='text-center text-gray-500'>게시글이 없습니다.</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className='w-full max-w-4xl space-y-4'
      variants={container}
      initial='hidden'
      animate='show'
    >
      <div className='font-medium text-lg bg-gray-600 text-white p-4 rounded-xl shadow-lg'>
        <div className='grid grid-cols-12 gap-4'>
          <span className='col-span-1 text-gray-100'>번호</span>
          <span className='col-span-8 text-left text-gray-100'>제목</span>
          <span className='col-span-3 text-right text-gray-100'>작성일</span>
        </div>
      </div>
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <QuestionItem
            question={question}
            onClick={() => onQuestionClick(question.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
