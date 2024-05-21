'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Unsubscribe } from 'firebase/auth';
import { collection, deleteDoc, doc, DocumentData, getDoc, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { toast } from 'react-toastify';

import * as C from '../cart.style';
import * as J from '../../join/join.style';
import theme from '@styles/theme';
import { numberFormatter } from '@utils/formatter';
import { CartItem, CheckedList, Coupon, Product, UserInfo } from '@type/types';

import { FlexBox, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';
import StyledButton from '@components/styled/StyledButton';
import TableHeader from '@components/share/Table/TableHeader';
import CartListTable from '@components/feature/Cart/CartListTable';
import { TableBody, TableFooter } from '@components/share/Table/table.style';
import Loader from '@components/share/Loader';
import MobileCartList from '@components/feature/Cart/MobileCartList';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import { useRecoilState } from 'recoil';
import { cartItemsState, paymentItemsState } from '@recoil/atoms';
import CartListItem from '@components/feature/Cart/CartListItem';
import StyledSelect from '@components/styled/StyledSelect';
import { useCouponFetch } from '@hooks/useCouponFetch';
import { useOrderProcessor } from '@hooks/useOrderProcessor';
import StyledInput from '@components/styled/StyledInput';
import StyledPhoneNumber from '@components/styled/StyledPhoneNumber';
import DaumPostcode from 'react-daum-postcode';
import { IoMdClose } from 'react-icons/io';

const Header = [
  // { label: '', minWidth: 45, width: 3 },
  // { label: 'ITEM', width: 12.5 },
  // { label: 'QYT', minWidth: 115, width: 10 },
  // { label: 'PRICE', minWidth: 115, width: 10 },
  // { label: 'DISCOUNT', minWidth: 115, width: 10 },
  { label: '', width: 3 },
  { label: 'ITEM', width: 12.5 },
  { label: 'QYT', width: 10 },
  { label: 'PRICE', width: 10 },
  { label: 'DISCOUNT', width: 10 },
];

export default function payment() {
  const router = useRouter();
  const { processOrder } = useOrderProcessor(); // 결제 커스텀 훅
  const { fetchData, couponData } = useCouponFetch(); // 쿠폰 발행 커스텀 훅
  const [myInfo, setMyInfo] = useState<UserInfo | DocumentData>();

  const [cartItems, setCartItems] = useRecoilState(paymentItemsState);
  // const [coupons, setCoupons] = useState<{ value: string; label: string }[]>([]);
  // const [couponOption, setCouponOption] = useState(['선택']);
  const [couponOption, setCouponOption] = useState([{ value: '선택', label: '선택' }]);
  const [selectedCoupon, setSelectedCoupon] = useState('선택');
  const [selectedCouponInfo, setSelectedCouponInfo] = useState<Coupon | null>();
  const [discountPrice, setDiscountPrice] = useState<number>(0);

  const [modalState, setModalState] = useState<boolean>(false);
  const [zipCode, setZipcode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');

  const [inputs, setInputs] = useState({
    name: myInfo?.name,
    address: myInfo?.address,
    addressDetail: myInfo?.addressDetail,
    phone: myInfo?.phone,
  });

  useEffect(() => {
    if (myInfo) {
      setInputs({
        ...inputs,
        name: myInfo?.name,
        address: myInfo?.address,
        addressDetail: myInfo?.addressDetail,
        phone: myInfo?.phone,
      });
    }
  }, [myInfo]);

  useEffect(() => {
    try {
      const userRef = doc(db, `users/${auth?.currentUser?.uid}`);

      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          console.log('Document data:', doc.data());
          setMyInfo(doc.data());
        } else {
          console.log('No such document!');
        }
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

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

  // 주소검색 모달
  const handleModalToggle = useCallback(() => {
    setModalState(!modalState);
  }, []);

  // 주소 검색 기능
  const completeHandler = (data: any) => {
    setZipcode(data?.zonecode); // 우편번호, 도로명 주소
    setRoadAddress(data?.roadAddress); // 상세 주소

    setInputs((prev) => ({
      ...prev,
      address: data?.roadAddress,
    }));
    setModalState(false);
  };
  useEffect(() => {
    const uid = auth?.currentUser?.uid;
    if (uid) {
      fetchData(uid);
    }
  }, []);
  useEffect(() => {
    if (couponData) {
      const tmp = couponData.map((item) => ({
        value: item.title,
        label: item.title,
        id: item.docId,
      }));
      setCouponOption([{ value: '선택', label: '선택' }, ...tmp]);
    }
  }, [couponData]);

  console.log('cartItems:::', cartItems);
  console.log('couponData::::::', couponData);
  console.log('selectedCouponInfo::::::', selectedCouponInfo);
  console.log('inputs::::::', inputs);
  console.log('myInfo::::::', myInfo);

  useEffect(() => {
    const selectedInfo = couponData?.find((item) => item.title === selectedCoupon);
    setSelectedCouponInfo(selectedInfo);

    if (selectedInfo) {
      if (selectedInfo.amount) {
        setDiscountPrice(selectedInfo.discount);
      } else {
        const total = cartItems?.reduce((total, item) => total + Number(item.price) * item.quantity, 0) || 0;
        setDiscountPrice(total * selectedInfo.discount * 0.001);
      }
    }
  }, [selectedCoupon, couponData, cartItems]);

  const handleAllItemsCheckout = useCallback(async () => {
    const { name, address, addressDetail, phone } = inputs;

    // 필수 항목 유효성 검사
    if (!name || !address || !addressDetail || !phone) {
      alert('필수 항목을 모두 입력해주세요');
      return;
    }

    const uid = auth?.currentUser?.uid;
    if (!uid) {
      return;
    }

    const orderDetails = {
      items: cartItems.map((item) => ({
        id: item.id,
        brand: item.brand,
        name: item.name,
        img: item.img,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0),
      discountAmount: discountPrice,
      finalAmount: cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0) + 50000 - discountPrice,
      paymentMethod: '신용카드',
      name,
      address,
      addressDetail,
      phone,
      orderStatus: 'Pending',
    };

    console.log(orderDetails);

    try {
      await processOrder(uid, orderDetails);

      const docIdsToDelete = cartItems.map((item) => item.docId);

      // 장바구니 내역 삭제
      await Promise.all(
        docIdsToDelete.map(async (docId) => {
          await deleteDoc(doc(db, `cart/${uid}/items`, docId));
        })
      );

      // 선택된 쿠폰 삭제
      if (selectedCoupon !== '선택' && selectedCouponInfo?.docId) {
        await updateDoc(doc(db, `users/${uid}/coupon`, selectedCouponInfo.docId), { status: false });
      }

      // 포인트 적립
      const pointCollection = collection(db, `users/${uid}/point`);
      const pointAmount = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0) * 0.0001;

      // 포인트 컬렉션에 데이터 추가
      await setDoc(doc(pointCollection, uid), { point: pointAmount });
    } catch (error) {
      console.error('Error processing order:', error);
      alert('주문 처리에 실패했습니다. 다시 시도해주세요.');
    }
  }, [cartItems, discountPrice, inputs, selectedCoupon, selectedCouponInfo, processOrder]);

  // const handleAllItemsCheckout = useCallback(async () => {
  //   const { name, address, addressDetail, phone } = inputs;

  //   if (name === '' || address === '' || addressDetail === '' || phone === '') {
  //     alert('필수 항목을 모두 입력해주세요');
  //     return;
  //   }

  //   const uid = auth?.currentUser?.uid;
  //   if (!uid) {
  //     return;
  //   }
  //   const orderDetails = {
  //     items: cartItems.map((item) => ({
  //       id: item.id,
  //       brand: item.brand,
  //       name: item.name,
  //       img: item.img,
  //       price: item.price,
  //       quantity: item.quantity,
  //     })),
  //     totalAmount: cartItems?.reduce((total, item) => total + Number(item.price) * item.quantity, 0),
  //     discountAmount: discountPrice,
  //     finalAmount: cartItems?.reduce((total, item) => total + Number(item.price) * item.quantity, 0) + 50000 - discountPrice,
  //     paymentMethod: '신용카드',
  //     name: inputs.name,
  //     address: inputs.address,
  //     addressDetail: inputs.addressDetail,
  //     phone: inputs.phone,
  //     orderStatus: 'Pending',
  //   };

  //   console.log(orderDetails);
  //   processOrder(uid, orderDetails);

  //   // // 장바구니 내역 삭제
  //   // const cartRef = doc(db, `users/${uid}/orderlist/${data?.id}`);
  //   // await deleteDoc(cartRef);

  //   const docIdsToDelete = cartItems.map((item) => item.docId);

  //   // docIdsToDelete 배열에 있는 모든 문서를 삭제
  //   await Promise.all(
  //     docIdsToDelete.map(async (docId) => {
  //       await deleteDoc(doc(db, `cart/${auth?.currentUser?.uid}/items`, docId));
  //     })
  //   );
  //   // 선택된 쿠폰 삭제
  //   if (selectedCoupon !== '선택' && selectedCouponInfo?.docId) {
  //     await updateDoc(doc(db, `users/${uid}/coupon`, selectedCouponInfo.docId), { status: false });
  //   }

  //   // 포인트 적립
  //   const pointCollection = collection(db, `users/${uid}/point`);

  //   // point 컬렉션에 데이터 추가
  //   await setDoc(doc(pointCollection, uid), {
  //     point: cartItems?.reduce((total, item) => total + Number(item.price) * item.quantity, 0) * 0.0001,
  //   });
  // }, [cartItems, discountPrice, inputs, selectedCoupon, couponData]);

  // checked={checkedList?.find((check) => check.id === item.id)?.checked as boolean}
  return (
    <C.Wrapper>
      <FlexBox $margin="0 0 20px">
        <RegularFont $fontSize={16}>CART ({cartItems?.length})</RegularFont>
      </FlexBox>

      <C.PaymentList>
        {cartItems.length > 0 &&
          cartItems?.map((item, index) => (
            <C.CartListItem key={index}>
              <C.Img
                src={item.img}
                alt={item.name}
                onClick={() => {
                  router.push(`/product/${item.id}`);
                }}
              />
              <C.ItemInfo>
                <FlexBox $gap="2px" $flexDirection="column" $alignItems="start">
                  <C.Brand>{item.brand}</C.Brand>
                  <C.ProductName
                    onClick={() => {
                      router.push(`/product/${item.id}`);
                    }}
                  >
                    {item.name}
                  </C.ProductName>
                </FlexBox>
                <FlexBox $alignItems="end" $justifyContent="space-between">
                  <C.Price>{item.price && `KRW ${numberFormatter(item.price)}`}</C.Price>
                  <C.Price>{item.quantity && `QTY ${item.quantity}`}</C.Price>
                </FlexBox>
              </C.ItemInfo>
            </C.CartListItem>
          ))}
      </C.PaymentList>
      <FlexBox>
        <StyledSelect
          options={couponOption}
          onChange={(e) => {
            const newValue = e.target.value;
            setSelectedCoupon(newValue);
          }}
          value={selectedCoupon}
        />
        <C.RowText>KRW {cartItems && `${numberFormatter((cartItems?.reduce((total, item) => total + Number(item.price) * item.quantity, 0) || 0) + 50000)}`}</C.RowText>
      </FlexBox>
      <C.AmountPayment>
        <C.TotalPrice>
          <C.RowTitle>합계</C.RowTitle>

          <C.RowText>
            KRW {cartItems && `${numberFormatter((cartItems?.reduce((total, item) => total + Number(item.price) * item.quantity, 0) || 0) + 50000 - discountPrice)}`}
          </C.RowText>
        </C.TotalPrice>
        <C.RowFlex>
          <C.RowTitle>상품 구매금액</C.RowTitle>
          <C.RowText>KRW {numberFormatter(cartItems?.reduce((total, item) => total + Number(item.price) * item.quantity, 0))}</C.RowText>
        </C.RowFlex>
        <C.RowFlex>
          <C.RowTitle>배송비</C.RowTitle>
          <C.RowText>KRW 50,000</C.RowText>
        </C.RowFlex>
        <C.RowFlex>
          <C.RowTitle>쿠폰 사용</C.RowTitle>
          <C.RowText>
            {discountPrice === 0 ? '' : `-${numberFormatter(discountPrice)}`}
            {/* {selectedCoupon} */}
            {/* {selectedCouponInfo?.amount ? `${numberFormatter(selectedCouponInfo?.discount)} 원` : `${selectedCouponInfo?.discount} %`} */}
          </C.RowText>
        </C.RowFlex>
      </C.AmountPayment>

      <C.ShippingInfo>
        배송 정보
        <StyledInput placeholder="NAME *" required name="name" value={inputs.name} onChange={onChange} />
        <J.InputWrap>
          <StyledInput placeholder="ADDRESS" name="address" value={inputs.address} onChange={onChange} border />
          <StyledButton
            onClick={handleModalToggle}
            title="주소 검색"
            fontSize={12}
            width={94}
            height={30}
            bgColor={theme.colors.lightGrayBgColor}
            fontColor={theme.colors.blackColor}
            border={`1px solid ${theme.colors.blackColor}`}
          />
        </J.InputWrap>
        <StyledInput placeholder="DETAILED ADDRESS" name="addressDetail" value={inputs.addressDetail} onChange={onChange} />
        <StyledPhoneNumber placeholder="PHONENUMBER *" name="phone" value={inputs.phone} onChange={onChange} />
        {modalState && (
          <J.Modal>
            <J.ModalTitle>우편번호 검색</J.ModalTitle>
            <DaumPostcode onComplete={completeHandler} />
            <J.ModalClose onClick={handleModalToggle}>
              <IoMdClose size={16} />
            </J.ModalClose>
          </J.Modal>
        )}
      </C.ShippingInfo>
      <FlexBox $gap="12px" $margin="16px auto 0" $justifyContent="center">
        <StyledButton
          title="전체 상품 주문"
          fontSize={14}
          width={110}
          height={45}
          padding="0 10px"
          bgColor={theme.colors.blackColor}
          fontColor={theme.colors.whiteColor}
          border={`1px solid ${theme.colors.blackColor}`}
          // onClick={handleAllItemsCheckout}
          onClick={handleAllItemsCheckout}
        />
        <StyledButton
          title="선택 상품 주문"
          fontSize={14}
          width={110}
          height={45}
          padding="0 10px"
          bgColor={theme.colors.lightGrayBgColor}
          fontColor={theme.colors.blackColor}
          border={`1px solid ${theme.colors.blackColor}`}
          onClick={() => {
            // handleCheckoutItems('select');
            // router.push('/cart/payment');
          }}
        />
      </FlexBox>
    </C.Wrapper>
  );
}
