import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from './Mypage.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import MypageInven from './MypageInven';
import AllAssetsList from './AllAssetsList';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import {
  changeClickAsseData,
  changeClickAssetPosition,
  changeClickAssetRotation,
  changeIsAuctionClickInvenAsset,
  changeIsClickInvenAssetStore
} from 'Store/store';
import {
  useDeleteMypageMutation,
  usePostMypageMutation,
  usePostStorageResaleMutation,
  usePutMypageMutation,
  usePostAuctionMutation,
  useDeleteAuctionMyAssetIdMutation
} from 'Store/api';
import { toast } from 'react-toastify';
import AssetLoading from 'Components/Common/AssetLoading';

function Mypage(): JSX.Element {
  const dispatch = useAppDispatch();
  const auctionInput = useRef<HTMLInputElement>(null);
  const resaleRef = useRef<HTMLDivElement>(null);
  const [isModalClick, setIsModalClick] = useState<boolean>(false);
  const [isResaleModalClick, setIsResaleModalClick] = useState<boolean>(false);
  const [isClickAsset, setIsClickAsset] = useState<boolean>(false);
  const [isAuction, setIsAuction] = useState<boolean>(false);
  const [auctionMoney, setAuctionMoney] = useState<number>(0);
  const [postMypage] = usePostMypageMutation();
  const [deleteMypage] = useDeleteMypageMutation();
  const [putMypage] = usePutMypageMutation();
  const [postStorageResale] = usePostStorageResaleMutation();
  const [postAuction] = usePostAuctionMutation();
  const [deleteAuctionMyAssetId] = useDeleteAuctionMyAssetIdMutation();
  const clickAssetPosition = useAppSelector((state) => {
    return state.clickAssetPosition;
  });
  const clickAssetRotation = useAppSelector((state) => {
    return state.clickAssetRotation;
  });
  const clickAsseData = useAppSelector((state) => {
    return state.clickAsseData;
  });
  const isClickInvenAssetStore = useAppSelector((state) => {
    return state.isClickInvenAssetStore;
  });
  const isAuctionClickInvenAsset = useAppSelector((state) => {
    return state.isAuctionClickInvenAsset;
  });

  // 효과음
  const cancelClickSound = useAppSelector((state) => {
    return state.cancelClick;
  });
  const successFx = useAppSelector((state) => {
    return state.successFx;
  });
  const errorFx = useAppSelector((state) => {
    return state.errorFx;
  });
  const clickSound = useAppSelector((state) => {
    return state.clickBtn;
  });
  const clickBtn = new Audio(clickSound);
  const cancelClickBtn = new Audio(cancelClickSound);
  const successFxSound = new Audio(successFx);
  const errorFxSound = new Audio(errorFx);
  useEffect(() => {
    // 선택한 애가 경매에 등록됐을 경우 -> 옥션상태로 변경
    if (isAuctionClickInvenAsset) {
      setIsAuction(true);
    } else {
      setIsAuction(false);
    }
  }, [isAuctionClickInvenAsset]);

  // 클릭시에 대한 store 변경 모음 함수
  const settingMethod = () => {
    dispatch(
      changeClickAsseData({
        userAssetId: '',
        assetName: '',
        assetNameKor: '',
        pos_x: 0,
        pos_y: 0,
        pos_z: -200,
        rot_x: 0,
        rot_y: 0,
        rot_z: 0,
        assetLevel: ''
      })
    );
    dispatch(changeClickAssetPosition([0, 0, -200]));
    dispatch(changeClickAssetRotation([0, 0, 0]));
    dispatch(changeIsClickInvenAssetStore(false));
    setIsClickAsset(false);
  };

  // 문자열 입력 막기
  const isValidInput = async (input: string) => {
    const regex = await /^[0-9,]*$/;
    return regex.test(input);
  };

  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '경매장 등록':
        setIsModalClick((pre) => !pre);
        clickBtn.play();
        break;
      case '판매모달닫기':
        setIsResaleModalClick(false);
        cancelClickBtn.play();
        break;
      case '닫기':
        setIsModalClick(false);
        cancelClickBtn.play();
        break;
      case '판매 취소':
        const deleteAuction = async () => {
          const { data, result } = await deleteAuctionMyAssetId(clickAsseData.userAssetId).unwrap();
          // console.log(data, result);
          if (result === 'SUCCESS') {
            toast.success('물품을 반환했습니다.');
            successFxSound.play();
          } else {
            toast.error('요청 실패!');
            errorFxSound.play();
          }
          settingMethod();
        };
        deleteAuction();
        break;
      case '판매등록':
        if (auctionInput.current) {
          isValidInput(auctionInput.current.value).then((r) => {
            if (r === true && auctionInput.current) {
              const body = {
                price: parseInt(auctionInput.current.value.replaceAll(',', '')) * 10000,
                userAssetId: clickAsseData.userAssetId
              };
              const auction = async () => {
                await postAuction(body)
                  .unwrap()
                  .then((result) => {
                    toast.info('판매등록');
                    successFxSound.play();
                    dispatch(changeIsAuctionClickInvenAsset(true));
                  })
                  .catch((error) => {
                    toast.error(error.data.message);
                    errorFxSound.play();
                  });

                setIsModalClick(false);
              };
              auction().catch((e: any) => {
                toast.error(e.data?.message);
              });
            } else {
              toast.error('숫자를 입력해주세요!');
              errorFxSound.play();
            }
          });
        }
        break;
      case '판매모달':
        setIsResaleModalClick(true);
        clickBtn.play();
        break;
      case '판매':
        const resale = async () => {
          const { data, result } = await postStorageResale(clickAsseData.userAssetId).unwrap();
          if (result === 'SUCCESS') {
            toast.success('판매 완료!');
            successFxSound.play();
          } else {
            toast.error('요청 실패!');
            errorFxSound.play();
          }
          settingMethod();
          setIsResaleModalClick(false);
        };
        resale();
        break;
      case '창고':
      case '창고M':
        // console.log('clickAsseData: ', clickAsseData.userAssetId);
        const goInven = async () => {
          const { data, result } = await deleteMypage(clickAsseData.userAssetId).unwrap();
          if (result === 'SUCCESS') {
            toast.success('창고에 넣었습니다!');
            clickBtn.play();
          } else {
            toast.error('요청 실패!');
            errorFxSound.play();
          }
          settingMethod();
        };
        goInven();
        break;
      case '배치':
        const settingAsset = async () => {
          const body = {
            pos_x: clickAssetPosition[0],
            pos_y: clickAssetPosition[1],
            pos_z: clickAssetPosition[2],
            rot_x: clickAssetRotation[0],
            rot_y: clickAssetRotation[1],
            rot_z: clickAssetRotation[2],
            userAssetId: clickAsseData.userAssetId
          };
          // settingMethod();
          const { data, result } = await putMypage(body).unwrap();
          if (result === 'SUCCESS') {
            toast.success('배치 완료!');
            clickBtn.play();
          } else {
            toast.error('요청 실패!');
            errorFxSound.play();
          }
        };
        settingAsset();

        break;
      case '취소':
        settingMethod();

        break;
      case '마이룸에 넣기':
        setIsClickAsset(true);
        const goMypage = async () => {
          const { data, result } = await postMypage(clickAsseData.userAssetId).unwrap();
          if (result === 'SUCCESS') {
            toast.success('마이룸에 추가했습니다.');
            clickBtn.play();
          } else {
            toast.error('요청 실패!');
            errorFxSound.play();
          }
          dispatch(changeIsClickInvenAssetStore(false));
        };
        goMypage();
        break;
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value as string;
    switch (target.ariaLabel) {
      case 'pos1':
      case 'pos1M':
        dispatch(changeClickAssetPosition([parseInt(value), clickAssetPosition[1], clickAssetPosition[2]]));
        break;
      case 'pos2':
      case 'pos2M':
        dispatch(changeClickAssetPosition([clickAssetPosition[0], parseInt(value), clickAssetPosition[2]]));
        break;
      case 'pos3':
      case 'pos3M':
        dispatch(changeClickAssetPosition([clickAssetPosition[0], clickAssetPosition[1], parseInt(value)]));
        break;
      case 'rot1':
      case 'rot1M':
        dispatch(changeClickAssetRotation([parseInt(value), clickAssetRotation[1], clickAssetRotation[2]]));
        break;
      case 'rot2':
      case 'rot2M':
        dispatch(changeClickAssetRotation([clickAssetRotation[0], parseInt(value), clickAssetRotation[2]]));
        break;
      case 'rot3':
      case 'rot3M':
        dispatch(changeClickAssetRotation([clickAssetRotation[0], clickAssetRotation[1], parseInt(value)]));
        break;
    }
  };

  const Auction = () => {
    const ref = useRef(null);
    return (
      <>
        <div
          ref={ref}
          className="fixed flex items-center z-50 justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 pt-5 lg:pt-0"
          onClick={(e) => {
            if (e.target === ref.current) {
              cancelClickBtn.play();
              setIsModalClick(false);
            }
          }}>
          <div className="bg-[#FEF3F3] border-[#D9D9D9] border-2 flex flex-col max-w-[30rem] min-w-[30rem] lg:max-w-[32rem] lg:min-w-[32rem] rounded-lg px-10 py-2 lg:py-4">
            <div className="flex flex-col items-center w-full py-2 border-b-2 border-white">
              <span className="text-[1rem] lg:text-[1.2rem] font-semibold">경매장</span>
              <span aria-label="모달" className="font-bold text-[1.2rem] lg:text-[1.5rem]" onClick={click}>
                판매 아이템 등록
              </span>
            </div>
            <div className="flex justify-center w-full py-4 space-x-6">
              <div className="flex flex-col justify-center items-center w-[35%] bg-white rounded-lg">
                <img
                  className="max-w-[10rem] max-h-[10rem] lg:max-w-[10rem] lg:max-h-[10rem]"
                  src={process.env.REACT_APP_S3_URL + `/assets/img/${clickAsseData.assetName}.png`}
                  alt="가구"
                />
              </div>
              <div className="flex justify-start items-start flex-col w-[55%] space-y-2 ">
                {clickAsseData.assetLevel === 'RARE' && (
                  <div className="bg-[#4fb3ff] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>레어</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'EPIC' && (
                  <div className="bg-[#b73bec] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>에픽</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'UNIQUE' && (
                  <div className="bg-[#FFC34F] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>유니크</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'LEGENDARY' && (
                  <div className="bg-[#26c744] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>레전더리</span>
                  </div>
                )}
                <div className="flex flex-col w-full space-y-1">
                  <div className="flex items-end justify-start w-full space-x-2">
                    <span className="text-[0.9rem] lg:text-[1.3rem] font-semibold">가격</span>
                    <span className="text-[0.6rem] lg:text-[0.6rem] pb-[3px] text-[#6c6c6c]">
                      1만원 ~ 1억 미만으로 등록 가능합니다
                    </span>
                  </div>
                  <div className="bg-white border-[#FDE2E2] border-2 text-[0.8rem] lg:text-[0.9rem]">
                    <input
                      autoFocus
                      ref={auctionInput}
                      className="py-[2px] lg:py-2 rounded-md outline-none pr-2 text-end"
                      type="text"
                      placeholder="판매 가격"
                      maxLength={4}
                    />
                    <span>만원</span>
                  </div>
                  <div className="w-full flex flex-col text-[0.7rem] space-y-1 lg:text-[0.85em] text-[#8A8A8A] leading-4 py-2">
                    <span>등록시간은 6시간입니다.</span>
                    <span>미판매시 자동으로 창고에 저장됩니다.</span>
                  </div>
                </div>
                <div className="flex w-full space-x-2 text-[0.9rem] lg:text-[1.1rem] text-center font-bold text-white">
                  <div
                    aria-label="닫기"
                    className="bg-[#858484] cursor-pointer hover:bg-[#6a6868] hover:scale-105 active:bg-[#6a6868] active:scale-105 transition-all duration-300 py-1 w-1/2 rounded-md"
                    onClick={click}>
                    <span>닫기</span>
                  </div>
                  <div
                    aria-label="판매등록"
                    className="bg-[#fa5353] cursor-pointer hover:bg-[#fd3434] hover:scale-105 active:bg-[#fd3434] active:scale-105 transition-all duration-300 py-1 w-1/2 rounded-md"
                    onClick={click}>
                    <span>판매 등록</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ResaleModal = () => {
    return (
      <>
        <div
          ref={resaleRef}
          className="fixed flex items-center z-50 justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 pt-5 lg:pt-0"
          onClick={(e) => {
            if (e.target === resaleRef.current) {
              cancelClickBtn.play();
              setIsResaleModalClick(false);
            }
          }}>
          <div className="bg-[#FEF3F3] border-[#D9D9D9] border-2 flex flex-col max-w-[30rem] min-w-[30rem] lg:max-w-[32rem] lg:min-w-[32rem] rounded-lg px-10 py-2 lg:py-4">
            <div className="flex flex-col items-center w-full py-2 border-b-2 border-white">
              <span className="text-[1.2rem] lg:text-[1.5rem] font-semibold">판매</span>
            </div>
            <div className="flex flex-col items-center justify-center w-full py-4 space-x-6">
              <div className="flex flex-col items-start justify-center w-full px-2 py-2 bg-white rounded-lg">
                {clickAsseData.assetLevel === 'RARE' && (
                  <div className="bg-[#4fb3ff] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>레어</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'EPIC' && (
                  <div className="bg-[#b73bec] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>에픽</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'UNIQUE' && (
                  <div className="bg-[#FFC34F] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>유니크</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'LEGENDARY' && (
                  <div className="bg-[#26c744] text-white font-extrabold shadow-md shadow-gray-400 px-5 lg:px-7 py-[1px] lg:py-[2.5px] rounded-full">
                    <span>레전더리</span>
                  </div>
                )}
                <div className="flex flex-col items-center justify-start w-full bg-white rounded-lg">
                  <img
                    className="max-w-[15rem] max-h-[15rem] lg:max-w-[25rem] lg:max-h-[25rem]"
                    src={process.env.REACT_APP_S3_URL + `/assets/img/${clickAsseData.assetName}.png`}
                    alt="가구"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between text-[0.9rem] lg:text-[1.1rem] text-center font-bold text-white">
              <div
                aria-label="판매모달닫기"
                className="bg-[#858484] cursor-pointer hover:bg-[#6a6868] hover:scale-105 active:bg-[#6a6868] active:scale-105 transition-all duration-300 py-1 w-[48%] rounded-md"
                onClick={click}>
                <span>닫기</span>
              </div>
              <div
                aria-label="판매"
                className="bg-[#fa5353] cursor-pointer hover:bg-[#fd3434] hover:scale-105 active:bg-[#fd3434] active:scale-105 transition-all duration-300 py-1 w-[48%] rounded-md"
                onClick={click}>
                <span>판매</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isModalClick && <Auction />}
      {isResaleModalClick && <ResaleModal />}
      {/* 데스크탑 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
        className="hidden items-center w-full h-full justify-evenly max-w-[80rem] min-h-[43rem] max-h-[46.5rem] my-auto mx-auto lg:flex">
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
                <AllAssetsList
                  len={0.0055}
                  pos={[0, -0.98, -8]}
                  rot={[1.75, 0, -0.8]}
                  isClickAsset={isClickAsset}
                  setIsClickAsset={setIsClickAsset}
                  clickBtn={clickBtn}
                />
              </Canvas>
            </Suspense>
          </div>
        </div>
        <div className="flex justify-center items-center lg:w-[33%] lg:pr-[2%] xl:pr-0 xl:w-[27%] pb-10">
          <div className="flex flex-col w-full font-extrabold">
            {/* 버튼 */}
            {/* 에셋 이미지 & 위치 조정 및 배치*/}
            <div className="flex flex-col justify-center items-center border-4 border-[#fb7c7c] rounded-3xl text-white mb-10">
              {/* 등급 */}
              <div className="z-10 flex items-center justify-between w-full px-2 py-2">
                {/* 희귀도 */}
                {clickAsseData.assetLevel === 'RARE' && (
                  <div className="bg-[#4fb3ff] shadow-md shadow-gray-400 px-7 py-[2.5px] rounded-full">
                    <span>레어</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'EPIC' && (
                  <div className="bg-[#b73bec] shadow-md shadow-gray-400 px-7 py-[2.5px] rounded-full">
                    <span>에픽</span>
                  </div>
                )}
                {clickAsseData.assetLevel === 'UNIQUE' && (
                  <div className="bg-[#FFC34F] shadow-md shadow-gray-400 px-7 py-[2.5px] rounded-full">
                    <span>유니크</span>
                  </div>
                )}
                {isAuction !== true && clickAsseData.assetName !== '' && !isAuctionClickInvenAsset ? (
                  <div className="flex items-center justify-between text-white">
                    <div
                      aria-label="판매모달"
                      className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg bg-[#EA455D] rounded-full mr-1"
                      onClick={click}>
                      <span>판매</span>
                    </div>
                    <div
                      aria-label="경매장 등록"
                      className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg bg-[#EA455D] rounded-full"
                      onClick={click}>
                      <span>경매장 등록</span>
                    </div>
                  </div>
                ) : (
                  // 공간만 차지하기
                  <div className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg rounded-full mr-1">
                    &nbsp;
                  </div>
                )}
              </div>
              {/* 에셋 이미지 */}
              <div
                className={`flex justify-center my-2} ${
                  isClickInvenAssetStore
                    ? 'w-[16rem] h-[16rem] max-w-[16rem] max-h-[16rem]'
                    : 'w-[11.5rem] h-[11.5rem] max-w-[11.5rem] max-h-[11.5rem]'
                } `}>
                {clickAsseData.assetName !== '' ? (
                  <img
                    className="object-contain scale-[1.8] drop-shadow-lg"
                    src={process.env.REACT_APP_S3_URL + `/assets/img/${clickAsseData.assetName}.png`}
                    alt="가구"
                  />
                ) : (
                  <img
                    className="object-contain drop-shadow-lg"
                    src={process.env.REACT_APP_S3_URL + `/images/icons/question.png`}
                    alt="가구"
                  />
                )}
              </div>
              {/* 포지션 변경 */}
              {(!isAuction && !isAuctionClickInvenAsset) || clickAsseData.assetName === '' ? (
                <>
                  {isClickInvenAssetStore ? (
                    // 인벤토리에 있는 걸 클릭했을 경우
                    <div className="pb-10 ">
                      <span className="text-[1.3rem] text-black">{clickAsseData.assetNameKor}</span>
                    </div>
                  ) : (
                    <div className="z-10 flex justify-between w-full px-5 py-3 mb-2 text-black">
                      {/* Position */}
                      <div className="flex flex-col items-start w-[45%] space-y-1 justify-evenly">
                        <div className="flex justify-center w-full">
                          <span>위치</span>
                        </div>
                        <div className="relative flex items-center w-full space-x-2">
                          <div>
                            <span>X</span>
                          </div>
                          <input
                            min={-200}
                            max={200}
                            step={0.1}
                            // defaultValue={0}
                            aria-label="pos1"
                            className={`flex items-center w-[90%]`}
                            value={clickAssetPosition[0]}
                            type="range"
                            onChange={change}
                          />
                          {/* <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
                          <div
                            className={`bg-[#ffc0c0] h-full rounded-full`}
                            style={{ width: `${(parseInt(pos1) + 200 / 4).toFixed(2)}%` }}></div>
                        </div> */}
                        </div>
                        <div className="relative flex items-center w-full space-x-2">
                          <div>
                            <span>Y</span>
                          </div>
                          <input
                            min={-200}
                            max={200}
                            step={0.1}
                            // defaultValue={0}
                            aria-label="pos2"
                            className={`flex items-center w-[90%]`}
                            value={clickAssetPosition[1]}
                            type="range"
                            onChange={change}
                          />
                          {/* <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
                          <div className={`bg-[#ffedc0] h-full rounded-full`} style={{ width: `${pos2}%` }}></div>
                        </div> */}
                        </div>
                        <div className="relative flex items-center w-full space-x-2">
                          <div>
                            <span>Z</span>
                          </div>
                          <input
                            min={-400}
                            max={0}
                            step={0.1}
                            // defaultValue={-200}
                            aria-label="pos3"
                            className={`flex items-center w-[90%]`}
                            value={clickAssetPosition[2]}
                            type="range"
                            onChange={change}
                          />
                          {/* <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
                          <div className={`bg-[#fffca9] h-full rounded-full`} style={{ width: `${pos3}%` }}></div>
                        </div> */}
                        </div>
                      </div>
                      {/* Rotation */}
                      <div className="flex flex-col items-start w-[45%] space-y-1 justify-evenly">
                        <div className="flex justify-center w-full">
                          <span>회전</span>
                        </div>
                        <div className="relative flex items-center w-full space-x-2">
                          <div>
                            <span>X</span>
                          </div>
                          <input
                            min={-10}
                            max={10}
                            step={0.00001}
                            // defaultValue={0}
                            aria-label="rot1"
                            className={`flex items-center w-[90%]`}
                            value={clickAssetRotation[0]}
                            type="range"
                            onChange={change}
                          />
                          {/* <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
                          <div className={`bg-[#DCFFC0] h-full rounded-full`} style={{ width: `${rot1}%` }}></div>
                        </div> */}
                        </div>
                        <div className="relative flex items-center w-full space-x-2">
                          <div>
                            <span>Y</span>
                          </div>
                          <input
                            min={-10}
                            max={10}
                            step={0.00001}
                            // defaultValue={0}
                            aria-label="rot2"
                            className={`flex items-center w-[90%]`}
                            value={clickAssetRotation[1]}
                            type="range"
                            onChange={change}
                          />
                          {/* <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
                          <div className={`bg-[#C6EEFF] h-full rounded-full`} style={{ width: `${rot2}%` }}></div>
                        </div> */}
                        </div>
                        <div className="relative flex items-center w-full space-x-2">
                          <div>
                            <span>Z</span>
                          </div>
                          <input
                            min={-10}
                            max={10}
                            step={0.00001}
                            // defaultValue={0}
                            aria-label="rot3"
                            className={`flex items-cente w-[90%]`}
                            value={clickAssetRotation[2]}
                            type="range"
                            onChange={change}
                          />
                          {/* <div className="absolute w-[85%] h-[10px] rounded left-3 bg-[#EAEAEA]">
                          <div className={`bg-[#f0d9ff] h-full rounded-full`} style={{ width: `${rot3}%` }}></div>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 버튼 */}
                  <div
                    className={`flex w-full pb-2 ${
                      isClickInvenAssetStore ? 'justify-between px-2' : 'justify-evenly'
                    }`}>
                    <div
                      aria-label="취소"
                      className="bg-[#E94561] py-1 drop-shadow-lg px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
                      onClick={click}>
                      <span>취소</span>
                    </div>
                    <div
                      aria-label="배치"
                      className={`bg-[#87D21F] py-1 drop-shadow-lg px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer ${
                        isClickInvenAssetStore ? 'hidden' : 'flex'
                      }`}
                      onClick={click}>
                      <span>배치 완료</span>
                    </div>
                    {isClickInvenAssetStore ? (
                      <div
                        aria-label="마이룸에 넣기"
                        className="bg-[#87D21F] py-1 drop-shadow-lg px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={click}>
                        <span>마이룸에 넣기</span>
                      </div>
                    ) : (
                      <div
                        aria-label="창고"
                        className="bg-[#41A4F7] py-1 drop-shadow-lg px-6 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={click}>
                        <span>창고에 넣기</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // 경매장에 등록했을 때
                <div className="flex flex-col w-full px-5 pt-[1.1rem] pb-4 mb-2 space-y-4 font-extrabold text-black">
                  <div className="flex flex-col w-full space-y-2 text-[#707070]">
                    <div className="justify-center w-full text-center">
                      <span>경매장에서 판매중인 아이템입니다.</span>
                    </div>
                  </div>
                  <div aria-label="판매 취소" className="z-20 flex justify-center w-full" onClick={click}>
                    <span className="px-5 py-1 cursor-pointer rounded-full bg-[#EA455D] text-white text-[1.1rem] hover:scale-105 hover:transition duration-300">
                      판매 취소
                    </span>
                  </div>
                </div>
              )}
            </div>
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
        className="relative flex items-center justify-between w-full h-full mx-auto my-auto overflow-y-hidden lg:hidden">
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
            <Suspense fallback={<AssetLoading />}>
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
                <AllAssetsList
                  len={0.0055}
                  pos={[0, -0.98, -8]}
                  rot={[1.75, 0, -0.8]}
                  isClickAsset={isClickAsset}
                  setIsClickAsset={setIsClickAsset}
                  clickBtn={clickBtn}
                />
              </Canvas>
            </Suspense>
          </div>
        </div>
        {/* <div className="w-[5%]"></div> */}
        <div className="flex flex-col justify-center w-[35%] md:w-[30%] pt-16 font-extrabold">
          {/* 에셋 이미지 & 위치 조정 및 배치*/}
          <div className="flex flex-col justify-center px-1 items-center w-full border-[3px] border-[#fb7c7c] rounded-2xl text-white mb-10">
            {/* 등급 */}
            <div className="flex justify-between w-full pt-2 pl-1 pb-1 text-[0.65rem]">
              {/* 희귀도 */}
              {clickAsseData.assetLevel === 'RARE' && (
                <div className="bg-[#4fb3ff] shadow-md shadow-gray-400 px-5 py-[2.5px] rounded-full">
                  <span>레어</span>
                </div>
              )}
              {clickAsseData.assetLevel === 'EPIC' && (
                <div className="bg-[#b73bec] shadow-md shadow-gray-400 px-5 py-[2.5px] rounded-full">
                  <span>에픽</span>
                </div>
              )}
              {clickAsseData.assetLevel === 'UNIQUE' && (
                <div className="bg-[#FFC34F] shadow-md shadow-gray-400 px-5 py-[2.5px] rounded-full">
                  <span>유니크</span>
                </div>
              )}
              {isAuction !== true && clickAsseData.assetName !== '' && !isAuctionClickInvenAsset ? (
                <div className="z-20 flex items-center justify-between text-white">
                  <div
                    aria-label="판매모달"
                    className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg bg-[#EA455D] rounded-full mr-1"
                    onClick={click}>
                    <span>판매</span>
                  </div>
                  <div
                    aria-label="경매장 등록"
                    className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg bg-[#EA455D] rounded-full"
                    onClick={click}>
                    <span>경매장 등록</span>
                  </div>
                </div>
              ) : (
                // 공간만 차지하기
                <div className="px-3 cursor-pointer py-[2px] hover:scale-105 transition-all duration-300 drop-shadow-lg rounded-full mr-1">
                  &nbsp;
                </div>
              )}
            </div>
            {/* 에셋 이미지 */}
            <div
              className={`flex justify-center ${
                isClickInvenAssetStore
                  ? 'w-[7rem] h-[10.4rem] max-w-[7rem] max-h-[10.4rem]'
                  : 'w-[7rem] h-[7rem] max-w-[7rem] max-h-[7rem]'
              } `}>
              {clickAsseData.assetName !== '' ? (
                <img
                  className={`object-contain drop-shadow-lg ${isClickInvenAssetStore ? 'scale-[2]' : 'scale-[1.8]'}`}
                  src={process.env.REACT_APP_S3_URL + `/assets/img/${clickAsseData.assetName}.png`}
                  alt="가구"
                />
              ) : (
                <img
                  className="object-contain drop-shadow-lg"
                  src={process.env.REACT_APP_S3_URL + `/images/icons/question.png`}
                  alt="가구"
                />
              )}
            </div>
            {(!isAuction && !isAuctionClickInvenAsset) || clickAsseData.assetName === '' ? (
              <>
                {isClickInvenAssetStore ? (
                  <div className="pb-10 ">
                    <span className="text-[1rem] text-black">{clickAsseData.assetNameKor}</span>
                  </div>
                ) : (
                  <div className="flex justify-between w-full px-1 py-3 mb-2 text-black text-[0.6rem]">
                    {/* Position */}
                    <div className="flex flex-col items-start w-[45%] space-y-2 justify-evenly">
                      <div className="flex justify-center w-full">
                        <span>위치</span>
                      </div>
                      <div className="relative flex items-center w-full space-x-1">
                        <div>
                          <span>X</span>
                        </div>
                        <input
                          min={-200}
                          max={200}
                          step={0.1}
                          aria-label="pos1M"
                          className={`flex items-center w-[90%]`}
                          value={clickAssetPosition[0]}
                          type="range"
                          onChange={change}
                        />
                        {/* <div className="absolute w-[84%] max-w-[84%] h-[8px] rounded left-[6px] bg-[#EAEAEA]">
                    <div className={`bg-[#ffc0c0] h-full rounded-full`} style={{ width: `${pos1}%` }}></div>
                  </div> */}
                      </div>
                      <div className="relative flex items-center w-full space-x-1">
                        <div>
                          <span>Y</span>
                        </div>
                        <input
                          min={-200}
                          max={200}
                          step={0.1}
                          // defaultValue={0}
                          aria-label="pos2M"
                          className={`flex items-center w-[90%]`}
                          value={clickAssetPosition[1]}
                          type="range"
                          onChange={change}
                        />
                        {/* <div className="absolute w-[84%] max-w-[84%] h-[8px] rounded left-[6px] bg-[#EAEAEA]">
                    <div className={`bg-[#fec563] h-full rounded-full`} style={{ width: `${pos2}%` }}></div>
                  </div> */}
                      </div>
                      <div className="relative flex items-center w-full space-x-1">
                        <div>
                          <span>Z</span>
                        </div>
                        <input
                          min={-400}
                          max={0}
                          step={0.1}
                          // defaultValue={-200}
                          aria-label="pos3M"
                          className={`flex items-center w-[90%]`}
                          value={clickAssetPosition[2]}
                          type="range"
                          onChange={change}
                        />
                        {/* <div className="absolute w-[84%] max-w-[84%] h-[8px] rounded left-[6px] bg-[#EAEAEA]">
                    <div className={`bg-[#fffca9] h-full rounded-full`} style={{ width: `${pos3}%` }}></div>
                  </div> */}
                      </div>
                    </div>
                    {/* Rotation */}
                    <div className="flex flex-col items-start w-[45%] space-y-2 justify-evenly">
                      <div className="flex justify-center w-full">
                        <span>회전</span>
                      </div>
                      <div className="relative flex items-center w-full space-x-1">
                        <div>
                          <span>X</span>
                        </div>
                        <input
                          min={-10}
                          max={10}
                          step={0.00001}
                          // defaultValue={0}
                          aria-label="rot1M"
                          className={`flex items-center w-[90%]`}
                          value={clickAssetRotation[0]}
                          type="range"
                          onChange={change}
                        />
                        {/* <div className="absolute w-[84%] max-w-[84%] h-[8px] rounded left-[6px] bg-[#EAEAEA]">
                    <div className={`bg-[#DCFFC0] h-full rounded-full`} style={{ width: `${rot1}%` }}></div>
                  </div> */}
                      </div>
                      <div className="relative flex items-center w-full space-x-1">
                        <div>
                          <span>Y</span>
                        </div>
                        <input
                          min={-10}
                          max={10}
                          step={0.00001}
                          // defaultValue={0}
                          aria-label="rot2M"
                          className={`flex items-center w-[90%]`}
                          value={clickAssetRotation[1]}
                          type="range"
                          onChange={change}
                        />
                        {/* <div className="absolute w-[84%] max-w-[84%] h-[8px] rounded left-[6px] bg-[#EAEAEA]">
                    <div className={`bg-[#C6EEFF] h-full rounded-full`} style={{ width: `${rot2}%` }}></div>
                  </div> */}
                      </div>
                      <div className="relative flex items-center w-full space-x-1">
                        <div>
                          <span>Z</span>
                        </div>
                        <input
                          min={-10}
                          max={10}
                          step={0.00001}
                          // defaultValue={0}
                          aria-label="rot3M"
                          className={`flex items-center w-[90%]`}
                          value={clickAssetRotation[2]}
                          type="range"
                          onChange={change}
                        />
                        {/* <div className="absolute w-[84%] max-w-[84%] h-[8px] rounded left-[6px] bg-[#EAEAEA]">
                    <div className={`bg-[#f0d9ff] h-full rounded-full`} style={{ width: `${rot3}%` }}></div>
                  </div> */}
                      </div>
                    </div>
                  </div>
                )}

                {/* 버튼 */}
                <div
                  className={`flex w-full pb-2 text-[0.65rem] transition-all duration-300 ${
                    isClickInvenAssetStore ? 'justify-between px-2' : 'justify-evenly'
                  }`}>
                  <div
                    aria-label="취소"
                    className="bg-[#E94561] drop-shadow-lg py-[3px] px-[0.85rem] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={click}>
                    <span>취소</span>
                  </div>
                  <div
                    aria-label="배치"
                    className={`bg-[#87D21F] drop-shadow-lg py-[3px] px-[0.85rem] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer ${
                      isClickInvenAssetStore ? 'hidden' : 'flex'
                    }`}
                    onClick={click}>
                    <span>배치 완료</span>
                  </div>
                  {isClickInvenAssetStore ? (
                    <div
                      aria-label="마이룸에 넣기"
                      className="bg-[#87D21F] drop-shadow-lg py-[3px] px-[0.85rem] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
                      onClick={click}>
                      <span>마이룸에 넣기</span>
                    </div>
                  ) : (
                    <div
                      aria-label="창고"
                      className="bg-[#41A4F7] drop-shadow-lg py-[3px] px-[0.85rem] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
                      onClick={click}>
                      <span>창고에 넣기</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // 경매장에 등록했을 때
              <div className="flex flex-col w-full px-[0.5rem] pt-[0.68] pb-4 mb-1 space-y-2 font-extrabold text-black">
                <div className="flex flex-col w-full space-y-2 text-[#707070] text-[0.825rem]">
                  <div className="justify-center w-full text-center ">
                    <span>경매장에서 판매중인 아이템입니다.</span>
                  </div>
                </div>
                <div aria-label="판매 취소" className="z-20 flex justify-center w-full pt-1 cur" onClick={click}>
                  <span className="px-5 py-1 rounded-full bg-[#EA455D] cursor-pointer text-white text-[0.8rem] hover:scale-105 active:scale-105 transition-all duration-300">
                    판매 취소
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <MypageInven setIsClickAsset={setIsClickAsset} clickBtn={clickBtn} />
    </>
  );
}
export default Mypage;
