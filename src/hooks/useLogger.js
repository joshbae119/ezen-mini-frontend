'use client';
import { useState, useEffect } from 'react';

export function useLogger() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, message }]);
  };

  // 서버 상태 체크 함수
  const checkServerStatus = async () => {
    addLog('페이지 로드됨');
    addLog('Next.js 서버 연결 확인');

    try {
      await fetch('http://3.37.2.236:8080/health');
      addLog('백엔드 서버 연결 성공');
    } catch (err) {
      addLog('백엔드 서버 연결 실패');
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  return { logs, addLog };
}
