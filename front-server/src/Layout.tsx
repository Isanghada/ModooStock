import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <div className="bg-[#FDE2E2]/40 w-full">
        <div className="container relative flex w-full h-screen max-w-screen-xl mx-auto bg-white">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Layout;
