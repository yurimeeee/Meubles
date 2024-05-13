import type { Metadata } from 'next';
import { Baskervville } from 'next/font/google';
import StyledComponentsRegistry from '@lib/StyledComponentsRegistry';
import Header from '@components/layout/Header';

// const baskervville = Baskervville({ subsets: [''] });÷

export const metadata: Metadata = {
  title: 'Meubles',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
