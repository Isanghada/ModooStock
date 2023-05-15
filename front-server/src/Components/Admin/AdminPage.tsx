import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../Common/Loading';
import { useGetAdminUserCheckQuery } from 'Store/api';

function AdminPage(): JSX.Element {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAdminUserCheckQuery('');

  if (data?.data !== true) {
    navigate('/main');
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="fixed flex justify-between left-1/3 right-1/3 bottom-10 text-yellow-800 text-[3rem]">
            <div
              className="transition-all duration-300 cursor-pointer hover:scale-110"
              onClick={() => {
                navigate(-1);
              }}>
              ⬅
            </div>
            <div
              className="transition-all duration-300 cursor-pointer hover:scale-110"
              onClick={() => {
                navigate(+1);
              }}>
              ➡
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
}
export default AdminPage;
