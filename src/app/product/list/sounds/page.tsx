'use client';

import * as P from '../../product.style';
import ProductList from '@components/feature/Product/ProductList';

const categoryList = ['SPEAKER'];

const ProductPage = () => {
  return (
    <P.Wrapper>
      <ProductList categoryListData={categoryList} uCate={'SOUNDS'} />
    </P.Wrapper>
  );
};

export default ProductPage;
