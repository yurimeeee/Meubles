import Accordion from 'react-bootstrap/Accordion';
import { Product } from '@type/types';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from '@styles/theme';

type AccordionContentsProps = {
  data?: Product;
};

const AccordionContents = ({ data }: AccordionContentsProps) => {
  return (
    <AccordionWrap defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>DESCRIPTION</Accordion.Header>
        <Accordion.Body>
          <DetailText>{data?.desc || '-'}</DetailText>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>PRODUCT DETAIL</Accordion.Header>
        <Accordion.Body>
          {data?.detail?.designer !== '' && (
            <RowFlex>
              <DetailTitle>디자이너</DetailTitle>
              <DetailText>{data?.detail?.designer}</DetailText>
            </RowFlex>
          )}
          {data?.detail?.color !== '' && (
            <RowFlex>
              <DetailTitle>색상</DetailTitle>
              <DetailText>{data?.detail?.color}</DetailText>
            </RowFlex>
          )}
          {data?.detail?.size?.length !== 0 && (
            <RowFlex>
              <DetailTitle>크기</DetailTitle>
              <TextList>
                {data?.detail?.size?.map((item, idx) => (
                  <DetailText key={idx}>{item}</DetailText>
                ))}
              </TextList>
            </RowFlex>
          )}
          {data?.detail?.texture?.length !== 0 && (
            <RowFlex>
              <DetailTitle>재질</DetailTitle>
              <TextList>
                {data?.detail?.texture?.map((item, idx) => (
                  <DetailText key={idx}>{item}</DetailText>
                ))}
              </TextList>
            </RowFlex>
          )}
          {data?.detail?.company !== '' && (
            <RowFlex>
              <DetailTitle>제조사</DetailTitle>
              <DetailText>{data?.detail?.company}</DetailText>
            </RowFlex>
          )}
          {data?.detail?.country !== '' && (
            <RowFlex>
              <DetailTitle>제조국</DetailTitle>
              <DetailText>{data?.detail?.country}</DetailText>
            </RowFlex>
          )}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>EXCHANGE/REFUND</Accordion.Header>
        <Accordion.Body>
          <DetailTitle> 교환/환불이 가능한 경우 </DetailTitle>
          <br />
          <DetailText>
            상품 수령일로부터 7일 이내 교환/환불 접수된 경우 상품 불량인 경우, 주문한 내역과 다른 상품이 배송된 경우, 배송과정 중 파손된 경우 교환은 동일한 상품 내에서 사이즈 및
            색상 변경 1회만 가능, 발생되는 왕복 배송비는 구매자 부담 단순변심으로 인한 교환 및 반품건에 대한 왕복 배송비(일반 택배, 화물 택배 등 모두 포함) 는 구매자 부담{' '}
          </DetailText>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>REVIEW</Accordion.Header>
        <Accordion.Body>
          <DetailText>리뷰 적립금 : 텍스트 리뷰 5,000/ 포토 리뷰 10,000</DetailText>
          <DetailText>첫 리뷰 작성 시 5,000 적립금을 드립니다.</DetailText>
        </Accordion.Body>
      </Accordion.Item>
    </AccordionWrap>
  );
};

export default AccordionContents;

const AccordionWrap = styled(Accordion)`
  width: 100%;
  max-width: 540px;

  .accordion-button {
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
    background-color: ${theme.colors.lightGrayBgColor} !important;
    border: 0;
    border-radius: 0;
  }
  .accordion-item {
    background-color: ${theme.colors.lightGrayBgColor};
    border: none;
    border-top: 1px solid ${theme.colors.blackColor};
  }
  .accordion-item:first-of-type {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 2px solid ${theme.colors.blackColor};
  }
  .accordion-item:last-of-type {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom: 2px solid ${theme.colors.blackColor};
  }
  .accordion-button:not(.collapsed) {
    color: none;
    background-color: ${theme.colors.lightGrayBgColor};
    box-shadow: none;
  }
  .accordion-item:first-of-type > .accordion-header .accordion-button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .accordion-button:focus {
    box-shadow: none;
  }
  .accordion-button.collapsed::after {
    background-image: url('/images/plus.svg');
  }
  .accordion-button::after {
    background-image: url('/images/minus.svg');
  }
`;

const RowFlex = styled.div`
  display: flex;
  margin-bottom: 8px;
`;
const TextList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const DetailTitle = styled.div`
  display: flex;
  min-width: 64px;
  ${theme.typography.sm};
  font-weight: 500;
`;
const DetailText = styled.div`
  display: flex;
  ${theme.typography.sm};
`;
