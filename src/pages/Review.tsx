import Main from '../components/community/main/Main';
import SearchModal from '../components/community/write/SearchModal';
import Write from '../components/community/write/Write';

import { useState } from 'react';

const Review = () => {
  const [writeModal, setWriteModal] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<boolean>(false);

  // 검색 모달 열기
  const searcButton = () => {
    setSearchModal(true);
  };

  return (
    <>
      <h1>후기 작성 게시판</h1>
      <button onClick={searcButton}>글 작성</button>
      <SearchModal setWriteModal={setWriteModal} searchModal={searchModal} setSearchModal={setSearchModal} />
      <Write writeModal={writeModal} setWriteModal={setWriteModal} setSearchModal={setSearchModal} />
      <Main />
    </>
  );
};

export default Review;