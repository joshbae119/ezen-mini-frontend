'use client';

import { useLoggerContext } from '@/context/LoggerContext';

export default function Home() {
  const { addLog } = useLoggerContext();

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='mb-2'>안녕하세요</h1>
      <h2>EZEN A팀 미니 프로젝트에 오신 걸 환영합니다.</h2>
      <button
        onClick={() => addLog('버튼이 클릭되었습니다!')}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        게시판 이동
      </button>
    </div>
  );
}
