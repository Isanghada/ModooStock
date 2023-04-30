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
      {isClick && <Modal clickNum={clickNum} setIsClick={setIsClick} currentMoney={currentMoney} />}
    </>
  );
}
export default Bank;

interface ModalType {
  clickNum: number;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  currentMoney: string;
}

function Modal({ clickNum, setIsClick, currentMoney }: ModalType): JSX.Element {
  const ref = useRef(null);
  let money = '';
  currentMoney.split(',').map((liMoney: string) => (money += liMoney));
  return (
    <>
      <div
        ref={ref}
        className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 pt-5 lg:pt-0 z-50"
        onClick={(e) => {
          if (e.target === ref.current) {
            setIsClick((pre) => !pre);
          }
        }}>
        {clickNum === 1 && (
          <Section1 setIsClick={setIsClick} currentMoney={currentMoney} IntAfterCurrentMoney={parseInt(money)} />
        )}
        {clickNum === 2 && (
          <Section2 setIsClick={setIsClick} currentMoney={currentMoney} IntAfterCurrentMoney={parseInt(money)} />
        )}
        {clickNum === 3 && (
          <Section3 setIsClick={setIsClick} currentMoney={currentMoney} IntAfterCurrentMoney={parseInt(money)} />
        )}
      </div>
    </>
  );
}

interface SetIsClickType {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  currentMoney: string;
  IntAfterCurrentMoney: number;
}

