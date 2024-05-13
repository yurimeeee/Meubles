"use client";

import styled from "styled-components";
import { RegularFont } from "@components/styled/StyledComponents";
import theme from "@styles/theme";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 100px;
`;
export const NoResults = styled(RegularFont)`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;


