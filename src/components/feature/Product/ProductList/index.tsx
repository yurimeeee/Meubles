'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import theme from '@styles/theme';
import { Product, productData } from '@utils/productData';
import ProductItem from '@components/share/ProductItem';
import { FlexBox } from '@components/styled/StyledComponents';
import StyledSelect from '@components/styled/StyledSelect';

type ProductListProps = {
  categoryListData: string[];
  uCate: string;
};

const ProductList = ({ categoryListData, uCate }: ProductListProps) => {
  const [category, setCategory] = useState<string>('NEW');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortByOption, setSortByOption] = useState('최신순');

  useEffect(() => {
    setFilteredProducts(productData.filter((product) => product.u_category === uCate));
  }, []);

  const handleCategoryClick = (clickedCategory: string) => {
    setCategory(clickedCategory);
    const tmp = productData.filter((product) => product.u_category === uCate && product.l_category === clickedCategory);
    setFilteredProducts(tmp);
  };
  const handleALLClick = () => {
    setFilteredProducts(productData.filter((product) => product.u_category === uCate));
  };
  const handleNEWClick = () => {
    setFilteredProducts(productData.filter((product) => product.u_category === uCate && product.new === true));
  };

  useEffect(() => {
    if (sortByOption === '최신순' && filteredProducts.length > 0) {
      const sortedData = [...filteredProducts].sort((a, b) => b.id - a.id);
      setFilteredProducts(sortedData);
    }
    if (sortByOption === '상품명') {
      const sortedData = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      setFilteredProducts(sortedData);
    }
    if (sortByOption === '높은가격') {
      const sortedData = [...filteredProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      setFilteredProducts(sortedData);
    }
    if (sortByOption === '낮은가격') {
      const sortedData = [...filteredProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setFilteredProducts(sortedData);
    }
  }, [sortByOption]);

  return (
    <Wrapper>
      <FlexBox $margin="0 0 20px" $justifyContent="space-between">
        <CategoryList>
          <CategoryItem onClick={() => handleALLClick()}>ALL</CategoryItem>
          <CategoryItem onClick={() => handleNEWClick()}>NEW</CategoryItem>
          {categoryListData?.map((item, idx) => (
            <CategoryItem key={idx} onClick={() => handleCategoryClick(item)}>
              {item}
            </CategoryItem>
          ))}
        </CategoryList>
        <StyledSelect
          onChange={(e) => {
            const newValue = e.target.value;
            setSortByOption(newValue);
          }}
          options={[
            { value: '최신순', label: '최신순' },
            { value: '상품명', label: '상품명' },
            { value: '높은가격', label: '높은가격' },
            { value: '낮은가격', label: '낮은가격' },
          ]}
          // value={'최신순'}
          value={sortByOption}
          width={86}
        />
      </FlexBox>

      <ProductWrap>
        {/* {productData
          .filter((product) => product.u_category === 'FURNITURE')
          .map((item, idx) => (
            <ProductItem key={idx} data={item} />
          ))} */}
        {filteredProducts.map((item, idx) => (
          <ProductItem key={idx} data={item} />
        ))}
      </ProductWrap>
    </Wrapper>
  );
};

export default ProductList;

const Wrapper = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto 100px;
`;
const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CategoryList = styled.ul`
  ${theme.typography.h7};
  display: flex;
  gap: 20px;
`;
const CategoryItem = styled.li`
  cursor: pointer;
`;
const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${theme.devices.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
