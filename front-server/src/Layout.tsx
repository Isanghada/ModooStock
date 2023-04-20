import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from 'Store/hooks';
import Login from 'Components/Login/Login';

function Layout(): JSX.Element {
  // 로그인 창
  const loginStatus = useAppSelector((state) => {
    return state.loginStatus;
  });
  return (
    <>
      <div className="bg-[#FDE2E2]/40 w-screen relative flex">
        <div className="container relative flex w-full h-screen mx-auto lg:max-w-screen-xl">
          <Outlet />
        </div>
        {/* 로그인 컴포넌트 */}
        <AnimatePresence>
          {loginStatus && (
            <motion.div
              className="max-h-screen min-h-full"
              initial={{ width: 0 }}
              animate={{ width: '40vw' }}
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
