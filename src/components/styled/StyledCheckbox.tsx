import React, { ChangeEvent, memo } from 'react';

import styled, { css } from 'styled-components';

import theme from '@styles/theme';

interface StyledCheckboxProps {
  label?: string;
  margin?: string;
  checkboxId?: string;
  value?: any;
  name?: string;
  borderColor?: string;
  bgColor?: string;
  fontColor?: string;
  // checked: boolean;
  checked: boolean | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const StyledCheckbox = ({ label, margin, borderColor, bgColor, fontColor, checkboxId, value, name = 'checkbox', checked, onChange = () => null }: StyledCheckboxProps) => {
  return (
    <Wrapper $margin={margin}>
      <Box>
        <Input id={checkboxId} type="checkbox" name={name} value={value} onChange={onChange} checked={checked} />
        <Label htmlFor={checkboxId} $checked={checked} $borderColor={borderColor} $bgColor={bgColor} $fontColor={fontColor}>
          {label}
        </Label>
      </Box>
    </Wrapper>
  );
};

export default memo(StyledCheckbox);

const Wrapper = styled.div<{ $margin?: string }>`
  height: 20px;
  display: flex;
  align-items: center;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;
const Box = styled.div`
  position: relative;
  margin-left: 22px;
`;
const Label = styled.label<{
  $margin?: string;
  $checked?: boolean;
  $borderColor?: string;
  $fontColor?: string;
  $bgColor?: string;
}>`
  font-size: 14px;
  font-family: PretendardRegular;
  color: ${({ $fontColor }) => ($fontColor ? $fontColor : theme.colors.darkFontColor)};
  padding-top: 2px;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  display: inline-block;
  cursor: pointer;

  &:before {
    content: '';
    display: inline-block;
    top: 4px;
    left: -18px;
    vertical-align: top;
    -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    z-index: 1;
    width: 8px;
    height: 4px;
    border-top-style: none;
    border-right-style: none;
    border-width: 1px;
    position: absolute;
    cursor: pointer;
  }

  &:after {
    content: '';
    border: 1px solid ${({ $borderColor }) => ($borderColor ? $borderColor : theme.colors.blackColor)};
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    margin-left: -16px;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease;
    left: -6px;
    top: 0;
    box-sizing: border-box;
    background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : theme.colors.lightGrayBgColor)};
  }

  ${({ $checked }) =>
    $checked &&
    css`
      &:before {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        border-bottom-style: solid;
        border-left-style: solid;
        border-color: ${({ theme }) => theme.colors.whiteColor};
      }

      &:after {
        border-color: ${({ theme }) => theme.colors.blackColor};
        background-color: ${({ theme }) => theme.colors.blackColor};
      }
    `}
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: auto;
  z-index: -1;
`;
