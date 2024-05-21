// 장바구니에 담긴 상품
export type CartItem = {
  id: number;           // 상품 Id
  brand: string;        // 브랜드명
  name: string;         // 상품명
  price: string;        // 상품 가격
  quantity: number;     // 상품 수량
  img: string;          // 썸네일 이미지
  docId: string;        // DB 문서 Id
};

// 장바구니에서 체크된 상품 리스트
export type CheckedList = {
  id: number;           // 상품 Id
  checked: boolean;     // 체크 여부
  docId: string         // DB 문서 Id
};

// 상품 정보
export type Product = {
  u_category: string;   // 대분류
  l_category: string;   // 소분류
  brand: string;        // 브랜드명
  name: string;         // 상품명
  price: string;        // 상품 가격
  desc?: string;        // 상품 설명
  detail: {
    designer?: string;  // 디자이너명
    color?: string;     // 컬러
    size?: string[];    // 사이즈
    texture?: string[]; // 재질
    company: string;    // 제조사
    country: string;    // 제조국가
  };
  mainImg: string;      // 메인 이미지
  subImg: string[];     // 서브 이미지 
  best: boolean;        // 베스트 
  new: boolean;         // 신상품 
  keyword: string;      // 키워드 
  id: number;           // 상품 Id
};

// 유저 정보
export type UserInfo = {
  email: string;        // 이메일
  name: string;         // 이름
  address?: string;      // 주소
  addressDetail?: string;// 상세주소
  phone: string;        // 연락처
};

// 쿠폰 정보
export type Coupon = {
  id: string;          // 쿠폰 Id
  title: string;       // 쿠폰명
  timestamp: {         // 발행 시각
    seconds: number;
    nanoseconds: number;
  };
  discount: number;    // 할인 금액/할인률
  expiration: string;  // 쿠폰 만료일
  percentage: boolean; // 정률제
  amount: boolean;     // 정액제
  minPrice?: number;   // 최소 결제 금액
  status?: boolean;    // 쿠폰 상태
  docId: string;       // 쿠폰 문서 ID

}

