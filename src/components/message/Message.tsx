import React, { useState } from 'react';
//api
import { receiveMessage, sendMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageProps } from '../../types/props';
import { MessageType } from '../../types/types';
// 스타일
import { styled } from 'styled-components';

const Message = ({ setMsgModal, msgModal, writerInfo }: MessageProps) => {
  const [body, setBody] = useState<string>('');
  const currentUser = useCurrentUser() ?? { id: '' };
  console.log('sender', currentUser.id);
  console.log('reciever', writerInfo?.id);
  console.log('body', body);
  // 쪽지 보내기 요청
  const messageHandler = async () => {
    if (writerInfo) {
      const message: MessageType = {
        sender: currentUser.id,
        receiver: writerInfo.id,
        body,
        isRead: false
      };

      const sendMsg = sendMessage(message);
      const receiveMsg = receiveMessage(message);

      await sendMsg;
      await receiveMsg;

      console.log('메세지 전송 성공!');
    }
  };

  // 쪽지 내용 onChange
  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  // 모달 닫기
  const closeMsgModal = () => {
    setMsgModal(false);
  };

  // 쪽지 보내기 handler
  const handleSendMessage = () => {
    messageHandler();
    alert('쪽지가 성공적으로 전송되었습니다!');
  };

  return (
    <>
      {msgModal ? (
        <Container>
          <Wrapper>
            <CloseBtn onClick={closeMsgModal}>닫기</CloseBtn>
            <UserInfoBox>
              {writerInfo?.avatar_url.startsWith('profile/') ? (
                <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${writerInfo?.avatar_url}`} alt="User Avatar" />
              ) : (
                <Img src={writerInfo?.avatar_url} alt="User Avatar" />
              )}{' '}
              <div>{writerInfo?.name}</div>
            </UserInfoBox>
            <form onSubmit={() => handleSendMessage()}>
              <input value={body} onChange={handleBodyChange} placeholder="전달할 내용을 입력해주세요" />
              <button>쪽지 보내기</button>
            </form>
          </Wrapper>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default Message;

const Container = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  width: 1000px;
  height: 700px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;
