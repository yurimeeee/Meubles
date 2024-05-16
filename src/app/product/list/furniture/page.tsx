'use client';

import * as P from '../../product.style';
import ProductList from '@components/feature/Product/ProductList';

const categoryList = ['SOFAS', 'CHAIRS', 'TABLES', 'STORAGE', 'SHELF'];

const FurnitureProductPage = () => {
  return (
    <P.Wrapper>
      <ProductList categoryListData={categoryList} uCate={'FURNITURE'} />
    </P.Wrapper>
  );
};

export default FurnitureProductPage;
