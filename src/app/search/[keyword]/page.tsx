'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import * as S from '../search.style';

import theme from '@styles/theme';
import { productData } from '@utils/productData';
import { FlexBox, RegularFont, SemiBoldFont, NoResults } from '@components/styled/StyledComponents';
import ProductItem from '@components/share/ProductItem';
import StyledSelect from '@components/styled/StyledSelect';

import SearchIcon from '@assets/icons/SearchIcon';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Product } from '@type/types';

export default function SearchPage({ params }: { params: { keyword: string } }) {
  const [data, setData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByOption, setSortByOption] = useState('최신순');

  // params로 넘어온 키워드로 검색 및 정렬
  useEffect(() => {
    if (params.keyword) {
      const decodedKeyword = decodeURIComponent(params.keyword); // Decode the keyword
      const lowerCaseKeyword = decodedKeyword.toLowerCase(); // Convert to lowercase
      const filteredData = productData.filter(
        (product) =>
          String(product.name).toLowerCase().includes(lowerCaseKeyword.trim()) ||
          String(product.brand).toLowerCase().includes(lowerCaseKeyword.trim()) ||
          String(product.desc).toLowerCase().includes(lowerCaseKeyword.trim())
      );

      let sortedData = [...filteredData]; // filteredData 복사하여 새로운 배열 생성

      if (sortByOption === '최신순') {
        sortedData.sort((a, b) => b.id - a.id); // 최신순으로 정렬
      } else if (sortByOption === '상품명') {
        sortedData.sort((a, b) => a.name.localeCompare(b.name)); // 상품명으로 정렬
      } else if (sortByOption === '높은가격') {
        sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); // 높은 가격순으로 정렬
      } else if (sortByOption === '낮은가격') {
        sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); // 낮은 가격순으로 정렬
      }

      setData(sortedData); // sortedData를 data로 업데이트
      setSearchTerm(decodedKeyword.trim());
    }
  }, [params.keyword, sortByOption]);

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

  return (
    <S.Wrapper>
      <S.SearchWrap>
        <S.Title>SEARCH</S.Title>
        <S.SearchInput>
          <S.Form onSubmit={handleSearch}>
            <S.Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {/* <button> */}
            {/* <SearchIcon /> */}
            {searchTerm === '' ? <SearchIcon /> : <AiOutlineCloseCircle size={24} onClick={() => setSearchTerm('')} />}
            {/* </button> */}
          </S.Form>
        </S.SearchInput>
      </S.SearchWrap>
      <S.FlexBox>
        <FlexBox $gap="10px">
          <S.ResultText>상품 검색 결과</S.ResultText>
          <S.ResultNumber>{data?.length}</S.ResultNumber>
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
      </S.FlexBox>
      <S.ProductWrap>{data.length > 0 ? data.map((item, index) => <ProductItem data={item} key={index} />) : <NoResults>검색 결과가 없습니다.</NoResults>}</S.ProductWrap>
    </S.Wrapper>
  );
}
