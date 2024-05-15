'use client';

import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@lib/firebase';
import { useRecoilState } from 'recoil';
import { searchedItems } from '@recoil/atoms';

import theme from '@styles/theme';
import { Product, productData } from '@utils/productData';
import { BoldFont, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';
import ThumbnailItem from '@components/share/ThumbnailItem';
import BlankLoader from '@components/share/BlankLoader';

import User from '@assets/icons/user.svg';
import Cart from '@assets/icons/cart.svg';
import Search from '@assets/icons/search.svg';
import SearchIcon from '@assets/icons/SearchIcon';
import CloseIcon from '@assets/icons/CloseIcon';
import ArrowIcon from '@assets/icons/ArrowIcon';

import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const pathname = usePathname();

  return (
    <Wrapper>
      <Container>
        <FlexBox>
          <Logo href={'/'}>Meubles</Logo>
          <GreyText>Express your emotions in this space.</GreyText>
          <SnsWrap>
            <SnsLink href={'/'}>
              <FaFacebookF color={theme.colors.darkGrayFontColor} size={20} />
            </SnsLink>
            <SnsLink href={'/'}>
              <AiFillInstagram color={theme.colors.darkGrayFontColor} size={20} />
            </SnsLink>
            <SnsLink href={'/'}>
              <FaYoutube color={theme.colors.darkGrayFontColor} size={20} />
            </SnsLink>
          </SnsWrap>
        </FlexBox>
        <GnbMWrapper>
          <GnbMenu>
            <GnbHead>Information</GnbHead>
            <GnbItem>About</GnbItem>
            <GnbItem>Product</GnbItem>
            <GnbItem>Blog</GnbItem>
          </GnbMenu>
          <GnbMenu>
            <GnbHead>Company</GnbHead>
            <GnbItem>Community</GnbItem>
            <GnbItem>Career</GnbItem>
            <GnbItem>Our story</GnbItem>
          </GnbMenu>
          <GnbMenu>
            <GnbHead>Contact</GnbHead>
            <GnbItem>Getting Started</GnbItem>
            <GnbItem>Pricing</GnbItem>
            <GnbItem>Resources</GnbItem>
          </GnbMenu>
        </GnbMWrapper>
      </Container>
    </Wrapper>
  );
};

export default Footer;

export const Wrapper = styled.header`
  width: 100vw;
  margin-top: 200px;
  background-color: ${theme.colors.whiteColor};

  ${theme.devices.mobile} {
    margin-top: 100px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 40px 20px 50px;

  ${theme.devices.desktop} {
    padding: 40px 0 50px;
  }

  ${theme.devices.mobile} {
    flex-direction: column;
    align-items: start;
    gap: 20px;
  }
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${theme.devices.mobile} {
    gap: 8px;
  }
`;

const Logo = styled(Link)`
  ${theme.typography.h4};
  font-family: 'BaskervilleRegular';

  ${theme.devices.mobile} {
    ${theme.typography.h6}
  }
`;

const GreyText = styled(RegularFont)`
  ${theme.typography.body};
  color: ${theme.colors.grayFontColor} !important;

  ${theme.devices.mobile} {
    font-size: 14px;
  }
`;
const SnsWrap = styled.div`
  display: flex;
  gap: 20px;

  ${theme.devices.mobile} {
    margin-bottom: 16px;
  }
`;
const SnsLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.grayBorderColor};

  ${theme.devices.mobile} {
    width: 40px;
    height: 40px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
const GnbMWrapper = styled.div`
  display: flex;
  gap: 20px;

  ${theme.devices.mobile} {
    /* flex-direction: column; */
    gap: 20px;
  }
`;
const GnbMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  * {
    font-size: 14px;
  }

  ${theme.devices.mobile} {
    gap: 2px;
    * {
      font-size: 13px !important;
    }
  }
`;
const GnbHead = styled(SemiBoldFont)`
  margin-bottom: 4px;
`;
const GnbItem = styled(RegularFont)`
  color: ${theme.colors.grayFontColor} !important;
  cursor: pointer;
`;
