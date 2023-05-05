import { useEffect, useState } from 'react';

function CountdownTimeMinute(): JSX.Element {
  const date = new Date();
  const [time, setTime] = useState<{ minutes: number; seconds: number }>({
    minutes: 4 - ((date.getMinutes() % 4) % 4) - 1,
    seconds: 60 - date.getSeconds() - 1
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((preTime) => {
        const { minutes, seconds } = preTime;
        if (minutes === 0 && seconds === 0) {
          return { minutes: 4, seconds: 0 };
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
  }, []);

  return (
    <>
      {time.minutes.toString().padStart(2, '0')}&nbsp;:&nbsp;{time.seconds.toString().padStart(2, '0')}
    </>
  );
}

export default CountdownTimeMinute;
