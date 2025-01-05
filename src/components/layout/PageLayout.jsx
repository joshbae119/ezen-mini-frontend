export default function PageLayout({
  children,
  title,
  onBackClick,
  backButtonText,
}) {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <div className='w-full max-w-4xl'>
        <div className='flex justify-between items-center py-4 px-4'>
          {onBackClick && (
            <button
              onClick={onBackClick}
              className='px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors'
            >
              {backButtonText || '뒤로가기'}
            </button>
          )}
          {title && <h1 className='text-3xl font-bold'>{title}</h1>}
        </div>
        <div className='px-4'>{children}</div>
      </div>
    </div>
  );
}
