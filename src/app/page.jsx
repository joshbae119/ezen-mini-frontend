'use client';

import { useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import WelcomeSection from '@/components/home/WelcomeSection';

export default function HomePage() {
  const router = useRouter();

  return (
    <PageLayout>
      <WelcomeSection onBoardClick={() => router.push('/questions')} />
    </PageLayout>
  );
}
