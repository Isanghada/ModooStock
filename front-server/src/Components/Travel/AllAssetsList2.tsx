import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useLazyGetUserMypageQuery } from 'Store/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Loading from 'Components/Common/Loading';

interface AllAssetsListType {
  len: number;
  pos: any;
  rot: any;
}

function AllAssetsList2({ len, pos, rot }: AllAssetsListType): JSX.Element {
  console.log('일단 여기 맞긴함..');
  const { nickname } = useParams() as { nickname: string };
  const [getLazyMypage, { isLoading, isError }] = useLazyGetUserMypageQuery();

  const { nodes, materials }: any = useGLTF(process.env.REACT_APP_S3_URL + '/assets/AllAssetsFile.gltf');
  const [scale, setScale] = useState(len);
  const [myAssets, setMyAssets] = useState<any>();

  const ref = useRef<any>(null);

  useEffect(() => {
    const getMyRoomAssets = async () => {
      const { data, result } = await getLazyMypage(nickname).unwrap();

      let geo: any = [];
      data.map((asset, idx) => {
        geo = [...geo, nodes[asset.assetName].geometry];
      });

      // 데이터
      setMyAssets(
        data.map((asset, idx: number) => {
          return (
            <mesh
              key={idx}
              geometry={geo[idx]}
              material={materials[Object.keys(materials)[0]]}
              position={[asset.pos_x, asset.pos_y, asset.pos_z]}
              rotation={[asset.rot_x, asset.rot_y, asset.rot_z]}
              visible={true}
            />
          );
        })
      );
    };
    getMyRoomAssets();
  }, [getLazyMypage, nickname, materials, nodes]);

  // size를 받아옴
  const { size } = useThree();
  useFrame(() => {
    // 화면의 비율이 변경될 때마다 scale 값을 변경함
    setScale(Math.max(size.width, size.height) * 0.0000122);
  });

  const navigate = useNavigate();
  if (isError) navigate('/error');

  if (isLoading) return <Loading />;

  return (
    <>
      <group
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <group position={pos} rotation={rot} scale={scale}>
          {myAssets}
        </group>
      </group>
    </>
  );
}
export default AllAssetsList2;
