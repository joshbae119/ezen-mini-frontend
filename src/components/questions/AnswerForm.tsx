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
    <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-md p-6'>
      <textarea
        name='content'
        placeholder='답변을 입력하세요'
        required
        className='w-full p-4 border border-gray-200 rounded-lg focus:ring-2 
                   focus:ring-gray-500 focus:border-transparent transition-all 
                   duration-300 min-h-[120px] text-base'
      />
      <div className='flex justify-end gap-3 mt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg 
                     hover:bg-gray-300 transition-all duration-300 text-sm font-medium'
        >
          취소
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-gray-500 text-white rounded-lg 
                     hover:bg-red-800 transition-all duration-300 text-sm font-medium'
        >
          답변등록
        </button>
      </div>
    </form>
  );
}
