import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useLazyGetMypageQuery } from 'Store/api';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeClickAsseData, changeClickAssetPosition, changeClickAssetRotation } from 'Store/store';
import React, { useEffect, useRef, useState } from 'react';

interface AssetType {
  userAssetId: number;
  assetName: string;
  pos_x: number;
  pos_y: number;
  pos_z: number;
  rot_x: number;
  rot_y: number;
  rot_z: number;
}

function AllAssetsList({ len, pos, rot, isClickAsset, setIsClickAsset }: any): JSX.Element {
  const dispatch = useAppDispatch();
  const [getMypage, { isLoading: isLoading1, isError: isError1 }] = useLazyGetMypageQuery();
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

  const changeClick = (asset: AssetType, pos: number[], rot: number[]) => {
    console.log('asset: ', asset);

    dispatch(
      changeClickAsseData({
        userAssetId: asset.userAssetId,
        assetName: asset.assetName,
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
    const check = async () => {
      const { data, result } = await getMypage('').unwrap();
      console.log('data: ', data);
    };
    check();
    const assetsName = [
      {
        userAssetId: 0,
        assetName: 'Backyard_Tree',
        pos_x: 10.0,
        pos_y: 0.0,
        pos_z: 0.0,
        rot_x: 0.0,
        rot_y: 0.0,
        rot_z: -2.0
      },
      {
        userAssetId: 1,
        assetName: 'Yogaroom_base',
        pos_x: 0.0,
        pos_y: 0.0,
        pos_z: 0.0,
        rot_x: 0.0,
        rot_y: 0.0,
        rot_z: 0.0
      },
      {
        userAssetId: 2,
        assetName: 'Yogaroom_rug1',
        pos_x: 20,
        pos_y: 0,
        pos_z: 0.0,
        rot_x: 0.0,
        rot_y: 0,
        rot_z: -0.2
      },
      {
        userAssetId: 3,
        assetName: 'Backyard_Flower_2',
        pos_x: 50.0,
        pos_y: 40.0,
        pos_z: 0.0,
        rot_x: 0.0,
        rot_y: 0.0,
        rot_z: 0.0
      },
      {
        userAssetId: 4,
        assetName: 'Gym_Peloton',
        pos_x: -200.0,
        pos_y: 50.0,
        pos_z: -10.0,
        rot_x: 0.0,
        rot_y: 0.0,
        rot_z: -0.2
      }
    ];
    let geo: any = [];

    assetsName.map((asset, idx) => {
      geo = [...geo, nodes[assetsName[idx].assetName].geometry];
    });

    // 데이터
    setMyAssets(
      assetsName.map((data: any, idx: number) => {
        // let isShow = true;
        // position => [x: -200 ~ 200 ,y: -200 ~ 200 ,z: -400 ~ 0]
        // rotation => [x: -1.5 ~ 1.5 ,y: -1.5 ~ 1.5 ,z: -3 ~ 3]

        return (
          <mesh
            key={idx}
            geometry={geo[idx]}
            material={materials[Object.keys(materials)[0]]}
            position={[assetsName[idx].pos_x, assetsName[idx].pos_y, assetsName[idx].pos_z]}
            rotation={[assetsName[idx].rot_x, assetsName[idx].rot_y, assetsName[idx].rot_z]}
            visible={true}
            onClick={(e) => {
              e.stopPropagation();
              click(
                // 이름. position, rotation
                assetsName[idx],
                [assetsName[idx].pos_x, assetsName[idx].pos_y, assetsName[idx].pos_z],
                [assetsName[idx].rot_x, assetsName[idx].rot_y, assetsName[idx].rot_z]
              );
            }}
          />
        );
      })
    );
  }, []);

  useEffect(() => {
    if (isClickAsset) {
      console.log('clickAsseData.assetName: ', clickAsseData.assetName);

      // 원래 마이룸 API 데이터 조회 후
      let assets = [
        {
          userAssetId: 0,
          assetName: 'Backyard_Tree',
          assetImagePath: 'Backyard_Tree',
          pos_x: 10.0,
          pos_y: 0.0,
          pos_z: 0.0,
          rot_x: 0.0,
          rot_y: 0.0,
          rot_z: -2.0
        },
        {
          userAssetId: 1,
          assetName: 'Yogaroom_base',
          assetImagePath: 'Yogaroom_base',
          pos_x: 0.0,
          pos_y: 0.0,
          pos_z: 0.0,
          rot_x: 0.0,
          rot_y: 0.0,
          rot_z: 0.0
        },
        {
          userAssetId: 2,
          assetName: 'Yogaroom_rug1',
          assetImagePath: 'Yogaroom_rug1',
          pos_x: 20,
          pos_y: 0,
          pos_z: 0.0,
          rot_x: 0.0,
          rot_y: 0,
          rot_z: -0.2
        },
        {
          userAssetId: 3,
          assetName: 'Backyard_Flower_2',
          assetImagePath: 'Backyard_Flower_2',
          pos_x: 50.0,
          pos_y: 40.0,
          pos_z: 0.0,
          rot_x: 0.0,
          rot_y: 0.0,
          rot_z: 0.0
        },
        {
          userAssetId: 4,
          assetName: 'Gym_Peloton',
          assetImagePath: 'Gym_Peloton',
          pos_x: -200.0,
          pos_y: 50.0,
          pos_z: -10.0,
          rot_x: 0.0,
          rot_y: 0.0,
          rot_z: -0.2
        }
      ];

      const check = assets.find((asset) => {
        return asset.assetName === clickAsseData.assetName;
      });
      // 클릭한 에셋이 현재 배치된 곳에 없는 경우 클릭한 에셋 데이터를 추가,
      // 배치된 곳에 있는 에셋을 클릭시엔 그냥 진행
      if (check === undefined) {
        assets = [
          ...assets,
          // 클릭한 에셋 데이터
          {
            userAssetId: 5,
            assetName: 'Office2_monitor1',
            assetImagePath: 'Office2_monitor1',
            pos_x: 0.0,
            pos_y: 0.0,
            pos_z: 0.0,
            rot_x: 0.0,
            rot_y: 0.0,
            rot_z: 0.0
          }
        ];
      }

      // 클릭한 ASSET이 마이룸에 있는지 체크

      let geo: any = [];
      assets.map((asset: AssetType, idx) => {
        geo = [...geo, nodes[assets[idx].assetName].geometry];
      });

      // 데이터
      setMyAssets(
        assets.map((asset: AssetType, idx: number) => {
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
                  : [assets[idx].pos_x, assets[idx].pos_y, assets[idx].pos_z]
              }
              rotation={
                isClick
                  ? [clickAssetRotation[0], clickAssetRotation[1], clickAssetRotation[2]]
                  : [assets[idx].rot_x, assets[idx].rot_y, assets[idx].rot_z]
              }
              visible={true}
              onClick={(e) => {
                e.stopPropagation();
                changeClick(
                  // 이름. position, rotation
                  assets[idx],
                  isClick
                    ? [clickAssetPosition[0], clickAssetPosition[1], clickAssetPosition[2]]
                    : [assets[idx].pos_x, assets[idx].pos_y, assets[idx].pos_z],
                  isClick
                    ? [clickAssetRotation[0], clickAssetRotation[1], clickAssetRotation[2]]
                    : [assets[idx].rot_x, assets[idx].rot_y, assets[idx].rot_z]
                );
              }}
            />
          );
        })
      );
    }
    // console.log('myAssets: ', myAssets);
  }, [clickAsseData, clickAssetPosition, clickAssetRotation]);

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
