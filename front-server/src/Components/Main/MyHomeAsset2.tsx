import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
function MyHomeAsset2({ len, pos, rot }: any): JSX.Element {
  const li = Math.floor(Math.random() * new Array(20).length);
  const { nodes, materials }: any = useGLTF(process.env.REACT_APP_S3_URL + `/assets/mainHouse/house${li}.gltf`);
  const ref = useRef(null);

  let cnt = -1;
  let geo: any = [];
  for (const key in nodes) {
    cnt += 1;
    if (!(cnt === 0 || cnt === 1)) {
      geo = [...geo, nodes[key].geometry];
    }
  }

  let meshPosition: any = [];

  Object.values(nodes).map((item: any, idx) => {
    if (!(idx === 0 || idx === 1)) {
      let li: any = [];
      Object.values(item.position).map((po: any) => {
        li = [...li, Math.round(po * 100) / 100];
      });
      meshPosition = [...meshPosition, li];
    }
  });

  // 데이터
  const meshData = meshPosition.map((data: any, idx: number) => {
    return (
      <mesh
        key={idx}
        geometry={geo[idx]}
        material={materials[`${Object.keys(materials)}`]}
        position={meshPosition[idx]}
      />
    );
  });

  return (
    <group ref={ref}>
      <group position={li === 10 ? [-0.23, -1, -8] : pos} rotation={rot} scale={len}>
        {meshData}
      </group>
    </group>
  );
}
export default MyHomeAsset2;
