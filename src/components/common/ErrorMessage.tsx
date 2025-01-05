interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='flex justify-center items-center min-h-screen text-red-500'>
      에러: {message}
    </div>
  );
}
