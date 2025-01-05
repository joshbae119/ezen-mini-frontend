interface AnswerFormProps {
  questionId: number;
  onSubmit: (data: { content: string; questionId: number }) => Promise<void>;
  onCancel: () => void;
}

export default function AnswerForm({
  questionId,
  onSubmit,
  onCancel,
}: AnswerFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit({
      content: formData.get('content') as string,
      questionId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
      <textarea
        name='content'
        placeholder='답변을 입력하세요'
        required
        className='w-full p-2 border rounded h-32'
      />
      <div className='flex justify-end gap-2'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 border rounded hover:bg-gray-100'
        >
          취소
        </button>
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
