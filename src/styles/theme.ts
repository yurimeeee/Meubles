"use client";

import { DefaultTheme } from "styled-components";
// import media from './media';
export type ColorsTypes = typeof colors;
export type DeviceTypes = typeof devices;
export type TypographyTypes = typeof typography;

const typography = {
  h1: {
    fontSize: "48px",
    lineHeight: "56px",
  },
  h2: {
    fontSize: "40px",
    lineHeight: "48px",
  },
  h3: {
    fontSize: "32px",
    lineHeight: "40px",
  },
  h4: {
    fontSize: "28px",
    lineHeight: "36px",
  },
  h5: {
    fontSize: "24px",
    lineHeight: "32px",
  },
  h6: {
    fontSize: "20px",
    lineHeight: "28px",
  },
  body: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  sm: {
    fontSize: "14px",
    lineHeight: "20px",
  },
};

const colors = {
  // General
  whiteColor: "#FFFFFF",
  blackColor: "#000000",
  primaryColor: "#729BF1",

  // Font    
  // grayFontColor: "#6D737F",
  grayFontColor: "#8E8E8E",
  deepGrayFontColor: "#6E6E6E",
  darkGrayFontColor: "#565656",
  lightGrayFontColor: "#B3B3B3",
  ultraLightGrayFontColor: "#8A8A8A",
  darkFontColor: "#1D2433",

  // Border
  grayBorderColor: "#D0D0D0",

  // Icon
  grayIconColor: "#A3A3A3",

  // Background
  lightGrayBgColor: "#F4F4F4",
  greyBgColor: "#DEDCDA",
  wramGreyBgColor: "#C9C5BE",
  loadingBgColor: "#ECECEC",
};

const deviceSizes = {
  mobile: 320,
  tablet: 720,
  notebook: 1080,
  desktop: 1280,
};
const devices = {
  mobile: `@media screen and (max-width: ${deviceSizes.tablet - 1}px)`,
  tablet: `@media screen and (min-width: ${deviceSizes.tablet}px) and (max-width: ${deviceSizes.notebook - 1}px)`,
  notebook: `@media screen and (min-width: ${deviceSizes.notebook}px) and (max-width: ${deviceSizes.desktop - 1}px)`,
  desktop: `@media screen and (min-width: ${deviceSizes.desktop}px)`,
};


const theme: DefaultTheme = {
  colors,
  typography,
  devices
};

export default theme;
