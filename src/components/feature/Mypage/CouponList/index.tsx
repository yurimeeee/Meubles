'use client';

import { Loader } from '@components/share/BlankLoader';
import TableHeader, { HeaderType } from '@components/share/Table/TableHeader';
import { TableRow, TableCell, TableText, TableImg, ItemInfo, ProductName } from '@components/share/Table/table.style';

import React, { ChangeEvent, useCallback, useState } from 'react';
import { numberFormatter } from '@utils/formatter';
import { TableBody } from '../../../share/Table/table.style';
import { useRouter } from 'next/navigation';
import { FlexBox, NoResults } from '@components/styled/StyledComponents';
import { Product } from '@type/types';
import StyledInput from '@components/styled/StyledInput';
import StyledButton from '@components/styled/StyledButton';
import theme from '@styles/theme';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { useCouponIssuer } from '@hooks/useCouponIssuer';

type CouponListProps = {
  // headers: HeaderType[];
  // headers: any[];
  // data?: any;
};

const CouponList = ({}: CouponListProps) => {
  const router = useRouter();
  const { issueCoupon } = useCouponIssuer(); // 쿠폰 발행 커스텀 훅
  const [couponCode, setCouponCode] = useState<string>();
  console.log(couponCode);

  // 인풋에 값 입력 시
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCouponCode(e.target.value);
    },
    [couponCode]
  );

  // 쿠폰 코드 입력 후 버튼 클릭 시, 쿠폰 발행

  const handleCouponRegister = useCallback(async () => {
    if (!auth?.currentUser) {
      return;
    }
    if (couponCode !== 'SummerCoupon') {
      alert('쿠폰 코드가 맞지 않습니다.');
      return;
    }

    const uid = auth.currentUser.uid;
    const couponCollection = `users/${uid}/coupon`;

    const ref = collection(db, couponCollection);
    const q = query(ref, where('title', '==', '[SUMMER SPECIAL COUPON] 여름 맞이 특별 할인'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      alert('이미 발급 받은 쿠폰입니다.');
      return;
    }

    const today = new Date();
    const expirationDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    const formattedExpiration = expirationDate.toISOString().slice(0, 10);

    const couponDetails = {
      id: '0',
      title: '[SUMMER SPECIAL COUPON] 여름 맞이 특별 할인',
      expiration: formattedExpiration,
      discount: 100000,
      amount: true,
      percentage: false,
      minPrice: 1000000,
    };

    await issueCoupon(uid, couponDetails);
  }, [couponCode]);

  // const handleCouponRegister = useCallback(async () => {
  //   if (!auth?.currentUser) {
  //     return;
  //   }
  //   if (couponCode !== 'SummerCoupon') {
  //     alert('쿠폰 코드가 맞지 않습니다.');
  //     return;
  //   }

  //   const uid = auth.currentUser.uid;
  //   // 미로그인 시, 리턴

  //   // cart 컬렉션 참조
  //   const couponCollection = `users/${uid}/coupon`;

  //   // Define the collection, query, and filter
  //   const ref = collection(db, couponCollection);
  //   const q = query(ref, where('name', '==', '[SUMMER SPECIAL COUPON] 여름 맞이 특별 할인'));
  //   const querySnapshot = await getDocs(q);

  //   let exists = false;
  //   for (const doc of querySnapshot.docs as any) {
  //     exists = true;
  //     const docRef = doc(db, `${couponCollection}`, doc.id);
  //     alert('이미 발급 받은 쿠폰입니다.');
  //     break;
  //   }

  //   if (!exists) {
  //     const today = new Date();
  //     const expirationDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()); // 3개월 추가
  //     const formattedExpiration = expirationDate.toISOString().slice(0, 10); // YYYY-MM-DD format

  //     // 쿠폰 발행
  //     const couponDetails = {
  //       id: '0',
  //       title: '[SUMMER SPECIAL COUPON] 여름 맞이 특별 할인',
  //       expiration: formattedExpiration,
  //       discount: 100000,
  //       amount: true,
  //       percentage: false,
  //       minPrice: 1000000,
  //     };
  //     await issueCoupon(uid, couponDetails);

  //     // await addDoc(collection(db, couponCollection), {
  //     //   id: 0,
  //     //   title: '신규 회원 10% 할인 쿠폰',
  //     //   expiration: 'indefinite',
  //     //   discount: 10,
  //     //   amount: false,
  //     //   percentage: true,
  //     //   timestamp: new Date(),
  //     // });
  //   }
  // }, [couponCode]);

  return (
    <>
      <FlexBox $gap="10px">
        <StyledInput placeholder="COUPON CODE" name="coupon" value={couponCode} onChange={onChange} />
        {/* <StyledButton
          title="REGISTER"
          // onClick={handleCouponRegister}
          fontSize={16}
          bgColor={theme.colors.blackColor}
          fontColor={theme.colors.whiteColor}
          border={`1px solid ${theme.colors.blackColor}`}
        /> */}
        <StyledButton
          title="REGISTER"
          onClick={handleCouponRegister}
          fontSize={16}
          bgColor={theme.colors.lightGrayBgColor}
          fontColor={theme.colors.blackColor}
          border={`1px solid ${theme.colors.blackColor}`}
        />
      </FlexBox>
    </>
  );
};

export default CouponList;
