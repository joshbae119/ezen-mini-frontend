interface QuestionFormData {
  subject: string;
  content: string;
}

interface QuestionFormProps {
  onSubmit: (data: QuestionFormData) => void;
  onCancel: () => void;
}

export default function QuestionForm({
  onSubmit,
  onCancel,
}: QuestionFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      subject: formData.get('subject') as string,
      content: formData.get('content') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-4xl space-y-4'>
      <div>
        <input
          type='text'
          name='subject'
          placeholder='제목을 입력하세요'
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <textarea
          name='content'
          placeholder='내용을 입력하세요'
          required
          className='w-full p-2 border rounded h-32'
        />
      </div>
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
          등록
        </button>
      </div>
    </form>
  );
}
