import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <div className="bg-[#FDE2E2]/40 w-screen relative">
        <div className="container relative flex w-full h-screen mx-auto lg:max-w-screen-xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Layout;
