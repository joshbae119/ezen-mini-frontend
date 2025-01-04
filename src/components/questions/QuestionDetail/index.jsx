import { formatDate } from '@/utils/dateFormat';

export default function QuestionDetail({ question }) {
  return (
    <div className='w-full max-w-3xl mt-16'>
      <h1 className='text-3xl font-bold mb-4'>{question.subject}</h1>
      <p className='text-gray-600 mb-4'>{question.content}</p>
      <div className='text-sm text-gray-500'>
        작성일: {formatDate(question.createDate)}
      </div>
    </div>
  );
}
