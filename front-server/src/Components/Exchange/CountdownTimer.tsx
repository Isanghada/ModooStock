import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface CountdownTimerType {
  setIsPossibleStockTime: Dispatch<SetStateAction<boolean>>;
  isPossibleStockTime: boolean;
}

function CountdownTimer({ setIsPossibleStockTime, isPossibleStockTime }: CountdownTimerType) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [displayTime, setDisplayTime] = useState<string>('');

  // 요일에 따른 시간 출력 포맷 설정
  const format = (d: Date): string => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[d.getDay()];
    const hours = d.getHours();

    if (dayOfWeek === '일') {
      setIsPossibleStockTime(false);
      return '00 : 00 : 00';
    } else if (dayOfWeek === '월' || dayOfWeek === '수' || dayOfWeek === '금') {
      if (hours >= 10 && hours < 22) {
        if (!isPossibleStockTime) {
          setIsPossibleStockTime(true);
        }
        return `${22 - hours - 1 + 12} : ${
          (60 - d.getMinutes() - 1).toString().length === 1 ? `0${60 - d.getMinutes() - 1}` : 60 - d.getMinutes() - 1
        } : ${
          (60 - d.getSeconds() - 1).toString().length === 1 ? `0${60 - d.getSeconds() - 1}` : 60 - d.getSeconds() - 1
        }`;
      } else if (hours < 10) {
        if (isPossibleStockTime) {
          setIsPossibleStockTime(false);
        }
        return '24 : 00 : 00';
      } else {
        if (isPossibleStockTime) {
          setIsPossibleStockTime(false);
        }
        return '12 : 00 : 00';
      }
    } else {
      if (hours >= 10 && hours < 22) {
        if (!isPossibleStockTime) {
          setIsPossibleStockTime(true);
        }
        return `${22 - hours - 1} : ${
          (60 - d.getMinutes() - 1).toString().length === 1 ? `0${60 - d.getMinutes() - 1}` : 60 - d.getMinutes() - 1
        } : ${
          (60 - d.getSeconds() - 1).toString().length === 1 ? `0${60 - d.getSeconds() - 1}` : 60 - d.getSeconds() - 1
        }`;
      } else if (hours < 10) {
        if (isPossibleStockTime) {
          setIsPossibleStockTime(false);
        }
        return '12 : 00 : 00';
      } else {
        if (isPossibleStockTime) {
          setIsPossibleStockTime(false);
        }
        return '00 : 00 : 00';
      }
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    setDisplayTime(format(currentTime));
  }, [currentTime]);

  return <div>{displayTime}</div>;
}

export default CountdownTimer;
