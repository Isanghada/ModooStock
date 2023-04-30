import { useState, useEffect } from 'react';

interface MsgInterFace {
  data: {
    content: string;
    createdAt: any;
    nickname: string;
    email: string;
    type: string;
    id: string;
    downLoadUrl: string;
    profilePath: string;
  };
  myEmail: any;
  checkSameNick: boolean;
  checkLastTime: boolean;
  checkSameTime: boolean;
}

function Message({
  data,
  myEmail,
  checkSameNick,
  checkSameTime,
  checkLastTime
}: MsgInterFace): JSX.Element {
  // 채팅 데이터가 다 들어오고 난후 init
  const [init, setInit] = useState<boolean>(false);
  // 나인지 체크
  const [isMe, setIsMe] = useState<boolean>(false);
  // 시간세팅 분까지만
  // createdAt 값이 바로 안들어와서 조건처리
  let date = '';
  if (data.createdAt) {
    date = data.createdAt
      .toDate()
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    if (myEmail === data.email) {
      setIsMe(true);
      setInit(true);
    } else {
      setIsMe(false);
      setInit(true);
    }
  }, []);

  return (
    <>
      {init ? (
        isMe ? (
          <div className="flex justify-end w-full px-2 text-xs h-fit lg:text-base">
            <div className="flex justify-end items-end max-w-md lg:w-4/5 my-[0.1rem] lg:my-[0.3rem]">
              <div
                className={`mr-2 text-[0.5rem] lg:text-sm text-slate-400 min-w-fit ${
                  // 시간이 보이고 말고 세팅 하지만 date값은 유지해서 크기유지
                  checkLastTime || checkSameTime ? 'visible' : 'invisible'
                }`}>
                {date}
              </div>
              {date && (
                <div className="flex flex-col items-center px-2 py-1 break-words bg-[#FB6B9F] rounded-tr-none lg:px-3 lg:py-2 rounded-2xl w-fit max-w-[60%] lg:max-w-[80%]">
                  {data.downLoadUrl && (
                    <img src={data.downLoadUrl} alt={data.downLoadUrl} />
                  )}
                  {data.content}
                </div>
              )}
            </div>
          </div>
        ) : (
          // 상대방 채팅
          <div className="w-full px-2 text-xs lg:text-base">
            <div className="flex flex-col max-w-md lg:w-4/5 h-fit">
              {checkSameNick ? (
                <div className="flex items-center w-fit">
                  {data.profilePath && (
                    <div className="w-6 h-6 overflow-hidden rounded-full lg:w-10 lg:h-10">
                      <img
                        className="object-fill"
                        src={data.profilePath}
                        alt={data.profilePath}
                      />
                    </div>
                  )}
                  <div className="m-1 text-sm text-black lg:text-lg">{data.nickname}</div>
                </div>
              ) : null}
              <div className="flex items-end my-[0.1rem] lg:my-[0.3rem] ml-8 lg:ml-12">
                {date && (
                  <div className="flex flex-col items-center py-1 px-2 lg:px-3 lg:py-2 text-black border-[0.1rem] border-[#ffa7c7] rounded-tl-none rounded-2xl break-words w-fit max-w-[60%] lg:max-w-[80%]">
                    {data.downLoadUrl && (
                      <img src={data.downLoadUrl} alt={data.downLoadUrl} />
                    )}
                    {data.content}
                  </div>
                )}
                <div
                  className={`ml-2 text-[0.5rem] lg:text-sm text-slate-400 min-w-fit ${
                    checkLastTime || checkSameTime ? 'visible' : 'invisible'
                  }`}>
                  {date}
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
      {}
    </>
  );
}

export default Message;
