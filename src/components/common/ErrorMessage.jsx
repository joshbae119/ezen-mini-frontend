export default function ErrorMessage({ message }) {
  return (
    <div className='flex justify-center items-center min-h-screen text-red-500'>
      에러: {message}
    </div>
  );
}
