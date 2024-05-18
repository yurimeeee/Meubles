'use client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { collection, getDocs, query, where } from 'firebase/firestore';

import theme from '@styles/theme';
import { auth, db } from '@lib/firebase';
import { useCouponIssuer } from '@hooks/useCouponIssuer';
import { numberFormatter } from '@utils/formatter';
import { Coupon } from '@type/types';
import { FlexBox, MediumFont, NoResults, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';
import { TableRow, TableCell, TableText } from '@components/share/Table/table.style';
import { Loader } from '@components/share/BlankLoader';
import StyledInput from '@components/styled/StyledInput';
import StyledButton from '@components/styled/StyledButton';

const Header = [
  { label: 'STATUS', width: 12.5 },
  { label: 'NAME', width: 35 },
  { label: 'DISCOUNT', width: 12.5 },
  { label: 'EXPIRATION', width: 20 },
  { label: 'MIN', width: 20 },
];

const CouponList = () => {
  const { issueCoupon } = useCouponIssuer(); // 쿠폰 발행 커스텀 훅
  const [couponCode, setCouponCode] = useState<string>(); // 쿠폰 코드 값
  const [couponData, setCouponData] = useState<Coupon[] | null>(null); // 쿠폰 데이터

  // 쿠폰 데이터 가져오가
  useEffect(() => {
    const fetchData = async () => {
      const uid = auth?.currentUser?.uid;
      const querySnapshot = await getDocs(collection(db, `users/${uid}/coupon`));
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCouponData(dataList as any);
    };
    fetchData();
  }, [auth?.currentUser?.uid, setCouponData]);

  // 인풋에 값 입력 시
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCouponCode(e.target.value);
    },
    [couponCode]
  );

  // 쿠폰 코드 입력 후 버튼 클릭 시, 쿠폰 발행
  const handleCouponRegister = useCallback(async () => {
    if (!auth?.currentUser) {
      return;
    }
    if (couponCode !== 'SummerCoupon') {
      alert('쿠폰 코드가 맞지 않습니다.');
      return;
    }

    // 동일 쿠폰 발행 여부 확인
    const couponCollection = `users/${auth.currentUser.uid}/coupon`;
    const ref = collection(db, couponCollection);
    const q = query(ref, where('title', '==', '[SUMMER SPECIAL COUPON] 여름 맞이 특별 할인'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      alert('이미 발급 받은 쿠폰입니다.');
      return;
    }

    // 발행 이력 없는 경우, 쿠폰 발행
    const today = new Date();
    const expirationDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    const formattedExpiration = expirationDate.toISOString().slice(0, 10);

    const couponDetails = {
      id: '0',
      title: '[SUMMER SPECIAL COUPON] 여름 맞이 특별 할인',
      expiration: formattedExpiration,
      discount: 100000,
      amount: true,
      percentage: false,
      minPrice: 1000000,
      status: true,
    };

    await issueCoupon(auth.currentUser.uid, couponDetails);
  }, [couponCode]);

  return (
    <Wrapper>
      <Description>
        <DescTitle>COUPON CODE REGISTER</DescTitle>
        <DescText>
          쿠폰 코드 "<SemiBoldFont $fontColor={theme.colors.deepGrayFontColor}>SummerCoupon</SemiBoldFont>" 를 입력하여 쿠폰을 등록하세요.
        </DescText>
      </Description>
      <RegiserWrap>
        <FlexBox $gap="10px">
          <StyledInput placeholder="COUPON CODE" name="coupon" value={couponCode} onChange={onChange} maxLength={30} />
          <StyledButton
            title="REGISTER"
            onClick={handleCouponRegister}
            fontSize={16}
            bgColor={theme.colors.lightGrayBgColor}
            fontColor={theme.colors.blackColor}
            border={`1px solid ${theme.colors.blackColor}`}
          />
        </FlexBox>
      </RegiserWrap>

      <CouponListWrap>
        <TableRow $height={50}>
          <TableCell $width={Header[0].width}>
            <TableText>STATUS</TableText>
          </TableCell>
          <TableCell $width={Header[1].width}>
            <TableText>NAME</TableText>
          </TableCell>
          <TableCell $width={Header[2].width}>
            <TableText>DISCOUNT</TableText>
          </TableCell>
          <TableCell $width={Header[3].width} $padding="16px 0">
            <TableText>EXPIRATION</TableText>
          </TableCell>
          <TableCell $width={Header[4].width} $padding="16px 0">
            <TableText>MIN</TableText>
          </TableCell>
        </TableRow>
        {couponData === null ? (
          <Loader />
        ) : couponData && couponData.length > 0 ? (
          couponData.map((item, idx) => (
            <TableRow key={idx} $height={50} $disabled={!item?.status}>
              <TableCell $width={Header[0].width}>
                <TableText>{item.status ? '사용 가능' : '사용 불가'}</TableText>
              </TableCell>
              <TableCell $width={Header[1].width}>
                <TableText>{item.title}</TableText>
              </TableCell>
              <TableCell $width={Header[2].width}>
                <TableText>{item.amount ? `${numberFormatter(item.discount)} 원` : `${item.discount} %`}</TableText>
              </TableCell>
              <TableCell $width={Header[3].width} $padding="16px 0">
                <TableText>{item.expiration}</TableText>
              </TableCell>
              <TableCell $width={Header[4].width} $padding="16px 0">
                <TableText>{item.minPrice ? `최소 결제 금액 ${numberFormatter(item.minPrice)} 원` : '-'}</TableText>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <NoResults>조회된 쿠폰이 없습니다.</NoResults>
        )}
      </CouponListWrap>

      <MobileCouponListWrap>
        {couponData === null ? (
          <Loader />
        ) : couponData && couponData.length > 0 ? (
          couponData.map((item, idx) => (
            <CouponCard key={idx} $disabled={!item?.status}>
              <Title>{item.title}</Title>
              <SubText>{item.amount ? `${numberFormatter(item.discount)} 원` : `${item.discount} %`}</SubText>
              <SmallText>{item.minPrice ? `최소 결제 금액 ${numberFormatter(item.minPrice)} 원` : '-'}</SmallText>
              <FlexBox $justifyContent="space-between" $margin="10px 0 0">
                <SmallText $fontColor={theme.colors.deepGrayFontColor}>{item.expiration}</SmallText>
                <SmallText $fontColor={theme.colors.deepGrayFontColor}>{item.status ? '사용 가능' : '사용 불가'}</SmallText>
              </FlexBox>
            </CouponCard>
          ))
        ) : (
          <NoResults>조회된 쿠폰이 없습니다.</NoResults>
        )}
      </MobileCouponListWrap>
    </Wrapper>
  );
};

export default CouponList;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
`;
const Description = styled.div``;
const RegiserWrap = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 32px;
`;
const DescTitle = styled(SemiBoldFont)`
  ${theme.typography.h5};
  margin-bottom: 10px;
`;
const DescText = styled(RegularFont)`
  ${theme.typography.body};
  color: ${theme.colors.deepGrayFontColor};
  margin-bottom: 32px;

  * {
    display: inline;
  }
`;
const CouponListWrap = styled.div`
  display: flex;
  flex-direction: column;

  ${theme.devices.mobile} {
    display: none;
  }
`;
const MobileCouponListWrap = styled.div`
  display: none;
  flex-direction: column;
  border-top: 1px solid ${theme.colors.grayFontColor};
  border-bottom: 1px solid ${theme.colors.grayFontColor};

  ${theme.devices.mobile} {
    display: flex;
  }
`;
const CouponCard = styled.div<{ $disabled?: boolean }>`
  padding: 12px 0;
  border-top: 1px solid ${theme.colors.grayFontColor};
  border-bottom: 1px solid ${theme.colors.grayFontColor};

  ${({ $disabled }) =>
    $disabled &&
    css`
      & * {
        color: ${theme.colors.lightGrayFontColor};
      }
    `};
`;
const Title = styled(MediumFont)`
  ${theme.typography.body};
  margin-bottom: 8px;
`;
const SubText = styled(RegularFont)`
  ${theme.typography.sm};
`;
const SmallText = styled(RegularFont)`
  font-size: 12px;
`;
