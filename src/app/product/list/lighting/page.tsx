'use client';

import * as P from '../../product.style';
import ProductList from '@components/feature/Product/ProductList';

const categoryList = ['TABLELAMPS', 'FLOORLAMPS'];

const ProductPage = () => {
  return (
    <P.Wrapper>
      <ProductList categoryListData={categoryList} uCate={'LIGHTING'} />
    </P.Wrapper>
  );
};

export default ProductPage;
