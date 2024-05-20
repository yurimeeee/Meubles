'use client';

import { keyframes, styled } from 'styled-components';

import { flex } from '@styles/variables';

type LoaderProps = {
  color?: string;
};

const Loader = ({ color }: LoaderProps) => {
  return (
    <Container>
      <StyledSvg viewBox="25 25 50 50">
        <StyledCircle $color={color} r="20" cy="50" cx="50" />
      </StyledSvg>
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  ${flex({})}
  padding: 40px;
  /* height: 20vh; */
  min-height: 200px;
`;

const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
`;

const StyledSvg = styled.svg`
  width: 3.25em;
  transform-origin: center;
  animation: ${rotateAnimation} 2s linear infinite;
`;

const StyledCircle = styled.circle<{ $color?: string }>`
  fill: none;
  stroke: ${({ $color }) => ($color ? $color : 'hsl(0, 0%, 22.745098039215687%)')};
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ${dashAnimation} 1.5s ease-in-out infinite;
`;
