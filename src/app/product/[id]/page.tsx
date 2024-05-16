'use client';

import * as P from './productDetail.style';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { addDoc, collection, getDocs, query, updateDoc, where, doc, DocumentReference } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import theme from '@styles/theme';
import { Product } from '@type/types';
import { productData } from '@utils/productData';
import { numberFormatter } from '@utils/formatter';
import { FlexBox } from '@components/styled/StyledComponents';
import StyledButton from '@components/styled/StyledButton';
import BlankLoader from '@components/share/BlankLoader';
import QuantitySelect from '@components/share/QuantitySelect';
import AccordionContents from '@components/share/Accordion';
import Modal from '@components/share/Modal';

import HeartIcon from '@assets/icons/HeartIcon';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<Product>();
  const [mainImg, setMainImg] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [expanded, setExpanded] = useState<string | false>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [exist, setExist] = useState<boolean>(false); // 장바구니에 동일 상품 존재 여부

  const [cookies, setCookie] = useCookies(['RecentlyViewed']);
  const router = useRouter();

  useEffect(() => {
    if (params) {
      // params로 전달된 상품 Id로 상품 조회
      const tmpData = productData.find((product) => String(product.id) === params.id);

      // data, mainImg 상태에 저장
      setData(tmpData);
      setMainImg(tmpData?.mainImg as string);
    }
  }, [params]);

  useEffect(() => {
    if (data && cookies.RecentlyViewed) {
      const updatedRecentlyViewed = [...cookies.RecentlyViewed];
      // 상품 Id가 이미 존재하는지 확인
      const index = updatedRecentlyViewed.indexOf(data.id);

      // 상품 Id가 이미 존재하는 경우
      if (index !== -1) {
        // 기존의 Id 삭제
        updatedRecentlyViewed.splice(index, 1);
      }
      // 새로운 데이터 Id를 배열에 추가
      updatedRecentlyViewed.push(data.id);

      // 쿠키 업데이트
      setCookie('RecentlyViewed', updatedRecentlyViewed, {
        path: '/',
        maxAge: 24 * 60 * 60, // 1일 동안 쿠키 유지
      });
    }
  }, [data]);

  // 아코디언 작동
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  // 장바구니 담기
  const onClickAddToCart = useCallback(async () => {
    if (!data) {
      return;
    }

    const { id, brand, name, price, mainImg } = data;
    if (!auth.currentUser) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }

    const uid = auth?.currentUser?.uid;
    // cart 컬렉션 참조
    const cartCollection = `cart/${uid}/items`;

    // Define the collection, query, and filter
    const itemsCollectionRef = collection(db, cartCollection);
    const q = query(itemsCollectionRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);

    let exists = false;
    for (const doc of querySnapshot.docs as any) {
      exists = true;
      const docRef = doc(db, `${cartCollection}`, doc.id);
      // const docRef = doc(db, `${cartCollection}/${doc.id}`); // Correction here
      await updateDoc(docRef, { quantity: quantity + doc.data().quantity });
      break; // Exit the loop as soon as a document is found
    }

    if (!exists) {
      await addDoc(collection(db, cartCollection), {
        id,
        brand,
        name,
        price,
        quantity,
        img: mainImg,
      });
    }

    setModalOpen(!modalOpen);
  }, [data, quantity]);

  return (
    <P.Wrapper>
      <P.ImgBox>
        {/* <FlexBox $flexDirection="column" $gap="10px"> */}
        <P.MainWrap>{data === undefined ? <BlankLoader /> : <P.MainImg src={mainImg} alt={data?.name} />}</P.MainWrap>

        {data === undefined && (
          <P.SubImgList>
            {[...Array(4)].map((_, index) => (
              <BlankLoader key={index} width={117} height={117} />
            ))}
          </P.SubImgList>
        )}

        {data?.subImg && data?.subImg.length > 4 ? (
          <P.SubImgList>
            <Swiper spaceBetween={10} slidesPerView={4}>
              {data?.subImg.map((sub, idx) => (
                <SwiperSlide key={idx}>
                  <P.SubImg
                    src={sub}
                    onClick={() => {
                      setMainImg(sub);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </P.SubImgList>
        ) : (
          <P.SubImgList>
            {data?.subImg.map((sub, idx) => (
              <P.SubImg
                src={sub}
                key={idx}
                onClick={() => {
                  setMainImg(sub);
                }}
              />
            ))}
          </P.SubImgList>
        )}
        {/* </FlexBox> */}
      </P.ImgBox>
      <P.Info>
        {data === undefined && (
          <>
            <P.Brand>
              <BlankLoader width={180} height={22} />
            </P.Brand>
            <P.Name>
              <BlankLoader width={430} height={36} />
            </P.Name>
            <P.Price>
              <BlankLoader width={200} height={28} />
            </P.Price>
          </>
        )}
        <P.Brand>{data?.brand}</P.Brand>
        <P.Name>{data?.name}</P.Name>
        <P.Price>{numberFormatter(data?.price)}</P.Price>

        <P.QuantityWrap>
          <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
          {data === undefined ? (
            <P.TotalPrice>
              <BlankLoader width={250} height={28} />
            </P.TotalPrice>
          ) : (
            <P.TotalPrice>
              TOTAL : KRW {numberFormatter(Number(data?.price) * quantity)}
              {/* ({quantity} {quantity === 1 ? 'piece' : 'pieces'}) */}
            </P.TotalPrice>
          )}
        </P.QuantityWrap>
        {/* <P.TotalPrice>v
          TOTAL : KRW {numberFormatter(Number(data?.price) * quantity)} ({quantity} {quantity === 1 ? 'piece' : 'pieces'})
        </P.TotalPrice> */}
        <FlexBox $gap="16px" $margin="0 0 56px">
          <StyledButton title="ADD TO CART" onClick={onClickAddToCart} fontSize={18} bgColor={theme.colors.blackColor} fontColor={theme.colors.whiteColor} />
          <HeartIcon />
        </FlexBox>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} exist={exist} />

        <AccordionContents data={data} />
      </P.Info>
    </P.Wrapper>
  );
};

export default ProductDetailPage;
