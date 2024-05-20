import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@lib/firebase';

interface OrderDetails {
  items: Array<{ id: number, brand: string, name: string, img: string, price: string, quantity: number }>;
  totalAmount: number;
  discountAmount?: number;
  finalAmount: number;
  paymentMethod: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  orderStatus: string;
  // [key: string]: any; // 기타 필요한 필드 추가 가능
}

export const useOrderProcessor = () => {
  const processOrder = useCallback(async (uid: string, orderDetails: OrderDetails, successMsg?: string, errorMsg?: string) => {
    try {
      await addDoc(collection(db, `users/${uid}/orderlist`), {
        ...orderDetails,
        timestamp: new Date(),
      });
      alert(successMsg ? successMsg : '주문이 완료되었습니다.');
    } catch (error) {
      alert(errorMsg ? errorMsg : '주문 처리에 실패했습니다.');
    }
  }, []);

  return { processOrder };
}
