
import { Product } from '@utils/productData';
import { atom, RecoilState } from 'recoil';

// 검색된 상품들 
export const searchedItems = atom({
  key: "searchedItems",
  default: [],
});
// export const searchedItems: RecoilState<Product[]> = atom({
//   key: 'searchedItems',
//   default: [],
// });