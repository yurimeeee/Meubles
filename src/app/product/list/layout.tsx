'use client';

import PageTitle from '@components/share/PageTitle';
import { Wrapper } from '@components/styled/StyledComponents';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

export default function ProductListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState<string>('');
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname.includes('furniture')) {
      setTitle('FURNITURE');
    } else if (pathname.includes('lighting')) {
      setTitle('LIGHTING');
    } else if (pathname.includes('sounds')) {
      setTitle('SOUNDS');
    } else if (pathname.includes('new')) {
      setTitle('NEW');
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
