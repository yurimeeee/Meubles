'use client';

import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { auth, db } from '@lib/firebase';
import { useRecoilState } from 'recoil';
import { cartItemsState, searchedItems } from '@recoil/atoms';

import theme from '@styles/theme';
import { Product } from '@type/types';
import { productData } from '@utils/productData';
import { BoldFont, FlexBox, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';
import ThumbnailItem from '@components/share/ThumbnailItem';
import BlankLoader from '@components/share/BlankLoader';

import User from '@assets/icons/user.svg';
import Cart from '@assets/icons/cart.svg';
import Search from '@assets/icons/search.svg';
import SearchIcon from '@assets/icons/SearchIcon';
import CloseIcon from '@assets/icons/CloseIcon';
import ArrowIcon from '@assets/icons/ArrowIcon';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { GrMenu } from 'react-icons/gr';
import { MdLogout } from 'react-icons/md';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { Unsubscribe } from 'firebase/auth';
import StyledBadge from '@components/styled/StyledBadge';

const Header = () => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // const [searchedList, setSearchedList] = useRecoilState<Product[]>(searchedItems);
  const [searchedList, setSearchedList] = useRecoilState(searchedItems);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    if (pathname.includes('furniture')) {
      setActive('FURNITURE');
    } else if (pathname.includes('lighting')) {
      setActive('LIGHTING');
    } else if (pathname.includes('sounds')) {
      setActive('SOUNDS');
    } else if (pathname.includes('accessories')) {
      setActive('ACCESSORIES');
    } else if (pathname.includes('new')) {
      setActive('NEW');
    } else if (pathname.includes('best')) {
      setActive('BEST');
    }
  }, [pathname]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchCartList = async () => {
      //쿼리생성
      const cartDataQuery = query(
        collection(db, `cart/${auth?.currentUser?.uid}/items`) //컬렉션 지정
      );
      unsubscribe = await onSnapshot(cartDataQuery, (snapshot) => {
        const cartList = snapshot.docs.map((doc) => {
          const { id, brand, name, price, quantity, img } = doc.data();
          return {
            id,
            brand,
            name,
            price,
            quantity,
            img,
            docId: doc.id,
          };
        });
        setCartItems(cartList);

        // setQuantity(
        //   cartList.map((item) => ({
        //     id: item?.id,
        //     quantity: item?.quantity,
        //   }))
        // );
      });
    };

    fetchCartList();
    return () => {
      unsubscribe && unsubscribe();
      // 사용자가 타임라인을 보고 있을때만 작동
    };
  }, []);

  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 입력한 값과 함께 '/search' 페이지로 이동
    router.push(`/search/${searchTerm}`);
    setSearchOpen(false);
  };
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (searchTerm) {
      const lowerCaseKeyword = searchTerm.toLowerCase(); // Convert to lowercase

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
        setSearchedList(filteredData as any);
      }, 200);
    } else {
      // If searchTerm is empty, clear the data immediately
      setData([]);
    }

    // Cleanup timeout on component unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId as NodeJS.Timeout);
      }
    };
  }, [searchTerm]);

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // 검색 모달 토글
  const toggleSearchModal = () => {
    setSearchOpen(!searchOpen);
    setSearchTerm('');
  };

  // 로그아웃 버튼 클릭 시 작동
  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        {/* 모바일 메뉴 */}
        <MenuButtonWrap>
          <MenuButton onClick={toggleMobileMenu}>
            <GrMenu size={24} color={theme.colors.blackColor} />
          </MenuButton>
        </MenuButtonWrap>

        <MenuOverlay $isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        <MenuWrap $isOpen={isMobileMenuOpen}>
          <MobileMenu>
            <MobileMenuButton>
              <IoMdClose size={24} color={theme.colors.grayIconColor} onClick={toggleMobileMenu} />
            </MobileMenuButton>
            <MobileMenuItem href={'/product/list/new'} onClick={toggleMobileMenu}>
              NEW
            </MobileMenuItem>
            <MobileMenuItem href={'/product/list/furniture'} onClick={toggleMobileMenu}>
              FURNITURE
            </MobileMenuItem>
            <MobileMenuItem href={'/product/list/lighting'} onClick={toggleMobileMenu}>
              LIGHTING
            </MobileMenuItem>
            <MobileMenuItem href={'/product/list/sounds'} onClick={toggleMobileMenu}>
              SOUNDS
            </MobileMenuItem>
            <MobileMenuItem href={'/product/list/accessories'} onClick={toggleMobileMenu}>
              ACCESSORIES
            </MobileMenuItem>
          </MobileMenu>
          {/* <MobileMenuButton> */}
          <MobileMenuFlex>
            {auth.currentUser ? (
              <MobileMenuButton
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
              >
                <MdLogout size={24} color={theme.colors.grayIconColor} />
                LOGOUT
              </MobileMenuButton>
            ) : (
              <MobileMenuItem href={'/login'} onClick={toggleMobileMenu}>
                LOGIN
              </MobileMenuItem>
            )}
          </MobileMenuFlex>
        </MenuWrap>
        {/* 모바일메뉴 */}

        <RowFlexBox>
          <Logo href={'/'}>
            <H1>Meubles</H1>
          </Logo>
        </RowFlexBox>
        <Menu>
          <MenuItem href={'/product/list/best'} $Active={active === 'BEST'}>
            BEST
          </MenuItem>
          <MenuItem href={'/product/list/new'} $Active={active === 'NEW'}>
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
          <MenuItem href={'/product/list/accessories'} $Active={active === 'ACCESSORIES'}>
            ACCESSORIES
          </MenuItem>
        </Menu>
        <RowFlexBox>
          <GNB>
            <PCLogout>
              {auth.currentUser && (
                <GNBItem href={'/login'} onClick={handleLogout}>
                  LOGOUT
                </GNBItem>
              )}
            </PCLogout>

            <GNBItem href={auth.currentUser ? '/mypage' : '/login'} title="PROFILE">
              <Icon src={User} alt="프로필" />
            </GNBItem>
            <GNBItem href={'/cart'}>
              <Icon src={Cart} alt="장바구니" title="CART" />
              {cartItems?.length > 0 && <StyledBadge text={cartItems.length} left={14} top={12} />}
            </GNBItem>
            <GNBButton>
              <Icon src={Search} alt="검색" onClick={toggleSearchModal} title="SEARCH" />
            </GNBButton>
          </GNB>
        </RowFlexBox>
      </Container>
      <Overlay $searchOpen={searchOpen} onClick={toggleSearchModal} />
      <Modal $searchOpen={searchOpen} $height={data.length !== 0 || searchTerm !== ''}>
        <CloseButton onClick={toggleSearchModal}>
          <CloseIcon />
        </CloseButton>
        <ModalContents>
          <ModalText>SEARCH</ModalText>
          <SearchInput>
            <Form onSubmit={handleSearch}>
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {searchTerm === '' ? <SearchIcon /> : <AiOutlineCloseCircle size={24} onClick={() => setSearchTerm('')} />}
            </Form>
          </SearchInput>
          {data.length === 0 && searchTerm !== '' && (
            <ProductList>
              {[...Array(3)].map((_, index) => (
                <BlankLoader key={index} width={140} mobileWidth={76} />
              ))}
            </ProductList>
          )}
          {/* 검색중인 결과 렌더링 */}
          {data.length > 0 && searchTerm && (
            <FlexBox>
              <FlexBox $gap="8px" $margin="0 0 8px">
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
                // <MoreView href={'/search'} onClick={toggleSearchModal}>
                <MoreView href={`/search/${searchTerm}`} onClick={toggleSearchModal}>
                  VIEW ALL
                  <ArrowIcon />
                </MoreView>
              )}
            </FlexBox>
          )}

          {searchTerm && data && (
            <>
              <ProductList>
                {data.slice(0, Math.min(5, data.length)).map((item, index) => (
                  <ThumbnailItem data={item} key={index} onClick={toggleSearchModal} maxWidth={140} />
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

  ${theme.devices.mobile} {
    padding: 10px 20px 20px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
`;
const RowFlexBox = styled.div`
  flex: 1;
`;
const Logo = styled(Link)`
  ${theme.devices.mobile} {
    display: block;
    flex: 1;
    text-align: center;
  }
`;
const H1 = styled.h1`
  ${theme.typography.h3}
  font-family: 'BaskervilleRegular';

  ${theme.devices.mobile} {
    ${theme.typography.h5}
  }
`;
const GNB = styled.nav`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;

  ${theme.devices.mobile} {
    gap: 12px;
  }
`;
const GNBItem = styled(Link)`
  position: relative;
  font-size: 12px;

  ${theme.devices.mobile} {
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
const GNBButton = styled.button`
  background: none;

  ${theme.devices.mobile} {
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
const MenuButtonWrap = styled.div`
  display: none;
  background: none;

  ${theme.devices.mobile} {
    display: block;
    flex: 1;
    text-align: left;
  }
`;
const MenuButton = styled.button`
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

  ${theme.devices.tablet} {
    gap: 20px;
  }

  ${theme.devices.mobile} {
    display: none;
  }
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
  padding: ${({ $height }) => ($height ? '40px' : '40px 40px 0')};
  transition: 0.3s;
  z-index: 100;

  ${theme.devices.mobile} {
    padding: ${({ $height }) => ($height ? '20px' : '20px 20px 0')};
  }
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

  ${theme.devices.mobile} {
    right: 20px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
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

  ${theme.devices.mobile} {
    gap: 12px;
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

const MenuWrap = styled.div<{ $isOpen: boolean }>`
  display: flex;
  position: fixed;
  flex-direction: column;
  z-index: 100;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${theme.colors.whiteColor};
  opacity: 1;
  transition: 0.4s;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      left: 0%;
    `}
`;
const MenuOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  z-index: 10;
`;

const MobileMenu = styled.div`
  width: 100%;
  padding: 15px 20px 20px;
  flex: 1;
`;
const MobileMenuItem = styled(Link)`
  ${theme.typography.body}
  display: block;
  padding: 13px 0;
`;
const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 13px 0;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.colors.grayIconColor};
  cursor: pointer;
`;
const MobileMenuFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 20px;
`;
const PCLogout = styled.div`
  ${theme.devices.mobile} {
    display: none;
  }
`;
