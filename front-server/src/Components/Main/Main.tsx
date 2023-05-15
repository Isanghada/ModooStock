import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import VisitModal from './VisitModal';
import Guide from './Guide';
import MyHomeAsset from './MyHomeAsset';
import AssetLoading from 'Components/Common/AssetLoading';
import MyHomeAsset2 from './MyHomeAsset2';
import { useGetAdminUserCheckQuery } from 'Store/api';

function Main(): JSX.Element {
  const navigate = useNavigate();
  const [floor, setFloor] = useState(
    window.screen.width <= 1280 ? `${2 + (window.screen.width - 1024) * (1 / 140)}rem` : '4rem'
  );
  const { data: getAdmin, isLoading, isError } = useGetAdminUserCheckQuery('');
  if (getAdmin !== undefined) {
    navigate('/admin');
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  const handleResize = () => {
    if (1024 <= window.innerWidth && window.innerWidth <= 1280) {
      const st = 2 + (window.innerWidth - 1024) * (1 / 140);
      setFloor(`${st}rem`);
    } else if (1024 > window.innerWidth) {
      setFloor('5rem');
    } else {
      setFloor('4rem');
    }
  };

  const click = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    switch (target.ariaLabel) {
      case '은행':
        navigate('/bank');
        break;
      case '주식 거래소':
        navigate('/exchange');
        break;
      case '정보상':
        navigate('/infoshop');
        break;
      case '랭킹':
        navigate('/rank');
        break;
      case '뽑기 상점':
        navigate('/gachashop');
        break;
      case '미니 게임':
        navigate('/lottery');
        break;
      case '경매장':
        navigate('/auction');
        break;
      case '마이룸':
        navigate(`/travel/${localStorage.getItem('nickname')}`);
        break;

      default:
        break;
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  return (
    <>
      {/* 데스크탑 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
        className="items-center justify-between hidden w-full h-full max-w-[80rem] min-h-[43rem] max-h-[46.5rem] my-auto mx-auto lg:flex">
        {/* 1번 구역 */}
        <div className="flex justify-start items-center w-[28%] h-full">
          <div className="w-[10%]"></div>
          <div className="flex justify-end items-end w-[40%] h-[80%] max-h-[80%]">
            <div className="h-[65%]"></div>
            <div className="h-[16%] animate-moving">
              <img
                aria-label="가이드"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/guide.png'}
                alt=""
                onClick={handleOpenGuide}
              />
            </div>
            <div className="h-[19%]"></div>
          </div>
          <div className="w-[50%] h-[80%] max-h-[49rem]">
            <div className="h-[9%]"></div>
            <div className="flex justify-center h-[26%] w-full animate-moving">
              <img
                aria-label="방문하기"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/visit.png'}
                alt=""
                onClick={handleOpenModal}
              />
            </div>
            <div className="h-[2%]"></div>
            <div className="flex justify-start h-[25%] w-full animate-moving">
              <img
                aria-label="마이룸"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/house.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[11%]"></div>
            <div className="flex justify-center h-[15%] w-full">
              <img
                aria-label="게임기"
                className="z-10 h-full"
                src={process.env.REACT_APP_S3_URL + '/images/toys/nintendo.png'}
                alt=""
              />
            </div>
            <div className="h-[6%]"></div>
          </div>
        </div>
        {/* 2번 구역 */}
        <div className="flex items-center justify-center h-full w-[44%] max-h-[49rem] relative">
          {/* 1차 앱솔 */}
          <div className="absolute z-20 flex items-end justify-between w-full h-full">
            {/* 왼쪽 */}
            <div className="flex flex-col items-end justify-start w-1/2 h-[92%]">
              <div className="h-[1%]"></div>
              <div className="flex justify-center h-[21%] w-full animate-moving pl-20">
                <img
                  aria-label="은행"
                  className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/bank.png'}
                  alt=""
                  onClick={click}
                />
              </div>
              <div className="h-[52%]"></div>
              <div className="flex justify-start h-[15%] w-[82%] animate-moving">
                <img
                  aria-label="뽑기 상점"
                  className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/gatcha.png'}
                  alt=""
                  onClick={click}
                />
              </div>
              <div className="w-full h-[11%]"></div>
            </div>
            {/* 오른쪽 */}
            <div className="flex flex-col items-center justify-start w-1/2 h-[92%]">
              <div className="h-[4%]"></div>
              <div className="flex justify-center h-[16%] w-full animate-moving">
                <img
                  aria-label="경매장"
                  className="z-10 h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/auction.png'}
                  alt=""
                  onClick={click}
                />
              </div>
              <div className="h-[58%]"></div>
              <div className="flex justify-center h-[14%] w-full">
                <img
                  aria-label="미니 게임"
                  className="z-10 h-full pr-20 cursor-pointer hover:scale-[1.2] transition-all duration-300"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/miniGame.png'}
                  alt=""
                  onClick={click}
                />
              </div>
              <div className="h-[8%]"></div>
            </div>
          </div>
          {/* 2차 앱솔 */}
          <div className="absolute z-10 flex items-end justify-start w-[120%] h-[80%]">
            {/* 왼쪽 */}
            <div className="flex flex-col w-[17%] h-full">
              <div className="h-[11%]"></div>
              <div className="flex justify-center h-[14%] w-full">
                <img
                  aria-label="조이스틱"
                  className="z-20 h-full"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/joystic.png'}
                  alt=""
                />
              </div>
              <div className="h-[30%]"></div>
              <div className="flex justify-end h-[17%] w-full">
                <img
                  aria-label="믹스"
                  className="z-20 h-full pr-1"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/mixassets.png'}
                  alt=""
                />
              </div>
              <div className="h-[18%]"></div>
              <div className="flex justify-start h-[7%] w-full">
                <img
                  aria-label="원"
                  className="z-20 h-full"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/one.png'}
                  alt=""
                />
              </div>
              <div className="h-[3%]"></div>
            </div>
            {/* 빈칸 */}
            <div className="w-[36%] h-full">
              <div className="h-[93%]"></div>
              <div className="flex justify-end h-[7%] w-full">
                <img
                  aria-label="믹스2"
                  className="z-10 h-full"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/mixassets2.png'}
                  alt=""
                />
              </div>
            </div>
            {/* 가운데 */}
            <div className="w-[15%] h-full z-30"></div>
            {/* 빈칸 */}
            <div className="w-[17%] h-full"></div>
            {/* 오른쪽 */}
            <div className="w-[15%] h-full">
              <div className="h-[8%]"></div>
              <div className="flex justify-start h-[7%] w-full">
                <img
                  aria-label="줄무늬공"
                  className="z-10 h-full"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/zebra.png'}
                  alt=""
                />
              </div>
              <div className="h-[27%]"></div>
              <div className="flex justify-center h-[8%] w-full">
                <img
                  aria-label="플러스"
                  className="z-10 h-full"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/plus.png'}
                  alt=""
                />
              </div>
              <div className="h-[33%]"></div>
              <div className="flex justify-start h-[12%] w-full">
                <img
                  aria-label="공"
                  className="z-10 h-full"
                  src={process.env.REACT_APP_S3_URL + '/images/toys/ball.png'}
                  alt=""
                />
              </div>
              <div className="h-[6%]"></div>
            </div>
          </div>
          {/* 2번 구역 메인 */}
          <div className="flex justify-center items-center w-full h-[60%] relative min-w-[14.3rem] min-h-[29.4rem]">
            <img
              aria-label="마카롱"
              className={`absolute object-contain scale-110 w-full`}
              src={process.env.REACT_APP_S3_URL + '/images/toys/floor.png'}
              alt=""
              style={{ bottom: `-${floor}` }}
            />
            <Suspense fallback={<AssetLoading />}>
              <Canvas
                style={{ width: '100%', height: '100%', transition: 'all', transitionDuration: '2s' }}
                orthographic
                camera={{
                  left: -1,
                  right: 1,
                  top: 1,
                  bottom: -1,
                  near: 0.1,
                  far: 1000,
                  zoom: 100
                }}>
                <ambientLight intensity={0.5} />
                <pointLight distance={2000} position={10} power={8} />
                <MyHomeAsset len={0.006} pos={[0, -1.28, -8]} rot={[1.75, 0, 0.18]} />
              </Canvas>
            </Suspense>
          </div>
        </div>
        {/* 3번 구역 */}
        <div className="flex justify-start items-center w-[28%] h-full z-20">
          <div className="w-[60%] h-[80%] max-h-[49rem]">
            <div className="h-[10%]"></div>
            <div className="flex justify-center h-[17%] w-full animate-moving">
              <img
                aria-label="정보상"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/info.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[6%]"></div>
            <div className="flex justify-center h-[20%] w-full animate-moving">
              <img
                aria-label="랭킹"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/rank.png'}
                alt=""
                onClick={click}
              />
            </div>
            {/* <div className="h-[5%]"></div> */}
            <div className="flex justify-start h-[32%] w-full animate-moving">
              <img
                aria-label="주식 거래소"
                className="h-full cursor-pointer hover:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/chart.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[13%]"></div>
          </div>
        </div>
      </motion.div>
      {/* 모바일 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
        className="relative flex flex-col items-center justify-center w-full h-full overflow-y-hidden max-w-[41.6rem] max-h-[23.4rem] lg:hidden mx-auto my-auto">
        {/* 메인 */}
        <div className="absolute flex items-end justify-center w-[60%] -bottom-4">
          <img
            aria-label="마카롱"
            className={`object-contain`}
            src={process.env.REACT_APP_S3_URL + '/images/toys/floor.png'}
            alt=""
            // style={{ bottom: `-${floor}` }}
          />
        </div>
        <div className="h-[10%]"></div>
        <div className="w-[50%] h-[75%] flex justify-center items-center">
          <Suspense fallback={<AssetLoading />}>
            <Canvas
              style={{ width: '100%', height: '100%' }}
              orthographic
              camera={{
                left: -1,
                right: 1,
                top: 1,
                bottom: -1,
                near: 0.1,
                far: 1000,
                zoom: 100
              }}>
              <ambientLight intensity={0.5} />
              <pointLight distance={2000} position={10} power={8} />
              <MyHomeAsset2 len={0.004} pos={[0, -1.02, -8]} rot={[1.75, 0, 0.2]} />
            </Canvas>
          </Suspense>
        </div>
        <div className="w-[50%] h-[15%]"></div>
        {/* 라우터 아이콘 */}
        <div className="absolute flex items-center justify-start w-full h-full">
          {/* 1번째 */}
          <div className="flex flex-col items-end w-[11%] h-full">
            <div className="h-[81%]"></div>
            <div className="h-[14%] w-full animate-moving relative">
              <img
                aria-label="가이드"
                className="z-10 h-full w-full cursor-pointer absolute pl-1 hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/guide.png'}
                alt=""
                onClick={handleOpenGuide}
              />
              <div className="h-[5%]"></div>
            </div>
          </div>
          {/* 2번째 */}
          <div className="flex flex-col w-[18%] h-full">
            <div className="h-[23%] w-full"></div>
            <div className="flex justify-center h-[25%] w-full z-20 animate-moving">
              <img
                aria-label="방문하기"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/visit.png'}
                alt=""
                onClick={handleOpenModal}
              />
            </div>
            <div className="h-[1%]"></div>
            <div className="flex justify-start h-[22%] w-full animate-moving">
              <img
                aria-label="마이룸"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/house.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[5%]"></div>
            <div className="flex justify-center pr-2 h-[13%] w-full">
              <img
                aria-label="게임기"
                className="z-10 h-full"
                src={process.env.REACT_APP_S3_URL + '/images/toys/nintendo.png'}
                alt=""
              />
            </div>
            <div className="h-[7%]"></div>
          </div>
          {/* 3번째 */}
          <div className="flex flex-col w-[18%] h-full z-20">
            <div className="h-[8%]"></div>
            <div className="flex justify-end h-[20%] w-full animate-moving">
              <img
                aria-label="은행"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/bank.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[56%]"></div>
            <div className="flex justify-start h-[15%] w-[82%] animate-moving">
              <img
                aria-label="뽑기 상점"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/gatcha.png'}
                alt=""
                onClick={click}
              />
            </div>
          </div>
          {/* 빈칸 */}
          <div className="w-[29%] h-full"></div>
          {/* 4번째 */}
          <div className="w-[15%] h-full">
            <div className="h-[21%]"></div>
            <div className="flex justify-center h-[14%] w-full animate-moving">
              <img
                aria-label="정보상"
                className="h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/info.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[9%]"></div>
            <div className="flex justify-center h-[19%] w-full animate-moving">
              <img
                aria-label="랭킹"
                className="h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/rank.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[3%]"></div>
            <div className="flex justify-center h-[26%] w-full animate-moving">
              <img
                aria-label="주식 거래소"
                className="h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/chart.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[8%]"></div>
          </div>
        </div>
        {/* 앱솔 아이콘 */}
        <div className="absolute flex justify-start items-center w-[60%] h-full">
          <div className="flex flex-col w-1/4 h-full">
            <div className="h-[15%]"></div>
            <div className="flex justify-start h-[15%] w-full">
              <img
                aria-label="조이스틱"
                className="z-20 h-full"
                src={process.env.REACT_APP_S3_URL + '/images/toys/joystic.png'}
                alt=""
              />
            </div>
            <div className="h-[16%]"></div>
            <div className="flex justify-center h-[14%] w-full">
              <img
                aria-label="믹스"
                className="z-20 h-full pr-2"
                src={process.env.REACT_APP_S3_URL + '/images/toys/mixassets.png'}
                alt=""
              />
            </div>
            <div className="h-[32%]"></div>
            <div className="flex justify-start h-[5%] w-full">
              <img
                aria-label="공"
                className="z-20 h-full"
                src={process.env.REACT_APP_S3_URL + '/images/toys/one.png'}
                alt=""
              />
            </div>
            <div className="h-[3%]"></div>
          </div>
          <div className="w-1/4 h-full">
            <div className="h-[92%]"></div>
            <div className="flex justify-end h-[6%] w-full">
              <img
                aria-label="믹스2"
                className="z-10 h-full"
                src={process.env.REACT_APP_S3_URL + '/images/toys/mixassets2.png'}
                alt=""
              />
            </div>
            <div className="h-[2%]"></div>
          </div>
          <div className="w-1/4 h-full">
            <div className="h-[11%]"></div>
            <div className="flex justify-end h-[14%] w-full animate-moving">
              <img
                aria-label="경매장"
                className="h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/auction.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[59%]"></div>
            <div className="flex justify-center h-[14%] w-full">
              <img
                aria-label="미니 게임"
                className="z-10 h-full cursor-pointer hover:scale-[1.2] active:scale-[1.2] transition-all duration-300"
                src={process.env.REACT_APP_S3_URL + '/images/toys/miniGame.png'}
                alt=""
                onClick={click}
              />
            </div>
            <div className="h-[2%]"></div>
          </div>
          <div className="w-1/4 h-full">
            <div className="h-[22%]"></div>
            <div className="flex justify-center h-[7%] w-full">
              <img
                aria-label="게임기"
                className="z-10 h-full"
                src={process.env.REACT_APP_S3_URL + '/images/toys/zebra.png'}
                alt=""
              />
            </div>
            <div className="h-[10%]"></div>
            <div className="flex justify-end h-[7%] w-full">
              <img
                aria-label="플러스"
                className="z-10 h-full pr-5"
                src={process.env.REACT_APP_S3_URL + '/images/toys/plus.png'}
                alt=""
              />
            </div>
            <div className="h-[42%]"></div>
            <div className="flex justify-center h-[10%] w-full">
              <img
                aria-label="공"
                className="h-full "
                src={process.env.REACT_APP_S3_URL + '/images/toys/ball.png'}
                alt=""
              />
            </div>
            <div className="h-[2%]"></div>
          </div>
        </div>
      </motion.div>
      {openGuide && <Guide onClose={handleCloseGuide} openGuide={openGuide} />}
      <Modal isOpen={isOpen} onClose={handleCloseModal} padding={'p-6 lg:p-8'}>
        <VisitModal onClose={handleCloseModal} />
      </Modal>
    </>
  );
}
export default Main;
