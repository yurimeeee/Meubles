'use client';

import * as M from './mypage.style';
import { useCallback, useEffect, useState } from 'react';
import { auth, db } from '@lib/firebase';
import { collection, doc, DocumentData, getDoc, getDocs, query, QuerySnapshot, setDoc, where } from 'firebase/firestore';
import { Product, UserInfo } from '@type/types';
import { productData } from '@utils/productData';
import { FlexBox } from '@components/styled/StyledComponents';
import OrderListTable from '@components/feature/Mypage/OrderListTable';
import WishListTable from '@components/feature/Mypage/WishListTable';
import CouponList from '@components/feature/Mypage/CouponList';

const OrderListHeader = [
  { label: 'ORDER DATE', width: 20 },
  { label: 'ITEM', width: 40 },
  { label: 'QYT', width: 10 },
  { label: 'PRICE', width: 15 },
  { label: 'STATUS', width: 15 },
];

export default function Mypage() {
  // const [bookmarkList, setBookmarkList] = useState<any[]>();
  // const [bookmarkItems, setBookmarkItems] = useState<Product[]>();
  const [active, setActive] = useState<string>('MY ORDERS');
  const [myInfo, setMyInfo] = useState<UserInfo | DocumentData>();

  useEffect(() => {
    try {
      const userRef = doc(db, `users/${auth?.currentUser?.uid}`);

      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          setMyInfo(doc.data());
        }
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const uid = auth?.currentUser?.uid;
  //     const querySnapshot = await getDocs(collection(db, `users/${uid}/bookmark`));
  //     const data = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setBookmarkList(data);
  //   };

  //   fetchData();
  // }, [auth?.currentUser?.uid]);

  // useEffect(() => {
  //   if (bookmarkList && productData) {
  //     const tmp = productData.filter((item) => bookmarkList.some((e) => e.id === item.id));
  //     setBookmarkItems(tmp);
  //   }
  // }, [bookmarkList]);

  return (
    <M.Wrapper>
      <M.AccountWrap>
        <FlexBox $gap="12px" $flexDirection="column" $alignItems="start">
          <M.MyAccount>MY ACCOUNT</M.MyAccount>
          {/* <M.Welcome>반갑습니다. {myInfo ? `${myInfo?.name} 님` : `${auth?.currentUser?.displayName}님`} </M.Welcome> */}
        </FlexBox>
        <M.Setting>
          <M.SettingLink href="/mypage/setting/profile">회원 정보 수정</M.SettingLink>
          <M.SettingLink href="/mypage/setting/password">비밀번호 재설정</M.SettingLink>
        </M.Setting>
      </M.AccountWrap>

      <M.CategoryList>
        <M.CategoryItem onClick={() => setActive('MY ORDERS')} $Active={active === 'MY ORDERS'}>
          MY ORDERS
          <M.ActiveBar $Active={active === 'MY ORDERS'} />
        </M.CategoryItem>
        <M.CategoryItem onClick={() => setActive('COUPON')} $Active={active === 'COUPON'}>
          COUPON
          <M.ActiveBar $Active={active === 'COUPON'} />
        </M.CategoryItem>
        {/* <M.CategoryItem onClick={() => setActive('POINT')} $Active={active === 'POINT'}>
          POINT
          <M.ActiveBar $Active={active === 'POINT'} />
        </M.CategoryItem> */}
        <M.CategoryItem onClick={() => setActive('WISHLIST')} $Active={active === 'WISHLIST'}>
          WISHLIST
          <M.ActiveBar $Active={active === 'WISHLIST'} />
        </M.CategoryItem>
      </M.CategoryList>
      {active === 'MY ORDERS' && <OrderListTable headers={OrderListHeader} />}
      {active === 'COUPON' && <CouponList />}
      {active === 'WISHLIST' && <WishListTable />}
    </M.Wrapper>
  );
}
