import { useEffect, useState } from 'react';

function CountdownTimeMinute(): JSX.Element {
  const date = new Date();
  const [time, setTime] = useState<{ minutes: number; seconds: number }>({
    minutes: 4 - ((date.getMinutes() % 4) % 4) - 1,
    seconds: 60 - date.getSeconds() - 1
  });
  const day = date.getDay();

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (day === 0) {
      setTime({ minutes: 0, seconds: 0 });
    } else {
      if (hours < 10 || hours > 22) {
        setTime({ minutes: 4, seconds: 0 });
      } else {
        setTime({
          minutes: 4 - ((minutes % 4) % 4) - 1,
          seconds: 60 - date.getSeconds() - 1
        });
        const intervalId = setInterval(() => {
          setTime((preTime) => {
            const { minutes, seconds } = preTime;
            if (minutes === 0 && seconds === 0) {
              return { minutes: 3, seconds: 59 };
            } else {
              if (minutes !== 0 && seconds === 0) {
                return { minutes: minutes - 1, seconds: 59 };
              } else {
                return { minutes: minutes, seconds: seconds - 1 };
              }
            }
          });
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, []);
  return (
    <>
      {time.minutes.toString().padStart(2, '0')}&nbsp;:&nbsp;{time.seconds.toString().padStart(2, '0')}
    </>
  );
}

export default CountdownTimeMinute;
