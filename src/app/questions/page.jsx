'use client';

import { useRouter } from 'next/navigation';
import { useQuestions } from '@/hooks/questions/useQuestions';
import PageLayout from '@/components/layout/PageLayout';
import QuestionList from '@/components/questions/QuestionList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function QuestionsPage() {
  const router = useRouter();
  const { questions, loading, error } = useQuestions();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <PageLayout
      title='질문게시판'
      onBackClick={() => router.push('/')}
      backButtonText='HOME'
    >
      <QuestionList
        questions={questions}
        onQuestionClick={(id) => router.push(`/questions/${id}`)}
      />
    </PageLayout>
  );
}
