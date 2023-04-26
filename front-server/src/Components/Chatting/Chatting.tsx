import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// 파이어베이스
import { dbService } from '../../firebase';
import { query, orderBy, onSnapshot, addDoc, collection, serverTimestamp } from 'firebase/firestore';

// 컴포넌트
import Message from './Message';

// interface ChatPropsInterFace {
//   usersNickName: string | string[] | undefined;
//   roomName: string | string[] | undefined;
// }
// 내 이메일 정보
// const myEmail = getCookie('email');
// 시간 옵션
const options = {
  year: 'numeric',
  month: 'long',
  weekday: 'long',
  day: 'numeric'
};
const Chatting = () => {
  const roomName = 'chatting';

  // 채팅 div
  const chatDiv = useRef<HTMLDivElement>(null);
  // 유저 프로필 데이터
  const myEmail = localStorage.getItem('nickname');
  const nickname = localStorage.getItem('nickname');
  const profile_img_path = '/images/toys/pink.png';
  // 내 이미지 주소

  // 상대방 이미지 주소 << 앞에 ..nickname에서 상대정보 요청해놧음
  // const {profile_img_path} = useAppSelector(state => state.userInfo);
  // 채팅메시지 데이터들
  const [messageDatas, setMessageDatas] = useState<any[]>([]);
  // 파일이미지 데이터
  const [fileUpload, setFileUpload] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

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

  // 메시지 데이터
  const [message, setMessage] = useState<string>('');
  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // 메시지 제출
  const onSubmitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let downLoadUrl = '';
    // 이미지랑 메시지 빈값일떄 무시
    if (fileUpload === '' && message === '') {
      return;
    }
    // // 파일 데이터 가져오기
    // if (fileUpload !== '') {
    //   //파일 경로 참조 만들기
    //   const imageFileRef = ref(storageService, `${roomName}/${uuidv4()}`);
    //   //storage 참조 경로로 파일 업로드 하기
    //   await uploadString(imageFileRef, fileUpload, 'data_url');
    //   //storage 참조 경로에 있는 파일의 URL을 다운로드해서 downLoadUrl 변수에 넣어서 업데이트
    //   downLoadUrl = await getDownloadURL(imageFileRef);
    // }
    // 메시지 데이터에 추가
    await addDoc(collection(dbService, roomName), {
      email: myEmail,
      nickname: nickname,
      content: message,
      createdAt: serverTimestamp(),
      profilePath: profile_img_path
    });

    setMessage('');
    setFileUpload('');
    fileInput.current!.value = '';
  };
  // 파일 받기
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const theFile = files![0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const { result }: any = finishedEvent.currentTarget;
      setFileUpload(result);
    };
    reader.readAsDataURL(theFile);
  };
  // 파일 지우기
  const deleteImage = () => {
    setFileUpload('');
    fileInput.current!.value = '';
  };

  // 처음 실행하는 곳
  useEffect(() => {
    getContents();
  }, []);

  useEffect(() => {
    // 채팅 스크롤 젤 밑으로
    setTimeout(() => {
      chatDiv.current!.scrollTop = chatDiv.current!.scrollHeight;
    }, 50);
    // 이미지 올라올때를 위한 채팅 스크롤 젤 밑으로
    setTimeout(() => {
      chatDiv.current!.scrollTop = chatDiv.current!.scrollHeight;
    }, 300);
  }, [messageDatas, fileUpload]);

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
      className="flex flex-col justify-center w-full h-full text-white ">
      <div className="flex flex-col items-center justify-center w-full h-full rounded-lg">
        {/* 메시지들 보이는 곳 */}
        <div ref={chatDiv} className="w-11/12 h-full overflow-y-auto">
          {/* 대화 시작 시간 */}
          <div className="flex items-center justify-center w-full pr-5 my-2 h-fit ">
            <span className="px-5 py-1 text-base text-center w-fit h-fit bg-slate-800 rounded-3xl">
              {messageDatas[0]?.createdAt.toDate().toLocaleDateString('ko-KR', options)}
            </span>
          </div>
          {messageDatas.map((msg, index) => {
            if (index === 0) {
              return;
            }
            // 상대방의 닉네임 처음 한번만
            let checkSameNick = true;
            if (index !== 0 && msg.email !== myEmail && msg.email === messageDatas[index - 1].email) {
              checkSameNick = false;
            }
            // 마지막 대화에만 시간뜨게
            let checkLastTime = false;
            if (
              index === messageDatas.length - 1 ||
              (index !== messageDatas.length - 1 && msg.email !== messageDatas[index + 1].email)
            ) {
              checkLastTime = true;
            }

            // 30초동안 대화안했으면 시간뜨게
            let checkSameTime = true;
            if (
              index !== messageDatas.length - 1 &&
              messageDatas[index + 1].createdAt &&
              msg.createdAt.seconds >= messageDatas[index + 1].createdAt.seconds - 30
            ) {
              checkSameTime = false;
            }

            return (
              <Message
                key={msg.createdAt}
                data={msg}
                myEmail={myEmail}
                checkSameNick={checkSameNick}
                checkLastTime={checkLastTime}
                checkSameTime={checkSameTime}
              />
            );
          })}
        </div>
        {/* 메시지 보내는 곳 */}
        <form className="flex justify-center w-full mt-6 mb-36 lg:my-6" onSubmit={onSubmitMessage}>
          <div className="border-2 border-[#ffa7c7] rounded-lg w-5/6 flex justify-between items-center px-[0.7rem] py-[0.3rem] ">
            {/* 뉴스 업로드 */}
            <img
              className={`w-6 h-6 lg:min-w-8 lg:min-h-8 lg:w-8 lg:h-8 opacity-60 hover:opacity-100 cursor-pointer`}
              src="/chatting/news.png"
              alt="imagefile"
            />
            {/* 뉴스 및 메시지 입력 */}
            {fileUpload && (
              <div className="relative w-12 h-12 lg:w-20 lg:h-20 border-[0.1rem]">
                <div
                  onClick={deleteImage}
                  className="absolute top-0 right-0 z-10 w-3 h-3 bg-black cursor-pointer hover:scale-105">
                  <img src="public/chatting/cancel.png" alt="cancel" />
                </div>
                <img src={fileUpload} alt="fileImage" />
              </div>
            )}
            <input
              className={`w-3/4 h-8 lg:h-10 bg-transparent outline-none px-4 text-black`}
              type="text"
              placeholder="메시지 보내기..."
              value={message}
              onChange={onChangeMessage}
              maxLength={50}
            />
            {/* 메시지 전송 */}
            <label htmlFor="sendMsg">
              <img
                className={`w-6 h-6 lg:min-w-9 lg:min-h-8 lg:w-9 lg:h-8 opacity-60 hover:opacity-100 cursor-pointer`}
                src="/chatting/send.png"
                alt="send"
              />
            </label>
            <input className="hidden" type="submit" id="sendMsg" />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Chatting;
