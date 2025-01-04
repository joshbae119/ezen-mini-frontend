export default function PageLayout({
  children,
  title,
  onBackClick,
  backButtonText,
}) {
  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      {onBackClick && (
        <button
          onClick={onBackClick}
          className='absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors'
        >
          {backButtonText || '뒤로가기'}
        </button>
      )}
      {title && <h1 className='text-3xl font-bold mb-8'>{title}</h1>}
      {children}
    </div>
  );
}
