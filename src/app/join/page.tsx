'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { toast } from 'react-toastify';

import DaumPostcode from 'react-daum-postcode';

import * as J from './join.style';
import theme from '@styles/theme';
import { FlexBox } from '@components/styled/StyledComponents';
import StyledPhoneNumber from '@components/styled/StyledPhoneNumber';
import StyledInput from '@components/styled/StyledInput';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import StyledButton from '@components/styled/StyledButton';
import { useCouponIssuer } from '@hooks/useCouponIssuer';
import { IoMdClose } from 'react-icons/io';

type TermsList = {
  term1: boolean;
  term2: boolean;
  term3: boolean;
};

export default function Join() {
  const router = useRouter();
  const [allTermsChecked, setAllTermsChecked] = useState<boolean>(false); // 동의함 체크 리스트 상태
  const [modalState, setModalState] = useState<boolean>(false); // 주소 검색 모달 상태
  const [zipCode, setZipcode] = useState<string>(''); // 우편번호
  const [roadAddress, setRoadAddress] = useState<string>(''); // 도로명 주소
  const [isAccountEmailCheck, setIsAccountEmailCheck] = useState<boolean>(false); // 이메일 중복 확인 상태
  const { issueCoupon } = useCouponIssuer(); // 쿠폰 발행 커스텀 훅
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    address: roadAddress,
    addressDetail: '',
    phone: '',
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

  // 주소검색 모달
  const handleModalToggle = useCallback(() => {
    setModalState(!modalState);
  }, [modalState]);

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

  // 중복 검사
  // const handleAccountEmailCheck = useCallback(
  //   async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     e.preventDefault();
  //     alert('wkrejd');
  //     const q = query(collection(db, 'users'), where('email', '==', inputs.email));
  //     const querySnapshot = await getDocs(q);

  //     let exists = false;
  //     for (const doc of querySnapshot.docs) {
  //       exists = true;
  //       alert('이미 가입된 이메일입니다.');
  //       setIsAccountEmailCheck(false);
  //       break;
  //     }

  //     if (!exists) {
  //       alert('사용가능한 이메일입니다.');
  //       setIsAccountEmailCheck(true);
  //     }
  //   },
  //   [inputs.email]
  // );

  // const handleAccountEmailCheck1 = useCallback(
  //   async (e: ChangeEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //     alert('wkrejd');
  //     // const itemsCollectionRef = collection(db, 'users');
  //     const q = query(collection(db, 'users'), where('email', '==', inputs.email));
  //     const querySnapshot = await getDocs(q);

  //     let exists = false;
  //     // 가입된 이메일 중 중복 이메일 여부 확인
  //     for (const doc of querySnapshot.docs) {
  //       exists = true;
  //       alert('이미 가입된 이메일입니다.');
  //       setIsAccountEmailCheck(false);
  //       break; // 이미 가입된 이메일일 경우 break
  //     }

  //     if (!exists) {
  //       alert('사용가능한 이메일입니다.');
  //       setIsAccountEmailCheck(true);
  //     }

  //     // if (exists) {
  //     //   alert('이미 가입된 이메일입니다.');
  //     //   setisAccountEmailCheck(false);
  //     // } else {
  //     //   alert('사용가능한 이메일입니다.');
  //     //   setisAccountEmailCheck(true);
  //     // }
  //   },
  //   [inputs]
  // );

  const handleAccountEmailCheck = useCallback(async () => {
    // const uid = auth?.currentUser?.uid;
    const couponCollection = `users`;
    const ref = collection(db, couponCollection);
    const q = query(ref, where('email', '==', inputs.email));
    const querySnapshot = await getDocs(q);

    let exists = false;
    // 가입된 이메일 중 중복 이메일 여부 확인
    for (const doc of querySnapshot.docs) {
      exists = true;
      alert('이미 가입된 이메일입니다.');
      setIsAccountEmailCheck(false);
      break; // 이미 가입된 이메일일 경우 break
    }

    if (!exists) {
      alert('사용가능한 이메일입니다.');
      setIsAccountEmailCheck(true);
    }
  }, [inputs.email]);

  // 회원가입 버튼 클릭 시 작동
  const handleSignin = useCallback(() => {
    const { email, password, passwordCheck, name, address, addressDetail, phone } = inputs;
    const { term1, term2 } = termsList;

    if (email === '' || password === '' || passwordCheck === '' || name === '') {
      alert('필수 항목을 모두 입력해주세요');
      return;
    }
    if (!term1 || !term2) {
      // 필수 동의 항목 미체크 시 리턴
      alert('필수 동의 항목에 체크해주세요');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다');
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
          email,
          name,
          address,
          addressDetail,
          phone,
        });
        // toast.info(`${user.email} 님 회원가입 성공! 자동 로그인 되었습니다`);
        alert(`${name} 님 반갑습니다!`);

        // 신규 가입 쿠폰 발행
        const couponDetails = {
          id: '0',
          title: '신규 회원 10% 할인 쿠폰',
          expiration: 'indefinite',
          discount: 10,
          amount: false,
          percentage: true,
          status: true,
        };
        await issueCoupon(uid, couponDetails, '신규 가입 쿠폰이 발행되었습니다.');
        router.push('/');
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
          <StyledInput placeholder="EMAIL *" required type="email" name="email" value={inputs.email} onChange={onChange} border />
          <StyledButton
            title="중복 검사"
            fontSize={12}
            width={94}
            height={30}
            bgColor={theme.colors.lightGrayBgColor}
            fontColor={theme.colors.blackColor}
            border={`1px solid ${theme.colors.blackColor}`}
            onClick={handleAccountEmailCheck}
            disabled
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
          title="회원가입"
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
