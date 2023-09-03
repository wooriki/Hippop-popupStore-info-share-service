import React, { useEffect } from 'react';
// 라이브러리
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// 타입
import { NearbyStoreProps } from '../../types/props';
// api
import { fetchStoreData } from '../../api/store';
// 스타일
import { styled } from 'styled-components';

interface SliderButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NearbyStore = ({ guName, setNearbyStoreMarker }: NearbyStoreProps) => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data: storeData, isLoading, isError } = useQuery({ queryKey: ['nearbyStoreData'], queryFn: fetchStoreData });

  const filteredStore = storeData?.filter((data) => data.location.includes(guName) && data.id !== Number(id));

  useEffect(() => {
    if (storeData) {
      setNearbyStoreMarker(filteredStore);
    }
  }, [storeData]);

  console.log(filteredStore);

  const PrevArrow = ({ onClick }: SliderButton) => {
    return (
      <button onClick={onClick} type="button">
        ＜
      </button>
    );
  };

  const NextArrow = ({ onClick }: SliderButton) => {
    return (
      <button onClick={onClick} type="button">
        ＞
      </button>
    );
  };

  // 위에서 계산한 값을 사용하여 설정 객체를 생성
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    speed: 500
  };

  //   // responsive: [
  //   //   {
  //   //     breakpoint: 1024,
  //   //     settings: {
  //   //       slidesToShow: 3,
  //   //       slidesToScroll: 3
  //   //     }
  //   //   },
  //   //   {
  //   //     breakpoint: 600,
  //   //     settings: {
  //   //       slidesToShow: 2,
  //   //       slidesToScroll: 2
  //   //     }
  //   //   },
  //   //   {
  //   //     breakpoint: 320,
  //   //     settings: {
  //   //       slidesToShow: 1,
  //   //       slidesToScroll: 1
  //   //     }
  //   //   }

  // detail page 이동
  const navDetail = (id: number) => {
    // window.location.reload();
    navigate(`/detail/${id}`);
  };

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <NearbyStoreContainer>
      <div className="nearby-store-title">
        <h1>{guName}의 다른 팝업스토어는 어때요?</h1>
      </div>
      {filteredStore && filteredStore?.length > 3 && (
        <SlideContainer>
          <StyledSlider {...settings}>
            {filteredStore?.map((data) => {
              return (
                <div key={data.id}>
                  <Card key={data.id}>
                    <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`} />
                    <InfoBox>
                      <div>
                        {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                        <StoreName>{data.title}</StoreName>
                        {data.period_start} ~ {data.period_end}
                      </div>
                      <DetailBtn onClick={() => navDetail(data.id)}>상세보기</DetailBtn>
                    </InfoBox>
                  </Card>
                </div>
              );
            })}
          </StyledSlider>
        </SlideContainer>
      )}
      {filteredStore && filteredStore.length < 4 && filteredStore.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'grid',
              placeItems: 'center',
              gridTemplateColumns: `repeat(${filteredStore && filteredStore.length}, 1fr)`,
              margin: '70px 0'
            }}
          >
            {filteredStore?.map((data) => {
              return (
                <div key={data.id}>
                  <Card key={data.id}>
                    <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`} />
                    <InfoBox>
                      <div>
                        {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                        <StoreName>{data.title}</StoreName>
                        {data.period_start} ~ {data.period_end}
                      </div>
                      <DetailBtn onClick={() => navDetail(data.id)}>상세보기</DetailBtn>
                    </InfoBox>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {filteredStore && filteredStore?.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '70px',
            fontSize: '20px'
          }}
        >
          아쉽게도 현재 운영중인 {guName}의 다른 팝업스토어는 없습니다🥲
        </div>
      )}
    </NearbyStoreContainer>
  );
};

export default NearbyStore;

const NearbyStoreContainer = styled.div`
  .nearby-store-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 150px 0 40px 0;

    h1 {
      color: var(--fifth-color);
      font-size: 30px;
      background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    }
  }
`;

const SlideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: 1300px;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-list {
    overflow: hidden;
  }
`;

const Card = styled.div`
  width: 370px !important ;

  height: 500px;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);

  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const InfoBox = styled.div`
  width: 330px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 20px;
`;

const Img = styled.img`
  width: 340px;
  height: 369px;

  object-fit: cover;
  border-radius: 10px;

  border: 3px solid var(--fifth-color);
`;

const StoreName = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 1.2;
  font-size: 20px;
  font-weight: bold;

  width: 235px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin: 13px 0 13px 0;
`;

const DetailBtn = styled.button`
  background-color: var(--second-color);
  color: white;
`;
