'use client';

import MorphingText from '@/components/ui/morphing-text';
import PulsatingButton from '@/components/ui/pulsating-button';

interface WelcomeSectionProps {
  onBoardClick?: () => void;
}

const texts = ['EZEN Computer GIMPO', 'A Team Mini PROJECT'];

export default function WelcomeSection({ onBoardClick }: WelcomeSectionProps) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh]'>
      <div className='text-center space-y-4'>
        <MorphingText texts={texts} />
      </div>
      <PulsatingButton onClick={onBoardClick}>게시판</PulsatingButton>
    </div>
  );
}
