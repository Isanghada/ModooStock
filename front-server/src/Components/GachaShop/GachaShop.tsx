import Lottie from 'lottie-react';
import { Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import yellowopen from 'Components/Common/Lottie/yellowopen.json';
import blueopen from 'Components/Common/Lottie/blueopen.json';
import bluegift from 'Components/Common/Lottie/bluegift.json';
import yellowgift from 'Components/Common/Lottie/yellowgift.json';
import redgift from 'Components/Common/Lottie/redgift.json';
import redopen from 'Components/Common/Lottie/redopen.json';
import { useEffect, useState } from 'react';
import { usePostGotchaLevelMutation } from 'Store/api';

function GachaShop(): JSX.Element {
  const [isHover, setIsHover] = useState<string | null>('');
  const [giftWaitData, setGiftWaitData] = useState<any>(null);
  const [giftOpenData, setGiftOpenData] = useState<any>(null);
  const [giftStatus, setGiftStatus] = useState<boolean>(false);
  const [giftOpenStatus, setGiftOpenStatus] = useState<boolean>(false);
  const [ItemOpenStatus, setItemOpenStatus] = useState<boolean>(false);
  const [assetName, setAssetName] = useState<string>('');
  const [giftColor, setGiftColor] = useState<string>('');
  // 뉴스 구입 API
  const [gotchaItem] = usePostGotchaLevelMutation();

  const hoverOn = (event: React.MouseEvent<HTMLDivElement>) => {
    const label = event.currentTarget.ariaLabel;
    setIsHover(label);
  };
  const hoverOut = () => {
    setIsHover('');
  };
  // 클릭 이벤트 처리
  const onClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    setGiftStatus(true);
    switch (target.ariaLabel) {
      case '일반':
        setGiftWaitData(bluegift);
        setGiftColor('블루');
        break;
      case '고급':
        setGiftWaitData(redgift);
        setGiftColor('빨강');
        break;
      case '전설':
        setGiftWaitData(yellowgift);
        setGiftColor('노랑');
        break;
      case '대기상자':
        setGiftStatus(false);
        setGiftOpenStatus(true);
        if (giftColor === '블루') {
          const { data } = await gotchaItem('LOW').unwrap();
          console.log(data, '블루블루');
          setGiftOpenData(blueopen);
          setAssetName(data.assetName);
          break;
        }
        if (giftColor === '빨강') {
          setGiftOpenData(redopen);
          break;
        }
        if (giftColor === '노랑') {
          setGiftOpenData(yellowopen);
          break;
        }
        break;
    }
  };
  useEffect(() => {
    if (giftOpenStatus) {
      setTimeout(() => {
        setGiftOpenStatus(false);
        setItemOpenStatus(true);
      }, 3900);
    }
  }, [giftOpenStatus]);

  const test = true;
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            ease: 'easeInOut'
          }}
          className="flex flex-col items-center w-full h-full justify-evnely">
          <div className="w-1/3 h-[30%] flex items-end">
            <img className="w-full h-auto" src={process.env.REACT_APP_S3_URL + '/images/logos/gacha.png'} alt="gacha" />
          </div>
          <div className="flex justify-evenly items-center w-full h-[80%]">
            <div
              aria-label="일반"
              onClick={onClick}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOut}
              className="border-2 lg:border-4 border-[#b3dcf8] rounded-3xl w-1/4 h-[75%] flex flex-col justify-evenly items-center bg-[#e4f4ff] hover:border-[#75c5fa]  shadow-md shadow-gray-400 cursor-pointer">
              <div className="text-lg lg:text-4xl font-extrabold text-[#748DA6]">일반상자</div>
              <div className="w-[60%] lg:w-[70%]">
                <img
                  className={`w-full h-auto ${isHover === '일반' && `animate-[ring_3s_infinite]`}`}
                  src={process.env.REACT_APP_S3_URL + '/images/toys/bluemove.png'}
                  alt="bluemove"
                />
              </div>
              <div
                className={`bg-[#2E94E8] hover:bg-[#2079c2] w-2/3 py-1 rounded-2xl text-sm lg:text-2xl text-white font-semibold lg:font-bold flex justify-center items-center shadow-md shadow-gray-400  `}>
                500,000원
              </div>
            </div>
            <div
              aria-label="고급"
              onClick={onClick}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOut}
              className="border-2 lg:border-4 border-[#ffa9ff] rounded-3xl w-1/4 h-[75%] flex flex-col justify-evenly items-center bg-[#ffdaf9] hover:border-[#ff70cf]  shadow-md shadow-gray-400 cursor-pointer">
              <div className="text-lg lg:text-4xl font-extrabold text-[#c73fa5]">고급상자</div>
              <div className="w-[60%] lg:w-[70%]">
                <img
                  className={`w-full h-auto ${isHover === '고급' && `animate-[ring_3s_infinite]`}`}
                  src={process.env.REACT_APP_S3_URL + '/images/toys/redmove.png'}
                  alt="redmove"
                />
              </div>
              <div
                className={`bg-[#ff5bc8] hover:bg-[#e23bab] w-2/3 py-1 rounded-2xl text-sm lg:text-2xl text-white font-semibold lg:font-bold flex justify-center items-center shadow-md shadow-gray-400  `}>
                1,000,000원
              </div>
            </div>
            <div
              aria-label="전설"
              onClick={onClick}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOut}
              className="border-2 lg:border-4 border-[#ffde7a] rounded-3xl w-1/4 h-[75%] flex flex-col justify-evenly items-center bg-[#FFF2CC] hover:border-[#fdba3d]  shadow-md shadow-gray-400 cursor-pointer">
              <div className="text-lg lg:text-4xl font-extrabold text-[#F0A633]">전설상자</div>
              <div className="w-[60%] lg:w-[70%]">
                <img
                  className={`w-full h-auto ${isHover === '전설' && `animate-[ring_3s_infinite]`}`}
                  src={process.env.REACT_APP_S3_URL + '/images/toys/yellowmove.png'}
                  alt="yellowmove"
                />
              </div>
              <div
                className={`bg-[#ffbf00] hover:bg-[#e4ab00] w-2/3 py-1 rounded-2xl text-sm lg:text-2xl text-white font-semibold lg:font-bold flex justify-center items-center shadow-md shadow-gray-400  `}>
                5,000,000원
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {giftStatus && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center w-full h-screen text-center bg-black bg-opacity-60">
          <Lottie
            aria-label="대기상자"
            onClick={onClick}
            animationData={giftWaitData}
            className="w-1/4 mx-auto transition-all duration-150 cursor-pointer mt-14 hover:drop-shadow-[0_30px_40px_rgba(255,255,255)]"
          />
        </div>
      )}
      {/* {giftOpenStatus && ( */}
      <Transition show={giftOpenStatus}>
        <div className="fixed inset-0 z-50 flex flex-col justify-center w-full h-screen text-center transition-all duration-150 bg-black bg-opacity-80 ">
          <Transition.Child
            enter="ease-in-out duration-[3.5s]"
            enterFrom="drop-shadow-[0_10px_10px_rgba(255,255,255)]"
            enterTo={
              test ? `drop-shadow-[0_20px_70px_rgba(255,255,000)]` : `drop-shadow-[0_20px_70px_rgba(255,255,255)]`
            }>
            <Lottie
              animationData={giftOpenData}
              className="w-1/2 mx-auto transition-all duration-300 cursor-pointer drop-shadow-[0_10px_20px_rgba(255,255,255)]"
            />
          </Transition.Child>
        </div>
      </Transition>
      <Transition show={ItemOpenStatus}>
        <div className="fixed inset-0 z-50 flex flex-col justify-center w-full h-screen text-center transition-all duration-150 bg-black bg-opacity-80 ">
          <Transition.Child
            enter="ease-in-out duration-[3.5s]"
            enterFrom="drop-shadow-[0_10px_10px_rgba(255,255,255)]"
            enterTo={
              test ? `drop-shadow-[0_20px_70px_rgba(255,255,000)]` : `drop-shadow-[0_20px_70px_rgba(255,255,255)]`
            }>
            <img src={process.env.REACT_APP_S3_URL + `/assets/img/${assetName}.png`} />
          </Transition.Child>
        </div>
      </Transition>
      {/* // )} */}
    </>
  );
}

export default GachaShop;
