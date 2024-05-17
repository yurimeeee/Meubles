"use client";

import styled, { keyframes } from "styled-components";
import theme from "@styles/theme";
import Image from "next/image";


export const Wrapper = styled.main`
  margin: 0 auto;
`;
const ImgMove = keyframes`
  0%{  transform: scale(1); }
  100% {  transform: scale(1.2); }
`;
export const MainImg = styled.div`
  width: 100%;
  /* min-width: 320px; */
  max-width: 1280px;
  height: 500px;
  position: relative;
  overflow: hidden;
  margin: 80px auto 160px;

  ${theme.devices.desktop}{
    height: 600px;
  }

&::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background-image: url("/images/main_img.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-color: inherit;
  animation: ${ImgMove} 6.0s forwards;
  animation-timing-function: linear;
}
`;
export const Banner = styled(Image)`
  width: 100vw;
  /* max-width: 1280px; */
  /* height: 362px; */
  height: auto;
  /* background-image: url("/images/banner.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-color: inherit; */

  ${theme.devices.desktop}{
    /* height: 600px; */
  }

`;
