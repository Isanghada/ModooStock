import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Bathroom from 'Components/Main/Bathroom';
import styled from './Mypage.module.css';
import MypageInven from './MypageInven';

function Mypage(): JSX.Element {
  const [pos1, setPos1] = useState<string>('0');
  const [pos2, setPos2] = useState<string>('0');
  const [pos3, setPos3] = useState<string>('0');

  const [rot1, setRot1] = useState<string>('0');
  const [rot2, setRot2] = useState<string>('0');
  const [rot3, setRot3] = useState<string>('0');

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const len = target.value as string;
    switch (target.ariaLabel) {
      case 'pos1':
        setPos1(len);
        break;
      case 'pos2':
        setPos2(len);
        break;
      case 'pos3':
        setPos3(len);
        break;
      case 'rot1':
        setRot1(len);
        break;
      case 'rot2':
        setRot2(len);
        break;
      case 'rot3':
        setRot3(len);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="flex items-center w-full h-full justify-evenly">
        <div className="flex justify-evenly items-center w-[65%] h-full relative">
          <div className="absolute flex items-end justify-center w-[85%] top-[56%]">
            <img aria-label="마카롱" className={`object-contain w-full`} src="/images/toys/floor.png" alt="" />
          </div>
          <div className="w-[80%] flex justify-center h-[87%] items-center">
            <Canvas
              style={{ width: '100%', height: '100%', paddingTop: '6%' }}
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
        </div>
        <div className="flex justify-center items-center w-[27%] pb-10">
          <div className="flex flex-col w-full font-extrabold">
            {/* 버튼 */}
            <div className="flex justify-end mb-3 text-white">
              <div className="py-1 px-5 cursor-pointer hover:scale-105 transition-all duration-300 bg-[#EA455D] rounded-full mr-2">
                <span>되팔기</span>
              </div>
              <div className="py-1 px-5 cursor-pointer hover:scale-105 transition-all duration-300 bg-[#EA455D] rounded-full">
                <span>경매장 등록</span>
              </div>
            </div>
            {/* 에셋 이미지 & 위치 조정 및 배치*/}
            <div className="flex flex-col justify-center items-center border-4 border-[#fb7c7c] rounded-3xl text-white mb-10">
              {/* 등급 */}
              <div className="flex justify-start w-full pt-2 pl-2">
                <div className="bg-[#FFC34F] px-7 py-[2px] rounded-full">
                  <span>유니크</span>
                </div>
              </div>
              {/* 에셋 이미지 */}
              <div className="flex justify-center my-2 w-[5rem] h-[10rem] max-w-[5rem] max-h-[10rem]">
                <img src="/images/funitures/funiture.png" alt="가구" />
              </div>
              {/* 포지션 변경 */}
              <div className="flex justify-between w-4/5 py-3 mb-2 text-black">
                {/* Position */}
                <div className="flex flex-col items-start w-[45%] space-y-1 justify-evenly">
                  <div className="flex">
                    <span>POSITION</span>
                  </div>
                  <div className="relative flex items-center w-full space-x-2">
                    <div>
                      <span>X</span>
                    </div>
                    <input
                      aria-label="pos1"
                      className={`flex items-center ${styled.pos1}`}
                      value={pos1}
                      type="range"
                      onChange={change}
                    />
                    <div className="absolute w-[85%] h-2 rounded left-3 bg-[#EAEAEA]">
                      <div className={`bg-[#ffc0c0] h-full rounded-full`} style={{ width: `${pos1}%` }}></div>
                    </div>
                  </div>
                  <div className="relative flex items-center w-full space-x-2">
                    <div>
                      <span>Y</span>
                    </div>
                    <input
                      aria-label="pos2"
                      className={`flex items-center ${styled.pos2}`}
                      value={pos2}
                      type="range"
                      onChange={change}
                    />
                    <div className="absolute w-[85%] h-2 rounded left-3 bg-[#EAEAEA]">
                      <div className={`bg-[#ffedc0] h-full rounded-full`} style={{ width: `${pos2}%` }}></div>
                    </div>
                  </div>
                  <div className="relative flex items-center w-full space-x-2">
                    <div>
                      <span>Z</span>
                    </div>
                    <input
                      aria-label="pos3"
                      className={`flex items-center ${styled.pos3}`}
                      value={pos3}
                      type="range"
                      onChange={change}
                    />
                    <div className="absolute w-[85%] h-2 rounded left-3 bg-[#EAEAEA]">
                      <div className={`bg-[#fffca9] h-full rounded-full`} style={{ width: `${pos3}%` }}></div>
                    </div>
                  </div>
                </div>
                {/* Rotation */}
                <div className="flex flex-col items-start w-[45%] space-y-1 justify-evenly">
                  <div className="flex justify-center">
                    <span>ROTATION</span>
                  </div>
                  <div className="relative flex items-center w-full space-x-2">
                    <div>
                      <span>X</span>
                    </div>
                    <input
                      aria-label="rot1"
                      className={`flex items-center ${styled.rot1}`}
                      value={rot1}
                      type="range"
                      onChange={change}
                    />
                    <div className="absolute w-[85%] h-2 rounded left-3 bg-[#EAEAEA]">
                      <div className={`bg-[#DCFFC0] h-full rounded-full`} style={{ width: `${rot1}%` }}></div>
                    </div>
                  </div>
                  <div className="relative flex items-center w-full space-x-2">
                    <div>
                      <span>Y</span>
                    </div>
                    <input
                      aria-label="rot2"
                      className={`flex items-center ${styled.rot2}`}
                      value={rot2}
                      type="range"
                      onChange={change}
                    />
                    <div className="absolute w-[85%] h-2 rounded left-3 bg-[#EAEAEA]">
                      <div className={`bg-[#C6EEFF] h-full rounded-full`} style={{ width: `${rot2}%` }}></div>
                    </div>
                  </div>
                  <div className="relative flex items-center w-full space-x-2">
                    <div>
                      <span>Z</span>
                    </div>
                    <input
                      aria-label="rot3"
                      className={`flex items-center ${styled.rot3}`}
                      value={rot3}
                      type="range"
                      onChange={change}
                    />
                    <div className="absolute w-[85%] h-2 rounded left-3 bg-[#EAEAEA]">
                      <div className={`bg-[#f0d9ff] h-full rounded-full`} style={{ width: `${rot3}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 버튼 */}
              <div className="flex w-full pb-2 justify-evenly">
                <div className="bg-[#87D21F] py-1 px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                  <span>배치 완료</span>
                </div>
                <div className="bg-[#41A4F7] py-1 px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                  <span>창고에 넣기</span>
                </div>
                <div className="bg-[#E94561] py-1 px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                  <span>취소</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MypageInven />
    </>
  );
}
export default Mypage;
