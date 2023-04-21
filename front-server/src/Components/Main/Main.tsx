import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import Bathroom from './Bathroom';
import MyHomeAsset from './MyHomeAsset';

function Main(): JSX.Element {
  const [floor, setFloor] = useState(
    window.screen.width <= 1280 ? `${2 + (window.screen.width - 1024) * (1 / 140)}rem` : '4rem'
  );
  const [ishover, setIshover] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    console.log(window.screen.width);
    console.log(window.screen.width - 1024);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.screen.width]);

  const handleResize = () => {
    if (window.screen.width <= 1280) {
      const st = 2 + (window.screen.width - 1024) * (1 / 140);
      setFloor(`${st}rem`);
    } else {
      setFloor('4rem');
    }
  };

  return (
    <>
      {/* 데스크탑 */}
      <div className="items-center justify-between hidden w-full h-full max-w-[1280px] max-h-[1080px] lg:flex">
        {/* 1번 구역 */}
        <div className="flex justify-start items-center w-[28%] h-full">
          <div className="w-[10%]"></div>
          <div className="flex justify-end items-end w-[40%] h-[80%] max-h-[80%]">
            <div className="h-[65%]"></div>
            <div className="h-[15%] animate-moving">
              <img
                aria-label="가이드"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/guide.png"
                alt=""
              />
            </div>
            <div className="h-[20%]"></div>
          </div>
          <div className="w-[50%] h-[80%] max-h-[49rem]">
            <div className="h-[9%]"></div>
            <div className="flex justify-center h-[26%] w-full animate-moving">
              <img
                aria-label="방문하기"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/visit.png"
                alt=""
              />
            </div>
            <div className="h-[5%]"></div>
            <div className="flex justify-center h-[21%] w-full animate-moving">
              <img
                aria-label="경매장"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/auction.png"
                alt=""
              />
            </div>
            <div className="h-[9%]"></div>
            <div className="flex justify-center h-[19%] w-full">
              <img aria-label="게임기" className="z-10 h-full" src="/images/toys/nintendo.png" alt="" />
            </div>
            <div className="h-[5%]"></div>
          </div>
        </div>
        {/* 2번 구역 */}
        <div className="flex items-center justify-center h-full w-[44%] max-h-[49rem] relative">
          {/* 1차 앱솔 */}
          <div className="absolute z-20 flex items-end justify-between w-full h-full">
            {/* 왼쪽 */}
            <div className="flex flex-col items-end justify-start w-1/2 h-[92%]">
              <div className="h-[2%]"></div>
              <div className="flex justify-center h-[20%] w-full animate-moving">
                <img
                  aria-label="은행"
                  className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                  src="/images/toys/bank.png"
                  alt=""
                />
              </div>
              <div className="h-[52%]"></div>
              <div className="flex justify-start h-[15%] w-[82%] animate-moving">
                <img
                  aria-label="뽑기 상점"
                  className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                  src="/images/toys/gatcha.png"
                  alt=""
                />
              </div>
              <div className="w-full h-[11%]"></div>
            </div>
            {/* 오른쪽 */}
            <div className="flex flex-col items-center justify-start w-1/2 h-[92%]">
              <div className="h-[10%]"></div>
              <div className="flex justify-center h-[12%] w-full">
                <img aria-label="말" className="z-10 h-full" src="/images/toys/horse.png" alt="" />
              </div>
              <div className="h-[56%]"></div>
              <div className="flex justify-center h-[14%] w-full">
                <img aria-label="차" className="z-10 h-full pr-20" src="/images/toys/car.png" alt="" />
              </div>
              <div className="h-[8%]"></div>
            </div>
          </div>
          {/* 2차 앱솔 */}
          <div className="absolute z-10 flex items-end justify-start w-[120%] h-[80%]">
            {/* 왼쪽 */}
            <div className="flex flex-col w-[17%] h-full">
              <div className="h-[8%]"></div>
              <div className="flex justify-center h-[17%] w-full">
                <img aria-label="조이스틱" className="z-20 h-full" src="/images/toys/joystic.png" alt="" />
              </div>
              <div className="h-[30%]"></div>
              <div className="flex justify-end h-[17%] w-full">
                <img aria-label="믹스" className="z-20 h-full pr-1" src="/images/toys/mixassets.png" alt="" />
              </div>
              <div className="h-[18%]"></div>
              <div className="flex justify-start h-[7%] w-full">
                <img aria-label="공" className="z-20 h-full" src="/images/toys/one.png" alt="" />
              </div>
              <div className="h-[3%]"></div>
            </div>
            {/* 빈칸 */}
            <div className="w-[36%] h-full"></div>
            {/* 가운데 */}
            <div className="w-[15%] h-full z-30">
              <div className="h-[8%]"></div>
              <div className="flex justify-center h-[7%] w-full">
                <img aria-label="믹스2" className="z-10 h-full" src="/images/toys/mixassets2.png" alt="" />
              </div>
            </div>
            {/* 빈칸 */}
            <div className="w-[17%] h-full"></div>
            {/* 오른쪽 */}
            <div className="w-[15%] h-full">
              <div className="h-[5%]"></div>
              <div className="flex justify-start h-[10%] w-full">
                <img aria-label="게임기" className="z-10 h-full" src="/images/toys/zebra.png" alt="" />
              </div>
              <div className="h-[25%]"></div>
              <div className="flex justify-center h-[10%] w-full">
                <img aria-label="플러스" className="z-10 h-full" src="/images/toys/plus.png" alt="" />
              </div>
              <div className="h-[25%]"></div>
              <div className="flex justify-start h-[14%] w-full">
                <img aria-label="공" className="z-10 h-full" src="/images/toys/ball.png" alt="" />
              </div>
              <div className="h-[11%]"></div>
            </div>
          </div>
          {/* 2번 구역 메인 */}
          <div className="flex justify-center items-center w-full h-[60%] relative min-w-[14.3rem] min-h-[29.4rem]">
            <img
              aria-label="마카롱"
              className={`absolute object-contain scale-110 w-full`}
              src="/images/toys/floor.png"
              alt=""
              style={{ bottom: `-${floor}` }}
            />
            <Canvas
              style={{ width: '100%', height: '100%' }}
              orthographic
              camera={{
                left: -1,
                right: 1,
                top: 1,
                bottom: -1,
                near: 0.1,
                far: 1000,
                zoom: 100
              }}>
              <ambientLight intensity={0.5} />
              <pointLight distance={2000} position={10} power={8} />
              <Bathroom len={0.0055} pos={[0, -1.3, -8]} rot={[1.75, 0, 0.2]} />
            </Canvas>
          </div>
        </div>
        {/* 3번 구역 */}
        <div className="flex justify-start items-center w-[28%] h-full z-20">
          <div className="w-[60%] h-[80%] max-h-[49rem]">
            <div className="h-[10%]"></div>
            <div className="flex justify-center h-[17%] w-full animate-moving">
              <img
                aria-label="정보상"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/info.png"
                alt=""
              />
            </div>
            <div className="h-[6%]"></div>
            <div className="flex justify-center h-[20%] w-full animate-moving">
              <img
                aria-label="랭킹"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/rank.png"
                alt=""
              />
            </div>
            <div className="h-[10%]"></div>
            <div className="flex justify-center h-[35%] w-full animate-moving">
              <img
                aria-label="주식 거래소"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/chart.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* 모바일 */}
      <div className="relative flex flex-col items-center justify-end w-full h-full overflow-y-hidden lg:hidden">
        {/* 메인 */}
        <div className="absolute flex items-end justify-center w-[60%] -bottom-4">
          <img
            aria-label="마카롱"
            className={`object-contain`}
            src="/images/toys/floor.png"
            alt=""
            // style={{ bottom: `-${floor}` }}
          />
        </div>
        <div className="h-[10%]"></div>
        <div className="w-[50%] h-[75%] flex justify-center items-center border-black">
          <Canvas
            style={{ width: '100%', height: '100%' }}
            orthographic
            camera={{
              left: -1,
              right: 1,
              top: 1,
              bottom: -1,
              near: 0.1,
              far: 1000,
              zoom: 100
            }}>
            <ambientLight intensity={0.5} />
            <pointLight distance={2000} position={10} power={8} />
            <Bathroom len={0.0055} pos={[0, -1, -8]} rot={[1.75, 0, 0.2]} />
          </Canvas>
        </div>
        <div className="w-[50%] h-[15%]"></div>
        {/* 라우터 아이콘 */}
        <div className="absolute flex items-center justify-start w-full h-full border-black">
          {/* 1번째 */}
          <div className="flex flex-col items-end w-[11%] h-full">
            <div className="h-[81%]"></div>
            <div className="h-[14%] w-full animate-moving">
              <img
                aria-label="가이드"
                className="z-10 h-full w-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/guide.png"
                alt=""
              />
              <div className="h-[5%]"></div>
            </div>
          </div>
          {/* 2번째 */}
          <div className="flex flex-col w-[18%] h-full">
            <div className="h-[23%] w-full"></div>
            <div className="flex justify-center h-[25%] w-full animate-moving">
              <img
                aria-label="방문하기"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/visit.png"
                alt=""
              />
            </div>
            <div className="h-[5%]"></div>
            <div className="flex justify-start h-[18%] w-full animate-moving">
              <img
                aria-label="경매장"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/auction.png"
                alt=""
              />
            </div>
            <div className="h-[5%]"></div>
            <div className="flex justify-center pr-2 h-[15%] w-full">
              <img aria-label="게임기" className="z-10 h-full" src="/images/toys/nintendo.png" alt="" />
            </div>
            <div className="h-[5%]"></div>
          </div>
          {/* 3번째 */}
          <div className="flex flex-col w-[18%] h-full">
            <div className="h-[12%]"></div>
            <div className="flex justify-center h-[20%] w-full animate-moving">
              <img
                aria-label="은행"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/bank.png"
                alt=""
              />
            </div>
            <div className="h-[52%]"></div>
            <div className="flex justify-start h-[15%] w-[82%] animate-moving">
              <img
                aria-label="뽑기 상점"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/gatcha.png"
                alt=""
              />
            </div>
          </div>
          {/* 빈칸 */}
          <div className="w-[29%] h-full"></div>
          {/* 4번째 */}
          <div className="w-[15%] h-full">
            <div className="h-[20%]"></div>
            <div className="flex justify-center h-[17%] w-full animate-moving">
              <img
                aria-label="정보상"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/info.png"
                alt=""
              />
            </div>
            <div className="h-[7%]"></div>
            <div className="flex justify-center h-[19%] w-full animate-moving">
              <img
                aria-label="랭킹"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/rank.png"
                alt=""
              />
            </div>
            <div className="h-[7%]"></div>
            <div className="flex justify-center h-[25%] w-full animate-moving">
              <img
                aria-label="주식 거래소"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src="/images/toys/chart.png"
                alt=""
              />
            </div>
            <div className="h-[5%]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
