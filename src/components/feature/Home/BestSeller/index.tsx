'use client';

import styled from 'styled-components';
import Link from 'next/link';

import theme from '@styles/theme';
import { productData } from '@utils/productData';
import ProductItem from '@components/share/ProductItem';
import { MediumFont, RegularFont } from '@components/styled/StyledComponents';

import ArrowIcon from '@assets/icons/ArrowIcon';

const BestSeller = () => {
  return (
    <Wrapper>
      <Title>Top Seller</Title>
      <SubTitle>지금 가장 인기 있는</SubTitle>
      <MoreView href={'/'}>
        MORE VIEWS
        <ArrowIcon />
      </MoreView>

      <ProductList>
        {productData
          .filter((product) => product.best === true)
          .slice(0, 8)
          .map((item, idx) => (
            <ProductItem key={idx} data={item} />
          ))}
      </ProductList>
    </Wrapper>
  );
};

export default BestSeller;

const Wrapper = styled.section`
  width: 100%;
  max-width: 1660px;
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

  ${theme.typography.h4}
  margin-bottom: 4px;

  ${theme.devices.mobile} {
    ${theme.typography.h4}
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${theme.devices.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const MoreView = styled(Link)`
  display: flex;
  gap: 10px;
  justify-content: end;
  color: ${theme.colors.grayFontColor};
  margin-bottom: 16px;

  ${theme.devices.mobile} {
    font-size: 13px;
  }
`;
