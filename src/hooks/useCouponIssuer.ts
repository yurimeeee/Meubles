import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@lib/firebase';

interface CouponDetails {
  id: string;
  title: string;
  expiration: string;
  discount: number;
  amount: boolean;
  percentage: boolean;
  minPrice?: number;
}

export const useCouponIssuer = () => {
  const issueCoupon = useCallback(async (uid: string, couponDetails: CouponDetails, successMsg?: string, errorMsg?: string) => {
    try {
      await addDoc(collection(db, `users/${uid}/coupon`), {
        ...couponDetails,
        timestamp: new Date(),
      });
      alert(successMsg ? successMsg : '쿠폰이 발행되었습니다.');
    } catch (error) {
      alert(errorMsg ? errorMsg : '쿠폰 발행에 실패했습니다.');
    }
  }, []);

  return { issueCoupon };
}