import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import money from 'Components/Common/Lottie/money.json';
import moneyT from 'Components/Common/Lottie/money2.json';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'Store/hooks';
import { changeLoginStatus } from 'Store/store';

function Intro(): JSX.Element {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // 로그인 창 띄우기
  const showLogIn = () => {
    dispatch(changeLoginStatus(true));
    setShowLogin(false);
  };
  // 로그인 창 닫기
  const closeLogIn = () => {
    dispatch(changeLoginStatus(false));
    setShowLogin(true);
  };

  return (
    <AnimatePresence>
      {/* 전체 배경 */}
      <motion.div
        className="flex flex-col justify-center items-center w-full h-full text-xl bg-center bg-[url('/src/intro/IntroBG.png')] bg-no-repeat bg-contain lg:min-h-[38rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          delay: 0,
          ease: 'easeInOut'
        }}>
        {/* 로고 */}
        <motion.div
          onClick={closeLogIn}
          className="flex items-center w-1/3 h-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
            ease: 'easeInOut'
          }}>
          <img className="w-full" src="/images/logos/LogoEarth.png" alt="logo" />
        </motion.div>
        {/* 캐릭터 */}
        <motion.div
          className="flex items-center justify-center w-1/3 h-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            ease: 'easeInOut'
          }}>
          <img className="w-full max-h-full lg:w-3/4" src="/images/intro/characters.png" alt="characters" />
        </motion.div>
        {/* 돈 뿌리기 */}
        <motion.div
          className="fixed bottom-0 flex items-center justify-center w-1/2 h-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
            ease: 'easeInOut'
          }}>
          <Lottie animationData={moneyT} className="w-1/2 cursor-pointer" />
        </motion.div>
        {/* 로그인 깜빡임 */}
        {showLogin && (
          <motion.div
            onClick={showLogIn}
            className="cursor-pointer absolute right-0 w-[5%] lg:text-5xl lg:text-bold h-[5vh]"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: 1,
              repeat: Infinity,
              ease: 'linear'
            }}>
            <img className="w-full h-full hover:scale-105" src="/images/intro/increase.png" alt="arrow" />
            {/* <div className='text-sm font-medium text-red-700 lg:font-bold lg:text-xl'>화성</div> */}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
export default Intro;
