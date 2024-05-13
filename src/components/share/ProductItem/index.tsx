'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import theme from '@styles/theme';

import Image from 'next/image';
import { FlexBox, MediumFont, RegularFont } from '@components/styled/StyledComponents';
import { Product } from '@utils/productData';
import { numberFormatter } from '@utils/formatter';

type ProductItem = {
  data: Product;
};

const ProductItem = ({ data }: ProductItem) => {
  return (
    <Wrapper href={`/product/${data.id}`}>
      <MainImg src={data?.mainImg} alt={data?.name} />
      <InfoWrap>
        <Brand>{data?.brand}</Brand>
        <ProductName>{data?.name}</ProductName>
        <Price>{numberFormatter(data?.price)}</Price>
      </InfoWrap>
    </Wrapper>
  );
};

export default ProductItem;

const Wrapper = styled(Link)`
  width: 100%;
  margin: 0 auto;
  position: relative;
  background: ${theme.colors.whiteColor};
  transition: 0.5s;
  overflow: hidden;
  aspect-ratio: 1/1;

  &:hover {
    box-shadow: 0 0 0 1.5px ${theme.colors.grayBorderColor};
  }
`;
const InfoWrap = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;
const Brand = styled(MediumFont)`
  font-size: 14px;
  text-decoration: underline;
`;
const ProductName = styled(MediumFont)`
  font-size: 14px;
  white-space: pre-wrap;
`;
const Price = styled(RegularFont)`
  font-size: 12px;
`;
const MainImg = styled.img`
  width: 100%;
  height: 100%;
  transition: 0.5s;

  &:hover {
    transform: scale(1.04);
  }
`;