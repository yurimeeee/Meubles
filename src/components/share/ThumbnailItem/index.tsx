'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import theme from '@styles/theme';

import { MediumFont, RegularFont } from '@components/styled/StyledComponents';
import { Product } from '@utils/productData';
import { numberFormatter } from '@utils/formatter';

type ThumbnailItemProps = {
  data: Product;
};

const ThumbnailItem = ({ data }: ThumbnailItemProps) => {
  return (
    <Wrapper href={`/product/${data.id}`}>
      <MainImg src={data?.mainImg} alt={data?.name} />
    </Wrapper>
  );
};

export default ThumbnailItem;

const Wrapper = styled(Link)`
  width: 100%;
  max-width: 140px;
  background: ${theme.colors.whiteColor};
  transition: 0.5s;
  overflow: hidden;
  aspect-ratio: 1/1;

  &:hover {
    box-shadow: 0 0 0 1.5px ${theme.colors.grayBorderColor};
  }
`;
const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;

  &:hover {
    transform: scale(1.04);
  }
`;
