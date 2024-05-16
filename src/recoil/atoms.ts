
import { atom } from 'recoil';
import { CartItem } from '@type/types';

// 검색된 상품들 
export const searchedItems = atom({
  key: "searchedItems",
  default: [],
});

// 장바구니에 담긴 상품들
export const cartItemsState = atom({
  key: 'cartItemsState',
  default: [] as CartItem[],
});