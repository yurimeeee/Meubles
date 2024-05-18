'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@lib/firebase';
import * as L from './login.style';

import theme from '@styles/theme';
import { FlexBox, RegularFont } from '@components/styled/StyledComponents';
import StyledInput from '@components/styled/StyledInput';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import StyledButton from '@components/styled/StyledButton';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [isSaveId, setIsSaveId] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
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
        // alert(`로그인 되었습니다`);

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
    // try {
    //   // const provider = new GoogleAuthProvider();
    //   await signInWithPopup(auth, provider);
    //   router.back();
    // } catch (error) {
    //   console.log(error);
    // }

    signInWithPopup(auth, provider)
      .then((result) => {
        // dispatch(yesLogin());
        alert('로그인 성공');
        window.location.replace('/');
      })
      .catch((error) => {
        // dispatch(noLogin());
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        console.log(credential);
        alert('로그인 실패');
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
          console.log('비밀번호 재설정 이메일이 성공적으로 보내졌습니다.');
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
        <StyledCheckbox label="Save ID" checkboxId="isSaveId" checked={isSaveId} onChange={() => setIsSaveId(!isSaveId)} />
        <L.LinkButton href={'/join'}>Register</L.LinkButton>
      </FlexBox>
      <FlexBox $flexDirection="column" $justifyContent="space-between" $gap="8px">
        <StyledButton title="LOGIN" onClick={handleLogin} fontSize={16} bgColor={theme.colors.blackColor} fontColor={theme.colors.whiteColor} />
        <StyledButton
          title="LOGIN FOR GOOGLE"
          fontSize={16}
          bgColor={theme.colors.lightGrayBgColor}
          fontColor={theme.colors.blackColor}
          border={`1px solid ${theme.colors.blackColor}`}
          onClick={handleGoogleLogin}
        />
      </FlexBox>
      <RegularFont onClick={onChangePassword}>Have you forgotten your password?</RegularFont>
    </L.Wrapper>
  );
}
