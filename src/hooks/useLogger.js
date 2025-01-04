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

  // 브라우저 성능 정보 로깅
  const logPerformance = useCallback(() => {
    if (window.performance && !browserInfoLogged.current) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
      const connectionTime = perfData.connectEnd - perfData.connectStart;

      addLog(
        `페이지 로드 시간: ${pageLoadTime}ms`,
        'performance',
        'Performance'
      );
      addLog(`DNS 조회 시간: ${dnsTime}ms`, 'performance', 'Performance');
      addLog(
        `서버 연결 시간: ${connectionTime}ms`,
        'performance',
        'Performance'
      );
    }
  }, [addLog]);

  // 네트워크 상태 로깅
  const logNetworkStatus = useCallback(() => {
    const status = navigator.onLine ? '연결됨' : '끊김';
    const type = navigator.onLine ? 'success' : 'error';
    addLog(`네트워크 상태: ${status}`, type, 'Network');

    if (navigator.onLine && navigator.connection) {
      addLog(
        `네트워크 정보 - 유형: ${navigator.connection.effectiveType}, 대역폭: ${navigator.connection.downlink}Mbps`,
        'info',
        'Network'
      );
    }
  }, [addLog]);

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

  // 브라우저 정보 로깅 함수 추가
  const logBrowserInfo = useCallback(() => {
    if (!browserInfoLogged.current) {
      browserInfoLogged.current = true;

      // 브라우저 기본 정보
      addLog(`브라우저: ${navigator.userAgent}`, 'info', 'Browser');
      addLog(`플랫폼: ${navigator.platform}`, 'info', 'Browser');

      // 화면 정보
      addLog(
        `화면 크기: ${window.screen.width}x${window.screen.height}`,
        'info',
        'Browser'
      );

      // 언어 설정
      addLog(`언어: ${navigator.language}`, 'info', 'Browser');

      // 쿠키 활성화 여부
      addLog(
        `쿠키 활성화: ${navigator.cookieEnabled ? '예' : '아니오'}`,
        'info',
        'Browser'
      );

      // PWA 관련 정보
      if (window.matchMedia('(display-mode: standalone)').matches) {
        addLog('PWA 모드로 실행 중', 'info', 'Browser');
      }
    }
  }, [addLog]);

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
      logBrowserInfo();
      logNetworkStatus();
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
    window.addEventListener('load', logPerformance);

    const interval = setInterval(checkServerStatus, 5 * 60 * 1000);

    // Cleanup
    return () => {
      addLog('컴포넌트 언마운트', 'lifecycle', 'Lifecycle');
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('load', logPerformance);
      clearInterval(interval);
    };
  }, [
    addLog,
    checkServerStatus,
    logNetworkStatus,
    logPerformance,
    logBrowserInfo,
  ]);

  return {
    logs,
    addLog,
    healthStatus,
    withLogging, // 함수 로깅을 위한 유틸리티 노출
    logStateChange, // 상태 변경 로깅을 위한 유틸리티 노출
  };
}
