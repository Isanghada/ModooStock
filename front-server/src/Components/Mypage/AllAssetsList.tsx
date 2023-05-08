import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeClickAssetName } from 'Store/store';
import React, { useEffect, useRef, useState } from 'react';

function AllAssetsList({ len, pos, rot, isClickAsset, setIsClickAsset }: any): JSX.Element {
  const dispatch = useAppDispatch();
  const { nodes, materials }: any = useGLTF(process.env.REACT_APP_S3_URL + '/assets/RoomCheck.gltf');
  const [scale, setScale] = useState(len);
  const [myAssets, setMyAssets] = useState<any>();
  let clickData: any = [];
  const clickAssetName = useAppSelector((state) => {
    return state.clickAssetName;
  });
  // console.log(nodes);

  const ref = useRef<any>(null);

  const click = (name: string, pos: number[], rot: number[]) => {
    console.log('name: ', name);
    console.log('pos: ', pos);
    console.log('rot: ', rot);
    dispatch(changeClickAssetName(name));
    setIsClickAsset(true);
  };

  // 현재 배치해놓은 에셋 보이도록 하기
  useEffect(() => {
    // api로 받아올 보여지는 에셋 데이터
    const assetsName = [
      {
        userAssetId: 0,
        assetName: 'Backyard_Tree',
        assetImagePath: '31',
        pos_x: 0.0,
        pos_y: 0.0,
        pos_z: 0.0,
        rot_x: 0.0,
        rot_y: 0.0,
        rot_z: 0.0
      },
      {
        userAssetId: 1,
        assetName: 'Yogaroom_base',
        assetImagePath: '32',
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
        assetImagePath: '33',
        pos_x: 200,
        pos_y: 200,
        pos_z: -400,
        rot_x: 0.0,
        rot_y: 0.0,
        rot_z: 0.0
      },
      {
        userAssetId: 3,
        assetName: 'Yogaroom_airconditioning',
        assetImagePath: '34',
        pos_x: 0.0,
        pos_y: 0.0,
        pos_z: 0.0,
        rot_x: 0.0,
        rot_y: 0.0,
        rot_z: 0.0
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
            position={
              // [assetsName[idx].pos_x, assetsName[idx].pos_y, assetsName[idx].pos_z]
              [assetsName[idx].pos_x, assetsName[idx].pos_y, assetsName[idx].pos_z]
            }
            // rotation={[assetsName[idx].rot_x, assetsName[idx].rot_y, assetsName[idx].rot_z]}
            rotation={idx !== 1 ? [assetsName[idx].rot_x, assetsName[idx].rot_y, assetsName[idx].rot_z] : [0, 0, 0]}
            visible={true}
            onClick={(e) => {
              e.stopPropagation();
              click(
                assetsName[idx].assetName,
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
    // if (isClickAsset) {
    //   console.log('클릭했다~!', clickAssetName);
    //   const assetsName = ['', 'Backyard_Tree', 'Yogaroom_base', 'Yogaroom_rug1'];
    //   const length = 3;
    //   let nodesCnt = -1;
    //   let cnt = 0;
    //   let meshPositionCnt = -1;
    //   let geo: any = [];
    //   // // console.log('nodes: ', nodes);
    //   for (const key in nodes) {
    //     // console.log(key);
    //     nodesCnt += 1;
    //     cnt += 1;
    //     if (!(nodesCnt === 0) && nodesCnt <= length) {
    //       // console.log(key);
    //       clickData = [...clickData, key];
    //       geo = [...geo, nodes[assetsName[nodesCnt]].geometry];
    //     }
    //   }
    //   let meshPosition: any = [];
    //   Object.values(nodes).map((item: any, idx) => {
    //     meshPositionCnt += 1;
    //     if (!(idx === 0 && meshPositionCnt <= length)) {
    //       let li: any = [];
    //       Object.values(item.position).map((po: any) => {
    //         li = [...li, Math.round(po * 100) / 100];
    //       });
    //       meshPosition = [...meshPosition, li];
    //     }
    //   });
    //   // 데이터
    //   setMyAssets(
    //     meshPosition.map((data: any, idx: number) => {
    //       // let isShow = true;
    //       // position => [x: -200 ~ 200 ,y: -200 ~ 200 ,z: -400 ~ 0]
    //       return (
    //         <mesh
    //           key={idx}
    //           geometry={geo[idx]}
    //           material={materials[Object.keys(materials)[0]]}
    //           position={idx !== 2 ? [0, 0, 0] : [200, 200, -400]}
    //           rotation={[0, 0, 0]}
    //           visible={true}
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             console.log(e);
    //             click(assetsName[idx + 1]);
    //           }}
    //         />
    //       );
    //     })
    //   );
    // }
  }, [isClickAsset, clickAssetName]);

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
