export interface Question {
  id: number;
  subject: string;
  content: string;
  createDate: string;
  answers?: Answer[];
}

export interface Answer {
  id: number;
  content: string;
  createDate: string;
  questionId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
