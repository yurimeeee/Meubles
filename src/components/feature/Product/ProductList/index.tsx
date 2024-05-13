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
  const [selectedOption, setSelectedOption] = useState('최신순');

  useEffect(() => {
    setFilteredProducts(productData.filter((product) => product.u_categoy === uCate));
  }, []);

  const handleCategoryClick = (clickedCategory: string) => {
    setCategory(clickedCategory);
    const tmp = productData.filter((product) => product.u_categoy === uCate && product.l_categoy === clickedCategory);
    setFilteredProducts(tmp);
  };
  const handleALLClick = () => {
    // setCategory(clickedCategory);
    // const tmp = productData.filter((product) => product.u_categoy === uCate && product.l_categoy === clickedCategory);
    setFilteredProducts(productData.filter((product) => product.u_categoy === uCate));
  };
  const handleNEWClick = () => {
    // setCategory(clickedCategory);
    // const tmp = productData.filter((product) => product.u_categoy === uCate && product.l_categoy === clickedCategory);
    setFilteredProducts(productData.filter((product) => product.u_categoy === uCate && product.new === true));
  };

  return (
    <Wrapper>
      {/* <CategoryList>
        <CategoryItem onClick={() => handleALLClick()}>ALL</CategoryItem>
        <CategoryItem onClick={() => handleNEWClick()}>NEW</CategoryItem>
        {categoryListData?.map((item, idx) => (
          <CategoryItem key={idx} onClick={() => handleCategoryClick(item)}>
            {item}
          </CategoryItem>
        ))}
      </CategoryList> */}

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
            setSelectedOption(newValue);

            // if (newValue === '최신순' && type === 7) {
            //   setType(6);
            // } else if (type === 6) {
            //   setType(7);
            // }
          }}
          options={[
            { value: '최신순', label: '최신순' },
            { value: '상품명', label: '상품명' },
            { value: '높은가격', label: '높은가격' },
            { value: '낮은가격', label: '낮은가격' },
          ]}
          // value={'최신순'}
          value={selectedOption}
          width={86}
        />
      </FlexBox>

      <ProductWrap>
        {/* {productData
          .filter((product) => product.u_categoy === 'FURNITURE')
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
