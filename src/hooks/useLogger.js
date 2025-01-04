'use client';
import { useState, useEffect, useRef } from 'react';

export function useLogger() {
  const [logs, setLogs] = useState([]);
  const [healthStatus, setHealthStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const initialCheckDone = useRef(false);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, message, type }]);
  };

  const checkServerStatus = async () => {
    if (isChecking) return;
    setIsChecking(true);

    try {
      const response = await fetch('http://3.37.2.236:8080/api/v1/health', {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류 (HTTP ${response.status})`);
      }

      const data = await response.json();
      setHealthStatus(data);

      const dbStatus = data.details?.databaseStatus?.status || 'UNKNOWN';
      const statusMessage = `서버: ${data.status} | DB: ${dbStatus}`;

      let statusType;
      if (data.status === 'UP' && dbStatus === 'UP') {
        statusType = 'success';
      } else if (data.status !== 'UP') {
        statusType = 'error';
      } else {
        statusType = 'warning';
      }

      addLog(statusMessage, statusType);
    } catch (err) {
      let errorMessage = '서버 연결 실패';

      if (err.name === 'TimeoutError') {
        errorMessage = '서버 응답 시간 초과';
      } else if (err.name === 'AbortError') {
        errorMessage = '요청이 중단됨';
      } else if (err instanceof TypeError) {
        errorMessage = '네트워크 오류';
      }

      addLog(`${errorMessage}: ${err.message}`, 'error');
      console.error('Health check error:', err);

      setTimeout(() => {
        if (!isChecking) {
          checkServerStatus();
        }
      }, 10000);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (!initialCheckDone.current) {
      initialCheckDone.current = true;
      checkServerStatus();
    }

    const interval = setInterval(checkServerStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { logs, addLog, healthStatus };
}
