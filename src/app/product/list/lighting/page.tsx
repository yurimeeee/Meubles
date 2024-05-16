'use client';

import * as P from '../../product.style';
import ProductList from '@components/feature/Product/ProductList';

const categoryList = ['TABLELAMPS', 'FLOORLAMPS', 'PENDANTLAMPS'];

const LightingProductPage = () => {
  return (
    <P.Wrapper>
      <ProductList categoryListData={categoryList} uCate={'LIGHTING'} />
    </P.Wrapper>
  );
};

export default LightingProductPage;
