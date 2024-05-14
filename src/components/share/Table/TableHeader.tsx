import React from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import StyledCheckbox from '@components/styled/StyledCheckbox';

export type HeaderType = {
  label: string;
  minWidth?: number;
  width: number;
};

type TableRowProps = {
  headers: HeaderType[];
  checkAllItems?: () => void;
  allItemsChecked?: boolean;
};

const TableHeader = ({ headers = [], checkAllItems, allItemsChecked }: TableRowProps) => {
  return (
    <Wrapper>
      <TableCell $minWidth={45} $width={3}>
        <StyledCheckbox checkboxId="1" checked={allItemsChecked} onChange={checkAllItems} />
      </TableCell>
      {headers.slice(1).map((header: HeaderType, index: number) => {
        return (
          <TableCell key={`${index}-table-header`} $minWidth={header?.minWidth} $width={header.width}>
            {header.label}
          </TableCell>
        );
      })}
    </Wrapper>
  );
};

export default TableHeader;

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 3px solid ${theme.colors.blackColor};
  border-bottom: 1px solid ${theme.colors.blackColor};
  width: 100%;
  max-width: 1280px;
  min-width: 1080px;
`;
const TableCell = styled.div<{ $minWidth?: number; $width: number; $fontColor?: string }>`
  min-width: ${({ $minWidth }) => $minWidth}px;
  flex: ${({ $minWidth }) => ($minWidth ? 0 : 1)};
  width: ${({ $width }) => $width}%;
  text-align: center;
  font-family: 'AppleSDGothicNeoRegular';
  color: ${({ $fontColor }) => ($fontColor ? $fontColor : theme.colors.blackColor)};
`;
