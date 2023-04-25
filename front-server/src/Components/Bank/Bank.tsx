import React, { useState, useRef } from 'react';

function Bank(): JSX.Element {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [clickNum, setClickNum] = useState<number>(0);

  const click = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsClick((pre) => !pre);
    console.log(target.ariaLabel);

    switch (target.ariaLabel) {
      case '예금':
        setClickNum(1);
        break;
      case '출금':
        setClickNum(2);
        break;
      case '송금':
        setClickNum(3);
        break;
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-end w-full h-full pb-3 lg:pb-0 lg:justify-center">
        <div className="flex items-center justify-center w-full mx-auto lg:pt-[7vh]">
          {/* 1. 예금 */}
          <div className="flex flex-col w-[25%] md:w-[23%] md:min-w-[23%] lg:min-w-[20%] lg:w-1/5 mx-2 text-center border-2 rounded-[2rem] bg-[#FFF2CC]/60 border-[#F0A633]/60">
            <div className="py-2 lg:py-5">
              <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">예금</span>
            </div>
            <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
              <span>6시간마다 1%의</span> <br />
              <span>이자를 받을 수 있어요.</span>
            </div>
            <div className="py-4 mx-auto lg:py-10">
              <img
                className="object-contain w-[4rem] md:w-[5rem] lg:w-[7rem] h-[4rem] md:h-[5rem] lg:h-[7rem]"
                src="/images/icons/money1.png"
                alt=""
              />
            </div>
            <div className="pb-4 lg:pb-7">
              <div
                aria-label="예금"
                className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#FFC24E]/60 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#FFC24E]/80 hover:scale-110 transition-all duration-300"
                onClick={click}>
                예금 하기
              </div>
            </div>
          </div>
          {/* 2. 출금 */}
          <div className="flex flex-col w-[25%] md:w-[23%] md:min-w-[23%] lg:min-w-[20%] lg:w-1/5 mx-2 text-center border-2 rounded-[2rem] bg-[#FFDCA9]/60 border-[#FD9653]/60">
            <div className="py-2 lg:py-5">
              <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">출금</span>
            </div>
            <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
              <span>통장에 있는 </span> <br />
              <span>돈을 뺄 수 있습니다.</span>
            </div>
            <div className="py-4 mx-auto lg:py-10">
              <img
                className="object-contain w-[4rem] md:w-[5rem] lg:w-[7rem] h-[4rem] md:h-[5rem] lg:h-[7rem]"
                src="/images/icons//money2.png"
                alt=""
              />
            </div>
            <div className="pb-4 lg:pb-7">
              <div
                aria-label="출금"
                className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#FB8B2F]/60 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#FB8B2F]/80 hover:scale-110 transition-all duration-300"
                onClick={click}>
                출금 하기
              </div>
            </div>
          </div>
          {/* 3. 송금 */}
          <div className="flex flex-col w-[25%] md:w-[23%] md:min-w-[23%] lg:min-w-[20%] lg:w-1/5 mx-2 text-center border-2 rounded-[2rem] bg-[#D7E9F7]/60 border-[#748DA6]/60">
            <div className="py-2 lg:py-5">
              <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">송금</span>
            </div>
            <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
              <span>다른 사용자에게</span> <br />
              <span>돈을 보낼 수 있습니다.</span>
            </div>
            <div className="py-4 mx-auto lg:py-10">
              <img
                className="object-contain w-[4rem] md:w-[5rem] lg:w-[7rem] h-[4rem] md:h-[5rem] lg:h-[7rem]"
                src="/images/icons/money3.png"
                alt=""
              />
            </div>
            <div className="pb-4 lg:pb-7">
              <div
                aria-label="송금"
                className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#2C94EA]/60 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#2C94EA]/80 hover:scale-110 transition-all duration-300"
                onClick={click}>
                송금 하기
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-2 lg:pt-3 md:w-[75%] lg:w-[62%] justify-end font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1.2rem] text-[#8D8D8D] lg:pb-0 pb-[5vh]">
          <div>
            <span> 총 예금 금액 &nbsp;</span>
            <span className="font-black text-[#3F3F3F] text-[1.3rem] lg:text-[2rem]">999,999,999,999</span>
            <span> 원</span>
          </div>
        </div>
      </div>
      {isClick && <Modal clickNum={clickNum} setIsClick={setIsClick} />}
    </>
  );
}
export default Bank;

