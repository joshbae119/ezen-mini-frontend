'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestions } from '@/hooks/questions/useQuestions';
import { questionsApi } from '@/services/api/questions';
import PageLayout from '@/components/layout/PageLayout';
import QuestionList from '@/components/questions/QuestionList';
import QuestionForm from '@/components/questions/QuestionForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';

export default function QuestionsPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const {
    questions,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    refetch,
  } = useQuestions();

  const handleSubmit = async (questionData) => {
    try {
      await questionsApi.create(questionData);
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('질문 등록 실패:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <PageLayout
      title='질문게시판'
      onBackClick={() => router.push('/')}
      backButtonText='HOME'
    >
      {showForm ? (
        <QuestionForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <QuestionList
            questions={questions}
            onQuestionClick={(id) => router.push(`/questions/${id}`)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
          <button
            onClick={() => setShowForm(true)}
            className='fixed bottom-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg'
          >
            질문등록
          </button>
        </>
      )}
    </PageLayout>
  );
}
