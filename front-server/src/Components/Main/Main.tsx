import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import Bathroom from './Bathroom';
import MyHomeAsset from './MyHomeAsset';

function Main(): JSX.Element {
  const [floor, setFloor] = useState(
    window.screen.width <= 1280
      ? `${2 + (window.screen.width - 1024) * (1 / 140)}rem`
      : '4rem'
  );

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
      {/* <div className="absolute flex items-center justify-center w-full h-full border-4">
        <img
          aria-label="마카롱"
          className="absolute object-contain scale-110 mt-[21rem]"
          src="/images/toys/floor.png"
          alt=""
        />
        <img
          aria-label="은행"
          className="absolute z-10 object-contain w-[11rem] h-[11rem] top-20 right-1/2"
          src="/images/toys/bank.png"
          alt=""
        />
        <img
          aria-label="정보상"
          className="absolute z-10 object-contain w-[13rem] h-[13rem] top-32 right-[14rem]"
          src="/images/toys/info.png"
          alt=""
        />
        <img
          aria-label="방문하기"
          className="absolute z-10 object-contain w-[13rem] h-[13rem] top-44 left-56"
          src="/images/toys/visit.png"
          alt=""
        />
        <img
          aria-label="랭킹"
          className="absolute z-10 object-contain w-[9rem] h-[9rem] top-80 right-[15rem]"
          src="/images/toys/rank.png"
          alt=""
        />
        <img
          aria-label="경매장"
          className="absolute z-10 object-contain w-[15rem] h-[15rem] top-80 left-52"
          src="/images/toys/auction.png"
          alt=""
        />
        <img
          aria-label="뽑기상점"
          className="absolute z-10 object-contain w-[12rem] h-[12rem] bottom-0 right-1/2"
          src="/images/toys/gatcha.png"
          alt=""
        />
        <img
          aria-label="주식거래소"
          className="absolute z-10 object-contain w-[15rem] h-[15rem] bottom-10 right-44"
          src="/images/toys/chart.png"
          alt=""
        />
        <img
          aria-label="가이드"
          className="absolute left-0 z-10 object-contain w-[10rem] h-[10rem] bottom-0"
          src="/images/toys/guide.png"
          alt=""
        />
      </div>*/}

      <div className="items-center justify-between hidden w-full h-full max-w-screen-xl lg:flex">
        {/* 1번 구역 */}
        <div className="flex justify-center items-end w-[28%] h-full">
          <div className="flex justify-between h-[87%] w-full">
            <div className="flex flex-col justify-end items-start w-[40%] h-full border-black">
              <div className="w-full h-4/5"></div>
              <div className="h-auto">
                <img
                  aria-label="가이드"
                  className="z-10"
                  src="/images/toys/guide.png"
                  alt=""
                />
              </div>
              <div className="h-[3%]"></div>
            </div>
            <div className="flex flex-col items-center justify-start w-[45%] h-full ">
              {/* 빈칸 */}
              <div className="h-[5%]"></div>
              {/* 방문하기 */}
              <div className="relative flex justify-end h-[30%]">
                <img
                  aria-label="방문하기"
                  className="z-10 h-full"
                  src="/images/toys/visit.png"
                  alt=""
                />
              </div>
              {/* 빈칸 */}
              <div className="h-[3%]"></div>
              {/* 경매장 */}
              <div className="relative w-full h-[23%]">
                <img
                  aria-label="경매장"
                  className="z-10 h-full "
                  src="/images/toys/auction.png"
                  alt=""
                />
              </div>
              {/* 빈칸 */}
              <div className="h-[7%]"></div>
              <div className="relative w-full h-[18%] flex justify-end">
                <img
                  aria-label="게임기"
                  className="z-10 h-full"
                  src="/images/toys/nintendoBorder.png"
                  alt=""
                />
              </div>
              {/* 빈칸 */}
              <div className="h-auto"></div>
            </div>
          </div>
        </div>
        {/* 2번 구역 */}
        <div className="flex items-center justify-center h-full w-[44%] max-h-[49rem] relative">
          <div className="absolute z-10 flex items-end justify-between w-full h-full ">
            <div className="flex flex-col items-end justify-start w-1/2 h-[92%]">
              <div className="flex justify-center h-[22%] w-full">
                <img
                  aria-label="가이드"
                  className="z-10 h-full"
                  src="/images/toys/bank.png"
                  alt=""
                />
              </div>
              <div className="h-[52%]"></div>
              <div className="flex justify-start h-[18%] w-[82%]">
                <img
                  aria-label="가이드"
                  className="z-10 h-full"
                  src="/images/toys/gatcha.png"
                  alt=""
                />
              </div>
              <div className="w-full h-[6%]"></div>
            </div>
            <div className="flex flex-col items-center justify-start w-1/2 h-full">
              <div></div>
              <div></div>
            </div>
          </div>
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
        <div className="flex justify-start items-center w-[28%] h-full">
          <div className="w-[60%] h-[80%]">
            <div className="h-[15%]"></div>
            <div className="flex justify-center h-[17%] w-full">
              <img
                aria-label="가이드"
                className="z-10 h-full"
                src="/images/toys/info.png"
                alt=""
              />
            </div>
            <div className="h-[6%]"></div>
            <div className="flex justify-center h-[23%] w-full">
              <img
                aria-label="가이드"
                className="z-10 h-full"
                src="/images/toys/rank.png"
                alt=""
              />
            </div>
            <div className="h-[10%]"></div>
            <div className="flex justify-center h-[30%] w-full">
              <img
                aria-label="가이드"
                className="z-10 h-full"
                src="/images/toys/chart.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
