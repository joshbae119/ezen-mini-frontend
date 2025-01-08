# EZEN Computer A조 Mini Project - Q&A 게시판

## 프로젝트 소개

이 프로젝트는 EZEN Computer A조의 미니 프로젝트로, Next.js를 사용하여 개발된 Q&A 게시판입니다.

## 기술 스택

- **Frontend**
  - Next.js 15.1.3
  - React 18.2.0
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Axios

## 주요 기능

- 질문 게시판 CRUD
- 답변 등록 및 조회
- 페이지네이션
- 반응형 디자인
- 애니메이션 효과

## 프로젝트 구조

# 프로젝트 디렉토리 구조

graph TD
A[app/questions/page.tsx] --> B[components/questions/QuestionList.tsx]
A --> C[components/questions/QuestionForm.tsx]
B --> D[components/questions/QuestionItem.tsx]

    E[app/questions/[id]/page.tsx] --> F[components/questions/QuestionDetail/index.tsx]
    F --> G[components/questions/AnswerForm.tsx]

    H[hooks/questions/useQuestions.ts] --> I[services/api/questions.ts]
    J[hooks/questions/useQuestionDetail.ts] --> I

    K[types/question.ts] --> I
    K --> H
    K --> J

src/
├── app/ # Next.js 앱 라우터
│ ├── layout.tsx # 루트 레이아웃
│ ├── page.tsx # 홈페이지
│ └── questions/ # 질문 관련 페이지
│ ├── page.tsx # 질문 목록 페이지
│ └── [id]/ # 동적 라우팅
│ └── page.tsx # 질문 상세 페이지
│
├── components/ # 컴포넌트
│ ├── common/ # 공통 컴포넌트
│ │ ├── ErrorMessage.tsx
│ │ ├── LoadingSpinner.tsx
│ │ └── Pagination.tsx
│ ├── layout/ # 레이아웃 컴포넌트
│ │ ├── ClientLayout.tsx
│ │ └── PageLayout.tsx
│ ├── home/ # 홈 관련 컴포넌트
│ │ └── WelcomeSection.tsx
│ ├── questions/ # 질문 관련 컴포넌트
│ │ ├── AnswerForm.tsx
│ │ ├── QuestionForm.tsx
│ │ ├── QuestionItem.tsx
│ │ ├── QuestionList.tsx
│ │ └── QuestionDetail/
│ │ └── index.tsx
│ └── ui/ # UI 컴포넌트
│ ├── morphing-text.tsx
│ └── pulsating-button.tsx
│
├── constants/ # 상수 정의
│ ├── api.ts # API 관련 상수
│ └── messages.ts # 메시지 상수
│
├── hooks/ # 커스텀 훅
│ └── questions/ # 질문 관련 훅
│ ├── useQuestions.ts
│ └── useQuestionDetail.ts
│
├── services/ # API 서비스
│ └── api/
│ └── questions.ts # 질문 API 서비스
│
├── types/ # 타입 정의
│ ├── env.d.ts # 환경변수 타입
│ └── question.ts # 질문 관련 타입
│
└── utils/ # 유틸리티
└── dateFormat.ts # 날짜 포맷 유틸리티

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

1. 프로젝트 클론
2. 패키지 설치
3. 환경 변수 설정
4. 서버 실행

저장소 클론

git clone https://github.com/joshbae119/ezen-mini-frontend.git

## 배포

- GitHub Actions를 통한 자동 배포
- AWS EC2 인스턴스에 PM2로 운영

## API 엔드포인트

- GET /api/v1/questions - 질문 목록 조회
- GET /api/v1/questions/:id - 질문 상세 조회
- POST /api/v1/questions - 질문 등록
- POST /api/v1/answers - 답변 등록

## 환경 변수

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수를 설정하세요:
