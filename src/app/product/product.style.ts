"use client";

import styled from "styled-components";

import { baseWrapperStyles } from "@styles/variables";
import theme from "@styles/theme";
import { BoldFont } from "@components/styled/StyledComponents";

export const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  /* padding: 100px 0; */

  /* ${theme.devices.desktop} {
    min-height: 50vh;
  }  */
`;
export const PageTitle = styled(BoldFont)`
  font-size: 128px;
  text-align: center;
  margin-bottom: 100px;
`;
