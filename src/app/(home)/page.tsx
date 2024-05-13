import BestSeller from '@components/feature/Home/BestSeller';
import * as H from './home.style';
import NewProduct from '@components/feature/Home/NewProduct';

export default function Home() {
  return (
    <H.Wrapper>
      {/* <H.MainImg src={MainImage} alt="메인 이미지" /> */}
      <H.MainImg />
      <BestSeller />
      <NewProduct />
    </H.Wrapper>
  );
}
