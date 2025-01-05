import { formatDate } from '@/utils/dateFormat';

export default function QuestionDetail({ question }) {
  return (
    <div className='w-full max-w-3xl mt-16'>
      <h1 className='text-3xl font-bold mb-4'>{question.subject}</h1>
      <p className='text-gray-600 mb-4'>{question.content}</p>
      <div className='text-sm text-gray-500 mb-8'>
        작성일: {formatDate(question.createDate)}
      </div>

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
