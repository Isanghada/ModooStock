import { useDeleteAdminUserSelectMutation, usePutAdminUserSelectMutation } from 'Store/api';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface AdminAssetType {
  assetCategory: string;
  assetId: number;
  assetImagePath: string;
  assetLevel: string;
}
interface AdminUsertModalProps {
  selectAssetData: AdminAssetType;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminAssetModal({ selectAssetData, setIsClick }: AdminUsertModalProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [userPut, { isLoading: isLoading1 }] = usePutAdminUserSelectMutation();
  const [inputData, setInputData] = useState<string>('');
  // const change = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputData(e.target.value);
  // };
  // const click = (e: React.MouseEvent) => {
  //   const changeNickname = async () => {
  //     const body = {
  //       nickname: inputData,
  //       userId: selectUserData.userId
  //     };
  //     const { data, result } = await userPut(body).unwrap();
  //     if (result === 'SUCCESS') {
  //       toast.success('변경 완료!');
  //     } else {
  //       toast.error('요청 실패!');
  //     }
  //   };
  //   changeNickname();
  //   setIsClick(false);
  // };
  const tbodyData = (
    <tr className="border-y-2 border-[#A87E6E]">
      <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectAssetData.assetId}</th>
      <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectAssetData.assetLevel}</th>
      <th className="py-1 border-x-2 border-x-[#A87E6E]">
        {selectAssetData.assetCategory}
        {/* <input
          className="outline-yellow-400 font-extrabold text-center placeholder:text-[#A87E6E]"
          type="text"
          autoFocus
          placeholder={selectAssetData.category}
          onChange={change}
        /> */}
      </th>
      {/* <th className="py-1 border-x-2 border-x-[#A87E6E]">{selectAssetData.assetImagePath}</th> */}
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
          {/* <div className="absolute flex justify-center w-full space-x-2 bottom-3 ">
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
          </div> */}
          <table>
            <thead>
              <tr className="text-[1.3rem] border-2 border-[#A87E6E]">
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">assetId</th>
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">assetLevel</th>
                <th className="px-10 py-2 border-r-2 border-[#A87E6E]">category</th>
                {/* <th className="px-10 py-2 border-r-2 border-[#A87E6E]">assetImagePath</th> */}
              </tr>
            </thead>
            <tbody className="border-2 border-[#A87E6E]">{tbodyData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AdminAssetModal;
