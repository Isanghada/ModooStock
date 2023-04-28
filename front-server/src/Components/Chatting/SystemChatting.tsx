import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// 파이어베이스
import { dbService } from '../../firebase';
import { query, orderBy, onSnapshot, addDoc, collection, serverTimestamp } from 'firebase/firestore';

// 컴포넌트
import Message from './Message';
import { useAppDispatch } from 'Store/hooks';
import { changeChattingStatus } from 'Store/store';

const options = {
  year: 'numeric',
  month: 'long',
  weekday: 'long',
  day: 'numeric'
};
const SystemChatting = () => {
  const roomName = 'system';
  const dispatch = useAppDispatch();
  // 채팅 div
  const chatDiv = useRef<HTMLDivElement>(null);

  // 채팅메시지 데이터들
  const [messageDatas, setMessageDatas] = useState<any[]>([]);

  // 채팅 데이터들 가져오기
  const getContents = async () => {
    // 우선 query로 데이터 가져오기 두번째 인자 where로 조건문도 가능
    const content = query(
      // 여기 중요.. 바로 router에서 가져와서 해야함.. 안그러니까 한박자 느리네
      collection(dbService, roomName),
      orderBy('createdAt')
    );

    // 실시간 변화 감지 최신버전
    onSnapshot(content, (snapshot) => {
      const contentSnapshot = snapshot.docs.map((con) => {
        return {
          ...con.data(),
          id: con.id
        };
      });
      setMessageDatas((prev) => [...contentSnapshot]);
    });
  };

  // 처음 실행하는 곳
  useEffect(() => {
    getContents();
  }, []);

  useEffect(() => {
    // 채팅 스크롤 젤 밑으로
    setTimeout(() => {
      chatDiv.current!.scrollTop = chatDiv.current!.scrollHeight;
    }, 30);
  }, [messageDatas]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.7,
        ease: 'easeInOut'
      }}
      className="flex flex-col justify-center w-full h-full text-white">
      <div className="w-full h-[6%] bg-[#FB6B9F] flex items-center justify-between px-3">
        <div className="flex items-center h-full text-xs font-medium lg:font-semibold lg:text-lg ">투자알림</div>
        <img
          onClick={() => {
            // 채팅창끄기
            dispatch(changeChattingStatus(false));
          }}
          className={`w-3 h-3 lg:min-w-6 lg:min-h-6 lg:w-6 lg:h-6 cursor-pointer hover:scale-105`}
          src="chatting/cancel.png"
          alt="cancel"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-[94%] rounded-lg">
        {/* 메시지들 보이는 곳 */}
        <div ref={chatDiv} className="w-11/12 h-full overflow-y-auto">
          {/* 대화 시작 시간 */}
          <div className="flex items-center justify-center w-full pr-5 my-2 h-fit ">
            <span className="px-5 py-1 text-xs text-center bg-black lg:text-base w-fit h-fit rounded-3xl">
              {messageDatas[0]?.createdAt.toDate().toLocaleDateString('ko-KR', options)}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            {messageDatas.map((msg, index) => {
              if (index === 0) {
                return;
              }
              // 시간, 분 세팅
              let date = '';
              if (msg.createdAt) {
                date = msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }
              if (msg.createdAt) {
                // 전날과 같은지 체크
                const prevDate = messageDatas[index - 1].createdAt.toDate().toLocaleDateString('ko-KR', options);
                const currentDate = msg.createdAt.toDate().toLocaleDateString('ko-KR', options);
                if (prevDate !== currentDate) {
                  return (
                    <>
                      <div className="flex items-center justify-center w-full pr-5 my-2 h-fit ">
                        <span className="px-5 py-1 text-xs text-center bg-black lg:text-base w-fit h-fit rounded-3xl">
                          {currentDate}
                        </span>
                      </div>
                      <div className="flex items-end justify-center lg:w-11/12">
                        <div className="px-2 py-1 text-center bg-gray-800 lg:w-5/6 h-fit">
                          {msg.nickname}
                          {msg.content}
                        </div>
                        <div className="text-xs text-slate-500 min-w-fit grow">{date}</div>
                      </div>
                    </>
                  );
                }
              }
              // 전날과 같지 않으면
              return (
                <div className="flex items-end justify-center lg:w-11/12">
                  <div className="px-2 py-1 text-center bg-gray-800 lg:w-5/6 h-fit">
                    {msg.nickname}
                    {msg.content}
                  </div>
                  <div className="text-xs text-slate-500 min-w-fit grow">{date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemChatting;
