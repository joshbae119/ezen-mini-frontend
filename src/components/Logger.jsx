'use client';

import { useLoggerContext } from '@/context/LoggerContext';
import { useEffect, useRef } from 'react';

export function Logger() {
  const { logs } = useLoggerContext();
  const logContainerRef = useRef(null);

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
      default:
        return 'text-blue-400';
    }
  };

  // 새로운 로그가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className='fixed right-0 top-0 w-1/2 h-screen bg-gray-900 text-green-400 p-4 opacity-80 border-l border-gray-700'>
      <h3 className='text-white mb-2'>실시간 로그</h3>
      <div
        ref={logContainerRef}
        className='space-y-2 text-sm font-mono h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'
      >
        {logs &&
          logs.map((log, index) => (
            <div key={index} className='border-b border-gray-700 pb-1'>
              <span className='text-gray-400'>[{log.timestamp}]</span>
              <span className={`ml-2 ${getTypeColor(log.type)}`}>
                {log.message}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
