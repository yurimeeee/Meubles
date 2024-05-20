"use client";

import styled from "styled-components";
import { MediumFont, RegularFont, SemiBoldFont } from "@components/styled/StyledComponents";
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
  height: 200px;
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
  width: 100%;
  min-height: 200px;
  
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
  width: 100%;
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

  ${theme.devices.mobile} {
    ${theme.typography.sm}; 
  }
`;
export const RowText = styled(SemiBoldFont)`
  ${theme.typography.body}; 
  
  ${theme.devices.mobile} {
    ${theme.typography.sm}; 
  }
`;
export const CartListItem = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;

  ${theme.devices.mobile} {
    gap: 10px;
  }
`;
export const Img = styled.img`
  max-width: 72px;
  aspect-ratio: 1/1;
  object-fit: cover;
  background: ${theme.colors.whiteColor};
`;
export const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const Brand = styled(MediumFont)`
  font-size: 12px;
  text-decoration: underline;
  margin-bottom: 2px;
`;
export const ProductName = styled(SemiBoldFont)`
  font-size: 13px;
  white-space: pre-wrap;
`;
export const Price = styled(RegularFont)`
  font-size: 13px;
  white-space: pre-wrap;
`;
export const PaymentList = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  >div:first-child{
  border-top: 2px solid ${theme.colors.blackColor};
  padding-top: 16px;
 }
 >div:last-child{
  border-bottom: 2px solid ${theme.colors.blackColor};
  padding-bottom: 16px;
 }
`;
export const ShippingInfo = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 40px;
`;