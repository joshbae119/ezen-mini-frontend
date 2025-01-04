'use client';

export default function ClientLayout({ children }) {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      <main>{children}</main>
    </div>
  );
}
