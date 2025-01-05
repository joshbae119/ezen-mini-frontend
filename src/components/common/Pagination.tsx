interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - halfVisible, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const buttonClass =
    'px-3 py-1 rounded-lg bg-gray-500 text-white hover:bg-red-800 transition-all duration-300 text-sm font-medium';

  return (
    <div className='flex justify-center items-center gap-2 mt-4'>
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={buttonClass}
        >
          이전
        </button>
      )}

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={buttonClass}>
            1
          </button>
          {startPage > 2 && <span className='px-2'>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300
            ${
              currentPage === page
                ? 'bg-gray-500 text-white hover:bg-red-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className='px-2'>...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={buttonClass}
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={buttonClass}
        >
          다음
        </button>
      )}
    </div>
  );
}
