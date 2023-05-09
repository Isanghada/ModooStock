import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useGetMypageQuery, useGetStorageQuery, useLazyGetMypageQuery } from 'Store/api';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeClickAsseData, changeClickAssetPosition, changeClickAssetRotation } from 'Store/store';
import React, { useEffect, useRef, useState } from 'react';

interface AssetType {
  userAssetId: number;
  assetName: string;
  assetLevel: string;
  pos_x: number;
  pos_y: number;
  pos_z: number;
  rot_x: number;
  rot_y: number;
  rot_z: number;
}

function AllAssetsList({ len, pos, rot, isClickAsset, setIsClickAsset }: any): JSX.Element {
  const dispatch = useAppDispatch();
  const [getLazyMypage, { isLoading: isLoading1, isError: isError1 }] = useLazyGetMypageQuery();
  const { data: getMypage, isLoading: isLoading2, isError: isError2 } = useGetMypageQuery('');
  // const { data: getStorage, isLoading: isLoading3, isError: isError3 } = useGetStorageQuery('');
  const { nodes, materials }: any = useGLTF(process.env.REACT_APP_S3_URL + '/assets/AllAssetsFile.gltf');
  const [scale, setScale] = useState(len);
  const [myAssets, setMyAssets] = useState<any>();
  const clickAsseData = useAppSelector((state) => {
    return state.clickAsseData;
  });
  const clickAssetPosition = useAppSelector((state) => {
    return state.clickAssetPosition;
  });
  const clickAssetRotation = useAppSelector((state) => {
    return state.clickAssetRotation;
  });

  // console.log('data1: ', data1);

  const ref = useRef<any>(null);

  const click = (asset: AssetType, pos: number[], rot: number[]) => {
    console.log('asset: ', asset);

    dispatch(changeClickAsseData(asset));
    dispatch(changeClickAssetPosition(pos));
    dispatch(changeClickAssetRotation(rot));
    setIsClickAsset(true);
  };

  const changeClick = (asset: any, pos: number[], rot: number[]) => {
    console.log('asset: ', asset);

    dispatch(
      changeClickAsseData({
        userAssetId: asset.userAssetId,
        assetName: asset.assetName,
        assetLevel: asset.assetLevel,
        pos_x: pos[0],
        pos_y: pos[1],
        pos_z: pos[2],
        rot_x: rot[0],
        rot_y: rot[1],
        rot_z: rot[2]
      })
    );
    dispatch(changeClickAssetPosition(pos));
    dispatch(changeClickAssetRotation(rot));
    setIsClickAsset(true);
  };

  // 현재 배치해놓은 에셋 보이도록 하기
  useEffect(() => {
    // api로 받아올 보여지는 에셋 데이터
    const getMyRoomAssets = async () => {
      const { data, result } = await getLazyMypage('').unwrap();
      let geo: any = [];
      console.log('data: ', data);

      data.map((asset, idx) => {
        geo = [...geo, nodes[asset.assetName].geometry];
      });

      // 데이터
      setMyAssets(
        data.map((asset: any, idx: number) => {
          return (
            <mesh
              key={idx}
              geometry={geo[idx]}
              material={materials[Object.keys(materials)[0]]}
              position={[asset.pos_x, asset.pos_y, asset.pos_z]}
              rotation={[asset.rot_x, asset.rot_y, asset.rot_z]}
              visible={true}
              onClick={(e) => {
                e.stopPropagation();
                click(
                  // 이름. position, rotation
                  asset,
                  [asset.pos_x, asset.pos_y, asset.pos_z],
                  [asset.rot_x, asset.rot_y, asset.rot_z]
                );
              }}
            />
          );
        })
      );
    };
    getMyRoomAssets();
  }, []);

  useEffect(() => {
    if (isClickAsset) {
      console.log('clickAsseData.assetName: ', clickAsseData.assetName);

      const getMyRoomAssets = async () => {
        const { data, result } = await getLazyMypage('').unwrap();

        console.log('data: ', data);

        let geo: any = [];
        data.map((asset, idx) => {
          geo = [...geo, nodes[asset.assetName].geometry];
        });

        // 데이터
        setMyAssets(
          data.map((asset, idx: number) => {
            let isClick = false;
            // position => [x: -200 ~ 200 ,y: -200 ~ 200 ,z: -400 ~ 0]
            // rotation => [x: -1.5 ~ 1.5 ,y: -1.5 ~ 1.5 ,z: -3 ~ 3]
            // console.log('asset.assetName', asset.assetName);
            // console.log('clickAsseData.assetName', clickAsseData.assetName);

            if (asset.assetName === clickAsseData.assetName) {
              isClick = true;

              // console.log('clickAsseData: ', '이거다!!');

              // console.log('clickAssetPosition: ', clickAssetPosition);
              // console.log('clickAssetRotation: ', clickAssetRotation);
            }
            return (
              <mesh
                key={idx}
                geometry={geo[idx]}
                material={materials[Object.keys(materials)[0]]}
                position={
                  isClick
                    ? [clickAssetPosition[0], clickAssetPosition[1], clickAssetPosition[2]]
                    : [asset.pos_x, asset.pos_y, asset.pos_z]
                }
                rotation={
                  isClick
                    ? [clickAssetRotation[0], clickAssetRotation[1], clickAssetRotation[2]]
                    : [asset.rot_x, asset.rot_y, asset.rot_z]
                }
                visible={true}
                onClick={(e) => {
                  e.stopPropagation();
                  changeClick(
                    // 이름. position, rotation
                    asset,
                    isClick
                      ? [clickAssetPosition[0], clickAssetPosition[1], clickAssetPosition[2]]
                      : [asset.pos_x, asset.pos_y, asset.pos_z],
                    isClick
                      ? [clickAssetRotation[0], clickAssetRotation[1], clickAssetRotation[2]]
                      : [asset.rot_x, asset.rot_y, asset.rot_z]
                  );
                }}
              />
            );
          })
        );
      };
      console.log('clickAsseData: ', clickAsseData);

      getMyRoomAssets();
    }
    // console.log('myAssets: ', myAssets);
  }, [clickAsseData, clickAssetPosition, clickAssetRotation, getMypage]);

  // size를 받아옴
  const { size } = useThree();
  useFrame(() => {
    // 화면의 비율이 변경될 때마다 scale 값을 변경함
    setScale(Math.max(size.width, size.height) * 0.0000122);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <group position={pos} rotation={rot} scale={scale}>
        {myAssets}
      </group>
    </group>
  );
}
export default AllAssetsList;
