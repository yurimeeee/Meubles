'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Unsubscribe } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { toast } from 'react-toastify';

import * as C from '../cart.style';
import theme from '@styles/theme';
import { numberFormatter } from '@utils/formatter';
import { CartItem, CheckedList, Product } from '@type/types';

import { FlexBox, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';
import StyledButton from '@components/styled/StyledButton';
import TableHeader from '@components/share/Table/TableHeader';
import CartListTable from '@components/feature/Cart/CartListTable';
import { TableBody, TableFooter } from '@components/share/Table/table.style';
import Loader from '@components/share/Loader';
import MobileCartList from '@components/feature/Cart/MobileCartList';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import { useRecoilState } from 'recoil';
import { cartItemsState } from '@recoil/atoms';
import CartListItem from '@components/feature/Cart/CartListItem';

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

export default function payment() {
  const router = useRouter();
  const [allItemsChecked, setAllItemsChecked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<any>();
  const [cartItem, setCartItem] = useState<CartItem[] | null>(null);
  const [checkedList, setCheckedList] = useState<CheckedList[]>([]);
  // const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  console.log('cartItems:::', cartItems);
  console.log('checkedList', checkedList);
  // useEffect(() => {
  //   let unsubscribe: Unsubscribe | null = null;
  //   const fetchCartList = async () => {
  //     //쿼리생성
  //     const cartDataQuery = query(
  //       collection(db, `cart/${auth?.currentUser?.uid}/items`) //컬렉션 지정
  //     );
  //     unsubscribe = await onSnapshot(cartDataQuery, (snapshot) => {
  //       const cartList = snapshot.docs.map((doc) => {
  //         const { id, brand, name, price, quantity, img } = doc.data();
  //         return {
  //           id,
  //           brand,
  //           name,
  //           price,
  //           quantity,
  //           img,
  //           docId: doc.id,
  //         };
  //       });
  //       setCartItems(cartList as any);

  //       setQuantity(
  //         cartList.map((item) => ({
  //           id: item?.id,
  //           quantity: item?.quantity,
  //         }))
  //       );
  //     });
  //   };

  //   fetchCartList();
  //   return () => {
  //     unsubscribe && unsubscribe();
  //     // 사용자가 타임라인을 보고 있을때만 작동
  //   };
  // }, []);

  // useEffect(() => {
  //   setQuantity(
  //     cartItems.map((item) => ({
  //       id: item?.id,
  //       quantity: item?.quantity,
  //     }))
  //   );
  // }, []);

  // 페이지 로드 시 장바구니 데이터로 checkedList 상태에 설정
  useEffect(() => {
    if (cartItems) {
      const tmp = cartItems.map((item) => ({
        id: item?.id,
        checked: false,
        docId: item?.docId,
      }));
      setCheckedList(tmp as CheckedList[]);
    }
  }, [cartItems]);

  // // checkedList 모두 체크되는 경우, AllItemsChecked => true로 업데이트
  // useEffect(() => {
  //   const allChecked = checkedList?.every((item) => item.checked);
  //   if (allChecked) {
  //     setAllItemsChecked(true);
  //   } else {
  //     setAllItemsChecked(false);
  //   }
  // }, [checkedList]);

  // checkedList 모두 체크되는 경우, AllItemsChecked => true로 업데이트
  // useEffect(() => {
  //   const allChecked = checkedList?.every((item) => item.checked);
  //   setAllItemsChecked(allChecked);
  // }, [checkedList]);

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
  const handleCheckAllChange = () => {
    const newCheckedState = !allItemsChecked;
    setAllItemsChecked(newCheckedState);
    setCheckedList((prev) =>
      prev.map((item) => ({
        ...item,
        checked: newCheckedState,
      }))
    );
  };
  // const handleCheckAllChange = () => {
  //   setCheckedList((prev) =>
  //     prev.map((item) => ({
  //       ...item,
  //       checked: true,
  //     }))
  //   );
  //   setAllItemsChecked(true);
  // };

  console.log('checkedList', checkedList);
  // const handleCheckAllChange = () => {
  //   setCheckedList((prev) =>
  //     prev.map((item) => ({
  //       ...item,
  //       checked: true,
  //     }))
  //   );

  //   console.log('checkedList', checkedList);
  //   setAllItemsChecked(!allItemsChecked);
  // };

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
      결제 페이지
      {cartItems.length > 0 &&
        cartItems?.map((item, index) => (
          <CartListItem
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
        ))}
    </C.Wrapper>
  );
}
