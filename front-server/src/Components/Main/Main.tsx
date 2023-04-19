import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Bathroom from './Bathroom';
import MyHomeAsset from './MyHomeAsset';

function Main(): JSX.Element {
  return (
    <>
      <div className="absolute flex items-center justify-center w-full h-full border-4">
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
          className="absolute z-10 object-contain w-[13rem] h-[13rem] top-36 right-[14rem]"
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
          className="absolute z-10 object-contain w-[8rem] h-[8rem] top-80 right-[15rem]"
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
          className="absolute z-10 object-contain w-[15rem] h-[15rem] -mb-[25rem] ml-[42rem]"
          src="/images/toys/chart.png"
          alt=""
        />
        <img
          aria-label="가이드"
          className="absolute z-10 object-contain w-[10rem] h-[10rem] -mb-[25rem] left-0 border-4"
          src="/images/toys/guide.png"
          alt=""
        />
      </div>
      <div className="w-full">
        <Canvas
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
          {/* <OrbitControls /> */}
          <ambientLight intensity={0.5} />
          <pointLight distance={2000} position={10} power={8} />
          <Bathroom len={0.0055} pos={[0, -1.3, -8]} rot={[1.75, 0, 0.2]} />
        </Canvas>
      </div>
    </>
  );
}
export default Main;
