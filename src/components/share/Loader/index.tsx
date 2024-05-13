import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import theme from '@styles/theme';

type LoaderProps = {
  BUTTON?: boolean;
  height?: string;
};

const Loader = ({ BUTTON, height }: LoaderProps) => {
  return (
    <Wrapper $height={height}>
      <LoaderBox $button={BUTTON} />
    </Wrapper>
  );
};

export default Loader;

export const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
export const Wrapper = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${({ $height }) => ($height ? $height : '100%')};
  display: flex;
  justify-content: center;
  align-items: start;
  /* margin: 32px 0; */
`;
export const LoaderBox = styled.div<{ $button?: boolean }>`
  width: 50px;
  height: 50px;
  border: 3px solid ${theme.colors.grayIconColor};
  border-top: 3px solid ${theme.colors.grayFontColor};
  border-radius: 50%;
  animation: ${Spin} 1.3s linear infinite;
  /* margin-top: 100px; */
  margin: auto 0;

  ${({ $button }) =>
    $button &&
    css`
      width: 28px;
      height: 28px;
      border-width: 3px;
      margin-top: 10px;
    `};
`;
