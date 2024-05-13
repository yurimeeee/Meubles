'use client';

import React, { ReactNode, useMemo } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import GlobalStyles from '@styles/GlobalStyles';

// 서버 사이드 렌더링 시, styled-components의 스타일을 관리하는 컴포넌트
export default ({ children }: { children: ReactNode }) => {
  // styled-components의 ServerStyleSheet 인스턴스를 생성
  const styledComponentsStyleSheet = useMemo(() => new ServerStyleSheet(), []);

  // 서버 사이드 렌더링 시, 서버에서 삽입된 HTML을 처리하는 훅
  useServerInsertedHTML(() => {
    // styled-components의 스타일 요소를 가져와서 변수에 저장
    const styles = styledComponentsStyleSheet.getStyleElement();
    // styled-components의 스타일 요소를 비우는 메서드 호출
    styledComponentsStyleSheet.instance.clearTag();

    // 테마를 적용한 스타일 요소와 함께 ThemeProvider로 감싸서 반환
    return <ThemeProvider theme={theme}>{styles}</ThemeProvider>;
  });

  // 클라이언트에서 렌더링되는 경우, ThemeProvider만으로 감싸서 자식 컴포넌트 렌더링
  if (typeof window !== 'undefined') {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  // 서버 사이드 렌더링 시, StyleSheetManager와 함께 전역 스타일과 자식 컴포넌트를 렌더링
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  );
};
