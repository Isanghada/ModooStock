import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <div className="bg-[#FDE2E2]/40 w-screen relative flex">
        <div className="container relative flex w-full h-screen mx-auto lg:max-w-screen-xl">
          <Outlet />
        </div>
        {/* <div className='min-h-full bg-white w-[40vw]'></div> */}
      </div>
    </>
  );
}
export default Layout;
