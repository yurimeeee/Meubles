'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, Unsubscribe } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { toast } from 'react-toastify';

import DaumPostcode from 'react-daum-postcode';
import { Address } from 'react-daum-postcode';

import * as C from './cart.style';
import theme from '@styles/theme';
import { FlexBox, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';
import StyledInput from '@components/styled/StyledInput';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import StyledButton from '@components/styled/StyledButton';
import TableHeader from '@components/share/Table/TableHeader';
import { TableBody, TableFooter } from '@components/share/Table/table.style';
import CartListTable from '@components/feature/Cart/CartListTable';
import Loader from '@components/share/Loader';
import { numberFormatter } from '@utils/formatter';

type TermsList = {
  term1: boolean;
  term2: boolean;
  term3: boolean;
};

const Header = [
  { label: '', minWidth: 45, width: 3 },
  { label: 'ITEM', width: 12.5 },
  { label: 'QYT', minWidth: 115, width: 10 },
  { label: 'PRICE', minWidth: 115, width: 10 },
  { label: 'DISCOUNT', minWidth: 115, width: 10 },
];

export default function CartPage() {
  const router = useRouter();
  const [allItemsChecked, setAllItemsChecked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<any>();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    address: '',
    addressDetail: '',
  });
  const [termsList, setTermsList] = useState<TermsList>({
    term1: false,
    term2: false,
    term3: false,
  });
  const [cartItem, setCartItem] = useState<any[] | null>(null);
  const [checkedList, setCheckedList] = useState<any[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      //쿼리생성
      const tweetsQuery = query(
        // collection(db, 'cart') //컬렉션 지정

        collection(db, `cart/${auth?.currentUser?.uid}/items`) //컬렉션 지정
      );
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
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
        setCartItem(tweets);

        setQuantity(
          tweets.map((item) => ({
            id: item?.id,
            quantity: item?.quantity,
          }))
        );

        // const tmpData = tweets.map((item) => ({
        //   id: item?.id,
        //   quantity: item?.quantity,
        // }));
      });
    };

    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
      // 사용자가 타임라인을 보고 있을때만 작동
    };
  }, []);

  console.log('cartItem', cartItem);
  console.log('quantity:::', quantity);
  console.log('allItemsChecked:::', allItemsChecked);

  // 인풋에 값 입력 시
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  // 각 체크박스 항목 클릭 시 termsList 업데이트
  const handleTermsChecked = useCallback(
    (detail: keyof TermsList) => () => {
      setTermsList((prev) => ({
        ...prev,
        [detail]: !prev[detail],
      }));
    },
    [termsList]
  );

  useEffect(() => {
    setCheckedList(
      cartItem?.map((item) => ({
        id: item?.id,
        checked: false,
        docId: item?.docId,
      }))
    );
  }, [cartItem]);

  console.log('checkedList', checkedList);

  // checkedList 모두 체크되는 경우, AllItemsChecked => true로 업데이트
  useEffect(() => {
    const allChecked = checkedList?.every((item) => item.checked);
    if (allChecked) {
      setAllItemsChecked(true);
    } else {
      setAllItemsChecked(false);
    }
  }, [checkedList]);

  const handleChecked = useCallback(
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

  const handleCheckboxChange = (id: number) => {
    handleChecked(id);
  };

  const checkAllItems = () => {
    setCheckedList((prev) =>
      prev.map((item) => ({
        ...item,
        checked: true,
      }))
    );
    setAllItemsChecked(!allItemsChecked);
  };

  // 각 체크박스 랑목 클릭 시 termsList 업데이트
  // const handleChecked = useCallback((detail: number) => {
  //   setCheckedList((prev: any) => ({
  //     ...prev,
  //     [detail]: !prev[detail],
  //   }));
  // }, []);

  // const handleChecked = useCallback(
  //   (detail: number) => () => {
  //     setCheckedList((prev: any) => {
  //       const tmp = prev?.find((item: any) => item?.id === detail);
  //       // setUnique(newdata.find((item) => item?.ecps_site === inputs.site)?.siteUnique ?? '');
  //       // const currentValue = prev[detail] ?? false; // Use current value or false if undefined
  //       return {
  //         ...prev,
  //         [tmp]: !prev[tmp] ?? false, // Toggle the current value
  //       };
  //     });
  //   },
  //   []
  // );

  // const handleChecked = useCallback(
  //   (detail: number) => () => {
  //     setCheckedList((prev: any[]) => {
  //       // Ensure prev is an array
  //       if (!Array.isArray(prev)) {
  //         prev = [];
  //       }

  //       const tmp = prev.find((item: any) => item?.id === detail);
  //       // setUnique(newdata.find((item) => item?.ecps_site === inputs.site)?.siteUnique ?? '');
  //       // const currentValue = tmp ? prev[tmp] : false; // Use current value or false if undefined
  //       return {
  //         ...prev,
  //         [tmp]: !prev[tmp] ?? false, // Toggle the current value
  //       };
  //     });
  //   },
  //   []
  // );

  // 전체 동의
  // const handleAllCheck = useCallback(() => {
  //   setAllTermsChecked(!allTermsChecked);
  //   setTermsList((prev) => ({
  //     // term1: !prev.term1,
  //     // term2: !prev.term2,
  //     term1: true,
  //     term2: true,
  //   }));
  // }, [allTermsChecked]);

  // const onChangeQuantity = useCallback(async () => {
  //   const docRef = doc(db, 'cities', 'DC');

  //   await updateDoc(docRef, {
  //     quantity: true,
  //   });
  // }, []);

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
            <SemiBoldFont>KRW {numberFormatter(cartItem?.reduce((total, item) => total + item.price * item.quantity, 0) + 50000)}</SemiBoldFont>
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
    </C.Wrapper>
  );
}
