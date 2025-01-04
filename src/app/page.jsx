'use client';

import { useLoggerContext } from '@/context/LoggerContext';
import { useLogger } from '@/hooks/useLogger';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { addLog } = useLoggerContext();
  const router = useRouter();
  useLogger('HomePage');

  const handleClick = () => {
    addLog('게시판 페이지로 이동합니다.', 'info', 'Navigation');
    router.push('/questions');
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='mb-2'>안녕하세요</h1>
      <h2>EZEN A팀 미니 프로젝트에 오신 걸 환영합니다.</h2>
      <button
        onClick={handleClick}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
      >
        게시판 이동
      </button>
    </div>
  );
}
