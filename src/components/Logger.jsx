'use client';

import { useLoggerContext } from '../context/LoggerContext';

export function Logger() {
  const { logs } = useLoggerContext();

  return (
    <div className='fixed right-0 top-0 w-1/2 h-screen bg-gray-900 text-green-400 p-4 overflow-y-auto opacity-80 border-l border-gray-700'>
      <h3 className='text-white mb-2'>실시간 로그</h3>
      <div className='space-y-2 text-sm font-mono'>
        {logs &&
          logs.map((log, index) => (
            <div key={index} className='border-b border-gray-700 pb-1'>
              <span className='text-yellow-400'>[{log.timestamp}]</span>
              <span className='ml-2'>{log.message}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
