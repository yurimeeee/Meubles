'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import theme from '@styles/theme';
import { Product } from '@type/types';
import { productData } from '@utils/productData';
import ProductItem from '@components/share/ProductItem';
import StyledSelect from '@components/styled/StyledSelect';
import Loader from '@components/share/Loader';
import { usePathname } from 'next/navigation';

type ProductListProps = {
  categoryListData?: string[];
  uCate?: string;
  NEW?: boolean;
  BEST?: boolean;
  searchData?: Product[];
};

const ProductList = ({ categoryListData, uCate, NEW, BEST, searchData }: ProductListProps) => {
  const pathname = usePathname();
  const [active, setActive] = useState<string>('ALL');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortByOption, setSortByOption] = useState('최신순');
  const take = 6; // 한 번에 불러올 항목 수
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(take);
  const [dataLength, setDataLength] = useState(productData.length);
  const pageEnd = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 8; // 한 페이지 당 보여줄 아이템 수
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (categoryListData) {
      // categoryListData 있는 경우, uCate로 필터링
      setFilteredProducts(productData.filter((product) => product.u_category === uCate));
    } else if (NEW) {
      // NEW 페이지 => new로 필터링
      setFilteredProducts(productData.filter((product) => product.new === true));
    } else if (BEST) {
      // BEST 페이지 => best 필터링
      setFilteredProducts(productData.filter((product) => product.best === true));
    }

    // 검색 결과 있는 경우 filteredProducts 설정
    if (searchData) {
      setFilteredProducts(searchData);
    }
  }, []);
  // useEffect(() => {
  //   if (categoryListData) {
  //     // categoryListData 있는 경우, uCate로 필터링
  //     setFilteredProducts(productData.filter((product) => product.u_category === uCate).slice(0, cursor));
  //   } else if (NEW) {
  //     // NEW 페이지 => new로 필터링
  //     setFilteredProducts(productData.filter((product) => product.new === true).slice(0, cursor));
  //   } else if (BEST) {
  //     // BEST 페이지 => best 필터링
  //     setFilteredProducts(productData.filter((product) => product.best === true).slice(0, cursor));
  //   } else {
  //     setFilteredProducts(productData.slice(0, cursor));
  //   }

  //   // 검색 결과 있는 경우 filteredProducts 설정
  //   if (searchData) {
  //     setFilteredProducts(searchData.slice(0, cursor));
  //   }
  // }, [categoryListData, uCate, NEW, BEST, searchData, cursor]);

  // const loadMore = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setCursor((prevCursor) => prevCursor + take);
  //     setLoading(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   if (!loading && pageEnd.current) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting && dataLength >= cursor) {
  //           loadMore();
  //         }
  //       },
  //       { threshold: 1 }
  //     );

  //     observer.observe(pageEnd.current);

  //     return () => {
  //       observer.disconnect();
  //     };
  //   }
  // }, [loading, cursor, dataLength]);

  // 카테고리 클릭 시, clickedCategory 값으로 필터링
  const handleCategoryFilter = (clickedCategory: string) => {
    const tmp = productData.filter((product) => product.u_category === uCate && product.l_category === clickedCategory);
    setFilteredProducts(tmp);
    setActive(clickedCategory);
    handlePageChange(1);
  };

  // 모든 아이템 보기
  const handleAllItemsView = () => {
    setFilteredProducts(productData.filter((product) => product.u_category === uCate));
    setActive('ALL');
    handlePageChange(1);
  };

  // 신상품 필터링
  const handleNewItemsView = () => {
    setFilteredProducts(productData.filter((product) => product.u_category === uCate && product.new === true));
    setActive('NEW');
    handlePageChange(1);
  };

  // 필터링 셀렉트
  useEffect(() => {
    if (sortByOption === '최신순' && filteredProducts.length > 0) {
      const sortedData = [...filteredProducts].sort((a, b) => b.id - a.id);
      setFilteredProducts(sortedData);
    }
    if (sortByOption === '상품명') {
      const sortedData = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      setFilteredProducts(sortedData);
    }
    if (sortByOption === '높은가격') {
      const sortedData = [...filteredProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      setFilteredProducts(sortedData);
    }
    if (sortByOption === '낮은가격') {
      const sortedData = [...filteredProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setFilteredProducts(sortedData);
    }
  }, [sortByOption]);

  // 현재 페이지에 해당하는 데이터 분할
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByOption(e.target.value);
  };

  return (
    <Wrapper>
      {filteredProducts.length > 0 && (
        <FlexBox>
          {/* categoryListData 가 있는 경우에만 카테고리 렌더링 */}
          {categoryListData && (
            <CategoryList>
              <CategoryItem onClick={handleAllItemsView} $Active={active === 'ALL'}>
                ALL
                <ActiveBar $Active={active === 'ALL'} />
              </CategoryItem>
              <CategoryItem onClick={handleNewItemsView} $Active={active === 'NEW'}>
                NEW
                <ActiveBar $Active={active === 'NEW'} />
              </CategoryItem>
              {categoryListData?.map((item, idx) => (
                <CategoryItem
                  key={idx}
                  onClick={() => {
                    handleCategoryFilter(item);
                  }}
                  $Active={active === item}
                >
                  {item}
                  <ActiveBar $Active={active === item} />
                </CategoryItem>
              ))}
            </CategoryList>
          )}
          <SelectWrap>
            <StyledSelect
              onChange={(e) => {
                const newValue = e.target.value;
                setSortByOption(newValue);
              }}
              options={[
                { value: '최신순', label: '최신순' },
                { value: '상품명', label: '상품명' },
                { value: '높은가격', label: '높은가격' },
                { value: '낮은가격', label: '낮은가격' },
              ]}
              value={sortByOption}
              width={86}
            />
          </SelectWrap>
        </FlexBox>
      )}
      <ProductWrap>
        {currentProducts.map((item, idx) => (
          <ProductItem key={idx} data={item} />
        ))}
      </ProductWrap>
      <div ref={pageEnd} style={{ height: '20px', margin: '10px 0' }} />
      {loading && <Loader />}

      <Pagination>
        {Array.from({ length: totalPages }, (_, idx) => (
          <PageButton key={idx} onClick={() => handlePageChange(idx + 1)} $Active={currentPage === idx + 1}>
            {idx + 1}
          </PageButton>
        ))}
      </Pagination>
    </Wrapper>
  );
};

