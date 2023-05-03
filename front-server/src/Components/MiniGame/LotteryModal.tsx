import React, { useRef, useState, useEffect } from 'react';
import styles from './Lottery.module.css';

interface ErasedPoint {
  x: number;
  y: number;
}

// 임시 목업 data
const result = {
  data: {
    ranking: 4,
    money: 10000
  },
  result: 'SUCCESS'
};

function LeftDescription(): JSX.Element {
  return (
    <div className={`flex items-center flex-col justify-center w-[200px] h-[300px] bg-white rounded-lg`}>왼쪽 그림</div>
  );
}

const LotteryModal = () => {
  const WIDTH = 400;
  const HEIGHT = 200;
  const ERASE_RADIUS = 30;
  const ERASE_DISTANCE = ERASE_RADIUS / 2; // 지워진 영역(투명한 원)간 임의 간격
  const dpr = window.devicePixelRatio;
  const canvasTop = useRef<number>(0);
  const canvasLeft = useRef<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [erasedList, setErasedList] = useState<ErasedPoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [thresholdOfEraseCount, setThresholdOfEraseCount] = useState(0);

  const handleDrawingStart = () => {
    setIsDrawing(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const { offsetX, offsetY } = event.nativeEvent;
    handleDrawing(offsetX, offsetY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const { clientX, clientY } = event.changedTouches[0];
    const { top, left } = canvasRef.current!.getBoundingClientRect();
    handleDrawing(clientX - left, clientY - top);
  };

  const drawTransparentCircle = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, ERASE_RADIUS, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
    context.restore();

    const checkList = erasedList.filter(({ x: posX, y: posY }) => {
      const distX = posX - x;
      const distY = posY - y;
      return Math.sqrt(distX * distX + distY * distY) < ERASE_RADIUS + ERASE_DISTANCE;
    });
    if (!checkList.length) {
      setErasedList([...erasedList, { x, y }]);
    }
  };

  const handleDrawing = (x: number, y: number) => {
    if (isDrawing) {
      if (erasedList.length < thresholdOfEraseCount) {
        drawTransparentCircle(x, y);
      } else {
        if (!isRevealed) {
          if (!canvasRef.current) return;
          const context = canvasRef.current.getContext('2d');
          if (!context) return;
          context.clearRect(0, 0, WIDTH, HEIGHT);
          setIsRevealed(true);
        }
      }
    }
  };

  const handleDrawingEnd = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas?.getContext('2d');
    if (!context) return;

    canvasTop.current = canvas.getBoundingClientRect().top;
    canvasLeft.current = canvas.getBoundingClientRect().left;

    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    context.scale(dpr, dpr);

    // 회색 배경으로 덮기
    context.strokeStyle = '#999';
    context.fillStyle = '#999';
    context.beginPath();
    context.roundRect(0, 0, WIDTH, HEIGHT, 8);
    context.stroke();
    context.fill();

    // 안내 문구 추가
    context.font = '20px sans-serif';
    context.fillStyle = '#000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('여기를 긁어보세요', WIDTH / 2, HEIGHT / 2);

    // 자동으로 결과를 보여줄 임계치 설정
    const col = Math.ceil(WIDTH / (ERASE_RADIUS * 2 + ERASE_DISTANCE));
    const row = Math.ceil(HEIGHT / (ERASE_RADIUS * 2 + ERASE_DISTANCE));
    setThresholdOfEraseCount(col * row);
  }, [dpr, ERASE_DISTANCE]);

  return (
    <>
      <div className={`flex max-w-screen-xl mx-auto rounded-lg h-fit border-4`}>
        <LeftDescription />
        <div className="flex items-center flex-col justify-center w-[466px] h-[300px] bg-white rounded-lg">
          <div className="w-11/12 text-right">발행일시 : </div>
          <div className="relative">
            <div
              className={`absolute top-0 left-0 flex items-center flex-col justify-center w-full h-[${HEIGHT}px] bg-white rounded-lg`}>
              <span className={`${styles.font} text-3xl font-bold`}>{result.data.ranking}등 당첨!</span>
              <br />
              <span className={`${styles.font} text-xl font-medium`}>{result.data.money}원를 획득하셨습니다.</span>
            </div>
            <canvas
              className="relative"
              ref={canvasRef}
              onMouseDown={handleDrawingStart}
              onTouchStart={handleDrawingStart}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseUp={handleDrawingEnd}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LotteryModal;
