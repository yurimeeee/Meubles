'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '@lib/firebase';
import * as L from './login.style';

import theme from '@styles/theme';
import { FlexBox, RegularFont } from '@components/styled/StyledComponents';
import StyledInput from '@components/styled/StyledInput';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import StyledButton from '@components/styled/StyledButton';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useCouponIssuer } from '@hooks/useCouponIssuer';

export default function Login() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [isSaveId, setIsSaveId] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const { issueCoupon } = useCouponIssuer(); // 쿠폰 발행 커스텀 훅
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // 페이지 로드 시 쿠키에서 아이디 값을 읽어와서 상태에 설정
    const savedUserId = cookies?.userId;
    if (savedUserId) {
      setInputs((inputs) => ({ ...inputs, email: savedUserId }));
      setIsSaveId(true); // 쿠키에 userId가 있으면 아이디 저장이 체크된 것으로 간주
    } else {
      setIsSaveId(false); // 쿠키에 userId가 없으면 아이디 저장이 체크되지 않은 것으로 간주
    }
  }, [cookies]);

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
  // toast('dfdf');
  // useEffect(() => {
  //   toast.error('dfdf');
  // });
  // 로그인 버튼 클릭 시 작동
  const handleLogin = useCallback(() => {
    const { email, password } = inputs;

    if (email === '' || password === '') {
      alert('필수 항목을 모두 입력해주세요');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`로그인 되었습니다`);

        if (isSaveId) {
          // 아이디 저장이 체크되어 있을 때만 실행
          setCookie('userId', email, {
            path: '/',
            maxAge: 10 * 365 * 24 * 60 * 60,
          });
        } else {
          removeCookie('userId'); // 아이디 저장이 체크되어 있지 않으면 쿠키에서 제거
        }

        router.back();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, [inputs]);

  // 구글 로그인 버튼 클릭 시 구글 소셜 로그인
  const handleGoogleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // dispatch(yesLogin());
        alert(`로그인 되었습니다`);

        const uid = auth?.currentUser?.uid;
        if (!uid) {
          router.push('/');
          return;
        }

        // 유저 컬렉션 참조
        const usersCollection = collection(db, 'users');

        // 소셜 로그인 정보 유저 db에 저장
        await setDoc(doc(usersCollection, uid), {
          email: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          address: '',
          addressDetail: '',
          phone: '',
        });
        router.push('/');

        // 동일 쿠폰 발행 여부 확인
        const couponCollection = `users/${uid}/coupon`;
        const ref = collection(db, couponCollection);
        const q = query(ref, where('title', '==', '신규 회원 10% 할인 쿠폰'));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          return;
        } else {
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
        }
      })
      .catch((error) => {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      });
  };

  // 비밀번호 변경 이메일 발송
  const onChangePassword = async () => {
    try {
      // const provider = new GoogleAuthProvider();
      await sendPasswordResetEmail(auth, inputs.email)
        .then(() => {
          // Password reset email sent!
          alert('비밀번호 재설정 이메일이 발송되었습니다.');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <L.Wrapper>
      <L.Form>
        <StyledInput placeholder="EMAIL" name="email" value={inputs.email} required onChange={onChange} />
        <StyledInput placeholder="PASSWORD" type="password" name="password" value={inputs.password} required onChange={onChange} />
      </L.Form>
      <FlexBox $justifyContent="space-between" $margin="0 0 32px">
        <StyledCheckbox label="아이디 저장" checkboxId="isSaveId" checked={isSaveId} onChange={() => setIsSaveId(!isSaveId)} />
        <L.LinkButton href={'/join'}>회원가입</L.LinkButton>
      </FlexBox>
      <FlexBox $flexDirection="column" $justifyContent="space-between" $gap="8px">
        <StyledButton title="로그인" onClick={handleLogin} fontSize={16} bgColor={theme.colors.blackColor} fontColor={theme.colors.whiteColor} />
        <StyledButton
          title="구글 로그인"
          fontSize={16}
          bgColor={theme.colors.lightGrayBgColor}
          fontColor={theme.colors.blackColor}
          border={`1px solid ${theme.colors.blackColor}`}
          onClick={handleGoogleLogin}
        />
      </FlexBox>
      {/* <L.Password onClick={onChangePassword}>비밀번호 찾기</L.Password> */}
    </L.Wrapper>
  );
}
