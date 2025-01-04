'use client';
import { useState, useEffect, useRef } from 'react';

export function useLogger() {
  const [logs, setLogs] = useState([]);
  const [healthStatus, setHealthStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const initialCheckDone = useRef(false);
  const browserInfoLogged = useRef(false);
  const startTime = useRef(null);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, message, type }]);
  };

  // 브라우저 성능 정보 로깅
  const logPerformance = () => {
    if (window.performance && !browserInfoLogged.current) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
      const connectionTime = perfData.connectEnd - perfData.connectStart;

      addLog(`페이지 로드 시간: ${pageLoadTime}ms`, 'info');
      addLog(`DNS 조회 시간: ${dnsTime}ms`, 'info');
      addLog(`서버 연결 시간: ${connectionTime}ms`, 'info');
    }
  };

  // 네트워크 상태 로깅
  const logNetworkStatus = () => {
    if (navigator.onLine) {
      addLog('네트워크 연결됨', 'success');
      addLog(
        `네트워크 유형: ${navigator.connection?.effectiveType || '알 수 없음'}`,
        'info'
      );
    } else {
      addLog('네트워크 연결 끊김', 'error');
    }
  };

  // 브라우저 정보 로깅
  const logBrowserInfo = () => {
    if (!browserInfoLogged.current) {
      browserInfoLogged.current = true;
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      addLog(`브라우저 정보: ${userAgent}`, 'info');
      addLog(`플랫폼: ${platform}`, 'info');
    }
  };

  const checkServerStatus = async () => {
    if (isChecking) return;
    setIsChecking(true);
    startTime.current = performance.now();

    try {
      addLog('서버 상태 확인 요청 시작', 'info');

      const response = await fetch('http://3.37.2.236:8080/api/v1/health', {
        signal: AbortSignal.timeout(5000),
      });

      const endTime = performance.now();
      const requestTime = Math.round(endTime - startTime.current);
      addLog(`요청 응답 시간: ${requestTime}ms`, 'info');

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
      addLog(`응답 상태 코드: ${response.status}`, 'info');
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
      addLog('애플리케이션 시작', 'info');
      logBrowserInfo();
      logNetworkStatus();
      checkServerStatus();
    }

    // 네트워크 상태 변경 감지
    const handleOnline = () => logNetworkStatus();
    const handleOffline = () => logNetworkStatus();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('load', logPerformance);

    const interval = setInterval(checkServerStatus, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('load', logPerformance);
      clearInterval(interval);
    };
  }, []);

  return { logs, addLog, healthStatus };
}
