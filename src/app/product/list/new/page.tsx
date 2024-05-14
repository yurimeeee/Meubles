'use client';

import * as P from '../../product.style';
import ProductList from '@components/feature/Product/ProductList';

const categoryList = ['SOFAS', 'CHAIRS', 'TABLES', 'STORAGE', 'SHELF'];

const ProductPage = () => {
  return (
    <P.Wrapper>
      <ProductList categoryListData={categoryList} NEW />
    </P.Wrapper>
  );
};

export default ProductPage;
