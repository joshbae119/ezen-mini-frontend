'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuestionDetail } from '@/hooks/questions/useQuestionDetail';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import QuestionDetail from '@/components/questions/QuestionDetail';

export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { question, loading, error } = useQuestionDetail(params.id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!question) return <ErrorMessage message='질문을 찾을 수 없습니다.' />;

  return (
    <PageLayout onBackClick={() => router.push('/questions')}>
      <QuestionDetail question={question} />
    </PageLayout>
  );
}
