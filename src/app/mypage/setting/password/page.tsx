'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePassword } from 'firebase/auth';

import * as J from '../../../join/join.style';
import theme from '@styles/theme';
import { auth } from '@lib/firebase';

import { FlexBox } from '@components/styled/StyledComponents';
import StyledInput from '@components/styled/StyledInput';
import StyledButton from '@components/styled/StyledButton';

export default function MypageSettingPassword() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    password: '',
    passwordCheck: '',
  });

  useEffect(() => {
    if (!auth?.currentUser) {
      alert('로그인이 필요합니다.');
      router.back();
    }
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

  // 수정 버튼 클릭 시 비밀번호 수정
  const handleUserInfoUpdate = useCallback(async () => {
    const { password, passwordCheck } = inputs;
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    updatePassword(user, password)
      .then(async () => {
        alert('비밀번호가 변경되었습니다. 다시 로그인 해주새요.');
        await auth.signOut();
        router.push('/login');
      })
      .catch((error) => {
        alert('비밀번호가 변경에 실패했습니다. 다시 시도해주새요.');
        console.log(error);
      });
  }, [inputs]);

  // 취소 버튼 클릭 시
  const handleUpdateCancel = useCallback(async () => {
    const isCanceled = window.confirm('비밀번호 변경을 취소하시겠습니까?');
    if (!isCanceled) {
      return;
    } else {
      router.back();
    }
  }, []);

  return (
    <J.Wrapper>
      <J.Form>
        <StyledInput placeholder="PASSWORD *" required type="password" name="password" value={inputs.password} onChange={onChange} />
        <StyledInput placeholder="PASSWORD CHECK *" required type="password" name="passwordCheck" value={inputs.passwordCheck} onChange={onChange} />
      </J.Form>

      <FlexBox $justifyContent="space-between" $gap="8px">
        <StyledButton
          title="변경"
          onClick={handleUserInfoUpdate}
          fontSize={16}
          bgColor={theme.colors.blackColor}
          fontColor={theme.colors.whiteColor}
          border={`1px solid ${theme.colors.blackColor}`}
        />
        <StyledButton
          title="취소"
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
