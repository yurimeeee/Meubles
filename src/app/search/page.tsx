'use client';

import BestSeller from '@components/feature/Home/BestSeller';
import * as S from './search.style';
import NewProduct from '@components/feature/Home/NewProduct';
import { useEffect, useState } from 'react';
import { Product, productData } from '@utils/productData';

export default function SearchPage({ params }: { params: { keyword: string } }) {
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    if (params) {
      const tmpData = productData.find((product) => String(product.name) === params.keyword);
      setData(tmpData as any);
      // setMainImg(tmpData?.mainImg as string);
    }
  }, [params]);

  return (
    <S.Wrapper>
      {/* <M.MainImg src={MainImage} alt="메인 이미지" /> */}
      SearchPage
    </S.Wrapper>
  );
}
