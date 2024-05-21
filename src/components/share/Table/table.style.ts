import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import { MediumFont } from '@components/styled/StyledComponents';

export const TableBody = styled.div<{ $minHeight?: string }>`
  width: 100%;
  min-height: ${({ $minHeight }) => ($minHeight ? $minHeight : '300px')};
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.grayFontColor};
`;
export const TableRow = styled.div<{ $disabled?: boolean; $height?: number }>`
  /* height: 50px; */
  height: ${({ $height }) => $height ? `${$height}px` : '50px'};
  max-width: 1280px;
  /* min-width: 1080px; */
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.grayFontColor};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      & * {
        color: ${theme.colors.lightGrayFontColor};
      }
    `};
`;
export const CartTableRow = styled.div<{ $disabled?: boolean; $height?: number }>`
  /* height: 50px; */
  height: ${({ $height }) => $height ? `${$height}px` : '50px'};
  max-width: 1280px;
  /* min-width: 1080px; */
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $disabled }) =>
    $disabled &&
    css`
      & * {
        color: ${theme.colors.lightGrayFontColor};
      }
    `};
`;


export const TableCell = styled.div<{
  $minWidth?: number;
  $width: number;
  $flexDirection?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $padding?: string;
}>`
  min-width: ${({ $minWidth }) => $minWidth ? `${$minWidth}px` : 'auto'};
  flex: ${({ $minWidth }) => ($minWidth ? 0 : 1)};
  width: ${({ $width }) => $width}%;
  height: 100%;
  font-family: 'AppleSDGothicNeoRegular';
  display: flex;
  flex-direction: ${({ $flexDirection }) => ($flexDirection ? $flexDirection : 'row')};
  align-items: ${({ $alignItems }) => ($alignItems ? $alignItems : 'center')};
  justify-content: ${({ $justifyContent }) => ($justifyContent ? $justifyContent : 'start')};
  padding: ${({ $padding }) => ($padding ? $padding : '0')};
`;
export const TableFooter = styled.div<{ $minHeight?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: ${({ $minHeight }) => ($minHeight ? $minHeight : '60px')};
  border-top: 1px solid ${theme.colors.blackColor};
  border-bottom: 2px solid ${theme.colors.blackColor};

  *{
    display: inline-block;
  }
`;
export const TableText = styled.div`
  width: 92%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  text-align: center;

  a {
    cursor: pointer;

    /* &:hover {
      color: ${theme.colors.grayFontColor};
    } */
  }
`;
export const TableImg = styled.img`
  max-width:100px;
  aspect-ratio: 1/1;
  object-fit: cover;
  background: ${theme.colors.whiteColor};
  margin-right: 16px;
`;
export const ItemInfo = styled.div`
`;

export const Brand = styled(MediumFont)`
  font-size: 14px;
  text-decoration: underline;
`;
export const ProductName = styled(MediumFont)`
  font-size: 14px;
  white-space: pre-wrap;
`;

