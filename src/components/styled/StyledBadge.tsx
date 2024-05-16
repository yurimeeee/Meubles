'use client';

import React, { ReactNode } from 'react';

import styled from 'styled-components';

import { darken, lighten } from 'polished';

import theme from '@styles/theme';

interface StyledBadgeProps {
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: number;
  fontColor?: string;
  left?: number;
  top?: number;
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  bgColor?: string;
  text?: string | number;
}

interface BadgeProps {
  $width: number;
  $height: number;
  $fontSize?: number;
  $fontWeight?: number;
  $left?: number;
  $top?: number;
  $fontColor?: string;
  $padding?: string;
  $border?: string;
  $borderRadius?: string;
  $margin?: string;
  $bgColor?: string;
}

const StyledBadge = ({
  width = 14,
  height = 14,
  fontSize = 9,
  fontWeight = 400,
  fontColor = theme.colors.whiteColor,
  left = 0,
  top = 0,
  padding = '0',
  margin = '0',
  border = 'none',
  borderRadius = '50%',
  bgColor = theme.colors.blackColor,
  text = '',
}: StyledBadgeProps) => {
  return (
    <Badge
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $left={left}
      $top={top}
      $fontColor={fontColor}
      $padding={padding}
      $margin={margin}
      $border={border}
      $borderRadius={borderRadius}
      $bgColor={bgColor}
    >
      {text}
    </Badge>
  );
};

export default React.memo(StyledBadge);

const Badge = styled.span<BadgeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: ${({ $fontColor }) => $fontColor};
  padding: ${({ $padding }) => $padding};
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  margin: ${({ $margin }) => $margin};
  background: ${({ $bgColor }) => $bgColor};
  cursor: pointer;

  /* ${theme.devices.mobile} {
    width: ${({ $width }) => $width * 0.9}px;
    height: ${({ $height }) => $height * 0.9}px;
  } */
`;
