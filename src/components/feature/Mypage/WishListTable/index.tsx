'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import theme from '@styles/theme';

import { auth, db } from '@lib/firebase';
import { productData } from '@utils/productData';
import { Product } from '@type/types';
import { Loader } from '@components/share/BlankLoader';
import { NoResults } from '@components/styled/StyledComponents';
import ProductItem from '@components/share/ProductItem';

import { PiHeartStraightFill } from 'react-icons/pi';

const WishListTable = () => {
  const [bookmarkList, setBookmarkList] = useState<any[]>();
  const [bookmarkItems, setBookmarkItems] = useState<Product[] | null>(null);

  // 북마크 리스트 fetch
  const fetchBookmarkData = useCallback(async () => {
    const uid = auth?.currentUser?.uid;
    const querySnapshot = await getDocs(collection(db, `users/${uid}/bookmark`));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBookmarkList(data);
  }, [auth?.currentUser?.uid]);

  useEffect(() => {
    fetchBookmarkData();
  }, [fetchBookmarkData]);

  // 북마크 리스트에 맞는 상품 필터링
  useEffect(() => {
    if (bookmarkList && productData) {
      const tmp = productData.filter((item) => bookmarkList.some((e) => e.id === item.id));
      setBookmarkItems(tmp);
    }
  }, [bookmarkList]);

  //북마크 삭제
  const onClickBookmarkDelete = useCallback(
    async (id: number) => {
      const uid = auth?.currentUser?.uid;
      const bookmarkRef = doc(db, `users/${uid}/bookmark/${id}`);

      try {
        await deleteDoc(bookmarkRef);
        await fetchBookmarkData();
      } catch (error) {
        console.error('Error toggling bookmark:', error);
      }
    },
    [auth.currentUser, fetchBookmarkData]
  );

  return (
    <Wrapper>
      <WIshListWrap>
        {bookmarkItems === null ? (
          <Loader />
        ) : bookmarkItems && bookmarkItems.length > 0 ? (
          <WishList>
            {bookmarkItems.map((item, idx) => (
              <WishCard key={idx}>
                <Bookmark
                  size={20}
                  onClick={() => {
                    onClickBookmarkDelete(item.id);
                  }}
                />
                <ProductItem data={item} />
              </WishCard>
            ))}
          </WishList>
        ) : (
          <NoResults>조회된 상품이 없습니다</NoResults>
        )}
      </WIshListWrap>
    </Wrapper>
  );
};

export default WishListTable;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
`;
const WIshListWrap = styled.div``;
const WishList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  ${theme.devices.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;
const WishCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${theme.colors.whiteColor};
`;
const Bookmark = styled(PiHeartStraightFill)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  cursor: pointer;
`;
