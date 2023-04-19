import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from 'Store/hooks';
import Login from 'Components/Login/Login';
import { useEffect, useState } from 'react';

function Layout(): JSX.Element {
  // 현재 브라우저 윈도우 너비 값
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // 로그인 창 상태
  const loginStatus = useAppSelector((state) => {
    return state.loginStatus;
  });

  useEffect(() => {
    // 창크기 변할때마다 실행
    const updateScreenWidth = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
    };
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth) 
  }, [])

  return (
    <>
      <div className="bg-[#FEF9F9] w-screen relative flex">
        <div className={`${loginStatus ? "w-[60vw] lg:w-[70vw]" : "w-full"} container relative flex h-screen mx-auto lg:max-w-screen-xl`}>
          <Outlet />
        </div>
        {/* 로그인 컴포넌트 */}
        <AnimatePresence>
          {loginStatus && (
            <motion.div
              className="max-h-screen min-h-full"
              initial={{ width: 0 }}
              animate={screenWidth <= 1024 ? { width: '40vw'} : { width: '30vw'}}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: 0,
                ease: 'easeInOut'
              }}>
                <Login />
              </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
export default Layout;
