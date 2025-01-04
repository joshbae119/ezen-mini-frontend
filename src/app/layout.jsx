import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata = {
  title: '이젠A팀',
  description: '미니프로젝트 프론트엔드',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
