import { Canvas } from '@react-three/fiber';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUsersTravelInfoQuery, useLazyGetUsersRandomQuery, useLazyGetUserMypageVisitorsQuery } from 'Store/api';
import Loading from 'Components/Common/Loading';
import Modal from 'Components/Main/Modal';
import GuestBookList from './GuestBookList';
import { Suspense, useEffect, useState } from 'react';
import AllAssetsList2 from './AllAssetsList2';
import AssetLoading from 'Components/Common/AssetLoading';
import { motion } from 'framer-motion';
import { useAppSelector } from 'Store/hooks';

function TravelRoom(): JSX.Element {
  return (
    <div className="flex justify-center items-center w-[65%] h-full relative">
      <div className="absolute flex items-end justify-center lg:w-[95%] xl:w-[85%] top-[56%]">
        <img
          aria-label="마카롱"
          className={`object-contain w-full`}
          src={process.env.REACT_APP_S3_URL + '/images/toys/floor.png'}
          alt=""
        />
      </div>
      <div className="w-[80%] flex justify-center h-[87%] items-center">
        <Suspense fallback={<AssetLoading />}>
          <Canvas
            style={{ width: '100%', height: '100%', paddingTop: '6%' }}
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
            <AllAssetsList2 len={0.0055} pos={[0, -0.98, -8]} rot={[1.75, 0, -0.8]} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}

function MobileTravelRoom(): JSX.Element {
  return (
    <div className="flex justify-evenly items-center w-[65%] md:w-[58%] h-full relative">
      <div className="absolute flex items-end justify-center lg:w-[95%] xl:w-[85%] top-[56%]">
        <img
          aria-label="마카롱"
          className={`object-contain w-full`}
          src={process.env.REACT_APP_S3_URL + '/images/toys/floor.png'}
          alt=""
        />
      </div>
      <div className="w-[80%] flex justify-center h-[87%] items-center">
        <Canvas
          style={{ width: '100%', height: '100%', paddingBottom: '20%' }}
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
          <AllAssetsList2 len={0.0055} pos={[0, -0.98, -8]} rot={[1.75, 0, -0.8]} />
        </Canvas>
      </div>
    </div>
  );
}

interface BottomButtonsType {
  nickname: string;
}

function BottomButtons(nickname: BottomButtonsType): JSX.Element {
  const [getUsersRandom] = useLazyGetUsersRandomQuery();
  const navigate = useNavigate();

  // 랜덤 방문 API 호출
  const handleRandomVisit = async () => {
    // 랜덤 유저 API
    const { data } = await getUsersRandom('');
    if (data) {
      navigate(`/travel/${data.data.nickname}`);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleMyRoomVisit = () => {
    navigate('/mypage');
  };

  // navigate로 이동 시 모달 닫기
  useEffect(() => {
    handleCloseModal();
  }, [nickname]);

  const clickSound = useAppSelector((state) => {
    return state.clickBtn;
  });
  const cancelClickSound = useAppSelector((state) => {
    return state.cancelClick;
  });
  const successFx = useAppSelector((state) => {
    return state.successFx;
  });
  const errorFx = useAppSelector((state) => {
    return state.errorFx;
  });
  const clickBtn = new Audio(clickSound);
  const cancelClickBtn = new Audio(cancelClickSound);
  const successFxSound = new Audio(successFx);
  const errorFxSound = new Audio(errorFx);
  return (
    <>
      <div className="absolute flex items-center justify-start w-[25%] lg:w-[33%] xl:ml-[2%] xl:w-[27%] h-[3rem] md:h-[5rem] bottom-0 lg:bottom-6 py-2 mx-2">
        <img
          className="object-contain w-[2rem] md:w-[3rem] lg:w-[4rem] h-[2rem] md:h-[3rem] lg:h-[4rem] my-4 mx-auto cursor-pointer
        hover:scale-105 transition-all duration-300"
          src={process.env.REACT_APP_S3_URL + '/images/visits/back.png'}
          alt="뒤로가기"
          onClick={() => {
            cancelClickBtn.play();
            navigate('/main');
          }}
        />
        <img
          className="object-contain w-[2rem] md:w-[3rem] lg:w-[4rem] h-[2rem] md:h-[3rem] lg:h-[4rem] my-4 mx-auto cursor-pointer hover:scale-105 transition-all duration-300"
          src={process.env.REACT_APP_S3_URL + '/images/visits/guestBookIcon.png'}
          alt="방명록"
          onClick={() => {
            clickBtn.play();
            handleOpenModal();
          }}
        />
        {nickname.nickname === localStorage.getItem('nickname') ? (
          <img
            className="object-contain w-[2rem] md:w-[3rem] lg:w-[4rem] h-[2rem] md:h-[3rem] lg:h-[4rem] my-4 mx-auto cursor-pointer hover:scale-105 transition-all duration-300"
            src={process.env.REACT_APP_S3_URL + '/images/visits/makeupRoom.png'}
            alt="마이룸"
            onClick={() => {
              clickBtn.play();
              handleMyRoomVisit();
            }}
          />
        ) : (
          <img
            className="object-contain w-[2rem] md:w-[3rem] lg:w-[4rem] h-[2rem] md:h-[3rem] lg:h-[4rem] my-4 mx-auto cursor-pointer hover:scale-105 transition-all duration-300"
            src={process.env.REACT_APP_S3_URL + '/images/visits/randomVisit.png'}
            alt="랜덤방문"
            onClick={() => {
              clickBtn.play();
              handleRandomVisit();
            }}
          />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal} canOpenModal={true}>
        <GuestBookList
          onClose={handleCloseModal}
          clickBtn={clickBtn}
          cancelClickBtn={cancelClickBtn}
          successFxSound={successFxSound}
          errorFxSound={errorFxSound}
        />
      </Modal>
    </>
  );
}

function Travel(): JSX.Element {
  const { nickname } = useParams() as { nickname: string };
  const { data: user, isLoading, isError } = useGetUsersTravelInfoQuery(nickname);
  const [visitor, setVisitor] = useState<number>(1);
  const [getVisitors, { isLoading: isLoading2, isError: isError2 }] = useLazyGetUserMypageVisitorsQuery();

  useEffect(() => {
    const getVisit = async () => {
      const { data, result } = await getVisitors(nickname).unwrap();
      if (data) {
        setVisitor(data);
      }
    };
    getVisit();
  }, [nickname, getVisitors]);

  const navigate = useNavigate();

  if (isError) navigate('/error');

  if (isLoading) return <Loading />;

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
        className="w-full">
        <div className="hidden items-center w-full h-full justify-evenly max-w-[80rem] min-h-[43rem] max-h-[46.5rem] my-auto mx-auto lg:flex">
          <div className="flex justify-center items-center lg:w-[33%] lg:pl-[2%] xl:pl-0 xl:w-[27%]">
            <div className="flex flex-col items-center justify-center w-full p-2 font-extrabold bg-white rounded-3xl drop-shadow-lg">
              {/* 방문자수 */}
              <div className="flex justify-end w-full px-2">
                <p className="font-base text-center text-[#707070]">{visitor}명 방문 👀</p>
              </div>
              {/* 프로필 이미지 */}
              <div className="flex justify-center mt-5 p-2 w-[5rem] h-[5rem] lg:w-[8rem] lg:h-[8rem] max-w-[10rem] max-h-[10rem] rounded-full  bg-[#fb7c7c]">
                <img
                  className="object-contain m-2 rounded-full"
                  src={user?.data.profileImagePath}
                  alt="프로필 이미지"
                />
              </div>
              {/* 닉네임 */}
              <div className="flex items-center justify-center w-full px-2 py-2">
                <p className="text-[2.25rem] font-bold text-center text-[#0e0e0e]">{user?.data.nickname}</p>
              </div>
              {/* 한줄 소개 */}
              <div className="w-5/6 h-[12rem] rounded-[0.625rem] bg-[#fff6f2] p-2">
                <p className="w-full 3rem text-[1.5rem] font-bold text-center">
                  <span className="w-full h-[3rem] text-[#707070]">“</span>
                  <span className="w-full h-[3rem] text-[#ff7b7b]"> {user?.data.introduction} </span>
                  <span className="w-full h-[3rem] text-[#707070]">”</span>
                </p>
              </div>
              <div></div>
              {/* 라인 */}
              <div className="w-5/6 text-center mt-4 border-b border-solid border-[#E0E0E0] leading-[0.1em]" />
              <div
                className="flex items-center justify-between w-5/6 px-2 py-2"
                title="주식, 은행, 소품을 포함한 금액 입니다!">
                {/* <img
                  className="w-[2rem] h-[1.5rem] object-contain"
                  src={process.env.REACT_APP_S3_URL + '/images/icons/coin.png'}
                  alt="돈"
                /> */}
                <span className="text-base min-w-fit">총 자산</span>
                <span className="w-[17.5rem] font-bold text-right text-black text-lg">
                  {user?.data.totalCash?.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
          {/* 오른쪽 홈피 */}
          <TravelRoom />
        </div>
        {/* 모바일 */}
        <div className="relative flex items-center justify-between w-full h-full overflow-y-hidden max-w-[41.6rem] md:max-w-[50rem] max-h-[23.4rem] lg:hidden mx-auto my-auto">
          <div className="flex w-full h-full">
            {/* 왼쪽부분 */}
            <div className="flex flex-col justify-center w-[35%] md:w-[30%] font-extrabold">
              {/* 여기에 넣음 */}
              <div className="flex flex-col w-full font-extrabold">
                <div className="flex flex-col items-center justify-center px-6 py-2 bg-white rounded-2xl drop-shadow-lg">
                  {/* 방문자수 */}
                  <div className="flex justify-end w-full mt-1">
                    <p className="text-xs text-center text-[#707070]">{visitor}명 방문 👀</p>
                  </div>
                  {/* 프로필 이미지 */}
                  <div className="flex justify-center p-2 w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] max-w-[7rem] max-h-[7rem] rounded-full  bg-[#fb7c7c]">
                    <img
                      className="object-contain m-2 rounded-full"
                      src={user?.data.profileImagePath}
                      alt="프로필 이미지"
                    />
                  </div>
                  {/* 닉네임 */}
                  <div className="flex items-center justify-center w-full p-1">
                    <p className="text-lg font-bold text-center text-[#0e0e0e]">{user?.data.nickname}</p>
                  </div>
                  {/* 한줄 소개 */}
                  <div className="w-full h-3/4 rounded-[0.625rem] bg-[#fff6f2] p-1">
                    <p className="w-full h-[3rem] text-md font-bold text-center">
                      <span className="w-full text-[#707070]">“</span>
                      <span className="w-full text-[#ff7b7b]"> {user?.data.introduction} </span>
                      <span className="w-full text-[#707070]">”</span>
                    </p>
                  </div>
                  {/* 라인 */}
                  <div className="w-full text-center mt-2 border-b border-solid border-[#E0E0E0] leading-[0.1em]" />
                  <div className="flex items-center justify-between w-full py-2">
                    <img
                      className="w-[1.5rem] h-[1.5rem] object-contain"
                      src={process.env.REACT_APP_S3_URL + '/images/icons/coin.png'}
                      alt="돈"
                    />
                    <p className="text-[1rem] font-bold text-right text-black">
                      {user?.data.totalCash?.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-[12%]"></div>
            <MobileTravelRoom />
          </div>
        </div>
      </motion.div>

      {/* 돌아가기 & 랜덤 방문 버튼 */}
      <BottomButtons nickname={nickname} />
    </>
  );
}

export default Travel;
