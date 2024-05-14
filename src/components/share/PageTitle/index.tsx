'use client';

import styled from 'styled-components';
import { BoldFont } from '@components/styled/StyledComponents';
import theme from '@styles/theme';

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default PageTitle;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 100px;

  ${theme.devices.mobile} {
    padding-top: 32px;
  }
`;
const Title = styled(BoldFont)`
  font-size: 128px;
  text-align: center;
  margin-bottom: 100px;
  line-height: 1.4;

  ${theme.devices.tablet} {
    font-size: 72px;
  }
  ${theme.devices.mobile} {
    font-size: 56px;
    margin-bottom: 32px;
  }
`;
