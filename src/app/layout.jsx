import './globals.css';

export const metadata = {
  title: 'EZEN-A-TEAM',
  description: 'Mini Project Front End',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
