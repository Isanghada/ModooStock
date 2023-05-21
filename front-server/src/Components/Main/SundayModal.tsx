import { useRef } from 'react';
import CashUFOLottie from '../Common/Lottie/96583-ufo-stealing-money.json';
import Lottie from 'lottie-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cancelPlay } from 'Store/store';
import { useAppDispatch } from 'Store/hooks';

interface Type {
  setSundayModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function SundayModal({ setSundayModal }: Type): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
        ref={ref}
        className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 pt-5 lg:pt-0 z-50"
        onClick={(e) => {
          if (e.target === ref.current) {
            setSundayModal(false);
          }
        }}>
        <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[29rem] lg:w-[42%] lg:max-w-[35rem] px-7 rounded-xl text-center scroll-py-2 py-5 font-semibold">
          <Lottie animationData={CashUFOLottie} style={{ width: '30%', marginBottom: '1rem' }} className="mx-auto" />
          <div className="flex flex-col w-full text-[1rem] lg:text-[1.3rem] justify-center items-center">
            <span className="text-[#707070] text-[0.8rem] lg:text-[1rem]">이용 가능 시간</span>
            <span>월요일 ~ 토요일</span>
            <span>AM 10:00 ~ PM 10:00</span>
          </div>
          <div
            className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 w-[30%] lg:w-1/3 text-[0.8rem] lg:text-[1rem] mx-auto mt-3 text-white hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSundayModal(false);
              dispatch(cancelPlay());
            }}>
            <span>닫기</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
export default SundayModal;
