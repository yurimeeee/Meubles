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
  description: '감도높은 라이프 스타일을 위한 쇼핑',
  icons: {
    icon: './favicon.ico',
  },
  keywords: ['meubles', '가구 '],
  openGraph: {
    title: 'Meubles Mall',
    description: '감도높은 라이프 스타일을 위한 쇼핑',
    url: 'https://meubles-mall.netlify.app/',
    siteName: 'meubles',
    images: [
      {
        url: 'https://github.com/yurimeeee/Meubles/assets/137126594/1069ef13-74da-4346-a7c8-e1a64931014a',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: 'ko-KR',
  },
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
