'use client';

import * as P from './productDetail.style';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Product, productData } from '@utils/productData';
import { FlexBox } from '@components/styled/StyledComponents';
import StyledButton from '@components/styled/StyledButton';
import theme from '@styles/theme';
import QuantitySelect from '@components/share/QuantitySelect';
import HeartIcon from '@assets/icons/HeartIcon';

import { numberFormatter } from '@utils/formatter';

import { styled } from '@mui/material/styles';

import PlusIcon from '@assets/icons/PlusIcon';
import MinusIcon from '@assets/icons/MinusIcon';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { auth, db } from '@lib/firebase';
import Modal from '@components/share/Modal';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { MainImg } from '../../(mypage)/mypage.style';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<Product>();
  const [mainImg, setMainImg] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [exist, setExist] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (params) {
      const tmpData = productData.find((product) => String(product.id) === params.id);
      setData(tmpData as any);
      setMainImg(tmpData?.mainImg as string);
    }
  }, [params]);

  // 아코디언 작동
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  // 장바구니 담기
  // const onClickAddToCart = useCallback(async () => {
  //   const { id, brand, name, price, mainImg } = data;
  //   if (!auth.currentUser) {
  //     alert('로그인이 필요합니다.');
  //     router.push('/login');
  //   }

  //   const uid = auth?.currentUser?.uid;
  //   // cart 컬렉션 참조
  //   const cartCollection = `cart/${uid}/items`;

  //   // await addDoc(collection(db, cartCollection), {
  //   //   id,
  //   //   brand,
  //   //   name,
  //   //   price,
  //   //   quantity,
  //   //   img: mainImg,
  //   // });

  //   // Define the collection, query, and filter
  //   const itemsCollectionRef = collection(db, cartCollection);
  //   const q = query(itemsCollectionRef, where('name', '==', name));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach(async (doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //     if (doc.data() !== null) {
  //       // console.log('중복');
  //       setExist(true);
  //     } else {
  //       await addDoc(collection(db, cartCollection), {
  //         id,
  //         brand,
  //         name,
  //         price,
  //         quantity,
  //         img: mainImg,
  //       });
  //     }
  //   });

  //   setModalOpen(!modalOpen);
  // }, [data, quantity]);
  // 장바구니 담기
  // const onClickAddToCart = useCallback(async () => {
  //   const { id, brand, name, price, mainImg } = data;
  //   if (!auth.currentUser) {
  //     alert('로그인이 필요합니다.');
  //     router.push('/login');
  //   }

  //   const uid = auth?.currentUser?.uid;
  //   // cart 컬렉션 참조
  //   const cartCollection = `cart/${uid}/items`;

  //   // Define the collection, query, and filter
  //   const itemsCollectionRef = collection(db, cartCollection);
  //   const q = query(itemsCollectionRef, where('name', '==', name));
  //   const querySnapshot = await getDocs(q);

  //   let exists = false;
  //   for (const doc of querySnapshot.docs) {
  //     console.log(doc.id, ' => ', doc.data());
  //     exists = true;
  //     const docRef = doc(db, `cart/${uid}/items`, doc.id);
  //     await updateDoc(docRef, { quantity: quantity + quantity });
  //     break; // Exit the loop as soon as a document is found
  //   }

  //   if (!exists) {
  //     await addDoc(collection(db, cartCollection), {
  //       id,
  //       brand,
  //       name,
  //       price,
  //       quantity,
  //       img: mainImg,
  //     });
  //   }

  //   setModalOpen(!modalOpen);
  // }, [data, quantity]);

  // 장바구니 담기
  const onClickAddToCart = useCallback(async () => {
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
    for (const doc of querySnapshot.docs) {
      console.log(doc.id, ' => ', doc.data().quantity);
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
      <P.Info>
        <P.Brand>{data?.brand}</P.Brand>
        <P.Name>{data?.name}</P.Name>
        <P.Price>{numberFormatter(data?.price)}</P.Price>
        <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
        <P.TotalPrice>
          TOTAL : KRW {numberFormatter(Number(data?.price) * quantity)} ({quantity} {quantity === 1 ? 'piece' : 'pieces'})
        </P.TotalPrice>
        <FlexBox $gap="16px" $margin="0 0 56px">
          <StyledButton title="ADD TO CART" onClick={onClickAddToCart} fontSize={18} bgColor={theme.colors.blackColor} fontColor={theme.colors.whiteColor} />
          <HeartIcon />
        </FlexBox>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} exist={exist} />
        {/* Accordion */}
        <P.AccordionWrap>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>DESCRIPTION</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data?.desc}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography>PRODUCT DETAIL</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data?.detail?.designer !== '' && (
                <P.RowFlex>
                  <P.DetailTitle>디자이너</P.DetailTitle>
                  <P.DetailText>{data?.detail?.designer}</P.DetailText>
                </P.RowFlex>
              )}
              {data?.detail?.color !== '' && (
                <P.RowFlex>
                  <P.DetailTitle>색상</P.DetailTitle>
                  <P.DetailText>{data?.detail?.color}</P.DetailText>
                </P.RowFlex>
              )}
              {data?.detail?.size?.length !== 0 && (
                <P.RowFlex>
                  <P.DetailTitle>크기</P.DetailTitle>
                  <P.TextList>
                    {data?.detail?.size?.map((item, idx) => (
                      <P.DetailText key={idx}>{item}</P.DetailText>
                    ))}
                  </P.TextList>
                </P.RowFlex>
              )}
              {data?.detail?.texture?.length !== 0 && (
                <P.RowFlex>
                  <P.DetailTitle>재질</P.DetailTitle>
                  <P.TextList>
                    {data?.detail?.texture?.map((item, idx) => (
                      <P.DetailText key={idx}>{item}</P.DetailText>
                    ))}
                  </P.TextList>
                </P.RowFlex>
              )}
              {data?.detail?.company !== '' && (
                <P.RowFlex>
                  <P.DetailTitle>제조사</P.DetailTitle>
                  <P.DetailText>{data?.detail?.company}</P.DetailText>
                </P.RowFlex>
              )}
              {data?.detail?.country !== '' && (
                <P.RowFlex>
                  <P.DetailTitle>제조국</P.DetailTitle>
                  <P.DetailText>{data?.detail?.country}</P.DetailText>
                </P.RowFlex>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography>EXCHANGE/REFUND</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <P.DetailTitle> 교환/환불이 가능한 경우 </P.DetailTitle>
              <br />
              상품 수령일로부터 7일 이내 교환/환불 접수된 경우 상품 불량인 경우, 주문한 내역과 다른 상품이 배송된 경우, 배송과정 중 파손된 경우 교환은 동일한 상품 내에서 사이즈 및
              색상 변경 1회만 가능, 발생되는 왕복 배송비는 구매자 부담 단순변심으로 인한 교환 및 반품건에 대한 왕복 배송비(일반 택배, 화물 택배 등 모두 포함) 는 구매자 부담
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <Typography>REVIEW</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {' '}
              <P.DetailText>리뷰 적립금 : 텍스트 리뷰 5,000/ 포토 리뷰 10,000</P.DetailText>
              <P.DetailText>첫 리뷰 작성 시 5,000 적립금을 드립니다.</P.DetailText>
            </AccordionDetails>
          </Accordion>
        </P.AccordionWrap>
        {/* Accordion */}
      </P.Info>
      <FlexBox $flexDirection="column" $gap="10px">
        <P.MainWrap>
          <P.MainImg src={mainImg} alt={data?.name} />
        </P.MainWrap>
        {data?.subImg && data?.subImg.length > 4 ? (
          <P.SubImgList>
            <Swiper spaceBetween={10} slidesPerView={3}>
              {data?.subImg.map((sub, idx) => (
                <SwiperSlide key={idx}>
                  <P.SubImg
                    src={sub}
                    // key={idx}
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
        {/* <P.SubImgList>
          {data?.subImg.map((sub, idx) => (
            <P.SubImg
              src={sub}
              key={idx}
              onClick={() => {
                setMainImg(sub);
              }}
            />
          ))}
        </P.SubImgList> */}
      </FlexBox>
    </P.Wrapper>
  );
};

export default ProductDetailPage;

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={props.expanded ? <MinusIcon sx={{ fontSize: '0.9rem' }} /> : <PlusIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
