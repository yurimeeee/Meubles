'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import * as S from '../search.style';

import theme from '@styles/theme';
import { Product, productData } from '@utils/productData';
import { FlexBox, RegularFont, SemiBoldFont, NoResults } from '@components/styled/StyledComponents';
import ProductItem from '@components/share/ProductItem';
import StyledSelect from '@components/styled/StyledSelect';

import SearchIcon from '@assets/icons/SearchIcon';

export default function SearchPage({ params }: { params: { keyword: string } }) {
  const [data, setData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByOption, setSortByOption] = useState('최신순');

  useEffect(() => {
    if (params) {
      const decodedKeyword = decodeURIComponent(params.keyword); // Decode the keyword
      const lowerCaseKeyword = decodedKeyword.toLowerCase(); // Convert to lowercase
      const filteredData = productData.filter(
        (product) =>
          String(product.name).toLowerCase().includes(lowerCaseKeyword.trim()) ||
          String(product.brand).toLowerCase().includes(lowerCaseKeyword.trim()) ||
          String(product.desc).toLowerCase().includes(lowerCaseKeyword.trim())
      );
      setData(filteredData);
      setSearchTerm(decodedKeyword.trim());
    }
  }, [params.keyword]);

  // 검색 form submit 시 작동
  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const filteredData = productData.filter(
        (product) =>
          String(product.name.toLowerCase()).includes(searchTerm.trim()) ||
          String(product.brand.toLowerCase()).includes(searchTerm.trim()) ||
          String(product?.desc?.toLowerCase()).includes(searchTerm.trim())
      );
      setData(filteredData);
    },
    [searchTerm]
  );

  useEffect(() => {
    if (sortByOption === '최신순') {
      const sortedData = [...data].sort((a, b) => b.id - a.id);
      setData(sortedData);
    }
    if (sortByOption === '상품명') {
      const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setData(sortedData);
    }
    if (sortByOption === '높은가격') {
      const sortedData = [...data].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      setData(sortedData);
    }
    if (sortByOption === '낮은가격') {
      const sortedData = [...data].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setData(sortedData);
    }
  }, [sortByOption]);

  return (
    <S.Wrapper>
      <S.SearchWrap>
        <S.Title>SEARCH</S.Title>
        <S.SearchInput>
          <S.Form onSubmit={handleSearch}>
            <S.Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {/* <button> */}
            <SearchIcon />
            {/* </button> */}
          </S.Form>
        </S.SearchInput>
      </S.SearchWrap>
      <FlexBox $margin="0 0 20px">
        <FlexBox $gap="10px">
          <RegularFont $fontSize={16} $fontColor={theme.colors.darkGrayFontColor}>
            상품 검색 결과
          </RegularFont>
          <SemiBoldFont>{data?.length}</SemiBoldFont>
        </FlexBox>
        <StyledSelect
          onChange={(e) => {
            const newValue = e.target.value;
            setSortByOption(newValue.toLowerCase());
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
      </FlexBox>
      <S.ProductWrap>{data.length > 0 ? data.map((item, index) => <ProductItem data={item} key={index} />) : <NoResults>검색 결과가 없습니다.</NoResults>}</S.ProductWrap>
    </S.Wrapper>
  );
}
