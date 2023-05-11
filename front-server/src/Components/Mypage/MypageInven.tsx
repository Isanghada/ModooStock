import { useGetStorageQuery, useLazyGetStorageQuery, usePostMypageMutation } from 'Store/api';
import styled from './Mypage.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'Store/hooks';
import {
  changeClickAsseData,
  changeClickAssetPosition,
  changeClickAssetRotation,
  changeIsAuctionClickInvenAsset,
  changeIsClickInvenAssetStore
} from 'Store/store';

interface ReturnInvenType {
  userAssetId: number;
  assetImagePath: string;
  assetLevel: string;
  assetCategory: null;
  isAuctioned: string;
}

interface Type {
  setIsClickAsset: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ReturnInven {
  userAssetId: number;
  assetNameKor: string;
  assetName: string;
  assetLevel: string;
  assetCategory: string;
  isAuctioned: string;
}

function MypageInven({ setIsClickAsset }: Type): JSX.Element {
  const dispatch = useAppDispatch();
  const containerRef = useRef<any>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [funitureList, setFunitureList] = useState<any>();
  const [clickState, setClickState] = useState<number>(0); // 0: ALL, 1:소품, 2:가구, 3:방
  // const { data: getStorage, isLoading: isLoading1, isError: isError1 } = useGetStorageQuery('');
  const { data: getStorage, isLoading: isLoading1, isError: isError1 } = useGetStorageQuery('');
  const [getLazyStorage, { isLoading: isLoading2, isError: isError2 }] = useLazyGetStorageQuery();
  const [postMypage, { isLoading: isLoading3, isError: isError3 }] = usePostMypageMutation();

  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case 'ALL':
        setClickState(0);
        break;
      case '소품':
        setClickState(1);
        break;
      case '가구':
        setClickState(2);
        break;
      case '집':
        setClickState(3);
        break;
    }
  };

  useEffect(() => {
    const myInven = async () => {
      const { data, result } = await getLazyStorage('').unwrap();

      let funitureListData: ReturnInven[] = [];
      switch (clickState) {
        case 0: // ALL
          funitureListData = data;
          break;
        case 1: // 소품
          funitureListData = data.filter((asset) => {
            return asset.assetCategory === 'PROP';
          });
          break;
        case 2: // 가구
          funitureListData = data.filter((asset) => {
            return asset.assetCategory === 'FURNITURE';
          });
          break;
        case 3: // 집
          funitureListData = data.filter((asset) => {
            return asset.assetCategory === 'ROOM';
          });
          break;
      }

      setFunitureList(
        funitureListData
          .map((funiture, idx) => {
            return (
              <div
                onClick={() => {
                  // 에셋을 클릭했는지 체크
                  dispatch(changeIsClickInvenAssetStore(true));
                  // 클릭한 에셋 이름, 레벨, 이미지 보여주면서 state 변경해서 넣을지 확인하는 작은 창 만들기
                  dispatch(
                    changeClickAsseData({
                      userAssetId: funiture.userAssetId,
                      assetName: funiture.assetName,
                      assetNameKor: funiture.assetNameKor,
                      pos_x: 0,
                      pos_y: 0,
                      pos_z: -200,
                      rot_x: 0,
                      rot_y: 0,
                      rot_z: 0,
                      assetLevel: funiture.assetLevel
                    })
                  );
                  if (funiture.isAuctioned === 'Y') {
                    dispatch(changeIsAuctionClickInvenAsset(true));
                  } else {
                    dispatch(changeIsAuctionClickInvenAsset(false));
                  }
                }}
                // onDoubleClick={() => {
                //   setIsClickAsset(true);
                //   const goMypage = async () => {
                //     const { data, result } = await postMypage(funiture.userAssetId).unwrap();
                //   };
                //   goMypage();
                // }}
                key={funiture.userAssetId}
                className="flex flex-col justify-between items-center w-[5rem] lg:w-[10rem] h-[85%] my-auto border-2 pb-2 border-[#F0EBE3] rounded-2xl mx-1 lg:mx-2 bg-[#FFFFFF] hover:scale-105 transition-all duration-500 cursor-pointer hover:drop-shadow-lg hover:border-[#fb7c7c]/40 hover:border-[3px]">
                {/* 이미지 */}
                <div className="flex justify-center w-[65%] h-[65%] lg:w-[75%] lg:h-[75%] lg:mb-1">
                  <img
                    className="h-full drop-shadow-lg scale-[1.3]"
                    src={process.env.REACT_APP_S3_URL + `/assets/img/${funiture.assetName}.png`}
                    alt=""
                  />
                </div>
                {/* 희귀도 */}
                {funiture.assetLevel === 'RARE' && (
                  <div className="bg-[#4fb3ff] shadow-md shadow-gray-400 px-3 lg:px-7 mb-[5%] text-[0.6rem] lg:text-[1rem] rounded-full font-extrabold flex">
                    <span>레어</span>
                  </div>
                )}
                {funiture.assetLevel === 'EPIC' && (
                  <div className="bg-[#b73bec] shadow-md shadow-gray-400 px-3 lg:px-7 mb-[5%] text-[0.6rem] lg:text-[1rem] rounded-full font-extrabold flex">
                    <span>에픽</span>
                  </div>
                )}
                {funiture.assetLevel === 'UNIQUE' && (
                  <div className="bg-[#FFC34F] shadow-md shadow-gray-400 px-3 lg:px-7 mb-[5%] text-[0.6rem] lg:text-[1rem] rounded-full font-extrabold flex">
                    <span>유니크</span>
                  </div>
                )}
              </div>
            );
          })
          .reverse()
      );
    };
    myInven();
  }, [clickState, getStorage]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const dx = x - startX;
    containerRef.current.scrollLeft = scrollLeft - dx;
  };
  return (
    <>
      <div className="absolute flex flex-start w-[63%] lg:w-full mx-auto h-[5.7rem] md:h-[7rem] lg:h-[11.5rem] bg-[#FFFFFF]/40 bottom-0 lg:bottom-2 z-10 text-white ">
        {/* 가구 섹션 */}
        <div className="flex flex-col text-center justify-center text-white w-[12.5%] lg:w-[9%] text-[0.7rem] lg:text-[1rem] font-extrabold">
          <div
            aria-label="ALL"
            className="w-full my-[1px] md:py-[2px] shadow-md shadow-gray-400 lg:py-2 drop-shadow-lg bg-[#FB6B9F] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={click}>
            <span>ALL</span>
          </div>
          <div
            aria-label="소품"
            className="w-full my-[1px] md:py-[2px] shadow-md shadow-gray-400 lg:py-2 drop-shadow-lg bg-[#FB8B2D] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={click}>
            <span>소품</span>
          </div>
          <div
            aria-label="가구"
            className="w-full my-[1px] md:py-[2px] shadow-md shadow-gray-400  lg:py-2 drop-shadow-lg bg-[#D46AED] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={click}>
            <span>가구</span>
          </div>
          <div
            aria-label="집"
            className="w-full my-[1px] md:py-[2px] shadow-md shadow-gray-400 lg:py-2 drop-shadow-lg bg-[#2E94E8] rounded-tr-lg rounded-br-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={click}>
            <span>집</span>
          </div>
        </div>
        <div className="w-[2%]"></div>
        {/* 가구 목록 */}

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex justify-start w-[84%] h-full flex-nowrap overflow-x-auto ${styled.scroll}`}>
          <div className="flex justify-start">{funitureList}</div>
        </div>
      </div>
    </>
  );
}
export default MypageInven;
