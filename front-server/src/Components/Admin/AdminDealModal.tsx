import { useRef } from 'react';

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

interface AdminDealModalProps {
  selectDealData: SelectDealDataType[];
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminDealModal({ selectDealData, setIsClick }: AdminDealModalProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const tbodyData = selectDealData.map((deal, idx) => {
    return (
      <tr
        key={idx}
        className="transition-all duration-300 cursor-pointer hover:bg-[#ff9797] hover:text-white border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem]"
        onClick={() => {
          // click(deal.account);
          setIsClick(true);
        }}>
        <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.account}</th>
        <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.createAt.split('T')[0]}</th>
        <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.dealCode}</th>
        <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.dealId}</th>
        <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.dealType}</th>
        <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{deal.price}원</th>
      </tr>
    );
  });
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
        <div className="bg-white flex justify-center items-start px-10 py-10 rounded-xl h-[50vh] overflow-y-auto relative text-[#A87E6E]">
          <table>
            <thead>
              <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] bg-[#ffe8d5]">
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">account</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">createAt</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dealCode</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dealId</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">dealType</th>
                <th className="py-1 border-x-4 border-x-[#A87E6E]/80">price</th>
              </tr>
            </thead>
            <tbody className="h-full">{tbodyData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AdminDealModal;
