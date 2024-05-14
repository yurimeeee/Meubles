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
        <MoreView href={'/'}>
          MORE VIEWS
          <ArrowIcon />
        </MoreView>

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
  padding: 0 20px;

  ${theme.devices.desktop} {
    padding: 0;
  }
`;
const Title = styled(MediumFont)`
  ${theme.typography.h3}
  font-family: "BaskervilleRegular";
  margin-bottom: 8px;
  text-align: center;

  ${theme.devices.mobile} {
    ${theme.typography.h4}
    margin-bottom: 4px;
  }
`;
const SubTitle = styled(RegularFont)`
  ${theme.typography.body};
  margin-bottom: 60px;
  text-align: center;

  ${theme.devices.mobile} {
    margin-bottom: 32px;
    font-size: 14px;
  }
`;
const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1280px;

  ${theme.devices.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const MoreView = styled(Link)`
  display: flex;
  gap: 10px;
  justify-content: end;
  color: ${theme.colors.grayFontColor};
  margin: 24px 0 16px;

  ${theme.devices.mobile} {
    font-size: 13px;
  }
`;
const Contents = styled.div`
  /* width: 100%;
  max-width: calc(100vh - 40px); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const KeywordList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;

  ${theme.devices.mobile} {
    width: 100%;
    max-width: calc(100vh - 40px);
    gap: 8px;
  }
`;
const Keyword = styled.li<{ $active: boolean }>`
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  ${theme.typography.h7}
  white-space: nowrap;
  /* background: ${({ $active }) => ($active ? theme.colors.greyBgColor : theme.colors.lightGrayBgColor)};
  box-shadow: ${({ $active }) => ($active ? 'none' : `inset 0 0 0 1.5px ${theme.colors.greyBgColor}`)}; */
  background: ${({ $active }) => ($active ? theme.colors.lightGrayBgColor : theme.colors.greyBgColor)};
  box-shadow: ${({ $active }) => ($active ? `inset 0 0 0 1.5px ${theme.colors.greyBgColor}` : 'none')};
  color: ${({ $active }) => ($active ? theme.colors.blackColor : theme.colors.deepGrayFontColor)};
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  transition: background 0.4s;
  cursor: pointer;

  ${theme.devices.mobile} {
    padding: 0 10px;
    height: 40px;
    flex: 1;
    font-size: 12px;
  }
`;
