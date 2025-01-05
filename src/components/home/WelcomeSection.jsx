'use client';

import MorphingText from '@/components/ui/morphing-text';
import PulsatingButton from '@/components/ui/pulsating-button';

const texts = ['EZEN Computer GIMPO', 'A Team Mini PROJECT'];

export default function WelcomeSection({ onBoardClick }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh]'>
      <div className='text-center space-y-4'>
        <MorphingText texts={texts} />
      </div>
      <PulsatingButton>게시판</PulsatingButton>
    </div>
  );
}
