'use client';

import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import { darken, transparentize } from 'polished';

type FontType = {
  $fontSize?: number;
  $lineHeight?: number;
  $fontColor?: string;
  $margin?: string;
};

type FlexBoxType = {
  $flex?: number;
  $flexDirection?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $gap?: string;
  $margin?: string;
  $border?: string;
  $maxWidth?: number
};

type WrapperType = {
  $width?: number;
  $height?: number;
  $maxWidth?: number;
  $margin?: string;
  $padding?: string;
};

export const BoldFont = styled.div<FontType>`
  color: ${({ $fontColor, theme }) => ($fontColor ? $fontColor : theme.colors.blackColor)} !important;
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '16px')};
  line-height: ${({ $lineHeight }) => ($lineHeight ? `${$lineHeight}px` : '1.4')};
  font-family: 'AppleSDGothicNeoB', 'SF Pro Display', sans-serif;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;
export const SemiBoldFont = styled.div<FontType>`
  color: ${({ $fontColor, theme }) => ($fontColor ? $fontColor : theme.colors.blackColor)}!important;
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '16px')};
  line-height: ${({ $lineHeight }) => ($lineHeight ? `${$lineHeight}px` : '1.4')};
  font-family: 'AppleSDGothicNeoSB', 'SF Pro Display', sans-serif;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;
export const MediumFont = styled.div<FontType>`
  color: ${({ $fontColor, theme }) => ($fontColor ? $fontColor : theme.colors.blackColor)}!important;
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '16px')};
  line-height: ${({ $lineHeight }) => ($lineHeight ? `${$lineHeight}px` : '1.4')};
  font-family: 'AppleSDGothicNeoM', 'SF Pro Display', sans-serif;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;
export const RegularFont = styled.div<FontType>`
  color: ${({ $fontColor, theme }) => ($fontColor ? $fontColor : theme.colors.blackColor)}!important;
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '16px')};
  line-height: ${({ $lineHeight }) => ($lineHeight ? `${$lineHeight}px` : '1.4')};
  font-family: 'AppleSDGothicNeoR', 'SF Pro Display', sans-serif;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;
// export const LightFont = styled.div<FontType>`
//   color: ${({ $fontColor, theme }) => ($fontColor ? $fontColor : theme.colors.blackColor)} !important;
//   font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '16px')};
//   line-height: ${({ $lineHeight }) => ($lineHeight ? `${$lineHeight}px` : '1.4')};
//   font-family: 'PretendardLight', 'SF Pro Display', sans-serif;
//   margin: ${({ $margin }) => ($margin ? $margin : 0)};
// `;
export const FlexBox = styled.div<FlexBoxType>`
  display: flex;
  flex: ${({ $flex }) => ($flex ? $flex : 1)};
  flex-direction: ${({ $flexDirection }) => ($flexDirection ? $flexDirection : 'row')};
  align-items: ${({ $alignItems }) => ($alignItems ? $alignItems : 'center')};
  justify-content: ${({ $justifyContent }) => ($justifyContent ? $justifyContent : 'flex-start')};
  gap: ${({ $gap }) => ($gap ? $gap : 0)};
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  border: ${({ $border }) => ($border ? '1px solid red' : 'none')};
  position: relative;
  width: 100%;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : '100%')};
`;

export const Wrapper = styled.div<WrapperType>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : '1440px')};
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
  margin: ${({ $margin }) => ($margin ? $margin : '0 auto')};
  padding: ${({ $padding }) => ($padding ? $padding : '0 auto')};
`;
export const NoResults = styled(RegularFont)`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;