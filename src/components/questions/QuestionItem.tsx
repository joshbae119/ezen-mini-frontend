import { Question } from '@/types/question';
import { formatDate } from '@/utils/dateFormat';

interface QuestionItemProps {
  question: Question;
  onClick: () => void;
}

export default function QuestionItem({ question, onClick }: QuestionItemProps) {
  return (
    <div
      className='group flex items-center justify-between p-4 rounded-xl 
                 bg-white hover:bg-gray-50
                 shadow-sm hover:shadow-md transition-all duration-300 
                 border border-gray-100 cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center flex-1 min-w-0 mr-4'>
        <span className='text-base text-gray-400 font-medium mr-4'>
          {question.id}
        </span>
        <h2
          className='text-base font-medium text-gray-700 group-hover:text-black 
                      truncate transition-colors duration-300'
        >
          {question.subject}
          {question.answers && question.answers.length > 0 && (
            <span className='ml-2 text-red-500'>
              ({question.answers.length})
            </span>
          )}
        </h2>
      </div>
      <div className='text-sm text-gray-400'>
        {formatDate(question.createDate)}
      </div>
    </div>
  );
}
