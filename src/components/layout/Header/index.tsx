'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@lib/firebase';

import theme from '@styles/theme';
import { BoldFont, FlexBox } from '@components/styled/StyledComponents';

import User from '@assets/icons/user.svg';
import Cart from '@assets/icons/cart.svg';
import Search from '@assets/icons/search.svg';
import SearchIcon from '@assets/icons/SearchIcon';
import CloseIcon from '@assets/icons/CloseIcon';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (pathname.includes('furniture')) {
      setActive('FURNITURE');
    } else if (pathname.includes('lighting')) {
      setActive('LIGHTING');
    } else if (pathname.includes('sounds')) {
      setActive('SOUNDS');
    }
  }, [pathname]);

  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 입력한 값과 함께 '/search' 페이지로 이동
    router.push(`/search/${searchTerm}`);
    setSearchOpen(false);
  };

  return (
    <Wrapper>
      <Container>
        <Logo href={'/'}>
          <H1>Meubles</H1>
        </Logo>
        <Menu>
          <MenuItem href={'/'} $Active={active === 'NEW'}>
            NEW
          </MenuItem>
          <MenuItem href={'/product/list/furniture'} $Active={active === 'FURNITURE'}>
            FURNITURE
          </MenuItem>
          <MenuItem href={'/product/list/lighting'} $Active={active === 'LIGHTING'}>
            LIGHTING
          </MenuItem>
          <MenuItem href={'/product/list/sounds'} $Active={active === 'SOUNDS'}>
            SOUNDS
          </MenuItem>
        </Menu>
        <GNB>
          <GNBItem href={auth.currentUser ? '/mypage' : '/login'}>
            <Icon src={User} alt="프로필" />
          </GNBItem>
          <GNBItem href={'/cart'}>
            <Icon src={Cart} alt="장바구니" />
          </GNBItem>
          <GNBButton>
            <Icon
              src={Search}
              alt="검색"
              onClick={() => {
                setSearchOpen(true);
              }}
            />
          </GNBButton>
        </GNB>
      </Container>
      <Overlay
        $searchOpen={searchOpen}
        onClick={() => {
          setSearchOpen(false);
        }}
      />
      <Modal $searchOpen={searchOpen}>
        <FlexBox $justifyContent="end">
          <CloseButton
            onClick={() => {
              setSearchOpen(false);
            }}
          >
            <CloseIcon />
          </CloseButton>
        </FlexBox>
        <ModalText>SEARCH</ModalText>
        <SearchInput>
          <Form onSubmit={handleSearch}>
            <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {/* <button> */}
            <SearchIcon />
            {/* </button> */}
          </Form>
        </SearchInput>
      </Modal>
    </Wrapper>
  );
};

export default Header;

export const Wrapper = styled.header`
  width: 100%;
  height: 70px;
  padding: 30px 20px 20px;
  margin: 0 auto;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
  transition: 0.5s;
  background-color: ${theme.colors.lightGrayBgColor};
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
`;
const Logo = styled(Link)``;
const H1 = styled.h1`
  ${theme.typography.h3}
  font-family: 'BaskervilleRegular';
`;
const GNB = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const GNBItem = styled(Link)``;
const GNBButton = styled.button`
  background: none;
`;
const Icon = styled(Image)`
  width: 24px;
  height: 24px;
`;
const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const MenuItem = styled(Link)<{ $Active: boolean }>`
  ${theme.typography.h7};
  font-family: 'AppleSDGothicNeoR';
  color: ${({ $Active }) => ($Active ? theme.colors.blackColor : theme.colors.grayFontColor)};
  transition: 0.3s;
`;
const Overlay = styled.div<{ $searchOpen: boolean }>`
  display: ${({ $searchOpen }) => ($searchOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  z-index: 10;
`;
const Modal = styled.div<{ $searchOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${({ $searchOpen }) => ($searchOpen ? '30vh' : 0)};
  background-color: ${theme.colors.whiteColor};
  opacity: ${({ $searchOpen }) => ($searchOpen ? '1' : '0')};
  visibility: ${({ $searchOpen }) => ($searchOpen ? 'visible' : 'hidden')};
  padding: 40px;
  transition: 0.3s;
  z-index: 100;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
const ModalText = styled(BoldFont)`
  ${theme.typography.h3};
  margin-bottom: 60px;
`;
const SearchInput = styled.div`
  display: flex;
  width: 100%;
  max-width: 760px;
  height: 60px;
  padding-bottom: 10px;
  margin-bottom: 45px;
  border-bottom: 2px solid ${theme.colors.blackColor};
  svg {
    cursor: pointer;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex: 1;
`;
const Input = styled.input`
  width: 100%;
`;
