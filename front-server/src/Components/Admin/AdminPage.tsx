import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../Common/Loading';
import { useLazyGetUsersInfoQuery } from 'Store/api';

function AdminPage(): JSX.Element {
  const navigate = useNavigate();
  const [getUser, { isLoading: isLoading1 }] = useLazyGetUsersInfoQuery();
  // 일단 어드민 유무에 대한 데이터를 받아올 곳이 없기에 ADMIN 의 이름을 가진 애만 들어올 수 있도록 했음
  useEffect(() => {
    const userData = async () => {
      const { data, result } = await getUser('').unwrap();
      if (data.nickname !== 'ADMIN') {
        navigate('/main');
      }
    };
    userData();
  }, []);

  return (
    <>
      <div className="fixed flex justify-between left-1/3 right-1/3 bottom-10 text-yellow-800 text-[3rem]">
        <div
          className="cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={() => {
            navigate(-1);
          }}>
          ⬅
        </div>
        <div
          className="cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={() => {
            navigate(+1);
          }}>
          ➡
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default AdminPage;
