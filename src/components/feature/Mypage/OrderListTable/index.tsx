import { Loader } from '@components/share/BlankLoader';
import TableHeader, { HeaderType } from '@components/share/Table/TableHeader';
import { TableRow, TableCell, TableText, TableImg, ItemInfo, ProductName, Brand, CartTableRow } from '@components/share/Table/table.style';

import React, { useCallback, useEffect, useState } from 'react';
import { numberFormatter } from '@utils/formatter';
import { TableBody } from '../../../share/Table/table.style';
import { useRouter } from 'next/navigation';
import { NoResults } from '@components/styled/StyledComponents';
import { Product } from '@type/types';
import theme from '@styles/theme';
import styled from 'styled-components';
import { auth, db } from '@lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

type OrderListTableProps = {
  // headers: HeaderType[];
  headers: any[];
  data?: any;
};

const OrderListTable = ({ headers = [], data }: OrderListTableProps) => {
  const router = useRouter();
  const [orderList, setOrderList] = useState<any[]>(0);

  // 북마크 리스트 fetch
  const fetchOrderData = useCallback(async () => {
    const uid = auth?.currentUser?.uid;
    const querySnapshot = await getDocs(collection(db, `users/${uid}/orderlist`));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrderList(data);
  }, [auth?.currentUser?.uid]);

  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);
  console.log('orderList', orderList);

  function convertTimestampToDate(timestamp: any) {
    const { seconds, nanoseconds } = timestamp;

    // seconds와 nanoseconds를 합쳐서 밀리초 단위의 시간을 계산
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;

    // 밀리초 단위의 시간을 Date 객체로 변환
    const date = new Date(milliseconds);

    // 날짜를 원하는 형식으로 변환 (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];

    return formattedDate;
  }

  return (
    <Wrapper>
      {/* <TableHeader headers={Header} /> */}
      <TableRow>
        {headers.map((header: HeaderType, index: number) => {
          return (
            <TableCell key={`${index}-table-header`} $minWidth={header?.minWidth} $width={header.width} $justifyContent="center">
              {header.label}
            </TableCell>
          );
        })}
      </TableRow>
      <TableBody>
        {orderList === null ? (
          <Loader />
        ) : orderList?.length > 0 ? (
          orderList?.map((item: any, idx: number) => (
            <OrderWrap key={idx}>
              {item.items?.map((product: any, idx: number) => (
                <CartTableRow $height={120}>
                  <TableCell $minWidth={headers[0].minWidth} $width={headers[0].width}>
                    <TableText>{convertTimestampToDate(item.timestamp)}</TableText>
                  </TableCell>
                  <TableCell
                    $minWidth={headers[1].minWidth}
                    $width={headers[1].width}
                    // onClick={() => {
                    //   router.push(`/product/${item.id}`);
                    // }}
                    // $padding="10px 0"
                  >
                    <TableImg src={product.img} alt={product.name} />
                    <ItemInfo>
                      <Brand>{product.brand}</Brand>
                      <ProductName>{product.name}</ProductName>
                    </ItemInfo>
                    {/* <TableText>{product?.name}</TableText> */}
                  </TableCell>
                  <TableCell $minWidth={headers[2].minWidth} $width={headers[3].width} $padding="16px 0">
                    <TableText>{product.quantity}</TableText>
                  </TableCell>
                  <TableCell $minWidth={headers[3].minWidth} $width={headers[3].width} $padding="16px 0">
                    <TableText>{numberFormatter(product.price * product.quantity)}</TableText>
                  </TableCell>
                  <TableCell $minWidth={headers[4].minWidth} $width={headers[4].width} $padding="16px 0">
                    <TableText>{'-'}</TableText>
                  </TableCell>
                </CartTableRow>
              ))}
            </OrderWrap>
          ))
        ) : (
          <NoResults>주문 내역이 없습니다</NoResults>
        )}
      </TableBody>
    </Wrapper>
  );
};

export default OrderListTable;

const Wrapper = styled.div`
  border-top: 2px solid ${theme.colors.blackColor};
  border-bottom: 2px solid ${theme.colors.blackColor};
`;
const OrderWrap = styled.div`
  /* border-top: 2px solid ${theme.colors.blackColor}; */
  border-bottom: 1px solid ${theme.colors.blackColor};

  &:last-child {
    border-bottom: none;
  }
`;
