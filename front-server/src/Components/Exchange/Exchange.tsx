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
  const stockRef1 = useRef<HTMLInputElement>(null);
  const stockRef2 = useRef<HTMLInputElement>(null);
  const [lazyGetStock, { isLoading: isLoading1, isError: isError1 }] = useLazyGetStockQuery();
  const [getStockSelect, { isLoading: isLoading2, isError: isError2 }] = useLazyGetStockSelectQuery();
  const [postStock, { isLoading: isLoading4, isError: isError4 }] = usePostStockMutation();
  const [deleteStock, { isLoading: isLoading5, isError: isError5 }] = useDeleteStockMutation();
  const currentMoney = useAppSelector((state) => {
    return state.currentMoneyStatus;
  });
  const [isPossibleStockTime, setIsPossibleStockTime] = useState<boolean>(false);
  const [isNewsClick, setIsNewsClick] = useState<boolean>(false);
  const [isMobileInfo, setIsMobileInfo] = useState<boolean>(false);
  const [isIRClick, setIsIRClick] = useState<boolean>(false);
  const [stockTrade, setStockTrade] = useState<any>();
  const [afterMoney, setAfterMoney] = useState<string>('0');
  const [afterMoney2, setAfterMoney2] = useState<string>('0');
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
    setAfterMoney('0');
    setAfterMoney2('0');

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
      // heartbeatTimeout: 8700,
      withCredentials: true
    });

    newEventSource.addEventListener('connect', (e: any) => {
      // console.log(e);
    });
    setEventSource(newEventSource);

    return () => {
      // console.log('연결끊기');
      eventSource?.close();
      newEventSource?.close();
      setEventSource(undefined);
    };
  }, []);

  // SSE 4분주기로 받기
  useEffect(() => {
    // 스케쥴러 4분마다 실행
    const job = schedule.scheduleJob('*/1 10-22 * * *', () => {
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
        // heartbeatTimeout: 8700,
        withCredentials: true
      });

      newEventSource.addEventListener('connect', (e: any) => {
        // console.log(e);
      });
      setEventSource(newEventSource);
      console.log('4분마다 실행');
    });
    return () => {
      // console.log('연결끊기');
      eventSource?.close();
      setEventSource(undefined);
    };
  }, []);

  const clickButtonEvent = (number: number) => {
    if (stockRef1.current && stockRef2.current) {
      if (stockRef1.current.value !== '') {
        stockRef1.current.value = (parseInt(stockRef1.current.value.replaceAll(',', '')) + number).toLocaleString();
        stockRef2.current.value = (parseInt(stockRef2.current.value.replaceAll(',', '')) + number).toLocaleString();
        let money = '';
        currentMoney.split(',').map((liMoney: string) => (money += liMoney));
        const checkMoney: number =
          selectCurrentData.priceEnd * (parseInt(stockRef1.current.value.replaceAll(',', '')) + number);
        const checkMoney2: number =
          selectCurrentData.priceEnd * (parseInt(stockRef2.current.value.replaceAll(',', '')) + number);
        setAfterMoney(checkMoney.toLocaleString());
        setAfterMoney2(checkMoney2.toLocaleString());
      } else {
        stockRef1.current.value = `${number}`;
        stockRef2.current.value = `${number}`;
        let money = '';
        currentMoney.split(',').map((liMoney: string) => (money += liMoney));
        const checkMoney: number =
          selectCurrentData.priceEnd * (parseInt(stockRef1.current.value.replaceAll(',', '')) + number);
        const checkMoney2: number =
          selectCurrentData.priceEnd * (parseInt(stockRef2.current.value.replaceAll(',', '')) + number);
        setAfterMoney(checkMoney.toLocaleString());
        setAfterMoney2(checkMoney2.toLocaleString());
      }
    }
  };

  const [isPostStock, setIsPostStock] = useState<boolean>(false);
  const [isDeleteStock, setIsDeleteStock] = useState<boolean>(false);
  const [tradeStockModalData, setTradeStockModalData] = useState<TradeStockModalType>();

  // 클릭 이벤트
  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '1개':
        clickButtonEvent(1);
        break;
      case '10개':
        clickButtonEvent(10);
        break;
      case '100개':
        clickButtonEvent(100);
        break;
      case '1000개':
        clickButtonEvent(1000);
        break;
      case '신문':
        setIsNewsClick((pre) => !pre);
        break;
      case '정보':
        setIsMobileInfo((pre) => !pre);
        break;
      case '기업활동':
        setIsIRClick((pre) => !pre);
        break;
      case '미국':
        setClickNational(0);
        break;
      case '일본':
        setClickNational(1);
        break;
      case '유럽연합':
        setClickNational(2);
        break;
      case '매수1':
        if (stockRef1.current) {
          console.log('316');
          const body = {
            stockAmount: parseInt(stockRef1.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const posrStock = async () => {
            const { data, result } = await postStock(body).unwrap();
            if (stockRef1.current) {
              if (result === 'SUCCESS') {
                setTradeStockModalData(data);
                setIsPostStock(true);
                toast.success('구매 완료하였습니다!');
              } else {
                toast.error('요청에 문제가 생겼습니다!');
              }
              stockRef1.current.value = '0';
            } else {
            }
          };
          posrStock();
        }
        break;
      case '매수2':
        if (stockRef2.current) {
          const body = {
            stockAmount: parseInt(stockRef2.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const posrStock = async () => {
            const { data, result } = await postStock(body).unwrap();
            if (stockRef2.current) {
              if (result === 'SUCCESS') {
                setTradeStockModalData(data);
                setIsPostStock(true);
                toast.success('구매 완료하였습니다!');
              } else {
                toast.error('요청에 문제가 생겼습니다!');
              }
              stockRef2.current.value = '0';
            }
          };
          posrStock();
        }
        break;
      case '매도1':
        if (stockRef1.current) {
          const body = {
            stockAmount: parseInt(stockRef1.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const stockDelete = async () => {
            const { data, result } = await deleteStock(body).unwrap();
            if (stockRef1.current) {
              if (result === 'SUCCESS') {
                setTradeStockModalData(data);
                setIsDeleteStock(true);
                toast.success('판매 완료하였습니다!');
              } else {
                toast.error('요청에 문제가 생겼습니다!');
              }
              stockRef1.current.value = '0';
            }
          };
          stockDelete();
        }
        break;
      case '매도2':
        if (stockRef2.current) {
          const body = {
            stockAmount: parseInt(stockRef2.current.value.replaceAll(',', '')),
            stockId: sseData?.stockId
          };
          const stockDelete = async () => {
            const { data, result } = await deleteStock(body).unwrap();
            if (stockRef2.current) {
              if (result === 'SUCCESS') {
                setTradeStockModalData(data);
                setIsDeleteStock(true);
                toast.success('판매 완료하였습니다!');
              } else {
                toast.error('요청에 문제가 생겼습니다!');
              }
              stockRef2.current.value = '0';
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
        if (target.value !== '' && stockRef1.current && stockRef2.current) {
          await isValidInput(stockRef1.current.value).then((r) => {
            // 숫자가 들어왔을때
            if (r === true && stockRef1.current && stockRef2.current) {
              const intValue = parseInt(stockRef1.current.value.replaceAll(',', ''));
              const intValue2 = parseInt(stockRef2.current.value.replaceAll(',', ''));
              const checkMoney: number = selectCurrentData.priceEnd * intValue;
              const checkMoney2: number = selectCurrentData.priceEnd * intValue2;
              const inputMoney: string = checkMoney.toLocaleString();
              const inputMoney2: string = checkMoney2.toLocaleString();
              if (target.value !== '') {
                setAfterMoney(inputMoney);
                setAfterMoney2(inputMoney2);
              }
              stockRef1.current.value = intValue.toLocaleString();
              stockRef2.current.value = intValue2.toLocaleString();
            }
            // 문자가 들어왔을때
            else if (r === false && stockRef1.current && stockRef2.current) {
              const intValue = parseInt(stockRef1.current.value.slice(0, -1).replaceAll(',', ''));
              const intValue2 = parseInt(stockRef2.current.value.slice(0, -1).replaceAll(',', ''));
              if (stockRef1.current.value.length > 1) {
                stockRef1.current.value = intValue.toLocaleString();
              } else if (stockRef1.current.value.length > 2) {
                stockRef2.current.value = intValue2.toLocaleString();
              } else {
                stockRef1.current.value = '0';
                stockRef2.current.value = '0';
              }
            }
          });
        } else {
          setAfterMoney(currentMoney);
          setAfterMoney2(currentMoney);
        }
    }
  };

  // 차트 데이터
  useEffect(() => {
    const firstLogin = async () => {
      const { data, result } = await lazyGetStock('').unwrap();
      setLazyGetStockData(data);
      await selectStockData(data.stockList[0].stockId);
      // console.log('data.stockList[0].kind: ', typeof data.stockList[0].kind);
      const firstDataName = data.stockList[0].kind;
      SetSelectIRData(irData[firstDataName]);
    };
    firstLogin();
  }, []);

  // 차트 데이터 변경될때마다 실행
  useEffect(() => {
    if (sseData) {
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

  if (eventSource) {
    eventSource.onmessage = (event: any) => {
      console.log(JSON.parse(event.data));

      setSseData(JSON.parse(event.data));
    };
  }

  const clickStock = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('innerHTML: ', e.currentTarget.innerHTML);

    setClickNationalName(e.currentTarget.innerHTML);

    if (e.currentTarget.ariaLabel !== null) {
      // console.log(e.currentTarget.ariaLabel);

      await selectStockData(parseInt(e.currentTarget.ariaLabel));
      setListening(false);
      // console.log('eventSource: ', eventSource);
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

  // 거래 가능한 시간에 따른 다른 컴포넌트 보이기
  useEffect(() => {
    if (isPossibleStockTime) {
      setStockTrade(
        <>
          <div className="flex flex-col items-start justify-start w-full px-3 py-1 space-y-2">
            <div className="flex items-center justify-between w-full">
              <span className="text-[1.5rem] font-extrabold">주식 거래</span>
              <span
                className={`${
                  parseInt(afterMoney.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                    ? 'text-black'
                    : 'text-red-500'
                }`}>
                {parseInt(afterMoney.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                  ? `구매 금액: ${afterMoney}원`
                  : `한도 초과: ${afterMoney}원`}
              </span>
            </div>
            <div className="flex justify-end items-center w-full bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pr-3">
              <input
                ref={stockRef1}
                aria-label="입력"
                className=" py-2 pr-1 text-end w-full bg-[#FFF2F0] outline-none "
                type="text"
                placeholder="0"
                onChange={change}
              />
              <span>개</span>
            </div>
            <div className="flex items-center w-full text-center justify-evenly text-[#464646]">
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
            <div className="flex items-center justify-between w-full text-center text-[1.5rem] text-white font-semibold pt-1">
              <div
                aria-label="매도1"
                className={`w-[45%] py-1 bg-[#2C94EA] shadow-md rounded-xl shadow-gray-400${
                  parseInt(afterMoney.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                    ? 'cursor-pointer hover:bg-[#1860ef] hover:scale-105 transition-all duration-300 '
                    : 'cursor-not-allowed'
                }`}
                onClick={click}>
                <span>매도</span>
              </div>
              <div
                aria-label="매수1"
                className={`w-[45%] py-1 bg-[#EA455D] shadow-md rounded-xl shadow-gray-400${
                  parseInt(afterMoney.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                    ? 'cursor-pointer hover:bg-[#f90025fd] hover:scale-105 transition-all duration-300 '
                    : 'cursor-not-allowed'
                }`}
                onClick={click}>
                <span>매수</span>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      setStockTrade(
        <>
          <div className="h-[11.35rem] w-full flxe justify-center items-center">
            <div className="flex flex-col items-center justify-center w-full h-full font-semibold">
              <span className="text-[1.3rem] space-x-1">
                <span className="text-blue-500">매도</span>&nbsp;/<span className="text-red-500">매수</span> 가능 시간
              </span>
              <span className="text-[1.7rem]">AM 10:00 ~ PM 10:00</span>
            </div>
          </div>
        </>
      );
    }
  }, [isPossibleStockTime]);

  return (
    <>
      {isPostStock && (
        <StockTradeModal
          tradeStockModalData={tradeStockModalData}
          isPostStock={isPostStock}
          setIsPostStock={setIsPostStock}
        />
      )}
      {isLoading1 && isLoading2 ? (
        <div>로딩</div>
      ) : (
        <>
          {isIRClick && (
            <IRModal
              isIRClick={isIRClick}
              setIsIRClick={setIsIRClick}
              selectIRData={selectIRData}
              date={selectCurrentData.date.split('-')}
            />
          )}
          {isNewsClick && <NewsModal isNewsClick={isNewsClick} setIsNewsClick={setIsNewsClick} />}
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
                    src="/images/icons/news.png"
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
                      <span className={`text-[1.5rem]`}>{selectRevenueData.toLocaleString()}원</span>
                      <span className="text-[1rem]">({sseData?.rate.toFixed(2)}%)</span>
                    </div>
                    <div className="flex space-x-3 items-end  text-[1.5rem]">
                      {sseData && sseData?.amount > 0 && (
                        <>
                          <div className="flex items-center space-x-1">
                            <span className="text-[1rem]">보유수량</span>
                            <span className="text-black">{sseData?.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className=" items-end text-[1rem]">평균단가</span>
                            <span className="text-black">{sseData?.average?.toLocaleString()}</span>
                          </div>
                        </>
                      )}

                      <div className="flex items-center space-x-1">
                        <span className="text-[1rem]">현재가</span>
                        <span className={`text-black`}>{selectCurrentData.priceEnd.toLocaleString()}</span>
                        <span className="text-black">원</span>
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
                          {sseData &&
                            (
                              selectCurrentData.priceEnd -
                              sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore
                            ).toLocaleString()}
                          )
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 차트 */}
                  <div className="w-full h-[15rem] text-[0.6rem] bg-white">
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
                    <div className="w-full h-[9rem] text-[0.7rem] font-normal">
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
                    <div className="w-full h-[9rem] text-[0.7rem] font-normal">
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
                      <div className="flex items-end space-x-1">
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
                      {sseData && sseData?.amount > 0 && (
                        <>
                          <div className="flex items-center">
                            <span className=" items-end text-[0.7rem] pr-1">현재가</span>
                            <span className="text-black">{selectCurrentData.priceEnd.toLocaleString()}</span>
                            <span className="text-black text-[0.7rem]">원</span>
                          </div>
                          <span
                            className={`text-[0.6rem] flex  items-end  ${
                              sseData &&
                              selectCurrentData.priceEnd -
                                sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore >
                                0
                                ? 'text-red-500'
                                : 'text-blue-500'
                            }`}>
                            (
                            {sseData &&
                              (
                                selectCurrentData.priceEnd -
                                sseData?.stockChartResDto[sseData?.stockChartResDto.length - 1].priceBefore
                              ).toLocaleString()}
                            )
                          </span>
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
                    <div className="flex w-1/2 justify-center text-center space-x-9">
                      <span>시간&nbsp;</span>
                      <span>분&nbsp;</span>
                      <span>초&nbsp;</span>
                    </div>
                    <div className="flex w-1/2 justify-center text-center space-x-9">
                      <span>&ensp;분&nbsp;</span>
                      <span>초&nbsp;</span>
                    </div>
                  </div>
                </div>
                {/* 주식 거래 */}
                <div className="w-full bg-white rounded-lg">{stockTrade}</div>
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
                  <div className="w-full h-[9rem] text-[0.75rem] font-normal">
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
                    <div className="w-[50%] text-center">
                      <span className="text-[#FF5151]">종목 갱신</span>
                    </div>
                    <div className="w-[45%] text-center">
                      <span className="text-[#00A3FF]">날짜 갱신</span>
                    </div>
                  </div>
                  <div>
                    <CountdownTimer
                      setIsPossibleStockTime={setIsPossibleStockTime}
                      isPossibleStockTime={isPossibleStockTime}
                    />
                  </div>
                </div>
                {/* 주식 거래 */}
                <div className="w-full bg-white rounded-lg">
                  {isPossibleStockTime ? (
                    <div className="flex flex-col items-start justify-start w-full px-1 py-1 space-y-1">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[1.2rem] font-extrabold">주식 거래</span>
                        <span
                          className={`text-[0.6rem] ${
                            parseInt(afterMoney2.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                              ? 'text-black'
                              : 'text-red-500'
                          }`}>
                          {parseInt(afterMoney2.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                            ? `구매 금액: ${afterMoney2}원`
                            : `한도 초과: ${afterMoney2}원`}
                        </span>
                      </div>
                      <div className="flex justify-end items-center w-full bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pr-3">
                        <input
                          ref={stockRef2}
                          aria-label="입력"
                          className="py-2 pr-1 text-end w-full bg-[#FFF2F0] outline-none "
                          type="text"
                          placeholder="0"
                          onChange={change}
                        />
                        <span>개</span>
                      </div>
                      <div className="flex items-center w-full text-center justify-evenly text-[0.761rem] md:text-[0.935rem] pt-1 text-[#464646]">
                        <div
                          aria-label="1개"
                          className="w-[21%] pr-1 hover:transition duration-300 border-r-2 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md"
                          onClick={click}>
                          <span>+1개</span>
                        </div>
                        <div
                          aria-label="10개"
                          className="w-[21%] pr-1 hover:transition duration-300 border-r-2 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md"
                          onClick={click}>
                          <span>+10개</span>
                        </div>
                        <div
                          aria-label="100개"
                          className="w-[24%] pr-1 hover:transition duration-300 border-r-2 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md"
                          onClick={click}>
                          <span>+100개</span>
                        </div>
                        <div
                          aria-label="1000개"
                          className="w-[35%%] hover:transition duration-300 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md"
                          onClick={click}>
                          <span>+1000개</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full text-center text-[1rem] md:text-[1.3rem] text-white font-semibold">
                        <div
                          aria-label="매도2"
                          className={`w-[45%] py-[1px] bg-[#2C94EA] shadow-md rounded-xl shadow-gray-400 ${
                            parseInt(afterMoney2.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                              ? 'cursor-pointer hover:bg-[#1860ef] hover:scale-105 transition-all duration-300 '
                              : 'cursor-not-allowed'
                          }`}
                          onClick={click}>
                          <span>매도</span>
                        </div>
                        <div
                          aria-label="매수2"
                          className={`w-[45%] py-[1px] bg-[#EA455D] shadow-md rounded-xl shadow-gray-400 ${
                            parseInt(afterMoney2.replaceAll(',', '')) <= parseInt(currentMoney.replaceAll(',', ''))
                              ? 'cursor-pointer hover:bg-[#f90025fd] hover:scale-105 transition-all duration-300 '
                              : 'cursor-not-allowed'
                          }`}
                          onClick={click}>
                          <span>매수</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[8.7rem] w-full flxe justify-center items-center">
                      <div className="flex flex-col items-center justify-center w-full h-full pb-5 font-semibold">
                        <span className="text-[1rem] space-x-1">
                          <span className="text-blue-500">매도</span>&nbsp;/<span className="text-red-500">매수</span>{' '}
                          가능 시간
                        </span>
                        <span className="text-[1.2rem]">AM 10:00 ~ PM 10:00</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Exchange;
