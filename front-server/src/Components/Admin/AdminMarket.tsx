import { useLazyGetAdminMarketQuery, useLazyGetAdminMarketSelectQuery } from 'Store/api';
import { useEffect, useState } from 'react';
import AdminMarketModal from './AdminMarketModal';

interface SelectMarketDataType {
  companyName: string;
  companyKind: string;
  average: number;
}

function AdminMarket(): JSX.Element {
  const [getAdminMarket, { isLoading: isLoading1, isError: isError1 }] = useLazyGetAdminMarketQuery();
  const [getAdminMarketSelect, { isLoading: isLoading2, isError: isError2 }] = useLazyGetAdminMarketSelectQuery();
  const [tbodyData, setTbodyData] = useState<any>();
  const [isClick, setIsClick] = useState<boolean>(false);
  const [selectMarketData, setSelectMarketData] = useState<SelectMarketDataType[]>([]);

  const click = (marketId: number) => {
    const clickMarket = async () => {
      const { data, result } = await getAdminMarketSelect(marketId).unwrap();
      setSelectMarketData(data);
    };
    clickMarket();
  };

  useEffect(() => {
    const getMarket = async () => {
      const { data, result } = await getAdminMarket('').unwrap();
      setTbodyData(
        data.map((market, idx) => {
          return (
            <tr
              key={idx}
              className="transition-all duration-300 cursor-pointer hover:bg-[#ff9797] hover:text-white border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]"
              onClick={() => {
                click(market.marketId);
                setIsClick(true);
              }}>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{market.marketId}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{market.createAt.split('T')[0]}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{market.startAt}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{market.endAt}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{market.gameDate}</th>
            </tr>
          );
        })
      );
    };
    getMarket();
  }, []);

  return (
    <>
      {isClick && <AdminMarketModal selectMarketData={selectMarketData} setIsClick={setIsClick} />}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-3">주식 시즌 관리</div>
        <div className="flex justify-between w-full mb-4 font-bold">
          <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">시즌</span>
        </div>
        <div className="overflow-y-auto h-[50vh] w-full">
          <div className="flex items-start justify-center ">
            <table className="w-full">
              <thead>
                <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E] bg-[#ffe8d5]">
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">marketId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">createAt</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">startAt</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">endAt</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">gameDate</th>
                </tr>
              </thead>
              <tbody>{tbodyData}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminMarket;
