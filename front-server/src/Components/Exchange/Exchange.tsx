import React, { ChangeEvent, PureComponent, useEffect, useRef, useState } from 'react';
import MobileInfo from './MobileInfo';
import NewsModal from './NewsModal';
import styled from './Exchange.module.css';
import { useGetStockQuery, useGetStockSelectQuery, useLazyGetStockQuery, useLazyGetStockSelectQuery } from 'Store/api';
import schedule from 'node-schedule';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import Chart from './Chart';

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

function Exchange(): JSX.Element {
  const irData = require('./ir_data.json');
  const [tradingVolume, setTradingVolume] = useState<number>(0);
  const [isNewsClick, setIsNewsClick] = useState<boolean>(false);
  const [isMobileInfo, setIsMobileInfo] = useState<boolean>(false);
  const [isIRClick, setIsIRClick] = useState<boolean>(false);
  const nowDate = new Date();
  const [lazyGetStock, { isLoading: isLoading1, isError: isError1 }] = useLazyGetStockQuery();
  const [getStockSelect, { isLoading: isLoading2, isError: isError2 }] = useLazyGetStockSelectQuery();
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

  // 클릭 이벤트
  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '1개':
        setTradingVolume((pre: number) => pre + 1);
        break;
      case '10개':
        setTradingVolume((pre: number) => pre + 10);
        break;
      case '100개':
        setTradingVolume((pre: number) => pre + 100);
        break;
      case '1000개':
        setTradingVolume((pre: number) => pre + 1000);
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

  // 스케줄러
  // const job = schedule.scheduleJob('*/1 * 10-22 * * *', () => {
  //   setTimeout(() => {
  //     const currentDate = nowDate.toLocaleString('ko-kr')
  //     console.log(nowDate.getTime());
  //   }, 1000);
  //   job.cancel(true);
  // });

  const selectStockData = (stockId: number) => {
    getStockSelect(stockId);
  };

  if (eventSource) {
    eventSource.onmessage = (event: any) => {
      // console.log(JSON.parse(event.data));
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
        <span>{e[e.length - 1].종가.toLocaleString()}</span>
        <span>원</span>
        <span
          className={`text-[1rem] ${
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
                      {/* <div className="flex items-center space-x-1">
                        <span className="text-[0.7rem]">현재가</span>
                        <span className="text-[#006EC9]">65,800</span>
                      </div> */}
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
                <div className="flex flex-col w-full pb-1 text-white bg-black rounded-lg">
                  <div className="flex justify-between w-full text-[1.2rem] px-[5%] font-semibold">
                    <div className="w-[55%] text-center">
                      <span className="text-[#FF5151]">종목 갱신</span>
                    </div>
                    <div className="w-2/5 text-center">
                      <span className="text-[#00A3FF]">날짜 갱신</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full text-[1.6rem] font-bold  px-[5%]">
                    <div className="flex items-start justify-center w-[55%]">
                      <div className="flex flex-col items-center">
                        <span>24 :</span>
                        <span className="text-[0.8rem] font-medium">시간&ensp;</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>27 :</span>
                        <span className="text-[0.8rem] font-medium">분&ensp;</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>54</span>
                        <span className="text-[0.8rem] font-medium">초</span>
                      </div>
                    </div>
                    <div className="flex items-start justify-center w-2/5">
                      <div className="flex flex-col items-center">
                        <span>02 :</span>
                        <span className="text-[0.8rem] font-medium">분&ensp;</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>17</span>
                        <span className="text-[0.8rem] font-medium">초</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 주식 거래 */}
                <div className="w-full bg-white rounded-lg">
                  <div className="flex flex-col items-start justify-start w-full px-3 py-1 space-y-2">
                    <div className="w-full">
                      <span className="text-[1.5rem] font-extrabold">주식 거래</span>
                    </div>
                    <div className="w-full">
                      <input
                        className="bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pr-3 py-2 text-end w-full outline-[#e2a2a7] placeholder:text-[0.8rem]"
                        type="text"
                        placeholder={tradingVolume === 0 ? '거래량을 입력하세요.' : ''}
                        value={tradingVolume === 0 ? '' : `${tradingVolume}개`}
                      />
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
                      <div className="w-[45%] py-1 cursor-pointer hover:bg-[#1860ef] bg-[#2C94EA] shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
                        <span>매도</span>
                      </div>
                      <div className="w-[45%] py-1 cursor-pointer hover:bg-[#f90025fd] bg-[#EA455D] shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
                        <span>매수</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 국제시장환율 */}
                <div className="flex flex-col items-start w-full text-[1.4rem] bg-white mr-[2%] px-5 font-semibold drop-shadow-lg rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 transition-all duration-300">
                  <div className="flex flex-col items-end justify-between w-full py-2">
                    <div className="flex justify-between w-full">
                      <span>국제시장 환율</span>

                      {clickNational === 0 && (
                        <div className="flex items-center justify-between space-x-2">
                          <span className="text-[1.2rem]">미국</span>
                          {TagSetting(usdData)}
                        </div>
                      )}
                      {clickNational === 1 && (
                        <div className="flex items-center justify-between space-x-2">
                          <span className="text-[1.2rem]">일본</span>
                          {TagSetting(jypData)}
                        </div>
                      )}
                      {clickNational === 2 && (
                        <div className="flex items-center justify-between space-x-2">
                          <span className="text-[1.2rem]">유럽연합</span>
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
                  <div className="flex justify-between w-full text-[1rem] font-bold px-[5%]">
                    <div className="flex items-start justify-center w-[50%]">
                      <div className="flex flex-col items-center">
                        <span>24 :</span>
                        <span className="text-[0.6rem] font-medium">시간&ensp;</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>27 :</span>
                        <span className="text-[0.6rem] font-medium">분&ensp;</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>54</span>
                        <span className="text-[0.6rem] font-medium">초</span>
                      </div>
                    </div>
                    <div className="flex items-start justify-center w-[45%]">
                      <div className="flex flex-col items-center">
                        <span>02 :</span>
                        <span className="text-[0.6rem] font-medium">분&ensp;</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>17</span>
                        <span className="text-[0.6rem] font-medium">초</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 주식 거래 */}
                <div className="w-full bg-white rounded-lg">
                  <div className="flex flex-col items-start justify-start w-full px-1 py-1 space-y-1">
                    <div className="w-full">
                      <span className="text-[1.2rem] font-extrabold">주식 거래</span>
                    </div>
                    <div className="w-full">
                      <input
                        className="bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pr-2 py-1 w-full outline-[#e2a2a7] text-end placeholder:text-[0.8rem]"
                        type="text"
                        placeholder={tradingVolume === 0 ? '거래량을 입력하세요.' : ''}
                        value={tradingVolume === 0 ? '' : `${tradingVolume}개`}
                      />
                    </div>
                    <div className="flex items-center w-full text-center justify-evenly text-[0.761rem] md:text-[0.935rem] pt-2 text-[#464646]">
                      <div className="w-[21%] pr-1 hover:transition duration-300 border-r-2 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md">
                        <span aria-label="1개" onClick={click}>
                          +1개
                        </span>
                      </div>
                      <div className="w-[21%] pr-1 hover:transition duration-300 border-r-2 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md">
                        <span aria-label="10개" onClick={click}>
                          +10개
                        </span>
                      </div>
                      <div className="w-[24%] pr-1 hover:transition duration-300 border-r-2 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md">
                        <span aria-label="100개" onClick={click}>
                          +100개
                        </span>
                      </div>
                      <div className="w-[35%%] hover:transition duration-300 hover:scale-105 active:bg-[#EA455D] active:text-white hover:rounded-md">
                        <span aria-label="1000개" onClick={click}>
                          +1000개
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full text-center text-[1.1rem] md:text-[1.3rem] text-white font-semibold pt-2">
                      <div className="w-[45%] py-1 active:bg-[#1860ef] bg-[#2C94EA] cursor-pointer shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
                        <span>매도</span>
                      </div>
                      <div className="w-[45%] py-1 active:bg-[#f90025fd] bg-[#EA455D] cursor-pointer shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
                        <span>매수</span>
                      </div>
                    </div>
                  </div>
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

interface IRModalType {
  isIRClick: boolean;
  setIsIRClick: React.Dispatch<React.SetStateAction<boolean>>;
  selectIRData: any;
  // 날짜는 parse() 해서 보냄
  date: string[];
}

function IRModal({ isIRClick, setIsIRClick, selectIRData, date }: IRModalType): JSX.Element {
  const ref = useRef(null);
  const quarterRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<any>(null);
  const containerRef2 = useRef<any>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [yearOption, setYearOption] = useState<any>();
  const [selectYear, setSelectYear] = useState<string>('');
  const [quarterOption, setQuarterOption] = useState<any>();
  const [showQuarterData, setShowQuarterData] = useState<any>();
  const [quarterClick, setQuarterClick] = useState<number>(0);

  useEffect(() => {
    const gameNowYear = parseInt(date[0]);
    const yearLis = new Array(gameNowYear - 2010).fill(2011);
    // 2011년부터 현재년도까지 만들어주기
    setYearOption(
      yearLis
        .map((li, idx) => {
          return (
            <option key={idx} value={`${li + idx}`}>
              {li + idx}
            </option>
          );
        })
        .reverse()
    );
  }, [selectIRData]);

  // selectYear가 변경될때마다 실행
  useEffect(() => {
    if (selectYear === '') {
      setSelectYear(date[0]);
    }

    if (selectYear !== '') {
      const gameNowYear = parseInt(selectYear);
      let addMonthOptionCnt: number = 0;
      if (gameNowYear === parseInt(date[0])) {
        switch (date[1]) {
          case '01':
          case '02':
          case '03':
            addMonthOptionCnt = 1;
            break;
          case '04':
          case '05':
          case '06':
            addMonthOptionCnt = 2;
            break;
          case '07':
          case '08':
          case '09':
            addMonthOptionCnt = 3;
            break;
          case '10':
          case '11':
          case '12':
            addMonthOptionCnt = 4;
            break;
        }
      } else {
        addMonthOptionCnt = 4;
      }
      const quarters = new Array(addMonthOptionCnt).fill('분기');
      setQuarterOption(
        quarters.map((quarter, idx) => {
          return (
            <option
              aria-label={selectIRData[gameNowYear][idx].name}
              key={idx}
              value={`${selectIRData[gameNowYear][idx].name}`}>
              {selectIRData[gameNowYear][idx].name}
            </option>
          );
        })
      );
      // 가장 처음에 보여줄 데이터
      setShowQuarterData(selectIRData[gameNowYear][0]);
    }
  }, [yearOption, selectYear]);

  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '닫기':
        setIsIRClick((pre) => !pre);
        break;
    }
  };

  const change = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.ariaLabel === '연도') {
      setSelectYear(e.currentTarget.value);
      setQuarterClick(0);
      if (quarterRef.current !== null) {
        quarterRef.current.value = '1분기 보고서';
      }
    } else {
      switch (e.currentTarget.value) {
        case '1분기 보고서':
          setQuarterClick(0);
          changeQuarterData();
          break;
        case '반기 보고서':
          setQuarterClick(1);
          changeQuarterData();
          break;
        case '3분기 보고서':
          setQuarterClick(2);
          changeQuarterData();
          break;
        case '사업 보고서':
          setQuarterClick(3);
          changeQuarterData();
          break;
      }
    }
  };

  const changeQuarterData = () => {
    console.log(selectIRData[parseInt(selectYear)]);

    setShowQuarterData(selectIRData[parseInt(selectYear)][quarterClick]);
  };

  // key service
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const dx = x - startX;
    containerRef.current.scrollLeft = scrollLeft - dx;
  };

  // plan
  const handleMouseDown2 = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - containerRef2.current.offsetLeft);
    setScrollLeft(containerRef2.current.scrollLeft);
  };

  const handleMouseUp2 = () => {
    setDragging(false);
  };

  const handleMouseMove2 = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef2.current.offsetLeft;
    const dx = x - startX;
    containerRef2.current.scrollLeft = scrollLeft - dx;
  };

  return (
    <>
      {isIRClick ? (
        <div
          ref={ref}
          className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 z-50 bg-[#707070]/50 pt-0"
          onClick={(e) => {
            if (e.target === ref.current) {
              setIsIRClick((pre) => !pre);
            }
          }}>
          <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[35rem] lg:w-[42%] lg:min-w-[40rem] lg:max-w-[40rem] px-7 rounded-xl space-y-2 lg:space-y-4 py-3 lg:py-6">
            <div className="w-full flex justify-center items-center text-[1.3rem] lg:text-[2rem] font-black">
              <span>기업 활동</span>
            </div>
            <div className="flex items-end justify-start w-full space-x-6 px-2 text-[0.9rem] lg:text-[1.3rem] border-b-2 py-[2px] lg:py-1 text-[#6F6F6F] font-extrabold">
              <select aria-label="연도" className="outline-none" name="연도" id="연도" onChange={change}>
                {yearOption !== undefined && yearOption}
              </select>
              <select
                ref={quarterRef}
                aria-label="보고서"
                className="outline-none"
                name="보고서"
                id="보고서"
                onChange={change}>
                {quarterOption}
              </select>
            </div>
            <div className="flex flex-col items-start justify-start w-full pb-3 font-bold border-b-2 lg:pb-5">
              <div className="flex items-end justify-between w-full px-2 pb-2">
                <span className="text-[1rem] lg:text-[1.2rem]">
                  {selectYear !== '' && selectIRData[selectYear][quarterClick].name}
                </span>
                <span className="text-[0.6rem] text-[#9B9B9B] lg:text-[0.8rem]">
                  실제 IR 공시 날짜와는 다를 수 있습니다.
                </span>
              </div>
              <div className="flex items-center w-full mb-2 justify-evenly lg:mb-4">
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src="/images/icons/IRImage.png"
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['operating revenue'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['operating revenue'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['operating revenue']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">영업 수익</span>
                  </div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src="/images/icons/IRImage.png"
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['operating gain'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['operating gain'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['operating gain']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">영업 이익</span>
                  </div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src="/images/icons/IRImage.png"
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['total equity'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['total equity'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['total equity']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">총자본</span>
                  </div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src="/images/icons/IRImage.png"
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['total liabilities'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['total liabilities'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['total liabilities']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">총부채</span>
                  </div>
                </div>
              </div>
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`flex flex-col justify-start items-start w-full h-full flex-nowrap overflow-x-auto ${styled.scroll} lg:mb-2`}>
                <div className="flex flex-nowrap">
                  {selectYear !== '' &&
                    selectIRData[selectYear][quarterClick]['key services'].map((service: string, idx: number) => {
                      return (
                        <span
                          key={idx}
                          className="bg-[#FFC34F] min-w-fit text-center text-white text-[0.7rem] lg:text-[1rem] w-[10rem] lg:w-[13rem] px-5 lg:px-10 mx-2 py-1 lg:py-2 rounded-md">
                          {service}
                        </span>
                      );
                    })}
                </div>
                <div></div>
              </div>
              <div
                ref={containerRef2}
                onMouseDown={handleMouseDown2}
                onMouseUp={handleMouseUp2}
                onMouseMove={handleMouseMove2}
                className={`flex flex-col justify-start items-start w-full h-full flex-nowrap overflow-x-auto mt-2 ${styled.scroll}`}>
                <div className="flex flex-nowrap">
                  {selectYear !== '' &&
                    selectIRData[selectYear][quarterClick]['plan'].map((service: string, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className="flex justify-center min-w-fit rounded-md overflow-x-hidden bg-black text-center text-white text-[0.7rem] lg:text-[1rem] px-5 lg:px-10 mx-2 py-1 lg:py-2">
                          {service}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end w-full px-2">
              <div className="flex justify-end items-end text-white w-[40%] space-x-2 text-center font-medium text-[0.8rem] lg:text-[1.1rem] ">
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
