import { useRef } from 'react';

interface UserSelectType {
  account: string;
  currentMoney: number;
  introduction: string;
  nickname: string;
  profileImagePath: string;
  userId: string;
}
interface AdminUsertModalProps {
  selectUserData: UserSelectType;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminUserModal({ selectUserData, setIsClick }: AdminUsertModalProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const tbodyData = (
    <tr className="border-y-2">
      <th className="py-1 border-x-2 border-x-white">{selectUserData.userId}</th>
      <th className="py-1 border-x-2 border-x-white">{selectUserData.account}</th>
      <th className="py-1 border-x-2 border-x-white">{selectUserData.nickname}</th>
      <th className="py-1 border-x-2 border-x-white">{selectUserData.currentMoney.toLocaleString()}</th>
      <th className="py-1 border-x-2 border-x-white">{selectUserData.introduction}</th>
      <th className="py-1 border-x-2 border-x-white">{selectUserData.profileImagePath.split('/')[5]}</th>
    </tr>
  );
  return (
    <>
      <div
        ref={ref}
        className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 z-50 bg-[#707070]/50 pt-0"
        onClick={(e) => {
          if (e.target === ref.current) {
            setIsClick(false);
          }
        }}>
        <div className="bg-[#ff9797] flex justify-center items-center px-10 py-10 rounded-xl text-white">
          <table>
            <thead>
              <tr className="text-[1.3rem] text-start border-2">
                <th className="px-10 py-2 border-r-2">userId</th>
                <th className="px-10 py-2 border-r-2">ID</th>
                <th className="px-10 py-2 border-r-2">닉네임</th>
                <th className="px-10 py-2 border-r-2">자산</th>
                <th className="px-10 py-2 border-r-2">소개</th>
                <th className="px-10 py-2 border-r-2">이미지</th>
              </tr>
            </thead>
            <tbody className="text-white border-2">{tbodyData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AdminUserModal;
