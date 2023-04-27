import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Exchange(): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex justify-between w-full border-b-4">
          <div className="flex justify-start items-end w-3/5 text-[1.7rem] space-x-3 font-black">
            <div className="px-3">A 전자</div>
            <div className="px-3">B 화학</div>
            <div className="px-3">C 생명</div>
            <div className="px-3">G IT</div>
          </div>
          <div className="flex items-end justify-end w-2/5">
            <div className="flex flex-col items-end pr-2">
              <span>신문 스크랩</span>
              <img className="w-[3rem]" src="/images/icons/news.png" alt="" />
            </div>
            <div className="flex flex-col items-end ">
              <span>게임 속 시간</span>
              <span className="text-[1.5rem]">20XX.03.17</span>
            </div>
          </div>
        </div>
        {/* 클릭한 주식 데이터 */}
        <div className="flex items-center justify-between w-full pt-5">
          {/* 왼쪽 차트 */}
          <div className="flex flex-col items-start justify-center px-2 w-[70%]">
            <div className="flex flex-col w-full px-5 bg-white ">
              <div className="flex items-end justify-between w-full font-bold ">
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
              <div className="flex items-end justify-between w-full text-[#9B9B9B] font-bold ">
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
              <div className="w-full h-[20rem] bg-white">
                <Example />
              </div>
            </div>
            <div className="flex justify-between w-full my-4">
              {/* 유가 시세 */}
              <div className="flex flex-col items-start w-[49%] text-[1.4rem] bg-white mr-[2%] px-5 font-semibold drop-shadow-lg">
                <div className="flex items-end justify-between w-full">
                  <div>
                    <span>유가 시세</span>
                  </div>
                  <div>
                    <span className="text-[#006EC9]">82.16</span>
                    <span>원</span>
                    <span className="text-[1rem] text-[#006EC9]">(-1.10)</span>
                  </div>
                </div>
                <div className="w-full h-[10rem]">
                  <Example />
                </div>
              </div>
              {/* 금 시세 */}
              <div className="flex flex-col items-start w-[49%] text-[1.4rem] bg-white px-5 font-semibold drop-shadow-lg">
                <div className="flex items-end justify-between w-full">
                  <div>
                    <span>금 시세</span>
                  </div>
                  <div>
                    <span className="text-[#006EC9]">82.16</span>
                    <span>원</span>
                    <span className="text-[1rem] text-[#006EC9]">(-1.10)</span>
                  </div>
                </div>
                <div className="w-full h-[10rem]">
                  <Example />
                </div>
              </div>
            </div>
          </div>
          {/* 오른쪽 주식 거래 및 차트 */}
          <div className="w-[30%]"></div>
        </div>
      </div>
    </>
  );
}
export default Exchange;

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

export class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';

  render() {
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
          <Area type="monotone" dataKey="uv" stroke="#33D03D" fill="#c2eec5" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
