import type { Metadata } from 'next';
import { Baskervville } from 'next/font/google';

import StyledComponentsRegistry from '@lib/StyledComponentsRegistry';
import RecoilRootWrapper from '@recoil/RecoilRootWrapper';
import { StyledToastContainer } from '@lib/StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

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
        <RecoilRootWrapper>
          <StyledComponentsRegistry>
            <Header />
            {children}
            <StyledToastContainer />
            <Footer />
          </StyledComponentsRegistry>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
