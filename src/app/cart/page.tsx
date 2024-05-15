'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Unsubscribe } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { toast } from 'react-toastify';

import * as C from './cart.style';
import theme from '@styles/theme';
import { numberFormatter } from '@utils/formatter';
import { FlexBox, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';
import StyledButton from '@components/styled/StyledButton';
import TableHeader from '@components/share/Table/TableHeader';
import CartListTable from '@components/feature/Cart/CartListTable';
import { TableBody, TableFooter } from '@components/share/Table/table.style';
import Loader from '@components/share/Loader';
import MobileCartList from '@components/feature/Cart/MobileCartList';
import StyledCheckbox from '@components/styled/StyledCheckbox';

type CartItem = { id: number; brand: string; name: string; price: string; quantity: number; img: string; docId: string }; // 장바구니 리스트 DATA
type CheckedList = { id: number; checked: boolean; docId: string }; // 장바구니에서 체크된 상품 리스트

const Header = [
  // { label: '', minWidth: 45, width: 3 },
  // { label: 'ITEM', width: 12.5 },
  // { label: 'QYT', minWidth: 115, width: 10 },
  // { label: 'PRICE', minWidth: 115, width: 10 },
  // { label: 'DISCOUNT', minWidth: 115, width: 10 },
  { label: '', width: 3 },
  { label: 'ITEM', width: 12.5 },
  { label: 'QYT', width: 10 },
  { label: 'PRICE', width: 10 },
  { label: 'DISCOUNT', width: 10 },
];

export default function CartPage() {
  const router = useRouter();
  const [allItemsChecked, setAllItemsChecked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<any>();
  const [cartItem, setCartItem] = useState<CartItem[] | null>(null);
  const [checkedList, setCheckedList] = useState<CheckedList[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchCartList = async () => {
      //쿼리생성
      const cartDataQuery = query(
        collection(db, `cart/${auth?.currentUser?.uid}/items`) //컬렉션 지정
      );
      unsubscribe = await onSnapshot(cartDataQuery, (snapshot) => {
        const cartList = snapshot.docs.map((doc) => {
          const { id, brand, name, price, quantity, img } = doc.data();
          return {
            id,
            brand,
            name,
            price,
            quantity,
            img,
            docId: doc.id,
          };
        });
        setCartItem(cartList);

        setQuantity(
          cartList.map((item) => ({
            id: item?.id,
            quantity: item?.quantity,
          }))
        );
      });
    };

    fetchCartList();
    return () => {
      unsubscribe && unsubscribe();
      // 사용자가 타임라인을 보고 있을때만 작동
    };
  }, []);

  // console.log('cartItem', cartItem);
  // console.log('quantity:::', quantity);

  // 페이지 로드 시 장바구니 데이터로 checkedList 상태에 설정
  useEffect(() => {
    if (cartItem) {
      const tmp = cartItem.map((item) => ({
        id: item?.id,
        checked: false,
        docId: item?.docId,
      }));
      setCheckedList(tmp as CheckedList[]);
    }
  }, [cartItem]);

  // checkedList 모두 체크되는 경우, AllItemsChecked => true로 업데이트
  useEffect(() => {
    const allChecked = checkedList?.every((item) => item.checked);
    if (allChecked) {
      setAllItemsChecked(true);
    } else {
      setAllItemsChecked(false);
    }
  }, [checkedList]);

  // 각 체크박스 항목 클릭 시 checkedList 상태 업데이트
  const handleCheckboxChange = useCallback(
    (id: number) => {
      setCheckedList((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, checked: !item.checked };
          }
          return item;
        })
      );
    },
    [setCheckedList]
  );

  const checkAllItems = () => {
    setCheckedList((prev) =>
      prev.map((item) => ({
        ...item,
        checked: true,
      }))
    );
    setAllItemsChecked(!allItemsChecked);
  };

  // const onChangeQuantity = useCallback(async (itemId: string, newQuantity: number) => {
  //   const docRef = doc(db, `cart/${auth?.currentUser?.uid}/items`, itemId);

  //   await updateDoc(docRef, {
  //     quantity: newQuantity,
  //   });
  // }, []);

  const onChangeQuantity = useCallback(async (itemId: string, newQuantity: number) => {
    const collectionRef = collection(db, `cart/${auth?.currentUser?.uid}/items`); // <-- Correct usage
    // const docRef = doc(collectionRef, itemId);
    console.log('collectionRef', collectionRef);
    // console.log('docRef', docRef);
    // await updateDoc(docRef, {
    //   quantity: newQuantity,
    // });
  }, []);
  // const collectionRef = collection(db, `cart/${auth?.currentUser?.uid}/items`); // <-- Correct usage
  // collection(db, `cart/${auth?.currentUser?.uid}/items`);
  // const handleItemsDelete = useCallback(async () => {
  //   checkedList?.map(async (item) => await deleteDoc(doc(db, `cart/${auth?.currentUser?.uid}/items`, item.docId)));
  // }, []);
  // const handleItemsDelete = useCallback(async () => {
  //   await Promise.all(checkedList?.map(async (item) => await deleteDoc(doc(db, `cart/${auth?.currentUser?.uid}/items`, item.docId))));
  // }, []);

  // 선택 삭제
  const handleItemsDelete = useCallback(async () => {
    // checked 값이 true인 아이템들의 docId를 가져옴
    const docIdsToDelete = checkedList.filter((item) => item.checked).map((item) => item.docId);

    // docIdsToDelete 배열에 있는 모든 문서를 삭제
    await Promise.all(
      docIdsToDelete.map(async (docId) => {
        await deleteDoc(doc(db, `cart/${auth?.currentUser?.uid}/items`, docId));
      })
    );
  }, [checkedList]);

  // 전체 삭제
  const handleAllItemsDelete = useCallback(async () => {
    // checked 값이 true인 아이템들의 docId를 가져옴
    const docIdsToDelete = checkedList.map((item) => item.docId);

    // docIdsToDelete 배열에 있는 모든 문서를 삭제
    await Promise.all(
      docIdsToDelete.map(async (docId) => {
        await deleteDoc(doc(db, `cart/${auth?.currentUser?.uid}/items`, docId));
      })
    );
  }, [checkedList]);

  // Set the "capital" field of the city 'DC'

  return (
    <C.Wrapper>
      <FlexBox $margin="0 0 20px">
        <RegularFont $fontSize={16}>CART ({cartItem?.length})</RegularFont>
      </FlexBox>
      {/* <C.PCCart>
        <TableHeader headers={Header} checkAllItems={checkAllItems} allItemsChecked={allItemsChecked} />
        <TableBody>
          {cartItem === null ? (
            <Loader />
          ) : cartItem.length > 0 && quantity ? (
            cartItem?.map((item, index) => (
              <CartListTable
                key={index}
                headers={Header}
                item={item}
                // quantity={quantity[index]}
                quantity={item.quantity}
                setQuantity={setQuantity}
                // onChangeQuantity={onChangeQuantity}
                selectId={item.id}
                isGroup={true}
                // handleChecked={handleChecked(item.id)}
                checkedList={checkedList}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))
          ) : (
            <C.NoResults>장바구니가 비어 있습니다</C.NoResults>
          )}
        </TableBody>
        <TableFooter>
          <FlexBox $justifyContent="end">
            <RegularFont>
              상품 구매금액 <SemiBoldFont>{numberFormatter(cartItem?.reduce((total, item) => total + item.price * item.quantity, 0))}</SemiBoldFont> + 배송비{' '}
              <SemiBoldFont>50,000</SemiBoldFont> = 합계 :{' '}
              <SemiBoldFont>KRW {numberFormatter(cartItem?.reduce((total, item) => total + item.price * item.quantity, 0 || 0) + 50000)}</SemiBoldFont>
            </RegularFont>
          </FlexBox>
        </TableFooter>
        <FlexBox $gap="12px" $margin="16px 0 0">
          <StyledButton
            title="전체 삭제"
            fontSize={12}
            width={88}
            height={30}
            bgColor={theme.colors.lightGrayBgColor}
            fontColor={theme.colors.blackColor}
            border={`1px solid ${theme.colors.blackColor}`}
            onClick={handleAllItemsDelete}
          />
          <StyledButton
            title="선택 삭제"
            fontSize={12}
            width={88}
            height={30}
            bgColor={theme.colors.lightGrayBgColor}
            fontColor={theme.colors.blackColor}
            border={`1px solid ${theme.colors.blackColor}`}
            onClick={handleItemsDelete}
          />
        </FlexBox>
      </C.PCCart> */}
      <C.MobileCart>
        <C.CartListHeader>
          <StyledCheckbox checked={allItemsChecked} onChange={checkAllItems} />
          <FlexBox $gap="8px" $justifyContent="end">
            <StyledButton
              title="전체 삭제"
              fontSize={12}
              width={74}
              height={28}
              padding="0 12px"
              bgColor={theme.colors.lightGrayBgColor}
              fontColor={theme.colors.blackColor}
              border={`1px solid ${theme.colors.blackColor}`}
              onClick={handleAllItemsDelete}
            />
            <StyledButton
              title="선택 삭제"
              fontSize={12}
              width={74}
              height={28}
              padding="0 10px"
              bgColor={theme.colors.lightGrayBgColor}
              fontColor={theme.colors.blackColor}
              border={`1px solid ${theme.colors.blackColor}`}
              onClick={handleItemsDelete}
            />
          </FlexBox>
        </C.CartListHeader>
        <C.CartList>
          {cartItem === null ? (
            <Loader />
          ) : cartItem.length > 0 && quantity ? (
            cartItem?.map((item, index) => (
              <MobileCartList
                key={index}
                item={item}
                // quantity={quantity[index]}
                quantity={item.quantity}
                setQuantity={setQuantity}
                // onChangeQuantity={onChangeQuantity}
                selectId={item.id}
                isGroup={true}
                // handleChecked={handleChecked(item.id)}
                checkedList={checkedList}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))
          ) : (
            <C.NoResults>장바구니가 비어 있습니다</C.NoResults>
          )}
        </C.CartList>

        <C.AmountPayment>
          <C.TotalPrice>
            <C.RowTitle>합계</C.RowTitle>

            <C.RowText>{cartItem && `${numberFormatter((cartItem?.reduce((total, item) => total + Number(item.price) * item.quantity, 0) || 0) + 50000)}`}</C.RowText>
          </C.TotalPrice>
          <C.RowFlex>
            <C.RowTitle>상품 구매금액</C.RowTitle>
            <C.RowText>{numberFormatter(cartItem?.reduce((total, item) => total + Number(item.price) * item.quantity, 0))}</C.RowText>
          </C.RowFlex>
          <C.RowFlex>
            <C.RowTitle>배송비</C.RowTitle>
            <C.RowText>50,000</C.RowText>
          </C.RowFlex>
        </C.AmountPayment>
      </C.MobileCart>
      <FlexBox $gap="12px" $margin="16px auto 0" $justifyContent="center">
        <StyledButton
          title="전체 상품 주문"
          fontSize={14}
          width={110}
          height={45}
          padding="0 10px"
          bgColor={theme.colors.blackColor}
          fontColor={theme.colors.whiteColor}
          border={`1px solid ${theme.colors.blackColor}`}
          onClick={handleAllItemsDelete}
        />
        <StyledButton
          title="선택 상품 주문"
          fontSize={14}
          width={110}
          height={45}
          padding="0 10px"
          bgColor={theme.colors.lightGrayBgColor}
          fontColor={theme.colors.blackColor}
          border={`1px solid ${theme.colors.blackColor}`}
          onClick={handleItemsDelete}
        />
      </FlexBox>
    </C.Wrapper>
  );
}
