'use client';

import { usePathname } from 'next/navigation';
import * as P from './product.style';
import { useEffect, useState } from 'react';

const ProductPage = () => {
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

  return (
    <P.Wrapper>
      <P.PageTitle>{title}</P.PageTitle>
    </P.Wrapper>
  );
};

export default ProductPage;
