"use client";

import styled from "styled-components";
import theme from "@styles/theme";
import { BoldFont, MediumFont } from "@components/styled/StyledComponents";

export const Wrapper = styled.div`
  display: flex;
  max-width:1280px;
  min-height: 1000px;
  padding-top: 100px;
  margin:  0 auto;
`;
export const Info = styled.div`
  padding-left: 72px;
`;
export const MainWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  min-height: 500px;
  background: ${theme.colors.whiteColor};
`;
export const MainImg = styled.img`
  width: 100%;
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
`;
export const SubImgList = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  gap:10px;

  .swiper-slide{
    width: 100%;
    max-width: 117px;
  }
`;
export const SubImg = styled.img`
  flex: 1;
  max-width: 117px;
  /* max-height: 117px; */
  object-fit: cover;
  aspect-ratio: 1/1;
  background: ${theme.colors.whiteColor};
`;
export const Brand = styled(MediumFont)`
  ${theme.typography.h7}
`;
export const Name = styled(BoldFont)`
  ${theme.typography.h4};
  white-space: pre-wrap;
  margin: 4px 0 16px;
`;
export const Price = styled(MediumFont)`
  ${theme.typography.h6}
  margin-bottom: 108px;
`;
export const TotalPrice = styled(MediumFont)`
  ${theme.typography.h6}
  margin: 20px 0 24px;
`;
export const AccordionWrap = styled.div`
 * {
  border: none !important;
  background: none;
  font-size: 14px;
  line-height: 1.4;
  }

  .MuiPaper-root.MuiPaper-elevation {
      max-width: 450px;
      border-bottom:  1px solid ${theme.colors.blackColor} !important;
      /* margin-top: 45px; */
    }
    .MuiCollapse-root.MuiCollapse-vertical{
      border-bottom:  1px solid ${theme.colors.blackColor} !important;
    }
    /* .MuiAccordionSummary-content{
      border-bottom:  1px solid ${theme.colors.blackColor} !important;
    } */
`;
export const RowFlex = styled.div`
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
`;
export const TextList = styled.div`
  display: flex;
  flex-direction:column;
  gap: 4px;
`;
export const DetailTitle = styled.div`
  display: flex;
  min-width: 64px;
  font-weight: 500;
`;
export const DetailText = styled.div`
  display: flex;
`;
