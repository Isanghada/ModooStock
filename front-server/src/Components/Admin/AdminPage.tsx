import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../Common/Loading';

function AdminPage(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <Outlet />
    </>
  );
}
export default AdminPage;
