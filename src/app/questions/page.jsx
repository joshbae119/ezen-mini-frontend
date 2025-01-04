'use client';

import { useLogger } from '@/hooks/useLogger';
import { useLoggerContext } from '@/context/LoggerContext';

export default function QuestionsPage() {
  const { addLog } = useLoggerContext();
  useLogger('QuestionsPage');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>A팀 게시판</h1>
    </div>
  );
}
