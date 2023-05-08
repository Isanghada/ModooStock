import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLazyGetUsersNicknameQuery, usePostBankTransferMutation } from 'Store/api';
import { useAppDispatch } from 'Store/hooks';
import { changeCurrentMoneyStatusStatus } from 'Store/store';
// 파이어 베이스
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';
import { usePostSendPushMutation } from 'Store/FirebaseApi';

interface SetIsClickType {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  currentMoney: string;
  IntAfterCurrentMoney: number;
}

// 송금
function BankSection3({ setIsClick, currentMoney, IntAfterCurrentMoney }: SetIsClickType): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [afterMoney, setAfterMoney] = useState<string>('0');
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const [checkMoneyState, setCheckMoneyState] = useState<boolean>(false);

  const [postBankTransfer, { isLoading: isLoading1, isError: isError1 }] = usePostBankTransferMutation();
  const [getUsersNickname, { isLoading: isLoading2, isError: isError2 }] = useLazyGetUsersNicknameQuery();
  const [postSendPushMessage ] = usePostSendPushMutation();

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

  const isValidInput = async (input: string) => {
    const regex = await /^[0-9,]*$/;
    return regex.test(input);
  };

  const change = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    switch (target.ariaLabel) {
      case '입력':
        if (target.value !== '' && ref.current) {
          await isValidInput(ref.current.value).then((r) => {
            if (r === true && ref.current) {
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

  // 송금
  const postTransfer = async (money: number, receiver: string) => {
    if (money > 0) {
      const body = {
        money: money,
        receiver: receiver
      };
      console.log(body);

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
        // 웹 푸시용
        const docRef = doc(dbService, 'PushToken', '핑크빈');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const pushToken = docSnap.data().token;
          const message = {
            notification: {
              title: '모두의 주식',
              body: `${localStorage.getItem("nickname")}님이 당신에게 송금하였습니다`,
              icon: `${process.env.REACT_APP_S3_URL}/images/logos/pushLogo.png`
            },
            to: pushToken
          };
          const {data} = await postSendPushMessage(message).unwrap()
          console.log(data, "푸쉬후 데이터");
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No such document!');
        }
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
            const floorMoney = Math.floor(parseInt(inputvalueMoney) / 10);
            ref.current.value = Math.floor(parseInt(inputvalueMoney) / 10).toLocaleString();
            setAfterMoney((IntAfterCurrentMoney - floorMoney).toLocaleString());
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
          });
          postTransfer(parseInt(price), receiver);
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
                  className="transition-all duration-300 cursor-pointer hover:scale-110 active:scale-110"
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
export default BankSection3;
