import React, { useRef, useState, useEffect } from 'react';
import styles from './Lottery.module.css';

interface ErasedPoint {
  x: number;
  y: number;
}

interface Props {
  isDark: boolean;
  result: {
    ranking: number;
    money: number;
  };
  timestamp: number;
  handleCanOpenModal: (canOpenModal: boolean) => void;
}

type DateType = Date | string | number;
const zero = (value: number | string) => (value.toString().length === 1 ? `0${value}` : value);

let dateFormatter = (format: string, date: DateType): string => {
  const _date = new Date(date);

  return format.replace(/(yyyy|mm|dd|MM|DD|H|i|s)/g, (t: string): any => {
    switch (t) {
      case 'yyyy':
        return _date.getFullYear();
      case 'mm':
        return _date.getMonth() + 1;
      case 'dd':
        return _date.getDate();
      case 'MM':
        return zero(_date.getMonth() + 1);
      case 'DD':
        return zero(_date.getDate());
      case 'H':
        return zero(_date.getHours());
      case 'i':
        return zero(_date.getMinutes());
      case 's':
        return zero(_date.getSeconds());
      default:
        return '';
    }
  });
};

function LeftDescription({ isDark }: { isDark: boolean }): JSX.Element {
  return (
    <div
      className={`flex flex-col items-center justify-center w-[160px] h-[240px] md:w-[200px] md:h-[300px] rounded-lg px-2 pt-4 ${
        isDark ? 'bg-pink-100' : 'bg-sky-100'
      }`}>
      <span className={`${styles.font2} text-lg md:text-2xl text-center`}>최대 당첨금</span>
      <span className={`${styles.font2} text-lg md:text-2xl text-center`}>{isDark ? '7억' : '5천만'}원!</span>
      <div className={`${styles.font2} flex flex-col text-[0.6rem] md:text-xs text-start mt-2 md:mt-4 text-[#707070]`}>
        {isDark ? (
          <>
            <span>1등 : 7억 </span>
            <span>2등 : 꽝 </span>
          </>
        ) : (
          <>
            <span>1등 : 5천만원 </span>
            <span>2등 : 3백만원 </span>
            <span>3등 : 50만원 </span>
            <span>4등 : 만원 </span>
            <span>5등 : 꽝 </span>
          </>
        )}
      </div>
      <img
        className="w-[80px] md:w-[120px]"
        src={process.env.REACT_APP_S3_URL + '/images/icons/lottoPig.png'}
        alt="로또"></img>
    </div>
  );
}

function LotteryModal({ isDark, result, timestamp, handleCanOpenModal }: Props): JSX.Element {
  // 발행 일자
  const curTime = dateFormatter('yyyy. MM. DD H:i:s', timestamp);

  // ------- 캔버스 부분 설정 -------
  const [HEIGHT, setHeight] = useState(window.screen.width <= 768 ? 150 : 200);
  const [WIDTH, setWidth] = useState(window.screen.width <= 768 ? 300 : 400);

  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width <= 768) {
        setHeight(150);
        setWidth(300);
      } else {
        setHeight(200);
        setWidth(400);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  const ERASE_RADIUS = 24;
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
    const { offsetX, offsetY } = event.nativeEvent;
    handleDrawing(offsetX, offsetY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
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
    if (!isDrawing) return;

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
    context.font = '16px sans-serif';
    context.fillStyle = '#000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('여기를 긁어보세요', WIDTH / 2, HEIGHT / 2);

    // 자동으로 결과를 보여줄 임계치 설정
    const col = Math.ceil(WIDTH / (ERASE_RADIUS * 2 + ERASE_DISTANCE));
    const row = Math.ceil(HEIGHT / (ERASE_RADIUS * 2 + ERASE_DISTANCE));
    setThresholdOfEraseCount(col * row);
  }, [dpr, ERASE_DISTANCE, WIDTH, HEIGHT]);

  // ------- (끝) 캔버스 부분 설정 -------

  // ------- 화면밖 클릭시 닫힘 설정 -------
  useEffect(() => {
    if (erasedList.length !== 0) {
      handleCanOpenModal(true);
    } else {
      handleCanOpenModal(false);
    }
  }, [erasedList, handleCanOpenModal]);

  return (
    <>
      <div className={`flex max-w-screen-xl mx-auto rounded-lg h-fit border-4`}>
        <LeftDescription isDark={isDark} />
        <div className="flex items-center flex-col justify-center w-[372px] h-[240px] md:w-[466px] md:h-[300px] bg-white rounded-lg">
          <div className="w-11/12 text-right pr-5 text-xs text-[#707070]">발행일시 : {curTime}</div>
          <div className="relative my-2">
            <div
              className={`absolute top-0 left-0 flex items-center flex-col justify-center w-full h-full bg-white rounded-lg border-4 border-[#999]`}>
              <span className={`${styles.font} text-5xl font-bold`}>
                {result.money === 0 ? '꽝' : result.ranking + '등 당첨!'}
              </span>
              <br />
              <span className={`${styles.font} text-xl font-medium`}>
                {result.money === 0 ? '다음 기회에...' : result.money.toLocaleString() + '원을 획득하셨습니다.'}
              </span>
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
          <div className="text-center text-xs font-medium text-[#707070]">
            <span>발행된 복권은 재발급이 불가능합니다.</span>
            <br />
            <span>꼭 화면에서 당첨 여부를 확인하시기 바랍니다.</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LotteryModal;
