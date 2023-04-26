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
          <div className="flex justify-end w-full px-2 h-fit">
            <div className="flex justify-end items-end max-w-md lg:w-3/5 my-[0.3rem]">
              <div
                className={`mr-2 text-sm text-slate-400 min-w-fit ${
                  // 시간이 보이고 말고 세팅 하지만 date값은 유지해서 크기유지
                  checkLastTime || checkSameTime ? 'visible' : 'invisible'
                }`}>
                {date}
              </div>

              {date && (
                <div className="flex flex-col items-center px-3 py-2 break-words bg-gray-800 rounded-tr-none rounded-2xl w-fit">
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
          <div className="w-full px-2">
            <div className="flex flex-col max-w-md lg:w-3/5 h-fit">
              {checkSameNick ? (
                <div className="flex items-center w-fit">
                  {data.profilePath && (
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        className="object-fill"
                        src={data.profilePath}
                        alt={data.profilePath}
                      />
                    </div>
                  )}
                  <div className="m-1 text-black">{data.nickname}</div>
                </div>
              ) : null}
              <div className="flex items-end my-[0.3rem] ml-12">
                {date && (
                  <div className="flex flex-col items-center py-2 px-3 text-black border-[0.1rem] border-[#ffa7c7] rounded-tl-none rounded-2xl break-words w-fit">
                    {data.downLoadUrl && (
                      <img src={data.downLoadUrl} alt={data.downLoadUrl} />
                    )}
                    {data.content}
                  </div>
                )}
                <div
                  className={`ml-2 text-sm text-slate-400 min-w-fit ${
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
