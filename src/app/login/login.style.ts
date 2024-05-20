"use client";

import styled from "styled-components";
import Link from "next/link";
import theme from "@styles/theme";
import { RegularFont } from "@components/styled/StyledComponents";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  margin: 0 auto;
  padding: 200px 0 0;

  ${theme.devices.mobile}{
    padding: 120px 20 0;
  }
  
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 20px;
`;
export const LinkButton = styled(Link)`
  font-size: 14px;
`;
export const Password = styled(RegularFont)`
  font-size: 14px;
  margin-top: 10px;
  color: ${theme.colors.grayFontColor};
  cursor: pointer;
`;


