import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../Common/Loading';
import { useGetUsersInfoQuery } from 'Store/api';

function AdminPage(): JSX.Element {
  const navigate = useNavigate();

  // 일단 어드민 유무에 대한 데이터를 받아올 곳이 없기에 ADMIN 의 이름을 가진 애만 들어올 수 있도록 했음
  useEffect(() => {
    if (localStorage.getItem('nickname') !== 'ADMIN') {
      navigate('/main');
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
export default AdminPage;
