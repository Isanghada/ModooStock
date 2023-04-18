import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <div className="bg-[#FDE2E2]/40 w-screen relative">
        {/* <div className="container relative flex w-full h-screen mx-auto md:max-w-screen-xl portrait:absolute portrait:left-0 portrait:top-full portrait:origin-top-left portrait:-rotate-90 portrait:w-[100vh] portrait:h-[100vw]"> */}
        <div className="container relative flex w-full h-screen mx-auto lg:max-w-screen-xl portrait:-rotate-90 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Layout;
