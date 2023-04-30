import React, { PureComponent, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import MobileInfo from './MobileInfo';
import NewsModal from './NewsModal';

function Exchange(): JSX.Element {
  const [tradingVolume, setTradingVolume] = useState<number>(0);
  const [isNewsClick, setIsNewsClick] = useState<boolean>(false);
  const [isMobileInfo, setIsMobileInfo] = useState<boolean>(false);
  const [isIRClick, setIsIRClick] = useState<boolean>(false);

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
    }
  };

  return (
    <>
      <IRModal isIRClick={isIRClick} setIsIRClick={setIsIRClick} />
      <NewsModal isNewsClick={isNewsClick} setIsNewsClick={setIsNewsClick} />
      <MobileInfo isMobileInfo={isMobileInfo} setIsMobileInfo={setIsMobileInfo} />
      <div className="flex flex-col items-center justify-center w-full h-full pt-[12vh] md:pt-[10vh]">
        <div className="flex justify-between w-full border-b-4">
          <div className="flex justify-start items-end w-3/5 text-[1rem] md:text-[1.2rem] lg:text-[1.7rem] space-x-3 font-black">
            <div className="px-3 transition-all duration-300 cursor-pointer hover:scale-105">
              <span>A 전자</span>
            </div>
            <div className="px-3 transition-all duration-300 cursor-pointer hover:scale-105">
              <span>B 화학</span>
            </div>
            <div className="px-3 transition-all duration-300 cursor-pointer hover:scale-105">
              <span>C 생명</span>
            </div>
            <div className="px-3 transition-all duration-300 cursor-pointer hover:scale-105">
              <span>G IT</span>
            </div>
          </div>
          <div className="flex items-end justify-end w-2/5">
            <div
              aria-label="신문"
              className="relative flex-col items-center hidden pr-2 transition-all duration-300 lg:flex hover:scale-105"
              onClick={click}>
              <span className="pb-5 lg:pb-9 text-[0.8rem] lg:text-[1.1rem] text-[#FF4F4F] font-bold">신문 스크랩</span>
              <img
                className="absolute -bottom-3 h-[2.9rem] lg:h-[4.5rem] cursor-pointer"
                src="/images/icons/news.png"
                alt=""
              />
            </div>
            <div className="flex flex-col items-end text-[0.68rem] lg:text-[1rem]">
              <span className="font-semibold leading-[0.6rem]">시간</span>
              <span className="text-[0.9rem] lg:text-[1.5rem] font-bold">20XX.03.17</span>
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
                <div className="flex items-end space-x-1">
                  <span className="text-[1.7rem]">나의 투자 현황</span>
                  <span className="text-[1rem] font-semibold">A 전자</span>
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
                <div className="flex items-end space-x-1 text-[#006EC9]">
                  <span className="text-[1.5rem]">- 48,424</span>
                  <span className="text-[1rem]">(6.74 %)</span>
                </div>
                <div className="flex space-x-3 items-end  text-[1.5rem]">
                  <div className="flex items-center space-x-1">
                    <span className="text-[1rem]">보유수량</span>
                    <span className="text-black">10</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className=" items-end text-[1rem]">평균단가</span>
                    <span className="text-black">70,250</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[1rem]">현재가</span>
                    <span className="text-[#006EC9]">65,800</span>
                  </div>
                </div>
              </div>
              {/* 차트 */}
              <div className="w-full h-[15rem] bg-white">
                <Chart />
              </div>
            </div>
            <div className="flex justify-between w-full mt-3">
              {/* 유가 시세 */}
              <div className="flex flex-col items-start w-[49%] text-[1.4rem] bg-white mr-[2%] px-5 font-semibold drop-shadow-lg rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 transition-all duration-300">
                <div className="flex items-end justify-between w-full pt-2">
                  <div>
                    <span>유가 시세</span>
                  </div>
                  <div>
                    <span className="text-[#006EC9]">82.16</span>
                    <span>원</span>
                    <span className="text-[1rem] text-[#006EC9]">&nbsp;(-1.10)</span>
                  </div>
                </div>
                <div className="w-full h-[9rem] text-[0.8rem]">
                  <Chart />
                </div>
              </div>
              {/* 금 시세 */}
              <div className="flex flex-col items-start w-[49%] text-[1.4rem] bg-white px-5 font-semibold drop-shadow-lg rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 transition-all duration-300">
                <div className="flex items-end justify-between w-full pt-2">
                  <div>
                    <span>금 시세</span>
                  </div>
                  <div>
                    <span className="text-[#006EC9]">82.16</span>
                    <span>원</span>
                    <span className="text-[1rem] text-[#006EC9]">&nbsp;(-1.10)</span>
                  </div>
                </div>
                <div className="w-full h-[9rem] text-[0.8rem]">
                  <Chart />
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
                  <span className="text-[0.7rem] font-semibold">A 전자</span>
                </div>
                {/* <div className="flex items-center space-x-1">
                  <span className="text-[#707070] text-[0.7rem]">기업활동</span>
                  <span className="">🍳</span>
                </div> */}
              </div>
              {/* 데이터 */}
              <div className="flex items-end justify-between w-full text-[#9B9B9B] font-bold pt-1 pb-2 ">
                <div className="flex items-end space-x-1 text-[#006EC9]">
                  <span className="text-[1rem]">- 48,424</span>
                  <span className="text-[0.7rem]">(6.74 %)</span>
                </div>
                <div className="flex space-x-2 md:space-x-3 items-end text-[0.8rem] md:text-[1rem]">
                  <div className="flex items-center space-x-1">
                    <span className="text-[0.7rem]">보유수량</span>
                    <span className="text-black">10</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className=" items-end text-[0.7rem]">평균단가</span>
                    <span className="text-black">70,250</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[0.7rem]">현재가</span>
                    <span className="text-[#006EC9]">65,800</span>
                  </div>
                </div>
              </div>
              {/* 차트 */}
              <div className="w-full h-[12rem] md:h-[12.7rem] flex justify-start text-[0.7rem] bg-white">
                <Chart />
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
                <div className="w-full">
                  <span>국제시장 환율</span>
                </div>
                <div className="flex justify-evenly w-full text-center border-2 rounded-md bg-[#EDEDED] text-[1.1rem] space-x-1">
                  <div className="w-1/3 transition-all duration-300 rounded-md border-2 hover:bg-white hover:scale-105 cursor-pointer border-[#EDEDED] hover:border-[#EDEDED]">
                    <span>미국</span>
                  </div>
                  <div className="w-1/3 transition-all duration-300 rounded-md border-2 hover:bg-white hover:scale-105 cursor-pointer border-[#EDEDED] hover:border-[#EDEDED]">
                    <span>일본</span>
                  </div>
                  <div className="w-1/3 transition-all duration-300 rounded-md border-2 hover:bg-white hover:scale-105 cursor-pointer border-[#EDEDED] hover:border-[#EDEDED]">
                    <span>유럽연합</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[9rem] text-[0.8rem]">
                <Chart />
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
  );
}
export default Exchange;

