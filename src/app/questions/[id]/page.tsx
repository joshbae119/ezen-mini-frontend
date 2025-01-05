'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuestionDetail } from '@/hooks/questions/useQuestionDetail';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import QuestionDetail from '@/components/questions/QuestionDetail';
import { Question } from '@/types/question';

export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { question, loading, error, refetch } = useQuestionDetail(
    params.id as string
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!question) return <ErrorMessage message='질문을 찾을 수 없습니다.' />;

  return (
    <PageLayout onBackClick={() => router.push('/questions')}>
      <QuestionDetail question={question} onAnswerAdded={refetch} />
    </PageLayout>
  );
}
