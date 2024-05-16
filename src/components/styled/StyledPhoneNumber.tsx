import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';

import StyledInput from './StyledInput';
import { BoldFont } from './StyledComponents';

type StyledPhoneNumberProps = {
  width?: number;
  height?: number;
  title?: string;
  name: string;
  margin?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const StyledPhoneNumber = ({ width = 440, height = 50, title, margin, value, onChange }: StyledPhoneNumberProps) => {
  const [number1, setNumber1] = useState('010');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');

  useEffect(() => {
    if (value) {
      setNumber1(value.substring(0, 3));
      setNumber2(value.substring(3, 7));
      setNumber3(value.substring(7, 11));
    }
  }, [value]);

  console.log(setNumber1, setNumber2, setNumber3);
  const onChangeNumber = useCallback(
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length <= 4) {
        switch (name) {
          case 'num1':
            setNumber1(value);
            break;
          case 'num2':
            setNumber2(value);
            break;
          case 'num3':
            setNumber3(value);
            break;
          default:
            break;
        }
      }
    },
    []
  );

  useEffect(() => {
    const phoneNumber = `${number1}${number2}${number3}`;

    onChange({
      target: {
        name: 'phone',
        value: phoneNumber,
      },
    } as ChangeEvent<HTMLInputElement>);
  }, [number1, number2, number3]);

  return (
    <Wrapper $width={width} $margin={margin}>
      {title && <Title>{title}</Title>}
      <InputWrap>
        <StyledInput type="number" margin="none" name="num1" value={number1} onChange={onChangeNumber('num1')} placeholder="010" />
        <Hyphen>-</Hyphen>
        <StyledInput type="number" margin="none" name="num2" value={number2} onChange={onChangeNumber('num2')} />
        <Hyphen>-</Hyphen>
        <StyledInput type="number" margin="none" name="num3" value={number3} onChange={onChangeNumber('num3')} />
      </InputWrap>
    </Wrapper>
  );
};

export default React.memo(StyledPhoneNumber);

const Wrapper = styled.div<{ $width?: number; $margin?: string }>`
  margin: 12px 0;
  display: flex;
  align-items: center;
`;
const Title = styled(BoldFont)`
  min-width: 180px;
  margin-bottom: 8px;
  line-height: 19px;
`;
const Hyphen = styled.span`
  text-align: center;
  color: ${theme.colors.grayFontColor};
`;
const InputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  * {
    margin: 0;
  }

  input {
    flex: 1;
  }
`;