class Chart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';
  render() {
    const data = [
      {
        name: '1월',
        uv: 4000,
        pv: 2400,
        amt: 2400
      },
      {
        name: '2월',
        uv: 3000,
        pv: 1398,
        amt: 2210
      },
      {
        name: '3월',
        uv: 2000,
        pv: 9800,
        amt: 2290
      },
      {
        name: '4월',
        uv: 2780,
        pv: 3908,
        amt: 2000
      },
      {
        name: '5월',
        uv: 1890,
        pv: 4800,
        amt: 2181
      },
      {
        name: '6월',
        uv: 2390,
        pv: 3800,
        amt: 2500
      }
    ];
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#33D03D" fill="#c2eec5" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

interface IRModalType {
  isIRClick: boolean;
  setIsIRClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function IRModal({ isIRClick, setIsIRClick }: IRModalType): JSX.Element {
  const ref = useRef(null);
  const iRData: any = {
    'G IT': {
      '2011': [
        {
          name: '1분기 보고서',
          'operating revenue': 517300000000,
          'operating gain': 168500000000,
          'total equity': 1422150556000,
          'total liabilities': 723797899000,
          'key services': ['인터넷 포털 서비스', '온라인 게임 서비스', '뮤직 및 부동산 서비스'],
          plan: [
            '스마트 디바이스용 게임 개발사',
            '일본 검색, 모바일 서비스, 퍼블리싱 게임 등에 투자',
            '오픈마켓 서비스에 투자'
          ]
        },
        {
          name: '반기 보고서',
          'operating revenue': 1028400000000,
          'operating gain': 318800000000,
          'total equity': 1468748800000,
          'total liabilities': 730183708000,
          'key services': ['인터넷 포털 서비스', '온라인 게임 서비스', '뮤직 및 부동산 서비스'],
          plan: ['디지털 지역광고 합작사를 설립', "실무형 우수 SW 인재 양성을 위해 'SW 아카데미'의 직접 설립"]
        },
        {
          name: '3분기 보고서',
          'operating revenue': 1557700000000,
          'operating gain': 468900000000,
          'total equity': 1468748800000,
          'total liabilities': 730183708000,
          'key services': ['인터넷 포털 서비스', '온라인 게임 서비스', '뮤직 및 부동산 서비스'],
          plan: [
            '친환경 IDC(인터넷데이터센터)를 건립',
            '스마트폰 게임 사업 강화를 위해 3년간 1,000억원을 투자',
            '일본검색 사업 강화',
            '벤처기업 투자 증가'
          ]
        },
        {
          name: '사업 보고서',
          'operating revenue': 2147400000000,
          'operating gain': 620400000000,
          'total equity': 1577862030000,
          'total liabilities': 794843246000,
          'key services': ['인터넷 포털 서비스', '온라인 게임 서비스', '뮤직 및 부동산 서비스'],
          plan: [
            '친환경 IDC(인터넷데이터센터)를 건립',
            '스마트폰 게임 사업 강화를 위해 3년간 1,000억원을 투자',
            '일본검색 사업 강화',
            '오픈마켓형 서비스 투자',
            '벤처기업 투자 증가'
          ]
        }
      ],
      '2012': [
        {
          name: '1분기 보고서',
          'operating revenue': 576100000000,
          'operating gain': 161700000000,
          'total equity': 1687782561000,
          'total liabilities': 812007088000,
          'key services': [
            '인터넷 포털 서비스',
            '온라인 게임 서비스',
            '소셜 네트워크 서비스',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: [
            '친환경 IDC(인터넷데이터센터)를 건립',
            '스마트폰 게임 사업 강화를 위해 3년간 1,000억원을 투자',
            '일본검색 사업 강화',
            '벤처기업 투자 증가'
          ]
        },
        {
          name: '반기 보고서',
          'operating revenue': 1150800000000,
          'operating gain': 311300000000,
          'total equity': 1812931611000,
          'total liabilities': 955079790000,
          'key services': [
            '인터넷 포털 서비스',
            '온라인 게임 서비스',
            '글로벌 메신저',
            '소셜 네트워크 서비스',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: [
            '친환경 IDC(인터넷데이터센터)를 건립',
            '스마트폰 게임 사업 강화를 위해 3년간 1,000억원을 투자',
            '일본검색 사업 강화',
            '벤처기업 투자 증가'
          ]
        },
        {
          name: '3분기 보고서',
          'operating revenue': 1746400000000,
          'operating gain': 467900000000,
          'total equity': 1938447901000,
          'total liabilities': 950867749000,
          'key services': [
            '인터넷 포털 서비스',
            '온라인 게임 서비스',
            '글로벌 메신저',
            '소셜 네트워크 서비스',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: [
            '친환경 IDC(인터넷데이터센터)를 건립',
            '스마트폰 게임 사업 강화를 위해 3년간 1,000억원을 투자',
            '일본검색 사업 강화',
            '벤처기업 투자 증가'
          ]
        },
        {
          name: '사업 보고서',
          'operating revenue': 2389300000000,
          'operating gain': 702200000000,
          'total equity': 1903568275000,
          'total liabilities': 1023748395000,
          'key services': [
            '인터넷 포털 서비스',
            '온라인 게임 서비스',
            '글로벌 메신저',
            '소셜 네트워크 서비스',
            '오픈마켓형 서비스',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: [
            '친환경 IDC(인터넷데이터센터)를 건립',
            '스마트폰 게임 사업 강화를 위해 3년간 1,000억원을 투자',
            '일본검색 사업 강화',
            '벤처기업 투자 증가'
          ]
        }
      ],
      '2013': [
        {
          name: '1분기 보고서',
          'operating revenue': 673600000000,
          'operating gain': 191100000000,
          'total equity': 2026886064428,
          'total liabilities': 1110595503434,
          'key services': [
            '인터넷 포털 서비스',
            '온라인 게임 서비스',
            '소셜 네트워크 서비스',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: [
            '친환경 IDC(인터넷데이터센터)를 건립',
            '스마트폰 게임 사업 강화를 위해 3년간 1,000억원을 투자',
            '일본검색 사업 강화',
            '벤처기업 투자 증가'
          ]
        },
        {
          name: '반기 보고서',
          'operating revenue': 1097487267113,
          'operating gain': 267129329608,
          'total equity': 279039375764,
          'total liabilities': 3618469293721,
          'key services': [
            '인터넷 포털 서비스',
            '지인 기반 모바일 SNS 서비스',
            '글로벌 메신저',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: ['친환경 IDC(인터넷데이터센터)를 건립', '일본검색 사업 강화', '벤처기업 투자 증가']
        },
        {
          name: '3분기 보고서',
          'operating revenue': 1670854088105,
          'operating gain': 369828232067,
          'total equity': 1428411734744,
          'total liabilities': 1059246190519,
          'key services': [
            '인터넷 포털 서비스',
            '지인 기반 SNS 서비스',
            '글로벌 메신저',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: ['친환경 IDC(인터넷데이터센터)를 건립', '글로벌 메신저 사업 강화']
        },
        {
          name: '사업 보고서',
          'operating revenue': 2311962798310,
          'operating gain': 524138541849,
          'total equity': 1475309016054,
          'total liabilities': 1222437824188,
          'key services': [
            '인터넷 포털 서비스',
            '지인 기반 SNS 서비스',
            '글로벌 메신저',
            '소셜 네트워크 서비스',
            '오픈마켓형 서비스',
            '뮤직 및 부동산 서비스',
            '인프라 산업'
          ],
          plan: ['친환경 IDC(인터넷데이터센터)를 건립', '글로벌 메신저 사업 강화']
        }
      ]
    },
    'A 전자': {
      '2011': [
        {
          name: '1분기 보고서',
          'operating revenue': 36985017000000,
          'operating gain': 2948536000000,
          'total equity': 91498754000000,
          'total liabilities': 45033401000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        },
        {
          name: '반기 보고서',
          'operating revenue': 76423871000000,
          'operating gain': 6700416000000,
          'total equity': 94608214000000,
          'total liabilities': 43361485000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        },
        {
          name: '3분기 보고서',
          'operating revenue': 117697836000000,
          'operating gain': 10953312000000,
          'total equity': 98664248000000,
          'total liabilities': 49501637000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        },
        {
          name: '사업 보고서',
          'operating revenue': 165001771000000,
          'operating gain': 16249717000000,
          'total equity': 101845323000000,
          'total liabilities': 53785931000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        }
      ],
      '2012': [
        {
          name: '1분기 보고서',
          'operating revenue': 45270517000000,
          'operating gain': 5850447000000,
          'total equity': 105506693000000,
          'total liabilities': 54649928000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        },
        {
          name: '반기 보고서',
          'operating revenue': 92867496000000,
          'operating gain': 12574560000000,
          'total equity': 110264109000000,
          'total liabilities': 56035900000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        },
        {
          name: '3분기 보고서',
          'operating revenue': 145044766000000,
          'operating gain': 20699255000000,
          'total equity': 116538834000000,
          'total liabilities': 60188312000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        },
        {
          name: '사업 보고서',
          'operating revenue': 201103613000000,
          'operating gain': 29049338000000,
          'total equity': 121480206000000,
          'total liabilities': 59591364000000,
          'key services': ['완제품(DMC) 부문(디지털미디어 기기, 통신 기기)', '부품(DS) 부문(반도체, LCD)'],
          plan: ['미래 대비 시설 투자(반도체, LCD, SMD 등)']
        }
      ],
      '2013': [
        {
          name: '1분기 보고서',
          'operating revenue': 52868095000000,
          'operating gain': 8779458000000,
          'total equity': 128805644000000,
          'total liabilities': 62037027000000,
          'key services': [
            'CE 부문(모니터, 에어컨, 세탁기, 의료기기 등)',
            'IM 부문(컴퓨터, 디지털 카메라 등)',
            'DS 부문(반도체, DP)'
          ],
          plan: ['미래 대비 시설 투자(반도체, DP 등의 성능 개선)']
        },
        {
          name: '반기 보고서',
          'operating revenue': 110332543000000,
          'operating gain': 18310141000000,
          'total equity': 138379538000000,
          'total liabilities': 65382074000000,
          'key services': [
            'CE 부문(모니터, 에어컨, 세탁기, 의료기기 등)',
            'IM 부문(컴퓨터, 디지털 카메라 등)',
            'DS 부문(반도체, DP)'
          ],
          plan: ['미래 대비 시설 투자(반도체, DP 등의 성능 개선)']
        },
        {
          name: '3분기 보고서',
          'operating revenue': 169416042000000,
          'operating gain': 28473735000000,
          'total equity': 144438803000000,
          'total liabilities': 66374078000000,
          'key services': [
            'CE 부문(모니터, 에어컨, 세탁기, 의료기기 등)',
            'IM 부문(컴퓨터, 디지털 카메라 등)',
            'DS 부문(반도체, DP)'
          ],
          plan: ['미래 대비 시설 투자(반도체, DP 등의 성능 개선)']
        },
        {
          name: '사업 보고서',
          'operating revenue': 228692667000000,
          'operating gain': 36785013000000,
          'total equity': 150016010000000,
          'total liabilities': 64059008000000,
          'key services': [
            'CE 부문(모니터, 에어컨, 세탁기, 의료기기 등)',
            'IM 부문(컴퓨터, 디지털 카메라 등)',
            'DS 부문(반도체, DP)'
          ],
          plan: ['미래 대비 시설 투자(반도체, DP 등의 성능 개선)']
        }
      ]
    }
  };

  for (const iterator in iRData) {
    for (const year in iRData[iterator]) {
      console.log(iRData[iterator][year]);
    }
  }

  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '닫기':
        setIsIRClick((pre) => !pre);
        break;

      default:
        break;
    }
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
            <div className="w-full flex justify-center items-center text-[1.5rem] lg:text-[2rem] font-black">
              <span>기업 활동</span>
            </div>
            <div className="flex items-end justify-start w-full space-x-6 px-2 lg:text-[1.3rem] font-semibold border-b-2 py-1 cursor-pointer text-[#6F6F6F]"></div>
            <div className="flex items-end justify-start w-full space-x-6 px-2 lg:text-[1.3rem] border-b-2 py-1 text-[#6F6F6F] font-extrabold">
              <select name="연도" id="">
                <option value="2011">2011</option>
                <option value="2012">2012</option>
              </select>
              <select name="보고서" id="">
                <option value="1분기 보고서">1분기 보고서</option>
                <option value="반기 보고서">반기 보고서</option>
                <option value="3분기 보고서">3분기 보고서</option>
                <option value="사업 보고서">사업 보고서</option>
              </select>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="w-full">
                <span>1분기 보고서</span>
              </div>
              <div className="flex items-center w-full justify-evenly">
                <div className="w-[24%] flex flex-col justify-center items-center">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>
                    <span>5173억</span>
                  </div>
                  <div></div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>5173억</div>
                  <div></div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>5173억</div>
                  <div></div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>5173억</div>
                  <div></div>
                </div>
              </div>
              <div className="w-full"></div>
            </div>
            <div className="flex items-end justify-between w-full px-2">
              <div className="flex flex-col justify-start items-start text-[#9B9B9B] text-[0.6rem] lg:text-[0.8rem]">
                <span>정보상에서 구입한 뉴스 소식을 볼 수 있습니다.</span>
                <span>종목이 갱신될 때 마다 보유 기업 정보는 초기화 됩니다.</span>
              </div>
              <div className="flex justify-end items-end text-white w-[40%] space-x-2 text-center font-medium text-[0.8rem] lg:text-[1.1rem]">
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
