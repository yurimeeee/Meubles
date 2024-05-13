'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';

import PageTitle from '@components/share/PageTitle';
import { Wrapper } from '@components/styled/StyledComponents';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('furniture')) {
      setTitle('FURNITURE');
    } else if (pathname.includes('lighting')) {
      setTitle('LIGHTING');
    } else if (pathname.includes('sounds')) {
      setTitle('SOUNDS');
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init();
    }
  }, []);
  return (
    <main>
      <Wrapper $padding="100px 0">
        <PageTitle title={title} data-aos="fade-up" />
        {children}
      </Wrapper>
    </main>
  );
}
