import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import MobileInfo from './MobileInfo';
import NewsModal from './NewsModal';
import styled from './Exchange.module.css';
import {
  useDeleteStockMutation,
  useLazyGetStockQuery,
  useLazyGetStockSelectQuery,
  useLazyGetUsersInfoQuery,
  usePostStockMutation
} from 'Store/api';
import schedule from 'node-schedule';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import Chart from './Chart';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CountdownTimeMinute from './CountdownTimeMinute';
import CountdownTimer from './CountdownTimer';
import IRModal from './IRModal';
import StockTradeModal from './StockTradeModal';
import Loading from 'Components/Common/Loading';
// 파이어베이스
import { dbService } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface CahrtDataType {
  일자: string;
  종가: number;
}

interface SelectDataType {
  changeRate: number;
  companyId: number;
  date: string;
  id: number;
  priceBefore: number;
  priceEnd: number;
}

interface StandardType {
  standardType: string;
  date: string;
  price: number;
}

interface NationalType {
  nationalCode: string;
  date: string;
  price: number;
}

interface SelectIRDataTYpe {
  'key services': string[];
  name: string;
  'operating gain': number;
  'operating revenue': number;
  plan: string[];
  'total equity': number;
  'total liabilities': number;
}

// 아래 타입 수정해야함
interface SseDataType {
  stockId: number;
  amount: number;
  average: number;
  rate: number;
  stockChartResDto: Array<{
    priceBefore: number;
    priceEnd: number;
    date: string;
    id: number;
    companyId: number;
    changeRate: number;
  }>;
}

interface TradeStockModalType {
  amount: number;
  dealType: string;
  kind: string;
  price: number;
}

