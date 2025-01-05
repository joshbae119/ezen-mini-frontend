import { motion } from 'framer-motion';

interface QuestionFormData {
  subject: string;
  content: string;
}

interface QuestionFormProps {
  onSubmit: (data: Partial<Question>) => Promise<void>;
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
    <motion.form
      onSubmit={handleSubmit}
      className='space-y-6 bg-white rounded-xl shadow-md p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label
          htmlFor='subject'
          className='block text-base font-medium text-gray-700 mb-2'
        >
          제목
        </label>
        <input
          type='text'
          name='subject'
          id='subject'
          required
          className='w-full p-3 border border-gray-200 rounded-lg 
                     focus:ring-2 focus:ring-gray-500 focus:border-transparent 
                     transition-all duration-300 text-base'
          disabled={isSubmitting}
          placeholder='제목을 입력하세요'
        />
      </div>
      <div>
        <label
          htmlFor='content'
          className='block text-base font-medium text-gray-700 mb-2'
        >
          내용
        </label>
        <textarea
          name='content'
          id='content'
          required
          className='w-full p-4 border border-gray-200 rounded-lg 
                     focus:ring-2 focus:ring-gray-500 focus:border-transparent 
                     transition-all duration-300 min-h-[200px] text-base'
          disabled={isSubmitting}
          placeholder='내용을 입력하세요'
        />
      </div>
      <div className='flex justify-end gap-3 pt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-6 py-2 bg-gray-200 text-gray-700 rounded-xl 
                     hover:bg-gray-300 transition-all duration-300 
                     text-sm font-medium'
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type='submit'
          className='px-6 py-2 bg-gray-500 text-white rounded-xl 
                     hover:bg-red-800 transform hover:scale-105 
                     transition-all duration-300 shadow-md 
                     hover:shadow-lg text-sm font-medium'
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '등록'}
        </button>
      </div>
    </motion.form>
  );
}
