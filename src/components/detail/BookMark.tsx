import React from 'react';
// api
import { fetchAllBookMark, toggleBookMark } from '../../api/bookmark';
// 라이브러리
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// 타입
import { Bookmark } from '../../types/types';
// props타입
import { CalendarProps } from '../../types/props';
// 스타일
import { styled } from 'styled-components';
// 이미지
import oBookMark from '../../images/obookmark.png';
import xBookMark from '../../images/xbookmark.png';

const BookMark = ({ storeData }: CalendarProps) => {
  // 북마크 전체 조회
  const { data: bookMark, isLoading, isError } = useQuery(['bookMark'], () => fetchAllBookMark());
  console.log('bookMark', bookMark);

  //토큰 키
  const tokenKey = localStorage.getItem('sb-jlmwyvwmjcanbthgkpmh-auth-token');
  const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;

  const userId = parsedToken?.user.id;
  const storeId = storeData.id;

  // Query
  const queryClient = useQueryClient();

  // Query Mutation
  const toggleMutation = useMutation(toggleBookMark, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookMark'] });
    }
  });

  // 토글 핸들러
  const onClickToggle = () => {
    const toogleBookMark: Bookmark = {
      user_id: userId,
      store_id: storeId
    };
    toggleMutation.mutate(toogleBookMark);
  };

  // 스토어 필터링 북마크 카운트
  const CountTotalBookMark = bookMark?.filter((item) => item.store_id === storeId).length;

  // 스토어, 유저 필터링 북마크 카운트
  const CountMyBookMark = bookMark?.filter((item) => item.user_id === userId && item.store_id === storeId).length;

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>데이터를 로딩 중입니다.</div>;
  }

  return (
    <>
      {CountMyBookMark !== undefined && (
        <>
          {CountTotalBookMark} / {CountMyBookMark} /
          {CountMyBookMark > 0 ? (
            <BookMarkBtn onClick={onClickToggle}>
              <Img src={oBookMark} alt="o" />
            </BookMarkBtn>
          ) : (
            <BookMarkBtn onClick={onClickToggle}>
              <Img src={xBookMark} alt="x" />
            </BookMarkBtn>
          )}
        </>
      )}
    </>
  );
};

export default BookMark;

const Img = styled.img`
  width: 30px;
  height: 30px;
`;
const BookMarkBtn = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
`;