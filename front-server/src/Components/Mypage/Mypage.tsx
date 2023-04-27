import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Bathroom from 'Components/Main/Bathroom';
import styled from './Mypage.module.css';
import MypageInven from './MypageInven';

function Mypage(): JSX.Element {
  const [isModalClick, setIsModalClick] = useState<boolean>(false);
  const [isAuction, setIsAuction] = useState<boolean>(false);

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

  const click = (e: React.MouseEvent) => {
    if (e.currentTarget.ariaLabel === '모달') {
      setIsModalClick((pre) => !pre);
    } else if (e.currentTarget.ariaLabel === '경매장') {
      setIsAuction((pre) => !pre);
    } else if (e.currentTarget.ariaLabel === '판매등록') {
      setIsModalClick((pre) => !pre);
      setIsAuction((pre) => !pre);
    }
  };

  const Auction = () => {
    const ref = useRef(null);
    return (
      <>
        <div
          ref={ref}
          className="fixed flex items-center z-50 justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 pt-5 lg:pt-0"
          onClick={(e) => {
            if (e.target === ref.current) {
              setIsModalClick((pre) => !pre);
            }
          }}>
          <div className="bg-[#FEF3F3] border-[#D9D9D9] border-2 flex flex-col max-w-[32rem] min-w-[32rem] lg:max-w-[32rem] lg:min-w-[32rem] w-[33%] rounded-lg px-10 py-4">
            <div className="flex flex-col items-center w-full py-2 border-b-2">
              <span className="text-[1rem] lg:text-[1.2rem] font-semibold">경매장</span>
              <span aria-label="모달" className="font-bold text-[1.2rem] lg:text-[1.5rem]" onClick={click}>
                판매 아이템 등록
              </span>
            </div>
            <div className="flex justify-center w-full py-4 space-x-6">
              <div className="flex justify-center items-center w-[35%] bg-white rounded-lg">
                <img
                  className="w-[4rem] h-[9rem] lg:w-[4.5rem] lg:h-[10rem] pb-2"
                  src="/images/funitures/funiture.png"
                  alt="가구"
                />
              </div>
              <div className="flex justify-start items-start flex-col w-[55%] space-y-2">
                <div className="bg-[#FFC34F] px-4 py-[1px] text-[0.8rem] lg:text-[1rem] font-semibold text-white rounded-xl">
                  <span>유니크</span>
                </div>
                <div className="flex flex-col w-full space-y-1">
                  <div className="text-[0.9rem] lg:text-[1rem] font-semibold">
                    <span>가격</span>
                  </div>
                  <div>
                    <input
                      className="border-[#FDE2E2] py-[2px] lg:py-1 border-2 rounded-md outline-none pl-2 text-[0.8rem] lg:text-[0.9rem]"
                      type="text"
                      placeholder="판매 가격"
                    />
                  </div>
                  <div className="w-full flex flex-col text-[0.7rem] space-y-1 lg:text-[0.85em] text-[#8A8A8A] leading-4">
                    <span>등록시간은 6시간입니다.</span>
                    <span>미판매시 자도응로 창고에 저장됩니다.</span>
                  </div>
                </div>
                <div className="flex w-full space-x-2 text-[0.9rem] lg:text-[1.1rem] text-center font-bold text-white">
                  <div
                    aria-label="모달"
                    className="bg-[#858484] cursor-pointer hover:bg-[#6a6868] hover:scale-105 active:bg-[#6a6868] active:scale-105 transition-all duration-300 py-1 w-1/2 rounded-md"
                    onClick={click}>
                    <span>닫기</span>
                  </div>
                  <div
                    aria-label="판매등록"
                    className="bg-[#fa5353] cursor-pointer hover:bg-[#fd3434] hover:scale-105 active:bg-[#fd3434] active:scale-105 transition-all duration-300 py-1 w-1/2 rounded-md"
                    onClick={click}>
                    <span>판매 등록</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isModalClick && <Auction />}
      {/* 데스크탑 */}
      <div className="hidden items-center w-full h-full justify-evenly max-w-[80rem] min-h-[43rem] max-h-[46.5rem] my-auto mx-auto lg:flex">
        <div className="flex justify-center items-center w-[65%] h-full relative">
          <div className="absolute flex items-end justify-center lg:w-[95%] xl:w-[85%] top-[56%]">
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
        <div className="flex justify-center items-center lg:w-[33%] lg:pr-[2%] xl:pr-0 xl:w-[27%] pb-10">
          <div className="flex flex-col w-full font-extrabold">
            {/* 버튼 */}
            {/* 에셋 이미지 & 위치 조정 및 배치*/}
            <div className="flex flex-col justify-center items-center border-4 border-[#fb7c7c] rounded-3xl text-white mb-10">
              {/* 등급 */}
              <div className="flex items-center justify-between w-full px-2 py-2">
                <div className="bg-[#FFC34F] drop-shadow-lg px-7 py-[2.5px] rounded-full">
                  <span>유니크</span>
                </div>
                {isAuction !== true ? (
                  <div className="flex items-center justify-between text-white">
                    <div className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg bg-[#EA455D] rounded-full mr-1">
                      <span>되팔기</span>
                    </div>
                    <div className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg bg-[#EA455D] rounded-full">
                      <span aria-label="모달" onClick={click}>
                        경매장 등록
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              {/* 에셋 이미지 */}
              <div className="flex justify-center my-2 w-[5rem] h-[10rem] max-w-[5rem] max-h-[10rem]">
                <img className="drop-shadow-lg" src="/images/funitures/funiture.png" alt="가구" />
              </div>
              {/* 포지션 변경 */}
              {isAuction !== true ? (
                // 인벤토리에 있을 경우
                <>
                  <div className="flex justify-between w-full px-5 py-3 mb-2 text-black">
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
                        <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
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
                        <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
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
                        <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
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
                        <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
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
                        <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
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
                        <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
                          <div className={`bg-[#f0d9ff] h-full rounded-full`} style={{ width: `${rot3}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 버튼 */}
                  <div className="flex w-full pb-2 justify-evenly">
                    <div className="bg-[#87D21F] py-1 drop-shadow-lg px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                      <span>배치 완료</span>
                    </div>
                    <div className="bg-[#41A4F7] py-1 drop-shadow-lg px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                      <span>창고에 넣기</span>
                    </div>
                    <div className="bg-[#E94561] py-1 drop-shadow-lg px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                      <span>취소</span>
                    </div>
                  </div>
                </>
              ) : (
                // 경매장에 등록했을 때
                <div className="flex flex-col w-full px-5 py-4 mb-2 space-y-4 font-extrabold text-black">
                  <div className="flex flex-col w-full space-y-2 text-[#707070]">
                    <div className="justify-center w-full text-center">
                      <span>경매장에서 판매중인 아이템입니다.</span>
                    </div>
                    <div className="flex items-end justify-center w-full space-x-2 text">
                      <span className="text-black">가격:</span>
                      <span className="font-medium">20,000,000</span>
                      <span className="text-black">원</span>
                    </div>
                    <div className="flex items-end justify-center w-full space-x-2 text">
                      <span className="text-black">마감일:</span>
                      <span className="font-medium">2023.04.18</span>
                      <span className="font-medium">21:04</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <span
                      aria-label="경매장"
                      className="px-5 py-1 rounded-full bg-[#EA455D] text-white text-[1.1rem] hover:scale-105 hover:transition duration-300"
                      onClick={click}>
                      판매 취소
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 모바일 */}
      <div className="relative flex items-center justify-between w-full h-full overflow-y-hidden max-w-[41.6rem] md:max-w-[50rem] max-h-[23.4rem] lg:hidden mx-auto my-auto">
        <div className="flex justify-evenly items-center w-[65%] md:w-[58%] h-full relative">
          <div className="absolute flex items-end justify-center lg:w-[95%] xl:w-[85%] top-[56%]">
            <img aria-label="마카롱" className={`object-contain w-full`} src="/images/toys/floor.png" alt="" />
          </div>
          <div className="w-[80%] flex justify-center h-[87%] items-center">
            <Canvas
              style={{ width: '100%', height: '100%', paddingBottom: '20%' }}
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
        <div className="md:w-[12%]"></div>
        <div className="flex flex-col justify-center w-[35%] md:w-[30%] pt-16 font-extrabold">
          {/* 에셋 이미지 & 위치 조정 및 배치*/}
          <div className="flex flex-col justify-center items-center absolute border-[3px] border-[#fb7c7c] rounded-2xl text-white mb-10">
            {/* 등급 */}
            <div className="flex justify-between w-full pt-2 pl-1 pb-1 text-[0.65rem]">
              <div className="bg-[#FFC34F] drop-shadow-lg px-[0.8rem] py-[3px] rounded-full">
                <span>유니크</span>
              </div>
              {isAuction ? null : (
                <div className="flex pr-1">
                  <div className="py-[3px] px-[0.7rem] cursor-pointer hover:scale-105 transition-all duration-300 bg-[#EA455D] drop-shadow-lg rounded-full mr-[2px]">
                    <span>되팔기</span>
                  </div>
                  <div className="py-[3px] px-[0.7rem] cursor-pointer hover:scale-105 transition-all duration-300 bg-[#EA455D] drop-shadow-lg rounded-full">
                    <span aria-label="모달" onClick={click}>
                      경매장 등록
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* 에셋 이미지 */}
            <div className="flex justify-center my-1 w-[2.8rem] h-[5rem] md:my-2 md:w-[3rem] md:h-[6rem]">
              <img className="drop-shadow-lg" src="/images/funitures/funiture.png" alt="가구" />
            </div>
            {isAuction ? (
              // 경매장에 등록했을 때
              <div className="flex flex-col w-full px-[1.2rem] pt-[0.68rem] pb-4 mb-1 space-y-2 font-extrabold text-black">
                <div className="flex flex-col w-full space-y-2 text-[#707070] text-[0.825rem]">
                  <div className="justify-center w-full text-center ">
                    <span>경매장에서 판매중인 아이템입니다.</span>
                  </div>
                  <div className="flex items-end justify-center w-full space-x-2 text">
                    <span className="text-black">가격:</span>
                    <span className="font-medium">20,000,000</span>
                    <span className="text-black">원</span>
                  </div>
                  <div className="flex items-end justify-center w-full space-x-2 text">
                    <span className="text-black">마감일:</span>
                    <span className="font-medium">2023.04.18</span>
                    <span className="font-medium">21:04</span>
                  </div>
                </div>
                <div className="flex justify-center w-full pt-1">
                  <span
                    aria-label="경매장"
                    className="px-5 py-1 rounded-full bg-[#EA455D] text-white text-[0.8rem] hover:scale-105 hover:transition duration-300"
                    onClick={click}>
                    판매 취소
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* 포지션 변경 */}
                <div className="flex justify-between w-4/5 py-3 mb-2 text-black text-[0.6rem]">
                  {/* Position */}
                  <div className="flex flex-col items-start w-[45%] space-y-2 justify-evenly">
                    <div className="flex">
                      <span>POSITION</span>
                    </div>
                    <div className="relative flex items-center w-full space-x-2">
                      <div>
                        <span>X</span>
                      </div>
                      <input
                        aria-label="pos1"
                        className={`flex items-center ${styled.sPos1}`}
                        value={pos1}
                        type="range"
                        onChange={change}
                      />
                      <div className="absolute w-[72%] lg:w-[72%] h-[8px] rounded left-3 bg-[#EAEAEA]">
                        <div className={`bg-[#ffc0c0] h-full rounded-full`} style={{ width: `${pos1}%` }}></div>
                      </div>
                    </div>
                    <div className="relative flex items-center w-full space-x-2">
                      <div>
                        <span>Y</span>
                      </div>
                      <input
                        aria-label="pos2"
                        className={`flex items-center ${styled.sPos2}`}
                        value={pos2}
                        type="range"
                        onChange={change}
                      />
                      <div className="absolute w-[72%] h-[8px] rounded left-3 bg-[#EAEAEA]">
                        <div className={`bg-[#ffedc0] h-full rounded-full`} style={{ width: `${pos2}%` }}></div>
                      </div>
                    </div>
                    <div className="relative flex items-center w-full space-x-2">
                      <div>
                        <span>Z</span>
                      </div>
                      <input
                        aria-label="pos3"
                        className={`flex items-center ${styled.sPos3}`}
                        value={pos3}
                        type="range"
                        onChange={change}
                      />
                      <div className="absolute w-[72%] h-[8px] rounded left-3 bg-[#EAEAEA]">
                        <div className={`bg-[#fffca9] h-full rounded-full`} style={{ width: `${pos3}%` }}></div>
                      </div>
                    </div>
                  </div>
                  {/* Rotation */}
                  <div className="flex flex-col items-start w-[45%] space-y-2 justify-evenly">
                    <div className="flex justify-center">
                      <span>ROTATION</span>
                    </div>
                    <div className="relative flex items-center w-full space-x-2">
                      <div>
                        <span>X</span>
                      </div>
                      <input
                        aria-label="rot1"
                        className={`flex items-center ${styled.sRot1}`}
                        value={rot1}
                        type="range"
                        onChange={change}
                      />
                      <div className="absolute w-[72%] h-[8px] rounded left-3 bg-[#EAEAEA]">
                        <div className={`bg-[#DCFFC0] h-full rounded-full`} style={{ width: `${rot1}%` }}></div>
                      </div>
                    </div>
                    <div className="relative flex items-center w-full space-x-2">
                      <div>
                        <span>Y</span>
                      </div>
                      <input
                        aria-label="rot2"
                        className={`flex items-center ${styled.sRot2}`}
                        value={rot2}
                        type="range"
                        onChange={change}
                      />
                      <div className="absolute w-[72%] h-[8px] rounded left-3 bg-[#EAEAEA]">
                        <div className={`bg-[#C6EEFF] h-full rounded-full`} style={{ width: `${rot2}%` }}></div>
                      </div>
                    </div>
                    <div className="relative flex items-center w-full space-x-2">
                      <div>
                        <span>Z</span>
                      </div>
                      <input
                        aria-label="rot3"
                        className={`flex items-center ${styled.sRot3}`}
                        value={rot3}
                        type="range"
                        onChange={change}
                      />
                      <div className="absolute w-[72%] h-[8px] rounded left-3 bg-[#EAEAEA]">
                        <div className={`bg-[#f0d9ff] h-full rounded-full`} style={{ width: `${rot3}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 버튼 */}
                <div className="flex w-full pb-2 justify-evenly text-[0.65rem]">
                  <div className="bg-[#E94561] drop-shadow-lg py-[3px] px-[0.85rem] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span>취소</span>
                  </div>
                  <div className="bg-[#41A4F7] drop-shadow-lg py-[3px] px-[0.85rem] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span>창고에 넣기</span>
                  </div>
                  <div className="bg-[#87D21F] drop-shadow-lg py-[3px] px-[0.85rem] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span>배치 완료</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <MypageInven />
    </>
  );
}
export default Mypage;
