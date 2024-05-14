import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '@styles/theme';

type BlankLoaderProps = {
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
};

const BlankLoader = ({ width, height, mobileWidth, mobileHeight }: BlankLoaderProps) => {
  return (
    <Wrapper $height={height} $width={width} $mobileHeight={mobileHeight} $mobileWidth={mobileWidth}>
      <Loader $width={width} $mobileWidth={mobileWidth} />
    </Wrapper>
  );
};

export default BlankLoader;

export const Wrapper = styled.div<{ $height?: number; $width?: number; $mobileWidth?: number; $mobileHeight?: number }>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: start;

  ${theme.devices.mobile} {
    width: ${({ $mobileWidth }) => ($mobileWidth ? `${$mobileWidth}px` : '100%')};
  }
`;

export const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const Loader = styled.div<{ $width?: number; $mobileWidth?: number }>`
  width: 100%;
  min-width: ${({ $width }) => $width}px;
  height: 100%;
  background: ${theme.colors.loadingBgColor};
  border-radius: 6px;
  animation: ${blinkAnimation} 1s infinite;

  ${theme.devices.mobile} {
    min-width: ${({ $mobileWidth }) => $mobileWidth}px;
  }
`;
