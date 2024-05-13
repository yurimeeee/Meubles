"use client";

import styled, { keyframes } from "styled-components";
import theme from "@styles/theme";
import { BoldFont } from "@components/styled/StyledComponents";


export const Wrapper = styled.main`
  margin: 0 auto;
  padding: 60px 0;
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
