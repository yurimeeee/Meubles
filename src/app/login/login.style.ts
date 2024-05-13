"use client";

import styled from "styled-components";
import Link from "next/link";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  margin: 0 auto;
  padding-top: 200px;
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


