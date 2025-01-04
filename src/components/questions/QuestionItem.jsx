export default function QuestionItem({ question, onClick }) {
  return (
    <div
      className='p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer'
      onClick={onClick}
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
  );
}
