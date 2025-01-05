export const API_ENDPOINTS = {
  QUESTIONS: '/questions',
  QUESTION_DETAIL: (id: number | string) => `/questions/${id}`,
} as const;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;
