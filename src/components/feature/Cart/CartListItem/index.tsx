import React, { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import theme from '@styles/theme';

import { numberFormatter } from '@utils/formatter';
import QuantitySelect from '@components/share/QuantitySelect';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import { MediumFont, RegularFont, SemiBoldFont, FlexBox } from '@components/styled/StyledComponents';

type CartListItemProps = {
  item?: any;
  quantity?: number;
  setQuantity?: Dispatch<SetStateAction<number>>;
  onChangeQuantity?: (selectId: number, newQuantity: number) => void;
  selectId?: number;
  isGroup?: boolean;
  handleCheckboxChange?: (id: number) => void;
  checkedList?: { id: number; checked: boolean }[];
};

const CartListItem = ({ item, quantity, setQuantity, isGroup, onChangeQuantity, selectId, handleCheckboxChange, checkedList }: CartListItemProps) => {
  const router = useRouter();

  return (
    <Wrapper>
      <StyledCheckbox
        checkboxId={item.id}
        checked={checkedList?.find((check) => check.id === item.id)?.checked as boolean}
        onChange={() => {
          if (handleCheckboxChange) {
            handleCheckboxChange(item.id);
          }
        }}
      />
      <Img
        src={item.img}
        alt={item.name}
        onClick={() => {
          router.push(`/product/${item.id}`);
        }}
      />
      <ItemInfo>
        <FlexBox $gap="2px" $flexDirection="column" $alignItems="start">
          <Brand>{item.brand}</Brand>
          <ProductName
            onClick={() => {
              router.push(`/product/${item.id}`);
            }}
          >
            {item.name}
          </ProductName>
        </FlexBox>
        <FlexBox $alignItems="end" $justifyContent="space-between">
          <QuantitySelect quantity={item.quantity} buttonSize={24} fontSize={12} />
          <Price>{item.price && `KRW ${numberFormatter(item.price)}`}</Price>
        </FlexBox>
      </ItemInfo>
    </Wrapper>
  );
};

export default CartListItem;

const Wrapper = styled.div`
  width: 100%;
  /* min-width: calc(100vw - 40px); */
  display: flex;
  justify-content: start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.blackColor};
`;
const Img = styled.img`
  max-width: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
  background: ${theme.colors.whiteColor};
`;
const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Brand = styled(MediumFont)`
  font-size: 12px;
  text-decoration: underline;
  margin-bottom: 2px;
`;
const ProductName = styled(SemiBoldFont)`
  font-size: 13px;
  white-space: pre-wrap;
`;
const Price = styled(RegularFont)`
  font-size: 13px;
  white-space: pre-wrap;
`;
