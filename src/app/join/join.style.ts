"use client";

import { RegularFont } from "@components/styled/StyledComponents";
import theme from "@styles/theme";
import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  padding-top: 100px;

${theme.devices.mobile} {
  padding: 60px 20px 0;
  max-width: calc(100vh - 40px);
}
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 60px;
`;
export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.blackColor};
`;
export const Terms = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 8px;
  width: 100%;
  margin: 8px 0;
  padding: 20px 0;
  border-top: 2px solid ${theme.colors.blackColor};
`;
export const Modal = styled.div`
  z-index: 1000;
  /* width: 100vw;
  height: 100vh; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #7f8186;
`;
export const ModalTitle = styled(RegularFont)`
  text-align: center;
  margin: 0;
  height: 40px;
  padding: 0 35px 0 18px;
  color: ${theme.colors.whiteColor} !important;
  font-size: 14px;
  line-height: 40px;
  background-color: ${theme.colors.grayFontColor};
  font-weight: 400;
`;
export const ModalClose = styled.span`
  position: absolute;
  right: 12px;
  top: 12px;
  color: ${theme.colors.whiteColor};
`;

export const AddressWrap = styled.div``;



