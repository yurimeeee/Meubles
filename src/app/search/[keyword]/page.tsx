'use client';

import { FormEvent, useEffect, useState } from 'react';
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
  const [selectedOption, setSelectedOption] = useState('최신순');

  useEffect(() => {
    if (params) {
      const tmpData = productData.filter((product) => String(product.name).includes(params.keyword.trim()));
      setData(tmpData as any[]);
      setSearchTerm(params.keyword.trim());
    }
  }, [params.keyword]);
  // }, [params.keyword]); // params.keyword가 변경될 때만 실행

  console.log(data);
  console.log(searchTerm);

  // 검색 form submit 시 작동
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tmpData = productData.filter((product) => String(product.name).includes(params.keyword.trim()));
    setData(tmpData as any[]);
  };
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
            setSelectedOption(newValue);

            // if (newValue === '최신순' && type === 7) {
            //   setType(6);
            // } else if (type === 6) {
            //   setType(7);
            // }
          }}
          options={[
            { value: '최신순', label: '최신순' },
            { value: '상품명', label: '상품명' },
            { value: '높은가격', label: '높은가격' },
            { value: '낮은가격', label: '낮은가격' },
          ]}
          value={selectedOption}
          width={86}
        />
      </FlexBox>
      <S.ProductWrap>{data.length > 0 ? data.map((item, index) => <ProductItem data={item} key={index} />) : <NoResults>검색 결과가 없습니다.</NoResults>}</S.ProductWrap>
    </S.Wrapper>
  );
}