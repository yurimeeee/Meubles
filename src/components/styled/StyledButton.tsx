'use client';

import React, { ReactNode } from 'react';

import styled from 'styled-components';

import { darken, lighten } from 'polished';

import theme from '@styles/theme';

interface StyledButtonProps {
  CREATE?: boolean;
  loading?: boolean;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  fontColor?: string;
  lineHeight?: number;
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: number;
  bgColor?: string;
  cursor?: string;
  title?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
}

interface IButton {
  $width?: number | string;
  $height?: number | string;
  $fontSize?: number;
  $fontFamily?: string;
  $fontWeight?: number;
  $fontColor?: string;
  $padding?: string;
  $lineHeight?: number;
  $border?: string;
  $borderRadius?: number;
  $margin?: string;
  $bgColor?: string;
  $cursor?: string;
}

const Button = styled.button<IButton>`
  position: relative;
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  height: ${({ $height }) => $height}px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  line-height: ${({ $lineHeight }) => $lineHeight}px;
  font-family: ${({ $fontFamily }) => $fontFamily};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: ${({ $fontColor }) => $fontColor};
  padding: ${({ $padding }) => $padding};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  margin: ${({ $margin }) => $margin};
  background-color: ${({ $bgColor }) => $bgColor};
  cursor: ${({ $cursor }) => $cursor};

  &:hover {
    background-color: ${({ disabled, $bgColor }) => !disabled && ($bgColor === '#FFFFFF' ? theme.colors.whiteColor : lighten(0.01, $bgColor ?? theme.colors.blackColor))};
    opacity: 0.6;
  }

  &:active {
    background-color: ${({ disabled, $bgColor }) => !disabled && darken(0.1, $bgColor ?? theme.colors.blackColor)};
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 12px;
`;

const StyledButton = ({
  loading,
  width,
  height = 50,
  fontSize = 14,
  lineHeight,
  fontWeight = 400,
  fontFamily = 'PretendardRegular',
  fontColor = theme.colors.blackColor,
  padding = '0 16px',
  margin = '0',
  border = 'none',
  borderRadius = 0,
  bgColor = theme.colors.whiteColor,
  cursor = 'pointer',
  title = '',
  icon,
  type = 'button',
  disabled = false,
  onClick = () => null,
}: StyledButtonProps) => {
  return (
    <Button
      type={type}
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $lineHeight={lineHeight}
      $fontFamily={fontFamily}
      $fontColor={fontColor}
      $padding={padding}
      $margin={margin}
      $border={border}
      $borderRadius={borderRadius}
      $bgColor={bgColor}
      $cursor={cursor}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {title}
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {/*{loading*/}
      {/*    ? <Loader BUTTON />*/}
      {/*    : title*/}
      {/*}*/}
    </Button>
  );
};

export default React.memo(StyledButton);
