"use client";

import styled from "styled-components";
import theme from "@styles/theme";
import { BoldFont, MediumFont } from "@components/styled/StyledComponents";

export const Wrapper = styled.div`
  display: flex;
  max-width:1080px;
  min-height: 1000px;
  /* padding-top: 100px; */
  margin:  0 auto;

  padding: 100px 20px 0;
  display: flex;
  justify-content: center;
  gap: 40px;

  ${theme.devices.desktop} {
    padding: 100px 0 0;
    gap: 60px;
  }
`;
export const Info = styled.div`
  padding-left: 92px;

  ${theme.devices.tablet} {
    padding-left: 32px;
  }
  ${theme.devices.mobile} {
    padding-left: 0;
  }
`;
export const ImgBox = styled.div`
  width: 100%;
  max-width: 460px;
  min-width: 310px;
`;
export const MainWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${theme.colors.whiteColor};
  margin-bottom: 10px;
`;
export const MainImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
`;
export const SubImgList = styled.div`
  width: 100%;
  display: flex;
  gap:10px;

  .swiper-slide{
    width: 100%;
    max-width: 117px;
    min-width: 70px;
  }

  ${theme.devices.mobile} {
    .swiper-slide{
    width: 100%;
    max-width: 70px;
    }
  }
`;
export const SubImg = styled.img`
  flex: 1;
  width: 100%;
  max-width: 117px;
  min-width: 70px;
  object-fit: cover;
  background: ${theme.colors.whiteColor};
  aspect-ratio: 1/1;
`;
export const Brand = styled(MediumFont)`
  ${theme.typography.h7}
`;
export const Name = styled(BoldFont)`
  ${theme.typography.h4};
  white-space: pre-wrap;
  margin: 4px 0 16px;

  ${theme.devices.tablet} {
    ${theme.typography.h5};
  }
  ${theme.devices.mobile} {
    ${theme.typography.h5};
  }
`;
export const Price = styled(MediumFont)`
  ${theme.typography.h6}
  margin-bottom: 108px;

  ${theme.devices.tablet} {
    ${theme.typography.h7}
    margin-bottom: 58px;
  }
  ${theme.devices.mobile} {
    ${theme.typography.h7}
    margin-bottom: 58px;
  }
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
