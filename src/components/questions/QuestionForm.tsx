interface QuestionFormData {
  subject: string;
  content: string;
}

interface QuestionFormProps {
  onSubmit: (data: QuestionFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function QuestionForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: QuestionFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit({
      subject: formData.get('subject') as string,
      content: formData.get('content') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='subject'
          className='block text-sm font-medium text-gray-700'
        >
          제목
        </label>
        <input
          type='text'
          name='subject'
          id='subject'
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label
          htmlFor='content'
          className='block text-sm font-medium text-gray-700'
        >
          내용
        </label>
        <textarea
          name='content'
          id='content'
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32'
          disabled={isSubmitting}
        />
      </div>
      <div className='flex justify-end gap-2'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 border rounded hover:bg-gray-100'
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300'
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '등록'}
        </button>
      </div>
    </form>
  );
}
