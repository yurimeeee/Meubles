'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { toast } from 'react-toastify';

import DaumPostcode from 'react-daum-postcode';
import { Address } from 'react-daum-postcode';

import * as J from './join.style';
import theme from '@styles/theme';
import { FlexBox } from '@components/styled/StyledComponents';
import StyledInput from '@components/styled/StyledInput';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import StyledButton from '@components/styled/StyledButton';

type TermsList = {
  term1: boolean;
  term2: boolean;
  term3: boolean;
};

export default function Join() {
  const router = useRouter();
  const [allTermsChecked, setAllTermsChecked] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [zipCode, setZipcode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    address: roadAddress,
    addressDetail: '',
  });
  const [termsList, setTermsList] = useState<TermsList>({
    term1: false,
    term2: false,
    term3: false,
  });

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

  // 각 체크박스 항목 클릭 시 termsList 업데이트
  const handleTermsChecked = useCallback(
    (detail: keyof TermsList) => () => {
      setTermsList((prev) => ({
        ...prev,
        [detail]: !prev[detail],
      }));
    },
    [termsList]
  );

  // 전체 동의
  const handleAllTermsCheck = useCallback(() => {
    setAllTermsChecked(!allTermsChecked);
    setTermsList((prev) => ({
      term1: true,
      term2: true,
      term3: true,
    }));
  }, [allTermsChecked]);

  // 모든 항목을 체크 시 전체 동의 라디오 체크
  useEffect(() => {
    if (termsList.term1 && termsList.term2 && termsList.term3) {
      setAllTermsChecked(true);
    } else {
      setAllTermsChecked(false);
    }
  }, [termsList]);

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

  // 회원가입 버튼 클릭 시 작동
  const handleSignin = useCallback(() => {
    const { email, password, passwordCheck, name, address, addressDetail } = inputs;
    const { term1, term2 } = termsList;

    if (email === '' || password === '' || passwordCheck === '' || name === '') {
      alert('필수 항목을 모두 입력해주세요');
      return;
    }
    if (!term1 || !term2) {
      // 필수 동의 항목 미체크 시 리턴
      alert('필수 동의 항목에 체크해주세요');
      console.log(term1, term2);
      return;
    }

    createUserWithEmailAndPassword(auth, email.trim(), password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;

        // Get a reference to the 'users' collection
        const usersCollection = collection(db, 'users');

        // Add a document to the 'users' collection with the user's details
        await setDoc(doc(usersCollection, uid), {
          name,
          address,
          addressDetail,
        });
        // toast.info(`${user.email} 님 회원가입 성공! 자동 로그인 되었습니다`);
        alert(`${user.email} 님 회원가입 성공! 자동 로그인 되었습니다`);
        router.push('/login');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          alert('이메일 주소가 유효하지 않습니다.');
        } else {
          const errorCode = error.code;
          alert(`오류 코드: ${errorCode}와 같은 이유로 회원가입에 실패하였습니다`);
        }
      });
  }, [inputs, termsList]);

  return (
    <J.Wrapper>
      <J.Form>
        <J.InputWrap>
          <StyledInput placeholder="EMAIL *" required name="email" value={inputs.email} onChange={onChange} border />
          <StyledButton
            title="중복 검사"
            fontSize={12}
            width={88}
            height={30}
            bgColor={theme.colors.lightGrayBgColor}
            fontColor={theme.colors.blackColor}
            border={`1px solid ${theme.colors.blackColor}`}
          />
        </J.InputWrap>
        <StyledInput placeholder="PASSWORD *" required type="password" name="password" value={inputs.password} onChange={onChange} />
        <StyledInput placeholder="PASSWORD CHECK *" required type="password" name="passwordCheck" value={inputs.passwordCheck} onChange={onChange} />
        <StyledInput placeholder="NAME *" required name="name" value={inputs.name} onChange={onChange} />
        <J.InputWrap>
          <StyledInput
            placeholder="ADDRESS"
            name="address"
            // value={inputs.address}
            value={zipCode && `(${zipCode}) ${roadAddress}`}
            onChange={onChange}
            border
          />
          <StyledButton
            onClick={handleModalOpen}
            title="주소 검색"
            fontSize={12}
            width={88}
            height={30}
            bgColor={theme.colors.lightGrayBgColor}
            fontColor={theme.colors.blackColor}
            border={`1px solid ${theme.colors.blackColor}`}
          />
        </J.InputWrap>
        <StyledInput placeholder="DETAILED ADDRESS" name="addressDetail" value={inputs.addressDetail} onChange={onChange} />
        {modalState && (
          <J.Modal>
            <J.ModalTitle>우편번호 검색</J.ModalTitle>
            <DaumPostcode
              onComplete={completeHandler}
              // style={{ height: 'calc(100vh - 40px)', overflow: 'hidden' }}
            />
            <J.ModalClose onClick={handleModalClose}>닫기{/* <TfiClose size={16} /> */}</J.ModalClose>
          </J.Modal>
        )}
      </J.Form>
      <FlexBox $justifyContent="space-between">
        <StyledCheckbox label="모든 약관을 확인하고 전체 동의합니다." checkboxId={'allAgree'} checked={allTermsChecked} onChange={handleAllTermsCheck} />
      </FlexBox>
      <J.Terms>
        <StyledCheckbox label="이용약관 동의 (필수)" checkboxId={'term1'} checked={termsList.term1} onChange={handleTermsChecked('term1')} />
        <StyledCheckbox label="개인정보 수집 및 이용 동의 (필수)" checkboxId={'term2'} checked={termsList.term2} onChange={handleTermsChecked('term2')} />
        <StyledCheckbox label="이메일 수신 동의 (선택)" checkboxId={'term3'} checked={termsList.term3} onChange={handleTermsChecked('term3')} />
      </J.Terms>
      <FlexBox $flexDirection="column" $justifyContent="space-between" $gap="8px">
        <StyledButton
          title="JOIN"
          onClick={handleSignin}
          fontSize={16}
          bgColor={theme.colors.lightGrayBgColor}
          fontColor={theme.colors.blackColor}
          border={`1px solid ${theme.colors.blackColor}`}
        />
      </FlexBox>
    </J.Wrapper>
  );
}
