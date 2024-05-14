'use client';

import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import theme from '@styles/theme';

import { FlexBox, MediumFont, RegularFont } from '@components/styled/StyledComponents';
import { Product } from '@utils/productData';

import PlusIcon from '@assets/icons/PlusIcon';
import MinusIcon from '@assets/icons/MinusIcon';

type QuantitySelectProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  buttonSize?: number;
  fontSize?: number;
  margin?: string;
  onChangeQuantity?: (selectId: number, newQuantity: number) => void;
  selectId?: number;
  isGroup?: boolean;
};

const QuantitySelect = ({ quantity, setQuantity, buttonSize, fontSize, margin, onChangeQuantity, selectId, isGroup }: QuantitySelectProps) => {
  return (
    <Wrapper $buttonSize={buttonSize} $margin={margin}>
      <Button
        $buttonSize={buttonSize}
        onClick={() => {
          // if (onChangeQuantity) {
          //   onChangeQuantity(selectId as number, quantity - 1);
          // } else {
          setQuantity(quantity - 1);
          // }
        }}
      >
        <MinusIcon />
      </Button>
      <Number $buttonSize={buttonSize} $fontSize={fontSize}>
        {quantity}
      </Number>
      <Button
        $buttonSize={buttonSize}
        onClick={() => {
          // if (onChangeQuantity) {
          //   onChangeQuantity(selectId as number, quantity + 1);
          // } else {
          setQuantity(quantity + 1);
          // }
        }}
      >
        <PlusIcon />
      </Button>
    </Wrapper>
  );
};

export default QuantitySelect;

const Wrapper = styled.div<{ $buttonSize?: number; $margin?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize * 3}px` : '108px')};
  height: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize}px` : '36px')};
  margin: ${({ $margin }) => ($margin ? $margin : '0')};
  background: ${theme.colors.whiteColor};
  border: 1.5px solid ${theme.colors.grayBorderColor};
`;
const Number = styled.div<{ $buttonSize?: number; $fontSize?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize}px` : '36px')};
  height: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize}px` : '36px')};
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '16px')};
  border: 1.5px solid ${theme.colors.grayBorderColor};
`;
const Button = styled.button<{ $buttonSize?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize - 2}px` : '34px')};
  height: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize - 2}px` : '34px')};

  svg {
    width: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize / 2}px` : '22px')};
    height: ${({ $buttonSize }) => ($buttonSize ? `${$buttonSize / 2}px` : '22px')};
  }
`;
