interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='flex justify-center items-center min-h-[50vh]'>
      <div className='text-red-500'>{message}</div>
    </div>
  );
}