function Exchange(): JSX.Element {
  const dispatch = useAppDispatch();
  const irData = require('./ir_data.json');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [lazyGetStock, { isLoading: isLoading1, isError: isError1 }] = useLazyGetStockQuery();
  const [getStockSelect, { isLoading: isLoading2, isError: isError2 }] = useLazyGetStockSelectQuery();
  const [postStock, { isLoading: isLoading3, isError: isError3 }] = usePostStockMutation();
  const [deleteStock, { isLoading: isLoading4, isError: isError4 }] = useDeleteStockMutation();
  const currentMoney = useAppSelector((state) => {
    return state.currentMoneyStatus;
  });
  const clickSound = useAppSelector((state) => {
    return state.clickBtn;
  });
  const cancelClickSound = useAppSelector((state) => {
    return state.cancelClick;
  });
  const successFx = useAppSelector((state) => {
    return state.successFx;
  });
  const errorFx = useAppSelector((state) => {
    return state.errorFx;
  });

  const clickBtn = new Audio(clickSound);
  const cancelClickBtn = new Audio(cancelClickSound);
  const successFxSound = new Audio(successFx);
  const errorFxSound = new Audio(errorFx);
  const [isPossibleStockTime, setIsPossibleStockTime] = useState<boolean>(false);
  const [isNewsClick, setIsNewsClick] = useState<boolean>(false);
  const [isMobileInfo, setIsMobileInfo] = useState<boolean>(false);
  const [isIRClick, setIsIRClick] = useState<boolean>(false);
  const [stockTrade, setStockTrade] = useState<any>();
  const [afterMoney, setAfterMoney] = useState<string>('0');
  const [lazyGetStockData, setLazyGetStockData] = useState<any>();
  // 첫번째 인덱스면 현재 데이터의 PriceBefore or 아닐 경우엔 Average 값에 대한 수익
  const [selectRevenueData, setSelectRevenueData] = useState<number>(0);
  // 가장 마지막 인덱스의 데이터
  const [selectCurrentData, setSelectCurrentData] = useState<SelectDataType>({
    changeRate: 0,
    companyId: 0,
    date: '',
    id: 0,
    priceBefore: 0,
    priceEnd: 0
  });
  // 선택한 종목의 차트를 위한 데이터
  const [selectChartData, setSelectChartData] = useState<CahrtDataType[]>([
    {
      일자: '',
      종가: 0
    }
  ]);
  // 유가
  const [oilData, setOilData] = useState<CahrtDataType[]>([
    {
      일자: '',
      종가: 0
    }
  ]);
  // 금
  const [goldData, setGoldData] = useState<CahrtDataType[]>([
    {
      일자: '',
      종가: 0
    }
  ]);
  // 유로
  const [euroData, setEuroData] = useState<CahrtDataType[]>([
    {
      일자: '',
      종가: 0
    }
  ]);
  // 엔화
  const [jypData, setJypData] = useState<CahrtDataType[]>([
    {
      일자: '',
      종가: 0
    }
  ]);
  // 달러
  const [usdData, setUsdData] = useState<CahrtDataType[]>([
    {
      일자: '',
      종가: 0
    }
  ]);

  // 국제시장 환율 클릭 0:미국, 1:일본, 2:유럽연합
  const [clickNational, setClickNational] = useState<number>(0);
  const [clickNationalName, setClickNationalName] = useState<string>('');

  // sse 적용하는 코드?
  // const [eventList, setEventList] = useState<any>();
  const [listening, setListening] = useState<boolean>(false);
  // const [respon, setRespon] = useState<boolean>(false);
  const [sseData, setSseData] = useState<SseDataType>();

  // SSE를 저장하는 변수 eventSource가 있으면 SSE 연결 중.
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | undefined>(undefined);

  // 선택한 주식에 대한 IRData
  const [selectIRData, SetSelectIRData] = useState<SelectIRDataTYpe>({
    'key services': [''],
    name: '',
    'operating gain': 0,
    'operating revenue': 0,
    plan: [''],
    'total equity': 0,
    'total liabilities': 0
  });

  // SSE
  useEffect(() => {
    // 기존 잔고 넣어주기
    // setAfterMoney('0');

    if (eventSource) {
      eventSource.close();
      setEventSource(undefined);
    }
    const token = localStorage.getItem('accessToken');

    const newEventSource = new EventSourcePolyfill(`${process.env.REACT_APP_API_URL}stock/connect`, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache'
      },
      heartbeatTimeout: 300000,
      withCredentials: true
    });
    setEventSource(newEventSource);

    return () => {
      eventSource?.close();
      newEventSource?.close();
      setEventSource(undefined);
    };
  }, []);

  if (eventSource) {
    eventSource.onmessage = (event: any) => {
      // toast.info('sse 데이터 받기');
      setSseData(JSON.parse(event.data));
    };

    eventSource.onerror = () => {
      eventSource.close();
      const token = localStorage.getItem('accessToken');

      const newEventSource = new EventSourcePolyfill(`${process.env.REACT_APP_API_URL}stock/connect`, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
        heartbeatTimeout: 300000,
        withCredentials: true
      });

      setEventSource(newEventSource);
    };
  }

  if (!eventSource) {
    const token = localStorage.getItem('accessToken');

    const newEventSource = new EventSourcePolyfill(`${process.env.REACT_APP_API_URL}stock/connect`, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache'
      },
      heartbeatTimeout: 300000,
      withCredentials: true
    });
    setEventSource(newEventSource);
  }

  const clickButtonEvent = (number: number) => {
    if (inputRef.current) {
      if (inputRef.current.value !== '') {
        let money = '';
        currentMoney.split(',').map((liMoney: string) => (money += liMoney));
        const checkMoney: number =
          selectCurrentData.priceEnd * (parseInt(inputRef.current.value.replaceAll(',', '')) + number);
        setAfterMoney(checkMoney.toLocaleString());
        inputRef.current.value = (parseInt(inputRef.current.value.replaceAll(',', '')) + number).toLocaleString();
      } else {
        inputRef.current.value = `${number}`;
        const checkMoney: number = selectCurrentData.priceEnd * number;
        setAfterMoney(checkMoney.toLocaleString());
      }
    }
  };

  const clickButtonEventM = (number: number) => {
    if (inputRef2.current) {
      if (inputRef2.current.value !== '') {
        let money = '';
        currentMoney.split(',').map((liMoney: string) => (money += liMoney));
        const checkMoney: number =
          selectCurrentData.priceEnd * (parseInt(inputRef2.current.value.replaceAll(',', '')) + number);
        setAfterMoney(checkMoney.toLocaleString());
        inputRef2.current.value = (parseInt(inputRef2.current.value.replaceAll(',', '')) + number).toLocaleString();
      } else {
        inputRef2.current.value = `${number}`;
        const checkMoney: number = selectCurrentData.priceEnd * number;
        setAfterMoney(checkMoney.toLocaleString());
      }
    }
  };

  const [isShowStockModal, setIsShowStockModal] = useState<boolean>(false);
  const [tradeStockModalData, setTradeStockModalData] = useState<TradeStockModalType>();

  // 클릭 이벤트
  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '1개':
        clickBtn.play();
        clickButtonEvent(1);
        break;
      case '10개':
        clickBtn.play();
        clickButtonEvent(10);
        break;
      case '100개':
        clickBtn.play();
        clickButtonEvent(100);
        break;
      case '1000개':
        clickBtn.play();
        clickButtonEvent(1000);
        break;
      case '1개M':
        clickBtn.play();
        clickButtonEventM(1);
        break;
      case '10개M':
        clickBtn.play();
        clickButtonEventM(10);
        break;
      case '100개M':
        clickBtn.play();
        clickButtonEventM(100);
        break;
      case '1000개M':
        clickBtn.play();
        clickButtonEventM(1000);
        break;
      case '신문':
        clickBtn.play();
        setIsNewsClick((pre) => !pre);
        break;
      case '정보':
        clickBtn.play();
        setIsMobileInfo((pre) => !pre);
        break;
      case '기업활동':
        clickBtn.play();
        setIsIRClick((pre) => !pre);
        break;
      case '미국':
        clickBtn.play();
        setClickNational(0);
        break;
      case '일본':
        clickBtn.play();
        setClickNational(1);
        break;
      case '유럽연합':
        clickBtn.play();
        setClickNational(2);
        break;
      case '매수':
        if (inputRef.current) {
          const body = {
            stockAmount: parseInt(inputRef.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const posrStock = async () => {
            try {
              const { data, result } = await postStock(body).unwrap();
              if (inputRef.current) {
                if (result === 'SUCCESS') {
                  setTradeStockModalData(data);
                  setIsShowStockModal(true);
                  // 시스템 메시지에 추가
                  await addDoc(collection(dbService, 'system'), {
                    nickname: localStorage.getItem('nickname'),
                    content: `누군가 ${data.kind}의 주식을 ${data.amount.toLocaleString()}개 매수하셨습니다`,
                    createdAt: serverTimestamp()
                  });
                  toast.success('매수 완료하였습니다!');
                  successFxSound.play();
                } else {
                  errorFxSound.play();
                  toast.error('요청에 문제가 생겼습니다!');
                }
                inputRef.current.value = '0';
              }
            } catch {
              errorFxSound.play();
              toast.error('매수할 수 있는 개수를 초과했습니다!');
            }
          };
          posrStock();
        }
        break;
      case '매수2':
        if (inputRef2.current) {
          const body = {
            stockAmount: parseInt(inputRef2.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const posrStock = async () => {
            try {
              const { data, result } = await postStock(body).unwrap();
              if (inputRef2.current) {
                if (result === 'SUCCESS') {
                  setTradeStockModalData(data);
                  setIsShowStockModal(true);
                  // 시스템 메시지에 추가
                  await addDoc(collection(dbService, 'system'), {
                    nickname: localStorage.getItem('nickname'),
                    content: `누군가 ${data.kind}의 주식을 ${data.amount.toLocaleString()}개 매수하셨습니다`,
                    createdAt: serverTimestamp()
                  });
                  toast.success('구매 완료하였습니다!');
                  successFxSound.play();
                } else {
                  errorFxSound.play();
                  toast.error('요청에 문제가 생겼습니다!');
                }
                inputRef2.current.value = '0';
              }
            } catch {
              errorFxSound.play();
              toast.error('매수할 수 있는 개수를 초과했습니다!');
            }
          };
          posrStock();
        }
        break;
      case '매도':
        if (inputRef.current) {
          const body = {
            stockAmount: parseInt(inputRef.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const stockDelete = async () => {
            try {
              const { data, result } = await deleteStock(body).unwrap();

              if (inputRef.current) {
                if (result === 'SUCCESS') {
                  setTradeStockModalData(data);
                  setIsShowStockModal(true);
                  // 시스템 메시지에 추가
                  await addDoc(collection(dbService, 'system'), {
                    nickname: localStorage.getItem('nickname'),
                    content: `누군가 ${data.kind}의 주식을 ${data.amount.toLocaleString()}개 매도하셨습니다`,
                    createdAt: serverTimestamp()
                  });
                  successFxSound.play();
                  toast.success('매도를 완료하였습니다!');
                } else {
                  errorFxSound.play();
                  toast.error('요청에 문제가 생겼습니다!');
                }
                inputRef.current.value = '0';
              }
            } catch {
              errorFxSound.play();
              toast.error('매도할 수 있는 개수를 초과했습니다!');
            }
          };
          stockDelete();
        }
        break;
      case '매도2':
        if (inputRef2.current) {
          const body = {
            stockAmount: parseInt(inputRef2.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const stockDelete = async () => {
            try {
              const { data, result } = await deleteStock(body).unwrap();
              if (inputRef2.current) {
                if (result === 'SUCCESS') {
                  setTradeStockModalData(data);
                  setIsShowStockModal(true);
                  // 시스템 메시지에 추가
                  await addDoc(collection(dbService, 'system'), {
                    nickname: localStorage.getItem('nickname'),
                    content: `누군가 ${data.kind}의 주식을 ${data.amount.toLocaleString()}개 매도하셨습니다`,
                    createdAt: serverTimestamp()
                  });
                  successFxSound.play();
                  toast.success('매도를 완료하였습니다!');
                } else {
                  errorFxSound.play();
                  toast.error('요청에 문제가 생겼습니다!');
                }
                inputRef2.current.value = '0';
              }
            } catch {
              errorFxSound.play();
              toast.error('매도할 수 있는 개수를 초과했습니다!');
            }
          };
          stockDelete();
        }
        break;
    }
  };

  // 문자열 입력 막기
  const isValidInput = async (input: string) => {
    const regex = await /^[0-9,]*$/;
    return regex.test(input);
  };

  // 입력 변경 함수
  const change = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    switch (target.ariaLabel) {
      case '입력':
        let money = '';
        currentMoney.split(',').map((liMoney: string) => (money += liMoney));
        if (target.value !== '') {
          if (inputRef.current) {
            await isValidInput(inputRef.current.value).then((r) => {
              // 숫자가 들어왔을때
              if (r === true && inputRef.current) {
                const intValue = parseInt(inputRef.current.value.replaceAll(',', ''));
                const checkMoney: number = selectCurrentData.priceEnd * intValue;
                const inputMoney: string = checkMoney.toLocaleString();
                if (target.value !== '') {
                  setAfterMoney(inputMoney);
                }
                inputRef.current.value = intValue.toLocaleString();
              }
              // 문자가 들어왔을때
              else if (r === false && inputRef.current) {
                const intValue = parseInt(inputRef.current.value.slice(0, -1).replaceAll(',', ''));
                if (inputRef.current.value.length > 1) {
                  inputRef.current.value = intValue.toLocaleString();
                } else {
                  inputRef.current.value = '0';
                }
              }
            });
          }
        } else {
          setAfterMoney('0');
        }
        break;
      case '입력모바일':
        let moneyMobile = '';
        currentMoney.split(',').map((liMoney: string) => (moneyMobile += liMoney));
        if (target.value !== '') {
          if (inputRef2.current) {
            await isValidInput(inputRef2.current.value).then((r) => {
              // 숫자가 들어왔을때
              if (r === true && inputRef2.current) {
                const intValue = parseInt(inputRef2.current.value.replaceAll(',', ''));
                const checkMoney: number = selectCurrentData.priceEnd * intValue;
                const inputMoney: string = checkMoney.toLocaleString();
                if (target.value !== '') {
                  setAfterMoney(inputMoney);
                }
                inputRef2.current.value = intValue.toLocaleString();
              }
              // 문자가 들어왔을때
              else if (r === false && inputRef2.current) {
                const intValue = parseInt(inputRef2.current.value.slice(0, -1).replaceAll(',', ''));
                if (inputRef2.current.value.length > 1) {
                  inputRef2.current.value = intValue.toLocaleString();
                } else {
                  inputRef2.current.value = '0';
                }
              }
            });
          }
        } else {
          setAfterMoney('0');
        }
        break;
    }
  };

  // 차트 데이터
  useEffect(() => {
    const firstLogin = async () => {
      const { data, result } = await lazyGetStock('').unwrap();
      setLazyGetStockData(data);
      await selectStockData(data.stockList[0].stockId);
      const firstDataName = data.stockList[0].kind;
      SetSelectIRData(irData[firstDataName]);
    };
    firstLogin();
  }, []);

  // 차트 데이터 변경될때마다 실행
  useEffect(() => {
    if (sseData) {
      // 거래 입력 값 초기화
      if (inputRef.current) {
        inputRef.current.value = '0';
      }
      if (inputRef2.current) {
        inputRef2.current.value = '0';
      }
      setAfterMoney('0');
      // 데이터 관련
      const { stockId, amount, average, rate, stockChartResDto } = sseData;
      if (clickNationalName !== '') {
        SetSelectIRData(irData[clickNationalName]);
      }

      // 수익, 손익 계산을 위한 데이터 추가
      if (stockChartResDto.length > 1) {
        setSelectRevenueData((stockChartResDto[stockChartResDto.length - 1].priceEnd - average) * amount);
      } else {
        setSelectRevenueData((stockChartResDto[stockChartResDto.length - 1].priceBefore - average) * amount);
      }
      setSelectCurrentData(stockChartResDto[stockChartResDto.length - 1]);
      // 선택한 데이터의 차트 데이터
      const SelectChartdata = stockChartResDto.map((data: SelectDataType) => {
        return {
          일자: data.date,
          종가: data.priceEnd
        };
      });
      setSelectChartData(SelectChartdata);

      // 오일, 금, 환율 데이터
      const startDate = new Date(stockChartResDto[0].date);
      const endDate = new Date(stockChartResDto[stockChartResDto.length - 1].date);
      const { euro, gold, jyp, oil, stockList, usd } = lazyGetStockData;
      // 주식 이름 변경
      if (clickNationalName === '') {
        setClickNationalName(stockList[0].kind);
      }
      // 오일 주식
      const oilData = oil
        .filter((data: StandardType) => {
          const date = new Date(data.date);
          return startDate <= date && date <= endDate;
        })
        .map((data: StandardType) => {
          return {
            일자: data.date,
            종가: data.price
          };
        });
      setOilData(oilData);

      // 금 주식
      const goldData = gold
        .filter((data: StandardType) => {
          const date = new Date(data.date);
          return startDate <= date && date <= endDate;
        })
        .map((data: StandardType) => {
          return {
            일자: data.date,
            종가: data.price
          };
        });
      setGoldData(goldData);

      // 유로 주식
      const euroData = euro
        .filter((data: StandardType) => {
          const date = new Date(data.date);
          return startDate <= date && date <= endDate;
        })
        .map((data: StandardType) => {
          return {
            일자: data.date,
            종가: data.price
          };
        });
      setEuroData(euroData);

      // 엔화 주식
      const jypData = jyp
        .filter((data: StandardType) => {
          const date = new Date(data.date);
          return startDate <= date && date <= endDate;
        })
        .map((data: StandardType) => {
          return {
            일자: data.date,
            종가: data.price
          };
        });
      setJypData(jypData);

      // 달러 주식
      const usdData = usd
        .filter((data: StandardType) => {
          const date = new Date(data.date);
          return startDate <= date && date <= endDate;
        })
        .map((data: StandardType) => {
          return {
            일자: data.date,
            종가: data.price
          };
        });
      setUsdData(usdData);
    }
  }, [sseData]);

  const selectStockData = (stockId: number) => {
    getStockSelect(stockId);
  };

  const clickStock = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setClickNationalName(e.currentTarget.innerHTML);

    if (e.currentTarget.ariaLabel !== null) {
      await selectStockData(parseInt(e.currentTarget.ariaLabel));
      setListening(false);
    }
  };

  const TagSetting = (e: any) => {
    return (
      <div>
        <span className="text-[1.25rem]">{e[e.length - 1].종가.toLocaleString()}</span>
        <span className="text-[1.25rem]">원</span>
        <span
          className={`text-[0.9rem] ${
            e[e.length - 1] && e[e.length - 2] && e[e.length - 1].종가 - e[e.length - 2].종가 > 0
              ? 'text-red-500'
              : 'text-blue-500'
          }`}>
          &nbsp;(
          {e[e.length - 1] && e[e.length - 2]
            ? (e[e.length - 1].종가 - e[e.length - 2].종가).toLocaleString()
            : e[e.length - 1].종가.toLocaleString()}
          )
        </span>
      </div>
    );
  };

  return (
    <>
      {isShowStockModal && (
        <StockTradeModal
          tradeStockModalData={tradeStockModalData}
          isShowStockModal={isShowStockModal}
          setIsShowStockModal={setIsShowStockModal}
        />
      )}
      {isLoading1 && isLoading2 && isLoading3 && isLoading4 ? (
        <Loading />
      ) : (
        <>
          {isIRClick && (
            <IRModal
              isIRClick={isIRClick}
              setIsIRClick={setIsIRClick}
              selectIRData={selectIRData}
              date={selectCurrentData.date.split('-')}
              clickBtn={clickBtn}
              cancelClickBtn={cancelClickBtn}
            />
          )}
          {isNewsClick && (
            <NewsModal
              isNewsClick={isNewsClick}
              setIsNewsClick={setIsNewsClick}
              clickBtn={clickBtn}
              cancelClickBtn={cancelClickBtn}
            />
          )}
          {isMobileInfo && (
            <MobileInfo
              isMobileInfo={isMobileInfo}
              setIsMobileInfo={setIsMobileInfo}
              oilData={oilData}
              goldData={goldData}
              usdData={usdData}
              jypData={jypData}
              euroData={euroData}
            />
          )}

          <div className="flex flex-col items-center justify-center w-full h-full pt-[12vh] md:pt-[10vh]">
            <div className="flex justify-between w-full border-b-4">
              <div className="flex justify-start items-end w-3/5 text-[1rem] md:text-[1.2rem] lg:text-[1.7rem] space-x-3 font-black">
                <div
                  aria-label={`${lazyGetStockData?.stockList[0].stockId}`}
                  className="px-3 transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={clickStock}>
                  {lazyGetStockData?.stockList[0].kind}
                </div>
                <div
                  aria-label={`${lazyGetStockData?.stockList[1].stockId}`}
                  className="px-3 transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={clickStock}>
                  {lazyGetStockData?.stockList[1].kind}
                </div>
                <div
                  aria-label={`${lazyGetStockData?.stockList[2].stockId}`}
                  className="px-3 transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={clickStock}>
                  {lazyGetStockData?.stockList[2].kind}
                </div>
                <div
                  aria-label={`${lazyGetStockData?.stockList[3].stockId}`}
                  className="px-3 transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={clickStock}>
                  {lazyGetStockData?.stockList[3].kind}
                </div>
              </div>
              <div className="flex items-end justify-end w-2/5">
                <div
                  aria-label="신문"
                  className="relative flex-col items-center hidden pr-2 transition-all duration-300 lg:flex hover:scale-105"
                  onClick={click}>
                  <span className="pb-5 lg:pb-9 text-[0.8rem] lg:text-[1.1rem] text-[#FF4F4F] font-bold">
                    신문 스크랩
                  </span>
                  <img
                    className="absolute -bottom-3 h-[2.9rem] lg:h-[4.5rem] cursor-pointer"
                    src={process.env.REACT_APP_S3_URL + '/images/icons/news.png'}
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-end text-[0.68rem] lg:text-[1rem]">
                  <span className="font-semibold leading-[0.6rem]">날짜</span>
                  <span className="text-[0.9rem] lg:text-[1.5rem] font-bold">{selectCurrentData.date}</span>
                </div>
              </div>
            </div>
            {/* 클릭한 주식 데이터 */}
            <div className="flex items-start justify-between w-full pt-2 lg:pt-5">
              {/* 왼쪽 차트 */}
              {/* 데스크탑 */}
              <div className="hidden flex-col justify-center px-2 w-[70%] lg:flex">
                <div className="flex flex-col w-full px-5 transition-all duration-300 bg-white rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 shadow-md shadow-gray-300">
                  <div className="flex items-end justify-between w-full pt-2 font-bold">
                    <div className="flex items-end space-x-3">
                      <span className="text-[1.7rem]">나의 투자 현황</span>
                      <span className="text-[1.3rem]">{clickNationalName}</span>
                    </div>
                    <div
                      aria-label="기업활동"
                      className="flex items-center space-x-1 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-105"
                      onClick={click}>
                      <span className="text-[#707070] text-[1.3rem]">기업활동</span>
                      <span>🍳</span>
                    </div>
                  </div>
                  {/* 데이터 */}
                  <div className="flex items-end justify-between w-full text-[#9B9B9B] font-bold">
                    <div
                      className={`flex items-end space-x-1 ${
                        selectRevenueData > 0 ? 'text-red-500' : 'text-blue-500'
                      }`}>
                      <span className={`text-[1.3rem]`}>{selectRevenueData.toLocaleString()}원</span>
                      <span className="text-[0.9rem]">({sseData?.rate.toFixed(2)}%)</span>
                    </div>
                    <div className="flex space-x-3 items-end  text-[1.5rem]">
                      {sseData && sseData?.amount > 0 && (
                        <>
                          <div className="flex items-center space-x-1">
                            <span className="text-[0.9rem]">보유수량</span>
                            <span className="text-black text-[1.3rem]">{sseData?.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className=" items-end text-[0.9rem]">평균단가</span>
                            <span className="text-black text-[1.3rem]">{sseData?.average?.toLocaleString()}</span>
                          </div>
                        </>
                      )}

                      <div className="flex items-center space-x-1">
                        <span className="text-[0.9rem]">현재가</span>
                        <span className={`text-black text-[1.3rem]`}>
                          {selectCurrentData.priceEnd.toLocaleString()}
                        </span>
                        <span className="text-black text-[1.3rem]">원</span>
                        {/* 현재 주식 데이터가 한개일 경우 */}
                        {sseData && sseData.stockChartResDto.length === 1 && (
                          <span
                            className={`text-[1rem] flex pt-2 items-end ${
                              sseData &&
                              selectCurrentData.priceEnd -
                                sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore >
                                0
                                ? 'text-red-500'
                                : 'text-blue-500'
                            }`}>
                            (
                            {selectCurrentData.priceEnd -
                              sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore >
                            0
                              ? selectCurrentData.priceEnd -
                                sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore
                              : Math.abs(
                                  selectCurrentData.priceEnd -
                                    sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore
                                ).toLocaleString()}
                            )
                          </span>
                        )}
                        {sseData && sseData.stockChartResDto.length > 1 && (
                          <span
                            // 현재 주식 데이터가 여러개일 경우
                            className={`text-[1rem] flex pt-2 items-end ${
                              sseData &&
                              selectCurrentData.priceEnd -
                                sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd >
                                0
                                ? 'text-red-500'
                                : 'text-blue-500'
                            }`}>
                            (
                            {selectCurrentData.priceEnd -
                              sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd <
                            0
                              ? '-' +
                                Math.abs(
                                  selectCurrentData.priceEnd -
                                    sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd
                                ).toLocaleString()
                              : (
                                  selectCurrentData.priceEnd -
                                  sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd
                                ).toLocaleString()}
                            )
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 차트 */}
                  <div className="w-full h-[15rem] text-[0.6rem] bg-white font-semibold">
                    <Chart data={selectChartData} />
                  </div>
                </div>
                <div className="flex justify-between w-full mt-3">
                  {/* 유가 시세 */}
                  <div className="flex flex-col items-start w-[49%] text-[1.4rem] bg-white mr-[2%] px-5 font-semibold drop-shadow-lg rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 transition-all duration-300">
                    <div className="flex items-end justify-between w-full pt-2 pb-1">
                      <div>
                        <span>유가 시세</span>
                      </div>
                      {TagSetting(oilData)}
                    </div>
                    <div className="w-full h-[9rem] text-[0.7rem] font-medium">
                      <Chart data={oilData} />
                    </div>
                  </div>
                  {/* 금 시세 */}
                  <div className="flex flex-col items-start w-[49%] text-[1.4rem] bg-white px-5 font-semibold drop-shadow-lg rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 transition-all duration-300">
                    <div className="flex items-end justify-between w-full pt-2 pb-1">
                      <div>
                        <span>금 시세</span>
                      </div>
                      {TagSetting(goldData)}
                    </div>
                    <div className="w-full h-[9rem] text-[0.7rem] font-medium">
                      <Chart data={goldData} />
                    </div>
                  </div>
                </div>
              </div>
              {/* 모바일 */}
              <div className="flex flex-col justify-center px-2 w-[68%] lg:hidden">
                <div className="flex flex-col w-full px-5 transition-all duration-300 bg-white rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 shadow-md shadow-gray-300">
                  <div className="flex items-end justify-between w-full pt-2 font-bold">
                    <div className="flex items-end space-x-1">
                      <span className="text-[1rem]">나의 투자 현황</span>
                      <span className="text-[0.7rem] font-semibold">{clickNationalName}</span>
                    </div>
                    {sseData && sseData?.amount > 0 && (
                      <div className="flex items-end space-x-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-[0.7rem]">보유수량</span>
                          <span className="text-black">{sseData?.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className=" items-end text-[0.7rem]">평균단가</span>
                          <span className="text-black">{sseData?.average?.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* 데이터 */}
                  <div className="flex items-end justify-between w-full text-[#9B9B9B] font-bold pb-1 ">
                    <div
                      className={`flex items-end space-x-1 ${
                        selectRevenueData > 0 ? 'text-red-500' : 'text-blue-500'
                      }`}>
                      <span className={`text-[1rem]`}>{selectRevenueData.toLocaleString()}원</span>
                      <span className="text-[0.7rem]">({sseData?.rate.toFixed(2)}%)</span>
                    </div>
                    <div className="flex space-x-1 items-center text-[0.8rem] md:text-[1rem]">
                      {sseData && (
                        <>
                          <div className="flex items-center">
                            <span className=" items-end text-[0.7rem] pr-1">현재가</span>
                            <span className="text-black">{selectCurrentData.priceEnd.toLocaleString()}</span>
                            <span className="text-black text-[0.7rem]">원</span>
                          </div>
                          {/* 현재 주식 데이터가 한개일 경우 */}
                          {sseData && sseData.stockChartResDto.length === 1 && (
                            <span
                              className={`text-[0.6rem] pb-1 flex pt-2 items-end ${
                                sseData &&
                                selectCurrentData.priceEnd -
                                  sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore >
                                  0
                                  ? 'text-red-500'
                                  : 'text-blue-500'
                              }`}>
                              (
                              {selectCurrentData.priceEnd -
                                sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore >
                              0
                                ? selectCurrentData.priceEnd -
                                  sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore
                                : Math.abs(
                                    selectCurrentData.priceEnd -
                                      sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore
                                  ).toLocaleString()}
                              )
                            </span>
                          )}
                          {sseData && sseData.stockChartResDto.length >= 2 && (
                            <span
                              // 현재 주식 데이터가 여러개일 경우
                              className={`text-[0.6rem] pb-1 flex pt-2 items-end ${
                                sseData &&
                                selectCurrentData.priceEnd -
                                  sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd >
                                  0
                                  ? 'text-red-500'
                                  : 'text-blue-500'
                              }`}>
                              (
                              {selectCurrentData.priceEnd -
                                sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd <
                              0
                                ? '-' +
                                  Math.abs(
                                    selectCurrentData.priceEnd -
                                      sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd
                                  ).toLocaleString()
                                : (
                                    selectCurrentData.priceEnd -
                                    sseData?.stockChartResDto[sseData?.stockChartResDto.length - 2].priceEnd
                                  ).toLocaleString()}
                              )
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {/* 차트 */}
                  <div className="w-full h-[12rem] md:h-[12.7rem] flex justify-start text-[0.7rem] bg-white">
                    <Chart data={selectChartData} />
                  </div>
                </div>
              </div>
              {/* 오른쪽 주식 거래 및 차트 */}
              {/* 데스크탑 */}
              <div className="hidden flex-col w-[28%] space-y-3 justify-end items-start lg:flex">
                {/* 갱신 시간 */}
                <div className="flex flex-col w-full py-1 text-white bg-black rounded-lg">
                  <div className="flex justify-between w-full text-[1.2rem] px-[5%] font-semibold">
                    <div className="w-1/2 text-center">
                      <span className="text-[#FF5151]">종목 갱신</span>
                    </div>
                    <div className="w-1/2 text-center">
                      <span className="text-[#00A3FF]">날짜 갱신</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full text-[1.6rem] font-bold px-[5%]">
                    <div className="flex items-start justify-center w-1/2">
                      <CountdownTimer
                        setIsPossibleStockTime={setIsPossibleStockTime}
                        isPossibleStockTime={isPossibleStockTime}
                      />
                    </div>
                    <div className="flex items-start justify-center w-1/2">
                      <CountdownTimeMinute />
                    </div>
                  </div>
                  <div className="flex justify-between w-full text-[0.7rem] text-[#FFFFFF] px-[5%] font-semibold">
                    <div className="flex justify-center w-1/2 text-center space-x-9">
                      <span>시간&nbsp;</span>
                      <span>분&nbsp;</span>
                      <span>초&nbsp;</span>
                    </div>
                    <div className="flex justify-center w-1/2 text-center space-x-9">
                      <span>&ensp;분&nbsp;</span>
                      <span>초&nbsp;</span>
                    </div>
                  </div>
                </div>
                {/* 주식 거래 */}
                {isPossibleStockTime ? (
                  <div className="flex flex-col items-start justify-start w-full px-3 py-1 space-y-1 lg:space-y-2">
                    <div className="flex items-end justify-between w-full font-extrabold">
                      <span className="text-[1rem] lg:text-[1.5rem] ">주식 거래</span>
                      <span className={` text-[0.8rem]`}>금액: {afterMoney}원</span>
                    </div>
                    <div className="hidden lg:flex justify-end items-center w-full bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pr-3">
                      <input
                        ref={inputRef}
                        aria-label="입력"
                        className=" py-2 pr-1 text-end w-full bg-[#FFF2F0] outline-none "
                        type="text"
                        placeholder="0"
                        maxLength={6}
                        onChange={change}
                      />
                      <span>개</span>
                    </div>
                    <div className="flex items-center w-full text-center justify-evenly text-[0.6rem] lg:text-[1rem] text-[#464646]">
                      <div
                        aria-label="1개"
                        className="w-1/4 duration-200 border-r-2 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+1개</span>
                      </div>
                      <div
                        aria-label="10개"
                        className="w-1/4 duration-200 border-r-2 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+10개</span>
                      </div>
                      <div
                        aria-label="100개"
                        className="w-1/4 duration-200 border-r-2 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+100개</span>
                      </div>
                      <div
                        aria-label="1000개"
                        className="w-1/4 duration-200 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+1000개</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full text-center text-[1rem] lg:text-[1.5rem] text-white font-semibold pt-1">
                      <div
                        aria-label="매도"
                        className={`w-[45%] py-1 bg-[#2C94EA] shadow-md rounded-xl shadow-gray-400${
                          sseData && sseData.amount > 0
                            ? 'cursor-pointer hover:bg-[#1860ef] hover:scale-105 transition-all duration-300 '
                            : 'disabled cursor-not-allowed'
                        }`}
                        onClick={click}>
                        <span>매도</span>
                      </div>
                      <div
                        aria-label="매수"
                        className={`w-[45%] py-1 bg-[#EA455D] shadow-md rounded-xl shadow-gray-400${
                          parseInt(afterMoney.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                            ? 'cursor-pointer hover:bg-[#f90025fd] hover:scale-105 transition-all duration-300 '
                            : 'disabled cursor-not-allowed'
                        }`}
                        onClick={click}>
                        <span>매수</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[11.35rem] w-full flxe justify-center items-center bg-white rounded-lg">
                    <div className="flex flex-col items-center justify-center w-full h-full font-semibold">
                      <span className="text-[1.3rem] space-x-1">
                        <span className="text-blue-500">매도</span>&nbsp;/<span className="text-red-500">매수</span>{' '}
                        가능 시간
                      </span>
                      <span className="text-[1.7rem]">AM 10:00 ~ PM 10:00</span>
                    </div>
                  </div>
                )}

                {/* 국제시장환율 */}
                <div className="flex flex-col items-start w-full text-[1.4rem] bg-white mr-[2%] px-5 font-semibold drop-shadow-lg rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 transition-all duration-300">
                  <div className="flex flex-col items-end justify-between w-full py-2">
                    <div className="flex justify-between w-full">
                      <span>국제시장 환율</span>

                      {clickNational === 0 && (
                        <div className="flex items-center justify-between space-x-1">
                          <span className="text-[1rem]">미국</span>
                          {TagSetting(usdData)}
                        </div>
                      )}
                      {clickNational === 1 && (
                        <div className="flex items-center justify-between space-x-1">
                          <span className="text-[1rem]">일본</span>
                          {TagSetting(jypData)}
                        </div>
                      )}
                      {clickNational === 2 && (
                        <div className="flex items-center justify-between space-x-1">
                          <span className="text-[1rem]">유럽연합</span>
                          {TagSetting(euroData)}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-evenly w-full text-center border-2 rounded-md bg-[#EDEDED] text-[1.1rem] space-x-1 mt-1">
                      <div
                        aria-label="미국"
                        className={`w-1/3 transition-all duration-300 rounded-md border-2 ${
                          clickNational === 0 ? 'bg-white scale-105' : 'bg-[#EDEDED] scale-100'
                        } hover:bg-white hover:scale-105 cursor-pointer border-[#EDEDED] hover:border-[#EDEDED]`}
                        onClick={click}>
                        <span>미국</span>
                      </div>
                      <div
                        aria-label="일본"
                        className={`w-1/3 transition-all duration-300 rounded-md border-2 ${
                          clickNational === 1 ? 'bg-white scale-105' : 'bg-[#EDEDED] scale-100'
                        } hover:bg-white hover:scale-105 cursor-pointer border-[#EDEDED] hover:border-[#EDEDED]`}
                        onClick={click}>
                        <span>일본</span>
                      </div>
                      <div
                        aria-label="유럽연합"
                        className={`w-1/3 transition-all duration-300 rounded-md border-2 ${
                          clickNational === 2 ? 'bg-white scale-105' : 'bg-[#EDEDED] scale-100'
                        } hover:bg-white hover:scale-105 cursor-pointer border-[#EDEDED] hover:border-[#EDEDED]`}
                        onClick={click}>
                        <span>유럽연합</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[9rem] text-[0.75rem] font-medium">
                    {clickNational === 0 && <Chart data={usdData} />}
                    {clickNational === 1 && <Chart data={jypData} />}
                    {clickNational === 2 && <Chart data={euroData} />}
                  </div>
                </div>
              </div>
              {/* 모바일 */}
              <div className="flex flex-col w-[32%] space-y-3 justify-end items-start lg:hidden">
                {/* 회사 정보, 뉴스, 정보 */}
                <div className="flex items-center w-full font-bold text-center bg-white border-2 rounded-md justify-evenly">
                  <div
                    aria-label="기업활동"
                    className="w-[40%] border-r-2 text-[0.9rem] md:text-[1rem] transition-all duration-300 hover:scale-105 active:bg-[#EA455D] active:text-white hover:bg-[#EA455D] cursor-pointer hover:text-white hover:rounded-md"
                    onClick={click}>
                    <span>기업활동</span>
                  </div>
                  <div
                    aria-label="신문"
                    className="w-[30%] border-r-2 text-[0.9rem] md:text-[1rem] transition-all duration-300 hover:scale-105 active:bg-[#EA455D] active:text-white hover:bg-[#EA455D] cursor-pointer hover:text-white hover:rounded-md"
                    onClick={click}>
                    <span>신문</span>
                  </div>
                  <div
                    aria-label="정보"
                    className="w-[30%] text-[0.9rem] md:text-[1rem] transition-all duration-300 hover:scale-105 active:bg-[#EA455D] active:text-white hover:bg-[#EA455D] cursor-pointer hover:text-white hover:rounded-md"
                    onClick={click}>
                    <span>정보</span>
                  </div>
                </div>
                {/* 종목 갱신, 날짜 갱신 */}
                <div className="flex flex-col w-full py-1 text-white bg-black rounded-lg">
                  <div className="flex justify-between w-full text-[0.85rem] px-[5%] font-semibold">
                    <div className="w-1/2 text-center">
                      <span className="text-[#FF5151]">종목 갱신</span>
                    </div>
                    <div className="w-1/2 text-center">
                      <span className="text-[#00A3FF]">날짜 갱신</span>
                    </div>
                  </div>
                  <div className={`flex justify-between w-full font-bold px-[5%] text-[1rem]`}>
                    <div className="flex items-start justify-center w-1/2">
                      <CountdownTimer
                        setIsPossibleStockTime={setIsPossibleStockTime}
                        isPossibleStockTime={isPossibleStockTime}
                      />
                    </div>
                    <div className="flex items-start justify-center w-1/2">
                      <CountdownTimeMinute />
                    </div>
                  </div>
                  <div className="flex justify-between w-full text-[0.6rem] text-[#FFFFFF] px-[5%] font-semibold">
                    <div className="flex justify-center w-1/2 space-x-4 text-center">
                      <span>시간</span>
                      <span>&nbsp;분&ensp;</span>
                      <span>초&ensp;</span>
                    </div>
                    <div className="flex justify-center w-1/2 space-x-4 text-center">
                      <span>&ensp;분&ensp;</span>
                      <span>초&nbsp;</span>
                    </div>
                  </div>
                </div>
                {/* 주식 거래 */}
                {/* <div className="w-full bg-white rounded-lg">{stockTrade}</div> */}
                {isPossibleStockTime ? (
                  <div className="flex flex-col items-start justify-start w-full px-3 py-1 space-y-1 lg:space-y-2">
                    <div className="flex items-end justify-between w-full font-extrabold">
                      <span className="text-[1rem] lg:text-[1.5rem] ">주식 거래</span>
                      <span className={` text-[0.7rem] `}>금액: {afterMoney}원</span>
                    </div>
                    <div className="flex lg:hidden justify-end items-center w-full bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pr-3">
                      <input
                        ref={inputRef2}
                        aria-label="입력모바일"
                        className=" py-2 pr-1 text-end w-full bg-[#FFF2F0] outline-none "
                        type="text"
                        placeholder="0"
                        maxLength={6}
                        onChange={change}
                      />
                      <span>개</span>
                    </div>
                    <div className="flex items-center w-full text-center justify-evenly text-[0.6rem] lg:text-[1rem] text-[#464646]">
                      <div
                        aria-label="1개M"
                        className="w-1/4 duration-200 border-r-2 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+1개</span>
                      </div>
                      <div
                        aria-label="10개M"
                        className="w-1/4 duration-200 border-r-2 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+10개</span>
                      </div>
                      <div
                        aria-label="100개M"
                        className="w-1/4 duration-200 border-r-2 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+100개</span>
                      </div>
                      <div
                        aria-label="1000개M"
                        className="w-1/4 duration-200 hover:rounded-md hover:transition hover:scale-105 hover:font-bold hover:bg-[#EA455D] hover:text-white cursor-pointer"
                        onClick={click}>
                        <span>+1000개</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full text-center text-[1rem] lg:text-[1.5rem] text-white font-semibold pt-1">
                      <div
                        aria-label="매도2"
                        className={`w-[45%] py-1 bg-[#2C94EA] shadow-md rounded-xl shadow-gray-400${
                          sseData && sseData?.amount > 0
                            ? 'cursor-pointer hover:bg-[#1860ef] hover:scale-105 transition-all duration-300 '
                            : 'disabled cursor-not-allowed'
                        }`}
                        onClick={click}>
                        <span>매도</span>
                      </div>
                      <div
                        aria-label="매수2"
                        className={`w-[45%] py-1 bg-[#EA455D] shadow-md rounded-xl shadow-gray-400${
                          parseInt(afterMoney.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                            ? 'cursor-pointer hover:bg-[#f90025fd] hover:scale-105 transition-all duration-300 '
                            : 'disabled cursor-not-allowed'
                        }`}
                        onClick={click}>
                        <span>매수</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[8.7rem] md:h-[9.2rem] w-full flxe justify-center items-center bg-white rounded-lg">
                    <div className="flex flex-col items-center justify-center w-full h-full font-semibold">
                      <span className="text-[1rem] md:text-[1.1rem] space-x-1">
                        <span className="text-blue-500">매도</span>&nbsp;/<span className="text-red-500">매수</span>{' '}
                        가능 시간
                      </span>
                      <span className="text-[1.1rem] md:text-[1.3rem]">AM 10:00 ~ PM 10:00</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Exchange;
