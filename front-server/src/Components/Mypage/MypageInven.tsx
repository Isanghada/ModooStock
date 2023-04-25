import styled from './Mypage.module.css';
import { useRef, useState } from 'react';

function MypageInven(): JSX.Element {
  const containerRef = useRef<any>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const funitureList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((funiture, idx) => {
    return (
      <div
        key={idx}
        className="flex flex-col justify-between items-center w-[5rem] lg:w-[10rem] h-[85%] my-auto border-2 border-[#F0EBE3] rounded-2xl mx-2 bg-[#FFFFFF] hover:scale-105 transition-all duration-500 cursor-pointer hover:drop-shadow-lg hover:border-[#fb7c7c]/40 hover:border-[3px]">
        {/* 이미지 */}
        <div className="flex justify-center w-[50%] h-[75%] mb-1">
          <img className="h-full" src="/images/funitures/funiture.png" alt="asdsd" />
        </div>
        {/* 희귀도 */}
        <div className="bg-[#FFC34F] px-7 mb-[5%] rounded-full font-extrabold hidden lg:flex">
          <span>유니크</span>
        </div>
      </div>
    );
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log('마우스 다운', e);

    setDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const dx = x - startX;
    containerRef.current.scrollLeft = scrollLeft - dx;
  };
  return (
    <>
      <div className="absolute flex flex-start w-full mx-auto h-[5.7rem] lg:h-[11rem] bg-[#FFFFFF]/40 bottom-0 z-10 text-white ">
        {/* 가구 섹션 */}
        <div className="flex flex-col text-center justify-center text-white w-[8%] lg:w-[9%] text-[0.7rem] lg:text-[1rem] font-extrabold">
          <div className="w-full my-[1px] lg:py-1 bg-[#FB6B9F] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <span>ALL</span>
          </div>
          <div className="w-full my-[1px] lg:py-1 bg-[#FB8B2D] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <span>가구</span>
          </div>
          <div className="w-full my-[1px] lg:py-1 bg-[#D46AED] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <span>소품</span>
          </div>
          <div className="w-full my-[1px] lg:py-1 bg-[#2E94E8] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <span>기타</span>
          </div>
        </div>
        <div className="w-[2%]"></div>
        {/* 가구 목록 */}

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex scroll-container justify-start w-[84%] h-full flex-nowrap overflow-x-auto ${styled.scroll}`}>
          <div className="flex justify-start">{funitureList}</div>
        </div>
      </div>
    </>
  );
}
export default MypageInven;
