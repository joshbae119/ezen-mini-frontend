import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  onBackClick?: () => void;
  backButtonText?: string;
}

export default function PageLayout({
  children,
  title,
  onBackClick,
  backButtonText,
}: PageLayoutProps) {
  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-3xl'>
        <div className='py-4 px-4 text-center'>
          {title && (
            <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
          )}
        </div>
        <div className='flex justify-start px-4 pb-4'>
          {onBackClick && (
            <button
              onClick={onBackClick}
              className='mt-2 px-6 py-2 bg-gray-800 
                       text-white rounded-xl hover:bg-red-800
                       transform hover:scale-105 transition-all duration-300 
                       shadow-md hover:shadow-lg text-sm font-medium'
            >
              {backButtonText || '뒤로가기'}
            </button>
          )}
        </div>
        <div className='px-4'>{children}</div>
      </div>
    </div>
  );
}
