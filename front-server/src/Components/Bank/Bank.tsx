function Bank(): JSX.Element {
  return (
    <>
      <div className="flex items-center justify-center w-full mx-auto">
        {/* 1. 예금 */}
        <div className="flex flex-col w-[25%] md:w-[23%] md:min-w-[23%] lg:min-w-[20%] lg:w-1/5 mx-2 text-center border-2 rounded-[2rem] bg-[#FFF2CC]/60 border-[#F0A633]/60">
          <div className="py-2 lg:py-5">
            <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">
              예금
            </span>
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
            <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">
              출금
            </span>
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
            <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">
              송금
            </span>
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
      <div className="absolute bottom-0 right-0 pb-5 pr-20 font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1.2rem] text-[#8D8D8D]">
        <span> 총 예금 금액 </span>
        <span className="font-black text-[#3F3F3F] text-[1.3rem] md:text-[1.5rem] lg:text-[2rem]">
          999,999,999,999
        </span>
        <span> 원</span>
      </div>
    </>
  );
}
export default Bank;
