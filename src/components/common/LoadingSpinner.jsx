export default function LoadingSpinner() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
      <span className='ml-2'>로딩 중...</span>
    </div>
  );
}
