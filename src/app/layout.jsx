import './globals.css';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: '이젠A팀',
  description: '미니프로젝트 프론트엔드',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
