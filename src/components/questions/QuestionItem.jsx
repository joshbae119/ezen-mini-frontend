import { formatDate } from '@/utils/dateFormat';

export default function QuestionItem({ question, onClick }) {
  return (
    <div
      className='flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center flex-1 min-w-0 mr-4'>
        <span className='text-sm text-gray-500 mr-2'>{question.id}</span>
        <h2 className='text-xl font-semibold truncate'>{question.subject}</h2>
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
