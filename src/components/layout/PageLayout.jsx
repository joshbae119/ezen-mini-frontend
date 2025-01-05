export default function PageLayout({
  children,
  title,
  onBackClick,
  backButtonText,
}) {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <div className='w-full max-w-4xl'>
        <div className='py-4 px-4 text-center'>
          {title && <h1 className='text-3xl font-bold'>{title}</h1>}
        </div>
        <div className='flex justify-start px-4 pb-4'>
          {onBackClick && (
            <button
              onClick={onBackClick}
              className='mt-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors'
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
