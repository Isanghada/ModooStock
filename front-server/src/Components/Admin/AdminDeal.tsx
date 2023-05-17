import { useEffect, useState } from 'react';
import AdminMarketModal from './AdminMarketModal';
import { useLazyGetAdminDealQuery, useLazyGetAdminDealSelectQuery } from 'Store/api';
import Loading from 'Components/Common/Loading';
import AdminDealModal from './AdminDealModal';

interface SelectDealDataType {
  account: string;
  companyKind: string;
  companyName: string;
  createAt: string;
  dealCode: string;
  dealId: number;
  dealType: string;
  interest: number;
  isCompleted: string;
  marketId: number;
  price: number;
  stockAmount: number;
}

function AdminDeal(): JSX.Element {
  const [getAdminDeal, { isLoading: isLoading1, isError: isError1 }] = useLazyGetAdminDealQuery();
  const [getAdminDealSelect, { isLoading: isLoading2, isError: isError2 }] = useLazyGetAdminDealSelectQuery();
  const [tbodyData, setTbodyData] = useState<any>();
  const [isClick, setIsClick] = useState<boolean>(false);
  const [selectDealData, setSelectDealData] = useState<SelectDealDataType[]>([]);

  const click = (account: string) => {
    const clickMarket = async () => {
      const { data, result } = await getAdminDealSelect(account).unwrap();
      setSelectDealData(data);
    };
    clickMarket();
  };

  useEffect(() => {
    const getDeal = async () => {
      const { data, result } = await getAdminDeal('').unwrap();
      setTbodyData(
        data.map((deal, idx) => {
          return (
            <tr
              key={idx}
              className="transition-all duration-300 cursor-pointer hover:bg-[#ff9797] hover:text-white border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]"
              onClick={() => {
                click(deal.account);
                setIsClick(true);
              }}>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.account}</th>
              {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.companyKind}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.companyName}</th> */}
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.createAt.split('T')[0]}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.dealCode}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.dealId}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.dealType}</th>
              {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.interest}</th> */}
              {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.isCompleted}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.marketId}</th> */}
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.price}원</th>
              {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.stockAmount}</th> */}
            </tr>
          );
        })
      );
    };
    getDeal();
  }, []);

  return (
    <>
      {isLoading1 ? (
        <Loading />
      ) : (
        <>
          {isClick && <AdminDealModal selectDealData={selectDealData} setIsClick={setIsClick} />}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-3">거래 내역 관리</div>
            <div className="flex justify-between w-full mb-4 font-bold">
              <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">내역</span>
            </div>
            <div className="overflow-y-auto h-[50vh] w-full">
              <div className="flex items-start justify-center ">
                <table className="w-full">
                  <thead>
                    <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E] bg-[#ffe8d5]">
                      <th className="py-1 border-x-4 border-x-[#A87E6E]/80">account</th>
                      {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">companyKind</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">companyName</th> */}
                      <th className="py-1 border-x-4 border-x-[#A87E6E]/80">createAt</th>
                      <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dealCode</th>
                      <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dealId</th>
                      <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dealType</th>
                      {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">interest</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">isCompleted</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">marketId</th> */}
                      <th className="py-1 border-x-4 border-x-[#A87E6E]/80">price</th>
                      {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">stockAmount</th> */}
                    </tr>
                  </thead>
                  <tbody>{tbodyData}</tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default AdminDeal;
