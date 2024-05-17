import BestSeller from '@components/feature/Home/BestSeller';
import * as H from './home.style';
import NewProduct from '@components/feature/Home/NewProduct';
import BannerImg from '@assets/images/banner.png';

export default function Home() {
  return (
    <H.Wrapper>
      {/* <H.MainImg src={MainImage} alt="메인 이미지" /> */}
      <H.MainImg />
      <BestSeller />
      <NewProduct />
      <H.Banner src={BannerImg} alt="신규 가입 쿠폰 배너" />
    </H.Wrapper>
  );
}
