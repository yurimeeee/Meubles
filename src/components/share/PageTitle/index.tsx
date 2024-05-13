'use client';

import styled from 'styled-components';
import { BoldFont } from '@components/styled/StyledComponents';

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
`;
const Title = styled(BoldFont)`
  font-size: 128px;
  text-align: center;
  margin-bottom: 100px;
`;
