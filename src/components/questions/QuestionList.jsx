import QuestionItem from './QuestionItem';

export default function QuestionList({ questions, onQuestionClick }) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return <div className='text-center text-gray-500'>게시글이 없습니다.</div>;
  }

  return (
    <div className='w-full max-w-3xl space-y-4'>
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
