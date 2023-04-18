import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <div className="bg-[#FDE2E2]/40 w-screen">
        {/* <div className="container relative flex w-full h-screen mx-auto md:max-w-screen-xl portrait:absolute portrait:-rotate-90 portrait:max-w-fit"> */}
        <div className="container relative flex w-full h-screen mx-auto md:max-w-screen-xl ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Layout;
