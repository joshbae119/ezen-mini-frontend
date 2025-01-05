'use client';

import MorphingText from '@/components/ui/morphing-text';
import PulsatingButton from '@/components/ui/pulsating-button';

interface WelcomeSectionProps {
  onBoardClick?: () => void;
}

const texts = ['EZEN Computer', 'A조 Mini Project'];

export default function WelcomeSection({ onBoardClick }: WelcomeSectionProps) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh] px-8'>
      <div className='text-center mb-32 w-full'>
        <MorphingText texts={texts} />
      </div>
      <PulsatingButton onClick={onBoardClick}>게시판 바로가기</PulsatingButton>
    </div>
  );
}
