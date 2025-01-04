'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useLogger() {
  const [logs, setLogs] = useState([]);
  const [healthStatus, setHealthStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const initialCheckDone = useRef(false);
  const browserInfoLogged = useRef(false);
  const startTime = useRef(null);
  const renderCount = useRef(0);

  // 로깅 유틸리티 함수
  const addLog = useCallback((message, type = 'info', component = 'App') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => {
      console.debug(`[${timestamp}] ${component}: ${message}`);
      return [...prev, { timestamp, message, type, component }];
    });
  }, []);

  // 상태 변경 로깅
  const logStateChange = useCallback(
    (stateName, oldValue, newValue) => {
      addLog(
        `상태 변경: ${stateName} (${JSON.stringify(
          oldValue
        )} → ${JSON.stringify(newValue)})`,
        'state',
        'StateManager'
      );
    },
    [addLog]
  );

  // 함수 실행 로깅을 위한 데코레이터
  const withLogging = useCallback(
    (fn, fnName) => {
      return async (...args) => {
        const startTime = performance.now();
        addLog(`${fnName} 실행 시작`, 'function', 'FunctionTracker');

        try {
          const result = await fn(...args);
          const executionTime = Math.round(performance.now() - startTime);
          addLog(
            `${fnName} 실행 완료 (${executionTime}ms)`,
            'function',
            'FunctionTracker'
          );
          return result;
        } catch (error) {
          addLog(
            `${fnName} 실행 실패: ${error.message}`,
            'error',
            'FunctionTracker'
          );
          throw error;
        }
      };
    },
    [addLog]
  );

  // 서버 상태 체크 함수
  const checkServerStatus = useCallback(async () => {
    if (isChecking) return;

    try {
      setIsChecking(true);
      logStateChange('isChecking', false, true);

      startTime.current = performance.now();
      addLog('서버 상태 확인 시작', 'info', 'ServerCheck');

      const response = await fetch('http://3.37.2.236:8080/api/v1/health', {
        signal: AbortSignal.timeout(5000),
      });

      const requestTime = Math.round(performance.now() - startTime.current);
      addLog(`API 응답 시간: ${requestTime}ms`, 'performance', 'ServerCheck');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      logStateChange('healthStatus', healthStatus, data);
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

      addLog(statusMessage, statusType, 'ServerStatus');
    } catch (err) {
      let errorMessage = '서버 연결 실패';
      if (err.name === 'TimeoutError') errorMessage = '서버 응답 시간 초과';
      else if (err.name === 'AbortError') errorMessage = '요청이 중단됨';
      else if (err instanceof TypeError) errorMessage = '네트워크 오류';

      addLog(`${errorMessage}: ${err.message}`, 'error', 'ServerCheck');
      console.error('Health check error:', err);

      // 재시도 로직
      setTimeout(() => {
        if (!isChecking) checkServerStatus();
      }, 10000);
    } finally {
      setIsChecking(false);
      logStateChange('isChecking', true, false);
    }
  }, [isChecking, healthStatus, addLog, logStateChange]);

  // 컴포넌트 라이프사이클 로깅
  useEffect(() => {
    renderCount.current++;
    addLog(
      `컴포넌트 렌더링 (${renderCount.current}번째)`,
      'lifecycle',
      'Lifecycle'
    );

    if (!initialCheckDone.current) {
      initialCheckDone.current = true;
      addLog('애플리케이션 초기화', 'lifecycle', 'Lifecycle');
      checkServerStatus();
    }

    const handleOnline = () => logNetworkStatus();
    const handleOffline = () => logNetworkStatus();
    const handleVisibilityChange = () => {
      addLog(
        `페이지 ${document.hidden ? '숨김' : '표시'}`,
        'lifecycle',
        'Visibility'
      );
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const interval = setInterval(checkServerStatus, 5 * 60 * 1000);

    // Cleanup
    return () => {
      addLog('컴포넌트 언마운트', 'lifecycle', 'Lifecycle');
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [addLog, checkServerStatus]);

  return {
    logs,
    addLog,
    healthStatus,
    withLogging, // 함수 로깅을 위한 유틸리티 노출
    logStateChange, // 상태 변경 로깅을 위한 유틸리티 노출
  };
}
