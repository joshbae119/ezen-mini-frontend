export default function WelcomeSection({ onBoardClick }) {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='mb-2'>안녕하세요</h1>
      <h2>EZEN A팀 미니 프로젝트에 오신 걸 환영합니다.</h2>
      <button
        onClick={onBoardClick}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
      >
        게시판 이동
      </button>
    </div>
  );
}
