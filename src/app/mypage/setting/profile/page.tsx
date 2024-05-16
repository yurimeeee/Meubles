'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DaumPostcode from 'react-daum-postcode';

import * as J from '../../../join/join.style';
import theme from '@styles/theme';
import { auth, db } from '@lib/firebase';
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import { UserInfo } from '@type/types';

import { FlexBox } from '@components/styled/StyledComponents';
import StyledInput from '@components/styled/StyledInput';
import StyledButton from '@components/styled/StyledButton';
import StyledPhoneNumber from '@components/styled/StyledPhoneNumber';

export default function MypageSettingProfile() {
  const router = useRouter();
  const [modalState, setModalState] = useState<boolean>(false);
  const [zipCode, setZipcode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [myInfo, setMyInfo] = useState<UserInfo | DocumentData>();
  const [inputs, setInputs] = useState({
    email: myInfo?.email,
    name: myInfo?.name,
    address: myInfo?.address,
    addressDetail: myInfo?.addressDetail,
    phone: myInfo?.phone,
  });

  useEffect(() => {
    if (myInfo) {
      setInputs({
        ...inputs,
        email: myInfo?.email,
        name: myInfo?.name,
        address: myInfo?.address,
        addressDetail: myInfo?.addressDetail,
        phone: myInfo?.phone,
      });
    }
  }, [myInfo]);

  useEffect(() => {
    if (!auth?.currentUser) {
      alert('로그인이 필요합니다.');
      router.back();
    }
  });

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

  const handleModalOpen = useCallback(() => {
    setModalState(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalState(false);
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
  console.log(inputs);

  // 수정 버튼 클릭 시 회원 정보 수정
  const handleUserInfoUpdate = useCallback(async () => {
    const { name, address, addressDetail, phone } = inputs;
    const uid = auth?.currentUser?.uid;

    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      name,
      address,
      addressDetail,
      phone,
    });
  }, [inputs]);

  // 취소 버튼 클릭 시
  const handleUpdateCancel = useCallback(async () => {
    const isCanceled = window.confirm('회원정보 수정을 취소하시겠습니까?');
    if (!isCanceled) {
      return;
    } else {
      router.back();
    }
  }, []);

  return (
    <J.Wrapper>
      <J.Form>
        <StyledInput placeholder="EMAIL *" required type="email" name="email" value={auth.currentUser?.email} onChange={onChange} readOnly />
        <StyledInput placeholder="NAME *" required name="name" value={inputs.name} onChange={onChange} />
        <J.InputWrap>
          <StyledInput placeholder="ADDRESS" name="address" value={inputs.address} onChange={onChange} border />
          <StyledButton
            onClick={handleModalOpen}
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
            <J.ModalClose onClick={handleModalClose}>닫기</J.ModalClose>
          </J.Modal>
        )}
      </J.Form>

      <FlexBox $justifyContent="space-between" $gap="8px">
        <StyledButton
          title="SAVE"
          onClick={handleUserInfoUpdate}
          fontSize={16}
          bgColor={theme.colors.blackColor}
          fontColor={theme.colors.whiteColor}
          border={`1px solid ${theme.colors.blackColor}`}
        />
        <StyledButton
          title="CANCEL"
          onClick={handleUpdateCancel}
          fontSize={16}
          bgColor={theme.colors.lightGrayBgColor}
          fontColor={theme.colors.blackColor}
          border={`1px solid ${theme.colors.blackColor}`}
        />
      </FlexBox>
    </J.Wrapper>
  );
}
