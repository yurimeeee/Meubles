import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import theme from '@styles/theme';

type BlankLoaderProps = {
  width?: string;
  height?: string;
};

const BlankLoader = ({ width, height }: BlankLoaderProps) => {
  return (
    <Wrapper $height={height} $width={width}>
      <Loader />
    </Wrapper>
  );
};

export default BlankLoader;

export const Wrapper = styled.div<{ $height?: string; $width?: string }>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  /* height: ${({ $height }) => ($height ? $height : '100%')}; */
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 22px 0;
`;

export const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const Loader = styled.div<{ $minWidth?: number }>`
  width: 100%;
  /* min-width: ${({ $minWidth }) => $minWidth}px; */
  height: 100%;
  background: ${theme.colors.lightGrayBgColor};
  border-radius: 6px;
  animation: ${blinkAnimation} 1s infinite;
`;

// export const Spin = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// export const LoaderBox = styled.div<{ $button?: boolean }>`
//   width: 50px;
//   height: 50px;
//   border: 3px solid ${theme.colors.grayIconColor};
//   border-top: 3px solid ${theme.colors.grayFontColor};
//   border-radius: 50%;
//   animation: ${Spin} 1.3s linear infinite;
//   /* margin-top: 100px; */
//   margin: auto 0;

//   ${({ $button }) =>
//     $button &&
//     css`
//       width: 28px;
//       height: 28px;
//       border-width: 3px;
//       margin-top: 10px;
//     `};
// `;
