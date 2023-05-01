import {
  useDeleteBankMutation,
  useGetBankListQuery,
  useGetBankQuery,
  useLazyGetUsersNicknameQuery,
  usePostBankMutation,
  usePostBankTransferMutation
} from 'Store/api';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeCurrentMoneyStatusStatus } from 'Store/store';
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import BankModal from './BankModal';

function Bank(): JSX.Element {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [clickNum, setClickNum] = useState<number>(0);

  // 소지 금액 상태
  const { data: getBank, isLoading: isLoading1, isError: isError1 } = useGetBankQuery('');
  const currentMoney = useAppSelector((state) => {
    return state.currentMoneyStatus;
  });

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
      {isLoading1 && <div>로딩</div>}
      {isError1 && <div>에러</div>}
      <div className="flex flex-col items-center justify-end w-full h-full lg:pb-0 lg:justify-center">
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
            <div className="py-4 mx-auto lg:py-8">
              <img
                className="object-contain w-[4rem] md:w-[5rem] lg:w-[7rem] h-[4rem] md:h-[5rem] lg:h-[7rem]"
                src="/images/icons/money1.png"
                alt=""
              />
            </div>
            <div className="pb-4 lg:pb-5">
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
              <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#FD9653] ">출금</span>
            </div>
            <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
              <span>통장에 있는 </span> <br />
              <span>돈을 뺄 수 있습니다.</span>
            </div>
            <div className="py-4 mx-auto lg:py-8">
              <img
                className="object-contain w-[4rem] md:w-[5rem] lg:w-[7rem] h-[4rem] md:h-[5rem] lg:h-[7rem]"
                src="/images/icons//money2.png"
                alt=""
              />
            </div>
            <div className="pb-4 lg:pb-5">
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
              <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#748DA6] ">송금</span>
            </div>
            <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
              <span>다른 사용자에게</span> <br />
              <span>돈을 보낼 수 있습니다.</span>
            </div>
            <div className="py-4 mx-auto lg:py-8">
              <img
                className="object-contain w-[4rem] md:w-[5rem] lg:w-[7rem] h-[4rem] md:h-[5rem] lg:h-[7rem]"
                src="/images/icons/money3.png"
                alt=""
              />
            </div>
            <div className="pb-4 lg:pb-5">
              <div
                aria-label="송금"
                className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#2C94EA]/60 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#2C94EA]/80 hover:scale-110 transition-all duration-300"
                onClick={click}>
                송금 하기
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-2 lg:pt-3 w-[75%] lg:w-[62%] justify-end font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1.2rem] text-[#8D8D8D] lg:pb-0 pb-[5vh]">
          <div>
            <span> 총 예금 금액 &nbsp;</span>
            <span className="font-black text-[#3F3F3F] text-[1.3rem] lg:text-[2rem]">
              {getBank?.data.currentMoney.toLocaleString()}
            </span>
            <span> 원</span>
          </div>
        </div>
      </div>
      {isClick && <BankModal clickNum={clickNum} setIsClick={setIsClick} currentMoney={currentMoney} />}
    </>
  );
}
export default Bank;

interface SetIsClickType {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  currentMoney: string;
  IntAfterCurrentMoney: number;
}
