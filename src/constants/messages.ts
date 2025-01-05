export const ERROR_MESSAGES = {
  DEFAULT: '알 수 없는 오류가 발생했습니다.',
  DATA_LOAD_FAILED: '데이터 로드 실패',
  QUESTION_NOT_FOUND: '질문을 찾을 수 없습니다.',
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
