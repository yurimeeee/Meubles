'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@lib/firebase';

import theme from '@styles/theme';
import { BoldFont, FlexBox, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';

import User from '@assets/icons/user.svg';
import Cart from '@assets/icons/cart.svg';
import Search from '@assets/icons/search.svg';
import SearchIcon from '@assets/icons/SearchIcon';
import CloseIcon from '@assets/icons/CloseIcon';
import { usePathname, useRouter } from 'next/navigation';

import { Product, productData } from '@utils/productData';
import ProductItem from '@components/share/ProductItem';
import ThumbnailItem from '@components/share/ThumbnailItem';
import ArrowIcon from '@assets/icons/ArrowIcon';
import Loader from '@components/share/Loader';
import BlankLoader from '@components/share/BlankLoader';

const Header = () => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const [data, setData] = useState<Product[]>([]);

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

  // useEffect(() => {
  //   if (searchTerm) {
  //     // const decodedKeyword = decodeURIComponent(params.keyword); // Decode the keyword
  //     const lowerCaseKeyword = searchTerm.toLowerCase(); // Convert to lowercase
  //     console.log('lowerCaseKeyword', lowerCaseKeyword);
  //     const filteredData = productData.filter(
  //       (product) =>
  //         String(product.name).toLowerCase().includes(lowerCaseKeyword.trim()) ||
  //         String(product.brand).toLowerCase().includes(lowerCaseKeyword.trim()) ||
  //         String(product.desc).toLowerCase().includes(lowerCaseKeyword.trim())
  //     );
  //     setData(filteredData);
  //     // setSearchTerm(decodedKeyword.trim());
  //   }
  //   if (searchTerm === '') {
  //     setData([]);
  //   }
  // }, [searchTerm]);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (searchTerm) {
      const lowerCaseKeyword = searchTerm.toLowerCase(); // Convert to lowercase
      console.log('lowerCaseKeyword', lowerCaseKeyword);

      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set new timeout
      timeoutId = setTimeout(() => {
        const filteredData = productData.filter(
          (product) =>
            String(product.name).toLowerCase().includes(lowerCaseKeyword.trim()) ||
            String(product.brand).toLowerCase().includes(lowerCaseKeyword.trim()) ||
            String(product.desc).toLowerCase().includes(lowerCaseKeyword.trim())
        );
        setData(filteredData);
      }, 200);
    } else {
      // If searchTerm is empty, clear the data immediately
      setData([]);
    }

    // Cleanup timeout on component unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  console.log('searchTerm', searchTerm);
  console.log('data', data);
  // console.log('data !== null', data.length !== 0);

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
          setSearchTerm('');
        }}
      />
      <Modal $searchOpen={searchOpen} $height={data.length !== 0 || searchTerm !== ''}>
        {/* <FlexBox $justifyContent="end"> */}
        <CloseButton
          onClick={() => {
            setSearchOpen(false);
            setSearchTerm('');
          }}
        >
          <CloseIcon />
        </CloseButton>
        {/* </FlexBox> */}
        <ModalContents>
          <ModalText>SEARCH</ModalText>
          <SearchInput>
            <Form onSubmit={handleSearch}>
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {/* <button> */}
              <SearchIcon />
              {/* </button> */}
            </Form>
          </SearchInput>
          {/* {data.length === 0 && searchTerm !== '' && <Loader />} */}
          {data.length === 0 && searchTerm !== '' && (
            <ProductList>
              {[...Array(3)].map((_, index) => (
                <BlankLoader key={index} width="140px" />
              ))}
            </ProductList>
          )}
          {/* 검색중인 결과 렌더링 */}
          {data.length > 0 && searchTerm && (
            <FlexBox>
              <FlexBox $gap="8px">
                <RegularFont $fontSize={14} $fontColor={theme.colors.grayFontColor}>
                  RESULTS
                  {/* 검색결과 */}
                </RegularFont>
                <SemiBoldFont $fontSize={14} $fontColor={theme.colors.deepGrayFontColor}>
                  {data.length}
                </SemiBoldFont>
              </FlexBox>
              {/* <RegularFont $fontSize={14} $fontColor={theme.colors.grayFontColor}>
                검색 결과 {data.length}
              </RegularFont> */}
              {data.length > 4 && (
                <MoreView href={'/'}>
                  VIEW ALL
                  <ArrowIcon />
                </MoreView>
              )}
            </FlexBox>
          )}
          {/* {data.length > 4 && searchTerm && (
            <MoreView href={'/'}>
              VIEW ALL
              <ArrowIcon />
            </MoreView>
          )} */}
          {searchTerm && data && (
            <>
              <ProductList>
                {data.slice(0, Math.min(5, data.length)).map((item, index) => (
                  <ThumbnailItem data={item} key={index} />
                ))}
              </ProductList>
            </>
          )}
        </ModalContents>
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
const Modal = styled.div<{ $searchOpen: boolean; $height?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${({ $height }) => ($height ? '390px' : '250px')};
  background-color: ${theme.colors.whiteColor};
  opacity: ${({ $searchOpen }) => ($searchOpen ? '1' : '0')};
  visibility: ${({ $searchOpen }) => ($searchOpen ? 'visible' : 'hidden')};
  /* padding: 40px; */
  padding: ${({ $height }) => ($height ? '40px' : '40px 0 0')};
  transition: 0.3s;
  z-index: 100;
`;
const ModalContents = styled.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 40px;
  cursor: pointer;
`;
const ModalText = styled(BoldFont)`
  ${theme.typography.h4};
  margin-bottom: 40px;
`;
const SearchInput = styled.div`
  display: flex;
  width: 100%;
  max-width: 760px;
  height: 50px;
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
const ProductList = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  > div {
    max-width: 110px;
    aspect-ratio: 1/1;
  }
`;
const MoreView = styled(Link)`
  display: flex;
  gap: 10px;
  justify-content: end;
  margin-bottom: 8px;
  color: ${theme.colors.grayFontColor};
  font-size: 14px;
`;
