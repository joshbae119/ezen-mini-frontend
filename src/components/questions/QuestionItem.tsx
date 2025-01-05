import { Question } from '@/types/question';
import { formatDate } from '@/utils/dateFormat';

interface QuestionItemProps {
  question: Question;
  onClick: () => void;
}

export default function QuestionItem({ question, onClick }: QuestionItemProps) {
  return (
    <div
      className='flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center flex-1 min-w-0 mr-4'>
        <span className='text-md text-gray-500 mr-2'>{question.id}</span>
        <h2 className='text-md font-semibold truncate'>{question.subject}</h2>
      </div>
      <div className='flex items-center gap-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          답변 수: {question.answers?.length || 0}
        </div>
        <div className='text-sm text-gray-500'>
          작성일: {formatDate(question.createDate)}
        </div>
      </div>
    </div>
  );
}