// 예금
function Section1({ setIsClick, currentMoney, IntAfterCurrentMoney }: SetIsClickType): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [afterMoney, setAfterMoney] = useState<string>('0');
  const [checkMoneyState, setCheckMoneyState] = useState<boolean>(false);

  const nickname = localStorage.getItem('nickname');
  const [postBank, { isLoading: isLoading1, isError: isError1 }] = usePostBankMutation();

  useEffect(() => {
    if (IntAfterCurrentMoney > 0) {
      setCheckMoneyState(true);
    }
    setAfterMoney(currentMoney);
  }, []);

  const compareMoney = (checkMoney: number) => {
    if (checkMoney > 0) {
      setCheckMoneyState(true);
    } else {
      setCheckMoneyState(false);
    }
  };

  const clickDeposit = (intMoney: number, deposit: number) => {
    const checkMoney: number = intMoney - deposit;
    const inputMoney: string = checkMoney.toLocaleString();
    if (ref.current) {
      if (ref.current.value !== '') {
        let inputvalueMoney = '';
        ref.current.value.split(',').map((liMoney) => (inputvalueMoney += liMoney));
        ref.current.value = (parseInt(inputvalueMoney) + deposit).toLocaleString();
      } else {
        ref.current.value = (0 + deposit).toLocaleString();
      }
    }
    compareMoney(checkMoney);
    setAfterMoney(inputMoney);
  };

  const postDeposit = async (price: number) => {
    if (price > 0) {
      const { data, result } = await postBank(price).unwrap();
      if (data) {
        dispatch(changeCurrentMoneyStatusStatus((IntAfterCurrentMoney - price).toLocaleString()));
        toast.success('개설에 성공했습니다!');
        setIsClick((pre) => !pre);
      } else {
        toast.error('요청에 실패했습니다...');
      }
    } else {
      toast.error('금액을 입력해주세요!');
    }
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    switch (target.ariaLabel) {
      case '입력':
        if (target.value !== '' && ref.current) {
          const intValue = parseInt(ref.current.value.replaceAll(',', ''));
          const checkMoney: number = IntAfterCurrentMoney - intValue;
          const inputMoney: string = checkMoney.toLocaleString();
          compareMoney(checkMoney);
          setAfterMoney(inputMoney);

          ref.current.value = intValue.toLocaleString();
        } else {
          setAfterMoney(currentMoney);
        }
        break;
    }
  };

  const click = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    let money: string = '';
    afterMoney.split(',').map((liMoney) => (money += liMoney));
    const intMoney: number = parseInt(money);
    switch (target.ariaLabel) {
      case '지우기':
        if (ref.current) {
          if (ref.current.value !== '0' && ref.current.value !== '') {
            let inputvalueMoney = '';
            ref.current.value.split(',').map((liMoney) => (inputvalueMoney += liMoney));
            ref.current.value = Math.floor(parseInt(inputvalueMoney) / 10).toLocaleString();
          }
        }
        break;
      case '1만원':
        clickDeposit(intMoney, 10000);
        break;
      case '5만원':
        clickDeposit(intMoney, 50000);
        break;
      case '10만원':
        clickDeposit(intMoney, 100000);
        break;
      case '100만원':
        clickDeposit(intMoney, 1000000);
        break;
      case '1000만원':
        clickDeposit(intMoney, 10000000);
        break;
      case '전액':
        clickDeposit(intMoney, intMoney);
        break;
      case '개설 하기':
        let price: string = '';
        ref.current?.value.split(',').map((liMoney) => {
          price += liMoney;
        });
        postDeposit(parseInt(price));
        break;
    }
  };

  return (
    <>
      {isLoading1 && <div>로딩</div>}
      {isError1 && <div>에러</div>}
      <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[29rem] lg:w-[42%] lg:max-w-[35rem] px-7 rounded-xl">
        <div className="flex flex-col items-center w-full pt-3 ">
          <span className="font-extrabold text-[1.8rem] lg:text-[2.5rem] text-[#FFB11B]">예금</span>
          <span className="lg:text-[1rem] text-[0.8rem]">새로운 통장에 저금할 금액을 작성해주세요.</span>
        </div>
        <div className="flex flex-col w-full py-2 lg:py-3">
          <div className="flex justify-between w-full pb-2">
            <div className="flex items-end space-x-2">
              <span className="text-[1.2rem] lg:text-[1.5rem] font-extrabold">예금 금액</span>
              <span
                className={`font-medium pb-[2px] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem] ${
                  checkMoneyState ? 'text-[#282828]' : 'text-[#FF0000] font-extrabold'
                }`}>
                잔여 금액: {afterMoney}원
              </span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-[0.8rem] lg:text-[0.9rem] pb-[2px]">예금주:</span>
              <span className="font-extrabold text-[1.05rem] lg:text-[1.1rem]">{nickname}</span>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full py-4 bg-[#FFF8F0] rounded-tl-lg rounded-tr-lg">
              <div className="text-[#686868] text-[0.7rem] lg:text-[0.8rem] px-2 flex justify-between">
                <span>입금액</span>
                <div
                  aria-label="지우기"
                  className="cursor-pointer hover:scale-110 transition-all duration-300 active:scale-110"
                  onClick={click}>
                  ◀️
                </div>
              </div>
              {/* 입금할 금액 */}
              <div className="flex w-full justify-end pr-2 font-extrabold text-[1.2rem] lg:text-[1.4rem] py-1 space-x-1">
                <input
                  maxLength={15}
                  ref={ref}
                  aria-label="입력"
                  className="text-right outline-none placeholder:text-[1.2rem] placeholder:lg:text-[1.4rem] placeholder:text-black bg-[#FFF8F0]"
                  type="text"
                  placeholder="0"
                  onChange={change}
                />
                <span>원</span>
              </div>
            </div>
            <div className="flex w-full justify-end py-[0.75rem] lg:py-[0.79rem] px-2 bg-[#FDEDC0] text-[#464646] text-[0.7rem] lg:text-[0.8rem] rounded-bl-lg rounded-br-lg">
              <div
                aria-label="1만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+1만원</span>
              </div>
              <div
                aria-label="5만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+5만원</span>
              </div>
              <div
                aria-label="10만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+10만원</span>
              </div>
              <div
                aria-label="100만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+100만원</span>
              </div>
              <div
                aria-label="1000만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+1000만원</span>
              </div>
              <div
                aria-label="전액"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2">전액</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 space-x-3 font-bold text-white text-[0.8rem] lg:text-[1rem] pt-1 lg:pt-0 mt-1">
          <div
            className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setIsClick((pre) => !pre)}>
            <span>닫기</span>
          </div>
          <div
            aria-label="개설 하기"
            className="bg-[#FFC04D] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={click}>
            <span>개설 하기</span>
          </div>
        </div>
      </div>
    </>
  );
}

