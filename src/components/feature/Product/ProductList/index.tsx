'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import theme from '@styles/theme';
import { Product, productData } from '@utils/productData';
import ProductItem from '@components/share/ProductItem';
import StyledSelect from '@components/styled/StyledSelect';

type ProductListProps = {
  categoryListData?: string[];
  uCate?: string;
  NEW?: boolean;
  searchData?: Product[];
};

const ProductList = ({ categoryListData, uCate, NEW, searchData }: ProductListProps) => {
  const [category, setCategory] = useState<string>('NEW');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortByOption, setSortByOption] = useState('최신순');
  const [active, setActive] = useState<string>('ALL');

  // useEffect(() => {
  //   if (searchData) {
  //     return (
  //       <Wrapper>
  //         {filteredProducts.length > 0 && (
  //           <FlexBox>
  //             <CategoryList>
  //               <CategoryItem
  //                 onClick={() => {
  //                   handleALLClick();
  //                   setActive('ALL');
  //                 }}
  //                 $Active={active === 'ALL'}
  //               >
  //                 ALL
  //               </CategoryItem>
  //               <CategoryItem
  //                 onClick={() => {
  //                   handleNEWClick();
  //                   setActive('ALL');
  //                 }}
  //                 $Active={active === 'NEW'}
  //               >
  //                 NEW
  //               </CategoryItem>
  //               {categoryListData?.map((item, idx) => (
  //                 <CategoryItem
  //                   key={idx}
  //                   onClick={() => {
  //                     handleCategoryClick(item);
  //                     setActive(item);
  //                   }}
  //                   $Active={active === item}
  //                 >
  //                   {item}
  //                 </CategoryItem>
  //               ))}
  //             </CategoryList>
  //             <SelectWrap>
  //               <StyledSelect
  //                 onChange={(e) => {
  //                   const newValue = e.target.value;
  //                   setSortByOption(newValue);
  //                 }}
  //                 options={[
  //                   { value: '최신순', label: '최신순' },
  //                   { value: '상품명', label: '상품명' },
  //                   { value: '높은가격', label: '높은가격' },
  //                   { value: '낮은가격', label: '낮은가격' },
  //                 ]}
  //                 value={sortByOption}
  //                 width={86}
  //               />
  //             </SelectWrap>
  //           </FlexBox>
  //         )}
  //         <ProductWrap>
  //           {filteredProducts.map((item, idx) => (
  //             <ProductItem key={idx} data={item} />
  //           ))}
  //         </ProductWrap>
  //       </Wrapper>
  //     );
  //   }
  // }, [searchData]);

  useEffect(() => {
    if (!NEW) {
      setFilteredProducts(productData.filter((product) => product.u_category === uCate));
    } else {
      setFilteredProducts(productData.filter((product) => product.new === true));
    }

    if (searchData) {
      setFilteredProducts(searchData);
    }
  }, []);

  const handleCategoryClick = (clickedCategory: string) => {
    setCategory(clickedCategory);
    const tmp = productData.filter((product) => product.u_category === uCate && product.l_category === clickedCategory);
    setFilteredProducts(tmp);
  };
  const handleALLClick = () => {
    setFilteredProducts(productData.filter((product) => product.u_category === uCate));
  };
  const handleNEWClick = () => {
    setFilteredProducts(productData.filter((product) => product.u_category === uCate && product.new === true));
  };

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

  return (
    <Wrapper>
      {filteredProducts.length > 0 && (
        <FlexBox>
          <CategoryList>
            <CategoryItem
              onClick={() => {
                handleALLClick();
                setActive('ALL');
              }}
              $Active={active === 'ALL'}
            >
              ALL
            </CategoryItem>
            <CategoryItem
              onClick={() => {
                handleNEWClick();
                setActive('ALL');
              }}
              $Active={active === 'NEW'}
            >
              NEW
            </CategoryItem>
            {categoryListData?.map((item, idx) => (
              <CategoryItem
                key={idx}
                onClick={() => {
                  handleCategoryClick(item);
                  setActive(item);
                }}
                $Active={active === item}
              >
                {item}
              </CategoryItem>
            ))}
          </CategoryList>
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
        {filteredProducts.map((item, idx) => (
          <ProductItem key={idx} data={item} />
        ))}
      </ProductWrap>
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

const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${theme.devices.notebook} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${theme.devices.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
