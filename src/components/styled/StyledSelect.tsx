import React, { ChangeEvent, ForwardedRef, forwardRef, RefObject } from 'react';

import styled, { css } from 'styled-components';
import theme from '@styles/theme';

import ChevronDown from '@assets/icons/chevron_down.svg';

interface StyledSelectProps {
  BORDER?: boolean;
  width?: number;
  margin?: string;
  name?: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  bgColor?: string;
  color?: string;
  heading2?: boolean;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  ref?: RefObject<HTMLSelectElement>;
}

const StyledSelect = forwardRef(
  (
    { BORDER, width, margin, name, heading2, value, onChange, bgColor, color, options, placeholder, required = false, disabled }: StyledSelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <Select
        $border={BORDER}
        $width={width}
        $margin={margin}
        $bgColor={bgColor}
        $color={color}
        $heading2={heading2}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    );
  }
);

export default StyledSelect;

const Select = styled.select<{
  $border?: boolean;
  $width?: number;
  $margin?: string;
  $bgColor?: string;
  $heading2?: boolean;
  $color?: string;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  height: 40px;
  padding: 8px 12px;
  /* padding: 14px 12px; */
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  /* border: 1px solid ${theme.colors.blackColor}; */
  color: ${({ $bgColor }) => ($bgColor ? $bgColor : theme.colors.blackColor)};
  ${theme.typography.bm}

  background-image: url("/images/chevron_down.png");
  background-color: none;
  background-color: ${({ theme }) => theme.colors.lightGrayBgColor};
  background-repeat: no-repeat;
  background-position: right 12px center;

  ${({ $border, $color, $heading2 }) =>
    $border &&
    css`
      height: 50px;
      padding: 0;
      border: none;
      color: ${$color ? $color : theme.colors.deepGrayFontColor};
      ${$heading2 ? theme.typography.h2 : theme.typography.bm}

      background-image: url("/images/chevron_down.png");
      background-color: none;
      /* background-color: ${({ theme }) => theme.colors.whiteColor}; */
      background-repeat: no-repeat;
      background-position: right 0 center;
      background-size: 12px 6px;
    `};
`;
