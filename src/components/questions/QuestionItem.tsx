import { Question } from '@/types/question';
import { formatDate } from '@/utils/dateFormat';

interface QuestionItemProps {
  question: Question;
  onClick: () => void;
}

export default function QuestionItem({ question, onClick }: QuestionItemProps) {
  return (
    <div
      className='group flex items-center justify-between p-6 rounded-xl 
                 bg-white hover:bg-gradient-to-r from-purple-50 to-blue-50 
                 shadow-sm hover:shadow-md transition-all duration-300 
                 border border-gray-100 cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center flex-1 min-w-0 mr-4'>
        <span className='text-md text-purple-500 font-medium mr-4'>
          {question.id}
        </span>
        <h2
          className='text-md font-medium text-gray-700 group-hover:text-purple-600 
                      truncate transition-colors duration-300'
        >
          {question.subject}
        </h2>
      </div>
      <div className='flex items-center gap-6 whitespace-nowrap'>
        <div className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
          답변 {question.answers?.length || 0}
        </div>
        <div className='text-sm text-gray-500'>
          {formatDate(question.createDate)}
        </div>
      </div>
    </div>
  );
}
