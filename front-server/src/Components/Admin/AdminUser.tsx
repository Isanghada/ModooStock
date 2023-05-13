import {
  useGetAdminUserQuery,
  useLazyGetAdminUserNickQuery,
  useLazyGetAdminUserQuery,
  useLazyGetAdminUserSelectQuery
} from 'Store/api';
import { ChangeEvent, useEffect, useState } from 'react';
import AdminUserModal from './AdminUserModal';
import Loading from 'Components/Common/Loading';

interface UserSelectType {
  account: string;
  currentMoney: number;
  introduction: string;
  nickname: string;
  profileImagePath: string;
  userId: number;
}

function AdminUser(): JSX.Element {
  const [getAdminUser, { isLoading: isLoading1, isError: isError1 }] = useLazyGetAdminUserQuery();
  const [getAdminUserSelect, { isLoading: isLoading2, isError: isError2 }] = useLazyGetAdminUserSelectQuery();
  const { data: data1, isLoading: isLoading3, isError: isError3 } = useGetAdminUserQuery('');
  const [getNickname, { isLoading: isLoading4, isError: isError4 }] = useLazyGetAdminUserNickQuery();
  const [tbodyData, setTbodyData] = useState<any>();
  const [isClick, setIsClick] = useState<boolean>(false);
  const [selectUserData, setSelectUserData] = useState<UserSelectType>({
    account: '',
    currentMoney: 0,
    introduction: '',
    nickname: '',
    profileImagePath: '',
    userId: 0
  });

  const click = (account: string) => {
    const clickMarket = async () => {
      const { data, result } = await getAdminUserSelect(account).unwrap();
      setSelectUserData(data);
    };
    clickMarket();
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      const searchUser = async () => {
        const { data, result } = await getNickname(e.target.value).unwrap();
        setTbodyData(
          data.map((user, idx) => {
            return (
              <tr
                key={idx}
                className="transition-all duration-300 cursor-pointer hover:bg-[#ff9797] hover:text-white border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]"
                onClick={() => {
                  click(user.account);
                  setIsClick(true);
                }}>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.userId}</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.account}</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.nickname}</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.introduction}</th>
              </tr>
            );
          })
        );
      };
      searchUser();
    } else {
      const getMarket = async () => {
        const { data, result } = await getAdminUser('').unwrap();
        console.log(data);
        setTbodyData(
          data.map((user, idx) => {
            return (
              <tr
                key={idx}
                className="transition-all duration-300 cursor-pointer hover:bg-[#ff9797] hover:text-white border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]"
                onClick={() => {
                  click(user.account);
                  setIsClick(true);
                }}>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.userId}</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.account}</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.nickname}</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.introduction}</th>
              </tr>
            );
          })
        );
      };
      getMarket();
    }
  };

  useEffect(() => {
    const getMarket = async () => {
      const { data, result } = await getAdminUser('').unwrap();
      console.log(data);
      setTbodyData(
        data.map((user, idx) => {
          return (
            <tr
              key={idx}
              className="transition-all duration-300 cursor-pointer hover:bg-[#ff9797] hover:text-white border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]"
              onClick={() => {
                click(user.account);
                setIsClick(true);
              }}>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.userId}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.account}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.nickname}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{user.introduction}</th>
            </tr>
          );
        })
      );
    };
    getMarket();
  }, [data1]);

  return (
    <>
      {isClick && <AdminUserModal selectUserData={selectUserData} setIsClick={setIsClick} />}
      {isLoading3 ? (
        <Loading />
      ) : (
        <div className="w-full flex-col flex justify-center items-center">
          <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-3">유저 관리</div>
          <div className="w-full mb-4 font-bold flex justify-between">
            <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">유저</span>
            <div className="flex justify-center items-center text-[#A87E6E] space-x-2">
              <input
                type="text"
                autoFocus
                placeholder="닉네임"
                className="outline-none text-center placeholder:text-center placeholder:text-[#A87E6E]"
                onChange={change}
              />
              <div className="px-2 border-2 rounded-lg border-[#A87E6E]">검색</div>
            </div>
          </div>
          <div className="overflow-y-auto h-[50vh] w-full">
            <div className="flex justify-center items-start ">
              <table className="w-full">
                <thead>
                  <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E] bg-[#ffe8d5]">
                    <th className="py-1 border-x-4 border-x-[#A87E6E]/80">userId</th>
                    <th className="py-1 border-x-4 border-x-[#A87E6E]/80">account</th>
                    <th className="py-1 border-x-4 border-x-[#A87E6E]/80">nickname</th>
                    <th className="py-1 border-x-4 border-x-[#A87E6E]/80">introduction</th>
                  </tr>
                </thead>
                <tbody>{tbodyData}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AdminUser;
