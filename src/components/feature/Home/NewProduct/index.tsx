'use client';

import styled from 'styled-components';
import Link from 'next/link';

import theme from '@styles/theme';
import { productData } from '@utils/productData';
import ProductItem from '@components/share/ProductItem';
import { MediumFont, RegularFont } from '@components/styled/StyledComponents';

import ArrowIcon from '@assets/icons/ArrowIcon';
import { useState } from 'react';

const NewProduct = () => {
  const [keyword, setKeyword] = useState<string>('Minimalism');

  return (
    <Wrapper>
      <Title>New Product</Title>
      <SubTitle>새롭게 입고된 신상품을 만나보세요</SubTitle>
      <MoreView href={'/'}>
        MORE VIEWS
        <ArrowIcon />
      </MoreView>

      <Contents>
        <KeywordList>
          <Keyword onClick={() => setKeyword('Vintage')} $active={keyword === 'Vintage'}>
            # Vintage
          </Keyword>
          <Keyword onClick={() => setKeyword('Modular')} $active={keyword === 'Modular'}>
            # Modular
          </Keyword>
          <Keyword onClick={() => setKeyword('Minimalism')} $active={keyword === 'Minimalism'}>
            # Minimalism
          </Keyword>
          <Keyword onClick={() => setKeyword('Sculptural')} $active={keyword === 'Sculptural'}>
            # Sculptural
          </Keyword>
        </KeywordList>
        <ProductList>
          {productData
            .filter((product) => product.keyword === keyword)
            .slice(0, 3)
            .map((item, idx) => (
              <ProductItem key={idx} data={item} />
            ))}
        </ProductList>
      </Contents>
    </Wrapper>
  );
};

export default NewProduct;

const Wrapper = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto 100px;
`;
const Title = styled(MediumFont)`
  ${theme.typography.h3}
  font-family: "BaskervilleRegular";
  margin-bottom: 8px;
  text-align: center;
`;
const SubTitle = styled(RegularFont)`
  ${theme.typography.body};
  margin-bottom: 60px;
  text-align: center;
`;
const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1024px;

  ${theme.devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const MoreView = styled(Link)`
  display: flex;
  gap: 10px;
  justify-content: end;
  color: ${theme.colors.grayFontColor};
  margin-bottom: 16px;
`;
const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;
const KeywordList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 20px;
`;
const Keyword = styled.li<{ $active: boolean }>`
  width: 200px;
  height: 55px;
  display: flex;
  align-items: center;
  ${theme.typography.h7};
  /* background: ${theme.colors.greyBgColor}; */
  background: ${({ $active }) => ($active ? theme.colors.wramGreyBgColor : theme.colors.greyBgColor)};
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  padding: 0 16px;
  transition: background 0.4s;
  cursor: pointer;
`;
