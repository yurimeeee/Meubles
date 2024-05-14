import React, { Dispatch, SetStateAction } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { statusMessage, getSubCategory } from '@utils/commons';
import { HeaderType } from '@components/share/Table/TableHeader';
import { TableRow, TableCell, TableText, TableImg, ItemInfo, ProductName } from '@components/share/Table/table.style';

import { MyEmployeeCardReq } from '@graphql/types';
import QuantitySelect from '@components/share/QuantitySelect';
import { Style } from '@mui/icons-material';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import { numberFormatter } from '@utils/formatter';
import { Brand } from '@app/product/[id]/productDetail.style';

type CartListTableProps = {
  headers: HeaderType[];
  item?: any;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  onChangeQuantity?: (selectId: number, newQuantity: number) => void;
  selectId?: number;
  isGroup?: boolean;
  handleCheckboxChange?: (id: number) => void;
  checkedList?: { id: number; checked: boolean }[];
};

const CartListTable = ({ headers = [], item, quantity, setQuantity, isGroup, onChangeQuantity, selectId, handleCheckboxChange, checkedList }: CartListTableProps) => {
  const router = useRouter();

  // const item = checkedList.find((item) => item.id === id);
  // if (item) {
  //   const isChecked = item.checked;
  //   // isChecked에 해당 객체의 checked 값을 사용할 수 있습니다.
  // }

  return (
    <TableRow $height={120} $disabled={item?.lrs_status === 'complete' || item?.lrs_status === 'reject' || item?.lrs_status === 'cancel'}>
      <TableCell $minWidth={headers[0].minWidth} $width={headers[0].width}>
        <TableText>
          <StyledCheckbox
            checkboxId={item.id}
            checked={checkedList?.find((check) => check.id === item.id)?.checked as boolean}
            // onChange={() => {
            //   console.log('checked');
            // }}
            onChange={() => {
              if (handleCheckboxChange) {
                handleCheckboxChange(item.id);
              }
            }}
            // onChange={() => handleCheckboxChange(item.id)}
          />
        </TableText>
      </TableCell>
      <TableCell
        $minWidth={headers[1].minWidth}
        $width={headers[1].width}
        onClick={() => {
          router.push(`/product/${item.id}`);
        }}
        $padding="10px 0"
      >
        <TableImg src={item.img} />
        <ItemInfo>
          <Brand>{item.brand}</Brand>
          <ProductName>{item.name}</ProductName>
        </ItemInfo>
        {/* <TableText>{item?.name}</TableText> */}
      </TableCell>
      <TableCell $minWidth={headers[2].minWidth} $width={headers[3].width} $padding="16px 0">
        <TableText>
          <QuantitySelect
            quantity={quantity}
            setQuantity={setQuantity}
            fontSize={13}
            buttonSize={24}
            margin="0 auto"
            onChangeQuantity={onChangeQuantity}
            selectId={selectId}
            isGroup={isGroup}
          />
        </TableText>
      </TableCell>
      <TableCell $minWidth={headers[3].minWidth} $width={headers[3].width} $padding="16px 0">
        <TableText>{numberFormatter(item.price * item.quantity)}</TableText>
      </TableCell>
      <TableCell $minWidth={headers[4].minWidth} $width={headers[4].width} $padding="16px 0">
        <TableText>{'-'}</TableText>
      </TableCell>
    </TableRow>
  );
};

export default CartListTable;
