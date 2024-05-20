'use client';

import * as P from '../../product.style';
import ProductList from '@components/feature/Product/ProductList';

const categoryList = ['OBJECTS', 'MIRRORS'];

const AccessoriesProductPage = () => {
  return (
    <P.Wrapper>
      <ProductList categoryListData={categoryList} uCate={'ACCESSORIES'} />
    </P.Wrapper>
  );
};

export default AccessoriesProductPage;
