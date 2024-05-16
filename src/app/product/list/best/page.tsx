'use client';

import * as P from '../../product.style';
import ProductList from '@components/feature/Product/ProductList';

const BestProductPage = () => {
  return (
    <P.Wrapper>
      <ProductList BEST />
    </P.Wrapper>
  );
};

export default BestProductPage;
