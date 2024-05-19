"use client";

import styled, { keyframes, css } from "styled-components";
import theme from "@styles/theme";
import { RegularFont, SemiBoldFont } from "@components/styled/StyledComponents";
import Link from "next/link";


export const Wrapper = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 20px;

  ${theme.devices.desktop} {
    padding: 60px 0;
  } 

  ${theme.devices.mobile} {
    padding: 30px 20px;
  } 
`;
export const Setting = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 30px;
  border-top: 1px solid ${theme.colors.blackColor};
  border-bottom: 1px solid ${theme.colors.blackColor};
`;
export const MyAccount = styled(SemiBoldFont)`
 ${theme.typography.h5}
`;
export const Welcome = styled(RegularFont)`
 ${theme.typography.body}
`;
export const SettingLink = styled(Link)`
 ${theme.typography.sm}
`;

export const CategoryList = styled.ul`
  display: flex;
  gap: 20px;
  margin-top: 50px;
  margin-bottom: 40px;

  ${theme.devices.mobile} {
    margin-bottom: 16px;
    gap: 6px 20px;
    flex-wrap: wrap;
  }
`;
export const CategoryItem = styled.li<{ $Active: boolean }>`
  ${theme.typography.h7};
  color: ${({ $Active }) => ($Active ? theme.colors.blackColor : theme.colors.grayFontColor)};
  transition: 0.3s;
  cursor: pointer;

  ${theme.devices.mobile} {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;
export const ActiveBar = styled.div<{ $Active: boolean }>`
  width: 0px;
  height: 1.5px;
  bottom: -2px;
  transition: 0.3s ease-out;
  ${({ $Active }) =>
    $Active &&
    css`
      width: 100%;
      background-color: ${theme.colors.blackColor}}
    `};
`;