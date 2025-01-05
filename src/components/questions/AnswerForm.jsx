export default function AnswerForm({ questionId, onSubmit, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      content: formData.get('content'),
      questionId: questionId,
    });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-4 mt-4'>
      <div>
        <textarea
          name='content'
          placeholder='답변을 입력하세요'
          required
          className='w-full p-2 border rounded h-32'
        />
      </div>
      <div className='flex justify-end gap-2'>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          답변등록
        </button>
      </div>
    </form>
  );
}
