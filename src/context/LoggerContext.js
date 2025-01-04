'use client';

import { createContext, useContext } from 'react';
import { useLogger } from '../hooks/useLogger';

const LoggerContext = createContext({
  logs: [], // 기본값 설정
  addLog: () => {}, // 기본값 설정
});

export function LoggerProvider({ children }) {
  const loggerValue = useLogger(); // useLogger 훅 사용

  return (
    <LoggerContext.Provider value={loggerValue}>
      {children}
    </LoggerContext.Provider>
  );
}

export function useLoggerContext() {
  const context = useContext(LoggerContext);
  if (context === undefined) {
    throw new Error('useLoggerContext must be used within a LoggerProvider');
  }
  return context;
}
