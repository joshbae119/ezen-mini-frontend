'use client';

import { Logger } from './Logger';
import { LoggerProvider } from '@/context/LoggerContext';

export default function ClientLayout({ children }) {
  return (
    <LoggerProvider>
      <div className='flex min-h-screen'>
        <div className='w-1/2'>{children}</div>
        <Logger />
      </div>
    </LoggerProvider>
  );
}
