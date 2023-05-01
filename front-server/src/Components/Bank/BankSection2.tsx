import { toast } from 'react-toastify';
import { useDeleteBankMutation, useGetBankListQuery } from 'Store/api';
import { useAppDispatch } from 'Store/hooks';
import { changeCurrentMoneyStatusStatus } from 'Store/store';

interface SetIsClickType {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  currentMoney: string;
  IntAfterCurrentMoney: number;
}

// 출금
function BankSection2({ setIsClick, currentMoney, IntAfterCurrentMoney }: SetIsClickType): JSX.Element {
  const dispatch = useAppDispatch();
  const [deleteBank, { isLoading: isLoading1, isError: isError1 }] = useDeleteBankMutation();
  const { data: getBankList, isLoading: isLoading2, isError: isError2 } = useGetBankListQuery('');

  const click = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (passbookList?.length) {
      const reversepassbookList = passbookList.reverse();
    }
  };

  // 통장 리스트
  const passbookList = getBankList?.data.map((passbook, idx: number) => {
    const { bankId, startDate, endDate, price, isPaid } = passbook;
    const startDateSplit = startDate.split('T');
    const endDateSplit = endDate.split('T');

    const click = (e: React.MouseEvent) => {
      const withdraw = async (bankId: number) => {
        const { data, result } = await deleteBank(bankId).unwrap();
        if (data) {
          dispatch(changeCurrentMoneyStatusStatus((IntAfterCurrentMoney + price).toLocaleString()));
          toast.success('출금이 완료되었습니다!');
        } else {
          toast.error('요청에 실패했습니다...');
        }
      };
      withdraw(bankId);
    };

    return (
      <div
        key={idx}
        className="flex justify-start items-end w-full border-b-[#FFE4CC] border-b-2 py-2 lg:py-3 text-[0.7rem] lg:text-[0.8rem]">
        <div className="w-[23%] pl-2">
          {startDateSplit[0]} {startDateSplit[1].split(':')[0]}:{startDateSplit[1].split(':')[1]}{' '}
        </div>
        <div className="w-[23%] pl-2">
          {endDateSplit[0]} {endDateSplit[1].split(':')[0]}:{endDateSplit[1].split(':')[1]}{' '}
        </div>
        <div className="w-[28%] pl-2 text-[0.9rem] lg:text-[1rem] font-extrabold text-start text-black">
          {price.toLocaleString()}원
        </div>
        <div className="flex justify-center items-center lg:justify-between py-[2px] space-x-2 lg:space-x-0 w-[26%] pl-2 lg:px-4 pb-[2px]">
          {isPaid ? (
            <div className="text-[#117D00] bg-[#F1FFDB] px-3 drop-shadow-md rounded-lg">완료</div>
          ) : (
            <div className="text-[#CE0000] bg-[#FFE4DB] px-3 drop-shadow-md rounded-lg">미완료</div>
          )}
          <div
            aria-label="출금하기"
            className="text-white flex justify-center items-center bg-[#FFC34F] py-[2px] px-3 drop-shadow-md rounded-full cursor-pointer hover:scale-105 transition-all duration-150"
            onClick={click}>
            출금하기
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {isLoading1 && isLoading2 && <div>로딩</div>}
      {isError1 && isError2 && <div>에러</div>}
      <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[85%] max-w-[45rem] md:w-[75%] md:max-w-[40rem] lg:max-w-[45rem] px-7 rounded-xl">
        <div className="flex flex-col items-center w-full pt-3 ">
          <span className="font-extrabold text-[1.8rem] lg:text-[2.5rem] text-[#FAAB78]">출금</span>
          <span className="lg:text-[1rem] text-[0.8rem]">만기일이 지난 통장을 선택하여 예금 및 이자를 받으세요.</span>
        </div>
        <div className="flex flex-col w-full py-2 lg:py-3">
          <div className="flex justify-between w-full pb-2">
            <div className="flex items-end space-x-2">
              <span className="text-[1.2rem] lg:text-[1.5rem] font-extrabold">통장 조회</span>
              {/* <div onClick={click}>
                <span className="font-medium pb-[2px] text-[#282828] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem] cursor-pointer hover:scale-105 transition-all duration-150">
                  최신순↓
                </span>
              </div> */}
            </div>
            <div className="flex items-end space-x-2">
              <span className="font-medium pb-[2px] text-[#282828] text-[0.75rem] lg:text-[0.8rem] xl:text-[0.9rem]">
                잔여 금액: {currentMoney}원
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex justify-start w-full py-2 bg-[#FFF5EC] text-[0.8rem] lg:text-[1rem] text-[#717171] font-bold rounded-lg">
              <div className="w-[23%] pl-2">개설일</div>
              <div className="w-[23%] pl-2">만기일</div>
              <div className="w-[28%] pl-2">통장 금액</div>
              <div className="w-[26%] pl-2">이자 지급</div>
            </div>
            <div className="flex flex-col flex-nowrap w-full overflow-y-auto bg-white min-h-[7rem] max-h-[7rem] lg:min-h-[15rem] lg:max-h-[15rem]">
              {passbookList?.length !== 0 ? (
                passbookList
              ) : (
                <div className="flex items-center justify-center w-full h-full mx-auto my-auto font-bold">
                  <span>개설한 통장이 없습니다.</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 font-bold text-white text-[0.8rem] lg:text-[1rem] pt-1 lg:pt-0">
          <div
            className="bg-[#B2B9C2] px-8 lg:px-10 rounded-full drop-shadow-lg py-1 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setIsClick((pre) => !pre)}>
            <span>닫기</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default BankSection2;