interface ModalType {
  clickNum: number;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ clickNum, setIsClick }: ModalType): JSX.Element {
  const ref = useRef(null);
  return (
    <>
      <div
        ref={ref}
        className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 pt-10 lg:pt-0"
        onClick={(e) => {
          if (e.target === ref.current) {
            setIsClick((pre) => !pre);
          }
        }}>
        {clickNum === 1 && <Section1 setIsClick={setIsClick} />}
        {clickNum === 2 && <Section2 setIsClick={setIsClick} />}
        {clickNum === 3 && <Section3 setIsClick={setIsClick} />}
      </div>
    </>
  );
}

interface SetIsClickType {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

// 예금
function Section1({ setIsClick }: SetIsClickType): JSX.Element {
  return (
    <>
      <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[29rem] lg:w-[42%] lg:max-w-[35rem] px-7 rounded-xl">
        <div className="flex flex-col items-center w-full pt-3 ">
          <span className="font-extrabold text-[2rem] lg:text-[2.5rem] text-[#FFB11B]">예금</span>
          <span className="lg:text-[1rem] text-[0.85rem]">새로운 통장에 저금할 금액을 작성해주세요.</span>
        </div>
        <div className="flex flex-col w-full py-2 lg:py-3">
          <div className="flex justify-between w-full pb-2">
            <div className="flex items-end space-x-2">
              <span className="text-[1.35rem] lg:text-[1.5rem] font-extrabold">예금 금액</span>
              <span className="font-medium pb-[2px] text-[#282828] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem]">
                잔여 금액: 999,999,999,999원
              </span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-[0.8rem] lg:text-[0.9rem] pb-[2px]">예금주:</span>
              <span className="font-extrabold text-[1.05rem] lg:text-[1.1rem]">Pink</span>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full py-2 bg-[#FFF8F0]">
              <div className="text-[#686868] text-[0.7rem] lg:text-[0.8rem] px-2">입금액</div>
              {/* 입금할 금액 */}
              <div className="flex w-full justify-end pr-2 font-extrabold text-[1.2rem] lg:text-[1.4rem] py-1 space-x-1">
                <span>0</span>
                <span>원</span>
              </div>
            </div>
            <div className="flex w-full justify-end py-2 px-2 bg-[#FDEDC0] text-[#464646] text-[0.7rem] lg:text-[0.8rem]">
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+1만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+5만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+10만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+100만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2">전액</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 space-x-3 font-bold text-white text-[0.8rem] lg:text-[1rem] pt-1 lg:pt-0">
          <div className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300">
            <span onClick={() => setIsClick((pre) => !pre)}>닫기</span>
          </div>
          <div className="bg-[#FFC04D] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300">
            <span>개설 하기</span>
          </div>
        </div>
      </div>
    </>
  );
}

// 출금
function Section2({ setIsClick }: SetIsClickType): JSX.Element {
  return (
    <>
      <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[29rem] lg:w-[42%] lg:max-w-[30rem] px-7 rounded-xl">
        <div className="flex flex-col items-center w-full pt-3 ">
          <span className="font-extrabold text-[2rem] lg:text-[2.5rem] text-[#FFB11B]">예금</span>
          <span className="lg:text-[1rem] text-[0.85rem]">새로운 통장에 저금할 금액을 작성해주세요.</span>
        </div>
        <div className="flex flex-col w-full py-2 lg:py-3">
          <div className="flex justify-between w-full pb-2">
            <div className="flex items-end space-x-2">
              <span className="text-[1.35rem] lg:text-[1.5rem] font-extrabold">예금 금액</span>
              <span className="font-medium pb-[2px] text-[#282828] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem]">
                잔여 금액: 999,999,999,999원
              </span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-[0.8rem] lg:text-[0.9rem] pb-[2px]">예금주:</span>
              <span className="font-extrabold text-[1.05rem] lg:text-[1.1rem]">Pink</span>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full py-1 bg-[#FFF8F0]">
              <div className="text-[#686868] text-[0.7rem] lg:text-[0.8rem] px-2">입금액</div>
              {/* 입금할 금액 */}
              <div className="flex w-full justify-end pr-2 font-extrabold text-[1.2rem] lg:text-[1.4rem] py-1 space-x-1">
                <span>0</span>
                <span>원</span>
              </div>
            </div>
            <div className="flex w-full justify-end py-2 px-2 bg-[#FDEDC0] text-[#464646] text-[0.7rem] lg:text-[0.8rem]">
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+1만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+5만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+10만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+100만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2">전액</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 space-x-3 font-bold text-white text-[0.8rem] lg:text-[1rem] pt-1 lg:pt-0">
          <div className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300">
            <span onClick={() => setIsClick((pre) => !pre)}>닫기</span>
          </div>
          <div className="bg-[#FFC04D] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300">
            <span>개설 하기</span>
          </div>
        </div>
      </div>
    </>
  );
}

// 송금
function Section3({ setIsClick }: SetIsClickType): JSX.Element {
  return (
    <>
      <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[29rem] lg:w-[42%] lg:max-w-[35rem] px-7 rounded-xl">
        <div className="flex flex-col items-center w-full pt-3 ">
          <span className="font-extrabold text-[2rem] lg:text-[2.5rem] text-[#3A78B7]">송금</span>
          <span className="lg:text-[1rem] text-[0.85rem]">받는사람 닉네임과 보낼금액을 작성해주세요.</span>
        </div>
        <div className="flex flex-col w-full py-2 lg:py-3">
          <div className="flex items-end justify-between pb-3">
            <div className="flex items-end w-full space-x-2">
              <span className="text-[1.35rem] lg:text-[1.5rem] font-extrabold">송금 금액</span>
              <span className="font-medium pb-[2px] text-[#282828] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem]">
                잔여 금액: 999,999,999,999원
              </span>
            </div>
            <div className="flex justify-center space-x-2 w-[45%] pb-[2px]">
              <div className="flex justify-start w-[70%]">
                <input
                  className="w-full placeholder:text-[0.7rem] text-[0.7rem] lg:text-[0.9rem] lg:placeholder:text-[0.8rem] outline-none"
                  type="text"
                  placeholder="받는사람 닉네임"
                />
              </div>
              <div className="w-[35%] flex  text-center my-auto text-white">
                <span className="w-full h-[70%] px-2 text-[0.7rem] lg:text-[0.8rem] py-[1px] hover:scale-105 transition-all duration-300 rounded-full bg-[#2C94EA]">
                  확인
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pb-2">
            <div className="flex flex-col w-full py-2 bg-[#EEF8FF]">
              <div className="text-[#707070] text-[0.7rem] lg:text-[0.8rem] px-2">보낼금액</div>
              {/* 송금할 금액 */}
              <div className="flex w-full justify-end pr-2 font-extrabold text-[1.2rem] lg:text-[1.4rem] py-1 space-x-1">
                <span>0</span>
                <span>원</span>
              </div>
            </div>
            <div className="flex w-full justify-end py-2 px-2 bg-[#C7E6FF] text-[#464646] text-[0.7rem] lg:text-[0.8rem]">
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+1만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+5만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+10만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2 border-r-2">+100만원</span>
              </div>
              <div className="transition-all duration-150 cursor-pointer hover:scale-105">
                <span className="px-2">전액</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 space-x-3 font-bold text-white text-[0.8rem] lg:text-[1rem] pt-1 lg:pt-0">
          <div className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300">
            <span onClick={() => setIsClick((pre) => !pre)}>닫기</span>
          </div>
          <div className="bg-[#2C94EA] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300">
            <span>송금 하기</span>
          </div>
        </div>
      </div>
    </>
  );
}
