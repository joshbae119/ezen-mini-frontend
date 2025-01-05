import QuestionItem from './QuestionItem';

export default function QuestionList({ questions, onQuestionClick }) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return <div className='text-center text-gray-500'>게시글이 없습니다.</div>;
  }

  return (
    <div className='w-full max-w-4xl space-y-4'>
      <div className='font-bold text-lg bg-gray-100 p-2 rounded'>
        <div className='flex justify-between'>
          <span>번호</span>
          <span>제목</span>
          <span>작성일</span>
        </div>
      </div>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onClick={() => onQuestionClick(question.id)}
        />
      ))}
    </div>
  );
}
