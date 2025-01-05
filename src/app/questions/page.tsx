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
import { Question } from '@/types/question';

export default function QuestionsPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    questions,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    refetch,
  } = useQuestions();

  const handleSubmit = async (questionData: Partial<Question>) => {
    try {
      setIsSubmitting(true);
      await questionsApi.create(questionData);
      setShowForm(false);
      goToPage(1);
    } catch (error) {
      console.error('질문 등록 실패:', error);
    } finally {
      setIsSubmitting(false);
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
          isSubmitting={isSubmitting}
        />
      ) : (
        <div className='relative'>
          <QuestionList
            questions={questions}
            onQuestionClick={(id) => router.push(`/questions/${id}`)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
          <div className='flex mt-8 justify-end'>
            <button
              onClick={() => setShowForm(true)}
              className='px-6 py-3 bg-gray-800 text-white rounded-xl 
                         hover:bg-red-800 transform hover:scale-105 
                         transition-all duration-300 shadow-lg 
                         hover:shadow-xl font-medium text-sm'
              disabled={isSubmitting}
            >
              질문등록
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
