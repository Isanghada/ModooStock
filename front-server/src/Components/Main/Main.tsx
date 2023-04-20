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
      <div className="items-center justify-between hidden w-full h-full max-w-screen-xl lg:flex">
        <div className="flex justify-between items-center w-[28%] h-full">
          <div className='flex justify-start items-end w-[40%] h-[80%] max-h-[49rem]'>
            <div className="h-auto pb-5">
              <img
                aria-label="가이드"
                className="z-10"
                src="/images/toys/guide.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-[50%] h-[80%] max-h-[49rem]">
            <div className="h-[20%]"></div>
            <div className="flex justify-center h-[15%] w-full">
              <img
                  aria-label="방문하기"
                  className="z-10 h-full scale-150"
                  src="/images/toys/visit.png"
                  alt=""
                />
            </div>
            <div className="h-[6%]"></div>
            <div className="flex justify-center h-[18%] w-full">
              <img
                aria-label="경매장"
                className="z-10 h-full scale-90"
                src="/images/toys/auction.png"
                alt=""
              />
            </div>
            <div className="h-[10%]"></div>
            <div className="flex justify-center h-[15%] w-full">
              <img
                aria-label="게임기"
                className="z-10 h-full"
                src="/images/toys/nintendoBorder.png"
                alt=""
              />
            </div>
            <div className="h-[10%]"></div>
          </div>
        </div>
        {/* 2번 구역 */}
        <div className="flex items-center justify-center h-full w-[44%] max-h-[49rem] relative">
          <div className="absolute z-10 flex items-end justify-between w-full h-full">
            <div className="flex flex-col items-end justify-start w-1/2 h-[92%]">
              <div className="flex justify-center h-[22%] w-full">
                <img
                  aria-label="은행"
                  className="z-10 h-full"
                  src="/images/toys/bank.png"
                  alt=""
                />
              </div>
              <div className="h-[52%]"></div>
              <div className="flex justify-start h-[15%] w-[82%]">
                <img
                  aria-label="뽑기 상점"
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
          <div className="w-[60%] h-[80%] max-h-[49rem]">
            <div className="h-[20%]"></div>
            <div className="flex justify-center h-[15%] w-full">
              <img
                aria-label="정보"
                className="z-10 h-full scale-90"
                src="/images/toys/info.png"
                alt=""
              />
            </div>
            <div className="h-[6%]"></div>
            <div className="flex justify-center h-[18%] w-full">
              <img
                aria-label="랭킹"
                className="z-10 h-full scale-90"
                src="/images/toys/rank.png"
                alt=""
              />
            </div>
            <div className="h-[10%]"></div>
            <div className="flex justify-center h-[25%] w-full">
              <img
                aria-label="주식 거래소"
                className="z-10 h-full scale-90"
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
