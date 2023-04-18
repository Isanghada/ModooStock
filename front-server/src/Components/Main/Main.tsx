import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Bathroom from './Bathroom';
import MyHomeAsset from './MyHomeAsset';

function Main(): JSX.Element {
  return (
    <>
      <div className="absolute flex items-center justify-center w-full bottom-[16%]">
        <img
          className="object-contain scale-125"
          src="/images/toys/floor2.png"
          alt=""
        />
      </div>
      <div className="w-full">
        {/* <Bathroom /> */}
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight distance={2000} position={10} power={8} />

          {/* <Bathroom len={0.02} pos={[-0.2, 0, -15]} rot={[2.15, 0, 0.5]} /> */}
          <Bathroom len={0.008} pos={[-0.2, -1.5, -1.8]} rot={[1.6, 0, 0]} />
          {/* <MyHomeAsset len={0.008} pos={[-0.2, -1.5, -1.8]} rot={[1.6, 0, 0]} /> */}
        </Canvas>
      </div>
    </>
  );
}
export default Main;