// 출금
function Section2({ setIsClick, currentMoney, IntAfterCurrentMoney }: SetIsClickType): JSX.Element {
  const dispatch = useAppDispatch();
  const [deleteBank, { isLoading: isLoading1, isError: isError1 }] = useDeleteBankMutation();
  const { data: getBankList, isLoading: isLoading2, isError: isError2 } = useGetBankListQuery('');

  const click = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (passbookList?.length) {
      const reversepassbookList = passbookList.reverse();
    }
  };

  // 통장 리스트
  const passbookList = getBankList?.data.map((passbook, idx: number) => {
    const { bankId, startDate, endDate, price, isPaid } = passbook;
    const startDateSplit = startDate.split('T');
    const endDateSplit = endDate.split('T');

    const click = (e: React.MouseEvent) => {
      const withdraw = async (bankId: number) => {
        const { data, result } = await deleteBank(bankId).unwrap();
        if (data) {
          dispatch(changeCurrentMoneyStatusStatus((IntAfterCurrentMoney + price).toLocaleString()));
          toast.success('출금이 완료되었습니다!');
        } else {
          toast.error('요청에 실패했습니다...');
        }
      };
      withdraw(bankId);
    };

    return (
      <div
        key={idx}
        className="flex justify-start items-end w-full border-b-[#FFE4CC] border-b-2 py-2 lg:py-3 text-[0.7rem] lg:text-[0.8rem]">
        <div className="w-[23%] pl-2">
          {startDateSplit[0]} {startDateSplit[1].split(':')[0]}:{startDateSplit[1].split(':')[1]}{' '}
        </div>
        <div className="w-[23%] pl-2">
          {endDateSplit[0]} {endDateSplit[1].split(':')[0]}:{endDateSplit[1].split(':')[1]}{' '}
        </div>
        <div className="w-[28%] pl-2 text-[0.9rem] lg:text-[1rem] font-extrabold text-start text-black">
          {price.toLocaleString()}원
        </div>
        <div className="flex justify-center items-center lg:justify-between py-[2px] space-x-2 lg:space-x-0 w-[26%] pl-2 lg:px-4 pb-[2px]">
          {isPaid ? (
            <div className="text-[#117D00] bg-[#F1FFDB] px-3 drop-shadow-md rounded-lg">완료</div>
          ) : (
            <div className="text-[#CE0000] bg-[#FFE4DB] px-3 drop-shadow-md rounded-lg">미완료</div>
          )}
          <div
            aria-label="출금하기"
            className="text-white flex justify-center items-center bg-[#FFC34F] py-[2px] px-3 drop-shadow-md rounded-full cursor-pointer hover:scale-105 transition-all duration-150"
            onClick={click}>
            출금하기
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {isLoading1 && isLoading2 && <div>로딩</div>}
      {isError1 && isError2 && <div>에러</div>}
      <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[85%] max-w-[45rem] md:w-[75%] md:max-w-[40rem] lg:max-w-[45rem] px-7 rounded-xl">
        <div className="flex flex-col items-center w-full pt-3 ">
          <span className="font-extrabold text-[1.8rem] lg:text-[2.5rem] text-[#FAAB78]">출금</span>
          <span className="lg:text-[1rem] text-[0.8rem]">만기일이 지난 통장을 선택하여 예금 및 이자를 받으세요.</span>
        </div>
        <div className="flex flex-col w-full py-2 lg:py-3">
          <div className="flex justify-between w-full pb-2">
            <div className="flex items-end space-x-2">
              <span className="text-[1.2rem] lg:text-[1.5rem] font-extrabold">통장 조회</span>
              {/* <div onClick={click}>
                <span className="font-medium pb-[2px] text-[#282828] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem] cursor-pointer hover:scale-105 transition-all duration-150">
                  최신순↓
                </span>
              </div> */}
            </div>
            <div className="flex items-end space-x-2">
              <span className="font-medium pb-[2px] text-[#282828] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem]">
                잔여 금액: {currentMoney}원
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex justify-start w-full py-2 bg-[#FFF5EC] text-[0.8rem] lg:text-[1rem] text-[#717171] font-bold rounded-lg">
              <div className="w-[23%] pl-2">개설일</div>
              <div className="w-[23%] pl-2">만기일</div>
              <div className="w-[28%] pl-2">통장 금액</div>
              <div className="w-[26%] pl-2">이자 지급</div>
            </div>
            <div className="flex flex-col flex-nowrap w-full overflow-y-auto bg-white min-h-[7rem] max-h-[7rem] lg:min-h-[15rem] lg:max-h-[15rem]">
              {passbookList?.length !== 0 ? (
                passbookList
              ) : (
                <div className="w-full flex justify-center items-center h-full mx-auto my-auto font-bold">
                  <span>개설한 통장이 없습니다.</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 font-bold text-white text-[0.8rem] lg:text-[1rem] pt-1 lg:pt-0">
          <div
            className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setIsClick((pre) => !pre)}>
            <span>닫기</span>
          </div>
        </div>
      </div>
    </>
  );
}

// 송금
function Section3({ setIsClick, currentMoney, IntAfterCurrentMoney }: SetIsClickType): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [afterMoney, setAfterMoney] = useState<string>('0');
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const [checkMoneyState, setCheckMoneyState] = useState<boolean>(false);

  const [postBankTransfer, { isLoading: isLoading1, isError: isError1 }] = usePostBankTransferMutation();
  const [getUsersNickname, { isLoading: isLoading2, isError: isError2 }] = useLazyGetUsersNicknameQuery();

  useEffect(() => {
    if (IntAfterCurrentMoney > 0) {
      setCheckMoneyState(true);
    }
    setAfterMoney(currentMoney);
  }, []);

  const compareMoney = (checkMoney: number) => {
    if (checkMoney > 0) {
      setCheckMoneyState(true);
    } else {
      setCheckMoneyState(false);
    }
  };

  const clickTransfer = (intMoney: number, transfer: number) => {
    const checkMoney: number = intMoney - transfer;
    const inputMoney: string = checkMoney.toLocaleString();
    if (ref.current) {
      if (ref.current.value !== '') {
        let inputvalueMoney = '';
        ref.current.value.split(',').map((liMoney) => (inputvalueMoney += liMoney));
        ref.current.value = (parseInt(inputvalueMoney) + transfer).toLocaleString();
      } else {
        ref.current.value = (0 + transfer).toLocaleString();
      }
    }
    compareMoney(checkMoney);
    setAfterMoney(inputMoney);
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    switch (target.ariaLabel) {
      case '입력':
        if (target.value !== '' && ref.current) {
          const intValue = parseInt(ref.current.value.replaceAll(',', ''));
          const checkMoney: number = IntAfterCurrentMoney - intValue;
          const inputMoney: string = checkMoney.toLocaleString();
          compareMoney(checkMoney);
          setAfterMoney(inputMoney);
          ref.current.value = intValue.toLocaleString();
        } else {
          setAfterMoney(currentMoney);
        }
        break;
    }
  };

  const postTransfer = async (money: number, receiver: string) => {
    if (money > 0) {
      const body = {
        money: money,
        receiver: receiver
      };
      const { data, result } = await postBankTransfer(body).unwrap();
      console.log('data', data);
      console.log('result', result);
      console.log('nicknameCheck', nicknameCheck);

      if (result === 'SUCCESS' && nicknameCheck) {
        console.log(IntAfterCurrentMoney);
        console.log(money);
        dispatch(changeCurrentMoneyStatusStatus((IntAfterCurrentMoney - money).toLocaleString()));
        toast.success('송금을 성공했습니다!');
        setIsClick(false);
      } else if (nicknameCheck === false) {
        toast.error('닉네임을 확인해주세요!');
      } else {
        toast.error('요청에 실패했습니다!');
      }
    } else {
      toast.error('금액을 입력해주세요!');
    }
  };

  const niceknameCheck = async () => {
    if (ref2.current) {
      const { data } = await getUsersNickname(ref2.current.value).unwrap();
      // 현재 닉네임이 바뀔 수 있는 경우 -> 즉 해당 닉네임의 유저가 없다면
      if (data) {
        setNicknameCheck(false);
        toast.error('전송할 수 없는 닉네임입니다.');
      } else {
        setNicknameCheck(true);
        toast.success('전송 가능한 닉네임입니다.');
      }
    } else {
      toast.error('요청에 문제가 생겼습니다.');
    }
  };

  const click = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    let money: string = '';
    afterMoney.split(',').map((liMoney) => (money += liMoney));
    const intMoney: number = parseInt(money);
    switch (target.ariaLabel) {
      case '지우기':
        if (ref.current) {
          if (ref.current.value !== '0' && ref.current.value !== '') {
            let inputvalueMoney = '';
            ref.current.value.split(',').map((liMoney) => (inputvalueMoney += liMoney));
            ref.current.value = Math.floor(parseInt(inputvalueMoney) / 10).toLocaleString();
          }
        }
        break;
      case '확인':
        niceknameCheck();
        break;
      case '1만원':
        clickTransfer(intMoney, 10000);
        break;
      case '5만원':
        clickTransfer(intMoney, 50000);
        break;
      case '10만원':
        clickTransfer(intMoney, 100000);
        break;
      case '100만원':
        clickTransfer(intMoney, 1000000);
        break;
      case '1000만원':
        clickTransfer(intMoney, 10000000);
        break;
      case '전액':
        clickTransfer(intMoney, intMoney);
        break;
      case '송금 하기':
        if (ref2.current && nicknameCheck) {
          let price: string = '';
          const receiver: string = ref2.current.value;
          ref.current?.value.split(',').map((liMoney) => {
            price += liMoney;
            postTransfer(parseInt(price), receiver);
          });
        } else {
          toast.error('닉네임을 입력 후 확인 해주세요!');
        }
        break;
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[29rem] lg:w-[42%] lg:max-w-[35rem] px-7 rounded-xl">
        <div className="flex flex-col items-center w-full pt-3 ">
          <span className="font-extrabold text-[1.8rem] lg:text-[2.5rem] text-[#3A78B7]">송금</span>
          <span className="lg:text-[1rem] text-[0.8rem]">받는사람 닉네임과 전송 금액을 작성해주세요.</span>
        </div>
        <div className="flex flex-col w-full py-4">
          <div className="flex items-end justify-between pb-3">
            <div className="flex items-end w-full space-x-2">
              <span className="text-[1.2rem] lg:text-[1.5rem] font-extrabold">송금 금액</span>
              <span
                className={`font-medium pb-[2px] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem]  ${
                  checkMoneyState ? 'text-[#282828]' : 'text-[#FF0000] font-extrabold'
                }`}>
                잔여 금액: {afterMoney}원
              </span>
            </div>
            <div className="flex justify-center space-x-2 w-[45%] pb-[2px]">
              <div className="flex justify-start w-[70%]">
                <input
                  ref={ref2}
                  className="w-full placeholder:text-[0.7rem] text-[0.7rem] lg:text-[0.9rem] lg:placeholder:text-[0.8rem] outline-none"
                  type="text"
                  placeholder="받는사람 닉네임"
                />
              </div>
              <div aria-label="확인" className="w-[35%] flex  text-center my-auto text-white" onClick={click}>
                <span className="w-full h-[70%] px-2 text-[0.7rem] lg:text-[0.8rem] py-[1px] hover:scale-105 transition-all duration-300 rounded-full bg-[#2C94EA]">
                  확인
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pb-2">
            <div className="flex flex-col w-full py-2 bg-[#EEF8FF] rounded-tl-lg rounded-tr-lg">
              <div className="text-[#707070] text-[0.7rem] lg:text-[0.8rem] px-2 flex justify-between items-center">
                <span>전송 금액</span>
                <div
                  aria-label="지우기"
                  className="cursor-pointer hover:scale-110 transition-all duration-300 active:scale-110"
                  onClick={click}>
                  ◀️
                </div>
              </div>
              {/* 송금할 금액 */}
              <div className="flex w-full justify-end pr-2 font-extrabold text-[1.2rem] lg:text-[1.4rem] py-1 space-x-1">
                <input
                  maxLength={15}
                  ref={ref}
                  aria-label="입력"
                  className="text-right outline-none placeholder:text-[1.2rem] placeholder:lg:text-[1.4rem] placeholder:text-black bg-[#EEF8FF]"
                  type="text"
                  placeholder="0"
                  onChange={change}
                />
                <span>원</span>
              </div>
            </div>
            <div className="flex w-full justify-end py-2 px-2 bg-[#C7E6FF] text-[#464646] text-[0.7rem] lg:text-[0.8rem] rounded-bl-lg rounded-br-lg">
              <div
                aria-label="1만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+1만원</span>
              </div>
              <div
                aria-label="5만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+5만원</span>
              </div>
              <div
                aria-label="10만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+10만원</span>
              </div>
              <div
                aria-label="100만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+100만원</span>
              </div>
              <div
                aria-label="1000만원"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2 border-r-2">+1000만원</span>
              </div>
              <div
                aria-label="전액"
                className="transition-all duration-150 cursor-pointer hover:scale-105"
                onClick={click}>
                <span className="px-2">전액</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 space-x-3 font-bold text-white text-[0.8rem] lg:text-[1rem] pt-1 lg:pt-0">
          <div
            className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setIsClick((pre) => !pre)}>
            <span>닫기</span>
          </div>
          <div
            aria-label="송금 하기"
            className="bg-[#2C94EA] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={click}>
            <span>송금 하기</span>
          </div>
        </div>
      </div>
    </>
  );
}
