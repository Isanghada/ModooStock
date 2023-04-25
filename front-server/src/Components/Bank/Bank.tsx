function Bank(): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-end w-full h-full pb-3 lg:pb-0 lg:justify-center">
        <div className="flex items-center justify-center w-full mx-auto">
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
              <div className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#FFC24E]/60 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#FFC24E]/80 hover:scale-110 transition-all duration-300">
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
              <div className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#FB8B2F]/60 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#FB8B2F]/80 hover:scale-110 transition-all duration-300">
                출금 하기
              </div>
            </div>
          </div>
          {/* 송금 */}
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
              <div className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#2C94EA]/60 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#2C94EA]/80 hover:scale-110 transition-all duration-300">
                송금 하기
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-2 lg:pt-3 md:w-[75%] lg:w-[62%] justify-end font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1.2rem] text-[#8D8D8D]">
          <div>
            <span> 총 예금 금액 &nbsp;</span>
            <span className="font-black text-[#3F3F3F] text-[1.3rem] lg:text-[2rem]">999,999,999,999</span>
            <span> 원</span>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
}
export default Bank;

function Modal(): JSX.Element {
  return (
    <>
      <div className="absolute flex items-center justify-center w-full h-full my-auto border-4 bg-[#707070]/50">
        <div className="flex flex-col justify-center bg-white border drop-shadow-lg w-[76%]">
          <div className="flex flex-col items-center w-full">
            <span className="font-extrabold text-[2.5rem] text-[#FFB11B]">예금</span>
            <span className="">새로운 통장에 저금할 금액을 작성해주세요.</span>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <div className="flex justify-between w-full">
                <span className="text-[1.7rem] font-extrabold">예금 금액</span>
                <span>잔여 금액: 999,999,999,999원</span>
              </div>
              <div>
                <span>예금주</span>
                <span>Pink</span>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <div>입금액</div>
                {/* 입금할 금액 */}
                <div>0원</div>
              </div>
              <div className="flex w-full">
                <div>
                  <span>+1만원</span>
                </div>
                <div>
                  <span>+5만원</span>
                </div>
                <div>
                  <span>+10만원</span>
                </div>
                <div>
                  <span>+100만원</span>
                </div>
                <div>
                  <span>전액</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <span>닫기</span>
            </div>
            <div>
              <span>개설 하기</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
