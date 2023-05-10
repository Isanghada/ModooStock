import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
function MyHomeAsset({ len, pos, rot }: any): JSX.Element {
  const li = new Array(20);
  const { nodes, materials }: any = useGLTF(
    process.env.REACT_APP_S3_URL + '/assets/mainHouse/house' + Math.floor(Math.random() * li.length) + '.gltf'
  );
  console.log(nodes);
  console.log(materials);

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
    return <mesh geometry={geo[idx]} material={materials._LP_Rooms_Material} position={meshPosition[idx]} />;
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        console.log('집');
      }}>
      <group position={pos} rotation={rot} scale={len}>
        {meshData}
      </group>
    </group>
  );
}
export default MyHomeAsset;
