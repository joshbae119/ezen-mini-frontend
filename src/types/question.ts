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
}