export default React.memo(ProductList);

const Wrapper = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto 100px;
  padding: 0 20px;

  ${theme.devices.desktop} {
    padding: 0;
  }
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  ${theme.devices.mobile} {
    flex-direction: column;
    margin-bottom: 4px;
  }
`;
const SelectWrap = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;
const CategoryList = styled.ul`
  display: flex;
  gap: 20px;

  ${theme.devices.mobile} {
    margin-bottom: 4px;
    gap: 6px 20px;
    flex-wrap: wrap;
  }
`;
const CategoryItem = styled.li<{ $Active: boolean }>`
  ${theme.typography.h7};
  color: ${({ $Active }) => ($Active ? theme.colors.blackColor : theme.colors.grayFontColor)};
  transition: 0.3s;
  cursor: pointer;

  ${theme.devices.mobile} {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;
const ActiveBar = styled.div<{ $Active: boolean }>`
  width: 0px;
  height: 1.5px;
  bottom: -2px;
  transition: 0.3s ease-out;
  ${({ $Active }) =>
    $Active &&
    css`
      width: 100%;
      background-color: ${theme.colors.blackColor}}
    `};
`;

const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${theme.devices.notebook} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${theme.devices.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $Active: boolean }>`
  margin: 0 5px;
  padding: 2px 8px;
  background-color: ${theme.colors.lightGrayBgColor};
  color: ${({ $Active }) => ($Active ? theme.colors.darkFontColor : theme.colors.grayFontColor)};
  border: none;
  cursor: pointer;

  &:hover {
    /* background-color: ${theme.colors.blackColor}; */
    color: ${theme.colors.darkGrayFontColor};
  }
`;
