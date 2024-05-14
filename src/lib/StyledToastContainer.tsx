'use client';

import React, { ReactNode, useMemo } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import styled, { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import GlobalStyles from '@styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';

// 서버 사이드 렌더링 시, styled-components의 스타일을 관리하는 컴포넌트
export default ({ children }: { children: ReactNode }) => {
  // 서버 사이드 렌더링 시, StyleSheetManager와 함께 전역 스타일과 자식 컴포넌트를 렌더링
  return <StyledToastContainer position="top-center" autoClose={3000} hideProgressBar={true} closeOnClick={true} pauseOnHover={false} limit={1} />;
};

export const StyledToastContainer = styled(ToastContainer)`
  margin-top: 60px;
  .Toastify__toast {
    background-color: black;
    color: white;
  }
`;
