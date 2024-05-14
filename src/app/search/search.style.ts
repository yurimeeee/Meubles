"use client";

import styled from "styled-components";
import theme from "@styles/theme";
import { BoldFont, RegularFont, SemiBoldFont } from "@components/styled/StyledComponents";


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
export const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${theme.devices.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export const Title = styled(BoldFont)`
  ${theme.typography.h3};
  margin-bottom: 60px;
`;
export const SearchInput = styled.div`
  display: flex;
  width: 100%;
  max-width: 760px;
  height: 50px;
  margin-bottom: 45px;
  border-bottom: 2px solid ${theme.colors.blackColor};
  svg {
    cursor: pointer;
  }
`;
export const Form = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
`;
export const Input = styled.input`
  width: 100%;
`;
export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  ${theme.devices.mobile} {
    margin-bottom: 4px;
  }
`;
export const ResultText = styled(RegularFont)`
  ${theme.typography.body}
  color: ${theme.colors.deepGrayFontColor} !important;

  ${theme.devices.mobile} {
    font-size: 14px;
  }
`;
export const ResultNumber = styled(SemiBoldFont)`
  ${theme.typography.body}
  /* color: ${theme.colors.grayFontColor} !important; */

  ${theme.devices.mobile} {
    font-size: 14px;
    line-height: 1.4;
  }
`;