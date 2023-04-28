import { useRef, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MobileInfoType {
  isMobileInfo: boolean;
  setIsMobileInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileInfo({ isMobileInfo, setIsMobileInfo }: MobileInfoType): JSX.Element {
  const ref = useRef(null);
  const [isClickInfo, setIsClickInfo] = useState(0);
  const [isExchange, setIsExchange] = useState(0);
  const [clickData, setClickData] = useState<any>([
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
  ]);
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

  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '닫기':
        setIsMobileInfo((pre) => !pre);
        break;
      case '유가':
        setIsClickInfo(0);
        setClickData(data);
        break;
      case '금':
        setIsClickInfo(1);
        setClickData(data);
        break;
      case '환율':
        setIsClickInfo(2);
        // default 로 미국 환율 보여주기
        setClickData(data);
        break;
      case '미국':
        setIsExchange(0);
        setClickData(data);
        break;
      case '금':
        setIsExchange(1);
        setClickData(data);
        break;
      case '유럽연합':
        setIsExchange(2);
        setClickData(data);
        break;
    }
  };

  return (
    <>
      {isMobileInfo ? (
        <div
          ref={ref}
          className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 z-50 bg-[#707070]/50 pt-0"
          onClick={(e) => {
            if (e.target === ref.current) {
              setIsMobileInfo((pre) => !pre);
            }
          }}>
          <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[29rem] lg:w-[42%] lg:max-w-[40rem] px-7 rounded-xl space-y-2 lg:space-y-4 py-3 lg:py-6">
            <div className="w-full flex justify-center items-center text-[1.5rem] lg:text-[2rem] font-black">
              <span>정보</span>
            </div>
            <div className="flex items-end justify-start w-full space-x-6 px-2 lg:text-[1.3rem] border-b-2 py-1 text-[#6F6F6F] font-extrabold">
              <div
                aria-label="유가"
                className={`transition-all duration-300 cursor-pointer active:scale-105 ${
                  isClickInfo === 0 && 'text-black scale-110'
                }`}
                onClick={click}>
                <span>유가 시세</span>
              </div>
              <div
                aria-label="금"
                className={`transition-all duration-300 cursor-pointer active:scale-105 ${
                  isClickInfo === 1 && 'text-black scale-110'
                }`}
                onClick={click}>
                <span>금 시세</span>
              </div>
              <div
                aria-label="환율"
                className={`transition-all duration-300 cursor-pointer active:scale-105 ${
                  isClickInfo === 2 && 'text-black scale-110'
                }`}
                onClick={click}>
                <span>국제시장 환율</span>
              </div>
              <div className={`transition-all duration-300 cursor-pointer ${isClickInfo === 2 ? 'flex' : 'hidden'}`}>
                <select className="outline-none" name="환율" id="">
                  <option value="미국" aria-label="미국" onClick={click}>
                    미국
                  </option>
                  <option value="일본" aria-label="일본" onClick={click}>
                    일본
                  </option>
                  <option value="유럽연합" aria-label="유럽연합" onClick={click}>
                    유럽연합
                  </option>
                </select>
              </div>
            </div>
            {/* 선택한 것에 대한 차트 변경 */}
            <div className="w-full h-[11rem] text-[0.8rem]">
              <ResponsiveContainer>
                <AreaChart
                  // width={500}
                  height={400}
                  data={clickData}
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
            </div>
            <div className="flex items-end justify-between w-full px-2">
              <div className="flex flex-col justify-start items-start text-[#9B9B9B] text-[0.6rem] lg:text-[0.8rem]">
                <span>투자에 영향을 미칠 수 있는 정보를 볼 수 있습니다.</span>
                <span>종목이 갱신될 때 마다 정보는 초기화 됩니다.</span>
              </div>
              <div className="flex justify-end items-end text-white w-[40%] space-x-2 text-center font-medium text-[0.8rem] lg:text-[1.1rem]">
                <div
                  className="bg-[#A5A5A5] w-[45%] lg:w-[48%] py-[2px] active:scale-105 active:transition duration-300 cursor-pointer rounded-md"
                  aria-label="닫기"
                  onClick={click}>
                  <span>닫기</span>
                </div>
                <div className="bg-black w-[45%] lg:w-[48%] py-[2px] active:scale-105 active:transition duration-300 cursor-pointer rounded-md">
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

export default MobileInfo;
