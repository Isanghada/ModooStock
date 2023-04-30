import { useRef, useState } from 'react';

interface NewsModalType {
  isNewsClick: boolean;
  setIsNewsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewsModal({ isNewsClick, setIsNewsClick }: NewsModalType): JSX.Element {
  const ref = useRef(null);
  const [isClickNum, setIsClickNum] = useState<number>(0);
  const newsList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((news) => {
    return (
      <>
        <div className="w-full py-[2px] flex-col justify-start items-center space-y-1 rounded-sm bg-[#F4F4F4] ">
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="font-extrabold bg-[#1971C2] px-4 rounded-sm text-[0.8rem] lg:text-[1rem] text-white">
                A 전자
              </span>
            </div>
            <div>
              <span className="text-[0.75rem] lg:text-[0.9rem]">3월 17일</span>
            </div>
          </div>
          <div className="flex items-center justify-start w-full text-[1rem] lg:text-[1.5rem] py-[1px]">
            <span>"적자날수도 있다는데... 외국인이 사모드는 A전자"</span>
          </div>
        </div>
      </>
    );
  });

  const click = (e: React.MouseEvent) => {
    console.log(e.currentTarget.ariaLabel);
    console.log(isClickNum);

    switch (e.currentTarget.ariaLabel) {
      case '닫기':
        setIsNewsClick((pre) => !pre);
        break;
      case '전체':
        setIsClickNum(0);
        break;
      case '전자':
        setIsClickNum(1);
        break;
      case '화학':
        setIsClickNum(2);
        break;
      case '생명':
        setIsClickNum(3);
        break;
      case 'IT':
        setIsClickNum(4);
        break;
    }
  };
  return (
    <>
      {isNewsClick ? (
        <div
          ref={ref}
          className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 z-50 bg-[#707070]/50 pt-0"
          onClick={(e) => {
            if (e.target === ref.current) {
              setIsNewsClick((pre) => !pre);
            }
          }}>
          <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[35rem] lg:w-[42%] lg:min-w-[40rem] lg:max-w-[40rem] px-7 rounded-xl space-y-2 lg:space-y-4 py-3 lg:py-6">
            <div className="w-full flex justify-center items-center text-[1.5rem] lg:text-[2rem] font-black">
              <span>뉴스 스크랩</span>
            </div>
            <div className="flex items-end justify-start w-full space-x-6 px-2 lg:text-[1.3rem] font-semibold border-b-2 py-1 cursor-pointer text-[#6F6F6F]">
              <div
                aria-label="전체"
                className={`transition-all duration-300 ${isClickNum === 0 && 'text-black scale-110'}`}
                onClick={click}>
                <span>&nbsp;전체&nbsp;</span>
              </div>
              <div
                aria-label="전자"
                className={`transition-all duration-300 ${isClickNum === 1 && 'text-black scale-110'}`}
                onClick={click}>
                <span>A 전자</span>
              </div>
              <div
                aria-label="화학"
                className={`transition-all duration-300 ${isClickNum === 2 && 'text-black scale-110'}`}
                onClick={click}>
                <span>B 화학</span>
              </div>
              <div
                aria-label="생명"
                className={`transition-all duration-300 ${isClickNum === 3 && 'text-black scale-110'}`}
                onClick={click}>
                <span>C 생명</span>
              </div>
              <div
                aria-label="IT"
                className={`transition-all duration-300 ${isClickNum === 4 && 'text-black scale-110'}`}
                onClick={click}>
                <span>G IT</span>
              </div>
            </div>
            {/* 뉴스 구매 목록 */}
            <div className="flex flex-col items-start justify-start w-full px-2 h-[13rem] lg:h-[16rem] overflow-y-auto space-y-2 rounded-md">
              {newsList}
            </div>
            <div className="flex items-end justify-between w-full px-2">
              <div className="flex flex-col justify-start items-start text-[#9B9B9B] text-[0.6rem] lg:text-[0.8rem]">
                <span>정보상에서 구입한 뉴스 소식을 볼 수 있습니다.</span>
                <span>종목이 갱신될 때 마다 보유 뉴스는 초기화 됩니다.</span>
              </div>
              <div className="flex justify-end items-end text-white w-[40%] space-x-2 text-center font-medium text-[0.8rem] lg:text-[1.1rem]">
                <div
                  className="bg-[#A5A5A5] w-[45%] lg:w-[48%] py-[2px] hover:scale-105 active:scale-105 transition duration-300 cursor-pointer rounded-md"
                  aria-label="닫기"
                  onClick={click}>
                  <span>닫기</span>
                </div>
                <div className="bg-black w-[45%] lg:w-[48%] py-[2px] hover:scale-105 active:scale-105 transition duration-300 cursor-pointer rounded-md">
                  <span>정보상 가기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NewsModal;
