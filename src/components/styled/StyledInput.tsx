'use client';

import React, { ChangeEvent, ForwardedRef, forwardRef, KeyboardEvent, RefObject } from 'react';
import styled, { css } from 'styled-components';

// import FileSVG from "@assets/icons/FileSVG";

import theme from '@styles/theme';
import { flex } from '@styles/variables';

interface StyledInputProps {
  width?: number;
  height?: number;
  margin?: string;
  readOnly?: boolean;
  fontSize?: number;
  lineHeight?: number;
  padding?: string;
  border?: boolean;
  responsive?: boolean;
  type?: string;
  name?: string;
  value?: string | number;
  oninput?: any;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: any;
  onBlur?: any;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: boolean;
  autoFocus?: boolean;
  ref?: RefObject<HTMLInputElement>;
}

const StyledInput = forwardRef(
  (
    {
      readOnly,
      width,
      height,
      fontSize,
      lineHeight,
      margin,
      padding,
      border,
      oninput,
      responsive,
      type = 'text',
      name,
      value,
      onChange,
      onClick,
      onKeyUp,
      onKeyPress,
      onFocus,
      autoFocus,
      onBlur,
      maxLength,
      placeholder,
      required = false,
      icon,
      disabled,
    }: StyledInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return icon ? (
      <Label $bordered={border}>
        <Input
          $padding={padding}
          $bordered={border}
          $disabled={disabled}
          type={type}
          name={name}
          value={value}
          onInput={oninput}
          onChange={onChange}
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          required={required}
          placeholder={placeholder}
          autoFocus={autoFocus}
          ref={ref}
        />
        <div onClick={onClick}>{/* <FileSVG /> */}</div>
      </Label>
    ) : (
      <Input
        $width={width}
        $height={height}
        $fontSize={fontSize}
        $lineHeight={lineHeight}
        $margin={margin}
        $padding={padding}
        $bordered={border}
        $responsive={responsive}
        $readOnly={readOnly}
        $disabled={disabled}
        onInput={oninput}
        onClick={onClick}
        readOnly={readOnly}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        autoFocus={autoFocus}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        ref={ref}
      />
    );
  }
);

export default StyledInput;

const Label = styled.label<{ $bordered?: boolean }>`
  ${theme.typography.bm}
  ${flex({ justify: 'space-between' })}
  width: 100%;
  height: 50px;
  padding: 14px 12px;
  /* border: 1px solid ${theme.colors.grayBorderColor}; */
  position: relative;
  color: ${({ theme }) => theme.colors.deepGrayFontColor};
`;

const Input = styled.input<{
  $width?: number;
  $margin?: string;
  $height?: number;
  $padding?: string;
  $bordered?: boolean;
  $responsive?: boolean;
  $disabled?: boolean;
  $fontSize?: number;
  $lineHeight?: number;
  $readOnly?: boolean;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  height: ${({ $height }) => ($height ? `${$height}px` : '48px')};
  padding: ${({ $padding }) => ($padding ? $padding : '14px 12px')};
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  border-bottom: ${({ $bordered }) => ($bordered ? 'none' : `1px solid ${theme.colors.blackColor}`)};
  /* border: ${({ $bordered }) => ($bordered ? `1px solid ${theme.colors.blackColor}` : 'none')}; */
  font-size: ${({ $fontSize }) => $fontSize && `${$fontSize}px`};
  line-height: ${({ $lineHeight }) => $lineHeight && `${$lineHeight}px`};
  /* background-color: ${({ $readOnly, $disabled }) => ($readOnly || $disabled ? '#f2f2f2' : theme.colors.whiteColor)}; */
  color: ${({ $readOnly, $disabled }) => ($readOnly || $disabled ? theme.colors.deepGrayFontColor : theme.colors.blackColor)};
  position: ${({ type }) => (type === 'file' ? 'absolute' : 'static')};

  transition: 0.3s;

  &::placeholder {
    font-size: ${({ $fontSize }) => $fontSize && `${$fontSize}px`};
    line-height: ${({ $lineHeight }) => $lineHeight && `${$lineHeight}px`};
  }

  ${({ $responsive }) =>
    $responsive &&
    css`
      ${theme.devices.desktop} {
        ${theme.typography.bp}

        &::placeholder {
          ${theme.typography.bp}
        }
      }
    `};
`;
