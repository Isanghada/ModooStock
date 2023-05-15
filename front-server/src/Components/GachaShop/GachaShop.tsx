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
import { toast } from 'react-toastify';
import { useAppSelector } from 'Store/hooks';

interface AssetDataInterFace {
  assetCategory: string;
  assetId: number;
  assetLevel: string;
  assetName: string;
  assetNameKor: string;
}

function GachaShop(): JSX.Element {
  const [isHover, setIsHover] = useState<string | null>('');
  const [giftWaitData, setGiftWaitData] = useState<any>(null);
  const [giftOpenData, setGiftOpenData] = useState<any>(null);
  const [giftStatus, setGiftStatus] = useState<boolean>(false);
  const [giftOpenStatus, setGiftOpenStatus] = useState<boolean>(false);
  const [ItemOpenStatus, setItemOpenStatus] = useState<boolean>(false);
  const [assetData, setAssetData] = useState<AssetDataInterFace | null>(null);
  const [giftColor, setGiftColor] = useState<string>('');
  // 선물 등급에 따른 그림자
  const [giftGradeShadow, setGiftGradeShadow] = useState<string>('drop-shadow-[0_20px_70px_rgba(255,255,255)]');
  // 선물 등급에 따른 레벨가격
  const [giftGradeName, setGiftGradeName] = useState<string>('bg-[#2079c2]');
  // 아이템 확인 딜레이
  const [ItemCloseDelay, setItemCloseDelay] = useState<boolean>(false);

  // 현재 잔액 상태
  const currentMoneyStatus = useAppSelector((state) => {
    return state.currentMoneyStatus;
  });
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
    const currentMoney = Number(currentMoneyStatus.replaceAll(',', ''));
    switch (target.ariaLabel) {
      case '일반':
        if (currentMoney < 500000) {
          toast.error('소지하신 잔액이 부족합니다!');
          break;
        }
        setGiftStatus(true);
        setGiftWaitData(bluegift);
        setGiftColor('블루');
        break;
      case '고급':
        if (currentMoney < 1000000) {
          toast.error('소지하신 잔액이 부족합니다!');
          break;
        }
        setGiftStatus(true);
        setGiftWaitData(redgift);
        setGiftColor('빨강');
        break;
      case '전설':
        if (currentMoney < 3000000) {
          toast.error('소지하신 잔액이 부족합니다!');
          break;
        }
        setGiftStatus(true);
        setGiftWaitData(yellowgift);
        setGiftColor('노랑');
        break;
      case '아이템':
        if (ItemCloseDelay) {
          setItemOpenStatus(false);
          setItemCloseDelay(false);
          toast.success('아이템을 보관함에 보관하였습니다');
        }
        break;
      case '대기상자':
        setGiftStatus(false);
        // 아이템창 닫기 딜레이
        setTimeout(() => {
          setItemCloseDelay(true);
        }, 7000);
        if (giftColor === '블루') {
          const { data } = await gotchaItem('LOW').unwrap();
          setGiftOpenData(blueopen);
          setAssetData(data);
          switch (data.assetLevel) {
            case 'RARE':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,255,255)]');
              setGiftGradeName('bg-[#2079c2]');
              break;
            case 'EPIC':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,000,255)]');
              setGiftGradeName('bg-[#e23bab]');
              break;
            case 'UNIQUE':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,255,000)]');
              setGiftGradeName('bg-[#e4ab00]');
              break;
          }
          setGiftOpenStatus(true);
          break;
        }
        if (giftColor === '빨강') {
          const { data } = await gotchaItem('MIDDLE').unwrap();
          setGiftOpenData(redopen);
          setAssetData(data);
          switch (data.assetLevel) {
            case 'RARE':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,255,255)]');
              setGiftGradeName('bg-[#2079c2]');
              break;
            case 'EPIC':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,000,255)]');
              setGiftGradeName('bg-[#e23bab]');
              break;
            case 'UNIQUE':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,255,000)]');
              setGiftGradeName('bg-[#e4ab00]');
              break;
          }
          setGiftOpenStatus(true);
          break;
        }
        if (giftColor === '노랑') {
          const { data } = await gotchaItem('HIGH').unwrap();
          setGiftOpenData(yellowopen);
          setAssetData(data);
          switch (data.assetLevel) {
            case 'RARE':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,255,255)]');
              setGiftGradeName('bg-[#2079c2]');
              break;
            case 'EPIC':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,000,255)]');
              setGiftGradeName('bg-[#e23bab]');
              break;
            case 'UNIQUE':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(255,255,000)]');
              setGiftGradeName('bg-[#e4ab00]');
              break;
            case 'LEGENDARY':
              setGiftGradeShadow('drop-shadow-[0_20px_70px_rgba(000,255,000)]');
              setGiftGradeName('bg-[#09811f]');
              break;
          }
          setGiftOpenStatus(true);
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
              className="border-2 lg:border-4 border-[#a5dafd] rounded-3xl w-1/4 h-[75%] flex flex-col justify-evenly items-center bg-[#e4f4ff] hover:border-[#75c5fa]  shadow-md shadow-gray-400 cursor-pointer">
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
                3,000,000원
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* 선물 대기 상자 */}
      <Transition show={giftStatus}>
        <div className="fixed inset-0 z-50 flex flex-col justify-center w-full h-screen text-center bg-black bg-opacity-60">
          <Transition.Child
            enter="ease-in-out duration-[1s]"
            enterFrom="-translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100">
            <Lottie
              aria-label="대기상자"
              onClick={onClick}
              animationData={giftWaitData}
              className="w-1/4 mx-auto transition-all duration-150 cursor-pointer mt-14 hover:drop-shadow-[0_30px_40px_rgba(255,255,255)]"
            />
          </Transition.Child>
        </div>
      </Transition>
      {/* 선물 오픈 모션 */}
      <Transition show={giftOpenStatus}>
        <div className="fixed inset-0 z-50 flex flex-col justify-center w-full h-screen text-center transition-all duration-150 bg-black bg-opacity-80 ">
          <Transition.Child
            enter="ease-in-out duration-[3.5s]"
            enterFrom="drop-shadow-[0_10px_10px_rgba(255,255,255)]"
            enterTo={giftGradeShadow}>
            <Lottie
              animationData={giftOpenData}
              className="w-1/2 mx-auto transition-all duration-300 cursor-pointer drop-shadow-[0_10px_20px_rgba(255,255,255)]"
            />
          </Transition.Child>
        </div>
      </Transition>
      {/* 아이템 등장 */}
      <Transition show={ItemOpenStatus}>
        <div
          aria-label="아이템"
          onClick={onClick}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen text-center transition-all duration-150 bg-black bg-opacity-90 ">
          <Transition.Child
            enter="ease-in-out duration-[3.5s]"
            enterFrom="opacity-0"
            enterTo={`${giftGradeShadow} opacity-100`}>
            <div
              className={`${giftGradeName} py-1 px-4 text-sm border-2 lg:border-[3px] lg:px-8 lg:text-lg font-bold text-white rounded-3xl`}>
              {assetData?.assetLevel}
            </div>
          </Transition.Child>
          <Transition.Child
            enter="ease-in-out duration-[3.5s]"
            enterFrom="drop-shadow-[0_10px_10px_rgba(255,255,255)] opacity-0"
            enterTo={`${giftGradeShadow} opacity-100`}>
            <img
              className={`w-1/2 mx-auto animate-open cursor-pointer ${giftGradeShadow}`}
              src={process.env.REACT_APP_S3_URL + `/assets/img/${assetData?.assetName}.png`}
              alt={assetData?.assetName}
            />
            <div className="text-sm font-bold text-white lg:text-2xl">{assetData?.assetNameKor}</div>
          </Transition.Child>
        </div>
      </Transition>
      {/* // )} */}
    </>
  );
}

export default GachaShop;
