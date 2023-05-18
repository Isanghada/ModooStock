import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePostBankMutation } from 'Store/api';
import { useAppDispatch } from 'Store/hooks';
import { changeCurrentMoneyStatusStatus } from 'Store/store';

interface SetIsClickType {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  currentMoney: string;
  IntAfterCurrentMoney: number;
  clickBtn: HTMLAudioElement;
  cancelClickBtn: HTMLAudioElement;
  successFxSound: HTMLAudioElement;
  errorFxSound: HTMLAudioElement;
}

// 예금
function BankSection1({
  setIsClick,
  currentMoney,
  IntAfterCurrentMoney,
  clickBtn,
  cancelClickBtn,
  successFxSound,
  errorFxSound
}: SetIsClickType): JSX.Element {
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
        successFxSound.play();
        dispatch(changeCurrentMoneyStatusStatus((IntAfterCurrentMoney - price).toLocaleString()));
        toast.success('개설에 성공했습니다!');
        setIsClick((pre) => !pre);
      } else {
        errorFxSound.play();
        toast.error('요청에 실패했습니다...');
      }
    } else {
      errorFxSound.play();
      toast.error('금액을 입력해주세요!');
    }
  };

  const isValidInput = async (input: string) => {
    const regex = await /^[0-9,]*$/;
    console.log('regex: ', regex);
    return regex.test(input);
  };

  const change = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    switch (target.ariaLabel) {
      case '입력':
        if (target.value !== '' && ref.current) {
          await isValidInput(ref.current.value).then((r) => {
            if (r === true && ref.current) {
              console.log(ref.current.value);

              const intValue = parseInt(ref.current.value.replaceAll(',', ''));
              const checkMoney: number = IntAfterCurrentMoney - intValue;
              const inputMoney: string = checkMoney.toLocaleString();
              compareMoney(checkMoney);
              setAfterMoney(inputMoney);
              ref.current.value = intValue.toLocaleString();
            } else if (r === false && ref.current) {
              ref.current.value = Math.abs(parseInt(afterMoney.replaceAll(',', ''))).toLocaleString();
            }
          });
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
        clickBtn.play();
        if (ref.current) {
          if (ref.current.value !== '0' && ref.current.value !== '') {
            let inputvalueMoney = '';
            ref.current.value.split(',').map((liMoney) => (inputvalueMoney += liMoney));
            const floorMoney = Math.floor(parseInt(inputvalueMoney) / 10);
            ref.current.value = Math.floor(parseInt(inputvalueMoney) / 10).toLocaleString();
            setAfterMoney((IntAfterCurrentMoney - floorMoney).toLocaleString());
          }
        }
        break;
      case '1만원':
        clickBtn.play();
        clickDeposit(intMoney, 10000);
        break;
      case '5만원':
        clickBtn.play();
        clickDeposit(intMoney, 50000);
        break;
      case '10만원':
        clickBtn.play();
        clickDeposit(intMoney, 100000);
        break;
      case '100만원':
        clickBtn.play();
        clickDeposit(intMoney, 1000000);
        break;
      case '1000만원':
        clickBtn.play();
        clickDeposit(intMoney, 10000000);
        break;
      case '전액':
        clickBtn.play();
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
                  className="transition-all duration-300 cursor-pointer hover:scale-110 active:scale-110"
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
            onClick={() => {
              cancelClickBtn.play();
              setIsClick((pre) => !pre);
            }}>
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
export default BankSection1;
