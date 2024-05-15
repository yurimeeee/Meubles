"use client";

import styled from "styled-components";
import { RegularFont, SemiBoldFont } from "@components/styled/StyledComponents";
import theme from "@styles/theme";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px 0;

  ${theme.devices.desktop} {
    padding: 100px 0 0;
  }
`;
export const NoResults = styled(RegularFont)`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;
export const PCCart = styled.div`
  display: block;

${theme.devices.mobile} {
  display: none;
}
`;
export const MobileCart = styled.div`
  /* display: none; */
  width: 100%;
  max-width: 1280px;

  ${theme.devices.mobile} {
    /* display: block; */
  }

`;
export const CartList = styled.div`
 >div:last-child{
  border-bottom: 2px solid ${theme.colors.blackColor};
 }
`;
export const CartListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  border-top: 1px solid ${theme.colors.blackColor};
  border-bottom: 1px solid ${theme.colors.blackColor};

  >div:first-child{
    flex:1;
  }
`;
export const AmountPayment = styled.div`
 >div:last-child{
  border-bottom: 2px solid ${theme.colors.blackColor};
  padding-bottom: 60px;
 }
`;
export const RowFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 10px;
`;
export const TotalPrice = styled(RowFlex)`
  height: 50px;
  border-bottom: 1.5px solid ${theme.colors.grayBorderColor};
`;
export const RowTitle = styled(RegularFont)`
  color: ${theme.colors.grayFontColor} !important;
  ${theme.typography.body}; 
`;
export const RowText = styled(SemiBoldFont)`
  ${theme.typography.body}; 
`;