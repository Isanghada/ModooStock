import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';

function Bathroom({ len, pos, rot }: any): JSX.Element {
  const { nodes, materials }: any = useGLTF(process.env.REACT_APP_S3_URL + '/assets/Bedroom_Base.gltf');
  console.log('materials: ', Object.keys(materials)[0]);

  const [scale, setScale] = useState(len); // Bathroom 컴포넌트의 scale 값을 useState로 관리

  const ref = useRef<any>(null);

  let cnt = -1;
  let geo: any = [];
  for (const key in nodes) {
    cnt += 1;
    if (!(cnt === 0)) {
      geo = [...geo, nodes[key].geometry];
    }
  }
  let meshPosition: any = [];

  Object.values(nodes).map((item: any, idx) => {
    if (!(idx === 0)) {
      let li: any = [];
      Object.values(item.position).map((po: any) => {
        li = [...li, Math.round(po * 100) / 100];
      });
      meshPosition = [...meshPosition, li];
    }
  });

  // 데이터
  const meshData = meshPosition.map((data: any, idx: number) => {
    return <mesh geometry={geo[idx]} material={materials[Object.keys(materials)[0]]} position={meshPosition[idx]} />;
  });

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
        console.log('집');
      }}>
      <group position={pos} rotation={rot} scale={scale}>
        {meshData}
      </group>
    </group>
  );
}
export default Bathroom;
