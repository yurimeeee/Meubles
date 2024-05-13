'use client';

import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import theme from '@styles/theme';
import { BoldFont } from '@components/styled/StyledComponents';
import StyledButton from '@components/styled/StyledButton';

import CartIcon from '@assets/icons/CartIcon';
import CloseIcon from '@assets/icons/CloseIcon';

type ModalProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  exist?: boolean;
};

const Modal = ({ modalOpen, setModalOpen, exist }: ModalProps) => {
  const router = useRouter();
  return (
    <>
      <Overlay
        $modalOpen={modalOpen}
        onClick={() => {
          setModalOpen(false);
        }}
      />
      <ModalWrap $modalOpen={modalOpen}>
        <CloseButton
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <CloseIcon />
        </CloseButton>
        <CartIcon />
        {!exist ? (
          <>
            <ModalText>장바구니에 상품이 담겼습니다.</ModalText>
            <StyledButton
              title="장바구니 바로가기"
              fontSize={12}
              width={130}
              height={30}
              bgColor={theme.colors.grayFontColor}
              fontColor={theme.colors.whiteColor}
              border={`1px solid ${theme.colors.blackColor}`}
              onClick={() => {
                router.push('/cart');
              }}
            />
          </>
        ) : (
          <>
            <ModalText>장바구니에 동일 상품이 있습니다.</ModalText>
            <StyledButton
              title="장바구니 담기"
              fontSize={12}
              width={130}
              height={30}
              bgColor={theme.colors.grayFontColor}
              fontColor={theme.colors.whiteColor}
              border={`1px solid ${theme.colors.blackColor}`}
              onClick={() => {
                router.push('/cart');
              }}
            />
          </>
        )}
      </ModalWrap>
    </>
  );
};

export default Modal;

const Overlay = styled.div<{ $modalOpen: boolean }>`
  display: ${({ $modalOpen }) => ($modalOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
const ModalWrap = styled.div<{ $modalOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.whiteColor};
  opacity: ${({ $modalOpen }) => ($modalOpen ? '1' : '0')};
  visibility: ${({ $modalOpen }) => ($modalOpen ? 'visible' : 'hidden')};
  padding: 24px 40px;
  transition: 0.3s;
  z-index: 100;
`;
const ModalText = styled(BoldFont)`
  ${theme.typography.body};
  font-family: 'AppleSDGothicNeoR';
  margin: 10px 0 20px;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }
`;
