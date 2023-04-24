import { useEffect, useState } from 'react';

function Navbar(): JSX.Element {
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    // 창 높이 변할떄마다 실행
    const height = window.screen.height;
    setScreenHeight(height)
  }, [window.screen.height])
  
  return (
   <div className={`fixed top-0 left-0 flex w-screen bg-black h-[10vh] ${ screenHeight >= 800 ? 'min-h-[6rem]' : '' }`}>
    Navbar
   </div>
  );
}
export default Navbar;
