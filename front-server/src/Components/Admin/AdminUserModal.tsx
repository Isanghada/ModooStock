import { useDeleteAdminUserSelectMutation, usePutAdminUserSelectMutation } from 'Store/api';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface UserSelectType {
  account: string;
  currentMoney: number;
  introduction: string;
  nickname: string;
  profileImagePath: string;
  userId: number;
}
interface AdminUsertModalProps {
  selectUserData: UserSelectType;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminUserModal({ selectUserData, setIsClick }: AdminUsertModalProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [userPut, { isLoading: isLoading1 }] = usePutAdminUserSelectMutation();
  const [userDelete, { isLoading: isLoading2 }] = useDeleteAdminUserSelectMutation();
  const [inputData, setInputData] = useState<string>('');
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };
  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '변경':
        const changeNickname = async () => {
          const body = {
            nickname: inputData,
            userId: selectUserData.userId
          };
          const { data, result } = await userPut(body).unwrap();
          if (result === 'SUCCESS') {
            toast.success('변경 완료!');
          } else {
            toast.error('요청 실패!');
          }
        };
        changeNickname();
        break;
      case '탈퇴':
        const userOut = async () => {
          const { data, result } = await userDelete(selectUserData.account).unwrap();
          if (result === 'SUCCESS') {
            toast.success('탈퇴 완료!');
          } else {
            toast.error('요청 실패!');
          }
        };
        userOut();
        break;
    }
    setIsClick(false);
  };
  const tbodyData = (
    <tr className="border-y-2 border-[#A87E6E]">
      <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectUserData.userId}</th>
      <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectUserData.account}</th>
      <th className="py-1 border-x-2 border-x-[#A87E6E]">
        <input
          className="outline-yellow-400 font-extrabold text-center placeholder:text-[#A87E6E]"
          type="text"
          autoFocus
          placeholder={selectUserData.nickname}
          onChange={change}
        />
      </th>
      <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectUserData.currentMoney.toLocaleString()}</th>
      <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectUserData.introduction}</th>
      <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectUserData.profileImagePath.split('/')[5]}</th>
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
        <div className="bg-white flex justify-center items-center px-10 py-14 rounded-xl text-[#A87E6E] relative">
          <div className="absolute justify-center w-full flex space-x-2 bottom-3 ">
            <div
              className="border-2 border-[#A87E6E] hover:scale-105 transition-all duration-300 cursor-pointer rounded-lg font-semibold px-2 hover:bg-white hover:text-[#ff9797]"
              onClick={() => {
                setIsClick(false);
              }}>
              닫기
            </div>
            <div
              aria-label="탈퇴"
              className="border-2 border-[#A87E6E] hover:scale-105 transition-all duration-300 cursor-pointer rounded-lg font-semibold px-2 hover:bg-white hover:text-[#ff9797]"
              onClick={click}>
              탈퇴
            </div>
            <div
              aria-label="변경"
              className="border-2 border-[#A87E6E] hover:scale-105 transition-all duration-300 cursor-pointer rounded-lg font-semibold px-2 hover:bg-white hover:text-[#ff9797]"
              onClick={click}>
              변경
            </div>
          </div>
          <table>
            <thead>
              <tr className="text-[1.3rem] border-2 border-[#A87E6E]">
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">userId</th>
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">ID</th>
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">닉네임</th>
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">자산</th>
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">소개</th>
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">이미지</th>
              </tr>
            </thead>
            <tbody className="border-2 border-[#A87E6E]">{tbodyData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AdminUserModal;
