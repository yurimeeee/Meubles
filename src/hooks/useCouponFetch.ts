import { useCallback, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@lib/firebase';
import { Coupon } from '@type/types';

export const useCouponFetch = () => {
  const [couponData, setCouponData] = useState<Coupon[] | null>(null); // 쿠폰 데이터

  const fetchData = useCallback(async (uid: string) => {
    const querySnapshot = await getDocs(collection(db, `users/${uid}/coupon`));
    const dataList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCouponData(dataList as Coupon[]);
  }, [])

  return { fetchData, couponData, setCouponData };
}