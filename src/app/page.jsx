'use client';

import { useLoggerContext } from '@/context/LoggerContext';

export default function Home() {
  const { addLog } = useLoggerContext();

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='mb-2'>Welcome to EZEN A Team!</h1>
      <h2>안녕하세요</h2>
      <button
        onClick={() => addLog('버튼이 클릭되었습니다!')}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        로그 추가하기
      </button>
    </div>
  );
}
