'use client';

import { useLogger } from '@/hooks/useLogger';
import { useLoggerContext } from '@/context/LoggerContext';
import { useRouter } from 'next/navigation';

export default function QuestionsPage() {
  const { addLog } = useLoggerContext();
  const router = useRouter();
  useLogger('QuestionsPage');

  const handleHomeClick = () => {
    addLog('홈 페이지로 이동합니다.', 'info', 'Navigation');
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <button
        onClick={handleHomeClick}
        className='absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
      >
        HOME
      </button>
      <h1 className='text-3xl font-bold mb-4'>A팀 게시판</h1>
    </div>
  );
}
