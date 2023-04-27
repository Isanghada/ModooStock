import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Exchange(): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full pt-[12vh] md:pt-[10vh]">
        <div className="flex justify-between w-full border-b-4">
          <div className="flex justify-start items-end w-3/5 text-[1rem] md:text-[1.2rem] lg:text-[1.7rem] space-x-3 font-black">
            <div className="px-3 transition-all duration-300 hover:scale-105">
              <span>A 전자</span>
            </div>
            <div className="px-3 transition-all duration-300 hover:scale-105">
              <span>B 화학</span>
            </div>
            <div className="px-3 transition-all duration-300 hover:scale-105">
              <span>C 생명</span>
            </div>
            <div className="px-3 transition-all duration-300 hover:scale-105">
              <span>G IT</span>
            </div>
          </div>
          <div className="flex items-end justify-end w-2/5">
            <div className="relative flex-col items-center hidden pr-2 transition-all duration-300 lg:flex hover:scale-105">
              <span className="pb-5 lg:pb-9 text-[0.8rem] lg:text-[1.1rem] text-[#FF4F4F] font-bold">신문 스크랩</span>
              <img className="absolute -bottom-3 h-[2.9rem] lg:h-[4.5rem]" src="/images/icons/news.png" alt="" />
            </div>
            <div className="flex flex-col items-end text-[0.82rem]">
              <span className="font-semibold">시간</span>
              <span className="text-[0.6rem] lg:text-[1.5rem] font-bold">20XX.03.17</span>
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
                <div className="flex items-center space-x-1">
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
                <Example />
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
                  <Example />
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
                  <Example />
                </div>
              </div>
            </div>
          </div>
          {/* 모바일 */}
          <div className="flex flex-col justify-center px-2 w-[69%] lg:hidden">
            <div className="flex flex-col w-full px-5 transition-all duration-300 bg-white rounded-lg hover:scale-[1.02] border-2 border-white hover:border-blue-200 shadow-md shadow-gray-300">
              <div className="flex items-end justify-between w-full pt-2 font-bold">
                <div className="flex items-end space-x-1">
                  <span className="text-[1rem]">나의 투자 현황</span>
                  <span className="text-[0.7rem] font-semibold">A 전자</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-[#707070] text-[0.7rem]">기업활동</span>
                  <span className="">🍳</span>
                </div>
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
                <Example />
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
                    className="bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pl-3 py-2 w-full outline-[#e2a2a7] placeholder:text-[0.8rem]"
                    type="text"
                    placeholder="거래량을 입력하세요."
                  />
                </div>
                <div className="flex items-center w-full text-center justify-evenly text-[#464646]">
                  <div className="w-1/4 transition-all duration-300 border-r-2 hover:scale-105">
                    <span>+1개</span>
                  </div>
                  <div className="w-1/4 transition-all duration-300 border-r-2 hover:scale-105">
                    <span>+10개</span>
                  </div>
                  <div className="w-1/4 transition-all duration-300 border-r-2 hover:scale-105">
                    <span>+100개</span>
                  </div>
                  <div className="w-1/4 transition-all duration-300 hover:scale-105">
                    <span>+1000개</span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full text-center text-[1.5rem] text-white font-semibold pt-2">
                  <div className="w-[45%] py-1 bg-[#2C94EA] shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
                    <span>매도</span>
                  </div>
                  <div className="w-[45%] py-1 bg-[#EA455D] shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
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
                <div className="flex justify-evenly w-full bg-[#EDEDED] text-[1.2rem]">
                  <div>
                    <span>미국</span>
                  </div>
                  <div>
                    <span>일본</span>
                  </div>
                  <div>
                    <span>유럽연합</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[9rem] text-[0.8rem]">
                <Example />
              </div>
            </div>
          </div>
          {/* 모바일 */}
          <div className="flex flex-col w-[31%] space-y-3 justify-end items-start lg:hidden">
            {/* 회사 정보, 뉴스, 정보 */}
            <div className="flex items-center w-full font-bold text-center bg-white border-2 rounded-md justify-evenly">
              <div className="w-[40%] border-r-2 text-[0.9rem] md:text-[1rem] hover:scale-105 transition-all duration-300">
                <span>기업활동</span>
              </div>
              <div className="w-[30%] border-r-2 text-[0.9rem] md:text-[1rem] hover:scale-105 transition-all duration-300">
                <span>신문</span>
              </div>
              <div className="w-[30%] text-[0.9rem] md:text-[1rem] hover:scale-105 transition-all duration-300">
                <span>정보</span>
              </div>
            </div>
            {/* 종목 갱신, 날짜 갱신 */}
            <div className="flex flex-col w-full pb-1 text-white bg-black rounded-lg">
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
                    className="bg-[#FFF2F0] border-[#ECB7BB] border-2 rounded-md pl-2 py-1 w-full outline-[#e2a2a7] placeholder:text-[0.8rem]"
                    type="text"
                    placeholder="거래량을 입력하세요."
                  />
                </div>
                <div className="flex items-center w-full text-center justify-evenly text-[0.761rem] md:text-[0.935rem] pt-2 text-[#464646]">
                  <div className="w-[21%] pr-1 transition-all duration-300 border-r-2 hover:scale-105">
                    <span>+1개</span>
                  </div>
                  <div className="w-[21%] pr-1 transition-all duration-300 border-r-2 hover:scale-105">
                    <span>+10개</span>
                  </div>
                  <div className="w-[24%] pr-1 transition-all duration-300 border-r-2 hover:scale-105">
                    <span>+100개</span>
                  </div>
                  <div className="w-[35%%] transition-all duration-300 hover:scale-105">
                    <span>+1000개</span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full text-center text-[1.1rem] md:text-[1.3rem] text-white font-semibold pt-2">
                  <div className="w-[45%] py-1 bg-[#2C94EA] shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
                    <span>매도</span>
                  </div>
                  <div className="w-[45%] py-1  bg-[#EA455D] shadow-md shadow-gray-400 rounded-xl hover:scale-105 transition-all duration-300">
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

export class Example extends PureComponent {
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
