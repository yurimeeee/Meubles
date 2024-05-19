import { Loader } from '@components/share/BlankLoader';
import TableHeader, { HeaderType } from '@components/share/Table/TableHeader';
import { TableRow, TableCell, TableText, TableImg, ItemInfo, ProductName } from '@components/share/Table/table.style';

import React from 'react';
import { numberFormatter } from '@utils/formatter';
import { TableBody } from '../../../share/Table/table.style';
import { useRouter } from 'next/navigation';
import { NoResults } from '@components/styled/StyledComponents';
import { Product } from '@type/types';

type OrderListTableProps = {
  // headers: HeaderType[];
  headers: any[];
  data?: any;
};

const OrderListTable = ({ headers = [], data }: OrderListTableProps) => {
  const router = useRouter();
  return (
    <>
      {/* <TableHeader headers={Header} /> */}
      <TableRow>
        {headers.map((header: HeaderType, index: number) => {
          return (
            <TableCell key={`${index}-table-header`} $minWidth={header?.minWidth} $width={header.width}>
              {header.label}
            </TableCell>
          );
        })}
      </TableRow>
      <TableBody>
        {data === null ? (
          <Loader />
        ) : data?.length > 0 ? (
          data?.map((item: any, index: number) => (
            <TableRow $height={120}>
              <TableCell $minWidth={headers[0].minWidth} $width={headers[0].width}>
                <TableText></TableText>
              </TableCell>
              <TableCell
                $minWidth={headers[1].minWidth}
                $width={headers[1].width}
                // onClick={() => {
                //   router.push(`/product/${item.id}`);
                // }}
                $padding="10px 0"
              >
                {/* <TableImg src={item.img} alt={item.name} /> */}
                <ItemInfo>
                  {/* <Brand>{item.brand}</Brand>
                  <ProductName>{item.name}</ProductName> */}
                </ItemInfo>
                {/* <TableText>{item?.name}</TableText> */}
              </TableCell>
              <TableCell $minWidth={headers[2].minWidth} $width={headers[3].width} $padding="16px 0">
                <TableText></TableText>
              </TableCell>
              <TableCell $minWidth={headers[3].minWidth} $width={headers[3].width} $padding="16px 0">
                {/* <TableText>{numberFormatter(data.price * data.quantity)}</TableText> */}
              </TableCell>
              <TableCell $minWidth={headers[4].minWidth} $width={headers[4].width} $padding="16px 0">
                <TableText>{'-'}</TableText>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <NoResults>주문 내역이 없습니다</NoResults>
        )}
      </TableBody>
    </>
  );
};

export default OrderListTable;
