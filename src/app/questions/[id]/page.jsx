'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuestionDetail } from '@/hooks/questions/useQuestionDetail';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { question, loading, error } = useQuestionDetail(params.id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!question) return <ErrorMessage message='질문을 찾을 수 없습니다.' />;

  return (
    <PageLayout onBackClick={() => router.push('/questions')}>
      <div className='w-full max-w-3xl mt-16'>
        <h1 className='text-3xl font-bold mb-4'>{question.subject}</h1>
        <p className='text-gray-600 mb-4'>{question.content}</p>
        <div className='text-sm text-gray-500'>
          작성일: {new Date(question.createDate).toLocaleString()}
        </div>
      </div>
    </PageLayout>
  );
}
