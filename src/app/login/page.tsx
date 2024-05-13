'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@lib/firebase';
import * as L from './login.style';

import theme from '@styles/theme';
import { FlexBox } from '@components/styled/StyledComponents';
import StyledInput from '@components/styled/StyledInput';
import StyledCheckbox from '@components/styled/StyledCheckbox';
import StyledButton from '@components/styled/StyledButton';

export default function Login() {
  const router = useRouter();
  const [saveID, setSaveID] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
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
        router.back();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, [inputs]);

  return (
    <L.Wrapper>
      <L.Form>
        <StyledInput placeholder="EMAIL" name="email" value={inputs.email} required onChange={onChange} />
        <StyledInput placeholder="PASSWORD" type="password" name="password" value={inputs.password} required onChange={onChange} />
      </L.Form>
      <FlexBox $justifyContent="space-between" $margin="0 0 32px">
        <StyledCheckbox label="Save ID" checkboxId="saveId" checked={saveID} onChange={() => setSaveID(!saveID)} />
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
        />
      </FlexBox>
    </L.Wrapper>
  );
}
