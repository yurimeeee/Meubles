'use client';

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
    } else if (pathname.includes('new')) {
      setTitle('NEW');
    } else if (pathname.includes('best')) {
      setTitle('BEST');
    }
  }, [pathname]);

  return (
    <main>
      <Wrapper>
        <PageTitle title={title} />
        {children}
      </Wrapper>
    </main>
  );
}
